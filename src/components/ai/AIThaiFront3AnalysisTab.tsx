import React, { useState, useMemo } from 'react';
import { 
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
  Award,
  AlertCircle,
  Sparkles,
  Calendar,
  CheckCircle2,
  PieChart
} from 'lucide-react';
import { ThaiLotteryResult } from '../../types';
import { 
  ThaiDrawDateFilter, 
  THAI_MONTHS_LIST, 
  getAvailableThaiYears 
} from '../../utils/thaiAnalysisUtils';
import { 
  buildFront3Records, 
  filterFront3Records, 
  computeFront3Analysis,
  Front3Record
} from '../../utils/thaiFront3AnalysisUtils';
import { generateThaiFront3PDF } from '../../utils/pdfGenerator';

interface AIThaiFront3AnalysisTabProps {
  allThaiResults: ThaiLotteryResult[];
}

export const AIThaiFront3AnalysisTab: React.FC<AIThaiFront3AnalysisTabProps> = ({
  allThaiResults
}) => {
  // 1. Primary Filter States
  const [drawDateFilter, setDrawDateFilter] = useState<ThaiDrawDateFilter>('all');
  const [monthFilter, setMonthFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');

  // Sub-view within Front 3
  const [activeSubView, setActiveSubView] = useState<'positions' | 'combinations' | 'pairs' | 'patterns' | 'records'>('positions');
  const [selectedPos, setSelectedPos] = useState<1 | 2 | 3>(1);

  const [statusMsg, setStatusMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  // Available Years
  const availableYears = useMemo(() => {
    return getAvailableThaiYears(allThaiResults);
  }, [allThaiResults]);

  // Build clean Front 3 records from all Thai results
  const allFront3Records = useMemo(() => {
    return buildFront3Records(allThaiResults);
  }, [allThaiResults]);

  // Filter records by Date, Month, and Year
  const filteredRecords = useMemo(() => {
    return filterFront3Records(allFront3Records, drawDateFilter, monthFilter, yearFilter);
  }, [allFront3Records, drawDateFilter, monthFilter, yearFilter]);

  // Compute deep statistical metrics
  const metrics = useMemo(() => {
    return computeFront3Analysis(filteredRecords);
  }, [filteredRecords]);

  // Filter reset
  const handleResetFilters = () => {
    setDrawDateFilter('all');
    setMonthFilter('all');
    setYearFilter('all');
    setStatusMsg({ text: 'فرنٹ 3 کے تمام فلٹرز ری سیٹ کر دیے گئے ہیں۔', isError: false });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // PDF Export
  const handleDownloadPDF = async () => {
    if (filteredRecords.length === 0) {
      setStatusMsg({ text: 'ڈاؤن لوڈ کے لیے کوئی ریکارڈ موجود نہیں ہے۔', isError: true });
      setTimeout(() => setStatusMsg(null), 3000);
      return;
    }

    const monthObj = THAI_MONTHS_LIST.find((m) => m.value === monthFilter);
    const dateLabel = drawDateFilter === '1st' ? '1st Date' : drawDateFilter === '16th' ? '16th Date' : 'All Dates';
    const monthLabel = monthObj ? monthObj.labelEng : 'All Months';
    const yearLabel = yearFilter === 'all' ? 'All Years' : yearFilter;

    const res = await generateThaiFront3PDF(
      filteredRecords,
      { dateLabel, monthLabel, yearLabel },
      metrics.highlights
    );

    if (res.success) {
      setStatusMsg({ text: 'تھائی فرنٹ 3 پی ڈی ایف رپورٹ کامیابی سے ڈاؤن لوڈ ہو گئی ہے۔', isError: false });
    } else {
      setStatusMsg({ text: res.error || 'پی ڈی ایف رپورٹ بنانے میں خرابی پیش آئی۔', isError: true });
    }
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const selectedPosData = selectedPos === 1 ? metrics.positions.pos1 : selectedPos === 2 ? metrics.positions.pos2 : metrics.positions.pos3;

  return (
    <div className="space-y-6 text-right">
      {/* Header / Intro Card */}
      <div className="bg-slate-800/40 p-5 sm:p-6 rounded-3xl border border-slate-700/60 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-700/50">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs bg-amber-500/10 text-amber-400 font-mono font-bold px-3 py-1.5 rounded-xl border border-amber-500/25 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-amber-400" />
              <span>فرنٹ 3 ڈیٹا سیٹ: {filteredRecords.length} / {allFront3Records.length} ڈراز</span>
            </span>
            <button
              onClick={handleDownloadPDF}
              className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
              title="پی ڈی ایف رپورٹ محفوظ کریں"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>پی ڈی ایف رپورٹ</span>
            </button>
            <button
              onClick={handleResetFilters}
              className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all"
              title="فلٹرز ری سیٹ کریں"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>ری سیٹ</span>
            </button>
          </div>

          <div className="text-right">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-end gap-2">
              <span>تھائی لینڈ لاٹری — فرنٹ 3 ہندسے الگ تاریخی تجزیہ</span>
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Hash className="w-4 h-4" />
              </div>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              صرف First Prize کے ابتدائی 3 ہندسوں (Front 3) کا مکمل آزادانہ شماریاتی، پوزیشن وائز اور فریکوئنسی تجزیہ۔
            </p>
          </div>
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div className={`mt-3 p-3 rounded-xl text-xs flex items-center justify-end gap-2 text-right ${
            statusMsg.isError ? 'bg-red-500/10 border border-red-500/30 text-red-300' : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
          }`}>
            <span>{statusMsg.text}</span>
            {statusMsg.isError ? <AlertCircle className="w-4 h-4 text-red-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </div>
        )}

        {/* 3 Combined Filters: Date, Month, Year */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          {/* Draw Date Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center justify-end gap-1.5">
              <span>قرعہ اندازی تاریخ (Draw Date):</span>
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setDrawDateFilter('all')}
                className={`py-1.5 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  drawDateFilter === 'all'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                تمام (All)
              </button>
              <button
                onClick={() => setDrawDateFilter('1st')}
                className={`py-1.5 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  drawDateFilter === '1st'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1 تاریخ
              </button>
              <button
                onClick={() => setDrawDateFilter('16th')}
                className={`py-1.5 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  drawDateFilter === '16th'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                16 تاریخ
              </button>
            </div>
          </div>

          {/* Month Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center justify-end gap-1.5">
              <span>مہینہ (Draw Month):</span>
              <Filter className="w-3.5 h-3.5 text-amber-400" />
            </label>
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-500 outline-none text-right cursor-pointer"
            >
              {THAI_MONTHS_LIST.map((m) => (
                <option key={m.value} value={m.value} className="bg-slate-900">
                  {m.labelUrdu}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center justify-end gap-1.5">
              <span>سال (Draw Year):</span>
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
            </label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 text-xs font-mono font-semibold focus:border-amber-500 outline-none text-right cursor-pointer"
            >
              <option value="all" className="bg-slate-900 font-sans">تمام دستیاب سال (All Years)</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr} className="bg-slate-900 font-mono">
                  {yr}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Small Sample Warning */}
        {filteredRecords.length > 0 && filteredRecords.length < 5 && (
          <div className="mt-3 bg-amber-500/10 border border-amber-500/30 text-amber-300 p-2.5 rounded-xl text-xs flex items-center justify-end gap-2 text-right">
            <span>توجہ فرمائیں: منتخب کردہ فلٹرز کے تحت صرف {filteredRecords.length} تاریخی ڈراز دستیاب ہیں۔ تجزیاتی تناسب کا انحصار انہی مخصوص ریکارڈز پر ہے۔</span>
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          </div>
        )}
      </div>

      {/* Zero Records Empty State */}
      {filteredRecords.length === 0 ? (
        <div className="bg-slate-800/30 p-12 rounded-3xl border border-slate-800 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-slate-800/80 text-amber-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-white">اس filter کے لیے Historical Records دستیاب نہیں ہیں</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            براہ کرم اوپر موجود فلٹرز میں قرعہ اندازی کی تاریخ، مہینہ یا سال تبدیل کریں تاکہ مطلوبہ تاریخی ریکارڈز سامنے آ سکیں۔
          </p>
          <button
            onClick={handleResetFilters}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all cursor-pointer shadow inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>تمام فلٹرز ری سیٹ کریں</span>
          </button>
        </div>
      ) : (
        <>
          {/* Quick Analytical Summary Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Top Hot Digit */}
            <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60 text-right">
              <div className="flex items-center justify-between text-amber-400 mb-1">
                <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400">ہاٹ ہندسہ (Hot)</span>
              </div>
              <div className="text-2xl font-black font-mono text-amber-400">
                {metrics.highlights.topOverallHotDigit}
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">فرنٹ 3 میں سب سے زیادہ</p>
            </div>

            {/* Top Cold Digit */}
            <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60 text-right">
              <div className="flex items-center justify-between text-blue-400 mb-1">
                <Snowflake className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-bold text-slate-400">کولڈ ہندسہ (Cold)</span>
              </div>
              <div className="text-2xl font-black font-mono text-cyan-400">
                {metrics.highlights.topOverallColdDigit}
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">سب سے کم فریکوئنسی</p>
            </div>

            {/* Top 3-Digit Combination */}
            <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60 text-right">
              <div className="flex items-center justify-between text-emerald-400 mb-1">
                <Award className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-bold text-slate-400">ٹاپ Front 3</span>
              </div>
              <div className="text-2xl font-black font-mono text-emerald-400">
                {metrics.highlights.topCombo}
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">آمد: {metrics.highlights.topComboCount} بار</p>
            </div>

            {/* Top Pair 1+2 */}
            <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60 text-right">
              <div className="flex items-center justify-between text-purple-400 mb-1">
                <Layers className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] font-bold text-slate-400">جوڑی (Pos 1+2)</span>
              </div>
              <div className="text-2xl font-black font-mono text-purple-300">
                {metrics.highlights.topPair12}
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">آمد: {metrics.highlights.topPair12Count} بار</p>
            </div>

            {/* Top Pair 2+3 */}
            <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60 text-right">
              <div className="flex items-center justify-between text-pink-400 mb-1">
                <Layers className="w-4 h-4 text-pink-400" />
                <span className="text-[10px] font-bold text-slate-400">جوڑی (Pos 2+3)</span>
              </div>
              <div className="text-2xl font-black font-mono text-pink-300">
                {metrics.highlights.topPair23}
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">آمد: {metrics.highlights.topPair23Count} بار</p>
            </div>

            {/* Parity (Odd/Even) */}
            <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60 text-right">
              <div className="flex items-center justify-between text-amber-400 mb-1">
                <PieChart className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-bold text-slate-400">طاق بمقابلہ جفت</span>
              </div>
              <div className="text-base font-bold font-mono text-white mt-1">
                <span className="text-amber-400">{metrics.oddEven.oddDigitsPercentage}%</span> / <span className="text-blue-400">{metrics.oddEven.evenDigitsPercentage}%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">طاق {metrics.oddEven.totalOddDigits} | جفت {metrics.oddEven.totalEvenDigits}</p>
            </div>
          </div>

          {/* Sub-Views Switcher Navigation */}
          <div className="flex flex-row-reverse flex-wrap gap-2 border-b border-slate-800 pb-3">
            <button
              onClick={() => setActiveSubView('positions')}
              className={`flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer ${
                activeSubView === 'positions'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Hash className="w-3.5 h-3.5" />
              <span>پوزیشن تجزیہ (Position 1, 2, 3)</span>
            </button>

            <button
              onClick={() => setActiveSubView('combinations')}
              className={`flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer ${
                activeSubView === 'combinations'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>ٹاپ و مکرر کمبینیشنز (Combinations)</span>
            </button>

            <button
              onClick={() => setActiveSubView('pairs')}
              className={`flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer ${
                activeSubView === 'pairs'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>جوڑی تجزیہ (Digit Pairs 1+2 & 2+3)</span>
            </button>

            <button
              onClick={() => setActiveSubView('patterns')}
              className={`flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer ${
                activeSubView === 'patterns'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Percent className="w-3.5 h-3.5" />
              <span>پیٹرن، طاق/جفت و مفرد روٹ</span>
            </button>

            <button
              onClick={() => setActiveSubView('records')}
              className={`flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer ${
                activeSubView === 'records'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>تمام فلٹر شدہ ریکارڈز ({filteredRecords.length})</span>
            </button>
          </div>

          {/* VIEW 1: POSITION-WISE ANALYSIS (Position 1, 2, 3) */}
          {activeSubView === 'positions' && (
            <div className="space-y-5">
              {/* Position Selector Bar */}
              <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">حالیہ نمونہ (Recent Sample):</span>
                  <span className="text-xs bg-slate-900 text-amber-400 font-mono px-2 py-0.5 rounded-md border border-slate-700">
                    آخری {metrics.recentSampleSize} ڈراز
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedPos(1)}
                    className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedPos === 1
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-750 border border-slate-700'
                    }`}
                  >
                    پوزیشن 1 (اوپن)
                  </button>
                  <button
                    onClick={() => setSelectedPos(2)}
                    className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedPos === 2
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-750 border border-slate-700'
                    }`}
                  >
                    پوزیشن 2 (درمیانی)
                  </button>
                  <button
                    onClick={() => setSelectedPos(3)}
                    className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedPos === 3
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-750 border border-slate-700'
                    }`}
                  >
                    پوزیشن 3 (اختتامی)
                  </button>
                </div>
              </div>

              {/* Selected Position Detailed Card */}
              <div className="bg-slate-800/50 p-5 sm:p-6 rounded-3xl border border-slate-700/60 shadow-md">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-slate-700/50 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] bg-red-500/10 text-red-400 px-2.5 py-1 rounded-lg border border-red-500/20 font-bold flex items-center gap-1">
                      <Flame className="w-3 h-3 text-red-400" />
                      <span>ہاٹ: {selectedPosData.hotDigits.join(', ') || 'کوئی نہیں'}</span>
                    </span>
                    <span className="text-[11px] bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-lg border border-cyan-500/20 font-bold flex items-center gap-1">
                      <Snowflake className="w-3 h-3 text-cyan-400" />
                      <span>کولڈ: {selectedPosData.coldDigits.join(', ') || 'کوئی نہیں'}</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <h4 className="text-base font-bold text-white flex items-center justify-end gap-1.5">
                      <span>{selectedPosData.labelUrdu}</span>
                      <span className="text-xs text-slate-400 font-normal">({selectedPosData.labelEng})</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      فرنٹ 3 کے ہندسہ نمبر {selectedPos} کا تمام {filteredRecords.length} ڈراز میں تجزیہ
                    </p>
                  </div>
                </div>

                {/* Digit Frequency Visual Cards (0-9) */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                  {selectedPosData.digits0to9.map((item) => (
                    <div
                      key={item.digit}
                      className={`p-3.5 rounded-2xl border text-right transition-all ${
                        item.status === 'hot'
                          ? 'bg-gradient-to-b from-amber-500/15 to-red-500/10 border-amber-500/40 shadow-sm'
                          : item.status === 'cold'
                          ? 'bg-slate-900/90 border-cyan-500/20'
                          : 'bg-slate-900/60 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          رینک #{item.rank}
                        </span>
                        <div className="flex items-center gap-1">
                          {item.status === 'hot' && (
                            <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                              <Flame className="w-2.5 h-2.5 text-red-400" /> ہاٹ
                            </span>
                          )}
                          {item.status === 'cold' && (
                            <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                              <Snowflake className="w-2.5 h-2.5 text-cyan-400" /> کولڈ
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-3xl font-black font-mono text-white">
                          {item.digit}
                        </span>
                        <span className="text-base font-bold font-mono text-amber-400">
                          {item.percentage}%
                        </span>
                      </div>

                      {/* Frequency Bar */}
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full rounded-full ${
                            item.status === 'hot' ? 'bg-amber-500' : item.status === 'cold' ? 'bg-cyan-500' : 'bg-slate-500'
                          }`}
                          style={{ width: `${Math.min(100, Math.max(5, item.percentage))}%` }}
                        />
                      </div>

                      <div className="space-y-0.5 text-[10px]">
                        <div className="flex justify-between text-slate-300 font-mono">
                          <span className="text-white font-bold">{item.count} بار</span>
                          <span className="text-slate-400 font-sans">تاریخی آمد:</span>
                        </div>
                        <div className="flex justify-between text-slate-400 font-mono">
                          <span className="text-amber-300 font-bold">{item.recentCount} بار ({item.recentPercentage}%)</span>
                          <span className="text-slate-400 font-sans">حالیہ ({metrics.recentSampleSize}):</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Position 1, 2, 3 Comparison Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-700/60">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-slate-900 text-slate-300 font-bold border-b border-slate-700">
                      <tr>
                        <th className="p-2.5 text-center font-mono">ہندسہ</th>
                        <th className="p-2.5">حیثیت (Status)</th>
                        <th className="p-2.5 text-center font-mono">رینک</th>
                        <th className="p-2.5 text-center font-mono">تاریخی فریکوئنسی</th>
                        <th className="p-2.5 text-center font-mono">تاریخی فیصد</th>
                        <th className="p-2.5 text-center font-mono">حالیہ فریکوئنسی ({metrics.recentSampleSize})</th>
                        <th className="p-2.5 text-center font-mono">حالیہ فیصد</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-950/40">
                      {selectedPosData.digits0to9.map((d) => (
                        <tr key={d.digit} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-2.5 text-center font-mono font-black text-amber-400 text-sm">{d.digit}</td>
                          <td className="p-2.5">
                            {d.status === 'hot' ? (
                              <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold inline-flex items-center gap-1">
                                <Flame className="w-3 h-3" /> ہاٹ ہندسہ
                              </span>
                            ) : d.status === 'cold' ? (
                              <span className="bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded font-bold inline-flex items-center gap-1">
                                <Snowflake className="w-3 h-3" /> کولڈ ہندسہ
                              </span>
                            ) : (
                              <span className="text-slate-400">معتدل (Neutral)</span>
                            )}
                          </td>
                          <td className="p-2.5 text-center font-mono text-slate-300">#{d.rank}</td>
                          <td className="p-2.5 text-center font-mono font-bold text-white">{d.count} بار</td>
                          <td className="p-2.5 text-center font-mono text-amber-400 font-bold">{d.percentage}%</td>
                          <td className="p-2.5 text-center font-mono text-slate-200">{d.recentCount} بار</td>
                          <td className="p-2.5 text-center font-mono text-emerald-400 font-bold">{d.recentPercentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: TOP & REPEATED COMBINATIONS */}
          {activeSubView === 'combinations' && (
            <div className="space-y-6">
              {/* Repeated Combinations (آمد > 1) */}
              <div className="bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/50 mb-4">
                  <span className="text-xs bg-purple-500/10 text-purple-300 px-3 py-1 rounded-lg border border-purple-500/25 font-bold font-mono">
                    تعداد: {metrics.repeatedCombinations.length} مکرر کمبینیشنز
                  </span>
                  <h4 className="text-base font-bold text-white flex items-center justify-end gap-1.5">
                    <span>بار بار دہرائے جانے والے Front 3 (Repeated Combinations)</span>
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </h4>
                </div>

                {metrics.repeatedCombinations.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">
                    منتخب کردہ فلٹرز کے تحت کوئی Front 3 ایک سے زائد بار نہیں آیا۔
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {metrics.repeatedCombinations.map((c) => (
                      <div key={c.combination} className="bg-slate-900/80 p-3.5 rounded-2xl border border-purple-500/30 text-right">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] bg-purple-500/20 text-purple-300 font-bold font-mono px-2 py-0.5 rounded-md">
                            آمد: {c.count} بار ({c.percentage}%)
                          </span>
                          <span className="text-2xl font-black font-mono text-amber-400 tracking-wider">
                            {c.combination}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-2 border-t border-slate-800 pt-1.5">
                          <span className="text-slate-500">تاریخیں: </span>
                          <span className="text-slate-300 font-mono">{c.dates.join(' ، ')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Top Combinations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Most Frequent */}
                <div className="bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md">
                  <h4 className="text-sm font-bold text-white mb-3 pb-2 border-b border-slate-700/50 flex items-center justify-end gap-1.5">
                    <span>سب سے زیادہ آنے والے Front 3 (Top Frequent)</span>
                    <Flame className="w-4 h-4 text-amber-400" />
                  </h4>

                  <div className="space-y-2">
                    {metrics.topCombinations.slice(0, 10).map((item) => (
                      <div key={item.combination} className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-amber-500/10 text-amber-400 font-mono font-bold px-2 py-0.5 rounded border border-amber-500/20">
                            {item.count} بار ({item.percentage}%)
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-base font-black font-mono text-white tracking-widest">
                            {item.combination}
                          </span>
                          <span className="text-xs font-mono text-slate-400">#{item.rank}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Least Frequent / Single occurrences */}
                <div className="bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md">
                  <h4 className="text-sm font-bold text-white mb-3 pb-2 border-b border-slate-700/50 flex items-center justify-end gap-1.5">
                    <span>کم آنے والے Front 3 کمبینیشنز (Least Frequent / Rare)</span>
                    <Snowflake className="w-4 h-4 text-cyan-400" />
                  </h4>

                  <div className="space-y-2">
                    {metrics.leastCombinations.slice(0, 10).map((item, idx) => (
                      <div key={`${item.combination}-${idx}`} className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-cyan-500/10 text-cyan-400 font-mono font-bold px-2 py-0.5 rounded border border-cyan-500/20">
                            {item.count} بار ({item.percentage}%)
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-base font-black font-mono text-slate-300 tracking-widest">
                            {item.combination}
                          </span>
                          <span className="text-xs font-mono text-slate-500">#{idx + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: DIGIT PAIRS (Pos 1+2 and Pos 2+3) */}
          {activeSubView === 'pairs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Pair Pos 1 + 2 */}
              <div className="bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md">
                <div className="pb-3 border-b border-slate-700/50 mb-4 text-right">
                  <h4 className="text-base font-bold text-white flex items-center justify-end gap-1.5">
                    <span>فرنٹ جوڑی (Position 1 + 2 Akra)</span>
                    <Layers className="w-4 h-4 text-amber-400" />
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Front 3 کے پہلے دو ہندسوں کا باہمی ملاپ
                  </p>
                </div>

                <div className="space-y-2">
                  {metrics.pair12Stats.map((item) => (
                    <div key={item.pair} className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-amber-500/10 text-amber-400 font-mono font-bold px-2 py-0.5 rounded border border-amber-500/20">
                          {item.count} بار ({item.percentage}%)
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black font-mono text-white tracking-widest">
                          {item.pair}
                        </span>
                        <span className="text-xs font-mono text-slate-400">#{item.rank}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pair Pos 2 + 3 */}
              <div className="bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md">
                <div className="pb-3 border-b border-slate-700/50 mb-4 text-right">
                  <h4 className="text-base font-bold text-white flex items-center justify-end gap-1.5">
                    <span>پچھلی جوڑی (Position 2 + 3 Pair)</span>
                    <Layers className="w-4 h-4 text-pink-400" />
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Front 3 کے دوسرے اور تیسرے ہندسے کا باہمی ملاپ
                  </p>
                </div>

                <div className="space-y-2">
                  {metrics.pair23Stats.map((item) => (
                    <div key={item.pair} className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-pink-500/10 text-pink-400 font-mono font-bold px-2 py-0.5 rounded border border-pink-500/20">
                          {item.count} بار ({item.percentage}%)
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black font-mono text-white tracking-widest">
                          {item.pair}
                        </span>
                        <span className="text-xs font-mono text-slate-400">#{item.rank}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 4: PATTERNS, PARITY & DIGIT SUM */}
          {activeSubView === 'patterns' && (
            <div className="space-y-6">
              {/* Patterns & Parity Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Repeated Digits Pattern */}
                <div className="bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md">
                  <h4 className="text-base font-bold text-white mb-4 pb-2 border-b border-slate-700/50 flex items-center justify-end gap-1.5 text-right">
                    <span>ہندساتی ساخت (Digit Repeat Patterns)</span>
                    <Percent className="w-4 h-4 text-amber-400" />
                  </h4>

                  <div className="space-y-3">
                    <div className="bg-slate-900/70 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                        {metrics.patterns.distinctCount} بار ({metrics.patterns.distinctPercentage}%)
                      </span>
                      <div className="text-right">
                        <span className="text-xs font-bold text-white block">تینوں مختلف ہندسے (Distinct)</span>
                        <span className="text-[10px] text-slate-400">مثال: 123 ، 789 ، 456</span>
                      </div>
                    </div>

                    <div className="bg-slate-900/70 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
                        {metrics.patterns.doublesCount} بار ({metrics.patterns.doublesPercentage}%)
                      </span>
                      <div className="text-right">
                        <span className="text-xs font-bold text-white block">دو یکساں ہندسے (Doubles)</span>
                        <span className="text-[10px] text-slate-400">مثال: 112 ، 212 ، 221</span>
                      </div>
                    </div>

                    <div className="bg-slate-900/70 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/20">
                        {metrics.patterns.triplesCount} بار ({metrics.patterns.triplesPercentage}%)
                      </span>
                      <div className="text-right">
                        <span className="text-xs font-bold text-white block">تینوں یکساں (Triples)</span>
                        <span className="text-[10px] text-slate-400">مثال: 777 ، 333 ، 000</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parity Breakdown */}
                <div className="bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md">
                  <h4 className="text-base font-bold text-white mb-4 pb-2 border-b border-slate-700/50 flex items-center justify-end gap-1.5 text-right">
                    <span>طاق بمقابلہ جفت ساخت (Odd / Even Breakdown)</span>
                    <PieChart className="w-4 h-4 text-blue-400" />
                  </h4>

                  <div className="space-y-2.5">
                    <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                      <span className="font-mono text-amber-400 font-bold">{metrics.oddEven.threeOddsCount} بار ({metrics.oddEven.threeOddsPercentage}%)</span>
                      <span className="text-slate-300">3 طاق ہندسے (All Odd)</span>
                    </div>
                    <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                      <span className="font-mono text-amber-300 font-bold">{metrics.oddEven.twoOddsOneEvenCount} بار ({metrics.oddEven.twoOddsOneEvenPercentage}%)</span>
                      <span className="text-slate-300">2 طاق + 1 جفت (2 Odd, 1 Even)</span>
                    </div>
                    <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                      <span className="font-mono text-blue-300 font-bold">{metrics.oddEven.oneOddTwoEvensCount} بار ({metrics.oddEven.oneOddTwoEvensPercentage}%)</span>
                      <span className="text-slate-300">1 طاق + 2 جفت (1 Odd, 2 Even)</span>
                    </div>
                    <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                      <span className="font-mono text-blue-400 font-bold">{metrics.oddEven.threeEvensCount} بار ({metrics.oddEven.threeEvensPercentage}%)</span>
                      <span className="text-slate-300">3 جفت ہندسے (All Even)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Digit Sums and Single Root */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Digit Sums */}
                <div className="bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md">
                  <h4 className="text-sm font-bold text-white mb-3 pb-2 border-b border-slate-700/50 flex items-center justify-end gap-1.5 text-right">
                    <span>Front 3 ہندساتی مجموعہ (Digit Sum: 0 - 27)</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {metrics.sumStats.slice(0, 9).map((s) => (
                      <div key={s.sum} className="bg-slate-900 p-2 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-emerald-400">{s.count}x ({s.percentage}%)</span>
                        <span className="font-mono font-bold text-white text-sm">مجموعہ {s.sum}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Root Sum (1-9) */}
                <div className="bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md">
                  <h4 className="text-sm font-bold text-white mb-3 pb-2 border-b border-slate-700/50 flex items-center justify-end gap-1.5 text-right">
                    <span>عددی مفرد روٹ (Harmonic Root: 1 - 9)</span>
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {metrics.rootStats.map((r) => (
                      <div key={r.root} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                        <div className="text-lg font-mono font-black text-amber-400">{r.root}</div>
                        <div className="text-[10px] font-mono text-slate-300 mt-0.5">{r.count} بار ({r.percentage}%)</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 5: RAW FILTERED RECORDS TABLE */}
          {activeSubView === 'records' && (
            <div className="bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-700/50">
                <span className="text-xs bg-slate-900 text-slate-300 px-3 py-1 rounded-xl border border-slate-700 font-mono">
                  کل ریکارڈز: {filteredRecords.length}
                </span>
                <h4 className="text-sm font-bold text-white flex items-center justify-end gap-1.5">
                  <span>تھائی لاٹری فرنٹ 3 تاریخی ریکارڈز لاگ</span>
                  <TableIcon className="w-4 h-4 text-amber-400" />
                </h4>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-700/60">
                <table className="w-full text-xs text-right">
                  <thead className="bg-slate-900 text-slate-300 font-bold border-b border-slate-700">
                    <tr>
                      <th className="p-3 text-center font-mono">نمبر شمار</th>
                      <th className="p-3 text-center font-mono">قرعہ اندازی تاریخ</th>
                      <th className="p-3">ڈرا کی تفصیل</th>
                      <th className="p-3 text-center font-mono">مکمل First Prize</th>
                      <th className="p-3 text-center font-mono">Front 3 (تجزیاتی)</th>
                      <th className="p-3 text-center font-mono">Pos 1</th>
                      <th className="p-3 text-center font-mono">Pos 2</th>
                      <th className="p-3 text-center font-mono">Pos 3</th>
                      <th className="p-3 text-center font-mono">مجموعہ / روٹ</th>
                      <th className="p-3 text-center">پیٹرن</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-950/40">
                    {filteredRecords.map((r, idx) => (
                      <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3 text-center font-mono text-slate-400">{idx + 1}</td>
                        <td className="p-3 text-center font-mono text-slate-200">{r.date}</td>
                        <td className="p-3 text-slate-300 font-semibold">{r.drawNo}</td>
                        <td className="p-3 text-center font-mono font-bold text-slate-400">{r.firstPrize || '--'}</td>
                        <td className="p-3 text-center font-mono font-black text-amber-400 text-base bg-amber-500/10 rounded">
                          {r.front3}
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-white">{r.d1}</td>
                        <td className="p-3 text-center font-mono font-bold text-white">{r.d2}</td>
                        <td className="p-3 text-center font-mono font-bold text-white">{r.d3}</td>
                        <td className="p-3 text-center font-mono text-emerald-400">
                          {r.sum} <span className="text-slate-500 text-[10px]">(روٹ {r.rootSum})</span>
                        </td>
                        <td className="p-3 text-center">
                          {r.patternType === 'triple' ? (
                            <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded font-bold">ٹرپل</span>
                          ) : r.patternType === 'double' ? (
                            <span className="bg-purple-500/20 text-purple-400 text-[10px] px-2 py-0.5 rounded font-bold">ڈبل</span>
                          ) : (
                            <span className="text-slate-400 text-[10px]">مختلف</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
