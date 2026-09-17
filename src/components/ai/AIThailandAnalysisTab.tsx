import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  Calendar, 
  Filter, 
  RotateCcw, 
  Download, 
  Flame, 
  Snowflake, 
  Layers, 
  Hash, 
  Table as TableIcon,
  Percent,
  TrendingUp,
  Award
} from 'lucide-react';
import { ThaiLotteryResult } from '../../types';
import { 
  ThaiDrawDateFilter, 
  THAI_MONTHS_LIST, 
  filterThaiLotteryDraws, 
  getAvailableThaiYears, 
  computeThaiAnalysisMetrics,
  parseThaiDrawDate
} from '../../utils/thaiAnalysisUtils';
import { generateDrawHistoryPDF } from '../../utils/pdfGenerator';

interface AIThailandAnalysisTabProps {
  allThaiResults: ThaiLotteryResult[];
}

export const AIThailandAnalysisTab: React.FC<AIThailandAnalysisTabProps> = ({
  allThaiResults
}) => {
  // 1. Primary Filter States
  const [drawDateFilter, setDrawDateFilter] = useState<ThaiDrawDateFilter>('all');
  const [monthFilter, setMonthFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');

  // Sub-tab within Thailand Analysis
  const [activeAnalysisView, setActiveAnalysisView] = useState<'positions' | 'singleDigits' | 'akras' | 'oddeven' | 'records'>('positions');
  const [selectedPosition, setSelectedPosition] = useState<number>(0); // 0 = Open, 5 = Last

  const [statusMsg, setStatusMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  // Dynamically extract available years from all results
  const availableYears = useMemo(() => {
    return getAvailableThaiYears(allThaiResults);
  }, [allThaiResults]);

  // Apply Date-wise, Month-wise, and Year-wise filtering
  const filteredDraws = useMemo(() => {
    return filterThaiLotteryDraws(allThaiResults, drawDateFilter, monthFilter, yearFilter);
  }, [allThaiResults, drawDateFilter, monthFilter, yearFilter]);

  // Compute deep statistical metrics on the filtered draws
  const stats = useMemo(() => {
    return computeThaiAnalysisMetrics(filteredDraws);
  }, [filteredDraws]);

  // Reset all filters to default ('all')
  const handleResetFilters = () => {
    setDrawDateFilter('all');
    setMonthFilter('all');
    setYearFilter('all');
    setStatusMsg({ text: 'فلٹرز کامیابی سے ری سیٹ کر دیے گئے ہیں۔', isError: false });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Download PDF report of the current filtered results
  const handleDownloadPDF = async () => {
    if (filteredDraws.length === 0) {
      setStatusMsg({ text: 'ڈاؤن لوڈ کے لیے کوئی ریکارڈ موجود نہیں ہے۔', isError: true });
      setTimeout(() => setStatusMsg(null), 4000);
      return;
    }

    const monthObj = THAI_MONTHS_LIST.find(m => m.value === monthFilter);
    const dateLabel = drawDateFilter === '1st' ? '1st Date' : drawDateFilter === '16th' ? '16th Date' : 'All Dates';
    const monthLabel = monthObj ? monthObj.labelEng : 'All Months';

    const res = await generateDrawHistoryPDF(
      filteredDraws as any, 
      'thailand_lottery', 
      {
        bondValue: `${dateLabel} | ${monthLabel} | Year: ${yearFilter}`,
        city: 'بنکاک'
      }
    );

    if (res.success) {
      setStatusMsg({ text: 'تھائی لاٹری تجزیاتی رپورٹ پی ڈی ایف کامیابی سے تیار ہو گئی ہے!', isError: false });
      setTimeout(() => setStatusMsg(null), 4000);
    } else {
      setStatusMsg({ text: res.error || 'پی ڈی ایف بنانے میں خرابی پیش آئی۔', isError: true });
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  // Format active filter summary text
  const activeFilterSummary = useMemo(() => {
    const parts: string[] = ['تھائی لاٹری'];
    
    if (drawDateFilter === '1st') parts.push('یکم تاریخ (1st Draw)');
    else if (drawDateFilter === '16th') parts.push('16 تاریخ (16th Draw)');
    else parts.push('تمام تاریخیں (All Dates)');

    const mObj = THAI_MONTHS_LIST.find(m => m.value === monthFilter);
    if (mObj && monthFilter !== 'all') {
      parts.push(mObj.labelUrdu);
    } else {
      parts.push('تمام مہینے (All Months)');
    }

    if (yearFilter !== 'all') {
      parts.push(`سال ${yearFilter}`);
    } else {
      parts.push('تمام سال (All Years)');
    }

    return parts.join(' ➔ ');
  }, [drawDateFilter, monthFilter, yearFilter]);

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-800/50 p-4 sm:p-6 rounded-2xl border border-slate-700/50">
        
        {/* Main Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800 pb-5">
          <div className="flex flex-row-reverse gap-2 items-center w-full justify-between sm:justify-start">
            <div className="text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-500/30">
                  بنکاک، تھائی لینڈ (1st & 16th)
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                  <span>تھائی لاٹری تاریخ وار اور ماہانہ اینالیسس</span>
                  <Globe className="w-5 h-5 text-amber-400" />
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                تھائی لینڈ لاٹری کے ہر مہینے کی 1 اور 16 تاریخ کے ڈراز کا ماہانہ، سالانہ اور ہندساتی گہرا تجزیہ
              </p>
            </div>
          </div>

          <button
            id="download-thai-pdf-btn"
            onClick={handleDownloadPDF}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-sm shadow-amber-500/10 cursor-pointer transition-all self-end sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>اس تجزیے کا پی ڈی ایف رپورٹ ڈاؤن لوڈ کریں</span>
          </button>
        </div>

        {statusMsg && (
          <div className={`p-3 mb-5 rounded-xl text-xs text-right border ${statusMsg.isError ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
            {statusMsg.isError ? '⚠️ ' : '✓ '} {statusMsg.text}
          </div>
        )}

        {/* 1. FILTER CONTROLS BAR */}
        <div className="bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-slate-800 mb-6 space-y-4">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <button
                id="reset-thai-filters-btn"
                onClick={handleResetFilters}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold py-1.5 px-3 rounded-lg border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all"
                title="فلٹرز ری سیٹ کریں"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>فلٹرز ری سیٹ (Reset)</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <Filter className="w-4 h-4 text-amber-400" />
              <span>تھائی لینڈ لاٹری اینالیسس فلٹرز (Thailand Filters)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Filter 1: Draw Date Selector */}
            <div className="space-y-1.5">
              <label className="block text-right text-[11px] font-bold text-amber-400 flex items-center justify-end gap-1">
                <span>قرعہ اندازی کی تاریخ (Draw Date):</span>
                <Calendar className="w-3.5 h-3.5" />
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                <button
                  id="filter-date-all"
                  onClick={() => setDrawDateFilter('all')}
                  className={`py-2 px-2 text-center rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    drawDateFilter === 'all'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  تمام (All)
                </button>
                <button
                  id="filter-date-1st"
                  onClick={() => setDrawDateFilter('1st')}
                  className={`py-2 px-2 text-center rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    drawDateFilter === '1st'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  1 تاریخ (1st)
                </button>
                <button
                  id="filter-date-16th"
                  onClick={() => setDrawDateFilter('16th')}
                  className={`py-2 px-2 text-center rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    drawDateFilter === '16th'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  16 تاریخ (16th)
                </button>
              </div>
            </div>

            {/* Filter 2: Month Selector */}
            <div className="space-y-1.5">
              <label className="block text-right text-[11px] font-bold text-amber-400">
                مہینہ منتخب کریں (Month):
              </label>
              <select
                id="filter-month-select"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 py-2 px-3 rounded-xl text-xs font-bold focus:border-amber-500/50 outline-none text-right cursor-pointer"
              >
                {THAI_MONTHS_LIST.map((m) => (
                  <option key={m.value} value={m.value} className="bg-slate-900 text-white">
                    {m.labelUrdu}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 3: Year Selector */}
            <div className="space-y-1.5">
              <label className="block text-right text-[11px] font-bold text-amber-400">
                سال منتخب کریں (Year):
              </label>
              <select
                id="filter-year-select"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 py-2 px-3 rounded-xl text-xs font-bold focus:border-amber-500/50 outline-none text-right cursor-pointer font-mono"
              >
                <option value="all" className="bg-slate-900 text-white font-sans">
                  تمام دستیاب سال (All Years)
                </option>
                {availableYears.map((yr) => (
                  <option key={yr} value={yr} className="bg-slate-900 text-white font-mono">
                    {yr}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Active Filter Breadcrumb */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2 text-[11px] text-slate-400 border-t border-slate-900">
            <span className="font-mono text-amber-400 font-bold bg-amber-500/10 py-1 px-2.5 rounded-lg border border-amber-500/20">
              کل نتائج: {filteredDraws.length} Draws
            </span>
            <div className="flex items-center gap-1 text-right font-medium">
              <span className="text-slate-300 font-bold">فعال اینالیسس کمبینیشن:</span>
              <span className="text-amber-300">{activeFilterSummary}</span>
            </div>
          </div>
        </div>

        {/* 2. KEY ANALYTICAL HIGHLIGHT STATS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
          <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">کل ڈراز (Total Draws)</span>
            <span className="font-mono text-lg font-bold text-white block mt-0.5">{stats.totalDraws} Records</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">نمونہ سائز</span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold flex items-center justify-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" />
              <span>ہاٹ فگر (Hot Digit)</span>
            </span>
            <span className="font-mono text-lg font-bold text-amber-400 block mt-0.5">
              {stats.highlights.topHotDigit}
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5 font-mono">{stats.highlights.topHotDigitCount}x ظاہر ہوا</span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold flex items-center justify-center gap-1">
              <Snowflake className="w-3 h-3 text-cyan-400" />
              <span>کولڈ فگر (Cold Digit)</span>
            </span>
            <span className="font-mono text-lg font-bold text-cyan-400 block mt-0.5">
              {stats.highlights.topColdDigit}
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5 font-mono">{stats.highlights.topColdDigitCount}x کم ترین</span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">اوپن ہندسہ (Hot Open)</span>
            <span className="font-mono text-lg font-bold text-emerald-400 block mt-0.5">
              {stats.highlights.topOpenDigit}
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5 font-mono">{stats.highlights.topOpenDigitCount}x پہلا فگر</span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">ٹاپ آکڑا (Top Akra)</span>
            <span className="font-mono text-lg font-bold text-sky-400 block mt-0.5">
              {stats.highlights.topAkra}
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5 font-mono">{stats.highlights.topAkraCount}x فرسٹ جوڑی</span>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">ٹاپ L2 (Last 2)</span>
            <span className="font-mono text-lg font-bold text-indigo-400 block mt-0.5">
              {stats.highlights.topL2}
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5 font-mono">{stats.highlights.topL2Count}x ڈاون 2</span>
          </div>
        </div>

        {/* 3. SUB-TABS NAVIGATION WITHIN THAILAND ANALYSIS */}
        <div className="flex flex-row-reverse flex-wrap gap-2 mb-6 border-b border-slate-800 pb-3">
          <button
            id="thai-subtab-positions"
            onClick={() => setActiveAnalysisView('positions')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeAnalysisView === 'positions'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>پوزیشن وار تفصیلی تجزیہ (Position-wise 1 to 6)</span>
          </button>

          <button
            id="thai-subtab-singledigits"
            onClick={() => setActiveAnalysisView('singleDigits')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeAnalysisView === 'singleDigits'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>ہندساتی فریکوئنسی 0 تا 9 (Digit Frequency 0-9)</span>
          </button>

          <button
            id="thai-subtab-akras"
            onClick={() => setActiveAnalysisView('akras')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeAnalysisView === 'akras'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>آکڑا اور L2 جوڑیاں (Akra & Last 2 Analysis)</span>
          </button>

          <button
            id="thai-subtab-oddeven"
            onClick={() => setActiveAnalysisView('oddeven')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeAnalysisView === 'oddeven'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            <span>طاق و جفت توازن (Odd vs Even Ratio)</span>
          </button>

          <button
            id="thai-subtab-records"
            onClick={() => setActiveAnalysisView('records')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeAnalysisView === 'records'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>فلٹر شدہ ڈرا ریکارڈز ({filteredDraws.length})</span>
          </button>
        </div>

        {/* 4. SUB-TAB 1: POSITION-WISE ANALYSIS (1 TO 6) */}
        {activeAnalysisView === 'positions' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
              <span className="text-xs font-bold text-slate-400">
                پوزیشن منتخب کریں (Select Digit Position):
              </span>
              <span className="text-[11px] text-amber-400 font-bold">
                تھائی لینڈ لاٹری کے فرسٹ پرائز میں 6 ہندسے ہوتے ہیں
              </span>
            </div>

            {/* Position Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
              {stats.positions.map((pos) => {
                const isSelected = selectedPosition === pos.positionIndex;
                return (
                  <button
                    key={pos.positionIndex}
                    onClick={() => setSelectedPosition(pos.positionIndex)}
                    className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold">{pos.positionLabelUrdu}</div>
                    <div className={`text-[10px] font-mono mt-0.5 ${isSelected ? 'text-slate-950 font-bold' : 'text-slate-400'}`}>
                      {pos.positionLabelEng}
                    </div>
                    <div className="mt-1 flex items-center justify-center gap-1 text-[10px] font-mono">
                      <span>ٹاپ:</span>
                      <span className={`font-bold px-1.5 py-0.2 rounded ${isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-400'}`}>
                        {pos.topDigit} ({pos.topCount}x)
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Position Frequency Details Table */}
            {(() => {
              const currentPos = stats.positions[selectedPosition] || stats.positions[0];
              return (
                <div className="bg-slate-950/50 rounded-xl border border-slate-800 overflow-hidden">
                  <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex justify-between items-center text-xs font-bold">
                    <span className="text-amber-400 font-mono">
                      نمونہ سائز: {stats.totalDraws} Draws
                    </span>
                    <span className="text-white">
                      تفصیل برائے: {currentPos.positionLabelUrdu}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-right">
                      <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-3 text-center">کیفیت (Status)</th>
                          <th className="py-2.5 px-3 text-center">رینک (Rank)</th>
                          <th className="py-2.5 px-3">گراف تناسب</th>
                          <th className="py-2.5 px-3 text-center">فیصد (Percentage)</th>
                          <th className="py-2.5 px-3 text-center">تعداد (Count)</th>
                          <th className="py-2.5 px-3 text-center font-bold">ہندسہ (Digit)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {currentPos.items.map((it) => (
                          <tr key={it.digit} className="hover:bg-slate-900/40 transition-colors">
                            <td className="py-2.5 px-3 text-center">
                              {it.status === 'hot' && (
                                <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center justify-center gap-1 w-fit mx-auto font-sans">
                                  <Flame className="w-3 h-3 text-amber-400" />
                                  <span>ہاٹ (Hot)</span>
                                </span>
                              )}
                              {it.status === 'cold' && (
                                <span className="bg-cyan-500/20 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/30 flex items-center justify-center gap-1 w-fit mx-auto font-sans">
                                  <Snowflake className="w-3 h-3 text-cyan-400" />
                                  <span>کولڈ (Cold)</span>
                                </span>
                              )}
                              {it.status === 'neutral' && (
                                <span className="text-slate-500 text-[10px] font-sans">نارمل</span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-center text-slate-300 font-bold">#{it.rank}</td>
                            <td className="py-2.5 px-3 min-w-[120px]">
                              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                                <div 
                                  className={`h-full rounded-full ${it.status === 'hot' ? 'bg-amber-400' : it.status === 'cold' ? 'bg-cyan-500' : 'bg-slate-500'}`}
                                  style={{ width: `${Math.max(it.percentage, 4)}%` }}
                                />
                              </div>
                            </td>
                            <td className="py-2.5 px-3 text-center text-amber-300 font-bold">{it.percentage}%</td>
                            <td className="py-2.5 px-3 text-center text-white font-bold">{it.count}</td>
                            <td className="py-2.5 px-3 text-center font-bold text-base text-amber-400">{it.digit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* 5. SUB-TAB 2: SINGLE DIGIT ANALYSIS 0 TO 9 */}
        {activeAnalysisView === 'singleDigits' && (
          <div className="space-y-4">
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-mono">
                کل ہندساتی نمونہ سائز: <strong className="text-amber-400">{stats.totalDigitsAnalyzed}</strong> ہندسے
              </span>
              <span className="font-bold text-white">
                تمام پوزیشنز پر 0 تا 9 ہندسوں کا مجموعی تجزیہ
              </span>
            </div>

            <div className="bg-slate-950/50 rounded-xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3 text-center">کیفیت (Status)</th>
                      <th className="py-2.5 px-3 text-center">رینک (Rank)</th>
                      <th className="py-2.5 px-3">فریکوئنسی گراف</th>
                      <th className="py-2.5 px-3 text-center">فیصد (Percentage)</th>
                      <th className="py-2.5 px-3 text-center">تعداد (Count)</th>
                      <th className="py-2.5 px-3 text-center font-bold">ہندسہ (Digit 0-9)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {stats.singleDigitStats0to9.map((it) => (
                      <tr key={it.digit} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-2.5 px-3 text-center">
                          {it.status === 'hot' && (
                            <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center justify-center gap-1 w-fit mx-auto font-sans">
                              <Flame className="w-3 h-3 text-amber-400" />
                              <span>ہاٹ (Hot)</span>
                            </span>
                          )}
                          {it.status === 'cold' && (
                            <span className="bg-cyan-500/20 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/30 flex items-center justify-center gap-1 w-fit mx-auto font-sans">
                              <Snowflake className="w-3 h-3 text-cyan-400" />
                              <span>کولڈ (Cold)</span>
                            </span>
                          )}
                          {it.status === 'neutral' && (
                            <span className="text-slate-500 text-[10px] font-sans">نارمل</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center text-slate-300 font-bold">#{it.rank}</td>
                        <td className="py-2.5 px-3 min-w-[140px]">
                          <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                            <div 
                              className={`h-full rounded-full ${it.status === 'hot' ? 'bg-amber-400' : it.status === 'cold' ? 'bg-cyan-500' : 'bg-slate-400'}`}
                              style={{ width: `${Math.max(it.percentage * 5, 5)}%` }}
                            />
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-center text-amber-300 font-bold">{it.percentage}%</td>
                        <td className="py-2.5 px-3 text-center text-white font-bold">{it.count}</td>
                        <td className="py-2.5 px-3 text-center font-bold text-base text-amber-400">{it.digit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 6. SUB-TAB 3: AKRAS & LAST 2 (L2) PAIRS */}
        {activeAnalysisView === 'akras' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Front 2 (Akra) */}
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-800">
                <span className="text-[10px] font-mono text-slate-400">{stats.topAkras.length} Pairs</span>
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <span>ٹاپ آکڑا جوڑیاں (Front 2 Digits)</span>
                  <Award className="w-3.5 h-3.5" />
                </h4>
              </div>

              {stats.topAkras.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">کوئی آکڑا ریکارڈ نہیں ملا۔</div>
              ) : (
                <div className="space-y-1.5 font-mono text-xs">
                  {stats.topAkras.map((a) => (
                    <div key={a.pair} className="flex justify-between items-center bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold">{a.count} بار</span>
                        <span className="text-[10px] text-slate-400">({a.percentage}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">{a.pair}</span>
                        <span className="text-[10px] text-slate-500 font-sans">#{a.rank}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Last 2 (L2 / Down 2) */}
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-800">
                <span className="text-[10px] font-mono text-slate-400">{stats.topL2.length} Pairs</span>
                <h4 className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                  <span>ٹاپ ڈاؤن / ایل ٹو جوڑیاں (Last 2 Digits / L2)</span>
                  <TrendingUp className="w-3.5 h-3.5" />
                </h4>
              </div>

              {stats.topL2.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">کوئی L2 ریکارڈ نہیں ملا۔</div>
              ) : (
                <div className="space-y-1.5 font-mono text-xs">
                  {stats.topL2.map((l) => (
                    <div key={l.pair} className="flex justify-between items-center bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-400 font-bold">{l.count} بار</span>
                        <span className="text-[10px] text-slate-400">({l.percentage}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">{l.pair}</span>
                        <span className="text-[10px] text-slate-500 font-sans">#{l.rank}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* 7. SUB-TAB 4: ODD VS EVEN ANALYSIS */}
        {activeAnalysisView === 'oddeven' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Digit Level Odd vs Even */}
              <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800 text-center">
                <h4 className="text-xs font-bold text-white mb-2">
                  ہندساتی سطح پر طاق بمقابلہ جفت (All Digits Odd vs Even)
                </h4>
                <p className="text-[11px] text-slate-400 mb-4">
                  منتخب کردہ تمام تھائی لاٹری نمبرز کے کل ہندسوں کا تناسب
                </p>

                <div className="flex items-center justify-center gap-6 my-4 font-mono">
                  <div className="text-center">
                    <span className="text-xs text-amber-400 block font-bold">طاق (Odd)</span>
                    <span className="text-2xl font-bold text-white">{stats.oddVsEven.digitOddsPercentage}%</span>
                    <span className="text-[10px] text-slate-400 block">{stats.oddVsEven.totalOddDigits} ہندسے</span>
                  </div>
                  <div className="h-12 w-px bg-slate-800" />
                  <div className="text-center">
                    <span className="text-xs text-indigo-400 block font-bold">جفت (Even)</span>
                    <span className="text-2xl font-bold text-white">{stats.oddVsEven.digitEvensPercentage}%</span>
                    <span className="text-[10px] text-slate-400 block">{stats.oddVsEven.totalEvenDigits} ہندسے</span>
                  </div>
                </div>

                <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden flex border border-slate-800 mt-2">
                  <div className="bg-amber-500 h-full" style={{ width: `${stats.oddVsEven.digitOddsPercentage}%` }} />
                  <div className="bg-indigo-500 h-full" style={{ width: `${stats.oddVsEven.digitEvensPercentage}%` }} />
                </div>
              </div>

              {/* Draw Level Odd vs Even */}
              <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800 text-center">
                <h4 className="text-xs font-bold text-white mb-2">
                  فرسٹ پرائز آخری ہندسہ طاق بمقابلہ جفت (First Prize Ending)
                </h4>
                <p className="text-[11px] text-slate-400 mb-4">
                  فرسٹ پرائز کے آخری ہندسے کی بنیاد پر طاق اور جفت نتائج
                </p>

                <div className="flex items-center justify-center gap-6 my-4 font-mono">
                  <div className="text-center">
                    <span className="text-xs text-emerald-400 block font-bold">طاق پر ختم (Odd)</span>
                    <span className="text-2xl font-bold text-white">{stats.oddVsEven.firstPrizeOddsCount}</span>
                    <span className="text-[10px] text-slate-400 block">ڈراز</span>
                  </div>
                  <div className="h-12 w-px bg-slate-800" />
                  <div className="text-center">
                    <span className="text-xs text-sky-400 block font-bold">جفت پر ختم (Even)</span>
                    <span className="text-2xl font-bold text-white">{stats.oddVsEven.firstPrizeEvensCount}</span>
                    <span className="text-[10px] text-slate-400 block">ڈراز</span>
                  </div>
                </div>

                <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden flex border border-slate-800 mt-2">
                  <div 
                    className="bg-emerald-500 h-full" 
                    style={{ 
                      width: `${stats.totalDraws > 0 ? (stats.oddVsEven.firstPrizeOddsCount / stats.totalDraws) * 100 : 50}%` 
                    }} 
                  />
                  <div 
                    className="bg-sky-500 h-full" 
                    style={{ 
                      width: `${stats.totalDraws > 0 ? (stats.oddVsEven.firstPrizeEvensCount / stats.totalDraws) * 100 : 50}%` 
                    }} 
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 8. SUB-TAB 5: FILTERED DRAW RECORDS TABLE */}
        {activeAnalysisView === 'records' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-2">
              <span className="font-mono text-amber-400">
                ریکارڈز: {filteredDraws.length}
              </span>
              <span>فلٹر شدہ قرعہ اندازی کے نتائج کی فہرست</span>
            </div>

            <div className="bg-slate-950/50 rounded-xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
                <table className="w-full text-xs text-right">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 sticky top-0">
                    <tr>
                      <th className="py-2.5 px-3">سیکنڈ پرائزز</th>
                      <th className="py-2.5 px-3 text-center">F3 / B3</th>
                      <th className="py-2.5 px-3 text-center">L2 (ڈاؤن)</th>
                      <th className="py-2.5 px-3 text-center">فرسٹ پرائز</th>
                      <th className="py-2.5 px-3">تاریخ (Date)</th>
                      <th className="py-2.5 px-3">ڈرا تفصیل</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {filteredDraws.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-slate-500 font-sans">
                          کوئی نتیجہ نہیں ملا۔ براہ کرم مختلف فلٹرز منتخب کریں۔
                        </td>
                      </tr>
                    ) : (
                      filteredDraws.map((draw) => {
                        const parsed = parseThaiDrawDate(draw.date);
                        return (
                          <tr key={draw.id} className="hover:bg-slate-900/40 transition-colors">
                            <td className="py-2.5 px-3 text-slate-400 text-[11px] truncate max-w-[150px]" title={draw.secondPrizes?.join(', ')}>
                              {draw.secondPrizes && draw.secondPrizes.length > 0 ? draw.secondPrizes.join(', ') : '-'}
                            </td>
                            <td className="py-2.5 px-3 text-center text-slate-400 text-[11px]">
                              <span>F:{draw.front3Digits || '-'}</span> | <span>B:{draw.back3Digits || '-'}</span>
                            </td>
                            <td className="py-2.5 px-3 text-center font-bold text-indigo-400 text-sm">
                              {draw.last2Digits || '-'}
                            </td>
                            <td className="py-2.5 px-3 text-center font-bold text-base text-amber-400">
                              {draw.firstPrize}
                            </td>
                            <td className="py-2.5 px-3 text-slate-300">
                              <div>{draw.date}</div>
                              <span className="text-[10px] text-amber-400/80 font-sans">
                                {parsed.is1st ? 'یکم ڈرا' : parsed.is16th ? '16th ڈرا' : ''} ({parsed.monthNameUrdu})
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-sans font-bold text-white text-xs">
                              {draw.drawNo}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
