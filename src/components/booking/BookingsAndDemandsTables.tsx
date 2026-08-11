import React from 'react';
import { Booking, Demand, DrawCategory } from '../../types';
import { Download, Trash2, Clock, Sparkles } from 'lucide-react';

interface BookingsAndDemandsTablesProps {
  category: DrawCategory;
  filterBookings: Booking[];
  filterDemands: Demand[];
  timeTicker: number;
  handleDownloadPDF: () => void;
  handleCancelClick: (id: string, number: string) => void;
}

export const BookingsAndDemandsTables: React.FC<BookingsAndDemandsTablesProps> = ({
  category,
  filterBookings,
  filterDemands,
  timeTicker,
  handleDownloadPDF,
  handleCancelClick
}) => {
  return (
    <div className="space-y-6">
      {/* Booked Numbers List Underlying Sheet */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pb-4 border-b border-slate-100 mb-6">
          <button
            id="download-pdf-btn"
            onClick={handleDownloadPDF}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-500/10 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>بکنگ لسٹ پی ڈی ایف ڈاؤن لوڈ (Save PDF)</span>
          </button>

          <h3 className="text-base sm:text-lg font-bold text-slate-800 text-center sm:text-right">
            بک شدہ نمبرز کی لسٹ (Booked Numbers Sheet)
          </h3>
        </div>

        {filterBookings.length === 0 ? (
          <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-150">
            <p className="text-slate-400 text-sm">اس لسٹ میں ابھی کوئی نمبر بک نہیں کیا گیا ہے۔</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200">
                  <th className="py-3 px-4 font-semibold text-slate-600 text-left">منسوخی (Action)</th>
                  <th className="py-3 px-4 font-semibold text-slate-600 font-mono text-[11px]">بکنگ کا وقت (Time)</th>
                  {category === 'pakistan_bond' && (
                    <th className="py-3 px-4 font-semibold text-slate-600 text-right">بانڈ / ڈرا معلومات</th>
                  )}
                  <th className="py-3 px-4 font-semibold text-slate-600">میزان رقم</th>
                  <th className="py-3 px-4 font-semibold text-slate-600">سیکنڈ (Second)</th>
                  <th className="py-3 px-4 font-semibold text-slate-600">فرسٹ (First)</th>
                  <th className="py-3 px-4 font-semibold text-slate-600 text-right">بک نمبر (No)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filterBookings.map((b) => {
                  const bTime = (() => {
                    if (!b.timestamp) return Date.now();
                    try {
                      const dateObj = typeof b.timestamp === 'object' && (b.timestamp as any).seconds 
                        ? new Date((b.timestamp as any).seconds * 1000) 
                        : new Date(b.timestamp);
                      const t = dateObj.getTime();
                      return isNaN(t) ? Date.now() : t;
                    } catch {
                      return Date.now();
                    }
                  })();
                  const diffMs = timeTicker - bTime;
                  const remainingMs = Math.max(0, (2 * 60 * 1000) - diffMs);
                  const canCancel = remainingMs > 0;
                  const secondsLeft = Math.floor(remainingMs / 1000);

                  const drawText = [
                    b.bondValue ? (b.bondValue.startsWith('Rs') ? b.bondValue : `Rs. ${b.bondValue}`) : '',
                    b.drawNumber ? (b.drawNumber.includes('Draw') ? b.drawNumber : `Draw #${b.drawNumber}`) : '',
                    b.drawCity || '',
                    b.drawDate || ''
                  ].filter(Boolean).join(' | ');

                  const formattedTime = (() => {
                    if (!b.timestamp) return '---';
                    try {
                      const dateObj = typeof b.timestamp === 'object' && (b.timestamp as any).seconds 
                        ? new Date((b.timestamp as any).seconds * 1000) 
                        : new Date(b.timestamp);
                      if (isNaN(dateObj.getTime())) return '---';
                      return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    } catch {
                      return '---';
                    }
                  })();

                  const firstAmt = typeof b.firstAmount === 'number' && !isNaN(b.firstAmount) ? b.firstAmount : 0;
                  const secondAmt = typeof b.secondAmount === 'number' && !isNaN(b.secondAmount) ? b.secondAmount : 0;
                  const totalAmt = firstAmt + secondAmt;

                  return (
                    <tr key={b.id || Math.random()} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 text-left">
                        {canCancel ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleCancelClick(b.id, b.number)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg hover:text-red-700 transition-all cursor-pointer flex items-center justify-center gap-1"
                              title="کینسل کریں"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <span className="font-mono text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 leading-none">
                              <Clock className="w-2.5 h-2.5 animate-pulse" />
                              <span>{secondsLeft}s left</span>
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-mono italic">منجمد (Locked)</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-slate-400 font-mono text-left">
                        {formattedTime}
                      </td>

                      {category === 'pakistan_bond' && (
                        <td className="py-3 px-4 font-mono text-xs text-slate-700 font-semibold text-right">
                          {drawText || '---'}
                        </td>
                      )}

                      <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                        Rs. {totalAmt.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-550">
                        Rs. {secondAmt.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-550">
                        Rs. {firstAmt.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-red-650 text-base">
                        {b.number || '---'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sent Demands List Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pb-4 border-b border-slate-100 mb-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 text-center sm:text-right flex items-center justify-end gap-1.5 w-full sm:w-auto">
            <span>میری بھیجی گئی ڈیمانڈز (My Sent Demands)</span>
            <Sparkles className="w-4.5 h-4.5 text-amber-500" />
          </h3>
          <p className="text-[11px] text-slate-400">500 روپے سے زائد گیمز کی ڈیمانڈز اور ان کی موجودہ حالت</p>
        </div>

        {filterDemands.length === 0 ? (
          <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-150">
            <p className="text-slate-400 text-sm">فی الحال کوئی ڈیمانڈ موجود نہیں ہے۔</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200">
                  <th className="py-3 px-4 font-semibold text-slate-600 text-left">حیثیت (Status)</th>
                  <th className="py-3 px-4 font-semibold text-slate-600 font-mono text-[11px]">بکنگ کا وقت (Time)</th>
                  <th className="py-3 px-4 font-semibold text-slate-600">میزان رقم</th>
                  <th className="py-3 px-4 font-semibold text-slate-600">سیکنڈ (Second)</th>
                  <th className="py-3 px-4 font-semibold text-slate-600">فرسٹ (First)</th>
                  <th className="py-3 px-4 font-semibold text-slate-600 text-right">بک نمبر (No)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filterDemands.map((d) => {
                  const formattedTime = (() => {
                    if (!d.timestamp) return '---';
                    try {
                      const dateObj = typeof d.timestamp === 'object' && (d.timestamp as any).seconds 
                        ? new Date((d.timestamp as any).seconds * 1000) 
                        : new Date(d.timestamp);
                      if (isNaN(dateObj.getTime())) return '---';
                      return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    } catch {
                      return '---';
                    }
                  })();

                  const firstAmt = typeof d.firstAmount === 'number' && !isNaN(d.firstAmount) ? d.firstAmount : 0;
                  const secondAmt = typeof d.secondAmount === 'number' && !isNaN(d.secondAmount) ? d.secondAmount : 0;
                  const totalAmt = firstAmt + secondAmt;

                  return (
                    <tr key={d.id || Math.random()} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 text-left">
                        {d.status === 'pending' && (
                          <span className="font-semibold text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-200 inline-block">
                            انتظار ⏳ (Pending)
                          </span>
                        )}
                        {d.status === 'approved' && (
                          <span className="font-semibold text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200 inline-block">
                            منظور شدہ ✓ (Approved)
                          </span>
                        )}
                        {d.status === 'rejected' && (
                          <span className="font-semibold text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded-full border border-red-200 inline-block">
                            مسترد شدہ ✗ (Rejected)
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-slate-400 font-mono text-left">
                        {formattedTime}
                      </td>

                      <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                        Rs. {totalAmt.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-550">
                        Rs. {secondAmt.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-550">
                        Rs. {firstAmt.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-slate-800 text-base">
                        {d.number || '---'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
