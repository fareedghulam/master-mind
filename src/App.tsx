import { useState, useEffect } from 'react';
import { 
  getLoggedInUser, 
  setLoggedInUser, 
  getUsers, 
  getBookings, 
  getNumberLimits, 
  registerUser, 
  rechargeWallet, 
  addBooking, 
  cancelBooking, 
  cancelBookingByAdmin, 
  setOrUpdateLimit, 
  deleteLimit, 
  logout,
  initializeStore,
  subscribeToStore,
  getDemands,
  addDemand,
  approveDemand,
  rejectDemand,
  getDrawDeadlines,
  setDrawDeadline,
  getAdminConfiguredEmail,
  setAdminConfiguredEmail,
  getSupportWhatsAppNumber,
  checkInternetConnection
} from './utils/store';
import { User, Booking, NumberLimit, Demand, DrawDeadline } from './types';
import { db } from './lib/firebase';
import { doc, getDocFromServer, collection, query, where, getDocsFromServer } from 'firebase/firestore';
import DashboardHeader from './components/DashboardHeader';
import RegistrationForm from './components/RegistrationForm';
import DashboardOverview from './components/DashboardOverview';
import BookingPage from './components/BookingPage';
import UserProfilePage from './components/UserProfilePage';
import AdminPortal from './components/AdminPortal';
import PwaInstaller from './components/PwaInstaller';
import AIAnalysisPortal from './components/AIAnalysisPortal';
import { LayoutDashboard, Award, ScrollText, CalendarRange, Shield, HelpCircle, Sparkles } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [limits, setLimits] = useState<NumberLimit[]>([]);
  const [demands, setDemands] = useState<Demand[]>([]);
  const [deadlines, setDeadlines] = useState<DrawDeadline[]>([]);
  const [adminMode, setAdminMode] = useState<boolean>(false);
  const [adminConfiguredEmail, setAdminConfiguredEmailState] = useState<string>('mastermaindqureshi110@gmail.com');

  // Network and Wallet Protection states
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    execute: () => Promise<any>;
    resolve: (val: any) => void;
  } | null>(null);
  const [retryStatus, setRetryStatus] = useState<'idle' | 'checking' | 'failed'>('idle');

  const verifyNetworkAndExecute = async <T,>(action: () => Promise<T>): Promise<T | { success: false; error: string }> => {
    const online = await checkInternetConnection();
    if (!online) {
      setIsOfflineModalOpen(true);
      setRetryStatus('idle');
      return new Promise<T | { success: false; error: string }>((resolve) => {
        setPendingAction({
          execute: action,
          resolve: resolve as (val: any) => void
        });
      });
    }
    return await action();
  };

  const handleRetryConnection = async () => {
    setRetryStatus('checking');
    const online = await checkInternetConnection();
    if (online) {
      setIsOfflineModalOpen(false);
      setRetryStatus('idle');
      if (pendingAction) {
        const result = await pendingAction.execute();
        pendingAction.resolve(result);
        setPendingAction(null);
      }
    } else {
      setRetryStatus('failed');
    }
  };

  const whatsappNumber = getSupportWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("السلام علیکم! مجھے ماسٹر مائینڈ قریشی انٹرپرائز پرائز بانڈ سسٹم کے بارے میں مدد چاہئے۔")}`;

  // Initialize and load state
  useEffect(() => {
    initializeStore();
    const unsubscribe = subscribeToStore(() => {
      setAdminConfiguredEmailState(getAdminConfiguredEmail());
      syncWithStore();
    });
    return () => unsubscribe();
  }, []);

  const syncWithStore = () => {
    const loggedIn = getLoggedInUser();
    setCurrentUser(loggedIn);
    setUsers(getUsers());
    setBookings(getBookings());
    setLimits(getNumberLimits());
    setDemands(getDemands());
    setDeadlines(getDrawDeadlines());
    
    if (loggedIn) {
      if (loggedIn.role === 'admin') {
        setAdminMode(true);
      } else {
        setAdminMode(false);
      }
    } else {
      setAdminMode(false);
    }
  };

  const handleUpdateAdminEmail = async (email: string) => {
    const action = async () => {
      setAdminConfiguredEmail(email);
      setAdminConfiguredEmailState(email);
      syncWithStore();
      return true;
    };
    return await verifyNetworkAndExecute(action);
  };

  const handleSetDeadline = async (category: 'pakistan_bond' | 'thailand_lottery', deadlineIso: string, titleUrdu: string, status: 'open' | 'closed') => {
    const action = async () => {
      await setDrawDeadline(category, deadlineIso, titleUrdu, status);
      syncWithStore();
      return true;
    };
    return await verifyNetworkAndExecute(action);
  };

  const handleRegister = async (name: string, phone: string, city: string, email: string, password: string) => {
    const action = async () => {
      const usersList = getUsers();
      const emailLower = email.toLowerCase().trim();
      const existingEmail = usersList.find(u => u.email.toLowerCase() === emailLower);
      if (existingEmail) {
        return { success: false, error: 'یہ ای میل پہلے سے رجسٹرڈ ہے۔ (This email is already registered.)' };
      }
      const existingPhone = usersList.find(u => u.phone === phone.trim());
      if (existingPhone) {
        return { success: false, error: 'یہ موبائل نمبر پہلے سے رجسٹرڈ ہے۔ (This mobile number is already registered.)' };
      }

      const newUser = await registerUser(name, phone, city, email, password);
      if (newUser) {
        setLoggedInUser(newUser.email);
        syncWithStore();
        setActiveTab('dashboard');
        return { success: true };
      }
      return { success: false, error: 'رجسٹریشن ناکام رہی۔ (Registration failed.)' };
    };
    const res = await verifyNetworkAndExecute(action);
    if (res && 'success' in res) {
      return res as { success: boolean; error?: string };
    }
    return { success: false, error: 'نیٹ ورک کا مسئلہ ہے۔' };
  };

  const handleLoginWithCredentials = async (identifier: string, passwordInput: string): Promise<{ success: boolean; error?: string }> => {
    const action = async () => {
      const online = await checkInternetConnection();
      if (!online) {
        return { success: false, error: 'No internet connection. Please turn on Wi-Fi or Mobile Data and try again.' };
      }

      const idLower = identifier.toLowerCase().trim();
      let matchedUser: User | null = null;

      try {
        if (idLower.includes('@')) {
          let docId = idLower;
          if (docId === 'mastermaindqureshi110@gmail.com') {
            docId = 'mastermaind.qureshi110@gmail.com';
          }
          
          let userDocRef = doc(db, 'users', docId);
          let userDoc = await getDocFromServer(userDocRef);
          
          if (!userDoc.exists() && docId !== idLower) {
            userDocRef = doc(db, 'users', idLower);
            userDoc = await getDocFromServer(userDocRef);
          }
          
          if (userDoc.exists()) {
            matchedUser = userDoc.data() as User;
          }
        } else {
          const q = query(collection(db, 'users'), where('phone', '==', identifier.trim()));
          const querySnapshot = await getDocsFromServer(q);
          if (!querySnapshot.empty) {
            matchedUser = querySnapshot.docs[0].data() as User;
          }
        }
      } catch (err) {
        console.error("Secure login server query failed:", err);
      }

      if (!matchedUser) {
        return { success: false, error: 'یہ اکاؤنٹ رجسٹرڈ نہیں ہے۔ (This account is not registered.)' };
      }

      const emailLower = matchedUser.email.toLowerCase().trim();
      if (
        matchedUser.isAdmin || 
        matchedUser.role === 'admin' ||
        emailLower === 'mastermaind.qureshi110@gmail.com' || 
        emailLower === 'mastermaindqureshi110@gmail.com'
      ) {
        matchedUser.role = 'admin';
        matchedUser.isAdmin = true;
      }

      const storedPassword = matchedUser.password;
      const correctPassword = storedPassword || '123456';
      if (passwordInput !== correctPassword) {
        return { success: false, error: 'پاس ورڈ درست نہیں ہے۔ (Incorrect password.)' };
      }

      setLoggedInUser(matchedUser.email);
      syncWithStore();
      setActiveTab('dashboard');
      return { success: true };
    };

    const res = await verifyNetworkAndExecute(action);
    if (res && 'success' in res) {
      return res as { success: boolean; error?: string };
    }
    return { success: false, error: 'نیٹ ورک کا مسئلہ ہے۔' };
  };

  const handleLogout = () => {
    logout();
    syncWithStore();
    setActiveTab('dashboard');
  };

  const handleRecharge = async (email: string, amount: number): Promise<boolean> => {
    const action = async () => {
      const success = await rechargeWallet(email, amount);
      if (success) {
        syncWithStore();
      }
      return success;
    };
    const res = await verifyNetworkAndExecute(action);
    return typeof res === 'boolean' ? res : false;
  };

  const handleSetLimit = async (category: 'pakistan_bond' | 'thailand_lottery', number: string, maxAmount: number) => {
    const action = async () => {
      await setOrUpdateLimit(category, number, maxAmount);
      syncWithStore();
      return true;
    };
    return await verifyNetworkAndExecute(action);
  };

  const handleDeleteLimit = async (id: string) => {
    const action = async () => {
      await deleteLimit(id);
      syncWithStore();
      return true;
    };
    return await verifyNetworkAndExecute(action);
  };

  const handleAddBooking = async (category: 'pakistan_bond' | 'thailand_lottery', number: string, firstAmt: number, secondAmt: number) => {
    if (!currentUser) return { success: false, error: 'براہ کرم پہلے لاگ ان کریں۔' };
    
    // Secure deadline check
    const deadlinesList = getDrawDeadlines();
    const catDeadline = deadlinesList.find(d => d.category === category);
    if (catDeadline) {
      if (catDeadline.status === 'closed') {
        return { success: false, error: 'معذرت! اس ڈرا کی بکنگ بند ہو چکی ہے۔' };
      }
      const deadlineTime = new Date(catDeadline.deadlineIso).getTime();
      if (deadlineTime > 0 && Date.now() >= deadlineTime) {
        return { success: false, error: 'معذرت! اس ڈرا کی بکنگ کا وقت ختم ہو چکا ہے۔' };
      }
    }

    const action = async () => {
      const res = await addBooking(currentUser.email, category, number, firstAmt, secondAmt);
      if (res.success) {
        syncWithStore();
      }
      return res;
    };

    return await verifyNetworkAndExecute(action);
  };

  const handleCancelBooking = async (id: string) => {
    const action = async () => {
      const res = await cancelBooking(id);
      if (res.success) {
        syncWithStore();
      }
      return res;
    };
    return await verifyNetworkAndExecute(action);
  };

  const handleCancelBookingByAdmin = async (id: string) => {
    const action = async () => {
      const res = await cancelBookingByAdmin(id);
      if (res.success) {
        syncWithStore();
      }
      return res;
    };
    return await verifyNetworkAndExecute(action);
  };

  const handleAddDemand = async (category: 'pakistan_bond' | 'thailand_lottery', number: string, firstAmt: number, secondAmt: number) => {
    if (!currentUser) return { success: false, error: 'براہ کرم پہلے لاگ ان کریں۔' };

    // Secure deadline check
    const deadlinesList = getDrawDeadlines();
    const catDeadline = deadlinesList.find(d => d.category === category);
    if (catDeadline) {
      if (catDeadline.status === 'closed') {
        return { success: false, error: 'معذرت! اس ڈرا کی بکنگ بند ہو چکی ہے۔' };
      }
      const deadlineTime = new Date(catDeadline.deadlineIso).getTime();
      if (deadlineTime > 0 && Date.now() >= deadlineTime) {
        return { success: false, error: 'معذرت! اس ڈرا کی بکنگ کا وقت ختم ہو چکا ہے۔' };
      }
    }

    const action = async () => {
      const res = await addDemand(currentUser.email, category, number, firstAmt, secondAmt);
      if (res.success) {
        syncWithStore();
      }
      return res;
    };

    return await verifyNetworkAndExecute(action);
  };

  const handleApproveDemand = async (id: string) => {
    const action = async () => {
      const res = await approveDemand(id);
      if (res.success) {
        syncWithStore();
      }
      return res;
    };
    return await verifyNetworkAndExecute(action);
  };

  const handleRejectDemand = async (id: string) => {
    const action = async () => {
      const res = await rejectDemand(id);
      if (res.success) {
        syncWithStore();
      }
      return res;
    };
    return await verifyNetworkAndExecute(action);
  };

  const toggleAdminView = () => {
    if (activeTab === 'admin') {
      setActiveTab('dashboard');
    } else {
      setActiveTab('admin');
    }
  };

  // If user is not authenticated, override and show Registration/Login component
  if (!currentUser) {
    return (
      <>
        <RegistrationForm 
          onRegister={handleRegister} 
          onLoginWithCredentials={handleLoginWithCredentials} 
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        {/* Core Header with wallet widget */}
        <DashboardHeader
          user={currentUser}
          onLogout={handleLogout}
          onTabChange={setActiveTab}
          activeTab={activeTab}
          onToggleAdminView={toggleAdminView}
          adminMode={activeTab === 'admin'}
        />

        {/* Sub-navigation bar for easy navigation representing full features of the mockup */}
        <nav className="bg-white border-b border-slate-200 sticky top-[60px] z-40 shadow-sm leading-none">
          <div className="max-w-5xl mx-auto px-4 py-1 flex items-center justify-between sm:justify-center overflow-x-auto gap-2">
            
            <button
              id="subnav-dashboard"
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md shadow-amber-500/10'
                  : 'bg-slate-900 text-amber-400 font-semibold border-slate-950 hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className={`w-3.5 h-3.5 ${activeTab === 'dashboard' ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>ڈیش بورڈ</span>
            </button>

            <button
              id="subnav-aianalysis"
              onClick={() => setActiveTab('ai_analysis')}
              className={`flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${
                activeTab === 'ai_analysis'
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md shadow-amber-500/10'
                  : 'bg-slate-900 text-amber-400 font-semibold border-slate-950 hover:bg-slate-800'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${activeTab === 'ai_analysis' ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>اے آئی اینالیسس پورٹل (AI Portal)</span>
            </button>

            <button
              id="subnav-profile"
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md shadow-amber-500/10'
                  : 'bg-slate-900 text-amber-400 font-semibold border-slate-950 hover:bg-slate-800'
              }`}
            >
              <Award className={`w-3.5 h-3.5 ${activeTab === 'profile' ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>کسٹمر پروفائل</span>
            </button>

            <button
              id="subnav-pakistan"
              onClick={() => setActiveTab('pakistan_bond')}
              className={`flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${
                activeTab === 'pakistan_bond'
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md shadow-amber-500/10'
                  : 'bg-slate-900 text-amber-400 font-semibold border-slate-950 hover:bg-slate-800'
              }`}
            >
              <CalendarRange className={`w-3.5 h-3.5 ${activeTab === 'pakistan_bond' ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>پاکستان بانڈ</span>
            </button>

            <button
              id="subnav-thailand"
              onClick={() => setActiveTab('thailand_lottery')}
              className={`flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${
                activeTab === 'thailand_lottery'
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md shadow-amber-500/10'
                  : 'bg-slate-900 text-amber-400 font-semibold border-slate-950 hover:bg-slate-800'
              }`}
            >
              <ScrollText className={`w-3.5 h-3.5 ${activeTab === 'thailand_lottery' ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>تھائی لینڈ لاٹری</span>
            </button>

            {/* Admin toggle visual link in sub-nav */}
            {adminMode && (
              <button
                id="subnav-admin"
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900 text-amber-400 font-semibold border-slate-950 hover:bg-slate-800'
                }`}
              >
                <Shield className={`w-3.5 h-3.5 ${activeTab === 'admin' ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>ایڈمن پینل</span>
              </button>
            )}

          </div>
        </nav>

        {/* Content routing based on current state */}
        <main className="max-w-5xl mx-auto px-4 py-8">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              user={currentUser}
              bookings={bookings}
              onTabChange={setActiveTab}
              adminMode={adminMode}
            />
          )}

          {activeTab === 'profile' && (
            <UserProfilePage
              user={currentUser}
              totalBookingsCount={bookings.filter(b => b.userEmail === currentUser.email).length}
            />
          )}

          {activeTab === 'pakistan_bond' && (
            <BookingPage
              user={currentUser}
              bookings={bookings}
              limits={limits}
              demands={demands}
              deadlines={deadlines}
              category="pakistan_bond"
              onAddBooking={(num, first, second) => handleAddBooking('pakistan_bond', num, first, second)}
              onCancelBooking={handleCancelBooking}
              onAddDemand={(num, first, second) => handleAddDemand('pakistan_bond', num, first, second)}
            />
          )}

          {activeTab === 'thailand_lottery' && (
            <BookingPage
              user={currentUser}
              bookings={bookings}
              limits={limits}
              demands={demands}
              deadlines={deadlines}
              category="thailand_lottery"
              onAddBooking={(num, first, second) => handleAddBooking('thailand_lottery', num, first, second)}
              onCancelBooking={handleCancelBooking}
              onAddDemand={(num, first, second) => handleAddDemand('thailand_lottery', num, first, second)}
            />
          )}

          {activeTab === 'admin' && adminMode && (
            <AdminPortal
              users={users}
              limits={limits}
              demands={demands}
              deadlines={deadlines}
              bookings={bookings}
              onCancelBookingByAdmin={handleCancelBookingByAdmin}
              onRecharge={handleRecharge}
              onSetLimit={handleSetLimit}
              onDeleteLimit={handleDeleteLimit}
              onApproveDemand={handleApproveDemand}
              onRejectDemand={handleRejectDemand}
              onSetDeadline={handleSetDeadline}
            />
          )}

          {activeTab === 'ai_analysis' && (
            <AIAnalysisPortal
              user={currentUser}
              bookings={bookings}
              onAddBooking={(num, first, second) => handleAddBooking('pakistan_bond', num, first, second)}
              onAddDemand={(num, first, second) => handleAddDemand('pakistan_bond', num, first, second)}
            />
          )}

        </main>
      </div>

      {/* Footer copyright */}
      <footer className="bg-slate-900 text-slate-400 py-6 border-t border-slate-800 text-center text-xs font-sans mt-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} MasterMind Qureshi Enterprise. تمام حقوق محفوظ ہیں۔</p>
          
          {/* Global WhatsApp Quick Helpline */}
          <a
            href={whatsappUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-full transition-all text-xs font-bold whitespace-nowrap cursor-pointer hover:scale-105 active:scale-100"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>مدد اور واٹس ایپ رابطہ (WhatsApp Support)</span>
          </a>

          <div className="flex gap-4 text-[11px] font-mono">
            <span className="text-amber-500">Fast Booking Systems</span>
            <span>Secure Wallet Node</span>
          </div>
        </div>
      </footer>

      {/* Beautiful Offline / No Internet modal overlay */}
      {isOfflineModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl border-2 border-red-500 shadow-2xl p-6 sm:p-8 text-right font-sans flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4 border border-red-200">
              <span className="text-red-500 text-3xl font-bold font-mono animate-pulse">!</span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-sans">انٹرنیٹ کنکشن موجود نہیں ہے</h3>
            <h4 className="text-sm font-semibold text-red-600 mb-4 font-sans uppercase tracking-wider">No Internet Connection</h4>
            
            <p className="text-slate-600 text-sm leading-relaxed mb-6 text-center">
              "No internet connection. Please turn on Wi-Fi or Mobile Data and try again."
              <br />
              <span className="text-xs text-slate-500 block mt-2">
                انٹرنیٹ کنکشن غائب ہے۔ براہ کرم اپنا وائی فائی یا موبائل ڈیٹا آن کریں اور دوبارہ کوشش کریں۔
              </span>
            </p>

            {retryStatus === 'failed' && (
              <div className="w-full bg-red-50 border border-red-200 rounded-2xl p-3 text-red-700 text-xs text-center mb-4">
                انٹرنیٹ ابھی بھی منقطع ہے۔ براہ کرم دوبارہ چیک کریں۔
                <br />
                Connection still offline. Please check and retry.
              </div>
            )}

            <button
              onClick={handleRetryConnection}
              disabled={retryStatus === 'checking'}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-amber-400 font-bold py-3.5 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {retryStatus === 'checking' ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-amber-400 border-t-transparent"></span>
                  <span>رابطہ چیک کیا جا رہا ہے...</span>
                </>
              ) : (
                <span>دوبارہ کوشش کریں (Retry)</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
