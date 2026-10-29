import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, Trash2, ShieldAlert, ArrowLeft, Mail, Phone } from 'lucide-react';
import { PRIVACY_POLICY_URL, DELETE_ACCOUNT_URL, PRODUCTION_FIREBASE_HOSTING_DOMAIN } from '../utils/appUrls';
import { User } from '../types';

interface PolicyViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'privacy' | 'deletion';
  currentUser?: User | null;
  onTriggerInAppDelete?: () => void;
}

export default function PolicyViewerModal({
  isOpen,
  onClose,
  initialType = 'privacy',
  currentUser,
  onTriggerInAppDelete
}: PolicyViewerModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'deletion'>(initialType);

  // Sync activeTab if initialType changes when opened
  React.useEffect(() => {
    setActiveTab(initialType);
  }, [initialType, isOpen]);

  if (!isOpen) return null;

  const currentExternalUrl = activeTab === 'privacy' ? PRIVACY_POLICY_URL : DELETE_ACCOUNT_URL;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-right"
        dir="rtl"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="بند کریں (Close)"
            >
              <X className="w-5 h-5" />
            </button>
            <a
              href={currentExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all border border-slate-700"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>ویب براؤزر میں کھولیں (Open in Web Browser)</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <h3 className="font-bold text-sm sm:text-base text-white">
                {activeTab === 'privacy' ? 'رازداری کی پالیسی (Privacy Policy)' : 'اکاؤنٹ اور ڈیٹا خاتمہ (Account Deletion)'}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Master Mind Qureshi Enterprise (com.mastermindqureshi.enterprise)
              </p>
            </div>
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${activeTab === 'privacy' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
              {activeTab === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <Trash2 className="w-5 h-5" />}
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-amber-500 text-amber-400 bg-slate-800/40 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>رازداری کی پالیسی (Privacy Policy)</span>
          </button>
          <button
            onClick={() => setActiveTab('deletion')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'deletion'
                ? 'border-red-500 text-red-400 bg-slate-800/40 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>اکاؤنٹ اور ڈیٹا خاتمہ (Account Deletion)</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {activeTab === 'privacy' ? (
            /* Privacy Policy Content */
            <div className="space-y-6">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between text-xs">
                <span className="text-amber-400 font-semibold">پبلک یو آر ایل (Public Hosting URL):</span>
                <a 
                  href={PRIVACY_POLICY_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-amber-300 underline text-[11px]"
                >
                  {PRIVACY_POLICY_URL}
                </a>
              </div>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-1.5">
                  1. تعارف (Introduction)
                </h4>
                <p>
                  Master Mind Qureshi Enterprise (کمپنی/ایپلیکیشن، شناخت: <code className="text-amber-300 font-mono">com.mastermindqureshi.enterprise</code>) آپ کی ذاتی معلومات اور رازداری کے تحفظ کو اولین ترجیح دیتی ہے۔ یہ دستاویز وضاحت کرتی ہے کہ ہماری سروس کے استعمال کے دوران آپ کا کون سا ڈیٹا اکٹھا کیا جاتا ہے، اسے کس طرح محفوظ رکھا جاتا ہے اور آپ اپنے ڈیٹا کے خاتمے کا حق کس طرح استعمال کر سکتے ہیں۔
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-1.5">
                  2. جمع کی جانے والی معلومات (Information We Collect)
                </h4>
                <p>ہم صارف کی شفاف رضامندی سے درج ذیل معلومات اکٹھی کرتے ہیں:</p>
                <ul className="list-disc list-inside space-y-1 pr-2 text-slate-400">
                  <li><strong>پروفائل کی معلومات:</strong> پورا نام، رابطہ موبائل نمبر، شہر اور رجسٹریشن ای میل ایڈریس۔</li>
                  <li><strong>لاگ ان معلومات:</strong> محفوظ فائر بیس کریڈنشلز اور پاس ورڈز جنہیں خفیہ انکرپشن کے ساتھ محفوظ کیا جاتا ہے۔</li>
                  <li><strong>مالیاتی و والٹ ریکارڈز:</strong> کسٹمر والٹ بیلنس، ریچارج اور کٹوتی کی ٹرانزیکشن ہسٹری۔</li>
                  <li><strong>سروس بکنگ ریکارڈز:</strong> پاکستان پرائز بانڈ اور تھائی لینڈ لاٹری کے منتخب کردہ نمبرز اور تاریخیں۔</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-1.5">
                  3. فائر بیس اور کلاؤڈ انفراسٹرکچر (Firebase Infrastructure)
                </h4>
                <p>
                  ہماری سروس گوگل فائر بیس (Google Firebase Authentication, Google Firebase Realtime Database) کے ذریعے محفوظ کلاؤڈ سیکیورٹی انفراسٹرکچر پر مبنی ہے۔ ہم آپ کا ذاتی ڈیٹا کبھی بھی کسی تیسری پارٹی یا اشتہاری کمپنی کو فروخت یا شیئر نہیں کرتے۔
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-red-400 border-b border-slate-800 pb-1.5">
                  4. اکاؤنٹ اور ڈیٹا حذف کرنے کا حق (Account & Data Deletion)
                </h4>
                <p>
                  گوگل پلے اسٹور کی پالیسی کے تحت ہر صارف کو اپنے اکاؤنٹ اور تمام ذاتی ڈیٹا کو مکمل طور پر مٹانے کا قانونی حق حاصل ہے۔ آپ ایپ کے اندر پروفائل اسکرین پر خطرناک زون سے فوری ڈیلیٹ کر سکتے ہیں یا سرشار پبلک ڈیلیشن پیج پر درخواست بھیج سکتے ہیں۔
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-1.5">
                  5. رابطہ کی معلومات (Contact Information)
                </h4>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                  <div>Email: mastermaind.qureshi110@gmail.com</div>
                  <div>WhatsApp Support: +92 345 3090146</div>
                  <div>Public Web: {PRODUCTION_FIREBASE_HOSTING_DOMAIN}</div>
                </div>
              </section>

              {/* English Summary for Reviewers */}
              <section className="pt-4 border-t border-slate-800 space-y-2 text-left font-sans text-xs text-slate-400" dir="ltr">
                <h5 className="font-bold text-white">Google Play Store Reviewer Notice</h5>
                <p>
                  Master Mind Qureshi Enterprise (package: <code className="text-amber-300">com.mastermindqureshi.enterprise</code>) complies with the Google Play User Data policy. Users can initiate real-time account deletion inside the application (Profile &gt; Danger Zone &gt; Delete My Account) or externally via the web deletion URL: <a href={DELETE_ACCOUNT_URL} target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">{DELETE_ACCOUNT_URL}</a>.
                </p>
              </section>
            </div>
          ) : (
            /* Account Deletion Content */
            <div className="space-y-6">
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center justify-between text-xs">
                <span className="text-red-400 font-semibold">پبلک ویب پیج (Public Deletion URL):</span>
                <a 
                  href={DELETE_ACCOUNT_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-red-300 underline text-[11px]"
                >
                  {DELETE_ACCOUNT_URL}
                </a>
              </div>

              {/* Quick in-app action if user is logged in */}
              {currentUser && onTriggerInAppDelete && (
                <div className="bg-red-950/40 border border-red-800/80 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-mono">لاگ ان صارف: {currentUser.email}</span>
                    <span className="text-xs font-bold text-red-400">فوری ایپ ڈیلیٹیشن دستیاب ہے</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    آپ اپنے اکاؤنٹ کو سیکیورٹی تصدیق کے ساتھ اسی وقت ایپ کے اندر سے مکمل حذف کر سکتے ہیں:
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onTriggerInAppDelete();
                    }}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>میرا اکاؤنٹ فوری حذف کریں (Open In-App Delete Flow)</span>
                  </button>
                </div>
              )}

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-1.5">
                  طریقہ کار 1: ایپ کے اندر سے فوری خاتمہ (In-App Deletion)
                </h4>
                <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1.5 pr-2">
                  <li>کسٹمر پروفائل (Profile) اسکرین پر جائیں۔</li>
                  <li>صفحے کے آخر میں موجود "خطرناک زون / اکاؤنٹ مستقل حذف کریں" پر جائیں۔</li>
                  <li>"میرا اکاؤنٹ مستقل حذف کریں" پر کلک کریں، سیکیورٹی تصدیق مکمل کریں، اور DELETE لکھ کر کنفرم کریں۔</li>
                </ol>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-1.5">
                  طریقہ کار 2: ان انسٹال شدہ صارفین کے لیے ویب فارم (Web Request)
                </h4>
                <p>
                  اگر آپ ایپ ان انسٹال کر چکے ہیں یا لاگ ان تک رسائی نہیں ہے، تو آپ ہمارے پبلک ویب فارم پر جا کر درخواست بھیج سکتے ہیں یا نیچے دیے گئے بٹن سے واٹس ایپ / ای میل پر درخواست بھیج سکتے ہیں:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="mailto:mastermaind.qureshi110@gmail.com?subject=Account%20Deletion%20Request&body=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%DA%A9%D9%85%20Master%20Mind%20Qureshi%20Enterprise%2C%0A%D8%A8%D8%B1%D8%A7%D8%A6%DB%92%20%D9%85%DB%81%D8%B1%D8%A8%D8%A7%D9%86%DB%8C%20%D9%85%DB%8C%D8%B1%D8%A7%20%D8%A7%DA%A9%D8%A7%D8%A4%D9%86%D9%90%D9%B9%20%D8%A7%D9%88%D8%B1%20%D8%B0%D8%A7%D8%AA%DB%8C%20%DA%88%DB%8C%D9%B9%D8%A7%20%D8%AD%D8%B0%D9%81%20%DA%A9%D8%B1%20%D8%AF%DB%8C%DA%BA%DB%94"
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>ای میل کے ذریعے درخواست (Email Support)</span>
                  </a>
                  <a
                    href="https://wa.me/923453090146?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%DA%A9%D9%85%21%20%D9%85%DB%8C%DA%BA%20%D8%A7%D9%BE%D9%86%D8%A7%20%D8%A7%DA%A9%D8%A7%D8%A4%D9%86%D9%B9%20%DA%88%DB%8C%D9%84%DB%8C%D9%B9%20%DA%A9%D8%B1%D9%88%D8%A7%D9%86%D8%A7%20%DA%86%D8%A7%DB%81%D8%AA%D8%A7%20%DB%81%D9%88%DA%BA%DB%94"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>واٹس ایپ ہیلپ لائن (+92 345 3090146)</span>
                  </a>
                </div>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-1.5">
                  ڈیٹا کے خاتمے کی حدود (Scope of Data Deletion)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-red-950/30 border border-red-900/40 rounded-xl space-y-1">
                    <p className="font-bold text-red-400">مستقل حذف شدہ ڈیٹا:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      <li>لاگ ان اکاؤنٹ اور فائر بیس کریڈنشلز</li>
                      <li>نام، فون نمبر، شہر، ای میل</li>
                      <li>والٹ کنکشن اور کسٹمر پروفائل</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-amber-950/30 border border-amber-900/40 rounded-xl space-y-1">
                    <p className="font-bold text-amber-400">قانونی ضوابط کے تحت ڈیٹا:</p>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      ماضی کے لاٹری اور بانڈ قرعہ اندازیوں کے مالیاتی آڈٹ لاگز شناخت کے بغیر قانونی سالمیت کے لیے محفوظ رہتے ہیں۔
                    </p>
                  </div>
                </div>
              </section>

              {/* English Summary for Google Play Reviewers */}
              <section className="pt-4 border-t border-slate-800 space-y-2 text-left font-sans text-xs text-slate-400" dir="ltr">
                <h5 className="font-bold text-white">Google Play User Data Compliance Statement</h5>
                <p>
                  Master Mind Qureshi Enterprise (<code>com.mastermindqureshi.enterprise</code>) provides an in-app deletion option and an external web resource for account deletion request: <a href={DELETE_ACCOUNT_URL} target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">{DELETE_ACCOUNT_URL}</a>.
                  Upon confirmation, all personal information (names, emails, credentials, wallet balance mappings) is permanently purged from Firebase Authentication and Realtime Database.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            بند کریں (Close)
          </button>

          <a
            href={currentExternalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
          >
            <span>{currentExternalUrl}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
