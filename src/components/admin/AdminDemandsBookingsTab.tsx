import React, { useState } from 'react';
import { User, Booking, Demand, DrawCategory } from '../../types';
import { Sparkles, Clock, Search, Trash, Check, X, FileText, Filter } from 'lucide-react';
import { generateAdminBookingsPDF } from '../../utils/pdfGenerator';

interface AdminDemandsBookingsTabProps {
  users: User[];
  demands: Demand[];
  bookings: Booking[];
  demandError: string;
  demandSuccess: string;
  cancelError: string;
  cancelSuccess: string;
  onApproveDemand: (id: string) => Promise<{ success: boolean; error?: string }>;
  onRejectDemand: (id: string) => Promise<{ success: boolean; error?: string }>;
  onCancelBookingByAdmin: (bookingId: string) => Promise<{ success: boolean; error?: string }>;
  safeGetTime: (val: any) => number;
  safeFormatDate: (val: any, locale?: string, options?: Intl.DateTimeFormatOptions) => string;
}

export const AdminDemandsBookingsTab: React.FC<AdminDemandsBookingsTabProps> = ({
  users,
  demands,
  bookings,
  demandError,
  demandSuccess,
  cancelError,
  cancelSuccess,
  onApproveDemand,
  onRejectDemand,
  onCancelBookingByAdmin,
  safeGetTime,
  safeFormatDate
}) => {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'pakistan_bond' | 'thailand_lottery'>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [bookingSearchQuery, setBookingSearchQuery] = useState('');
  const [pdfStatus, setPdfStatus] = useState<{ text: string; isError?: boolean } | null>(null);

  // Extract unique dates for filtering
  const availableDates = Array.from(
    new Set(bookings.map(b => b.drawDate).filter(Boolean) as string[])
  );

  const handleApprove = async (id: string, num: string) => {
    if (window.confirm(`کیا آپ نمبر #${num} کی ڈیمانڈ منظور کرنا چاہتے ہیں؟`)) {
      await onApproveDemand(id);
    }
  };

  const handleReject = async (id: string, num: string) => {
    if (window.confirm(`کیا آپ نمبر #${num} کی ڈیمانڈ مسترد کرنا چاہتے ہیں؟`)) {
      await onRejectDemand(id);
    }
  };

  const handleCancelBookingClick = async (bookingId: string, number: string) => {
    if (window.confirm(`کیا آپ واقعی نمبر #${number} کی بکنگ منسوخ کر کے رقم کسٹمر کے والٹ میں واپس منتقل کرنا چاہتے ہیں؟`)) {
      await onCancelBookingByAdmin(bookingId);
    }
  };

  // Filter bookings for table display & PDF generation
  const getFilteredBookings = () => {
    return bookings.filter((b) => {
      const matchesCategory = categoryFilter === 'all' || b.category === categoryFilter;
      const matchesDate = dateFilter === 'all' || b.drawDate === dateFilter;
      const matchesArchived = showArchived ? true : !b.isArchived;
      const matchesSearch =
        !bookingSearchQuery ||
        b.number.includes(bookingSearchQuery) ||
        (b.userEmail || '').toLowerCase().includes(bookingSearchQuery.toLowerCase());
      return matchesCategory && matchesDate && matchesArchived && matchesSearch;
    }).sort((a, b) => safeGetTime(b.timestamp) - safeGetTime(a.timestamp));
  };

  const handleExportPDF = (filterType: 'draw' | 'date' | 'all') => {
    const listToExport = getFilteredBookings();
    if (listToExport.length === 0) {
      setPdfStatus({ text: 'ایکسپورٹ کے لئے لسٹ میں کوئی بکنگ موجود نہیں ہے۔', isError: true });
      setTimeout(() => setPdfStatus(null), 4000);
      return;
    }
    const title = filterType === 'date' 
      ? `Date_${dateFilter}` 
      : filterType === 'draw' 
        ? `Category_${categoryFilter}` 
        : 'All_Bookings';
    const res = generateAdminBookingsPDF(title, listToExport, filterType, dateFilter !== 'all' ? dateFilter : categoryFilter);
    if (res.success) {
      setPdfStatus({ text: 'ایڈمن پی ڈی ایف رپورٹ کامیابی سے تیار اور ڈاؤن لوڈ کر دی گئی ہے!', isError: false });
      setTimeout(() => setPdfStatus(null), 4000);
    } else {
      setPdfStatus({ text: res.error || 'پی ڈی ایف بنانے میں خرابی پیش آئی۔', isError: true });
      setTimeout(() => setPdfStatus(null), 4000);
    }
  };

  return (
    <>
      {/* Incoming Demands Control Panel Module */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
        <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2">
          <span>موصولہ ڈیمانڈز کا پینل (Incoming Demands Approval)</span>
          <Sparkles className="w-5 h-5 text-amber-500" />
        </h4>

        {demandError && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right">
            ⚠️ {demandError}
          </div>
        )}
        {demandSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right">
            ✓ {demandSuccess}
          </div>
        )}

        {demands.length === 0 ? (
          <p className="text-slate-400 text-xs text-center py-6">کوئی ڈیمانڈ موصول نہیں ہوئی۔</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="py-2.5 px-3 font-semibold text-slate-600 text-left">اقدام (Action)</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-600">حیثیت</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-600">میزان رقم</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-600">فرسٹ/سیکنڈ</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-600">نمبر (No)</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-600">کیٹیگری</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-600 text-right">کسٹمر تفصیل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {demands.map((d) => {
                  const customer = users.find(u => (u.email || '').toLowerCase() === (d.userEmail || '').toLowerCase());
                  return (
                    <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-3 text-left">
                        {d.status === 'pending' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleReject(d.id, d.number)}
                              className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 border border-red-200 cursor-pointer text-[10px]"
                            >
                              <X className="w-3 h-3" />
                              <span>مسترد</span>
                            </button>
                            <button
                              onClick={() => handleApprove(d.id, d.number)}
                              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 border border-emerald-200 cursor-pointer text-[10px]"
                            >
                              <Check className="w-3 h-3" />
                              <span>منظور</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-sans italic">حل شدہ (Processed)</span>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        {d.status === 'pending' && <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">زیرِ غور ⏳</span>}
                        {d.status === 'approved' && <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">منظور شدہ ✓</span>}
                        {d.status === 'rejected' && <span className="text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full border border-red-200">مسترد ✗</span>}
                      </td>

                      <td className="py-3 px-3 font-mono font-semibold text-slate-700">
                        Rs. {(d.firstAmount + d.secondAmount).toLocaleString()}
                      </td>

                      <td className="py-3 px-3 font-mono text-slate-550 text-xs">
                        F: {d.firstAmount} / S: {d.secondAmount}
                      </td>

                      <td className="py-3 px-3 font-mono font-bold text-red-600 text-sm">
                        {d.number}
                      </td>

                      <td className="py-3 px-3 text-slate-600 text-xs font-semibold">
                        {d.category === 'pakistan_bond' ? 'پاکستان بانڈ' : 'تھائی لاٹری'}
                      </td>

                      <td className="py-3 px-3 text-right">
                        <span className="font-semibold block text-slate-800">{customer?.name || 'نامعلوم'}</span>
                        <span className="text-[10px] text-slate-400 font-mono block">{d.userEmail}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Master Booking Control Panel Module */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === 'all' ? 'bg-slate-900 text-amber-400 font-bold' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              تمام بکنگز ({bookings.length})
            </button>
            <button
              onClick={() => setCategoryFilter('pakistan_bond')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === 'pakistan_bond' ? 'bg-slate-900 text-amber-400 font-bold' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              پاکستان بانڈ ({bookings.filter(b => b.category === 'pakistan_bond').length})
            </button>
            <button
              onClick={() => setCategoryFilter('thailand_lottery')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === 'thailand_lottery' ? 'bg-slate-900 text-amber-400 font-bold' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              تھائی لینڈ لاٹری ({bookings.filter(b => b.category === 'thailand_lottery').length})
            </button>
          </div>

          <h4 className="text-base font-bold text-slate-800 flex items-center justify-end gap-2">
            <span>تمام کسٹمرز کی بکنگز کا پینل (Master Booking Control)</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </h4>
        </div>

        {/* Filters and PDF Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative md:col-span-1">
            <input
              type="text"
              placeholder="کسٹمر ای میل یا نمبر تلاش کریں..."
              value={bookingSearchQuery}
              onChange={(e) => setBookingSearchQuery(e.target.value)}
              className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-2.5 pl-4 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans text-right"
            >
              <option value="all">تمام تاریخیں (All Dates)</option>
              {availableDates.map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end gap-2">
            <label className="text-xs text-slate-600 font-medium flex items-center gap-1.5 cursor-pointer">
              <span>آرکائیو شدہ بکنگز دکھائیں</span>
              <input
                type="checkbox"
                checked={showArchived}
                onChange={(e) => setShowArchived(e.target.checked)}
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
            </label>
          </div>
        </div>

        {/* PDF Export Status Notification */}
        {pdfStatus && (
          <div className={`p-3 rounded-2xl text-xs text-right border ${pdfStatus.isError ? 'bg-red-50 border-red-100 text-red-700' : 'bg-emerald-50 border-emerald-100 text-emerald-800'}`}>
            {pdfStatus.isError ? '⚠️ ' : '✓ '} {pdfStatus.text}
          </div>
        )}

        {/* PDF Export Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-600 ml-2">پی ڈی ایف دیکھیں/ڈاؤن لوڈ کریں (PDF Reports):</span>
          <button
            onClick={() => handleExportPDF('draw')}
            className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF برائے ڈرا / کیٹیگری</span>
          </button>
          <button
            onClick={() => handleExportPDF('date')}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF برائے تاریخ ({dateFilter !== 'all' ? dateFilter : 'منتخب تاریخ'})</span>
          </button>
          <button
            onClick={() => handleExportPDF('all')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>تمام فلٹر شدہ بکنگز PDF</span>
          </button>
        </div>

        {cancelError && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right">
            ⚠️ {cancelError}
          </div>
        )}
        {cancelSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right font-sans">
            ✓ {cancelSuccess}
          </div>
        )}

        {(() => {
          const filteredBookings = getFilteredBookings();

          if (filteredBookings.length === 0) {
            return <p className="text-slate-400 text-xs text-center py-6 font-sans">کوئی بکنگ ریکارڈ نہیں ملا۔</p>;
          }

          return (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="py-2.5 px-3 font-semibold text-slate-600 text-left">منسوخ کریں (Cancel)</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600 font-mono text-[10px]">ٹائم اسٹیمپ</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600">کل لاگت</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600">سیکنڈ</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600">فرسٹ</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600">بک شدہ نمبر</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600">کیٹیگری</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600 text-right">کسٹمر تفصیل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map((b) => {
                    const customer = users.find(u => (u.email || '').toLowerCase() === (b.userEmail || '').toLowerCase());
                    return (
                      <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-3 text-left">
                          <button
                            onClick={() => handleCancelBookingClick(b.id, b.number)}
                            className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 border border-red-200 cursor-pointer text-[10px]"
                          >
                            <Trash className="w-3 h-3" />
                            <span>منسوخ کریں</span>
                          </button>
                        </td>

                        <td className="py-3 px-3 text-slate-400 font-mono text-[10px]">
                          {safeFormatDate(b.timestamp, 'en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>

                        <td className="py-3 px-3 font-mono font-semibold text-slate-700">
                          Rs. {(b.firstAmount + b.secondAmount).toLocaleString()}
                        </td>

                        <td className="py-3 px-3 font-mono text-slate-550 text-xs">
                          Rs. {b.secondAmount.toLocaleString()}
                        </td>

                        <td className="py-3 px-3 font-mono text-slate-550 text-xs">
                          Rs. {b.firstAmount.toLocaleString()}
                        </td>

                        <td className="py-3 px-3 font-mono font-bold text-red-600 text-sm">
                          {b.number}
                        </td>

                        <td className="py-3 px-3 text-slate-600 text-xs font-semibold">
                          <div>{b.category === 'pakistan_bond' ? 'پاکستان بانڈ' : 'تھائی لاٹری'}</div>
                          {b.category === 'pakistan_bond' && (b.bondValue || b.drawNumber || b.drawDate) && (
                            <div className="text-[10px] text-amber-700 font-mono mt-0.5">
                              {b.bondValue && <span>{b.bondValue} </span>}
                              {b.drawNumber && <span>| ڈرا #{b.drawNumber} </span>}
                              {b.drawDate && <span>| {b.drawDate}</span>}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-3 text-right">
                          <span className="font-semibold block text-slate-800">{customer?.name || 'نامعلوم'}</span>
                          <span className="text-[10px] text-slate-400 font-mono block">{b.userEmail}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })()}
      </div>
    </>
  );
};
