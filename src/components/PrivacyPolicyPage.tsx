import { ArrowLeft, ShieldCheck, ExternalLink } from 'lucide-react';
import { PRIVACY_POLICY_URL } from '../utils/appUrls';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export default function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
  return (
    <section className="fixed inset-0 z-[100] flex flex-col bg-slate-950 text-white" aria-label="Privacy Policy">
      <header className="flex min-h-[68px] shrink-0 items-center justify-between gap-3 border-b border-slate-800 bg-slate-900 px-4 py-3 shadow-lg">
        <button type="button" onClick={onBack} className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800" aria-label="Back to app">
          <ArrowLeft className="h-4 w-4" />
          <span>واپس (Back)</span>
        </button>
        <div className="flex min-w-0 items-center gap-2 text-right">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold sm:text-base">پرائیویسی پالیسی</h1>
            <p className="text-[11px] text-slate-400">Privacy Policy</p>
          </div>
          <ShieldCheck className="h-5 w-5 shrink-0 text-amber-400" />
        </div>
      </header>
      <iframe title="Master Mind Qureshi Enterprise Privacy Policy" src="/privacy-policy.html" className="min-h-0 w-full flex-1 border-0 bg-slate-950" referrerPolicy="no-referrer" />
      <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-800 bg-slate-900 px-4 py-2 text-[11px] text-slate-400">
        <span>Master Mind Qureshi Enterprise</span>
        <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline hover:text-amber-400">
          عوامی پالیسی لنک <ExternalLink className="h-3 w-3" />
        </a>
      </footer>
    </section>
  );
}
