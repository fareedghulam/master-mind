import React from 'react';
import { DrawDeadline, DrawCategory } from '../../types';
import { Clock, Sparkles } from 'lucide-react';

interface BookingDrawHeaderProps {
  category: DrawCategory | 'unified';
  pageTitleUrdu: string;
  pageTitleEnglish: string;
  isTimeUp: boolean;
  activeDraw: DrawDeadline | undefined;
  pakDraws: DrawDeadline[];
  availableDraws?: DrawDeadline[];
  selectedDrawId: string;
  setSelectedDrawId: (id: string) => void;
  timeTicker: number;
  getRemainingTimeString: () => string;
  getFormattedDeadline: (drawObj?: DrawDeadline) => string;
  getFormattedClosedOn: (drawObj?: DrawDeadline) => string;
}

export const BookingDrawHeader: React.FC<BookingDrawHeaderProps> = ({
  category,
  pageTitleUrdu,
  pageTitleEnglish,
  isTimeUp,
  activeDraw,
  pakDraws,
  availableDraws = [],
  selectedDrawId,
  setSelectedDrawId,
  timeTicker,
  getRemainingTimeString,
  getFormattedDeadline,
  getFormattedClosedOn
}) => {
  const displayDraws = availableDraws.length > 0 ? availableDraws : pakDraws;

  return (
    <>
      {/* Dynamic Header Badge and Category Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-4 relative border-b-4 border-amber-500 shadow-md">
        <div className="bg-amber-500 text-slate-950 font-semibold px-4 py-1.5 rounded-full text-xs font-mono order-last md:order-first">
          {pageTitleEnglish}
        </div>
        <div className="text-center md:text-right">
          <h2 className="text-2xl font-bold text-amber-400">{pageTitleUrdu}</h2>
          <p className="text-xs text-slate-300 mt-1">
            اپنی پسند کا نمبر فرسٹ اور سیکنڈ بکنگ کے لئے درج کریں اور رقم والٹ سے ادا کریں۔
          </p>
        </div>
      </div>

      {/* Draw/Booking Deadline Status Banner */}
      <div className={`p-5 rounded-3xl border flex flex-col shadow-sm transition-all ${
        isTimeUp 
          ? 'bg-red-50 border-red-200 text-red-950' 
          : 'bg-emerald-50/70 border-emerald-100 text-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 order-last md:order-first w-full md:w-auto justify-between md:justify-start">
            {isTimeUp ? (
              <div className="flex flex-col gap-1 items-start">
                <div className="bg-red-600 text-white font-bold px-4 py-2 rounded-2xl text-xs animate-pulse flex items-center gap-1.5 shadow-sm shadow-red-500/10">
                  <Clock className="w-4 h-4" />
                  <span>{activeDraw?.bookingStatusUrdu || 'بکنگ پورشن بند ہے (Closed)'}</span>
                </div>
                <div className="text-left mt-2 pl-1">
                  <div className="text-xs font-bold text-red-800">Booking Closed</div>
                  <div className="text-[11px] text-slate-600 font-mono">Closed On: {getFormattedClosedOn()}</div>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-600 text-white font-bold px-4 py-2 rounded-2xl text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-500/10">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span>{activeDraw?.bookingStatusUrdu || 'بکنگ فائنل کھل گئی ہے (Open)'}</span>
              </div>
            )}
          </div>

          <div className="text-center md:text-right space-y-1 w-full md:w-auto">
            <div className="flex items-center justify-center md:justify-end gap-2 text-slate-900 font-bold">
              <span className={isTimeUp ? 'text-red-700' : 'text-slate-800'}>
                {activeDraw?.titleUrdu || 'بکنگ فائنل کھل گئی ہے'}
              </span>
              <Sparkles className={`w-4 h-4 ${isTimeUp ? 'text-red-500' : 'text-amber-500'}`} />
            </div>
            <p className="text-xs text-slate-500">
              بکنگ کا آخری وقت اور تاریخ: <span className="font-semibold text-slate-800">{getFormattedDeadline()}</span>
            </p>
            <div className="text-xs">
              {isTimeUp ? (
                <span className="text-red-600 font-bold block mt-1">بکنگ کا وقت پورا ہو گیا ہے، اس لئے اب کوئی نئی بکنگ یا ڈیمانڈ قبول نہیں کی جا رہی۔</span>
              ) : (
                <span className="text-emerald-700 font-semibold flex items-center justify-center md:justify-end gap-1 block mt-1">
                  <Clock className="w-3.5 h-3.5 inline text-emerald-600" />
                  <span>بکنگ ختم ہونے میں باقی وقت: <strong>{getRemainingTimeString()}</strong></span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Draw Selection & Info Section */}
        <div className="mt-4 pt-4 border-t border-dashed border-slate-300/60">
          <h4 className="text-xs font-bold text-slate-700 mb-2.5 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-normal">
              {displayDraws.length > 0 ? 'بکنگ کے لئے مطلوبہ ڈرا منتخب کریں (Select Active Draw)' : ''}
            </span>
            <span className="flex items-center gap-1.5">
              <span>ڈرا معلومات (Draw Details)</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </span>
          </h4>

          {displayDraws.length > 0 ? (
            <div className="space-y-3">
              <p className="text-[11px] text-amber-800 font-semibold text-right">
                نوٹ: نیچے تمام فعال ڈراز موجود ہیں۔ بکنگ شروع کرنے کے لئے مطلوبہ ڈرا کارڈ پر کلک کریں:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {displayDraws.map((d, idx) => {
                  const drawId = d.id || d.drawId || d.category;
                  const isSelected = selectedDrawId === drawId;
                  const rawDTime = d && d.deadlineIso 
                    ? (typeof d.deadlineIso === 'object' && (d.deadlineIso as any).seconds 
                        ? (d.deadlineIso as any).seconds * 1000 
                        : new Date(d.deadlineIso).getTime()) 
                    : 0;
                  const dTime = isNaN(rawDTime) ? 0 : rawDTime;
                  const dClosed = d.status === 'closed' || (dTime > 0 && timeTicker >= dTime) || d.bookingStatusUrdu === 'بکنگ بند ہے';

                  return (
                    <button
                      key={drawId || idx}
                      type="button"
                      onClick={() => setSelectedDrawId(drawId)}
                      className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/30 shadow-xs'
                          : 'bg-white/90 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          dClosed ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {dClosed ? 'بند (Closed)' : 'کھلا (Open)'}
                        </span>
                        <span className="text-xs font-extrabold text-slate-900 font-mono">
                          {d.category === 'thailand_lottery' ? 'Thailand Lottery' : (d.nextPrizeBondValue ? `Rs. ${d.nextPrizeBondValue}` : 'Pakistan Bond')}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between text-slate-700">
                          <span className="font-bold">{d.nextDrawNumber ? `Draw #${d.nextDrawNumber}` : (d.category === 'thailand_lottery' ? 'Thai Draw' : '---')}</span>
                          <span className="text-slate-500 text-[11px]">ڈرا نمبر:</span>
                        </div>
                        <div className="flex justify-between text-slate-700">
                          <span className="font-semibold">{d.nextDrawDate || '---'}</span>
                          <span className="text-slate-500 text-[11px]">ڈرا تاریخ:</span>
                        </div>
                        <div className="flex justify-between text-slate-700">
                          <span className="font-medium text-slate-600">{d.nextDrawCity || (d.category === 'thailand_lottery' ? 'Bangkok' : '---')}</span>
                          <span className="text-slate-500 text-[11px]">شہر:</span>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-200/50 text-[10px] text-slate-500 flex justify-between items-center">
                        <span className="font-mono text-slate-700 font-semibold">{getFormattedDeadline(d)}</span>
                        <span>آخری وقت:</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-right">
              <div className="p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-xs">
                <span className="block text-[10px] text-slate-500 font-medium mb-0.5">اگلی بانڈ مالیت</span>
                <span className="text-xs font-bold text-slate-800 font-mono">{activeDraw?.nextPrizeBondValue || '---'}</span>
              </div>
              <div className="p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-xs">
                <span className="block text-[10px] text-slate-500 font-medium mb-0.5">اگلا ڈرا شہر</span>
                <span className="text-xs font-bold text-slate-800">{activeDraw?.nextDrawCity || '---'}</span>
              </div>
              <div className="p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-xs">
                <span className="block text-[10px] text-slate-500 font-medium mb-0.5">اگلا ڈرا نمبر</span>
                <span className="text-xs font-bold text-slate-800 font-mono">{activeDraw?.nextDrawNumber || '---'}</span>
              </div>
              <div className="p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-xs">
                <span className="block text-[10px] text-slate-500 font-medium mb-0.5">اگلی ڈرا تاریخ</span>
                <span className="text-xs font-bold text-slate-800 font-mono">{activeDraw?.nextDrawDate || '---'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
