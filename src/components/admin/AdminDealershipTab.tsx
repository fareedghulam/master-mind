import React, { useState, useMemo } from 'react';
import { User, DealerBooking, DrawCategory } from '../../types';
import { generateDealerBookingsPDF } from '../../utils/pdfGenerator';
import { 
  Building2, 
  Users, 
  Search, 
  UserCheck, 
  UserMinus, 
  Calendar, 
  Clock, 
  Wallet, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Hash,
  Award,
  FileText
} from 'lucide-react';

interface AdminDealershipTabProps {
  dealers: User[];
  allUsers: User[];
  dealerBookings: DealerBooking[];
  onAssignDealer: (uid: string, enableDealer: boolean) => Promise<{ success: boolean; error?: string }>;
  onCancelDealerBookingByAdmin: (bookingId: string) => Promise<{ success: boolean; error?: string }>;
}

export const AdminDealershipTab: React.FC<AdminDealershipTabProps> = ({
  dealers,
  allUsers,
  dealerBookings,
  onAssignDealer,
  onCancelDealerBookingByAdmin
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'dealers' | 'bookings'>('dealers');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [bookingSearchQuery, setBookingSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | DrawCategory>('all');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Search in all users to assign dealer role
  const eligibleUsers = useMemo(() => {
    const q = userSearchQuery.trim().toLowerCase();
    if (!q) return allUsers.filter(u => u.role !== 'superAdmin' && u.role !== 'dataEntryAdmin');
    return allUsers.filter(u => 
      (u.name?.toLowerCase().includes(q) ||
       u.email?.toLowerCase().includes(q) ||
       u.phone?.toLowerCase().includes(q) ||
       u.city?.toLowerCase().includes(q)) &&
      u.role !== 'superAdmin' &&
      u.role !== 'dataEntryAdmin'
    );
  }, [allUsers, userSearchQuery]);

  // Filtered dealer bookings
  const filteredBookings = useMemo(() => {
    return dealerBookings.filter(b => {
      // Archived dealer bookings belong to completed/old draws
      // and must not appear in the active Dealer Bookings list.
      if (b.isArchived === true) return false;

      const matchCategory = categoryFilter === 'all' || b.category === categoryFilter;
      const q = bookingSearchQuery.trim().toLowerCase();
      const matchSearch = !q || 
        b.number?.includes(q) || 
        b.dealerName?.toLowerCase().includes(q) || 
        b.dealerEmail?.toLowerCase().includes(q) ||
        b.id?.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [dealerBookings, categoryFilter, bookingSearchQuery]);

  const handleRoleToggle = async (user: User, makeDealer: boolean) => {
    if (!user.uid) return;
    setActionLoading(user.uid);
    setStatusMessage(null);
    try {
      const res = await onAssignDealer(user.uid, makeDealer);
      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: makeDealer 
            ? `صارف ${user.name || user.email} کو کامیابی سے ڈیلر بنا دیا گیا ہے۔` 
            : `صارف ${user.name || user.email} سے ڈیلر رول واپس لے لیا گیا ہے۔`
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: res.error || 'ڈیلر رول تبدیل کرنے میں ناکامی۔'
        });
      }
    } catch (e: any) {
      setStatusMessage({
        type: 'error',
        text: e.message || 'غیر متوقع خرابی پیش آئی۔'
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleBookingCancel = async (booking: DealerBooking) => {
    if (!confirm(`کیا آپ واقعی ڈیلر ${booking.dealerName} کی بکنگ #${booking.number} منسوخ کر کے رقم واپس کرنا چاہتے ہیں؟`)) {
      return;
    }
    setActionLoading(booking.id);
    setStatusMessage(null);
    try {
      const res = await onCancelDealerBookingByAdmin(booking.id);
      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: `ڈیلر بکنگ #${booking.number} منسوخ کر کے رقم ڈیلر کے والٹ میں واپس منتقل کر دی گئی ہے۔`
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: res.error || 'بکنگ منسوخ کرنے میں ناکامی۔'
        });
      }
    } catch (e: any) {
      setStatusMessage({
        type: 'error',
        text: e.message || 'غیر متوقع خرابی پیش آئی۔'
      });
    } finally {
      setActionLoading(null);
    }
  };

  const categoryNameMap: Record<DrawCategory, string> = {
    pakistan_bond: 'پاکستان پرائز بانڈ',
    thailand_lottery: 'تھائی لینڈ لاٹری'
  };

    const handleDealerBookingsPDF = async () => {
      const label =
        categoryFilter === 'all'
          ? 'All_Dealer_Bookings'
          : categoryNameMap[categoryFilter];

      const result = await generateDealerBookingsPDF(
        label,
        filteredBookings,
        categoryFilter === 'all' ? 'all' : 'category',
        label
      );

      if (result.success) {
        setStatusMessage({
          type: 'success',
          text: 'ڈیلر بکنگز کی PDF رپورٹ کامیابی سے تیار کر دی گئی ہے۔'
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: result.error || 'ڈیلر بکنگز کی PDF بنانے میں ناکامی ہوئی۔'
        });
      }
    };


  return (
    <div className="space-y-6">
      {/* Sub Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            id="subtab-dealers-list-btn"
            type="button"
            onClick={() => setActiveSubTab('dealers')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'dealers'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>ڈیلرز کی فہرست ({dealers.length})</span>
          </button>

          <button
            id="subtab-dealer-bookings-btn"
            type="button"
            onClick={() => setActiveSubTab('bookings')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'bookings'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>ڈیلر بکنگز ({dealerBookings.length})</span>
          </button>
        </div>

        <div className="text-right text-xs text-slate-500 font-semibold px-2">
          {activeSubTab === 'dealers' ? 'مجاز ڈیلرز اور اختیارات' : 'صرف ڈیلرز کے کھاتے سے کی گئی بکنگز'}
        </div>
      </div>

      {/* Status Notifications */}
      {statusMessage && (
        <div className={`p-4 rounded-2xl border flex items-center justify-end gap-2 text-xs sm:text-sm font-sans ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <span>{statusMessage.text}</span>
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
        </div>
      )}

      {/* SUB TAB 1: DEALERS MANAGEMENT */}
      {activeSubTab === 'dealers' && (
        <div className="space-y-6">
          {/* Active Dealers Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1 text-right">
              <span className="text-xs font-semibold text-slate-500">کل رجسٹرڈ ڈیلرز</span>
              <div className="text-2xl font-black text-slate-900 font-mono">{dealers.length}</div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1 text-right">
              <span className="text-xs font-semibold text-slate-500">ڈیلر بکنگز کی تعداد</span>
              <div className="text-2xl font-black text-amber-600 font-mono">{dealerBookings.length}</div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1 text-right">
              <span className="text-xs font-semibold text-slate-500">ڈیلرز کا مجموعی والٹ بیلنس</span>
              <div className="text-2xl font-black text-emerald-600 font-mono">
                Rs. {dealers.reduce((sum, d) => sum + (d.balance || 0), 0).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Search and User List */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-500" />
                <span>ڈیلرشپ تفویض اور کنٹرول (Dealers Management)</span>
              </h3>

              <div className="w-full sm:w-80 relative">
                <input
                  type="text"
                  placeholder="نام، ای میل، موبائل یا شہر تلاش کریں..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 pr-10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>
            </div>

            {/* Dealers Table / List */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-100">
                    <th className="py-3.5 px-4 font-bold">ڈیلر ایکشن</th>
                    <th className="py-3.5 px-4 font-bold">والٹ بیلنس</th>
                    <th className="py-3.5 px-4 font-bold">شہر</th>
                    <th className="py-3.5 px-4 font-bold">موبائل نمبر</th>
                    <th className="py-3.5 px-4 font-bold">ای میل</th>
                    <th className="py-3.5 px-4 font-bold">صارف کا نام</th>
                    <th className="py-3.5 px-4 font-bold">کردار (Role)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {eligibleUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400 font-semibold">
                        کوئی صارف یا ڈیلر ریکارڈ نہیں ملا۔
                      </td>
                    </tr>
                  ) : (
                    eligibleUsers.map((u) => {
                      const isDealer = u.role === 'dealer';
                      return (
                        <tr key={u.uid || u.email} className={`hover:bg-slate-50/80 transition-colors ${isDealer ? 'bg-amber-50/30' : ''}`}>
                          <td className="py-3.5 px-4">
                            {isDealer ? (
                              <button
                                type="button"
                                disabled={actionLoading === u.uid}
                                onClick={() => handleRoleToggle(u, false)}
                                className="bg-red-50 hover:bg-red-100 text-red-700 font-bold py-1.5 px-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-[11px]"
                              >
                                <UserMinus className="w-3.5 h-3.5" />
                                <span>ڈیلر رول ختم کریں</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                disabled={actionLoading === u.uid}
                                onClick={() => handleRoleToggle(u, true)}
                                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-1.5 px-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-[11px]"
                              >
                                <UserCheck className="w-3.5 h-3.5" />
                                <span>ڈیلر بنائیں</span>
                              </button>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                            Rs. {(u.balance || 0).toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">{u.city || '—'}</td>
                          <td className="py-3.5 px-4 font-mono text-slate-600">{u.phone || '—'}</td>
                          <td className="py-3.5 px-4 font-mono text-slate-700">{u.email}</td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">{u.name || 'نامعلوم'}</td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              isDealer 
                                ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}>
                              {isDealer ? 'ڈیلر (Dealer)' : 'کسٹمر (Customer)'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 2: DEALER BOOKINGS */}
      {activeSubTab === 'bookings' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-500" />
                <span>ڈیلر بکنگز کا ریکارڈ (Dealer Bookings)</span>
              </h3>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-2xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                >
                  <option value="all">تمام کیٹیگریز</option>
                  <option value="pakistan_bond">پاکستان پرائز بانڈ</option>
                  <option value="thailand_lottery">تھائی لینڈ لاٹری</option>
                </select>

                <div className="relative flex-1 md:w-72">
                  <input
                    type="text"
                    placeholder="نمبر، ڈیلر کا نام یا ای میل تلاش کریں..."
                    value={bookingSearchQuery}
                    onChange={(e) => setBookingSearchQuery(e.target.value)}
                    className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-2 px-4 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                </div>
                  <button
                    type="button"
                    onClick={handleDealerBookingsPDF}
                    disabled={filteredBookings.length === 0}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3 rounded-2xl transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-xs whitespace-nowrap"
                    title="Dealer Bookings PDF"
                  >
                    <FileText className="w-4 h-4" />
                    <span>PDF رپورٹ</span>
                  </button>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-100">
                    <th className="py-3.5 px-4 font-bold">ایڈمن ایکشن</th>
                    <th className="py-3.5 px-4 font-bold">کل رقم (Total)</th>
                    <th className="py-3.5 px-4 font-bold">سیکنڈ رقم</th>
                    <th className="py-3.5 px-4 font-bold">فرسٹ رقم</th>
                    <th className="py-3.5 px-4 font-bold">بکنگ نمبر</th>
                    <th className="py-3.5 px-4 font-bold">کیٹیگری / ڈرا</th>
                    <th className="py-3.5 px-4 font-bold">وقت / تاریخ</th>
                    <th className="py-3.5 px-4 font-bold">ڈیلر کی تفصیلات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400 font-semibold">
                        کوئی ڈیلر بکنگ ریکارڈ موجود نہیں ہے۔
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => {
                      const total = (b.firstAmount || 0) + (b.secondAmount || 0);
                      const d = new Date(b.timestamp);
                      const dateStr = d.toLocaleDateString('ur-PK');
                      const timeStr = d.toLocaleTimeString('ur-PK', { hour: '2-digit', minute: '2-digit' });

                      return (
                        <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <button
                              type="button"
                              disabled={actionLoading === b.id}
                              onClick={() => handleBookingCancel(b)}
                              className="bg-red-50 hover:bg-red-100 text-red-700 font-bold py-1 px-2.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50 text-[10px]"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>منسوخ کریں</span>
                            </button>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-amber-700">
                            Rs. {total.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-600">
                            {b.secondAmount > 0 ? `Rs. ${b.secondAmount.toLocaleString()}` : '—'}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-600">
                            {b.firstAmount > 0 ? `Rs. ${b.firstAmount.toLocaleString()}` : '—'}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-black text-slate-900 text-sm">
                            <span className="bg-amber-100 text-amber-950 px-2 py-0.5 rounded-lg border border-amber-200">
                              #{b.number}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-800">{categoryNameMap[b.category] || b.category}</div>
                            {b.bondValue && <div className="text-[10px] text-slate-500 font-mono">{b.bondValue}</div>}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-mono text-slate-700">{dateStr}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{timeStr}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{b.dealerName}</div>
                            <div className="font-mono text-[10px] text-slate-500">{b.dealerEmail}</div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
