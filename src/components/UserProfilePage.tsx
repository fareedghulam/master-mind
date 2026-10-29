import { useState, useEffect, FormEvent } from 'react';
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
  Lock,
  Trash2,
  AlertTriangle,
  KeyRound,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { getSupportWhatsAppNumber, updateUserProfile, deleteOwnAccount, deleteOwnAccountWithGoogle, isSuperOwner } from '../utils/store';
import { DELETE_ACCOUNT_URL, PRIVACY_POLICY_URL } from '../utils/appUrls';
import PolicyViewerModal from './PolicyViewerModal';

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

  // Secure Account Deletion States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletePassword, setDeletePassword] = useState<string>('');
  const [confirmKeyword, setConfirmKeyword] = useState<string>('');
  const [confirmCheckbox, setConfirmCheckbox] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string>('');
  const [deleteSuccess, setDeleteSuccess] = useState<string>('');
  const [requiresRecentLogin, setRequiresRecentLogin] = useState<boolean>(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState<boolean>(false);

  const isUserSuperOwner = isSuperOwner(user.email);

  const handleDeleteAccount = async () => {
    setDeleteError('');
    setDeleteSuccess('');
    setIsDeleting(true);

    try {
      const res = await deleteOwnAccount(deletePassword.trim());
      if (res.success) {
        setDeleteSuccess(res.message || 'آپ کا اکاؤنٹ اور تمام ذاتی ڈیٹا کامیابی سے مستقل طور پر حذف کر دیا گیا ہے۔');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        if (res.requiresRecentLogin) {
          setRequiresRecentLogin(true);
          setDeleteError('سیکیورٹی تقاضے کے تحت، براہ کرم اپنے پاس ورڈ یا گوگل اکاؤنٹ سے دوبارہ تصدیق کریں۔');
        } else {
          setDeleteError(res.error || 'اکاؤنٹ حذف کرنے میں خرابی پیش آئی۔');
        }
      }
    } catch (err: any) {
      setDeleteError(err?.message || 'خرابی پیش آئی۔');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleGoogleDelete = async () => {
    setDeleteError('');
    setDeleteSuccess('');
    setIsDeleting(true);

    try {
      const res = await deleteOwnAccountWithGoogle();
      if (res.success) {
        setDeleteSuccess(res.message || 'آپ کا اکاؤنٹ اور تمام ذاتی ڈیٹا کامیابی سے مستقل طور پر حذف کر دیا گیا ہے۔');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setDeleteError(res.error || 'گوگل تصدیق کے دوران خرابی پیش آئی۔');
      }
    } catch (err: any) {
      setDeleteError(err?.message || 'خرابی پیش آئی۔');
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setCity(user.city || '');
    }
  }, [user, isEditing]);

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

        {user.isAdmin ? (
          <span className="mt-2.5 inline-flex items-center gap-1 bg-amber-500 text-slate-950 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>ایڈمن اکاؤنٹ (Admin)</span>
          </span>
        ) : user.role === 'dealer' ? (
          <span className="mt-2.5 inline-flex items-center gap-1 bg-amber-100 text-amber-950 border border-amber-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>مجاز ڈیلر (Authorized Dealer)</span>
          </span>
        ) : null}

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

        {/* Danger Zone: Google Play Compliant Account & Data Deletion */}
        <div className="bg-red-50/50 border-2 border-red-200 rounded-3xl p-5 sm:p-6 mt-8 space-y-4 text-right">
          <div className="flex items-center justify-between border-b border-red-100 pb-3">
            <div className="flex items-center gap-2">
              <a
                href={DELETE_ACCOUNT_URL}
                onClick={(e) => {
                  e.preventDefault();
                  setIsPolicyModalOpen(true);
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-red-600 hover:text-red-700 underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>پالیسی معلومات (Policy)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-red-700">
                خطرناک زون / اکاؤنٹ مستقل حذف کریں (Account Deletion)
              </h4>
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            اگر آپ MasterMind Qureshi Enterprise سسٹم سے اپنا اکاؤنٹ، رابطہ معلومات اور تمام ذاتی ڈیٹا مکمل و مستقل طور پر ختم کرنا چاہتے ہیں تو آپ یہاں سے خودکار طریقے سے اپنا اکاؤنٹ فوری حذف کر سکتے ہیں۔
          </p>

          <div className="bg-white/80 p-3.5 rounded-2xl border border-red-100 space-y-2 text-[11px] text-slate-600">
            <div className="flex items-start justify-end gap-2 text-right">
              <div>
                <strong className="text-red-700">کیا حذف ہوگا (What will be deleted):</strong>
                <p className="mt-0.5 text-slate-500">
                  فائر بیس لاگ ان اکاؤنٹ (Authentication)، آپ کی پروفائل (نام، موبائل نمبر، شہر، ای میل) اور تمام غیر حل شدہ مطالبات (Demands) ہمیشہ کے لیے مٹ جائیں گے۔
                </p>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
            </div>

            <div className="flex items-start justify-end gap-2 text-right">
              <div>
                <strong className="text-slate-700">قانونی و مالیاتی ڈیٹا کا تحفظ (Data Retention):</strong>
                <p className="mt-0.5 text-slate-500">
                  ماضی کی قرعہ اندازیوں کے مالیاتی ٹرانزیکشنز اور بکنگ ریکارڈز قانون، ٹیکس اور دھوکہ دہی کی روک تھام کے تقاضوں کے تحت شناخت کے بغیر سیکیور سسٹم آرکائیو میں محفوظ رہتے ہیں۔
                </p>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            {isUserSuperOwner ? (
              <span className="text-xs text-amber-700 font-bold bg-amber-100/70 border border-amber-300 px-4 py-2 rounded-xl">
                سپر اونر (Super Owner) اکاؤنٹ کی سیکیورٹی کی وجہ سے اسے حذف نہیں کیا جا سکتا۔
              </span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setDeleteError('');
                  setDeleteSuccess('');
                  setDeletePassword('');
                  setConfirmKeyword('');
                  setConfirmCheckbox(false);
                  setRequiresRecentLogin(false);
                  setIsDeleteModalOpen(true);
                }}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:-translate-y-0.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>میرا اکاؤنٹ مستقل حذف کریں (Delete My Account)</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal: Interactive Two-Step Secure Account Deletion */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-lg w-full rounded-3xl border border-red-200 shadow-2xl p-6 sm:p-8 text-right font-sans animate-in fade-in max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={isDeleting}
                  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-red-600">
                    اکاؤنٹ مستقل حذف کرنے کی تصدیق
                  </h4>
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                </div>
              </div>

              {/* Status alerts */}
              {deleteError && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs mb-4 text-right flex items-start justify-end gap-2">
                  <span>{deleteError}</span>
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                </div>
              )}

              {deleteSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs mb-4 text-right flex items-center justify-end gap-2 font-bold">
                  <span>{deleteSuccess}</span>
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                </div>
              )}

              {/* Body */}
              <div className="space-y-4 mb-6 text-xs text-slate-600 leading-relaxed">
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl space-y-1 text-right">
                  <div className="text-[11px] text-slate-500 font-mono">
                    ای میل: <strong className="text-slate-800">{user.email}</strong>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    صارف کی شناخت (UID): <strong className="text-slate-800">{user.uid}</strong>
                  </div>
                </div>

                <p className="text-slate-700">
                  کیا آپ واقعی اپنا اکاؤنٹ اور تمام ذاتی ڈیٹا حذف کرنا چاہتے ہیں؟ یہ عمل مستقل ہے اور اسے واپس نہیں لایا جا سکتا۔
                </p>

                {/* Password / Google Re-authentication */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5 text-right">
                      پاس ورڈ کی تصدیق (Password Verification):
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="اپنا پاس ورڈ درج کریں"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        disabled={isDeleting}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-red-500 focus:bg-white text-right"
                      />
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  {requiresRecentLogin && (
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl space-y-2">
                      <p className="text-amber-800 text-[11px] font-semibold">
                        اگر آپ گوگل کے ذریعے لاگ ان ہوئے تھے، تو نیچے دیے گئے بٹن پر کلک کر کے گوگل تصدیق کریں:
                      </p>
                      <button
                        type="button"
                        onClick={handleGoogleDelete}
                        disabled={isDeleting}
                        className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                      >
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>گوگل کے ساتھ دوبارہ تصدیق کر کے حذف کریں (Google Re-auth)</span>
                      </button>
                    </div>
                  )}

                  {/* Confirmation Keyword */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5 text-right">
                      تصدیق کے لیے انگریزی میں <span className="text-red-600 font-mono">DELETE</span> لکھیں:
                    </label>
                    <input
                      type="text"
                      placeholder="DELETE"
                      value={confirmKeyword}
                      onChange={(e) => setConfirmKeyword(e.target.value)}
                      disabled={isDeleting}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-red-500 focus:bg-white text-center font-bold tracking-widest uppercase"
                    />
                  </div>

                  {/* Checkbox agreement */}
                  <label className="flex items-start gap-2.5 pt-2 cursor-pointer text-right flex-row-reverse">
                    <input
                      type="checkbox"
                      checked={confirmCheckbox}
                      onChange={(e) => setConfirmCheckbox(e.target.checked)}
                      disabled={isDeleting}
                      className="mt-1 w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer shrink-0"
                    />
                    <span className="text-[11px] text-slate-700 select-none">
                      میں تصدیق کرتا/کرتی ہوں کہ میں اپنا اکاؤنٹ، رابطہ نمبر اور تمام ذاتی پروفائل ہمیشہ کے لیے ختم کرنا چاہتا/چاہتی ہوں۔
                    </span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={isDeleting}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
                >
                  منسوخ کریں (Cancel)
                </button>

                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || !confirmCheckbox || confirmKeyword.trim() !== 'DELETE'}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:cursor-not-allowed hover:-translate-y-0.5"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>اکاؤنٹ حذف کیا جا رہا ہے...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>مستقل حذف کریں (Confirm Delete)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Policy & Deletion Modal */}
      <PolicyViewerModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        initialType="deletion"
        currentUser={user}
        onTriggerInAppDelete={() => setIsDeleteModalOpen(true)}
      />
    </div>
  );
}
