import React from 'react';
import { Calculator, Sparkles, TrendingUp } from 'lucide-react';

interface AIGeneratorTabProps {
  genCategory: 'pakistan_bond' | 'thailand_lottery';
  setGenCategory: (cat: 'pakistan_bond' | 'thailand_lottery') => void;
  genFormula: 'odd_even' | 'frequency' | 'astrological';
  setGenFormula: (formula: 'odd_even' | 'frequency' | 'astrological') => void;
  isGenerating: boolean;
  generatedNumber: string | null;
  setGeneratedNumber: (num: string | null) => void;
  genProbability: number | null;
  genReason: string | null;
  quickFirstAmt: string;
  setQuickFirstAmt: (val: string) => void;
  quickSecondAmt: string;
  setQuickSecondAmt: (val: string) => void;
  bookingStatus: { type: 'success' | 'error'; message: string } | null;
  handleGenerate: () => void;
  handleQuickBook: (isDemand: boolean) => void;
}

export const AIGeneratorTab: React.FC<AIGeneratorTabProps> = ({
  genCategory,
  setGenCategory,
  genFormula,
  setGenFormula,
  isGenerating,
  generatedNumber,
  setGeneratedNumber,
  genProbability,
  genReason,
  quickFirstAmt,
  setQuickFirstAmt,
  quickSecondAmt,
  setQuickSecondAmt,
  bookingStatus,
  handleGenerate,
  handleQuickBook
}) => {
  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
        <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center justify-end gap-1.5">
          <span>اے آئی سمارٹ لکی نمبر کیلکولیٹر</span>
          <Calculator className="w-5 h-5 text-amber-400" />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Configuration side */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">کیٹیگری منتخب کریں (Choose Draw):</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setGenCategory('pakistan_bond'); setGeneratedNumber(null); }}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    genCategory === 'pakistan_bond'
                      ? 'bg-slate-900 border-amber-500 text-amber-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                  }`}
                >
                  پاکستان پرائز بانڈ (6 ہندسے)
                </button>
                <button
                  onClick={() => { setGenCategory('thailand_lottery'); setGeneratedNumber(null); }}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    genCategory === 'thailand_lottery'
                      ? 'bg-slate-900 border-amber-500 text-amber-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                  }`}
                >
                  تھائی لینڈ لاٹری (4 ہندسے)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">اے آئی موازنہ کا طریقہ (AI Logic Formula):</label>
              <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                <button
                  onClick={() => setGenFormula('frequency')}
                  className={`py-2 px-1 text-center font-bold rounded-xl border transition-all cursor-pointer ${
                    genFormula === 'frequency'
                      ? 'bg-slate-900 border-amber-500 text-amber-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                  }`}
                >
                  ہندساتی فریکوئنسی
                </button>
                <button
                  onClick={() => setGenFormula('odd_even')}
                  className={`py-2 px-1 text-center font-bold rounded-xl border transition-all cursor-pointer ${
                    genFormula === 'odd_even'
                      ? 'bg-slate-900 border-amber-500 text-amber-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                  }`}
                >
                  طاق/جفت تسلسل
                </button>
                <button
                  onClick={() => setGenFormula('astrological')}
                  className={`py-2 px-1 text-center font-bold rounded-xl border transition-all cursor-pointer ${
                    genFormula === 'astrological'
                      ? 'bg-slate-900 border-amber-500 text-amber-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                  }`}
                >
                  نجومی زائچہ پیٹرن
                </button>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>ریاضیاتی ماڈل پروسیس ہو رہا ہے...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>خوش قسمت نمبر تیار کریں (Generate Lucky Number)</span>
                </>
              )}
            </button>
          </div>

          {/* Number display side */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-700/40 flex flex-col justify-center items-center text-center">
            {generatedNumber ? (
              <div className="space-y-4 w-full">
                <p className="text-[10px] text-slate-400 tracking-widest uppercase font-bold">LUCKY RECOMENDED DIGITS</p>
                
                <div className="text-4xl font-mono font-black text-amber-400 bg-slate-950 py-3.5 px-6 rounded-2xl tracking-widest inline-block border border-slate-800 shadow-inner">
                  {generatedNumber}
                </div>

                <div className="flex justify-center items-center gap-1">
                  <span className="text-xs text-emerald-400 font-semibold font-mono">{genProbability}%</span>
                  <span className="text-[10px] text-slate-400">اے آئی امکانی اسکور (Probability Score)</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                  {genReason}
                </p>

                <div className="border-t border-slate-800 pt-4 mt-3 space-y-3 text-right">
                  <h4 className="text-xs font-bold text-amber-400">اسی نمبر کی فوری بکنگ / ڈیمانڈ بھیجیں:</h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">فرسٹ رقم (Rs):</label>
                      <input
                        type="number"
                        value={quickFirstAmt}
                        onChange={(e) => setQuickFirstAmt(e.target.value)}
                        className="w-full bg-slate-950 text-white border border-slate-800 rounded-lg p-1.5 text-xs font-mono text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">سیکنڈ رقم (Rs):</label>
                      <input
                        type="number"
                        value={quickSecondAmt}
                        onChange={(e) => setQuickSecondAmt(e.target.value)}
                        className="w-full bg-slate-950 text-white border border-slate-800 rounded-lg p-1.5 text-xs font-mono text-center"
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
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 rounded-xl text-[11px] cursor-pointer"
                    >
                      عام بکنگ کریں
                    </button>
                    <button
                      onClick={() => handleQuickBook(true)}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold py-2 rounded-xl text-[11px] cursor-pointer"
                    >
                      ڈیمانڈ بھیجیں (500 سے زائد)
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 py-6">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-600">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  بائیں کالم سے کیٹیگری اور ریاضیاتی طریقہ منتخب کر کے خوش قسمت نمبر حاصل کریں۔ ہمارے پیٹرنز لائیو لیمٹ مانیٹر سے منسلک ہیں۔
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-800 flex flex-row-reverse gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
            <Calculator className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">ہندساتی فریکوئنسی فارمولا</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              یہ فارمولا گذشتہ 10 سال کے جیتنے والے نمبروں کی کثافت اور گنتی کا حساب لگا کر ایسے ہندسوں کا چناؤ کرتا ہے جو متواتر ڈرا میں لکی پائے گئے ہیں۔
            </p>
          </div>
        </div>

        <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-800 flex flex-row-reverse gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">طاق اور جفت کا توازن</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              لاٹری رزلٹ کا آڈ اور ایون توازن 50:50 ہونا چاہیے۔ یہ فارمولا حالیہ تسلسل کو دیکھ کر ایسے پیٹرن چنتا ہے جن کے آنے کا امکان ریاضی کے لحاظ سے زیادہ ہوتا ہے۔
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
