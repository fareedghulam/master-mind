import React, { useState, useMemo } from 'react';
import { 
  Coins, LayoutGrid, Award, TrendingUp, History, Download, 
  MapPin, CheckCircle2, Search, Filter, BarChart3
} from 'lucide-react';
import { PakistanBondResult } from '../../types';
import { 
  PK_BOND_CATEGORIES, PK_CITIES_LIST, normalizeDrawBondValue, 
  computeAnalysisStats, BondAnalysisStats, isBondMatchForAnalysis 
} from '../../utils/bondAnalysisUtils';
import { generateDrawHistoryPDF } from '../../utils/pdfGenerator';

interface AIBondAnalysisTabProps {
  allBondResults: PakistanBondResult[];
}

export const AIBondAnalysisTab: React.FC<AIBondAnalysisTabProps> = ({
  allBondResults
}) => {
  const [selectedBond, setSelectedBond] = useState<string>('Rs. 1,500');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [activeSubTab, setActiveSubTab] = useState<'digits' | 'akras' | 'cities' | 'history'>('digits');
  const [digitPosition, setDigitPosition] = useState<'open' | 'close' | 'center' | 'fourth'>('open');
  const [historySearch, setHistorySearch] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  // Compute count of draws per bond category across the entire dataset
  const bondCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    PK_BOND_CATEGORIES.forEach(b => { counts[b.value] = 0; });
    
    let total40k = 0;
    allBondResults.forEach(draw => {
      const norm = normalizeDrawBondValue(draw);
      counts[norm] = (counts[norm] || 0) + 1;
      counts['all'] = (counts['all'] || 0) + 1;
      if (norm === 'Rs. 40,000' || norm === 'Rs. 40,000 Premium') {
        total40k++;
      }
    });

    // IMPORTANT: For Analysis, Normal 40,000 and 40,000 Premium are combined into one common 40,000 analysis
    counts['Rs. 40,000'] = total40k;
    counts['Rs. 40,000 Premium'] = total40k;

    return counts;
  }, [allBondResults]);

  // Filter draws by selected bond value AND optional city filter
  // For 40,000 analysis: Normal 40,000 + 40,000 Premium are combined into one common analysis
  const filteredDraws = useMemo(() => {
    return allBondResults.filter(draw => {
      const norm = normalizeDrawBondValue(draw);
      const matchesBond = isBondMatchForAnalysis(norm, selectedBond);
      const matchesCity = selectedCity === 'all' || draw.city === selectedCity;
      return matchesBond && matchesCity;
    });
  }, [allBondResults, selectedBond, selectedCity]);

  // Filtered historical list for search query
  const searchedDraws = useMemo(() => {
    if (!historySearch.trim()) return filteredDraws;
    const q = historySearch.trim().toLowerCase();
    return filteredDraws.filter(d => 
      (d.firstPrize && d.firstPrize.toLowerCase().includes(q)) ||
      (d.drawNo && d.drawNo.toLowerCase().includes(q)) ||
      (d.city && d.city.toLowerCase().includes(q)) ||
      (d.date && d.date.toLowerCase().includes(q)) ||
      (d.secondPrizes && d.secondPrizes.some(sp => sp.toLowerCase().includes(q)))
    );
  }, [filteredDraws, historySearch]);

  // Compute comprehensive stats for the selected dataset
  const stats: BondAnalysisStats = useMemo(() => {
    return computeAnalysisStats(filteredDraws);
  }, [filteredDraws]);

  // Download PDF handler
  const handleDownloadPDF = async () => {
    if (filteredDraws.length === 0) {
      setStatusMsg({ text: 'ڈاؤن لوڈ کے لیے کوئی ریکارڈ موجود نہیں ہے۔', isError: true });
      setTimeout(() => setStatusMsg(null), 4000);
      return;
    }

    const res = await generateDrawHistoryPDF(filteredDraws, 'pakistan_bond', {
      bondValue: selectedBond,
      city: selectedCity
    });

    if (res.success) {
      setStatusMsg({ text: `بانڈ ${selectedBond} کی تجزیاتی پی ڈی ایف رپورٹ کامیابی سے محفوظ کر لی گئی ہے!`, isError: false });
      setTimeout(() => setStatusMsg(null), 4000);
    } else {
      setStatusMsg({ text: res.error || 'پی ڈی ایف بنانے میں خرابی پیش آئی۔', isError: true });
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  const selectedCategoryInfo = PK_BOND_CATEGORIES.find(b => b.value === selectedBond) || PK_BOND_CATEGORIES[0];

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800 pb-5">
          <div className="flex flex-row-reverse gap-2 items-center w-full justify-between sm:justify-start">
            <div className="text-right">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center justify-end gap-1.5">
                <span>بانڈ ویلیو وائز تفصیلی اینالیسس سسٹم</span>
                <Coins className="w-5 h-5 text-amber-400" />
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                ہر بانڈ کی مالیت الگ الگ سلیکٹ کر کے فریکوئنسی، آکڑا، اور شہر وار تاریخی کارکردگی کا مکمل تجزیہ کریں
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-sm shadow-amber-500/10 cursor-pointer transition-all self-end sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>اس بانڈ کا پی ڈی ایف رپورٹ ڈاؤن لوڈ کریں</span>
          </button>
        </div>

        {statusMsg && (
          <div className={`p-3 mb-5 rounded-xl text-xs text-right border ${statusMsg.isError ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
            {statusMsg.isError ? '⚠️ ' : '✓ '} {statusMsg.text}
          </div>
        )}

        {/* 1. BOND VALUE SELECTOR GRID */}
        <div className="mb-6">
          <label className="block text-right text-xs font-bold text-slate-400 mb-2.5">
            بانڈ ویلیو منتخب کریں (Select Bond Value for Analysis):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {PK_BOND_CATEGORIES.map((bond) => {
              const isSelected = selectedBond === bond.value;
              const count = bondCounts[bond.value] || 0;
              return (
                <button
                  key={bond.value}
                  onClick={() => setSelectedBond(bond.value)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all text-center ${
                    isSelected
                      ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 font-bold scale-[1.02]'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold">{bond.labelUrdu}</span>
                  <span className={`text-[10px] mt-0.5 font-mono ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                    {bond.labelEng}
                  </span>
                  <div className="mt-1.5 flex items-center gap-1">
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-400'
                    }`}>
                      {count} Draws
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. OPTIONAL CITY FILTER FOR THIS BOND VALUE */}
        <div className="mb-6 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2.5">
            <span className="text-[11px] text-slate-400 font-medium">
              اس بانڈ کے لیے مخصوص شہر کا انتخاب کریں (اختیاری):
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>موجودہ فلٹر: {selectedCity === 'all' ? 'تمام شہر' : selectedCity}</span>
            </div>
          </div>

          <div className="flex flex-row-reverse flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCity('all')}
              className={`py-1 px-2.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                selectedCity === 'all'
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              تمام شہر (All Cities)
            </button>
            {PK_CITIES_LIST.map((city) => (
              <button
                key={city.code}
                onClick={() => setSelectedCity(city.nameUrdu)}
                className={`py-1 px-2.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                  selectedCity === city.nameUrdu
                    ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {city.nameUrdu}
              </button>
            ))}
          </div>
        </div>

        {/* 40,000 COMBINED ANALYSIS BANNER */}
        {(selectedBond === 'Rs. 40,000' || selectedBond === 'Rs. 40,000 Premium') && (
          <div className="mb-5 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-right flex flex-col sm:flex-row-reverse items-center justify-between gap-2">
            <span className="text-xs text-amber-400 font-bold flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>مشترکہ 40,000 اینالیسس: نارمل 40,000 اور 40,000 پریمیم کے تمام ڈراز کا مشترکہ تجزیہ</span>
            </span>
            <span className="text-[11px] font-mono text-amber-300 font-bold bg-amber-500/20 px-2.5 py-1 rounded-lg">
              40,000 Analysis = Normal 40,000 + 40,000 Premium
            </span>
          </div>
        )}

        {/* 3. KEY ANALYTICAL HIGHLIGHT STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">کل ڈراز (Total Draws)</span>
            <span className="font-mono text-lg font-bold text-white block mt-1">{stats.totalDraws} Records</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">
              {selectedBond === 'Rs. 40,000' || selectedBond === 'Rs. 40,000 Premium' ? 'روپے 40,000 (مشترکہ اینالیسس)' : selectedBond}
            </span>
          </div>

          <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">سب سے فعال شہر (Top Host City)</span>
            <span className="font-mono text-sm font-bold text-emerald-400 block mt-1">
              {stats.topCity} ({stats.topCityCount}x)
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5">سب سے زیادہ ڈراز</span>
          </div>

          <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">ہاٹ اوپن فگر (Hot Open)</span>
            <span className="font-mono text-lg font-bold text-amber-400 block mt-1">
              {stats.topOpenDigit} ({stats.topOpenCount} بار)
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5">کامیاب اوپن ہندسہ</span>
          </div>

          <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">ٹاپ آکڑا (Top Akra)</span>
            <span className="font-mono text-lg font-bold text-sky-400 block mt-1">
              {stats.topAkras[0] ? `${stats.topAkras[0].akra} (${stats.topAkras[0].count}x)` : 'دستیاب نہیں'}
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5">سب سے مقبول جوڑی</span>
          </div>

          <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 text-center col-span-2 md:col-span-1">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">طاق بمقابلہ جفت (Odd vs Even)</span>
            <span className="font-mono text-lg font-bold text-indigo-400 block mt-1">
              {stats.digitOddsPercentage}% / {stats.digitEvensPercentage}%
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5">ہندساتی توازن</span>
          </div>
        </div>

        {/* 4. SUB-TABS NAVIGATION WITHIN BOND ANALYSIS */}
        <div className="flex flex-row-reverse flex-wrap gap-2 mb-6 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveSubTab('digits')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeSubTab === 'digits'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>ہندساتی پوزیشنز (Digits Freq)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('akras')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeSubTab === 'akras'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>آکڑا روٹین (Akra Routines)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('cities')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeSubTab === 'cities'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>شہر وار تقسیم (City Breakdown)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('history')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeSubTab === 'history'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>سابقہ نتائج لسٹ ({filteredDraws.length})</span>
          </button>
        </div>

        {/* 5. SUB-TAB CONTENTS */}

        {/* DIGITS FREQUENCY */}
        {activeSubTab === 'digits' && (
          <div className="space-y-6">
            <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 border-b border-slate-900 pb-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  پوزیشن منتخب کریں (Select Position):
                </span>

                <div className="flex flex-row-reverse gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
                  <button
                    onClick={() => setDigitPosition('open')}
                    className={`flex-1 sm:flex-initial py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      digitPosition === 'open' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    اوپن (Open)
                  </button>
                  <button
                    onClick={() => setDigitPosition('close')}
                    className={`flex-1 sm:flex-initial py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      digitPosition === 'close' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    کلوز (Close)
                  </button>
                  <button
                    onClick={() => setDigitPosition('center')}
                    className={`flex-1 sm:flex-initial py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      digitPosition === 'center' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    سینٹر (Center)
                  </button>
                  <button
                    onClick={() => setDigitPosition('fourth')}
                    className={`flex-1 sm:flex-initial py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      digitPosition === 'fourth' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    فورتھ (4th)
                  </button>
                </div>
              </div>

              {/* 0-9 Digit Heatmap Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-6 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                {(() => {
                  const list = digitPosition === 'open' ? stats.openFreq :
                               digitPosition === 'close' ? stats.closeFreq :
                               digitPosition === 'center' ? stats.centerFreq : stats.fourthFreq;

                  const maxVal = Math.max(...list.map(i => i.count), 1);
                  return list.map((item) => {
                    const relativeWeight = item.count / maxVal;
                    const isHot = relativeWeight >= 0.7;
                    const isCold = relativeWeight <= 0.3;

                    return (
                      <div
                        key={item.value}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                          isHot
                            ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-md shadow-amber-500/10'
                            : isCold
                            ? 'bg-slate-950/60 border-slate-800/80 text-slate-500'
                            : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
                        }`}
                      >
                        <span className="text-lg font-bold font-mono">{item.value}</span>
                        <span className="text-[9px] text-slate-400 font-mono mt-0.5">{item.count} بار</span>
                      </div>
                    );
                  });
                })()}
              </div>

              {/* Detailed Frequency Bars */}
              <div className="space-y-2">
                {(() => {
                  const list = digitPosition === 'open' ? stats.openFreq :
                               digitPosition === 'close' ? stats.closeFreq :
                               digitPosition === 'center' ? stats.centerFreq : stats.fourthFreq;

                  const maxVal = Math.max(...list.map(i => i.count), 1);
                  return [...list].sort((a, b) => b.count - a.count).map((item, idx) => {
                    const pctOfMax = Math.round((item.count / maxVal) * 100);
                    const isHot = idx < 2;
                    const isCold = idx >= 8;

                    return (
                      <div key={item.value} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-mono text-[11px]">
                            {item.count} بار ({item.percentage}%)
                          </span>
                          {isHot && (
                            <span className="bg-amber-500/15 text-amber-400 text-[9px] px-1.5 py-0.5 rounded font-bold">ہاٹ</span>
                          )}
                          {isCold && (
                            <span className="bg-sky-500/15 text-sky-400 text-[9px] px-1.5 py-0.5 rounded font-bold">کولڈ</span>
                          )}
                        </div>

                        <div className="flex-1 mx-3 bg-slate-950 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-700 ${
                              isHot ? 'bg-gradient-to-r from-amber-500 to-red-500' : isCold ? 'bg-sky-500' : 'bg-slate-700'
                            }`} 
                            style={{ width: `${pctOfMax}%` }}
                          />
                        </div>

                        <div className="text-right flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-500">ہندسہ:</span>
                          <span className="font-bold text-white font-mono text-sm">{item.value}</span>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        )}

        {/* AKRA ROUTINES */}
        {activeSubTab === 'akras' && (
          <div className="space-y-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 text-right text-xs text-slate-300 leading-relaxed">
              <p>
                بانڈ <strong>{selectedBond}</strong> کے لیے تاریخ کے سب سے زیادہ دہرائے جانے والے ٹاپ آکڑا (Akra) جوڑے مندرجہ ذیل ہیں۔
              </p>
            </div>

            {stats.topAkras.length === 0 ? (
              <p className="text-center text-xs text-slate-500 py-8">کوئی آکڑا ریکارڈ موجود نہیں ہے۔</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {stats.topAkras.slice(0, 15).map((item, idx) => {
                  const maxCount = stats.topAkras[0]?.count || 1;
                  const pctOfMax = Math.round((item.count / maxCount) * 100);

                  return (
                    <div key={item.akra} className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded text-[9px] font-mono">#{idx + 1}</span>
                        <span className="text-slate-400 font-mono text-[11px]">({item.count} بار)</span>
                      </div>

                      <div className="flex-1 mx-3 bg-slate-950 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: `${pctOfMax}%` }} />
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-white font-mono text-base tracking-widest">{item.akra}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* CITY BREAKDOWN */}
        {activeSubTab === 'cities' && (
          <div className="space-y-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 text-right text-xs text-slate-300 leading-relaxed">
              <p>
                بانڈ <strong>{selectedBond}</strong> کی قرعہ اندازی پاکستان کے کن کن شہروں میں کتنی بار منعقد ہوئی:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stats.cityDistribution.map((item) => {
                const maxCount = stats.cityDistribution[0]?.count || 1;
                const pctOfMax = Math.round((item.count / maxCount) * 100);
                const isSelected = selectedCity === item.city;

                return (
                  <div 
                    key={item.city}
                    onClick={() => setSelectedCity(isSelected ? 'all' : item.city)}
                    className={`p-3.5 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">{item.count} ڈراز</span>
                      <span className="text-[10px] text-slate-500">({item.percentage}%)</span>
                    </div>

                    <div className="flex-1 mx-3 bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${pctOfMax}%` }} />
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-white text-xs block">{item.city}</span>
                      <span className="text-[9px] text-slate-500 block">{item.cityEng}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* HISTORICAL DRAWS LIST */}
        {activeSubTab === 'history' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="relative w-full sm:w-72">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-slate-500" />
                </span>
                <input
                  type="text"
                  placeholder="نمبر، تاریخ یا شہر تلاش کریں..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="w-full bg-slate-950 text-xs text-white pl-9 pr-3.5 py-2 rounded-xl border border-slate-800 focus:border-amber-500/50 outline-none text-right"
                />
              </div>

              <span className="text-xs text-slate-400 font-mono">
                کل نتائج: {searchedDraws.length}
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-right border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="p-3">تاریخ (Date)</th>
                    <th className="p-3">شہر (City)</th>
                    <th className="p-3">فرسٹ انعام (1st Prize)</th>
                    <th className="p-3">سیکنڈ انعامات (2nd Prizes)</th>
                    <th className="p-3 text-right">ڈرا نمبر / مالیت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                  {searchedDraws.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-500">مطلوبہ ریکارڈز موجود نہیں ہیں۔</td>
                    </tr>
                  ) : (
                    searchedDraws.map((draw) => (
                      <tr key={draw.id} className="hover:bg-slate-800/50 transition-all">
                        <td className="p-3 font-mono text-slate-400 text-xs">{draw.date}</td>
                        <td className="p-3 text-slate-300 font-semibold">{draw.city}</td>
                        <td className="p-3 font-mono font-black text-amber-400 text-sm tracking-wider">
                          {draw.firstPrize}
                        </td>
                        <td className="p-3 font-mono text-slate-400 text-xs max-w-xs truncate">
                          {Array.isArray(draw.secondPrizes) ? draw.secondPrizes.join(', ') : draw.secondPrizes}
                        </td>
                        <td className="p-3 font-bold text-white text-right">
                          <span className="block text-xs">{draw.drawNo}</span>
                          <span className="text-[10px] text-amber-400/80 font-mono block">{selectedBond}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
