import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X, CheckCircle, Info, ArrowUp, Menu } from 'lucide-react';

export default function PwaInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [installedSuccessfully, setInstalledSuccessfully] = useState<boolean>(false);
  const [showHelpDetails, setShowHelpDetails] = useState<boolean>(false);

  useEffect(() => {
    // Check if app is running in standalone mode (already installed as PWA / home screen app)
    const isPwa = window.matchMedia('(display-mode: standalone)').matches || 
                  (window.navigator as any).standalone === true ||
                  document.referrer.includes('android-app://');
    
    setIsStandalone(isPwa);

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Track when successful install happens
    window.addEventListener('appinstalled', () => {
      setInstalledSuccessfully(true);
      setDeferredPrompt(null);
      // Automatically hide banner after a few seconds
      setTimeout(() => {
        setShowBanner(false);
      }, 5000);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // If prompt event is not available, show manual install details modal/accordion
      setShowHelpDetails(true);
      return;
    }
    
    // Show the native browser install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again, discard it
    setDeferredPrompt(null);
  };

  // If already installed, hide completely to maintain fully native look
  if (isStandalone) {
    return null;
  }

  // If banner was closed, don't render it
  if (!showBanner) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-950 border-b-2 border-blue-600 text-white shadow-md relative overflow-hidden transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Banner Content (Urdu + English) */}
        <div className="flex items-center gap-3.5 text-right md:text-left w-full md:w-auto">
          <div className="bg-blue-600 p-2.5 rounded-none text-white shrink-0 shadow-md animate-pulse">
            <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 justify-end md:justify-start">
              <span className="bg-blue-900 text-blue-300 font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-none tracking-wider">
                Official PWA App
              </span>
              <h3 className="text-sm sm:text-base font-bold font-sans">
                موبائل ایپ انسٹال کریں (Download App)
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-sans leading-relaxed">
              ماسٹر مائینڈ قریشی انٹرپرائز کو براہ راست اپنے اینڈرائیڈ یا آئی فون پر انسٹال کریں اور ایک کلک سے تیز ترین بکنگ کا لطف اٹھائیں۔
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            id="pwa-help-toggle"
            onClick={() => setShowHelpDetails(prev => !prev)}
            className="text-xs text-slate-300 hover:text-white px-3 py-2 border border-slate-700 bg-slate-800/40 rounded-none transition-all cursor-pointer flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5 text-blue-400" />
            <span>مدد (Guides)</span>
          </button>

          <button
            id="pwa-install-action"
            onClick={handleInstallClick}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 border-b-2 border-blue-800 rounded-none transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-blue-500/20 active:translate-y-0.5"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>ایپ ڈاؤن لوڈ کریں (APK Install)</span>
          </button>

          {/* Close Banner button */}
          <button
            id="pwa-banner-close"
            onClick={() => setShowBanner(false)}
            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-none transition-colors cursor-pointer"
            title="بند کریں"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Success Confirmation Toast inside Banner */}
      {installedSuccessfully && (
        <div className="bg-emerald-650 text-white text-center py-2 text-xs font-bold font-sans flex items-center justify-center gap-2 border-t border-emerald-555 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-300" />
          <span>موبائل ایپ کامیابی سے انسٹال ہو گئی ہے! شکریہ۔</span>
        </div>
      )}

      {/* Detailed installation popup guide for Android, iPhone Safari and general browsers */}
      {showHelpDetails && (
        <div className="border-t border-slate-800 bg-slate-950 p-4 sm:p-6 text-right font-sans max-w-5xl mx-auto">
          <h4 className="text-sm font-bold text-blue-400 border-b border-slate-800 pb-2 mb-4 flex items-center justify-end gap-2">
            <span>موبائل پر ایپ چلانے کے آسان طریقے</span>
            <Smartphone className="w-4 h-4 text-blue-400" />
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Android / Chrome guide */}
            <div className="bg-slate-900/60 p-4 border border-slate-800 rounded-none">
              <div className="flex items-center gap-1.5 justify-end mb-2.5">
                <span className="font-bold text-white text-sm">برائے اینڈرائیڈ (Android App)</span>
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-none"></div>
              </div>
              <ol className="space-y-2 text-slate-300 list-decimal list-inside pr-1">
                <li>سب سے اوپر موجود نیلے بٹن <strong className="text-blue-400 font-bold">"ایپ ڈاؤن لوڈ کریں"</strong> پر کلک کریں۔</li>
                <li>براؤزر آپ کو ایپ انسٹال کرنے کی تصدیق کا پیغام دکھائے گا۔</li>
                <li><strong className="text-white">"Install"</strong> یا <strong className="text-white">"Add"</strong> کے بٹن پر دبا دیں۔</li>
                <li>ایپ آپ کے ہوم اسکرین پر نصب ہو کر ہوبہو موبائل ایپ کی طرح کھلے گی۔</li>
              </ol>
            </div>

            {/* iOS / iPhone / Safari guide */}
            <div className="bg-slate-900/60 p-4 border border-slate-800 rounded-none">
              <div className="flex items-center gap-1.5 justify-end mb-2.5">
                <span className="font-bold text-white text-sm">برائے آئی فون / سفاری (iPhone App)</span>
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-none"></div>
              </div>
              <ol className="space-y-2 text-slate-300 list-decimal list-inside pr-1">
                <li>اپنے آئی فون پر <strong className="text-blue-400 font-bold">Safari</strong> براؤزر میں یہ ویب سائٹ کھولیں۔</li>
                <li>سب سے نیچے مینو میں موجود <strong className="text-white font-bold">Share (شیئر)</strong> بٹن <span className="inline-block border border-slate-700 bg-slate-800 p-0.5"><ArrowUp className="w-3.5 h-3.5 inline mx-0.5 text-blue-400" /></span> پر ٹیپ کریں۔</li>
                <li>مینو کو اوپر اسکرول کریں اور <strong className="text-blue-400">"Add to Home Screen"</strong> منتخب کریں۔</li>
                <li>سب سے اوپر دائیں کونے میں <strong className="text-white">"Add"</strong> بٹن دبائیں۔ ایپ آپ کے آئی فون میں آ جائے گی!</li>
              </ol>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-900 text-slate-400 text-[10px] text-center flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>Progressive Web App Standard - No installation permissions or Google Play Store account required.</span>
            <button
              id="close-guides-btn"
              onClick={() => setShowHelpDetails(false)}
              className="text-blue-400 font-bold hover:underline cursor-pointer"
            >
              ٹھیک ہے، بند کریں
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
