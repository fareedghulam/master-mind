import React from 'react';
import { Plus, Sparkles, ShieldCheck } from 'lucide-react';

interface BookingFormSectionProps {
  isTimeUp: boolean;
  errorStatus: string;
  successStatus: string;
  numInput: string;
  setNumInput: (val: string) => void;
  firstAmtInput: string;
  setFirstAmtInput: (val: string) => void;
  secondAmtInput: string;
  setSecondAmtInput: (val: string) => void;
  currentTotalCost: number;
  handleSubmit: (e: React.FormEvent) => void;
  handleDemandClick: (e: React.MouseEvent) => void;
}

export const BookingFormSection: React.FC<BookingFormSectionProps> = ({
  isTimeUp,
  errorStatus,
  successStatus,
  numInput,
  setNumInput,
  firstAmtInput,
  setFirstAmtInput,
  secondAmtInput,
  setSecondAmtInput,
  currentTotalCost,
  handleSubmit,
  handleDemandClick
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Booking Form Card (تین خانے) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md md:col-span-2 space-y-4">
        <h3 className="text-base font-bold text-slate-800 pb-2 border-b border-slate-100 mb-2">
          بکنگ اندراج فارم (Booking Details)
        </h3>

        {errorStatus && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs">
            ⚠️ {errorStatus}
          </div>
        )}
        {successStatus && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs">
            ✓ {successStatus}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Field 3: Second Prize Amount (خانہ تین) */}
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5" htmlFor="field-second">
                سیکنڈ رقم (Second Play) Rs.
              </label>
              <input
                id="field-second"
                type="number"
                placeholder="0"
                value={secondAmtInput}
                onChange={(e) => setSecondAmtInput(e.target.value)}
                disabled={isTimeUp}
                className={`w-full text-left border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono ${
                  isTimeUp ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
                min="0"
              />
            </div>

            {/* Field 2: First Prize Amount (خانہ دو) */}
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5" htmlFor="field-first">
                فرسٹ رقم (First Play) Rs.
              </label>
              <input
                id="field-first"
                type="number"
                placeholder="0"
                value={firstAmtInput}
                onChange={(e) => setFirstAmtInput(e.target.value)}
                disabled={isTimeUp}
                className={`w-full text-left border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono ${
                  isTimeUp ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
                min="0"
              />
            </div>

            {/* Field 1: Custom Number (خانہ ایک) */}
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right" htmlFor="field-number">
                بکنگ نمبر (Your Choice Number) *
              </label>
              <input
                id="field-number"
                type="text"
                placeholder={isTimeUp ? "بکنگ بند ہے" : "نمبر لکھیں"}
                value={numInput}
                onChange={(e) => setNumInput(e.target.value)}
                disabled={isTimeUp}
                className={`w-full text-left border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono ${
                  isTimeUp ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
                required
              />
            </div>

          </div>

          {currentTotalCost > 500 && !isTimeUp && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/25 text-amber-900 rounded-2xl text-[11px] leading-relaxed flex items-center justify-between gap-2">
              <span>مجموعی رقم <strong>Rs. {currentTotalCost.toLocaleString()}</strong> ہے، جو کہ 500 روپے سے زائد ہے۔ آپ اسے عام بکنگ کے علاوہ ڈائریکٹ <strong>"ڈیمانڈ"</strong> کے ذریعے بھی ایڈمن کو بھیج سکتے ہیں۔</span>
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              id="book-number-submit"
              type="submit"
              disabled={isTimeUp}
              className={`flex-1 font-bold py-3.5 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                isTimeUp 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300/30' 
                  : 'bg-slate-900 hover:bg-slate-800 text-amber-400 cursor-pointer shadow-slate-900/10'
              }`}
            >
              <Plus className={`w-4 h-4 ${isTimeUp ? 'text-slate-400' : 'text-amber-400'}`} />
              <span>نمبر بک کریں (Confirm Booking)</span>
            </button>

            {currentTotalCost > 500 && !isTimeUp && (
              <button
                id="send-demand-btn"
                type="button"
                onClick={handleDemandClick}
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3.5 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/15 border border-amber-400/40"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>ڈیمانڈ بھیجیں (Send Demand)</span>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Side Panel: Booking Instructions & Guidelines (Private limits hidden from Customer and Dealer) */}
      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/60 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-200 mb-3 flex items-center justify-end gap-1.5">
            <span>بکنگ رہنمائی و قواعد</span>
            <ShieldCheck className="w-4 h-4 text-amber-500" />
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed mb-3.5 text-right">
            درست اندراج اور بروقت بکنگ کے لیے درج ذیل اہم ہدایات ملاحظہ فرمائیں:
          </p>

          <div className="space-y-2 text-xs text-slate-700 text-right">
            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-2.5 justify-end">
              <div>
                <p className="font-semibold text-slate-800 text-[11px]">والٹ بیلنس کا ہونا</p>
                <p className="text-[10px] text-slate-500 mt-0.5">بکنگ کی تصدیق کے لیے والٹ میں مطلوبہ رقم کا ہونا لازمی ہے۔</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5"></div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-2.5 justify-end">
              <div>
                <p className="font-semibold text-slate-800 text-[11px]">ڈرا کا اختتامی وقت</p>
                <p className="text-[10px] text-slate-500 mt-0.5">مقررہ ڈیڈ لائن پر بکنگ خودکار بند ہو جائے گی۔ وقت سے پہلے اندراج کریں۔</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5"></div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-2.5 justify-end">
              <div>
                <p className="font-semibold text-slate-800 text-[11px]">منسوخی کی سہولت</p>
                <p className="text-[10px] text-slate-500 mt-0.5">غلط اندراج کی صورت میں 2 منٹ کے اندر بکنگ کینسل کر کے رقم والٹ میں واپس لی جا سکتی ہے۔</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5"></div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-2.5 justify-end">
              <div>
                <p className="font-semibold text-slate-800 text-[11px]">ڈیمانڈ آپشن</p>
                <p className="text-[10px] text-slate-500 mt-0.5">اگر مطلوبہ نمبر براہ راست رجسٹر نہ ہو سکے تو 'ڈیمانڈ بھیجیں' کا آپشن استعمال کریں۔</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1.5"></div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200">
          <p className="text-[10px] text-slate-400 leading-normal text-right">
            نوٹ: تمام بکنگز سسٹم کی عمومی پالیسی اور دستیابی کے تحت منظور کی جاتی ہیں۔
          </p>
        </div>
      </div>
    </div>
  );
};
