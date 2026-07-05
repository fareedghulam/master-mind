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
  setOrUpdateLimit, 
  deleteLimit, 
  logout,
  initializeStore,
  getDemands,
  addDemand,
  approveDemand,
  rejectDemand,
  getDrawDeadlines,
  setDrawDeadline,
  getAdminConfiguredEmail,
  setAdminConfiguredEmail,
  getSupportWhatsAppNumber
} from './utils/store';
import { User, Booking, NumberLimit, Demand, DrawDeadline } from './types';
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
  const [adminConfiguredEmail, setAdminConfiguredEmailState] = useState<string>('mastermaind.qureshi110@gmail.com');

  const whatsappNumber = getSupportWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("السلام علیکم! مجھے ماسٹر مائینڈ قریشی انٹرپرائز پرائز بانڈ سسٹم کے بارے میں مدد چاہئے۔")}`;

  // Initialize and load state
  useEffect(() => {
    initializeStore();
    setAdminConfiguredEmailState(getAdminConfiguredEmail());
    syncWithStore();
  }, []);

  const syncWithStore = () => {
    const loggedIn = getLoggedInUser();
    setCurrentUser(loggedIn);
    setUsers(getUsers());
    setBookings(getBookings());
    setLimits(getNumberLimits());
    setDemands(getDemands());
    setDeadlines(getDrawDeadlines());
    
    const configuredAdmin = getAdminConfiguredEmail();
    if (loggedIn) {
      if (loggedIn.isAdmin && loggedIn.email.toLowerCase() === configuredAdmin.toLowerCase()) {
        setAdminMode(true);
      } else {
        setAdminMode(false);
      }
    } else {
      setAdminMode(false);
    }
  };

  const handleUpdateAdminEmail = (email: string) => {
    setAdminConfiguredEmail(email);
    setAdminConfiguredEmailState(email);
    syncWithStore();
  };

  const handleSetDeadline = (category: 'pakistan_bond' | 'thailand_lottery', deadlineIso: string, titleUrdu: string, status: 'open' | 'closed') => {
    setDrawDeadline(category, deadlineIso, titleUrdu, status);
    syncWithStore();
  };

  const handleRegister = (name: string, phone: string, city: string, email: string) => {
    const newUser = registerUser(name, phone, city, email);
    setLoggedInUser(newUser.email);
    syncWithStore();
    setActiveTab('dashboard');
  };

  const handleLoginWithEmail = (email: string): boolean => {
    const usersList = getUsers();
    const found = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setLoggedInUser(found.email);
      syncWithStore();
      setActiveTab('dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    logout();
    syncWithStore();
    setActiveTab('dashboard');
  };

  const handleRecharge = (email: string, amount: number): boolean => {
    const success = rechargeWallet(email, amount);
    if (success) {
      syncWithStore();
    }
    return success;
  };

  const handleSetLimit = (category: 'pakistan_bond' | 'thailand_lottery', number: string, maxAmount: number) => {
    setOrUpdateLimit(category, number, maxAmount);
    syncWithStore();
  };

  const handleDeleteLimit = (id: string) => {
    deleteLimit(id);
    syncWithStore();
  };

  const handleAddBooking = (category: 'pakistan_bond' | 'thailand_lottery', number: string, firstAmt: number, secondAmt: number) => {
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

    const res = addBooking(currentUser.email, category, number, firstAmt, secondAmt);
    if (res.success) {
      syncWithStore();
    }
    return res;
  };

  const handleCancelBooking = (id: string) => {
    const res = cancelBooking(id);
    if (res.success) {
      syncWithStore();
    }
    return res;
  };

  const handleAddDemand = (category: 'pakistan_bond' | 'thailand_lottery', number: string, firstAmt: number, secondAmt: number) => {
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

    const res = addDemand(currentUser.email, category, number, firstAmt, secondAmt);
    if (res.success) {
      syncWithStore();
    }
    return res;
  };

  const handleApproveDemand = (id: string) => {
    const res = approveDemand(id);
    if (res.success) {
      syncWithStore();
    }
    return res;
  };

  const handleRejectDemand = (id: string) => {
    const res = rejectDemand(id);
    if (res.success) {
      syncWithStore();
    }
    return res;
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
        <PwaInstaller />
        <RegistrationForm 
          onRegister={handleRegister} 
          onLoginWithEmail={handleLoginWithEmail} 
          adminConfiguredEmail={adminConfiguredEmail}
          onUpdateAdminEmail={handleUpdateAdminEmail}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <PwaInstaller />
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
            
            {/* Admin toggle visual link in sub-nav */}
            {adminMode && (
              <button
                id="subnav-admin"
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-sm'
                    : 'bg-amber-50/50 text-amber-900 border-amber-100 hover:bg-amber-100/55'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>ایڈمن پینل</span>
              </button>
            )}

            <button
              id="subnav-thailand"
              onClick={() => setActiveTab('thailand_lottery')}
              className={`flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${
                activeTab === 'thailand_lottery'
                  ? 'bg-slate-900 text-amber-400 font-bold border-slate-950'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <ScrollText className="w-3.5 h-3.5 text-slate-500" />
              <span>تھائی لینڈ لاٹری</span>
            </button>

            <button
              id="subnav-pakistan"
              onClick={() => setActiveTab('pakistan_bond')}
              className={`flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${
                activeTab === 'pakistan_bond'
                  ? 'bg-slate-900 text-amber-400 font-bold border-slate-950'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <CalendarRange className="w-3.5 h-3.5 text-slate-500" />
              <span>پاکستان بانڈ</span>
            </button>

            <button
              id="subnav-profile"
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-slate-900 text-amber-400 font-bold border-slate-950'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-slate-500" />
              <span>کسٹمر پروفائل</span>
            </button>

            <button
              id="subnav-dashboard"
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-slate-900 text-amber-400 font-bold border-slate-950'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
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
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>اے آئی اینالیسس پورٹل (AI Portal)</span>
            </button>

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
    </div>
  );
}
