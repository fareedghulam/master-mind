import React from 'react';
import { NumberLimit, DrawDeadline, DrawCategory } from '../../types';
import { Plus, Trash, Clock, X } from 'lucide-react';

interface AdminLimitsDeadlinesTabProps {
  limits: NumberLimit[];
  deadlines: DrawDeadline[];
  limitError: string;
  limitSuccess: string;
  limitCategory: DrawCategory;
  setLimitCategory: (cat: DrawCategory) => void;
  limitNumber: string;
  setLimitNumber: (num: string) => void;
  limitAmount: string;
  setLimitAmount: (amt: string) => void;
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
  limitError,
  limitSuccess,
  limitCategory,
  setLimitCategory,
  limitNumber,
  setLimitNumber,
  limitAmount,
  setLimitAmount,
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
  return (
    <div className="space-y-8">
      {/* Module 2: Number Booking Limit Configuration */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md flex flex-col justify-between">
        <div>
          <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 mb-5 flex items-center justify-end gap-2">
            <span>بکنگ نمبر زیادہ سے زیادہ لمٹ</span>
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
          </h4>

          {limitError && (
            <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs leading-relaxed">
              ⚠️ {limitError}
            </div>
          )}
          {limitSuccess && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs leading-relaxed">
              ✓ {limitSuccess}
            </div>
          )}

          <form onSubmit={handleLimitSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5">
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                  زیادہ سے زیادہ رقم لمٹ *
                </label>
                <input
                  type="number"
                  placeholder="مثال: 50"
                  value={limitAmount}
                  onChange={(e) => setLimitAmount(e.target.value)}
                  className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
              </div>
              
              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                  مخصوص نمبر لکھیں *
                </label>
                <input
                  type="text"
                  placeholder="نمبر لکھیں"
                  value={limitNumber}
                  onChange={(e) => setLimitNumber(e.target.value)}
                  className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>خصوصی بکنگ لمٹ لگائیں</span>
            </button>
          </form>

          {/* List of active set limits */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h5 className="text-xs font-bold text-slate-700 mb-3 text-right">موجودہ سیٹ شدہ نمبر لمٹس کی لسٹ ({limits.length})</h5>
            {limits.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-3 bg-slate-50 rounded-2xl">کوئی فعال نمبر لمٹ نہیں ہے۔</p>
            ) : (
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                {limits.map((limit) => {
                  const categoryMap: Record<DrawCategory, string> = {
                    pakistan_bond: 'پاکستان پرائز بانڈ',
                    thailand_lottery: 'تھائی لینڈ لاٹری'
                  };
                  return (
                    <div key={limit.id} className="flex justify-between items-center bg-slate-50 hover:bg-slate-100 p-3 rounded-2xl text-xs transition-all border border-slate-200">
                      <button
                        onClick={async () => {
                          if (window.confirm(`کیا آپ واقعی نمبر #${limit.number} کی لمٹ ختم کرنا چاہتے ہیں؟`)) {
                            await onDeleteLimit(limit.id);
                          }
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                        title="حذف کریں"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                      <div className="text-right">
                        <div className="font-bold text-slate-800 flex items-center justify-end gap-2">
                          <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-lg font-mono font-bold">#{limit.number}</span>
                          <span>{categoryMap[limit.category] || limit.category}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono block mt-1">زیادہ سے زیادہ فرسٹ/سیکنڈ لمٹ: Rs. {limit.maxAmount.toLocaleString()}</span>
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
        <div className="pt-4 border-t border-slate-100">
          <h5 className="text-xs font-bold text-slate-700 mb-3">موجودہ فعال بکنگ ڈیڈلائنز کی حیثیت ({deadlines.length})</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deadlines.map((d) => {
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
      </div>
    </div>
  );
};
