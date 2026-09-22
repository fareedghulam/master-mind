import React, { useState, useRef, useEffect } from 'react';
import { PakistanBondResult, ThaiLotteryResult, DrawCategory } from '../../types';
import { History, Plus, X, Search, Calendar, Edit3, Check } from 'lucide-react';
import { normalizeDateInput, formatUrduDatePreview } from '../../utils/bondAnalysisUtils';

interface AdminResultsTabProps {
  pakistanBondResults: PakistanBondResult[];
  thaiLotteryResults: ThaiLotteryResult[];
  resultError: string;
  resultSuccess: string;
  resultFormOpen: boolean;
  setResultFormOpen: (open: boolean) => void;
  resultFormMode: 'add' | 'edit';
  setResultFormMode: (mode: 'add' | 'edit') => void;
  resCategory: DrawCategory;
  setResCategory: (cat: DrawCategory) => void;
  resDate: string;
  setResDate: (date: string) => void;
  resCity: string;
  setResCity: (city: string) => void;
  resBondValue: string;
  setResBondValue: (val: string) => void;
  resDrawNoOnly: string;
  setResDrawNoOnly: (val: string) => void;
  resDrawNo: string;
  setResDrawNo: (val: string) => void;
  resFirstPrize: string;
  setResFirstPrize: (val: string) => void;
  resLast2Digits: string;
  setResLast2Digits: (val: string) => void;
  resFront3Digits: string;
  setResFront3Digits: (val: string) => void;
  resBack3Digits: string;
  setResBack3Digits: (val: string) => void;
  resSecondPrizesStr: string;
  setResSecondPrizesStr: (val: string) => void;
  resetResultForm: () => void;
  handleSaveResult: (e: React.FormEvent) => void;
  resultSearchQuery: string;
  setResultSearchQuery: (val: string) => void;
  resultViewCategory: DrawCategory;
  setResultViewCategory: (cat: DrawCategory) => void;
  handleEditClick: (draw: PakistanBondResult | ThaiLotteryResult) => void;
  handleDeleteClick: (id: string, category: DrawCategory) => void;
}

export const AdminResultsTab: React.FC<AdminResultsTabProps> = ({
  pakistanBondResults,
  thaiLotteryResults,
  resultError,
  resultSuccess,
  resultFormOpen,
  setResultFormOpen,
  resultFormMode,
  setResultFormMode,
  resCategory,
  setResCategory,
  resDate,
  setResDate,
  resCity,
  setResCity,
  resBondValue,
  setResBondValue,
  resDrawNoOnly,
  setResDrawNoOnly,
  resDrawNo,
  setResDrawNo,
  resFirstPrize,
  setResFirstPrize,
  resLast2Digits,
  setResLast2Digits,
  resFront3Digits,
  setResFront3Digits,
  resBack3Digits,
  setResBack3Digits,
  resSecondPrizesStr,
  setResSecondPrizesStr,
  resetResultForm,
  handleSaveResult,
  resultSearchQuery,
  setResultSearchQuery,
  resultViewCategory,
  setResultViewCategory,
  handleEditClick,
  handleDeleteClick
}) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [scrollTrigger, setScrollTrigger] = useState(0);
  const [isManualDate, setIsManualDate] = useState(true);
  const urduDatePreview = formatUrduDatePreview(resDate);

  // Auto-scroll smoothly to Edit Result form when Edit is clicked
  useEffect(() => {
    if (scrollTrigger > 0 && resultFormOpen) {
      const timer = setTimeout(() => {
        const target = formRef.current || document.getElementById('admin-result-form');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 70);
      return () => clearTimeout(timer);
    }
  }, [scrollTrigger, resultFormOpen]);

  const handleEditWithScroll = (draw: PakistanBondResult | ThaiLotteryResult) => {
    handleEditClick(draw);
    setScrollTrigger((prev) => prev + 1);
  };

  return (
    <div id="module-result-management" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6 text-right">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-slate-100">
        {!resultFormOpen ? (
          <button
            type="button"
            onClick={() => {
              setResultFormMode('add');
              resetResultForm();
              setResultFormOpen(true);
            }}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-amber-500/10 transition-all text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>نیا نتیجہ شامل کریں (Add New Result)</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setResultFormOpen(false)}
            className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all text-xs"
          >
            <X className="w-4 h-4" />
            <span>فارم بند کریں (Close Form)</span>
          </button>
        )}

        <div className="text-right">
          <h4 className="text-base font-bold text-slate-800 flex items-center justify-end gap-2">
            <span>قرعہ اندازی کے نتائج کا انتظام (Result Management)</span>
            <History className="w-5 h-5 text-amber-500" />
          </h4>
          <p className="text-xs text-slate-400 mt-1">پاکستان پرائز بانڈ اور تھائی لینڈ لاٹری کے نتائج شامل کریں، تبدیل کریں یا حذف کریں</p>
        </div>
      </div>

      {resultError && (
        <div id="admin-result-error" className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right font-sans">
          ⚠️ {resultError}
        </div>
      )}
      {resultSuccess && (
        <div id="admin-result-success" className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right font-sans">
          ✓ {resultSuccess}
        </div>
      )}

      {/* Form Modal / Collapsible Section */}
      {resultFormOpen && (
        <div id="admin-result-form" ref={formRef} className="bg-slate-50 p-5 sm:p-6 rounded-3xl border border-slate-150 space-y-4 text-right scroll-mt-24 sm:scroll-mt-28">
          <h5 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2">
            {resultFormMode === 'add' ? 'نیا نتیجہ شامل کریں (Add New Result)' : 'نتیجہ ایڈٹ کریں (Edit Result)'}
          </h5>

          <form onSubmit={handleSaveResult} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-sans">
              
              {/* Category Selection */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1 text-right">کیٹیگری (Category) *</label>
                <select
                  id="result-form-category"
                  value={resCategory}
                  onChange={(e) => {
                    const cat = e.target.value as 'pakistan_bond' | 'thailand_lottery';
                    setResCategory(cat);
                    if (cat === 'thailand_lottery') {
                      setResCity('بنکاک');
                    } else {
                      setResCity('');
                    }
                  }}
                  disabled={resultFormMode === 'edit'}
                  className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                >
                  <option value="pakistan_bond">پاکستان پرائز بانڈ</option>
                  <option value="thailand_lottery">تھائی لینڈ لاٹری</option>
                </select>
              </div>

              {/* Date Input - Manual text typing by default to enter old results instantly without calendar popup */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsManualDate(!isManualDate)}
                    className="text-[11px] text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 cursor-pointer transition-colors bg-amber-50 hover:bg-amber-100/80 px-2 py-0.5 rounded-lg border border-amber-200/60"
                  >
                    {isManualDate ? (
                      <>
                        <Calendar className="w-3.5 h-3.5" />
                        <span>کلینڈر کھولیں</span>
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>مینول لکھیں (Manual)</span>
                      </>
                    )}
                  </button>
                  <label className="block text-slate-600 font-semibold text-right">
                    ڈرا کی تاریخ (Draw Date) *
                  </label>
                </div>

                {isManualDate ? (
                  <div className="space-y-1.5">
                    <input
                      id="result-form-date"
                      type="text"
                      dir="ltr"
                      placeholder="YYYY-MM-DD (مثلاً: 2015-05-15 یا 15-05-2015)"
                      value={resDate}
                      onChange={(e) => setResDate(e.target.value)}
                      onBlur={() => {
                        const normalized = normalizeDateInput(resDate);
                        if (normalized && normalized !== resDate) {
                          setResDate(normalized);
                        }
                      }}
                      required
                      className="w-full text-center font-mono font-bold tracking-wider bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-800 shadow-inner"
                    />

                    {/* Urdu confirmation badge */}
                    {urduDatePreview && (
                      <div className="flex items-center justify-between text-[11px] px-2.5 py-1 bg-emerald-50 border border-emerald-150 rounded-lg text-emerald-800">
                        <span className="font-mono font-bold text-emerald-700" dir="ltr">
                          {normalizeDateInput(resDate)}
                        </span>
                        <span className="font-medium flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>تاریخ: <strong>{urduDatePreview}</strong></span>
                        </span>
                      </div>
                    )}

                    {/* Quick helper shortcuts */}
                    <div className="flex items-center justify-between gap-1 pt-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          const today = new Date().toISOString().split('T')[0];
                          setResDate(today);
                        }}
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium cursor-pointer transition-colors border border-slate-200"
                      >
                        آج کی تاریخ (Today)
                      </button>
                      <span className="text-[10px] text-slate-400">
                        براہ راست کی بورڈ سے لکھیں (کلینڈر نہیں کھلے گا)
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <input
                      id="result-form-date-picker"
                      type="date"
                      value={resDate}
                      onChange={(e) => setResDate(e.target.value)}
                      required
                      className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans text-sm"
                    />
                    <p className="text-[10px] text-slate-400 text-right">
                      کلینڈر سے تاریخ کا انتخاب کریں
                    </p>
                  </div>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1 text-right">شہر (City) *</label>
                <input
                  id="result-form-city"
                  type="text"
                  list="pk-results-cities-datalist"
                  placeholder={resCategory === 'pakistan_bond' ? "مثلاً ملتان، کراچی، گوجرانوالہ" : "مثلاً بنکاک"}
                  value={resCity}
                  onChange={(e) => setResCity(e.target.value)}
                  required
                  className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                />
                <datalist id="pk-results-cities-datalist">
                  <option value="کراچی" />
                  <option value="لاہور" />
                  <option value="فیصل آباد" />
                  <option value="ملتان" />
                  <option value="راولپنڈی" />
                  <option value="پشاور" />
                  <option value="کوئٹہ" />
                  <option value="حیدرآباد" />
                  <option value="سیالکوٹ" />
                  <option value="مظفرآباد" />
                  <option value="گوجرانوالہ" />
                  <option value="اسلام آباد" />
                  <option value="سکھر" />
                  <option value="بہاولپور" />
                  <option value="بنکاک" />
                </datalist>
              </div>

              {/* Conditional: Pakistan Bond Fields */}
              {resCategory === 'pakistan_bond' && (
                <>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1 text-right">بانڈ کی مالیت (Bond Value) *</label>
                    <select
                      id="result-form-bond-value"
                      value={resBondValue}
                      onChange={(e) => setResBondValue(e.target.value)}
                      className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                    >
                      <option value="Rs. 100">Rs. 100</option>
                      <option value="Rs. 200">Rs. 200</option>
                      <option value="Rs. 750">Rs. 750</option>
                      <option value="Rs. 1,500">Rs. 1,500</option>
                      <option value="Rs. 7,500">Rs. 7,500</option>
                      <option value="Rs. 15,000">Rs. 15,000</option>
                      <option value="Rs. 25,000 Premium">Rs. 25,000 Premium</option>
                      <option value="Rs. 40,000">Rs. 40,000 (نارمل / Normal)</option>
                      <option value="Rs. 40,000 Premium">Rs. 40,000 Premium</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1 text-right">ڈرا نمبر (Draw Number Only) *</label>
                    <input
                      id="result-form-draw-no-only"
                      type="text"
                      placeholder="مثلاً 106"
                      value={resDrawNoOnly}
                      onChange={(e) => setResDrawNoOnly(e.target.value)}
                      required
                      className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                    />
                  </div>
                </>
              )}

              {/* Conditional: Thai Lottery Fields */}
              {resCategory === 'thailand_lottery' && (
                <div>
                  <label className="block text-slate-600 font-semibold mb-1 text-right">ڈرا نمبر اور نام (Draw Title) *</label>
                  <input
                    id="result-form-draw-no-thai"
                    type="text"
                    placeholder="مثلاً Thai Draw #384"
                    value={resDrawNo}
                    onChange={(e) => setResDrawNo(e.target.value)}
                    required
                    className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                  />
                </div>
              )}

              {/* First Prize */}
              <div>
                <label className="block text-slate-600 font-semibold mb-1 text-right">فرسٹ پرائز نمبر (First Prize Number) *</label>
                <input
                  id="result-form-first-prize"
                  type="text"
                  maxLength={6}
                  placeholder="6 ہندسوں کا لکی نمبر"
                  value={resFirstPrize}
                  onChange={(e) => setResFirstPrize(e.target.value.replace(/\D/g, ''))}
                  required
                  className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                />
              </div>

              {/* Conditional: Thai Lottery Digits */}
              {resCategory === 'thailand_lottery' && (
                <>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1 text-right">آخری 2 ہندسے (Last 2 Digits)</label>
                    <input
                      id="result-form-last2"
                      type="text"
                      maxLength={2}
                      value={resLast2Digits}
                      onChange={(e) => setResLast2Digits(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1 text-right">فرنٹ 3 ہندسے (Front 3 Digits)</label>
                    <input
                      id="result-form-front3"
                      type="text"
                      maxLength={3}
                      value={resFront3Digits}
                      onChange={(e) => setResFront3Digits(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1 text-right">بیک 3 ہندسے (Back 3 Digits)</label>
                    <input
                      id="result-form-back3"
                      type="text"
                      maxLength={3}
                      value={resBack3Digits}
                      onChange={(e) => setResBack3Digits(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Second Prizes textarea */}
            <div>
              <label className="block text-xs text-slate-600 font-semibold mb-1 text-right">سیکنڈ پرائز نمبرز - کوما سے الگ کریں (Second Prize Numbers - Comma separated)</label>
              <textarea
                id="result-form-seconds"
                rows={2}
                placeholder="مثال کے طور پر: 070148, 194865, 222052"
                value={resSecondPrizesStr}
                onChange={(e) => setResSecondPrizesStr(e.target.value)}
                className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono text-xs"
              />
            </div>

            {/* Display constructed Pakistan Draw Name preview */}
            {resCategory === 'pakistan_bond' && resDrawNoOnly && (
              <div className="bg-amber-50 border border-amber-200/50 p-2.5 rounded-xl text-xs text-amber-800 font-semibold text-right">
                <span>ڈرا کا پورا نام (Full Draw Name Preview): </span>
                <span className="font-mono">{resDrawNo}</span>
              </div>
            )}

            {/* Form Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                id="result-form-submit"
                type="submit"
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition-all shadow-md cursor-pointer text-center"
              >
                <span>نتیجہ محفوظ کریں (Save Result)</span>
              </button>
              <button
                id="result-form-cancel"
                type="button"
                onClick={() => {
                  setResultFormOpen(false);
                  resetResultForm();
                }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-6 rounded-2xl text-xs sm:text-sm transition-all cursor-pointer text-center"
              >
                <span>منسوخ کریں (Cancel)</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Results List View & Filtering */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs font-sans">
          
          {/* Search Result Bar */}
          <div className="relative w-full md:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </span>
            <input
              id="result-search-bar"
              type="text"
              placeholder="سرچ کریں (نمبر، شہر، ڈرا)..."
              value={resultSearchQuery}
              onChange={(e) => setResultSearchQuery(e.target.value)}
              className="w-full bg-white text-right text-xs text-slate-800 pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
            />
          </div>

          {/* View Category Toggles */}
          <div className="flex gap-2 w-full md:w-auto">
            <button
              id="btn-filter-pakbond"
              type="button"
              onClick={() => {
                setResultViewCategory('pakistan_bond');
                if (!resultFormOpen) setResCategory('pakistan_bond');
              }}
              className={`flex-1 md:flex-initial py-1.5 px-3 rounded-lg border font-semibold cursor-pointer text-center transition-all ${resultViewCategory === 'pakistan_bond' ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              پاکستان بانڈز (Pakistan Bonds)
            </button>
            <button
              id="btn-filter-thai"
              type="button"
              onClick={() => {
                setResultViewCategory('thailand_lottery');
                if (!resultFormOpen) setResCategory('thailand_lottery');
              }}
              className={`flex-1 md:flex-initial py-1.5 px-3 rounded-lg border font-semibold cursor-pointer text-center transition-all ${resultViewCategory === 'thailand_lottery' ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              تھائی لاٹری (Thai Lottery)
            </button>
          </div>
        </div>

        {/* Rendered List */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm max-h-[380px] overflow-y-auto">
          <table className="w-full text-right border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-100 sticky top-0 z-10">
                <th className="py-2.5 px-3 text-left">اقدام (Actions)</th>
                <th className="py-2.5 px-3">تاریخ (Date)</th>
                <th className="py-2.5 px-3">شہر / ملک</th>
                <th className="py-2.5 px-3">سیکنڈ پرائزز</th>
                <th className="py-2.5 px-3">فرسٹ پرائز</th>
                <th className="py-2.5 px-3">ڈرا نمبر / تفصیل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {(() => {
                const activeResults = resultViewCategory === 'pakistan_bond' ? pakistanBondResults : thaiLotteryResults;
                const queryClean = resultSearchQuery.trim().toLowerCase();
                const filtered = activeResults.filter(r => {
                  if (!queryClean) return true;
                  const matchesDrawNo = r.drawNo && r.drawNo.toLowerCase().includes(queryClean);
                  const matchesCity = r.city && r.city.toLowerCase().includes(queryClean);
                  const matchesFirst = r.firstPrize && r.firstPrize.includes(queryClean);
                  const matchesDate = r.date && r.date.includes(queryClean);
                  const matchesSeconds = r.secondPrizes && r.secondPrizes.some(s => s.includes(queryClean));
                  const matchesBondVal = r.category === 'pakistan_bond' && (r as PakistanBondResult).bondValue && (r as PakistanBondResult).bondValue.toLowerCase().includes(queryClean);
                  return matchesDrawNo || matchesCity || matchesFirst || matchesDate || matchesSeconds || matchesBondVal;
                });

                if (filtered.length === 0) {
                  return (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">کوئی نتیجہ نہیں ملا۔</td>
                    </tr>
                  );
                }

                return filtered.map((draw) => (
                  <tr key={draw.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-3 text-left flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleEditWithScroll(draw)}
                        className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all"
                      >
                        ایڈٹ (Edit)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(draw.id, draw.category)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all"
                      >
                        حذف (Delete)
                      </button>
                    </td>
                    
                    <td className="py-3 px-3 font-mono text-slate-500 text-xs">{draw.date}</td>
                    <td className="py-3 px-3 text-slate-700 font-semibold">{draw.city}</td>
                    <td className="py-3 px-3 text-slate-500 font-mono text-xs max-w-[150px] truncate" title={draw.secondPrizes.join(', ')}>
                      {draw.secondPrizes.join(', ')}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-amber-600">{draw.firstPrize}</td>
                    
                    <td className="py-3 px-3 font-bold text-slate-800">
                      <div>{draw.drawNo}</div>
                      {draw.category === 'pakistan_bond' && (
                        <span className="text-[10px] text-slate-400">پاکستان بانڈ - {(draw as PakistanBondResult).bondValue}</span>
                      )}
                      {draw.category === 'thailand_lottery' && (
                        <div className="text-[9px] text-slate-400 font-mono flex gap-1 justify-end mt-0.5">
                          <span>L2: {(draw as ThaiLotteryResult).last2Digits}</span> |
                          <span>F3: {(draw as ThaiLotteryResult).front3Digits}</span> |
                          <span>B3: {(draw as ThaiLotteryResult).back3Digits}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
