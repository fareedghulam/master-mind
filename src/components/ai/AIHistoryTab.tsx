import React, { useMemo } from 'react';
import { History, Search, Download, Coins, MapPin, BarChart3 } from 'lucide-react';
import { PakistanBondResult } from '../../types';
import { generateDrawHistoryPDF } from '../../utils/pdfGenerator';
import { PK_BOND_CATEGORIES, PK_CITIES_LIST, computeAnalysisStats } from '../../utils/bondAnalysisUtils';

interface AIHistoryTabProps {
  historySearchQuery: string;
  setHistorySearchQuery: (query: string) => void;
  historyCategory: 'all' | 'pakistan_bond' | 'thailand_lottery';
  setHistoryCategory: (cat: 'all' | 'pakistan_bond' | 'thailand_lottery') => void;
  historyBondValue: string;
  setHistoryBondValue: (bond: string) => void;
  historyCity: string;
  setHistoryCity: (city: string) => void;
  filteredHistory: PakistanBondResult[];
}

export const AIHistoryTab: React.FC<AIHistoryTabProps> = ({
  historySearchQuery,
  setHistorySearchQuery,
  historyCategory,
  setHistoryCategory,
  historyBondValue,
  setHistoryBondValue,
  historyCity,
  setHistoryCity,
  filteredHistory
}) => {
  const [statusMsg, setStatusMsg] = React.useState<{ text: string; isError?: boolean } | null>(null);

  // Quick stats computed on the currently filtered records
  const quickStats = useMemo(() => {
    return computeAnalysisStats(filteredHistory);
  }, [filteredHistory]);

  const handleDownload = async () => {
    if (!filteredHistory || filteredHistory.length === 0) {
      setStatusMsg({ text: 'کوئی ریکارڈ موجود نہیں ہے۔', isError: true });
      setTimeout(() => setStatusMsg(null), 4000);
      return;
    }
    const res = await generateDrawHistoryPDF(filteredHistory, historyCategory, {
      bondValue: historyBondValue,
      city: historyCity
    });
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
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-slate-500" />
            </span>
            <input
              type="text"
              placeholder="نمبر، تاریخ، ڈرا یا شہر تلاش کریں..."
              value={historySearchQuery}
              onChange={(e) => setHistorySearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-xs text-white pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-amber-500/50 outline-none text-right"
            />
          </div>

          <div className="text-right flex-1 sm:order-last">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center justify-end gap-1.5">
              <span>سابقہ قرعہ اندازی کے نتائج (Historical Records)</span>
              <History className="w-5 h-5 text-amber-400" />
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              ہر بانڈ کی الگ مالیت اور شہر منتخب کر کے فلٹر کریں اور اینالیسس دیکھیں
            </p>
          </div>
        </div>

        {statusMsg && (
          <div className={`p-3 mb-4 rounded-xl text-xs text-right border ${statusMsg.isError ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
            {statusMsg.isError ? '⚠️ ' : '✓ '} {statusMsg.text}
          </div>
        )}

        {/* Category Selector */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 text-xs">
          <button
            id="download-history-pdf-btn"
            onClick={handleDownload}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-amber-500/10 transition-all text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>نتائج پی ڈی ایف رپورٹ ڈاؤن لوڈ کریں</span>
          </button>

          <div className="flex flex-row-reverse gap-2 w-full sm:w-auto">
            <button
              onClick={() => setHistoryCategory('all')}
              className={`py-1.5 px-3.5 rounded-xl border cursor-pointer font-bold text-xs transition-all ${
                historyCategory === 'all'
                  ? 'bg-slate-900 border-amber-500 text-amber-400 shadow-sm'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
              }`}
            >
              تمام کیٹیگریز
            </button>
            <button
              onClick={() => setHistoryCategory('pakistan_bond')}
              className={`py-1.5 px-3.5 rounded-xl border cursor-pointer font-bold text-xs transition-all ${
                historyCategory === 'pakistan_bond'
                  ? 'bg-slate-900 border-amber-500 text-amber-400 shadow-sm'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
              }`}
            >
              پاکستان بانڈز
            </button>
            <button
              onClick={() => setHistoryCategory('thailand_lottery')}
              className={`py-1.5 px-3.5 rounded-xl border cursor-pointer font-bold text-xs transition-all ${
                historyCategory === 'thailand_lottery'
                  ? 'bg-slate-900 border-amber-500 text-amber-400 shadow-sm'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
              }`}
            >
              تھائی لاٹری
            </button>
          </div>
        </div>

        {/* BOND VALUE SELECTOR IN RECORDS (Only shown for Pakistan Bonds or All) */}
        {historyCategory !== 'thailand_lottery' && (
          <div className="mb-4 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>بانڈ ویلیو کے مطابق فلٹر کریں (Filter by Bond Value):</span>
              </span>
              <span className="text-[10px] text-amber-400 font-mono font-bold">
                منتخب: {historyBondValue === 'all' ? 'تمام بانڈز' : historyBondValue}
              </span>
            </div>

            <div className="flex flex-row-reverse flex-wrap gap-1.5">
              {PK_BOND_CATEGORIES.map((bond) => {
                const isSelected = historyBondValue === bond.value;
                return (
                  <button
                    key={bond.value}
                    onClick={() => setHistoryBondValue(bond.value)}
                    className={`py-1 px-2.5 rounded-lg text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/10'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {bond.labelUrdu}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* CITY SELECTOR IN RECORDS */}
        {historyCategory !== 'thailand_lottery' && (
          <div className="mb-5 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>شہر کے مطابق فلٹر کریں (Filter by City):</span>
              </span>
              <span className="text-[10px] text-amber-400 font-mono font-bold">
                منتخب: {historyCity === 'all' ? 'تمام شہر' : historyCity}
              </span>
            </div>

            <div className="flex flex-row-reverse flex-wrap gap-1.5">
              <button
                onClick={() => setHistoryCity('all')}
                className={`py-1 px-2.5 rounded-lg text-xs cursor-pointer transition-all ${
                  historyCity === 'all'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/10'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                تمام شہر
              </button>
              {PK_CITIES_LIST.map((city) => {
                const isSelected = historyCity === city.nameUrdu;
                return (
                  <button
                    key={city.code}
                    onClick={() => setHistoryCity(city.nameUrdu)}
                    className={`py-1 px-2.5 rounded-lg text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/10'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {city.nameUrdu}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* QUICK ANALYTICAL SUMMARY STRIP ON FILTERED RECORDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-bold">فلٹر شدہ ڈراز</span>
            <span className="font-mono text-base font-bold text-white block mt-0.5">
              {filteredHistory.length} Records
            </span>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-bold">ہاٹ اوپن ہندسہ</span>
            <span className="font-mono text-base font-bold text-amber-400 block mt-0.5">
              {quickStats.topOpenDigit} ({quickStats.topOpenCount}x)
            </span>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-bold">ٹاپ آکڑا جوڑی</span>
            <span className="font-mono text-base font-bold text-sky-400 block mt-0.5">
              {quickStats.topAkras[0] ? `${quickStats.topAkras[0].akra} (${quickStats.topAkras[0].count}x)` : '--'}
            </span>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-bold">طاق / جفت تناسب</span>
            <span className="font-mono text-base font-bold text-emerald-400 block mt-0.5">
              {quickStats.digitOddsPercentage}% / {quickStats.digitEvensPercentage}%
            </span>
          </div>
        </div>

        {/* Records Table */}
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
                  <td colSpan={5} className="p-6 text-center text-slate-500">
                    کوئی ریکارڈ نہیں ملا۔ فلٹر یا تلاش تبدیل کر کے دیکھیں۔
                  </td>
                </tr>
              ) : (
                filteredHistory.map((draw) => (
                  <tr key={draw.id} className="hover:bg-slate-850/50 transition-all">
                    <td className="p-3 font-mono text-slate-400 text-xs">{draw.date}</td>
                    <td className="p-3 text-slate-300 font-semibold">{draw.city}</td>
                    <td className="p-3 text-slate-400 font-mono text-xs max-w-xs truncate">
                      {Array.isArray(draw.secondPrizes) ? draw.secondPrizes.join(', ') : draw.secondPrizes}
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
