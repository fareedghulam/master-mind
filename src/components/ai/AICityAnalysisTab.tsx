import React, { useState, useMemo } from 'react';
import { LayoutGrid, Download, ArrowLeftRight, Coins, MapPin, Trophy, TrendingUp } from 'lucide-react';
import { PakistanBondResult } from '../../types';
import { PK_BOND_CATEGORIES, normalizeDrawBondValue, computeAnalysisStats, isBondMatchForAnalysis } from '../../utils/bondAnalysisUtils';
import { generateDrawHistoryPDF } from '../../utils/pdfGenerator';

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
  allBondResults?: PakistanBondResult[];
  selectedCityBond?: string;
  setSelectedCityBond?: (bond: string) => void;
}

export const AICityAnalysisTab: React.FC<AICityAnalysisTabProps> = ({
  pkCities,
  selectedCity,
  setSelectedCity,
  cityAnalysisData,
  citySubTab,
  setCitySubTab,
  cityAnalysisType,
  setCityAnalysisType,
  allBondResults = [],
  selectedCityBond = 'all',
  setSelectedCityBond
}) => {
  const [viewMode, setViewMode] = useState<'singleCity' | 'cityComparison'>('singleCity');
  const [city2, setCity2] = useState<string>('لاہور');
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  // Compute City 1 stats from allBondResults with optional bond filter
  const city1Stats = useMemo(() => {
    if (!allBondResults || allBondResults.length === 0) return cityAnalysisData;
    const filtered = allBondResults.filter(d => {
      const matchCity = d.city === selectedCity;
      const matchBond = selectedCityBond === 'all' || isBondMatchForAnalysis(normalizeDrawBondValue(d), selectedCityBond);
      return matchCity && matchBond;
    });
    const computed = computeAnalysisStats(filtered);
    return {
      drawsCount: computed.totalDraws,
      drawsList: filtered,
      open: computed.openFreq,
      close: computed.closeFreq,
      center: computed.centerFreq,
      fourth: computed.fourthFreq,
      akras: computed.topAkras,
      digitOddsPercentage: computed.digitOddsPercentage,
      digitEvensPercentage: computed.digitEvensPercentage,
      firstPrizeOdds: computed.firstPrizeOdds,
      firstPrizeEvens: computed.firstPrizeEvens,
      luckyBond: cityAnalysisData.luckyBond
    };
  }, [allBondResults, selectedCity, selectedCityBond, cityAnalysisData]);

  // Compute City 2 stats for comparison
  const city2Stats = useMemo(() => {
    if (!allBondResults || allBondResults.length === 0) return null;
    const filtered = allBondResults.filter(d => {
      const matchCity = d.city === city2;
      const matchBond = selectedCityBond === 'all' || isBondMatchForAnalysis(normalizeDrawBondValue(d), selectedCityBond);
      return matchCity && matchBond;
    });
    const computed = computeAnalysisStats(filtered);
    return {
      drawsCount: computed.totalDraws,
      drawsList: filtered,
      open: computed.openFreq,
      close: computed.closeFreq,
      center: computed.centerFreq,
      fourth: computed.fourthFreq,
      akras: computed.topAkras,
      topOpen: computed.topOpenDigit,
      topAkra: computed.topAkras[0]?.akra || '--',
      digitOddsPercentage: computed.digitOddsPercentage,
      digitEvensPercentage: computed.digitEvensPercentage
    };
  }, [allBondResults, city2, selectedCityBond]);

  const handleDownload = async () => {
    const listToDownload = city1Stats.drawsList;
    if (!listToDownload || listToDownload.length === 0) {
      setStatusMsg({ text: 'کوئی ریکارڈ موجود نہیں ہے۔', isError: true });
      setTimeout(() => setStatusMsg(null), 4000);
      return;
    }
    const res = await generateDrawHistoryPDF(listToDownload, 'pakistan_bond', {
      bondValue: selectedCityBond,
      city: selectedCity
    });
    if (res.success) {
      setStatusMsg({ text: `شہر ${selectedCity} کی پی ڈی ایف رپورٹ کامیابی سے محفوظ کر لی گئی ہے!`, isError: false });
      setTimeout(() => setStatusMsg(null), 4000);
    } else {
      setStatusMsg({ text: res.error || 'پی ڈی ایف بنانے میں خرابی پیش آئی۔', isError: true });
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

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
                شہر کے لحاظ سے پرائز بانڈز کے فرسٹ انعامات کا مکمل ریکارڈ، بانڈ ویلیو فلٹر اور شہر بمقابلہ شہر تقابل
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleDownload}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-sm shadow-amber-500/10 cursor-pointer transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>شہر کا پی ڈی ایف رپورٹ ڈاؤن لوڈ کریں</span>
            </button>
          </div>
        </div>

        {statusMsg && (
          <div className={`p-3 mb-5 rounded-xl text-xs text-right border ${statusMsg.isError ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
            {statusMsg.isError ? '⚠️ ' : '✓ '} {statusMsg.text}
          </div>
        )}

        {/* VIEW MODE TOGGLE: SINGLE CITY vs CITY COMPARISON */}
        <div className="flex flex-row-reverse gap-2 mb-6 bg-slate-950/60 p-1.5 rounded-xl border border-slate-900">
          <button
            onClick={() => setViewMode('singleCity')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
              viewMode === 'singleCity'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            شہر کا تفصیلی اینالیسس (Single City Analysis)
          </button>
          <button
            onClick={() => setViewMode('cityComparison')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
              viewMode === 'cityComparison'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>شہر بمقابلہ شہر تقابل (City vs City Comparison)</span>
          </button>
        </div>

        {/* BOND VALUE FILTER FOR CITY ANALYSIS */}
        {setSelectedCityBond && (
          <div className="mb-6 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>شہر کے لیے بانڈ ویلیو فلٹر منتخب کریں (Filter by Bond Value):</span>
              </span>
              <span className="text-[10px] text-amber-400 font-mono font-bold">
                منتخب: {selectedCityBond === 'all' ? 'تمام بانڈز' : selectedCityBond}
              </span>
            </div>

            <div className="flex flex-row-reverse flex-wrap gap-1.5">
              {PK_BOND_CATEGORIES.map((bond) => {
                const isSelected = selectedCityBond === bond.value;
                return (
                  <button
                    key={bond.value}
                    onClick={() => setSelectedCityBond(bond.value)}
                    className={`py-1 px-2.5 rounded-lg text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/10'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {bond.labelUrdu}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 10 CITIES GRID SELECTOR (Primary City) */}
        <div className="mb-6">
          <label className="block text-right text-xs font-bold text-slate-400 mb-3">
            {viewMode === 'cityComparison' ? 'پہلا شہر منتخب کریں (Select City 1):' : 'شہر منتخب کریں (Select City for Records & Stats):'}
          </label>
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

        {/* CITY COMPARISON VIEW */}
        {viewMode === 'cityComparison' && city2Stats && (
          <div className="space-y-6 mb-6">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 text-right">
              <label className="block text-right text-xs font-bold text-slate-400 mb-3">
                دوسرا تقابلی شہر منتخب کریں (Select City 2 to Compare):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {pkCities.map((city) => {
                  const isSelected = city2 === city.nameUrdu;
                  return (
                    <button
                      key={`comp-${city.code}`}
                      onClick={() => setCity2(city.nameUrdu)}
                      className={`py-2 px-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-sky-500 border-sky-400 text-slate-950 shadow-md font-bold'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-xs">{city.nameUrdu}</span>
                      <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                        {city.nameEng}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SIDE BY SIDE COMPARISON MATRIX */}
            <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-sky-400 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>شہر 2: {city2}</span>
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  موازنہ کارڈ (Comparative Analysis)
                </span>
                <span className="text-sm font-bold text-amber-400 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>شہر 1: {selectedCity}</span>
                </span>
              </div>

              <div className="space-y-3">
                {/* Metric: Total Draws */}
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <span className="font-mono text-sm font-bold text-sky-400">{city2Stats.drawsCount} ڈراز</span>
                  <span className="text-slate-400 font-bold">کل قرعہ اندازیاں (Total Draws)</span>
                  <span className="font-mono text-sm font-bold text-amber-400">{city1Stats.drawsCount} ڈراز</span>
                </div>

                {/* Metric: Top Open Digit */}
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <span className="font-mono text-sm font-bold text-sky-400">{city2Stats.topOpen}</span>
                  <span className="text-slate-400 font-bold">ہاٹ اوپن ہندسہ (Hot Open)</span>
                  <span className="font-mono text-sm font-bold text-amber-400">
                    {[...city1Stats.open].sort((a, b) => b.count - a.count)[0]?.value || '7'}
                  </span>
                </div>

                {/* Metric: Top Akra */}
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <span className="font-mono text-sm font-bold text-sky-400">{city2Stats.topAkra}</span>
                  <span className="text-slate-400 font-bold">ٹاپ آکڑا جوڑی (Top Akra)</span>
                  <span className="font-mono text-sm font-bold text-amber-400">{city1Stats.akras[0]?.akra || '--'}</span>
                </div>

                {/* Metric: Odd/Even */}
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <span className="font-mono text-xs font-bold text-sky-400">
                    {city2Stats.digitOddsPercentage}% / {city2Stats.digitEvensPercentage}%
                  </span>
                  <span className="text-slate-400 font-bold">طاق بمقابلہ جفت (Odd vs Even)</span>
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {city1Stats.digitOddsPercentage}% / {city1Stats.digitEvensPercentage}%
                  </span>
                </div>
              </div>

              {/* Comparison Verdict */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-right text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong>خلاصہ موازنہ:</strong> شہر <strong>{selectedCity}</strong> میں کل {city1Stats.drawsCount} ڈراز ہوئے جبکہ شہر <strong>{city2}</strong> میں {city2Stats.drawsCount} ڈراز ہوئے۔ دونوں شہروں کے مابین ہندساتی فلو اور آکڑا روٹینز کو دیکھ کر آپ اپنے اگلے لکی نمبر کا درست انتخاب کر سکتے ہیں۔
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SINGLE CITY VIEW STATS & DETAILS */}
        {viewMode === 'singleCity' && (
          <>
            {/* CITY STATS SUMMARY HIGHLIGHTS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-500 block uppercase font-bold text-center">کل ریکارڈز (Analyzed Draws)</span>
                <span className="font-mono text-base font-bold text-white block mt-1 text-center">{city1Stats.drawsCount} Draws</span>
                {selectedCityBond !== 'all' && (
                  <span className="text-[9px] text-amber-400 font-mono block mt-0.5">{selectedCityBond}</span>
                )}
              </div>
              
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-500 block uppercase font-bold text-center">لکیسٹ بانڈ (Hot Bond Category)</span>
                <span className="font-mono text-sm font-bold text-emerald-400 block mt-1 text-center">
                  {city1Stats.luckyBond === '15000' ? 'Rs. 15,000' : 
                   city1Stats.luckyBond === '7500' ? 'Rs. 7,500' :
                   city1Stats.luckyBond === '1500' ? 'Rs. 1,500' :
                   city1Stats.luckyBond === '750' ? 'Rs. 750' :
                   city1Stats.luckyBond === '200' ? 'Rs. 200' :
                   city1Stats.luckyBond === '40000' ? 'Rs. 40,000' : 'Rs. 15,000'}
                </span>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-500 block uppercase font-bold text-center">طاق بمقابلہ جفت (Odd vs Even)</span>
                <span className="font-mono text-base font-bold text-amber-400 block mt-1 text-center">
                  {city1Stats.digitOddsPercentage}% / {city1Stats.digitEvensPercentage}%
                </span>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-500 block uppercase font-bold text-center">مقبول ترین آکڑا (Top Akra)</span>
                <span className="font-mono text-base font-bold text-sky-400 block mt-1 text-center">
                  {city1Stats.akras[0] ? `${city1Stats.akras[0].akra} (${city1Stats.akras[0].count}x)` : '78'}
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
                          const list = cityAnalysisType === 'open' ? city1Stats.open :
                                       cityAnalysisType === 'close' ? city1Stats.close :
                                       cityAnalysisType === 'center' ? city1Stats.center :
                                       cityAnalysisType === 'fourth' ? city1Stats.fourth : [];
                          
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
                          const list = cityAnalysisType === 'open' ? city1Stats.open :
                                       cityAnalysisType === 'close' ? city1Stats.close :
                                       cityAnalysisType === 'center' ? city1Stats.center :
                                       cityAnalysisType === 'fourth' ? city1Stats.fourth : [];

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
                                  />
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

                        {city1Stats.akras.length === 0 ? (
                          <p className="text-center text-xs text-slate-500 py-6">ڈیٹا موجود نہیں ہے۔</p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {city1Stats.akras.slice(0, 10).map((item, idx) => {
                              const firstAkraCount = city1Stats.akras[0]?.count || 1;
                              const pctOfMax = Math.round((item.count / firstAkraCount) * 100);
                              
                              return (
                                <div key={item.akra} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                                  <div className="flex items-center gap-1.5">
                                    <span className="bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded text-[9px] font-mono">Rank {idx + 1}</span>
                                    <span className="text-slate-400 font-mono">({item.count} بار)</span>
                                  </div>

                                  <div className="flex-1 mx-3 bg-slate-950 h-2 rounded-full overflow-hidden">
                                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${pctOfMax}%` }} />
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
                            {city1Stats.digitOddsPercentage}% / {city1Stats.digitEvensPercentage}%
                          </span>
                        </div>

                        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center">
                          <h5 className="text-[11px] font-bold text-slate-400 mb-2">طاق بمقابلہ جفت ڈراز</h5>
                          <span className="font-mono text-xl font-bold text-emerald-400 block">
                            {city1Stats.firstPrizeOdds} / {city1Stats.firstPrizeEvens}
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
                    <span className="font-mono text-amber-400 font-bold">{city1Stats.drawsCount} Record(s)</span>
                    <span>شہر {selectedCity} کی قرعہ اندازی کا ریکارڈ:</span>
                  </h4>

                  {city1Stats.drawsList.length === 0 ? (
                    <p className="text-center text-xs text-slate-500 py-8">شہر {selectedCity} کا کوئی ریکارڈ نہیں ملا۔</p>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                      {city1Stats.drawsList.map((draw) => (
                        <div key={draw.id} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 text-right space-y-2">
                          <div className="flex justify-between items-center border-b border-slate-800/60 pb-2 text-xs">
                            <span className="text-[11px] text-slate-400 font-mono">{draw.date}</span>
                            <span className="font-bold text-amber-400 font-mono">{draw.bondValue || normalizeDrawBondValue(draw)}</span>
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
          </>
        )}

      </div>
    </div>
  );
};
