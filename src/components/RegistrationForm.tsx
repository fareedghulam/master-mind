import React, { useState, FormEvent } from 'react';
import { generateProjectCodePDF } from '../utils/codePdfGenerator';
import { User, Phone, MapPin, Mail, Sparkles, LogIn, ChevronRight, FileCode, BookOpen, Shield, MessageCircle } from 'lucide-react';
import { getSupportWhatsAppNumber } from '../utils/store';

interface RegistrationFormProps {
  onRegister: (name: string, phone: string, city: string, email: string) => void;
  onLoginWithEmail: (email: string) => boolean;
  adminConfiguredEmail: string;
  onUpdateAdminEmail: (email: string) => void;
}

export default function RegistrationForm({ onRegister, onLoginWithEmail, adminConfiguredEmail, onUpdateAdminEmail }: RegistrationFormProps) {
  const [isLoginTab, setIsLoginTab] = useState(false);
  const whatsappNumber = getSupportWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("السلام علیکم! مجھے ماسٹر مائینڈ قریشی انٹرپرائز پرائز بانڈ سسٹم کے بارے میں مدد چاہئے۔")}`;
  
  // Registration States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  
  // Login States
  const [loginEmail, setLoginEmail] = useState('');

  // Activation States
  const [activationEmail, setActivationEmail] = useState('');
  const [isActivationOpen, setIsActivationOpen] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !phone || !city || !email) {
      setError('براہ کرم تمام خانے پُر کریں۔ (Please fill in all fields.)');
      return;
    }

    if (!email.includes('@')) {
      setError('براہ کرم درست ایمیل ایڈریس ٹائپ کریں۔ (Please enter a valid email.)');
      return;
    }

    onRegister(name, phone, city, email);
    setSuccess('رجسٹریشن کامیاب ہو گئی ہے! لاگ ان کیا جا رہا ہے...');
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!loginEmail) {
      setError('براہ کرم اپنا ایمیل درج کریں۔ (Please enter your email.)');
      return;
    }

    const ok = onLoginWithEmail(loginEmail);
    if (!ok) {
      setError('یہ ایمیل رجسٹرڈ نہیں ہے۔ (This email is not registered.)');
    }
  };

  const handleActivateSubmit = (e: FormEvent) => {
    e.preventDefault();
    setActivationSuccess('');
    setError('');

    if (!activationEmail || !activationEmail.includes('@')) {
      setError('برائے مہربانی ایک درست ای میل درج کریں۔ (Please enter a valid email.)');
      return;
    }

    onUpdateAdminEmail(activationEmail);
    setActivationSuccess(`ایپلی کیشن کو ای میل ${activationEmail} کے ساتھ کامیابی سے فعال کر دیا گیا ہے!`);
    setActivationEmail('');
  };

  // Pre-fill helpers for the reviewer to test easily
  const handlePrefill = (emailVal: string) => {
    if (emailVal === 'fareed.ghulam@gmail.com') {
      onLoginWithEmail('fareed.ghulam@gmail.com');
    } else if (emailVal === adminConfiguredEmail) {
      onLoginWithEmail(adminConfiguredEmail);
    } else {
      onLoginWithEmail(emailVal);
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-4 bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-none border-2 border-slate-300 overflow-hidden shadow-sm">
        {/* Top brand section */}
        <div className="bg-slate-950 text-white p-8 text-center relative border-b-4 border-blue-500">
          <div className="absolute top-3 right-3 bg-slate-900 text-blue-400 border border-slate-700 font-mono text-[9px] px-2 py-0.5 rounded-none uppercase tracking-widest font-bold">
            Mobile App
          </div>
          <div className="relative mx-auto mb-4 w-24 h-24 rounded-full border-2 border-amber-500/30 overflow-hidden shadow-lg shadow-black/50">
            <img 
              src="/mastermind_logo.jpg" 
              alt="MasterMind Qureshi Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-2xl font-bold font-sans text-white">ماسٹر مائینڈ قریشی انٹرپرائز</h2>
          <p className="text-slate-400 text-xs mt-1 font-mono tracking-widest">MASTERMIND QURESHI ENTERPRISE</p>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-300 font-bold">
          <button
            id="tab-register"
            onClick={() => { setIsLoginTab(false); setError(''); }}
            className={`w-1/2 py-4 text-center text-sm transition-colors cursor-pointer rounded-none ${
              !isLoginTab 
                ? 'text-blue-600 border-b-4 border-blue-600 bg-slate-50 font-extrabold' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
            }`}
          >
            کسٹمر رجسٹریشن (Register)
          </button>
          <button
            id="tab-login"
            onClick={() => { setIsLoginTab(true); setError(''); }}
            className={`w-1/2 py-4 text-center text-sm transition-colors cursor-pointer rounded-none ${
              isLoginTab 
                ? 'text-blue-600 border-b-4 border-blue-600 bg-slate-50 font-extrabold' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
            }`}
          >
            لاگ ان (Login)
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-5 p-3 rounded-none bg-red-50 border-r-4 border-red-500 border-l border-t border-b border-slate-200 text-red-700 text-xs leading-relaxed text-right font-sans">
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className="mb-5 p-3 rounded-none bg-emerald-50 border-r-4 border-emerald-500 border-l border-t border-b border-slate-200 text-emerald-800 text-xs leading-relaxed text-right font-sans">
              ✓ {success}
            </div>
          )}

          {!isLoginTab ? (
            /* Registration Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-right">
              <div>
                <label className="block text-slate-700 text-xs font-bold mb-1.5 font-sans" htmlFor="reg-name">
                  کسٹمر نام (Customer Name) *
                </label>
                <div className="relative">
                  <input
                    id="reg-name"
                    type="text"
                    placeholder="اپنا نام لکھیں"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-right bg-slate-50 border border-slate-300 rounded-none py-3 px-4 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-sans"
                    dir="rtl"
                  />
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-bold mb-1.5 font-sans" htmlFor="reg-phone">
                  موبائل نمبر (Mobile Number) *
                </label>
                <div className="relative">
                  <input
                    id="reg-phone"
                    type="tel"
                    placeholder="03001234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-left bg-slate-50 border border-slate-300 rounded-none py-3 px-4 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono"
                  />
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-bold mb-1.5 font-sans" htmlFor="reg-city">
                  شہر (City) *
                </label>
                <div className="relative">
                  <input
                    id="reg-city"
                    type="text"
                    placeholder="مثال: لاہور، کراچی، ملتان"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-right bg-slate-50 border border-slate-300 rounded-none py-3 px-4 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-sans"
                    dir="rtl"
                  />
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-bold mb-1.5 font-sans" htmlFor="reg-email">
                  ایمیل ایڈریس (Email / ID) *
                </label>
                <p className="text-[10px] text-slate-500 mb-1.5 font-sans">
                  ایڈمن اسی ایمیل کے ذریعے والٹ ریچارج کرے گا۔
                </p>
                <div className="relative">
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-left bg-slate-50 border border-slate-300 rounded-none py-3 px-4 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono"
                  />
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <button
                id="submit-register"
                type="submit"
                className="w-full mt-4 bg-slate-950 hover:bg-slate-900 text-blue-400 hover:text-blue-300 py-3.5 px-4 rounded-none font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border-b-4 border-blue-600"
              >
                <span>نیا اکاؤنٹ رجسٹر کریں</span>
                <Sparkles className="w-4 h-4 text-blue-400" />
              </button>
            </form>
          ) : (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-right">
              <div>
                <label className="block text-slate-700 text-xs font-bold mb-1.5 font-sans" htmlFor="login-email">
                  اپنی رجسٹرڈ ایمیل آئی ڈی لکھیں (Email Address) *
                </label>
                <div className="relative">
                  <input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full text-left bg-slate-50 border border-slate-300 rounded-none py-3 px-4 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono"
                  />
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <button
                id="submit-login"
                type="submit"
                className="w-full mt-4 bg-slate-950 hover:bg-slate-900 text-blue-400 hover:text-blue-300 py-3.5 px-4 rounded-none font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border-b-4 border-blue-600"
              >
                <span>اپنے اکاؤنٹ میں لاگ ان کریں</span>
                <LogIn className="w-4 h-4 text-blue-400" />
              </button>

              {/* Quick Access Portal Login */}
              <div className="mt-6 pt-5 border-t border-slate-200 text-center">
                <h4 className="text-slate-700 text-[11px] font-bold mb-3 font-sans flex items-center justify-center gap-1.5 flex-row-reverse">
                  <span>فوری پورٹل لاگ ان (Quick Access Portal)</span>
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    id="prefill-ghulam"
                    type="button"
                    onClick={() => handlePrefill('fareed.ghulam@gmail.com')}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-none transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="font-bold text-[11px] text-slate-800">غلام فرید (ٹیسٹر)</span>
                    <span className="text-[10px] text-slate-500 font-mono">fareed.ghulam@gmail.com</span>
                  </button>
                  <button
                    id="prefill-admin"
                    type="button"
                    onClick={() => handlePrefill('mastermaindqureshi110@gmail.com')}
                    className="p-2.5 border border-amber-200 bg-amber-50/50 hover:bg-amber-100/30 text-amber-950 rounded-none transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="font-bold text-[11px] text-amber-900">ایڈمن لاگ ان (Admin)</span>
                    <span className="text-[10px] text-amber-700 font-mono">رقم ریچارج و لمٹ پورٹل</span>
                  </button>
                </div>
              </div>
            </form>
          )}



          {/* WhatsApp Support Box */}
          <div className="mt-6 pt-5 border-t border-slate-200 text-center">
            <h4 className="text-emerald-950 text-xs font-bold mb-2 font-sans flex items-center justify-center gap-1.5 flex-row-reverse">
              <span>رجسٹریشن اور اکاؤنٹ ہیلپ لائن (WhatsApp Support)</span>
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            </h4>
            <p className="text-[10px] text-slate-600 mb-3.5 font-sans leading-relaxed">
              اگر آپ کو اکاؤنٹ بنانے یا لاگ ان میں کوئی مسئلہ پیش آ رہا ہے، تو مدد کے لئے ایڈمن سے رابطہ کریں۔
            </p>
            <a
              id="registration-whatsapp-link"
              href={whatsappUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-4 rounded-none border-b-2 border-emerald-800 transition-all flex items-center justify-center gap-1.5 mx-auto cursor-pointer max-w-[240px] hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span>ایڈمن سے رابطہ کریں (WhatsApp)</span>
            </a>
          </div>

          {/* Quick PDF Source Codebook section */}
          <div className="mt-6 pt-5 border-t border-slate-200 bg-blue-50/40 p-4 border border-blue-100 text-center">
            <h4 className="text-blue-900 text-xs font-bold mb-2 font-sans flex items-center justify-center gap-1">
              <span>مکمل کوڈ پلس وی بی اسٹوڈیو گائیڈ پی ڈی ایف</span>
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            </h4>
            <p className="text-[10px] text-slate-600 mb-3.5 font-sans leading-relaxed">
              اس پورے پروگرام کا مکمل چالو کوڈ اور لوکل پی سی سیٹ اپ گائیڈ کی ایک تفصیلی پی ڈی ایف فائل حاصل کرنے کے لئے نیچے بٹن پر دبائیں۔
            </p>
            <button
              id="get-code-pdf-landing"
              type="button"
              onClick={generateProjectCodePDF}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2 px-4 rounded-none border-b-2 border-blue-800 transition-all flex items-center justify-center gap-1.5 mx-auto cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              <FileCode className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>فائل ڈاؤن لوڈ کریں (Download PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
