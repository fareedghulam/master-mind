import React from 'react';
import { History, Search, Download } from 'lucide-react';
import { PakistanBondResult } from '../../types';
import { generateDrawHistoryPDF } from '../../utils/pdfGenerator';

interface AIHistoryTabProps {
  historySearchQuery: string;
  setHistorySearchQuery: (query: string) => void;
  historyCategory: 'all' | 'pakistan_bond' | 'thailand_lottery';
  setHistoryCategory: (cat: 'all' | 'pakistan_bond' | 'thailand_lottery') => void;
  filteredHistory: PakistanBondResult[];
}

export const AIHistoryTab: React.FC<AIHistoryTabProps> = ({
  historySearchQuery,
  setHistorySearchQuery,
  historyCategory,
  setHistoryCategory,
  filteredHistory
}) => {
  const [statusMsg, setStatusMsg] = React.useState<{ text: string; isError?: boolean } | null>(null);

  const handleDownload = () => {
    if (!filteredHistory || filteredHistory.length === 0) {
      setStatusMsg({ text: 'کوئی ریکارڈ موجود نہیں ہے۔', isError: true });
      setTimeout(() => setStatusMsg(null), 4000);
      return;
    }
    const res = generateDrawHistoryPDF(filteredHistory, historyCategory);
    if (res.success) {
      setStatusMsg({ text: 'نتائج پی ڈی ایف رپورٹ کامیابی سے تیار کر دی گئی ہے!', isError: false });
      setTimeout(() => setStatusMsg(null), 4000);
    } else {
      setStatusMsg({ text: res.error || 'پی ڈی ایف بنانے میں خرابی پیش آئی۔', isError: true });
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-slate-500" />
            </span>
            <input
              type="text"
              placeholder="نمبر، ڈرا یا شہر تلاش کریں..."
              value={historySearchQuery}
              onChange={(e) => setHistorySearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-xs text-white pl-9 pr-3.5 py-2 rounded-xl border border-slate-800 focus:border-amber-500/50 outline-none text-right"
            />
          </div>

          <div className="text-right flex-1 sm:order-last">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center justify-end gap-1.5">
              <span>سابقہ قرعہ اندازی کے نتائج (Historical Records)</span>
              <History className="w-5 h-5 text-amber-400" />
            </h3>
            <p className="text-xs text-slate-400 mt-1">پرائز بانڈ کے فرسٹ، سیکنڈ انعامات کی لائیو لسٹ</p>
          </div>
        </div>

        {statusMsg && (
          <div className={`p-3 mb-4 rounded-xl text-xs text-right border ${statusMsg.isError ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
            {statusMsg.isError ? '⚠️ ' : '✓ '} {statusMsg.text}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 text-xs">
          <button
            id="download-history-pdf-btn"
            onClick={handleDownload}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-amber-500/10 transition-all text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>نتائج پی ڈی ایف ڈاؤن لوڈ کریں (Save Record PDF)</span>
          </button>

          <div className="flex flex-row-reverse gap-2 w-full sm:w-auto">
            <button
              onClick={() => setHistoryCategory('all')}
              className={`py-1.5 px-3 rounded-lg border cursor-pointer ${historyCategory === 'all' ? 'bg-slate-900 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'}`}
            >
              تمام ڈراز
            </button>
            <button
              onClick={() => setHistoryCategory('pakistan_bond')}
              className={`py-1.5 px-3 rounded-lg border cursor-pointer ${historyCategory === 'pakistan_bond' ? 'bg-slate-900 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'}`}
            >
              پاکستان بانڈز
            </button>
            <button
              onClick={() => setHistoryCategory('thailand_lottery')}
              className={`py-1.5 px-3 rounded-lg border cursor-pointer ${historyCategory === 'thailand_lottery' ? 'bg-slate-900 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'}`}
            >
              تھائی لاٹری
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-right border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <th className="p-3">تاریخ (Date)</th>
                <th className="p-3">شہر / ملک</th>
                <th className="p-3">سیکنڈ انعامات (Seconds)</th>
                <th className="p-3">فرسٹ انعام (First)</th>
                <th className="p-3 text-right">ڈرا نمبر / سکیم</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-500">مطلوبہ ریکارڈز موجود نہیں ہیں۔</td>
                </tr>
              ) : (
                filteredHistory.map((draw) => (
                  <tr key={draw.id} className="hover:bg-slate-850/50 transition-all">
                    <td className="p-3 font-mono text-slate-400 text-xs">{draw.date}</td>
                    <td className="p-3 text-slate-300 font-semibold">{draw.city}</td>
                    <td className="p-3 text-slate-400 font-mono text-xs max-w-xs truncate">
                      {draw.secondPrizes.join(', ')}
                    </td>
                    <td className="p-3 font-mono font-black text-amber-400 text-sm">{draw.firstPrize}</td>
                    <td className="p-3 font-bold text-white text-right">
                      <span className="block">{draw.drawNo}</span>
                      <span className="text-[10px] text-slate-500 block">
                        {draw.category === 'pakistan_bond' ? 'پاکستان بانڈ' : 'تھائی لاٹری'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
