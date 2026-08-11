import React from 'react';
import { NumberLimit } from '../../types';
import { Plus, Sparkles, AlertCircle } from 'lucide-react';

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
  relevantLimits: NumberLimit[];
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
  handleDemandClick,
  relevantLimits
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

      {/* Side Panel: Active Caps Set by Admin */}
      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/50 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-200 mb-3 flex items-center justify-end gap-1.5">
            <span>مخصوص لمٹ نمبرز (Caps)</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
            ایڈمن نے ان نمبرز کے لئے فرسٹ یا سیکنڈ پر بکنگ کی حد لاگو کی ہے۔ اس سے زیادہ رقم کا نمبر بک نہیں ہو سکتا۔
          </p>

          {relevantLimits.length === 0 ? (
            <div className="text-center py-4 bg-white/70 rounded-xl border border-dashed border-slate-200">
              <span className="text-[11px] text-slate-400 font-normal">کوئی حد مقرر نہیں ہے۔ تمام نمبرز اوپن ہیں۔</span>
            </div>
          ) : (
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {relevantLimits.map((l) => (
                <div key={l.id} className="flex justify-between items-center bg-white p-2 rounded-xl text-xs border border-slate-100">
                  <span className="font-mono text-amber-700 font-semibold">Max: Rs. {l.maxAmount}</span>
                  <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">{l.number}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200">
          <h5 className="text-[10px] text-slate-400 leading-normal">
            نوٹ: کسی بھی نمبر کی بکنگ کے لئے آپ کا والٹ بیلنس کافی ہونا ضروری ہے۔
          </h5>
        </div>
      </div>
    </div>
  );
};
