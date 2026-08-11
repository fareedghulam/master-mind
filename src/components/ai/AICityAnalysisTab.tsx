import React from 'react';
import { LayoutGrid, Download } from 'lucide-react';
import { PakistanBondResult } from '../../types';

interface AICityAnalysisTabProps {
  pkCities: Array<{ nameUrdu: string; nameEng: string; code: string }>;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  cityAnalysisData: {
    drawsCount: number;
    drawsList: PakistanBondResult[];
    open: Array<{ value: string; count: number; percentage: number }>;
    close: Array<{ value: string; count: number; percentage: number }>;
    center: Array<{ value: string; count: number; percentage: number }>;
    fourth: Array<{ value: string; count: number; percentage: number }>;
    akras: Array<{ akra: string; count: number }>;
    digitOddsPercentage: number;
    digitEvensPercentage: number;
    firstPrizeOdds: number;
    firstPrizeEvens: number;
    luckyBond: string;
  };
  citySubTab: 'digits' | 'akras' | 'oddeven';
  setCitySubTab: (sub: 'digits' | 'akras' | 'oddeven') => void;
  cityAnalysisType: 'open' | 'close' | 'center' | 'fourth';
  setCityAnalysisType: (type: 'open' | 'close' | 'center' | 'fourth') => void;
}

export const AICityAnalysisTab: React.FC<AICityAnalysisTabProps> = ({
  pkCities,
  selectedCity,
  setSelectedCity,
  cityAnalysisData,
  citySubTab,
  setCitySubTab,
  cityAnalysisType,
  setCityAnalysisType
}) => {
  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 text-right">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800 pb-5">
          <div className="flex flex-row-reverse gap-2 items-center w-full justify-between sm:justify-start">
            <div className="text-right">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center justify-end gap-1.5">
                <span>شہر ٹو شہر تفصیلی ریکارڈ اور تجزیہ کار</span>
                <LayoutGrid className="w-5 h-5 text-amber-400" />
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                شہر کے لحاظ سے پرائز بانڈز کے فرسٹ انعامات کا مکمل ریکارڈ اور ان کا ریاضیاتی تجزیہ
              </p>
            </div>
          </div>
        </div>

        {/* 10 CITIES GRID SELECTOR */}
        <div className="mb-6">
          <label className="block text-right text-xs font-bold text-slate-400 mb-3">شہر منتخب کریں (Select City for Records & Stats):</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {pkCities.map((city) => {
              const isSelected = selectedCity === city.nameUrdu;
              return (
                <button
                  key={city.code}
                  onClick={() => setSelectedCity(city.nameUrdu)}
                  className={`py-2.5 px-4 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs">{city.nameUrdu}</span>
                  <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-slate-800' : 'text-slate-500'}`}>
                    {city.nameEng}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CITY STATS SUMMARY HIGHLIGHTS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold text-center">کل ریکارڈز (Analyzed Draws)</span>
            <span className="font-mono text-base font-bold text-white block mt-1 text-center">{cityAnalysisData.drawsCount} Draws</span>
          </div>
          
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold text-center">لکیسٹ بانڈ (Hot Bond Category)</span>
            <span className="font-mono text-sm font-bold text-emerald-400 block mt-1 text-center">
              {cityAnalysisData.luckyBond === '15000' ? 'Rs. 15,000' : 
               cityAnalysisData.luckyBond === '7500' ? 'Rs. 7,500' :
               cityAnalysisData.luckyBond === '1500' ? 'Rs. 1,500' :
               cityAnalysisData.luckyBond === '750' ? 'Rs. 750' :
               cityAnalysisData.luckyBond === '200' ? 'Rs. 200' :
               cityAnalysisData.luckyBond === '40000' ? 'Rs. 40,000' : 'Rs. 15,000'}
            </span>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold text-center">طاق بمقابلہ جفت (Odd vs Even Digits)</span>
            <span className="font-mono text-base font-bold text-amber-400 block mt-1 text-center">
              {cityAnalysisData.digitOddsPercentage}% / {cityAnalysisData.digitEvensPercentage}%
            </span>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold text-center">مقبول ترین آکڑا (Top Akra)</span>
            <span className="font-mono text-base font-bold text-sky-400 block mt-1 text-center">
              {cityAnalysisData.akras[0] ? `${cityAnalysisData.akras[0].akra} (${cityAnalysisData.akras[0].count}x)` : '78'}
            </span>
          </div>
        </div>

        {/* TWO COLUMN ANALYSIS PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: MATHEMATICAL ANALYTICAL PANEL */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
              <div className="flex flex-row-reverse gap-2 mb-5 border-b border-slate-800 pb-3">
                <button
                  onClick={() => setCitySubTab('digits')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    citySubTab === 'digits'
                      ? 'bg-slate-800 text-amber-400 border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ہندساتی فریکوئنسی (Position Freq)
                </button>
                <button
                  onClick={() => setCitySubTab('akras')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    citySubTab === 'akras'
                      ? 'bg-slate-800 text-amber-400 border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  آکڑا روٹین (Akra Routines)
                </button>
                <button
                  onClick={() => setCitySubTab('oddeven')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    citySubTab === 'oddeven'
                      ? 'bg-slate-800 text-amber-400 border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  طاق / جفت بیلنس (Odd/Even)
                </button>
              </div>

              {citySubTab === 'digits' && (
                <div className="space-y-5">
                  <div className="flex flex-row-reverse justify-between items-center">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      مختلف پوزیشنز کے ہندسوں کا بہاؤ (Select Position Freq):
                    </h4>
                  </div>

                  <div className="flex flex-row-reverse gap-1 bg-slate-950 p-1 rounded-xl border border-slate-900">
                    <button
                      onClick={() => setCityAnalysisType('open')}
                      className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold cursor-pointer ${
                        cityAnalysisType === 'open' ? 'bg-slate-800 text-amber-400' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      اوپن (Open)
                    </button>
                    <button
                      onClick={() => setCityAnalysisType('close')}
                      className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold cursor-pointer ${
                        cityAnalysisType === 'close' ? 'bg-slate-800 text-amber-400' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      کلوز (Close)
                    </button>
                    <button
                      onClick={() => setCityAnalysisType('center')}
                      className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold cursor-pointer ${
                        cityAnalysisType === 'center' ? 'bg-slate-800 text-amber-400' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      سینٹر (Center)
                    </button>
                    <button
                      onClick={() => setCityAnalysisType('fourth')}
                      className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold cursor-pointer ${
                        cityAnalysisType === 'fourth' ? 'bg-slate-800 text-amber-400' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      فورتھ (4th)
                    </button>
                  </div>

                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
                    {(() => {
                      const list = cityAnalysisType === 'open' ? cityAnalysisData.open :
                                   cityAnalysisType === 'close' ? cityAnalysisData.close :
                                   cityAnalysisType === 'center' ? cityAnalysisData.center :
                                   cityAnalysisType === 'fourth' ? cityAnalysisData.fourth : [];
                      
                      const maxVal = Math.max(...list.map(i => i.count), 1);
                      return list.map((item) => {
                        const relativeWeight = item.count / maxVal;
                        const glowClass = relativeWeight > 0.7 
                          ? 'border-amber-500 bg-amber-500/10 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.15)]' 
                          : relativeWeight < 0.35 
                          ? 'border-slate-800 bg-slate-950/40 text-slate-500' 
                          : 'border-slate-700 bg-slate-800/40 text-slate-300';

                        return (
                          <div key={item.value} className={`flex flex-col items-center justify-center p-1.5 rounded-xl border ${glowClass}`}>
                            <span className="text-base font-bold font-mono">{item.value}</span>
                            <span className="text-[8px] text-slate-500 font-mono mt-0.5">{item.count}x</span>
                          </div>
                        );
                      });
                    })()}
                  </div>

                  <div className="space-y-2.5">
                    {(() => {
                      const list = cityAnalysisType === 'open' ? cityAnalysisData.open :
                                   cityAnalysisType === 'close' ? cityAnalysisData.close :
                                   cityAnalysisType === 'center' ? cityAnalysisData.center :
                                   cityAnalysisType === 'fourth' ? cityAnalysisData.fourth : [];

                      const maxCount = Math.max(...list.map(i => i.count), 1);
                      return [...list].sort((a, b) => b.count - a.count).map((item, idx) => {
                        const pctOfMax = Math.round((item.count / maxCount) * 100);
                        const isHot = idx < 2;
                        const isCold = idx >= 8;

                        return (
                          <div key={item.value} className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] text-slate-400 font-mono">Count: {item.count} ({item.percentage}%)</span>
                              {isHot && (
                                <span className="bg-amber-500/10 text-amber-400 text-[8px] px-1.5 py-0.5 rounded font-bold">ہاٹ</span>
                              )}
                              {isCold && (
                                <span className="bg-sky-500/10 text-sky-400 text-[8px] px-1.5 py-0.5 rounded font-bold">کولڈ</span>
                              )}
                            </div>

                            <div className="flex-1 mx-3 bg-slate-950 h-2 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-700 ${
                                  isHot ? 'bg-gradient-to-r from-amber-500 to-red-500' : isCold ? 'bg-sky-500' : 'bg-slate-700'
                                }`} 
                                style={{ width: `${pctOfMax}%` }}
                              ></div>
                            </div>

                            <div className="text-right flex items-center gap-1.5">
                              <span className="text-[10px] text-slate-500">ہندسہ:</span>
                              <span className="font-bold text-white font-mono text-xs">{item.value}</span>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              )}

              {citySubTab === 'akras' && (
                <div className="space-y-4 text-right">
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 text-right text-xs text-slate-300 leading-relaxed">
                    <p>
                      شہر <strong>{selectedCity}</strong> میں سب سے زیادہ قرعہ اندازی میں آنے والی ٹاپ آکڑا (Akra) جوڑیاں مندرجہ ذیل ہیں۔
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest text-right">
                      سب سے مقبول آکڑا جوڑیاں (Top Akra Pairs in {selectedCity}):
                    </h4>

                    {cityAnalysisData.akras.length === 0 ? (
                      <p className="text-center text-xs text-slate-500 py-6">ڈیٹا موجود نہیں ہے۔</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {cityAnalysisData.akras.slice(0, 10).map((item, idx) => {
                          const firstAkraCount = cityAnalysisData.akras[0]?.count || 1;
                          const pctOfMax = Math.round((item.count / firstAkraCount) * 100);
                          
                          return (
                            <div key={item.akra} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                              <div className="flex items-center gap-1.5">
                                <span className="bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded text-[9px] font-mono">Rank {idx + 1}</span>
                                <span className="text-slate-400 font-mono">({item.count} بار)</span>
                              </div>

                              <div className="flex-1 mx-3 bg-slate-950 h-2 rounded-full overflow-hidden">
                                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${pctOfMax}%` }}></div>
                              </div>

                              <div className="text-right">
                                <span className="font-bold text-white block font-mono text-sm tracking-widest">{item.akra}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {citySubTab === 'oddeven' && (
                <div className="space-y-6">
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 text-right text-xs text-slate-300 leading-relaxed">
                    <p>
                      شہر <strong>{selectedCity}</strong> کا طاق (Odd) اور جفت (Even) نمبروں کا توازن مندرجہ ذیل ہے۔
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center">
                      <h5 className="text-[11px] font-bold text-slate-400 mb-2">طاق بمقابلہ جفت فگرز</h5>
                      <span className="font-mono text-xl font-bold text-amber-400 block">
                        {cityAnalysisData.digitOddsPercentage}% / {cityAnalysisData.digitEvensPercentage}%
                      </span>
                    </div>

                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center">
                      <h5 className="text-[11px] font-bold text-slate-400 mb-2">طاق بمقابلہ جفت ڈراز</h5>
                      <span className="font-mono text-xl font-bold text-emerald-400 block">
                        {cityAnalysisData.firstPrizeOdds} / {cityAnalysisData.firstPrizeEvens}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: HISTORICAL DRAWS LIST FOR THIS CITY */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950/40 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider text-right flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="font-mono text-amber-400 font-bold">{cityAnalysisData.drawsCount} Record(s)</span>
                <span>شہر {selectedCity} کی قرعہ اندازی کا ریکارڈ:</span>
              </h4>

              {cityAnalysisData.drawsList.length === 0 ? (
                <p className="text-center text-xs text-slate-500 py-8">شہر {selectedCity} کا کوئی ریکارڈ نہیں ملا۔</p>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {cityAnalysisData.drawsList.map((draw) => (
                    <div key={draw.id} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 text-right space-y-2">
                      <div className="flex justify-between items-center border-b border-slate-800/60 pb-2 text-xs">
                        <span className="text-[11px] text-slate-400 font-mono">{draw.date}</span>
                        <span className="font-bold text-amber-400 font-mono">{draw.bondValue}</span>
                      </div>

                      <div className="flex justify-between items-center pt-1">
                        <span className="font-mono text-lg font-black text-white tracking-widest bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                          {draw.firstPrize}
                        </span>
                        <span className="text-xs text-slate-400">{draw.drawNo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
