import { useState, FormEvent } from 'react';
import { User } from '../types';
import { 
  User as UserIcon, 
  Phone, 
  MapPin, 
  Mail, 
  Award, 
  CreditCard, 
  MessageCircle, 
  Edit3, 
  Save, 
  X, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Lock
} from 'lucide-react';
import { getSupportWhatsAppNumber, updateUserProfile } from '../utils/store';

interface ProfileProps {
  user: User;
  totalBookingsCount: number;
}

export default function UserProfilePage({ user, totalBookingsCount }: ProfileProps) {
  const whatsappNumber = getSupportWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("السلام علیکم! مجھے ماسٹر مائینڈ قریشی انٹرپرائز پرائز بانڈ سسٹم کے بارے میں مدد چاہئے۔")}`;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(user.name || '');
  const [phone, setPhone] = useState<string>(user.phone || '');
  const [city, setCity] = useState<string>(user.city || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleStartEditing = () => {
    setName(user.name || '');
    setPhone(user.phone || '');
    setCity(user.city || '');
    setStatusMessage(null);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setStatusMessage(null);
  };

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedCity = city.trim();

    if (!trimmedName) {
      setStatusMessage({ text: 'نام کا درج کرنا لازمی ہے۔', type: 'error' });
      return;
    }
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      setStatusMessage({ text: 'نام 2 سے 100 حروف کے درمیان ہونا چاہیے۔', type: 'error' });
      return;
    }

    if (!trimmedPhone) {
      setStatusMessage({ text: 'موبائل نمبر درج کرنا لازمی ہے۔', type: 'error' });
      return;
    }
    const phoneRegex = /^[\d\+\-\s]{10,20}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      setStatusMessage({ text: 'براہ کرم درست فون نمبر درج کریں۔ (مثلاً: 03001234567)', type: 'error' });
      return;
    }

    if (!trimmedCity) {
      setStatusMessage({ text: 'شہر کا نام درج کرنا لازمی ہے۔', type: 'error' });
      return;
    }
    if (trimmedCity.length > 50) {
      setStatusMessage({ text: 'شہر کا نام 50 حروف سے زیادہ نہیں ہو سکتا۔', type: 'error' });
      return;
    }

    if (!user.uid) {
      setStatusMessage({ text: 'صارف کی شناخت (UID) موجود نہیں ہے۔', type: 'error' });
      return;
    }

    setLoading(true);
    const result = await updateUserProfile(user.uid, {
      name: trimmedName,
      phone: trimmedPhone,
      city: trimmedCity
    });
    setLoading(false);

    if (result.success) {
      setStatusMessage({ text: result.message, type: 'success' });
      setTimeout(() => {
        setIsEditing(false);
      }, 1200);
    } else {
      setStatusMessage({ text: result.message, type: 'error' });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-100 max-w-2xl mx-auto text-right font-sans">
      {/* Header Profile Summary */}
      <div className="flex flex-col items-center pb-6 border-b border-slate-100 mb-6 relative">
        <div className="w-20 h-20 bg-slate-900 border-2 border-amber-400 rounded-full flex items-center justify-center text-white mb-4 shadow-lg text-3xl font-bold font-sans">
          {user.name.trim().charAt(0) || 'ک'}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">{user.name}</h3>
        <p className="text-xs text-slate-400 font-mono mt-1">{user.email}</p>

        {user.isAdmin && (
          <span className="mt-2.5 inline-flex items-center gap-1 bg-amber-500 text-slate-950 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>ایڈمن اکاؤنٹ (Admin)</span>
          </span>
        )}

        {!isEditing && (
          <button
            onClick={handleStartEditing}
            className="mt-4 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer hover:-translate-y-0.5"
          >
            <Edit3 className="w-4 h-4" />
            <span>پروفائل میں ترمیم کریں (Edit Profile)</span>
          </button>
        )}
      </div>

      {/* Global Status Message */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl mb-6 flex items-center justify-between gap-3 text-xs font-bold border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Profile Details or Edit Form */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-50">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest text-left">
            PERSONAL DOSSIER / کسٹمر کی مکمل پروفائل
          </h4>
          {isEditing && (
            <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
              ترمیم موڈ (Editing Mode)
            </span>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 text-right">
                پورا نام (Full Name) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  maxLength={100}
                  placeholder="اپنا مکمل نام درج کریں"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-right"
                />
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 text-right">
                موبائل نمبر (Mobile / Phone) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                  maxLength={20}
                  placeholder="03001234567"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono font-semibold text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-right"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 text-right">
                شہر (City) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={loading}
                  maxLength={50}
                  placeholder="اپنا شہر درج کریں"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-right"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* Read-Only Fields */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    غیر تبدیل پذیر (Read Only)
                  </span>
                  <label className="block text-xs font-bold text-slate-500 text-right">
                    ای میل ایڈریس (Email ID)
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={user.email}
                    disabled
                    className="w-full bg-slate-100 border border-slate-200/80 rounded-xl px-4 py-2.5 text-sm font-mono font-semibold text-slate-500 cursor-not-allowed text-right select-all"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    غیر تبدیل پذیر (Read Only)
                  </span>
                  <label className="block text-xs font-bold text-slate-500 text-right">
                    صارف کی شناخت (User UID)
                  </label>
                </div>
                <input
                  type="text"
                  value={user.uid || 'N/A'}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-500 cursor-not-allowed text-right select-all"
                />
              </div>
            </div>

            {/* Submit & Cancel Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 justify-end">
              <button
                type="button"
                onClick={handleCancelEditing}
                disabled={loading}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>منسوخ کریں (Cancel)</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50 hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>محفوظ ہو رہا ہے...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>پروفائل محفوظ کریں (Save)</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 flex items-center gap-3 justify-between">
              <Phone className="w-5 h-5 text-amber-500/80" />
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">موبائل نمبر (Mobile)</span>
                <span className="font-mono text-sm text-slate-800 font-semibold">{user.phone}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 flex items-center gap-3 justify-between">
              <MapPin className="w-5 h-5 text-amber-500/80" />
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">شہر (City)</span>
                <span className="text-sm text-slate-800 font-semibold">{user.city}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 flex items-center gap-3 justify-between">
              <Mail className="w-5 h-5 text-amber-500/80" />
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">رجسٹریشن ایمیل (Email ID)</span>
                <span className="font-mono text-sm text-slate-800 font-semibold">{user.email}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 flex items-center gap-3 justify-between">
              <CreditCard className="w-5 h-5 text-amber-500/80" />
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">والٹ رقم (Wallet Balance)</span>
                <span className="font-mono text-sm text-amber-600 font-bold">Rs. {user.balance.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Summary stats */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl mt-6 flex justify-between items-center">
          <div className="text-left font-mono">
            <span className="block text-[10px] text-slate-400 uppercase">Bookings Record</span>
            <span className="text-2xl font-bold text-amber-400">{totalBookingsCount}</span>
          </div>
          <div className="text-right">
            <h5 className="font-semibold text-sm">سروس بکنگ کی تفصیلات</h5>
            <p className="text-xs text-slate-300 mt-1">
              آپ کے پاکستان بانڈ اور تھائی لینڈ لاٹری کے کل بک شدہ نمبرز۔
            </p>
          </div>
        </div>

        {/* WhatsApp Contact Section */}
        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/10 cursor-pointer hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>واٹس ایپ پر رابطہ کریں (WhatsApp)</span>
          </a>
          <div className="text-center sm:text-right">
            <h5 className="font-bold text-xs text-emerald-950">کسٹمر سپورٹ و والٹ فنڈز ہیلپ</h5>
            <p className="text-[11px] text-emerald-800 mt-1">
              بیلنس چارج کروانے یا کسی بھی مدد کے لیے ابھی ایڈمن سے واٹس ایپ پر رابطہ کریں۔
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
