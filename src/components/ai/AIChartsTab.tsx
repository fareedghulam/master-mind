import React from 'react';
import { TrendingUp } from 'lucide-react';

interface AIChartsTabProps {
  analysisCategory: 'pakistan_bond' | 'thailand_lottery';
  setAnalysisCategory: (cat: 'pakistan_bond' | 'thailand_lottery') => void;
  analysisType: 'open' | 'close' | 'center' | 'fourth' | 'akra' | 'oddeven';
  setAnalysisType: (type: 'open' | 'close' | 'center' | 'fourth' | 'akra' | 'oddeven') => void;
  analysisData: {
    drawsCount: number;
    open: Array<{ value: string; count: number; percentage: number }>;
    close: Array<{ value: string; count: number; percentage: number }>;
    center: Array<{ value: string; count: number; percentage: number }>;
    fourth: Array<{ value: string; count: number; percentage: number }>;
    akras: Array<{ akra: string; count: number }>;
    digitOddsPercentage: number;
    digitEvensPercentage: number;
    firstPrizeOdds: number;
    firstPrizeEvens: number;
  };
}

export const AIChartsTab: React.FC<AIChartsTabProps> = ({
  analysisCategory,
  setAnalysisCategory,
  analysisType,
  setAnalysisType,
  analysisData
}) => {
  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
        {/* Dashboard Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800 pb-5">
          <div className="flex flex-row-reverse gap-2 items-center w-full justify-between sm:justify-start">
            <div className="text-right">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center justify-end gap-1.5">
                <span>پرائز بانڈ اور لاٹری ریاضیاتی اینالائسس</span>
                <TrendingUp className="w-5 h-5 text-amber-400" />
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                prizebond.net کی طرز پر تیار کردہ تفصیلی ہندساتی اور آکڑا تجزیہ کار
              </p>
            </div>
          </div>
        </div>

        {/* CATEGORY SELECTOR */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <button
            onClick={() => setAnalysisCategory('thailand_lottery')}
            className={`py-2 px-4 rounded-xl border font-bold text-xs cursor-pointer transition-all ${
              analysisCategory === 'thailand_lottery'
                ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80'
            }`}
          >
            تھائی لینڈ لاٹری (Thai Lottery)
          </button>
          <button
            onClick={() => setAnalysisCategory('pakistan_bond')}
            className={`py-2 px-4 rounded-xl border font-bold text-xs cursor-pointer transition-all ${
              analysisCategory === 'pakistan_bond'
                ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80'
            }`}
          >
            پاکستان پرائز بانڈ (Pakistan Bond)
          </button>
        </div>

        {/* METHOD/ANALYSIS TYPE SELECTOR */}
        <div className="flex flex-row-reverse flex-wrap gap-1.5 mb-6 bg-slate-950/60 p-1.5 rounded-xl border border-slate-900">
          <button
            onClick={() => setAnalysisType('open')}
            className={`flex-1 min-w-[80px] py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
              analysisType === 'open'
                ? 'bg-slate-800 border border-slate-700 text-amber-400'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            اوپن فگر (Open)
          </button>
          <button
            onClick={() => setAnalysisType('close')}
            className={`flex-1 min-w-[80px] py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
              analysisType === 'close'
                ? 'bg-slate-800 border border-slate-700 text-amber-400'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            کلوز فگر (Close)
          </button>
          <button
            onClick={() => setAnalysisType('center')}
            className={`flex-1 min-w-[80px] py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
              analysisType === 'center'
                ? 'bg-slate-800 border border-slate-700 text-amber-400'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            سینٹر فگر (Center)
          </button>
          <button
            onClick={() => setAnalysisType('fourth')}
            className={`flex-1 min-w-[80px] py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
              analysisType === 'fourth'
                ? 'bg-slate-800 border border-slate-700 text-amber-400'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            فورتھ فگر (4th)
          </button>
          <button
            onClick={() => setAnalysisType('akra')}
            className={`flex-1 min-w-[80px] py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
              analysisType === 'akra'
                ? 'bg-slate-800 border border-slate-700 text-amber-400'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            آکڑا فارمولا (Akra)
          </button>
          <button
            onClick={() => setAnalysisType('oddeven')}
            className={`flex-1 min-w-[80px] py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
              analysisType === 'oddeven'
                ? 'bg-slate-800 border border-slate-700 text-amber-400'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            طاق / جفت (Odd/Even)
          </button>
        </div>

        {/* STATISTICAL SUMMARY HIGHLIGHTS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase">کل ریکارڈز (Analyzed Draws)</span>
            <span className="font-mono text-lg font-bold text-white block mt-0.5">{analysisData.drawsCount} Draws</span>
          </div>
          
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase">سب سے ہاٹ فگر (Hot Digit)</span>
            <span className="font-mono text-lg font-bold text-emerald-400 block mt-0.5">
              {(() => {
                const list = analysisType === 'open' ? analysisData.open :
                             analysisType === 'close' ? analysisData.close :
                             analysisType === 'center' ? analysisData.center :
                             analysisType === 'fourth' ? analysisData.fourth : null;
                if (!list) return '7';
                const sorted = [...list].sort((a, b) => b.count - a.count);
                return sorted[0] ? `${sorted[0].value} (${sorted[0].count}x)` : '7';
              })()}
            </span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase">سب سے کولڈ فگر (Cold Digit)</span>
            <span className="font-mono text-lg font-bold text-sky-400 block mt-0.5">
              {(() => {
                const list = analysisType === 'open' ? analysisData.open :
                             analysisType === 'close' ? analysisData.close :
                             analysisType === 'center' ? analysisData.center :
                             analysisType === 'fourth' ? analysisData.fourth : null;
                if (!list) return '2';
                const sorted = [...list].sort((a, b) => a.count - b.count);
                return sorted[0] ? `${sorted[0].value} (${sorted[0].count}x)` : '2';
              })()}
            </span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase">طاق بمقابلہ جفت (Odd vs Even)</span>
            <span className="font-mono text-lg font-bold text-amber-400 block mt-0.5">
              {analysisData.digitOddsPercentage}% / {analysisData.digitEvensPercentage}%
            </span>
          </div>
        </div>

        {/* MAIN CONTENT AREA BY SELECTED TAB */}
        {['open', 'close', 'center', 'fourth'].includes(analysisType) && (
          <div className="space-y-6">
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-900 text-center">
              <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest text-right">
                ہندساتی فریکوئنسی نقشہ (Visual Frequency Grid):
              </h4>
              
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                {(() => {
                  const list = analysisType === 'open' ? analysisData.open :
                               analysisType === 'close' ? analysisData.close :
                               analysisType === 'center' ? analysisData.center :
                               analysisType === 'fourth' ? analysisData.fourth : [];
                  
                  const maxCount = Math.max(...list.map(i => i.count), 1);
                  
                  return list.map((item) => {
                    const relativeWeight = item.count / maxCount;
                    const shadowColor = relativeWeight > 0.7 
                      ? 'shadow-[0_0_15px_rgba(245,158,11,0.25)] border-amber-500 text-amber-300' 
                      : relativeWeight < 0.35 
                      ? 'shadow-none border-slate-800 text-slate-500' 
                      : 'shadow-none border-slate-700 text-slate-300';

                    const bgColor = relativeWeight > 0.7 
                      ? 'bg-amber-500/10' 
                      : relativeWeight < 0.35 
                      ? 'bg-slate-900/40' 
                      : 'bg-slate-800/40';

                    return (
                      <div 
                        key={item.value} 
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border ${bgColor} ${shadowColor}`}
                      >
                        <span className="text-lg font-bold font-mono">{item.value}</span>
                        <span className="text-[9px] text-slate-500 font-mono mt-0.5">{item.count} بار</span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest text-right">
                تفصیلی فریکوئنسی اور فیصد کا تناسب (Detailed Percentages & Frequencies):
              </h4>

              {(() => {
                const list = analysisType === 'open' ? analysisData.open :
                             analysisType === 'close' ? analysisData.close :
                             analysisType === 'center' ? analysisData.center :
                             analysisType === 'fourth' ? analysisData.fourth : [];
                
                const maxCount = Math.max(...list.map(i => i.count), 1);

                return [...list].sort((a, b) => b.count - a.count).map((item, idx) => {
                  const pctOfMax = Math.round((item.count / maxCount) * 100);
                  const isHot = idx < 2;
                  const isCold = idx >= 8;

                  return (
                    <div key={item.value} className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/60 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-mono">Count: {item.count} ({item.percentage}%)</span>
                        {isHot && (
                          <span className="bg-amber-500/15 text-amber-400 text-[9px] px-1.5 py-0.5 rounded font-bold">ہاٹ</span>
                        )}
                        {isCold && (
                          <span className="bg-sky-500/15 text-sky-400 text-[9px] px-1.5 py-0.5 rounded font-bold">کولڈ</span>
                        )}
                      </div>

                      <div className="flex-1 mx-4 bg-slate-950 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            isHot ? 'bg-gradient-to-r from-amber-500 to-red-500' : isCold ? 'bg-sky-500' : 'bg-slate-700'
                          }`} 
                          style={{ width: `${pctOfMax}%` }}
                        ></div>
                      </div>

                      <div className="text-right flex items-center gap-2">
                        <span className="text-[10px] text-slate-500">ہندسہ:</span>
                        <span className="font-bold text-white font-mono text-sm">{item.value}</span>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}

        {/* AKRA FORMULA ANALYSIS */}
        {analysisType === 'akra' && (
          <div className="space-y-6">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 text-right text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>آکڑا فارمولا:</strong> پہلے دو ہندسوں کے امتزاج کو <strong>آکڑا (Akra)</strong> کہا جاتا ہے۔ پرائز بانڈز میں آکڑا سب سے زیادہ اہم روٹین مانی جاتی ہے۔ ذیل میں تاریخی ریکارڈ میں سب سے زیادہ کثرت سے آنے والے ٹاپ آکڑا درج ہیں۔
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest text-right flex justify-between items-center">
                <span className="text-slate-500 font-mono text-[10px] lowercase">Top 12 Akra Combinations</span>
                <span>سب سے مقبول آکڑا جوڑیاں (TOP AKRA PAIRS):</span>
              </h4>

              {analysisData.akras.length === 0 ? (
                <p className="text-center text-xs text-slate-500 py-6">ڈیٹا موجود نہیں ہے۔</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {analysisData.akras.slice(0, 12).map((item, idx) => {
                    const firstAkraCount = analysisData.akras[0]?.count || 1;
                    const pctOfMax = Math.round((item.count / firstAkraCount) * 100);
                    
                    return (
                      <div key={item.akra} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="bg-slate-950 text-slate-400 px-2 py-0.5 rounded text-[10px] font-mono">Rank {idx + 1}</span>
                          <span className="text-slate-400 font-mono">({item.count} بار)</span>
                        </div>

                        <div className="flex-1 mx-3 bg-slate-950 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: `${pctOfMax}%` }}></div>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-white block font-mono text-base tracking-widest">{item.akra}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ODD/EVEN BALANCE ANALYSIS */}
        {analysisType === 'oddeven' && (
          <div className="space-y-6">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 text-right text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>طاق اور جفت کا توازن:</strong> ہندسوں کی فریکوئنسی کا حتمی ریاضیاتی توازن طاق (Odd) اور جفت (Even) نمبروں کا ریشو بتاتا ہے۔ زیادہ تر متوازن نتائج میں یہ تناسب 50 فیصد کے قریب ہوتا ہے۔
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-center">
                <h4 className="text-xs font-bold text-white mb-4 uppercase">
                  کل جیتنے والے ہندسوں کا طاق/جفت تناسب (Digit-Level Odd/Even)
                </h4>

                <div className="flex justify-around items-center py-4">
                  <div className="text-center">
                    <span className="text-sm font-bold text-red-400 block">{analysisData.digitOddsPercentage}%</span>
                    <span className="text-[10px] text-slate-500 block">طاق فگرز (Odd)</span>
                  </div>
                  
                  <div className="w-24 h-24 relative flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#1e293b" strokeWidth="3" />
                      <circle 
                        cx="18" cy="18" r="16" fill="none" stroke="#f59e0b" strokeWidth="3.2" 
                        strokeDasharray={`${analysisData.digitOddsPercentage} 100`} 
                        transform="rotate(-90 18 18)"
                      />
                    </svg>
                    <div className="absolute font-mono text-xs font-bold text-white">
                      {analysisData.digitOddsPercentage}:{analysisData.digitEvensPercentage}
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-sm font-bold text-sky-400 block">{analysisData.digitEvensPercentage}%</span>
                    <span className="text-[10px] text-slate-500 block">جفت فگرز (Even)</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-center">
                <h4 className="text-xs font-bold text-white mb-4 uppercase">
                  پہلے انعام کا حتمی طاق/جفت تناسب (Draw-Level Odd/Even Winner)
                </h4>

                <div className="flex justify-around items-center py-4">
                  <div className="text-center">
                    <span className="text-sm font-bold text-amber-400 block">{analysisData.firstPrizeOdds} Draws</span>
                    <span className="text-[10px] text-slate-500 block">طاق ونرز (Odd Draws)</span>
                  </div>

                  <div className="w-24 h-24 relative flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#1e293b" strokeWidth="3" />
                      <circle 
                        cx="18" cy="18" r="16" fill="none" stroke="#10b981" strokeWidth="3.2" 
                        strokeDasharray={`${Math.round((analysisData.firstPrizeOdds / (analysisData.firstPrizeOdds + analysisData.firstPrizeEvens || 1)) * 100)} 100`} 
                        transform="rotate(-90 18 18)"
                      />
                    </svg>
                    <div className="absolute font-mono text-xs font-bold text-white">
                      {analysisData.firstPrizeOdds}:{analysisData.firstPrizeEvens}
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-sm font-bold text-emerald-400 block">{analysisData.firstPrizeEvens} Draws</span>
                    <span className="text-[10px] text-slate-500 block">جفت ونرز (Even Draws)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
