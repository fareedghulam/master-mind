import React, { useState } from 'react';
import { NumberLimit, DrawDeadline, DrawCategory, HardFavoriteNumber } from '../../types';
import { Plus, Trash, Clock, X, ShieldAlert, Ban, Search, CheckCircle2, AlertCircle, Edit2 } from 'lucide-react';

interface AdminLimitsDeadlinesTabProps {
  limits: NumberLimit[];
  deadlines: DrawDeadline[];
  hardFavoriteNumbers?: HardFavoriteNumber[];
  onAddHardFavorite?: (category: DrawCategory | 'all', number: string, note?: string) => Promise<{ success: boolean; error?: string }>;
  onRemoveHardFavorite?: (id: string) => Promise<{ success: boolean; error?: string }>;
  limitError: string;
  limitSuccess: string;
  limitCategory: DrawCategory;
  setLimitCategory: (cat: DrawCategory) => void;
  limitNumber: string;
  setLimitNumber: (num: string) => void;
  limitAmount?: string;
  setLimitAmount?: (amt: string) => void;
  firstPrizeLimit?: string;
  setFirstPrizeLimit?: (amt: string) => void;
  secondPrizeLimit?: string;
  setSecondPrizeLimit?: (amt: string) => void;
  handleLimitSubmit: (e: React.FormEvent) => void;
  onDeleteLimit: (id: string) => Promise<any>;
  deadlineError: string;
  deadlineSuccess: string;
  editingDrawId: string;
  resetDeadlineForm: () => void;
  deadlineCategory: DrawCategory;
  setDeadlineCategory: (cat: DrawCategory) => void;
  deadlineTitle: string;
  setDeadlineTitle: (title: string) => void;
  deadlineDateTime: string;
  setDeadlineDateTime: (dt: string) => void;
  deadlineStatus: 'open' | 'closed' | 'result_announced';
  setDeadlineStatus: (st: 'open' | 'closed' | 'result_announced') => void;
  nextPrizeBondValue: string;
  setNextPrizeBondValue: (val: string) => void;
  nextDrawCity: string;
  setNextDrawCity: (val: string) => void;
  nextDrawNumber: string;
  setNextDrawNumber: (val: string) => void;
  nextDrawDate: string;
  setNextDrawDate: (val: string) => void;
  handleDeadlineSubmit: (e: React.FormEvent) => void;
  onSetDeadline: (
    category: DrawCategory,
    deadlineIso: string,
    titleUrdu: string,
    status: 'open' | 'closed' | 'result_announced',
    nextPrizeBondValue?: string,
    nextDrawCity?: string,
    nextDrawNumber?: string,
    nextDrawDate?: string,
    drawId?: string
  ) => void;
  onDeleteDeadline?: (id: string) => Promise<any>;
  setEditingDrawId: (id: string) => void;
  safeGetTime: (val: any) => number;
  safeFormatDate: (val: any, locale?: string, options?: Intl.DateTimeFormatOptions) => string;
}

export const AdminLimitsDeadlinesTab: React.FC<AdminLimitsDeadlinesTabProps> = ({
  limits,
  deadlines,
  hardFavoriteNumbers = [],
  onAddHardFavorite,
  onRemoveHardFavorite,
  limitError,
  limitSuccess,
  limitCategory,
  setLimitCategory,
  limitNumber,
  setLimitNumber,
  limitAmount = '',
  setLimitAmount,
  firstPrizeLimit = '',
  setFirstPrizeLimit,
  secondPrizeLimit = '',
  setSecondPrizeLimit,
  handleLimitSubmit,
  onDeleteLimit,
  deadlineError,
  deadlineSuccess,
  editingDrawId,
  resetDeadlineForm,
  deadlineCategory,
  setDeadlineCategory,
  deadlineTitle,
  setDeadlineTitle,
  deadlineDateTime,
  setDeadlineDateTime,
  deadlineStatus,
  setDeadlineStatus,
  nextPrizeBondValue,
  setNextPrizeBondValue,
  nextDrawCity,
  setNextDrawCity,
  nextDrawNumber,
  setNextDrawNumber,
  nextDrawDate,
  setNextDrawDate,
  handleDeadlineSubmit,
  onSetDeadline,
  onDeleteDeadline,
  setEditingDrawId,
  safeGetTime,
  safeFormatDate
}) => {
  // Hard Favorite state
  const [hfCategory, setHfCategory] = useState<DrawCategory | 'all'>('all');
  const [hfNumber, setHfNumber] = useState('');
  const [hfNote, setHfNote] = useState('');
  const [hfSearch, setHfSearch] = useState('');
  const [hfError, setHfError] = useState('');
  const [hfSuccess, setHfSuccess] = useState('');
  const [hfSubmitting, setHfSubmitting] = useState(false);

  // Number Limit Search state
  const [limitSearchQuery, setLimitSearchQuery] = useState('');

  const handleHfSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHfError('');
    setHfSuccess('');

    const raw = hfNumber.trim();
    if (!raw) {
      setHfError('براہ کرم کوئی نمبر درج کریں۔');
      return;
    }

    if (!onAddHardFavorite) {
      setHfError('ہارڈ فیورٹ سروس دستیاب نہیں ہے۔');
      return;
    }

    setHfSubmitting(true);
    try {
      const res = await onAddHardFavorite(hfCategory, raw, hfNote);
      if (res && res.success) {
        setHfSuccess(`نمبر ${raw} کامیابی سے ہارڈ فیورٹ / بلاک لسٹ میں شامل کر دیا گیا۔`);
        setHfNumber('');
        setHfNote('');
      } else {
        setHfError(res?.error || 'ہارڈ فیورٹ نمبر شامل کرنے میں خرابی پیش آئی۔');
      }
    } catch (err: any) {
      setHfError(err.message || 'غیر متوقع خرابی پیش آئی۔');
    } finally {
      setHfSubmitting(false);
    }
  };

  const handleHfRemove = async (id: string, num: string) => {
    if (!window.confirm(`کیا آپ واقعی نمبر #${num} کو ہارڈ فیورٹ / بلاک لسٹ سے ہٹانا چاہتے ہیں؟ اس کے بعد یہ نمبر دوبارہ بکنگ کے لیے دستیاب ہو جائے گا۔`)) {
      return;
    }
    setHfError('');
    setHfSuccess('');
    if (!onRemoveHardFavorite) return;
    try {
      const res = await onRemoveHardFavorite(id);
      if (res && res.success) {
        setHfSuccess(`نمبر #${num} کامیابی سے ان بلاک کر دیا گیا ہے۔`);
      } else {
        setHfError(res?.error || 'نمبر ہٹانے میں خرابی پیش آئی۔');
      }
    } catch (err: any) {
      setHfError(err.message || 'غیر متوقع خرابی پیش آئی۔');
    }
  };

  const filteredHardFavorites = hardFavoriteNumbers.filter(hf => {
    if (!hfSearch.trim()) return true;
    const q = hfSearch.trim().toLowerCase();
    return (
      hf.number.toLowerCase().includes(q) ||
      (hf.note && hf.note.toLowerCase().includes(q)) ||
      (hf.createdBy && hf.createdBy.toLowerCase().includes(q)) ||
      hf.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Module 2: Number Booking Limit Configuration */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-100 mb-5 gap-2">
            <span className="text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-full">
              کل لمٹس: {limits.length}
            </span>
            <h4 className="text-base font-bold text-slate-800 flex items-center justify-end gap-2">
              <span>بکنگ نمبر لمٹ سسٹم (Prize Amount Limits)</span>
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
            </h4>
          </div>

          <div className="mb-4 bg-amber-50/60 border border-amber-200/60 rounded-2xl p-3 text-xs text-amber-950 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">فرسٹ اور سیکنڈ پرائز کی لمٹ الگ الگ مقرر کریں</p>
              <p className="text-[11px] text-amber-800">
                دونوں رقمیں مکمل طور پر ایک دوسرے سے الگ ہیں۔ رقم کی فیلڈ میں <strong>0</strong> لکھنے کا مطلب لامحدود (Unlimited / Open) ہے۔ ایڈمن جب چاہے دونوں رقمیں تبدیل کر سکتا ہے۔
              </p>
            </div>
          </div>

          {limitError && (
            <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs leading-relaxed flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{limitError}</span>
            </div>
          )}
          {limitSuccess && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs leading-relaxed flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{limitSuccess}</span>
            </div>
          )}

          <form onSubmit={handleLimitSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                کیٹیگری منتخب کریں (Choose Draw Type) *
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setLimitCategory('pakistan_bond')}
                  className={`py-2 px-3 rounded-xl border text-center transition-all ${
                    limitCategory === 'pakistan_bond'
                      ? 'bg-slate-900 text-amber-400 border-slate-900 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  پاکستان بانڈ
                </button>
                <button
                  type="button"
                  onClick={() => setLimitCategory('thailand_lottery')}
                  className={`py-2 px-3 rounded-xl border text-center transition-all ${
                    limitCategory === 'thailand_lottery'
                      ? 'bg-slate-900 text-amber-400 border-slate-900 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  تھائی لینڈ لاٹری
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                مخصوص نمبر لکھیں (Target Number) *
              </label>
              <input
                type="text"
                placeholder="مثال: 123456 یا 45"
                value={limitNumber}
                onChange={(e) => setLimitNumber(e.target.value)}
                className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>

            {/* Separate Amount Limits for First and Second Prize */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-amber-50/40 p-3.5 rounded-2xl border border-amber-100/80">
                <label className="block text-amber-950 text-xs font-bold mb-1 text-right flex items-center justify-end gap-1.5">
                  <span>First Prize Amount Limit *</span>
                  <span className="bg-amber-200/80 text-amber-900 px-1.5 py-0.2 rounded text-[10px]">1st</span>
                </label>
                <p className="text-[10px] text-slate-500 text-right mb-1.5">فرسٹ پرائز رقم کی زیادہ سے زیادہ حد (0 = لامحدود)</p>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-xs font-mono text-slate-400">Rs.</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="مثلاً: 100000"
                    value={firstPrizeLimit}
                    onChange={(e) => setFirstPrizeLimit?.(e.target.value)}
                    className="w-full text-left pl-10 bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="bg-indigo-50/40 p-3.5 rounded-2xl border border-indigo-100/80">
                <label className="block text-indigo-950 text-xs font-bold mb-1 text-right flex items-center justify-end gap-1.5">
                  <span>Second Prize Amount Limit *</span>
                  <span className="bg-indigo-200/80 text-indigo-900 px-1.5 py-0.2 rounded text-[10px]">2nd</span>
                </label>
                <p className="text-[10px] text-slate-500 text-right mb-1.5">سیکنڈ پرائز رقم کی زیادہ سے زیادہ حد (0 = لامحدود)</p>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-xs font-mono text-slate-400">Rs.</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="مثلاً: 50000"
                    value={secondPrizeLimit}
                    onChange={(e) => setSecondPrizeLimit?.(e.target.value)}
                    className="w-full text-left pl-10 bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold text-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>لمٹ محفوظ کریں (Save Prize Limits)</span>
              </button>
              {(limitNumber || firstPrizeLimit || secondPrizeLimit) && (
                <button
                  type="button"
                  onClick={() => {
                    setLimitNumber('');
                    setFirstPrizeLimit?.('');
                    setSecondPrizeLimit?.('');
                    setLimitAmount?.('');
                  }}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl text-xs font-medium transition-all"
                  title="فارم صاف کریں"
                >
                  ری سیٹ
                </button>
              )}
            </div>
          </form>

          {/* List of active set limits */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
              <div className="relative w-full sm:w-48">
                <Search className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="نمبر تلاش کریں..."
                  value={limitSearchQuery}
                  onChange={(e) => setLimitSearchQuery(e.target.value)}
                  className="w-full text-right bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-3 pr-8 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>
              <h5 className="text-xs font-bold text-slate-700 text-right">
                موجودہ سیٹ شدہ نمبر لمٹس کی لسٹ ({limits.length})
              </h5>
            </div>

            {limits.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-3 bg-slate-50 rounded-2xl">کوئی فعال نمبر لمٹ نہیں ہے۔</p>
            ) : (
              <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                {limits
                  .filter(limit => {
                    if (!limitSearchQuery.trim()) return true;
                    const q = limitSearchQuery.trim().toLowerCase();
                    return limit.number.includes(q) || limit.category.toLowerCase().includes(q);
                  })
                  .map((limit) => {
                    const categoryMap: Record<DrawCategory, string> = {
                      pakistan_bond: 'پاکستان پرائز بانڈ',
                      thailand_lottery: 'تھائی لینڈ لاٹری'
                    };
                    const firstLimit = typeof limit.firstPrizeAmountLimit === 'number' ? limit.firstPrizeAmountLimit : limit.maxAmount;
                    const secondLimit = typeof limit.secondPrizeAmountLimit === 'number' ? limit.secondPrizeAmountLimit : limit.maxAmount;

                    return (
                      <div key={limit.id} className="flex justify-between items-center bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl text-xs transition-all border border-slate-200/80 shadow-xs">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setLimitCategory(limit.category);
                              setLimitNumber(limit.number);
                              setFirstPrizeLimit?.(String(firstLimit));
                              setSecondPrizeLimit?.(String(secondLimit));
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-100/60 rounded-xl transition-all cursor-pointer"
                            title="ترمیم کریں (Edit)"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              if (window.confirm(`کیا آپ واقعی نمبر #${limit.number} کی لمٹ ختم کرنا چاہتے ہیں؟`)) {
                                await onDeleteLimit(limit.id);
                              }
                            }}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                            title="حذف کریں (Delete)"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right space-y-1">
                          <div className="font-bold text-slate-800 flex items-center justify-end gap-2">
                            <span className="text-[11px] text-slate-500 font-normal">
                              {categoryMap[limit.category] || limit.category}
                            </span>
                            <span className="bg-amber-100 text-amber-900 border border-amber-200/60 px-2.5 py-0.5 rounded-lg font-mono font-bold text-xs">
                              #{limit.number}
                            </span>
                          </div>
                          <div className="flex items-center justify-end gap-2 text-[11px] font-mono">
                            <span className="bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-md">
                              1st Prize: {firstLimit > 0 ? `Rs. ${firstLimit.toLocaleString()}` : 'لامحدود (Open)'}
                            </span>
                            <span className="bg-indigo-50 text-indigo-900 border border-indigo-200/60 px-2 py-0.5 rounded-md">
                              2nd Prize: {secondLimit > 0 ? `Rs. ${secondLimit.toLocaleString()}` : 'لامحدود (Open)'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Module 2.5: Hard Favorite Numbers (Fully Blocked from Booking) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-md flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-rose-100 mb-4 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                <span>مستقل ممنوعہ / بلاکڈ نمبرز</span>
              </span>
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                کل تعداد: {hardFavoriteNumbers.length}
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-800 flex items-center justify-end gap-2">
              <span>ہارڈ فیورٹ نمبرز (Hard Favorite Numbers)</span>
              <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></span>
            </h4>
          </div>

          <div className="text-xs text-slate-600 text-right mb-5 leading-relaxed bg-rose-50/40 p-4 rounded-2xl border border-rose-100 flex flex-col gap-1">
            <div className="font-bold text-rose-800 flex items-center justify-end gap-1.5">
              <span>ایڈمن کے لیے اہم نوٹ:</span>
              <Ban className="w-4 h-4 text-rose-600" />
            </div>
            <p>
              جس نمبر کو آپ یہاں <strong>ہارڈ فیورٹ</strong> کے طور پر شامل کریں گے، اس پر کوئی بھی کسٹمر یا ڈیلر نئی بکنگ نہیں کرا سکے گا اور بکنگ فوراً مسترد ہو جائے گی۔
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              🔒 <strong>مکمل پرائیویسی:</strong> یہ لسٹ صرف ایڈمن پینل میں نظر آتی ہے۔ عام صارفین اور ڈیلرز کو نہ تو یہ لسٹ نظر آتی ہے اور نہ ہی انہیں یہ بتایا جاتا ہے کہ یہ نمبر ایڈمن نے بلاک کیا ہے۔
            </p>
          </div>

          {hfError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-2xl text-xs text-right font-medium mb-4 flex items-center justify-end gap-2">
              <span>{hfError}</span>
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            </div>
          )}
          {hfSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-2xl text-xs text-right font-medium mb-4 flex items-center justify-end gap-2">
              <span>{hfSuccess}</span>
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            </div>
          )}

          {/* Form to Add Hard Favorite Number */}
          <form onSubmit={handleHfSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 text-right">کیٹیگری منتخب کریں</label>
                <select
                  value={hfCategory}
                  onChange={(e) => setHfCategory(e.target.value as DrawCategory | 'all')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-xs text-right font-medium focus:ring-2 focus:ring-rose-400 focus:outline-none"
                >
                  <option value="all">تمام کیٹیگریز (پاکستان بانڈ اور تھائی دونوں)</option>
                  <option value="pakistan_bond">صرف پاکستان پرائز بانڈ</option>
                  <option value="thailand_lottery">صرف تھائی لینڈ لاٹری</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 text-right">
                  نمبر درج کریں <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={hfNumber}
                  onChange={(e) => setHfNumber(e.target.value)}
                  placeholder="مثلاً: 05 یا 786 یا 1234"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-xs text-right font-mono font-bold tracking-wider focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  required
                />
                <span className="text-[10px] text-slate-400 block text-right mt-1">
                  نوٹ: زیرو محفوظ رہے گا (مثلاً 05 اور 5 الگ ہوں گے)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 text-right">
                  ریمارکس / وجہ (اختیاری)
                </label>
                <input
                  type="text"
                  value={hfNote}
                  onChange={(e) => setHfNote(e.target.value)}
                  placeholder="مثلاً: خصوصی ہارڈ کوٹہ بلاک"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-xs text-right focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={hfSubmitting}
              className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
            >
              <Ban className="w-4 h-4" />
              <span>{hfSubmitting ? 'شامل کیا جا رہا ہے...' : 'ہارڈ فیورٹ میں شامل کریں (مکمل بلاک کریں)'}</span>
            </button>
          </form>

          {/* List of Active Hard Favorite Numbers */}
          <div className="mt-6 pt-5 border-t border-rose-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
              {hardFavoriteNumbers.length > 3 && (
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={hfSearch}
                    onChange={(e) => setHfSearch(e.target.value)}
                    placeholder="نمبر یا نوٹ تلاش کریں..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-8 pl-3 py-1.5 text-xs text-right focus:outline-none focus:ring-1 focus:ring-rose-400 font-sans"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              )}
              <h5 className="text-xs font-bold text-slate-700 text-right w-full sm:w-auto">
                موجودہ ہارڈ فیورٹ / بلاکڈ نمبرز کی لسٹ ({hardFavoriteNumbers.length})
              </h5>
            </div>

            {hardFavoriteNumbers.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
                کوئی ہارڈ فیورٹ / بلاکڈ نمبر موجود نہیں ہے۔ تمام نمبرز معمول کے مطابق کھلے ہیں۔
              </p>
            ) : filteredHardFavorites.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
                تلاش کے مطابق کوئی نمبر نہیں ملا۔
              </p>
            ) : (
              <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                {filteredHardFavorites.map((hf) => {
                  const catLabel = hf.category === 'all'
                    ? 'تمام کیٹیگریز'
                    : hf.category === 'pakistan_bond'
                    ? 'پاکستان پرائز بانڈ'
                    : 'تھائی لینڈ لاٹری';

                  return (
                    <div
                      key={hf.id}
                      className="flex justify-between items-center bg-rose-50/30 hover:bg-rose-50/70 p-3 rounded-2xl text-xs transition-all border border-rose-100"
                    >
                      <button
                        onClick={() => handleHfRemove(hf.id, hf.number)}
                        className="px-3 py-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-100 rounded-xl transition-all cursor-pointer flex items-center gap-1 font-bold text-[11px] border border-rose-200"
                        title="ان بلاک کریں / لسٹ سے ہٹائیں"
                      >
                        <Trash className="w-3.5 h-3.5" />
                        <span>ان بلاک کریں</span>
                      </button>

                      <div className="text-right">
                        <div className="font-bold text-slate-800 flex items-center justify-end gap-2">
                          <span className="bg-rose-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold text-sm tracking-widest shadow-xs">
                            #{hf.number}
                          </span>
                          <span className="text-xs text-slate-700 font-semibold">{catLabel}</span>
                        </div>
                        <div className="flex items-center justify-end gap-2 mt-1 text-[11px] text-slate-500">
                          {hf.note && (
                            <span className="text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                              {hf.note}
                            </span>
                          )}
                          <span className="font-mono text-[10px] text-slate-400">
                            {safeFormatDate(hf.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Module 3: Booking Deadline Settings */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-slate-100">
          {editingDrawId ? (
            <button
              type="button"
              onClick={resetDeadlineForm}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-2 rounded-2xl text-xs flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <X className="w-4 h-4" />
              <span>فارم ریسیٹ کریں / نیا ڈرا بنائیں (Reset Form / Create New Draw)</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={resetDeadlineForm}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-2xl text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>نیا ڈرا شامل کریں (Add New Draw)</span>
            </button>
          )}

          <div className="text-right">
            <h4 className="text-base font-bold text-slate-800 flex items-center justify-end gap-2">
              <span>ڈرا کی بکنگ کا آخری وقت اور تاریخ (Booking Deadlines)</span>
              <Clock className="w-5 h-5 text-red-500" />
            </h4>
            {editingDrawId && (
              <span className="text-xs text-amber-600 font-semibold">ایڈٹ موڈ: ڈرا ID {editingDrawId}</span>
            )}
          </div>
        </div>

        {deadlineError && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs">
            ⚠️ {deadlineError}
          </div>
        )}
        {deadlineSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs">
            ✓ {deadlineSuccess}
          </div>
        )}

        <form onSubmit={handleDeadlineSubmit} className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
            <label className="block text-slate-700 text-xs font-bold text-right">
              بکنگ اسٹیٹس (دستی کنٹرول) *
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setDeadlineStatus('open');
                  setDeadlineTitle('بکنگ فائنل کھل گئی ہے');
                }}
                className={`py-2.5 px-3 rounded-2xl border text-center transition-all text-xs font-bold flex items-center justify-center gap-1.5 ${
                  deadlineStatus === 'open'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/10'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${deadlineStatus === 'open' ? 'bg-white animate-ping' : 'bg-slate-400'}`}></span>
                <span>اوپن (Open)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeadlineStatus('closed');
                  setDeadlineTitle('بکنگ فائنل بند ہے');
                }}
                className={`py-2.5 px-3 rounded-2xl border text-center transition-all text-xs font-bold flex items-center justify-center gap-1.5 ${
                  deadlineStatus === 'closed'
                    ? 'bg-red-600 text-white border-red-600 shadow-sm shadow-red-600/10'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current"></span>
                <span>بند (Closed)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeadlineStatus('result_announced');
                  setDeadlineTitle('قرعہ اندازی کا نتیجہ جاری ہو گیا ہے');
                }}
                className={`py-2.5 px-3 rounded-2xl border text-center transition-all text-xs font-bold flex items-center justify-center gap-1.5 ${
                  deadlineStatus === 'result_announced'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-600/10'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current"></span>
                <span>نتیجہ (Result)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                کیٹیگری منتخب کریں *
              </label>
              <select
                value={deadlineCategory}
                onChange={(e) => {
                  const cat = e.target.value as 'pakistan_bond' | 'thailand_lottery';
                  setDeadlineCategory(cat);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              >
                <option value="pakistan_bond">پاکستان بانڈ</option>
                <option value="thailand_lottery">تھائی لینڈ لاٹری</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                اسٹیٹس پیغام (Urdu Status Message) *
              </label>
              <input
                type="text"
                placeholder="مثال: بکنگ فائنل کھل گئی ہے"
                value={deadlineTitle}
                onChange={(e) => setDeadlineTitle(e.target.value)}
                className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                required
              />
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                آخری تاریخ اور وقت (Deadline Date & Time) *
              </label>
              <input
                type="datetime-local"
                value={deadlineDateTime}
                onChange={(e) => setDeadlineDateTime(e.target.value)}
                className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                required
              />
            </div>

            {deadlineCategory === 'pakistan_bond' && (
              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                  انعامی بانڈ مالیت (Prize Bond Value) *
                </label>
                <input
                  type="text"
                  placeholder="مثال: Rs. 200 یا Rs. 750"
                  value={nextPrizeBondValue}
                  onChange={(e) => setNextPrizeBondValue(e.target.value)}
                  className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                />
              </div>
            )}

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                ڈرا شہر (Draw City)
              </label>
              <input
                type="text"
                placeholder="مثال: لاہور / Bangkok"
                value={nextDrawCity}
                onChange={(e) => setNextDrawCity(e.target.value)}
                className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                ڈرا نمبر (Draw Number)
              </label>
              <input
                type="text"
                placeholder="مثال: 95 / 123"
                value={nextDrawNumber}
                onChange={(e) => setNextDrawNumber(e.target.value)}
                className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                ڈرا تاریخ (Draw Date)
              </label>
              <input
                type="text"
                placeholder="مثال: 15-08-2026"
                value={nextDrawDate}
                onChange={(e) => setNextDrawDate(e.target.value)}
                className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>{editingDrawId ? 'ڈرا سیٹنگز تبدیل کریں (Update Draw Settings)' : 'نیا ڈرا محفوظ کریں (Save New Draw)'}</span>
          </button>
        </form>

        {/* Display active deadlines */}
        {(() => {
          const activeDeadlines = deadlines.filter(
            d => d.status !== 'result_announced' && !d.isArchived
          );
          return (
            <div className="pt-4 border-t border-slate-100">
              <h5 className="text-xs font-bold text-slate-700 mb-3">موجودہ فعال بکنگ ڈیڈلائنز کی حیثیت ({activeDeadlines.length})</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeDeadlines.map((d) => {
              const drawKey = d.id || `${d.category}-${d.nextPrizeBondValue || ''}`;
              return (
                <div key={drawKey} className="p-4 bg-slate-50 rounded-2xl border border-slate-150 space-y-2 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        d.status === 'result_announced'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : d.status === 'closed' || safeGetTime(d.deadlineIso) <= Date.now()
                          ? 'bg-red-50 text-red-600 border border-red-100'
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      }`}>
                        {d.status === 'result_announced' ? 'نتیجہ جاری (Result)' : d.status === 'closed' || safeGetTime(d.deadlineIso) <= Date.now() ? 'بند ہے (Closed)' : 'اوپن ہے (Open)'}
                      </span>
                      <span className="font-bold text-xs text-slate-800">
                        {d.category === 'pakistan_bond' ? `پاکستان بانڈ ${d.nextPrizeBondValue ? '- ' + d.nextPrizeBondValue : ''}` : 'تھائی لینڈ لاٹری'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      اسٹیٹس: <strong className={d.status === 'result_announced' ? 'text-amber-600' : d.status === 'closed' ? 'text-red-600' : 'text-emerald-600'}>{d.status === 'result_announced' ? 'نتیجہ جاری (Result Announced)' : d.status === 'closed' ? 'بند (Closed)' : 'اوپن (Open)'}</strong>
                    </p>
                    <p className="text-[11px] text-slate-600">
                      عنوان: <strong className="text-slate-800">{d.titleUrdu}</strong>
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      آخری وقت: {safeFormatDate(d.deadlineIso, 'en-US')}
                    </p>
                    {d.category === 'pakistan_bond' ? (
                      <div className="mt-1 pt-1 border-t border-slate-200/50 space-y-0.5 text-[10px] text-slate-500">
                        {d.nextPrizeBondValue && (
                          <div>مالیت: <strong className="text-slate-700">{d.nextPrizeBondValue}</strong></div>
                        )}
                        {d.nextDrawCity && (
                          <div>شہر: <strong className="text-slate-700">{d.nextDrawCity}</strong></div>
                        )}
                        {d.nextDrawNumber && (
                          <div>ڈرا نمبر: <strong className="text-slate-700">{d.nextDrawNumber}</strong></div>
                        )}
                        {d.nextDrawDate && (
                          <div>ڈرا تاریخ: <strong className="text-slate-700">{d.nextDrawDate}</strong></div>
                        )}
                      </div>
                    ) : (
                      d.nextDrawDate && (
                        <div className="mt-1 pt-1 border-t border-slate-200/50 text-[10px] text-slate-500">
                          ڈرا تاریخ: <strong className="text-slate-700">{d.nextDrawDate}</strong>
                        </div>
                      )
                    )}
                  </div>

                  <div className="space-y-2 mt-2 pt-2 border-t border-slate-200/60">
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingDrawId(d.id || d.category);
                          setDeadlineCategory(d.category);
                          setDeadlineTitle(d.titleUrdu);
                          setDeadlineDateTime(d.deadlineIso);
                          setDeadlineStatus(d.status || 'open');
                          setNextPrizeBondValue(d.nextPrizeBondValue || '');
                          setNextDrawCity(d.nextDrawCity || '');
                          setNextDrawNumber(d.nextDrawNumber || '');
                          setNextDrawDate(d.nextDrawDate || '');
                        }}
                        className="py-1 px-3 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 cursor-pointer transition-all"
                      >
                        ایڈٹ (Edit)
                      </button>
                      {onDeleteDeadline && (
                        <button
                          type="button"
                          onClick={async () => {
                            if (window.confirm('کیا آپ واقعی یہ ڈرا ڈیڈ لائن حذف کرنا چاہتے ہیں؟')) {
                              await onDeleteDeadline(d.id || d.category);
                            }
                          }}
                          className="py-1 px-3 rounded-lg text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer transition-all"
                        >
                          حذف (Delete)
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                          const isoStr = futureDate.toISOString().slice(0, 16);
                          onSetDeadline(
                            d.category,
                            isoStr,
                            'بکنگ فائنل کھل گئی ہے',
                            'open',
                            d.nextPrizeBondValue,
                            d.nextDrawCity,
                            d.nextDrawNumber,
                            d.nextDrawDate,
                            d.id || d.category
                          );
                        }}
                        className={`py-1.5 px-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 border ${
                          d.status === 'open' 
                            ? 'bg-emerald-600 text-white border-emerald-600' 
                            : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                        <span>کھولیں</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
                          const isoStr = pastDate.toISOString().slice(0, 16);
                          onSetDeadline(
                            d.category,
                            isoStr,
                            'بکنگ فائنل بند ہے',
                            'closed',
                            d.nextPrizeBondValue,
                            d.nextDrawCity,
                            d.nextDrawNumber,
                            d.nextDrawDate,
                            d.id || d.category
                          );
                        }}
                        className={`py-1.5 px-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 border ${
                          d.status === 'closed' 
                            ? 'bg-red-600 text-white border-red-600' 
                            : 'bg-white text-red-600 border-red-200 hover:bg-red-50'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>بند کریں</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
                          const isoStr = pastDate.toISOString().slice(0, 16);
                          onSetDeadline(
                            d.category,
                            isoStr,
                            'قرعہ اندازی کا نتیجہ جاری ہو گیا ہے',
                            'result_announced',
                            d.nextPrizeBondValue,
                            d.nextDrawCity,
                            d.nextDrawNumber,
                            d.nextDrawDate,
                            d.id || d.category
                          );
                        }}
                        className={`py-1.5 px-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 border ${
                          d.status === 'result_announced' 
                            ? 'bg-amber-600 text-white border-amber-600' 
                            : 'bg-white text-amber-700 border-amber-200 hover:bg-amber-50'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>نتیجہ</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
          );
        })()}
      </div>
    </div>
  );
};
