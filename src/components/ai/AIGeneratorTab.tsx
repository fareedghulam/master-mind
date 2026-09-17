import React from 'react';
import { Calculator, Sparkles, TrendingUp, Filter, Calendar, RotateCcw, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { GeneratedCandidateResult, GenFormula } from '../../utils/luckyGenerateUtils';
import { PK_BOND_CATEGORIES, PK_CITIES_LIST } from '../../utils/bondAnalysisUtils';
import { THAI_MONTHS_LIST, ThaiDrawDateFilter } from '../../utils/thaiAnalysisUtils';

interface AIGeneratorTabProps {
  genCategory: 'pakistan_bond' | 'thailand_lottery';
  setGenCategory: (cat: 'pakistan_bond' | 'thailand_lottery') => void;
  genFormula: GenFormula;
  setGenFormula: (formula: GenFormula) => void;
  
  // Pakistan filters
  genPkBondValue: string;
  setGenPkBondValue: (val: string) => void;
  genPkCity: string;
  setGenPkCity: (val: string) => void;

  // Thailand filters
  genThaiDrawDate: ThaiDrawDateFilter;
  setGenThaiDrawDate: (d: ThaiDrawDateFilter) => void;
  genThaiMonth: string;
  setGenThaiMonth: (m: string) => void;
  genThaiYear: string;
  setGenThaiYear: (y: string) => void;
  availableThaiYears: string[];

  // Statistics & State
  sampleSize: number;
  isGenerating: boolean;
  generatedResult: GeneratedCandidateResult | null;
  generateError: string | null;
  sessionGeneratedNumbers: string[];
  onResetSessionHistory: () => void;
  handleGenerate: () => void;

  // Quick Booking
  quickFirstAmt: string;
  setQuickFirstAmt: (val: string) => void;
  quickSecondAmt: string;
  setQuickSecondAmt: (val: string) => void;
  bookingStatus: { type: 'success' | 'error'; message: string } | null;
  handleQuickBook: (isDemand: boolean) => void;
}

export const AIGeneratorTab: React.FC<AIGeneratorTabProps> = ({
  genCategory,
  setGenCategory,
  genFormula,
  setGenFormula,
  genPkBondValue,
  setGenPkBondValue,
  genPkCity,
  setGenPkCity,
  genThaiDrawDate,
  setGenThaiDrawDate,
  genThaiMonth,
  setGenThaiMonth,
  genThaiYear,
  setGenThaiYear,
  availableThaiYears,
  sampleSize,
  isGenerating,
  generatedResult,
  generateError,
  sessionGeneratedNumbers,
  onResetSessionHistory,
  handleGenerate,
  quickFirstAmt,
  setQuickFirstAmt,
  quickSecondAmt,
  setQuickSecondAmt,
  bookingStatus,
  handleQuickBook
}) => {
  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-800/50 p-4 sm:p-6 rounded-2xl border border-slate-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 border-b border-slate-700/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-slate-900 text-amber-400 font-mono px-2.5 py-1 rounded-lg border border-amber-500/20 flex items-center gap-1">
              <span>ریکارڈز نمونہ: {sampleSize} ڈراز</span>
            </span>
            {sessionGeneratedNumbers.length > 0 && (
              <button
                onClick={onResetSessionHistory}
                title="سیشن ہسٹری ری سیٹ کریں"
                className="text-[11px] bg-slate-900 hover:bg-slate-700 text-slate-300 hover:text-white px-2 py-1 rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer transition-all"
              >
                <RotateCcw className="w-3 h-3 text-amber-400" />
                <span>سیشن ری سیٹ ({sessionGeneratedNumbers.length})</span>
              </button>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center justify-end gap-1.5">
            <span>اے آئی سمارٹ لکی نمبر کیلکولیٹر (حقیقی تاریخی تجزیہ)</span>
            <Calculator className="w-5 h-5 text-amber-400" />
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Configuration side (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Draw Category Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">کیٹیگری منتخب کریں (Choose Draw):</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGenCategory('pakistan_bond')}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    genCategory === 'pakistan_bond'
                      ? 'bg-slate-900 border-amber-500 text-amber-400 shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                  }`}
                >
                  پاکستان پرائز بانڈ (6 ہندسے)
                </button>
                <button
                  onClick={() => setGenCategory('thailand_lottery')}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    genCategory === 'thailand_lottery'
                      ? 'bg-slate-900 border-amber-500 text-amber-400 shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                  }`}
                >
                  تھائی لینڈ لاٹری (4 ہندسے)
                </button>
              </div>
            </div>

            {/* Pakistan Filters */}
            {genCategory === 'pakistan_bond' && (
              <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-amber-400">
                  <span>پاکستان فلٹرز (Pakistan Analysis Filters)</span>
                  <Filter className="w-3.5 h-3.5" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">بانڈ کی مالیت (Bond Value):</label>
                    <select
                      value={genPkBondValue}
                      onChange={(e) => setGenPkBondValue(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-1.5 text-xs focus:border-amber-500 outline-none text-right cursor-pointer"
                    >
                      {PK_BOND_CATEGORIES.map((b) => (
                        <option key={b.value} value={b.value} className="bg-slate-900">
                          {b.labelUrdu}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">شہر (Draw City):</label>
                    <select
                      value={genPkCity}
                      onChange={(e) => setGenPkCity(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-1.5 text-xs focus:border-amber-500 outline-none text-right cursor-pointer"
                    >
                      <option value="all" className="bg-slate-900">تمام شہر (All Cities)</option>
                      {PK_CITIES_LIST.map((c) => (
                        <option key={c.nameUrdu} value={c.nameUrdu} className="bg-slate-900">
                          {c.nameUrdu}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Thailand Filters */}
            {genCategory === 'thailand_lottery' && (
              <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-amber-400">
                  <span>تھائی لاٹری تاریخ و مہینہ فلٹرز (Thailand Filters)</span>
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Draw date filter */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">قرعہ اندازی تاریخ:</label>
                    <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
                      <button
                        onClick={() => setGenThaiDrawDate('all')}
                        className={`py-1 text-center rounded text-[10px] font-bold transition-all cursor-pointer ${
                          genThaiDrawDate === 'all'
                            ? 'bg-amber-500 text-slate-950'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        تمام
                      </button>
                      <button
                        onClick={() => setGenThaiDrawDate('1st')}
                        className={`py-1 text-center rounded text-[10px] font-bold transition-all cursor-pointer ${
                          genThaiDrawDate === '1st'
                            ? 'bg-amber-500 text-slate-950'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        1 تاریخ
                      </button>
                      <button
                        onClick={() => setGenThaiDrawDate('16th')}
                        className={`py-1 text-center rounded text-[10px] font-bold transition-all cursor-pointer ${
                          genThaiDrawDate === '16th'
                            ? 'bg-amber-500 text-slate-950'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        16 تاریخ
                      </button>
                    </div>
                  </div>

                  {/* Month filter */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">مہینہ (Month):</label>
                    <select
                      value={genThaiMonth}
                      onChange={(e) => setGenThaiMonth(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-1.5 text-[11px] focus:border-amber-500 outline-none text-right cursor-pointer"
                    >
                      {THAI_MONTHS_LIST.map((m) => (
                        <option key={m.value} value={m.value} className="bg-slate-900">
                          {m.labelUrdu}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Year filter */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">سال (Year):</label>
                    <select
                      value={genThaiYear}
                      onChange={(e) => setGenThaiYear(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-1.5 text-[11px] focus:border-amber-500 outline-none text-right cursor-pointer font-mono"
                    >
                      <option value="all" className="bg-slate-900 font-sans">تمام سال (All)</option>
                      {availableThaiYears.map((yr) => (
                        <option key={yr} value={yr} className="bg-slate-900 font-mono">
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Formula Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">اے آئی شماریاتی فارمولا (AI Statistical Logic):</label>
              <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                <button
                  onClick={() => setGenFormula('frequency')}
                  className={`py-2 px-1 text-center font-bold rounded-xl border transition-all cursor-pointer ${
                    genFormula === 'frequency'
                      ? 'bg-slate-900 border-amber-500 text-amber-400 shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                  }`}
                >
                  ہندساتی کثافت (Frequency)
                </button>
                <button
                  onClick={() => setGenFormula('odd_even')}
                  className={`py-2 px-1 text-center font-bold rounded-xl border transition-all cursor-pointer ${
                    genFormula === 'odd_even'
                      ? 'bg-slate-900 border-amber-500 text-amber-400 shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                  }`}
                >
                  طاق/جفت تسلسل (Parity)
                </button>
                <button
                  onClick={() => setGenFormula('astrological')}
                  className={`py-2 px-1 text-center font-bold rounded-xl border transition-all cursor-pointer ${
                    genFormula === 'astrological'
                      ? 'bg-slate-900 border-amber-500 text-amber-400 shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                  }`}
                >
                  عددی مفرد (Harmonic Root)
                </button>
              </div>
            </div>

            {/* Generate Button */}
            <button
              id="lucky-generate-submit-btn"
              onClick={handleGenerate}
              disabled={isGenerating || sampleSize === 0}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>تاریخی ریکارڈز کا شماریاتی تجزیہ جاری ہے...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>خوش قسمت نمبر تیار کریں (Generate from Historical Analysis)</span>
                </>
              )}
            </button>

            {/* Error Message if any */}
            {generateError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-xl text-xs flex items-start justify-end gap-2 text-right">
                <span>{generateError}</span>
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              </div>
            )}
          </div>

          {/* Result Display Side (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/80 p-5 rounded-2xl border border-slate-700/50 flex flex-col justify-center items-center text-center">
            {generatedResult ? (
              <div className="space-y-4 w-full text-right">
                <div className="text-center space-y-1">
                  <p className="text-[10px] text-amber-400/90 tracking-wider uppercase font-bold flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>تجزیاتی لکی نمبر (HISTORICAL CANDIDATE)</span>
                  </p>
                  
                  <div className="text-4xl font-mono font-black text-amber-400 bg-slate-950 py-3.5 px-6 rounded-2xl tracking-widest inline-block border border-slate-800 shadow-inner">
                    {generatedResult.number}
                  </div>

                  <div className="flex justify-center items-center gap-1.5 pt-1">
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 font-bold font-mono px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                      {generatedResult.score}%
                    </span>
                    <span className="text-[11px] text-slate-300 font-semibold">
                      شماریاتی تطابق اسکور (Historical Match Score)
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-400">
                    یہ اسکور منتخب شدہ {generatedResult.sampleSize} تاریخی ڈراز کی ہندساتی فریکوئنسی اور پوزیشن پیٹرنز پر مبنی ہے۔
                  </p>
                </div>

                {/* Key Metrics Badges */}
                <div className="grid grid-cols-2 gap-1.5 text-[10px] bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="bg-slate-900/90 p-1.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-mono text-amber-400 font-bold">{generatedResult.statsBreakdown.openDigit} ({generatedResult.statsBreakdown.openDigitPercentage}%)</span>
                    <span className="text-slate-400">اوپن کثافت:</span>
                  </div>
                  <div className="bg-slate-900/90 p-1.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-mono text-amber-400 font-bold">{generatedResult.statsBreakdown.closeDigit} ({generatedResult.statsBreakdown.closeDigitPercentage}%)</span>
                    <span className="text-slate-400">کلوز کثافت:</span>
                  </div>
                  <div className="bg-slate-900/90 p-1.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-mono text-emerald-400 font-bold">{generatedResult.statsBreakdown.topAkra}</span>
                    <span className="text-slate-400">ابتدائی اکڑا:</span>
                  </div>
                  <div className="bg-slate-900/90 p-1.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="font-mono text-blue-400 font-bold">{generatedResult.statsBreakdown.oddCount}ط / {generatedResult.statsBreakdown.evenCount}ج</span>
                    <span className="text-slate-400">طاق/جفت:</span>
                  </div>
                </div>

                {/* Dynamic Reason */}
                <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] font-bold text-amber-400 mb-1 flex items-center justify-end gap-1">
                    <span>شماریاتی تجزیاتی خلاصہ (Dynamic Reason):</span>
                    <Info className="w-3 h-3" />
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {generatedResult.reason}
                  </p>
                </div>

                {/* Quick Booking Section */}
                <div className="border-t border-slate-800 pt-3 space-y-2.5">
                  <h4 className="text-xs font-bold text-amber-400">اسی نمبر کی فوری بکنگ / ڈیمانڈ بھیجیں:</h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">فرسٹ رقم (Rs):</label>
                      <input
                        type="number"
                        value={quickFirstAmt}
                        onChange={(e) => setQuickFirstAmt(e.target.value)}
                        className="w-full bg-slate-950 text-white border border-slate-800 rounded-lg p-1.5 text-xs font-mono text-center outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">سیکنڈ رقم (Rs):</label>
                      <input
                        type="number"
                        value={quickSecondAmt}
                        onChange={(e) => setQuickSecondAmt(e.target.value)}
                        className="w-full bg-slate-950 text-white border border-slate-800 rounded-lg p-1.5 text-xs font-mono text-center outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {bookingStatus && (
                    <p className={`text-[11px] p-2 rounded-lg text-right ${bookingStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-red-500/10 text-red-400 border border-red-500/25'}`}>
                      {bookingStatus.message}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleQuickBook(false)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 rounded-xl text-[11px] cursor-pointer border border-slate-700 transition-all"
                    >
                      عام بکنگ کریں
                    </button>
                    <button
                      onClick={() => handleQuickBook(true)}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold py-2 rounded-xl text-[11px] cursor-pointer shadow transition-all"
                    >
                      ڈیمانڈ بھیجیں (500 سے زائد)
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 py-8">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-600">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-xs text-slate-300 font-bold max-w-xs leading-relaxed">
                  حقیقی ہسٹاریکل تجزیاتی نمبر جنریٹر
                </p>
                <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
                  بائیں جانب سے اپنی پسندیدہ کیٹیگری اور فلٹرز منتخب کر کے بٹن دبائیں۔ سسٹم پچھلے تمام تاریخی نتائج کو حقیقی طور پر سکین کر کے اعلیٰ ترین شماریاتی اسکور والا امیدوار نمبر تیار کرے گا۔
                </p>
                <div className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>ڈپلیکیٹ پروٹیکشن فعال ہے (ایک سیشن میں نمبر نہیں دہرایا جائے گا)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explanatory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-800 flex flex-row-reverse gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
            <Calculator className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">ہندساتی کثافت ماڈل (Frequency)</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              منتخب شدہ فلٹرز کے تحت ہر پوزیشن (اوپن، کلوز، سینٹر، فورتھ) پر تاریخی اعتبار سے سب سے زیادہ بار آنے والے ہندسوں کو ترجیح دی جاتی ہے۔
            </p>
          </div>
        </div>

        <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-800 flex flex-row-reverse gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">طاق و جفت تسلسل (Parity Balance)</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              لاٹری نتائج میں طاق اور جفت کا تناسب تاریخی ریکارڈز کے مطابق متوازن رکھا جاتا ہے تاکہ ریاضیاتی توازن برقرار رہے۔
            </p>
          </div>
        </div>

        <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-800 flex flex-row-reverse gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">علم الہندسہ و عددی مفرد (Harmonic)</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              اعداد کے مجموعی مفرد اور تاریخی ہارمونک پیٹرنز کا موازنہ کر کے ایسے کمبینیشن بنائے جاتے ہیں جو تاریخی اعتبار سے خوش قسمت ثابت ہوئے ہیں۔
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
