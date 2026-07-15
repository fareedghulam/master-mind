import React, { useState, useEffect, FormEvent } from 'react';
import { User, NumberLimit, Demand, DrawDeadline, Booking } from '../types';
import { Shield, Plus, Trash, Check, X, UserCheck, AlertTriangle, ShieldCheck, HelpCircle, Sparkles, Clock, MessageCircle, Search } from 'lucide-react';
import { getSupportWhatsAppNumber, setSupportWhatsAppNumber, updateUserPassword, getAdminConfiguredEmail } from '../utils/store';

interface AdminPortalProps {
  users: User[];
  limits: NumberLimit[];
  demands: Demand[];
  deadlines: DrawDeadline[];
  bookings: Booking[];
  onCancelBookingByAdmin: (bookingId: string) => Promise<{ success: boolean; error?: string }>;
  onRecharge: (email: string, amount: number) => Promise<boolean>;
  onSetLimit: (category: 'pakistan_bond' | 'thailand_lottery', number: string, maxAmount: number) => Promise<any>;
  onDeleteLimit: (id: string) => Promise<any>;
  onApproveDemand: (id: string) => Promise<{ success: boolean; error?: string }>;
  onRejectDemand: (id: string) => Promise<{ success: boolean; error?: string }>;
  onSetDeadline: (category: 'pakistan_bond' | 'thailand_lottery', deadlineIso: string, titleUrdu: string, status: 'open' | 'closed') => void;
}

export default function AdminPortal({
  users,
  limits,
  demands = [],
  deadlines = [],
  bookings = [],
  onCancelBookingByAdmin,
  onRecharge,
  onSetLimit,
  onDeleteLimit,
  onApproveDemand,
  onRejectDemand,
  onSetDeadline
}: AdminPortalProps) {
  // Recharge States
  const [rechargeEmail, setRechargeEmail] = useState('');
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [rechargeError, setRechargeError] = useState('');
  const [rechargeSuccess, setRechargeSuccess] = useState('');

  // Limit States
  const [limitCategory, setLimitCategory] = useState<'pakistan_bond' | 'thailand_lottery'>('pakistan_bond');
  const [limitNumber, setLimitNumber] = useState('');
  const [limitAmount, setLimitAmount] = useState('');
  const [limitError, setLimitError] = useState('');
  const [limitSuccess, setLimitSuccess] = useState('');

  // Deadline configuration states
  const [deadlineCategory, setDeadlineCategory] = useState<'pakistan_bond' | 'thailand_lottery'>('pakistan_bond');
  const [deadlineTitle, setDeadlineTitle] = useState('بکنگ فائنل کھل گئی ہے');
  const [deadlineDateTime, setDeadlineDateTime] = useState('');
  const [deadlineStatus, setDeadlineStatus] = useState<'open' | 'closed'>('open');
  const [deadlineError, setDeadlineError] = useState('');
  const [deadlineSuccess, setDeadlineSuccess] = useState('');

  // Pre-populate deadline inputs when category or deadlines change
  useEffect(() => {
    const existing = deadlines.find(d => d.category === deadlineCategory);
    if (existing) {
      setDeadlineTitle(existing.titleUrdu);
      setDeadlineDateTime(existing.deadlineIso);
      setDeadlineStatus(existing.status || 'open');
    }
  }, [deadlineCategory, deadlines]);

  // Demand management state
  const [demandError, setDemandError] = useState('');
  const [demandSuccess, setDemandSuccess] = useState('');

  // Master Bookings states
  const [bookingSearchQuery, setBookingSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'pakistan_bond' | 'thailand_lottery'>('all');
  const [cancelSuccess, setCancelSuccess] = useState('');
  const [cancelError, setCancelError] = useState('');

  // WhatsApp configuration states
  const [whatsappVal, setWhatsappVal] = useState('');
  const [whatsappSuccess, setWhatsappSuccess] = useState('');
  const [whatsappError, setWhatsappError] = useState('');

  // Admin Password configuration states
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    setWhatsappVal(getSupportWhatsAppNumber());
    setAdminEmailInput(getAdminConfiguredEmail());
  }, []);

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordSuccess('');
    setPasswordError('');

    if (!adminEmailInput.trim()) {
      setPasswordError('برائے مہربانی ایڈمن ای میل درج کریں۔');
      return;
    }
    if (!adminPasswordInput.trim() || adminPasswordInput.trim().length < 6) {
      setPasswordError('پاس ورڈ کم از کم 6 ہندسوں کا ہونا چاہیے۔ (Password must be at least 6 characters.)');
      return;
    }

    const ok = await updateUserPassword(adminEmailInput.trim(), adminPasswordInput.trim());
    if (ok) {
      setPasswordSuccess('کامیاب: ایڈمن پاس ورڈ کامیابی سے تبدیل کر دیا گیا ہے۔');
      setAdminPasswordInput('');
    } else {
      setPasswordError('ایڈمن پاس ورڈ تبدیل کرنے میں خامی پیش آئی۔ برائے مہربانی انٹرنیٹ چیک کریں۔');
    }
  };

  const handleWhatsappSubmit = (e: FormEvent) => {
    e.preventDefault();
    setWhatsappSuccess('');
    setWhatsappError('');

    if (!whatsappVal.trim()) {
      setWhatsappError('برائے مہربانی ایک درست واٹس ایپ نمبر درج کریں۔');
      return;
    }

    setSupportWhatsAppNumber(whatsappVal);
    const updated = getSupportWhatsAppNumber();
    setWhatsappVal(updated);
    setWhatsappSuccess(`کامیاب: واٹس ایپ سپورٹ نمبر تبدیل کر کے +${updated} کر دیا گیا ہے۔ تمام کسٹمرز کے رابطہ لنکس اپ ڈیٹ ہو چکے ہیں۔`);
  };

  const handleApprove = async (id: string, num: string) => {
    setDemandError('');
    setDemandSuccess('');
    const res = await onApproveDemand(id);
    if (res.success) {
      setDemandSuccess(`کامیاب: نمبر ${num} کے لئے ڈیمانڈ کامیابی سے منظور کر کے بکنگ شیٹ میں شامل کر دی گئی ہے۔`);
    } else {
      setDemandError(res.error || 'ڈیمانڈ منظور کرنے میں غلطی پیش آئی۔');
    }
  };

  const handleReject = async (id: string, num: string) => {
    setDemandError('');
    setDemandSuccess('');
    const res = await onRejectDemand(id);
    if (res.success) {
      setDemandSuccess(`کامیاب: نمبر ${num} کے لئے بھیجی گئی ڈیمانڈ کو مسترد کر دیا گیا ہے۔`);
    } else {
      setDemandError(res.error || 'ڈیمانڈ مسترد کرنے میں غلطی پیش آئی۔');
    }
  };

  const handleCancelBookingClick = async (bookingId: string, number: string) => {
    setCancelSuccess('');
    setCancelError('');
    const res = await onCancelBookingByAdmin(bookingId);
    if (res.success) {
      setCancelSuccess(`کامیاب: نمبر (${number}) کی بکنگ کامیابی سے منسوخ کر دی گئی ہے اور رقم کسٹمر کے والٹ میں واپس جمع ہو گئی ہے!`);
    } else {
      setCancelError(res.error || 'بکنگ منسوخ کرنے میں کوئی خامی پیش آئی۔');
    }
  };

  const handleRechargeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setRechargeError('');
    setRechargeSuccess('');

    if (!rechargeEmail || !rechargeAmount) {
      setRechargeError('براہ کرم کسٹمر ایمیل اور رقم دونوں لکھیں۔');
      return;
    }

    const amountNum = parseInt(rechargeAmount, 10);
    if (isNaN(amountNum) || amountNum <= 0) {
      setRechargeError('براہ کرم درست رقم درج کریں۔ (نمبر صفر سے زیادہ ہونا چاہیے)');
      return;
    }

    const ok = await onRecharge(rechargeEmail, amountNum);
    if (ok) {
      const updatedUser = users.find(u => u.email.toLowerCase() === rechargeEmail.toLowerCase());
      setRechargeSuccess(` Rs. ${amountNum.toLocaleString()} والٹ میں کامیابی سے جمع کر دیئے گئے۔ کسٹمر کا نیا والٹ بیلنس: Rs. ${updatedUser?.balance.toLocaleString() || ''}`);
      setRechargeAmount('');
    } else {
      setRechargeError('اس ایمیل کا کوئی کسٹمر نہیں ملا۔ براہ کرم درست ایمیل لکھیں۔');
    }
  };

  const handleLimitSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLimitError('');
    setLimitSuccess('');

    if (!limitNumber || !limitAmount) {
      setLimitError('نمبر اور زیادہ سے زیادہ رقم دونوں لازمی ہیں۔');
      return;
    }

    const limitNumVal = parseInt(limitAmount, 10);
    if (isNaN(limitNumVal) || limitNumVal <= 0) {
      setLimitError('براہ کرم درست لمٹ رقم لکھیں۔');
      return;
    }

    await onSetLimit(limitCategory, limitNumber, limitNumVal);
    setLimitSuccess(`کامیاب: نمبر ${limitNumber} کی حد Rs. ${limitNumVal} مقرر کر دی گئی ہے۔`);
    setLimitNumber('');
    setLimitAmount('');
  };

  const handleDeadlineSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDeadlineError('');
    setDeadlineSuccess('');

    if (!deadlineDateTime) {
      setDeadlineError('براہ کرم تاریخ اور وقت منتخب کریں۔');
      return;
    }

    onSetDeadline(deadlineCategory, deadlineDateTime, deadlineTitle || 'بکنگ فائنل کھل گئی ہے', deadlineStatus);
    setDeadlineSuccess(`کامیاب: ${deadlineCategory === 'pakistan_bond' ? 'پاکستان بانڈ' : 'تھائی لینڈ لاٹری'} کی سیٹنگز کامیابی سے محفوظ ہو گئی ہیں!`);
  };


  return (
    <div className="space-y-8 font-sans text-right max-w-4xl mx-auto">
      {/* Dynamic Security Banner */}
      <div className="bg-amber-500/10 border border-amber-500/35 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row shadow-sm gap-4 items-center sm:items-start justify-between">
        <div className="bg-amber-500/20 p-3 rounded-2xl text-amber-600 sm:order-last">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-amber-900 flex items-center justify-end gap-2">
            <span>ایڈمن کنٹرول پینل</span>
          </h3>
          <p className="text-slate-600 text-xs mt-2 leading-relaxed max-w-lg">
            قریشی صاحب! یہاں سے آپ موصولہ ڈیمانڈز قبول یا مسترد کر سکتے ہیں، کسی بھی رجسٹرڈ کسٹمر کے اکاؤنٹ میں رقم ریچارج کر سکتے ہیں، اور خاص نمبرز پر زیادہ سے زیادہ بکنگ کی لمٹ لگا سکتے ہیں۔
          </p>
        </div>
      </div>

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
                  const customer = users.find(u => u.email.toLowerCase() === d.userEmail.toLowerCase());
                  return (
                     <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                       {/* Action Buttons */}
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

                       {/* Status Indicator */}
                       <td className="py-3 px-3">
                         {d.status === 'pending' && <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">زیرِ غور ⏳</span>}
                         {d.status === 'approved' && <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">منظور شدہ ✓</span>}
                         {d.status === 'rejected' && <span className="text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full border border-red-200">مسترد ✗</span>}
                       </td>

                       {/* Total Amount */}
                       <td className="py-3 px-3 font-mono font-semibold text-slate-700">
                         Rs. {(d.firstAmount + d.secondAmount).toLocaleString()}
                       </td>

                       {/* Breakdown First/Second */}
                       <td className="py-3 px-3 font-mono text-slate-550 text-xs">
                         F: {d.firstAmount} / S: {d.secondAmount}
                       </td>

                       {/* Target Number */}
                       <td className="py-3 px-3 font-mono font-bold text-red-600 text-sm">
                         {d.number}
                       </td>

                       {/* Category Type */}
                       <td className="py-3 px-3 text-slate-600 text-xs font-semibold">
                         {d.category === 'pakistan_bond' ? 'پاکستان بانڈ' : 'تھائی لاٹری'}
                       </td>

                       {/* Customer Details info */}
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

        {/* Filter and Search Box */}
        <div className="grid grid-cols-1 gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="کسٹمر کی ای میل یا بکنگ نمبر سے تلاش کریں..."
              value={bookingSearchQuery}
              onChange={(e) => setBookingSearchQuery(e.target.value)}
              className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-4 top-3.5" />
          </div>
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
          const filteredBookings = bookings.filter((b) => {
            const matchesCategory = categoryFilter === 'all' || b.category === categoryFilter;
            const matchesSearch =
              !bookingSearchQuery ||
              b.number.includes(bookingSearchQuery) ||
              b.userEmail.toLowerCase().includes(bookingSearchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
          }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

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
                    const customer = users.find(u => u.email.toLowerCase() === b.userEmail.toLowerCase());
                    return (
                      <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                        {/* Cancel Action Button */}
                        <td className="py-3 px-3 text-left">
                          <button
                            onClick={() => handleCancelBookingClick(b.id, b.number)}
                            className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 border border-red-200 cursor-pointer text-[10px]"
                          >
                            <Trash className="w-3 h-3" />
                            <span>منسوخ کریں</span>
                          </button>
                        </td>

                        {/* Timestamp */}
                        <td className="py-3 px-3 text-slate-400 font-mono text-[10px]">
                          {new Date(b.timestamp).toLocaleString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>

                        {/* Total Amount */}
                        <td className="py-3 px-3 font-mono font-semibold text-slate-700">
                          Rs. {(b.firstAmount + b.secondAmount).toLocaleString()}
                        </td>

                        {/* Breakdown Second */}
                        <td className="py-3 px-3 font-mono text-slate-550 text-xs">
                          Rs. {b.secondAmount.toLocaleString()}
                        </td>

                        {/* Breakdown First */}
                        <td className="py-3 px-3 font-mono text-slate-550 text-xs">
                          Rs. {b.firstAmount.toLocaleString()}
                        </td>

                        {/* Target Number */}
                        <td className="py-3 px-3 font-mono font-bold text-red-600 text-sm">
                          {b.number}
                        </td>

                        {/* Category Type */}
                        <td className="py-3 px-3 text-slate-600 text-xs font-semibold">
                          {b.category === 'pakistan_bond' ? 'پاکستان بانڈ' : 'تھائی لاٹری'}
                        </td>

                        {/* Customer Details info */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Module 1: Wallet Recharge (کسٹمر والٹ ریچارج کریں) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md">
          <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 mb-5 flex items-center justify-end gap-2">
            <span>کسٹمر والٹ ریچارج پورٹل</span>
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
          </h4>

          {rechargeError && (
            <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs leading-relaxed">
              ⚠️ {rechargeError}
            </div>
          )}
          {rechargeSuccess && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs leading-relaxed">
              ✓ {rechargeSuccess}
            </div>
          )}

          <form onSubmit={handleRechargeSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5">
                کسٹمر رجسٹرڈ ایمیل آئی دی (Customer Email) *
              </label>
              <input
                type="email"
                placeholder="customer@example.com"
                value={rechargeEmail}
                onChange={(e) => setRechargeEmail(e.target.value)}
                className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                لاگ ان کسٹمر اپنی بکنگ شیٹ کے اوپر اور پروفائل پر ایمیل دیکھ سکتا ہے۔
              </p>
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5">
                ریچارج رقم درج کریں (Amount in Rs.) *
              </label>
              <input
                type="number"
                placeholder="1000"
                value={rechargeAmount}
                onChange={(e) => setRechargeAmount(e.target.value)}
                className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>والٹ رقم جمع کریں (Recharge)</span>
            </button>
          </form>

          {/* Quick list of registered customers to quickly recharge */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h5 className="text-[11px] text-slate-500 font-bold mb-3">رجسٹرڈ کسٹمرز کی لسٹ اور موجودہ بیلنس</h5>
            <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
              {users.map((u) => (
                <div 
                  key={u.email} 
                  onClick={() => setRechargeEmail(u.email)}
                  className="flex justify-between items-center bg-slate-50 hover:bg-amber-50/50 p-2.5 rounded-xl text-xs transition-all cursor-pointer border border-slate-100"
                >
                  <span className="font-mono text-slate-600 font-semibold">Rs. {u.balance.toLocaleString()}</span>
                  <div className="text-right">
                    <span className="font-semibold block text-slate-800">{u.name} {u.isAdmin && '(ایڈمن)'}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{u.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Module 2: Number Booking Limit Configuration (نمبر لمٹ مقرر کریں) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 mb-5 flex items-center justify-end gap-2">
              <span>بکنگ نمبر زیادہ سے زیادہ لمٹ</span>
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
            </h4>

            {limitError && (
              <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs leading-relaxed">
                ⚠️ {limitError}
              </div>
            )}
            {limitSuccess && (
              <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs leading-relaxed">
                ✓ {limitSuccess}
              </div>
            )}

            <form onSubmit={handleLimitSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1.5">
                  کیٹیگری منتخب کریں (Choose Draw Type) *
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setLimitCategory('pakistan_bond')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      limitCategory === 'pakistan_bond'
                        ? 'bg-slate-900 text-amber-400 border-slate-900 font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    پاکستان بانڈ
                  </button>
                  <button
                    type="button"
                    onClick={() => setLimitCategory('thailand_lottery')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      limitCategory === 'thailand_lottery'
                        ? 'bg-slate-900 text-amber-400 border-slate-900 font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    تھائی لینڈ لاٹری
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                    زیادہ سے زیادہ رقم لمٹ *
                  </label>
                  <input
                    type="number"
                    placeholder="مثال: 50"
                    value={limitAmount}
                    onChange={(e) => setLimitAmount(e.target.value)}
                    className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>
                
                <div>
                  <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                    مخصوص نمبر لکھیں *
                  </label>
                  <input
                    type="text"
                    placeholder="نمبر لکھیں"
                    value={limitNumber}
                    onChange={(e) => setLimitNumber(e.target.value)}
                    className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>خصوصی بکنگ لمٹ لگائیں</span>
              </button>
            </form>
          </div>
        </div>

        {/* Module 3: Booking Deadline Settings (بکنگ آخری وقت اور تاریخ) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md md:col-span-2 space-y-4">
          <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2">
            <span>ڈرا کی بکنگ کا آخری وقت اور تاریخ (Booking Deadlines)</span>
            <Clock className="w-5 h-5 text-red-500" />
          </h4>

          {deadlineError && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs">
              ⚠️ {deadlineError}
            </div>
          )}
          {deadlineSuccess && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs">
              ✓ {deadlineSuccess}
            </div>
          )}

          <form onSubmit={handleDeadlineSubmit} className="space-y-4">
            {/* Booking Status Selector (Open / Closed manual switch) */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <label className="block text-slate-700 text-xs font-bold text-right">
                بکنگ اسٹیٹس (دستی کنٹرول) *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDeadlineStatus('open');
                    setDeadlineTitle('بکنگ فائنل کھل گئی ہے');
                  }}
                  className={`py-3 px-4 rounded-2xl border text-center transition-all text-xs font-bold flex items-center justify-center gap-2 ${
                    deadlineStatus === 'open'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/10'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${deadlineStatus === 'open' ? 'bg-white animate-ping' : 'bg-slate-400'}`}></span>
                  <span>بکنگ کھول گئے (Booking Open)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeadlineStatus('closed');
                    setDeadlineTitle('بکنگ فائنل بند ہے');
                  }}
                  className={`py-3 px-4 rounded-2xl border text-center transition-all text-xs font-bold flex items-center justify-center gap-2 ${
                    deadlineStatus === 'closed'
                      ? 'bg-red-600 text-white border-red-600 shadow-sm shadow-red-600/10'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  <span>بکنگ بند ہے (Booking Closed)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Field 1: Category Selection */}
              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                  کیٹیگری منتخب کریں *
                </label>
                <select
                  value={deadlineCategory}
                  onChange={(e) => {
                    const cat = e.target.value as 'pakistan_bond' | 'thailand_lottery';
                    setDeadlineCategory(cat);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                >
                  <option value="pakistan_bond">پاکستان بانڈ</option>
                  <option value="thailand_lottery">تھائی لینڈ لاٹری</option>
                </select>
              </div>

              {/* Field 2: Status Text / Title */}
              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                  اسٹیٹس پیغام (Urdu Status Message) *
                </label>
                <input
                  type="text"
                  placeholder="مثال: بکنگ فائنل کھل گئی ہے"
                  value={deadlineTitle}
                  onChange={(e) => setDeadlineTitle(e.target.value)}
                  className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                  required
                />
              </div>

              {/* Field 3: Date & Time Picker */}
              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                  آخری تاریخ اور وقت (Deadline Date & Time) *
                </label>
                <input
                  type="datetime-local"
                  value={deadlineDateTime}
                  onChange={(e) => setDeadlineDateTime(e.target.value)}
                  className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                  required
                />
              </div>

            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>ڈیڈلائن اور اسٹیٹس محفوظ کریں (Save Draw Settings)</span>
            </button>
          </form>

          {/* Display active deadlines */}
          <div className="pt-4 border-t border-slate-100">
            <h5 className="text-xs font-bold text-slate-700 mb-3">موجودہ فعال بکنگ ڈیڈلائنز کی حیثیت</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deadlines.map((d) => {
                const isOver = d.status === 'closed' || new Date(d.deadlineIso).getTime() <= Date.now();
                return (
                  <div key={d.category} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isOver ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        }`}>
                          {isOver ? 'بند ہے (Closed)' : 'اوپن ہے (Open)'}
                        </span>
                        <span className="font-bold text-xs text-slate-800">
                          {d.category === 'pakistan_bond' ? 'پاکستان بانڈ' : 'تھائی لینڈ لاٹری'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        مینوئل کنٹرول: <strong className={d.status === 'closed' ? 'text-red-600' : 'text-emerald-600'}>{d.status === 'closed' ? 'بند (Closed)' : 'اوپن (Open)'}</strong>
                      </p>
                      <p className="text-[11px] text-slate-600">
                        عنوان: <strong className="text-slate-800">{d.titleUrdu}</strong>
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        تاریخ: {new Date(d.deadlineIso).toLocaleString('en-US')}
                      </p>
                    </div>

                    {/* Quick action buttons to instantly toggle booking status */}
                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/60">
                      <button
                        type="button"
                        onClick={() => {
                          const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                          const isoStr = futureDate.toISOString().slice(0, 16);
                          onSetDeadline(d.category, isoStr, 'بکنگ فائنل کھل گئی ہے', 'open');
                        }}
                        className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 border ${
                          !isOver 
                            ? 'bg-emerald-600 text-white border-emerald-600' 
                            : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                        <span>بکنگ کھولیں (Open)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
                          const isoStr = pastDate.toISOString().slice(0, 16);
                          onSetDeadline(d.category, isoStr, 'بکنگ فائنل بند ہے', 'closed');
                        }}
                        className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 border ${
                          isOver 
                            ? 'bg-red-600 text-white border-red-600' 
                            : 'bg-white text-red-600 border-red-200 hover:bg-red-50'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>بکنگ بند کریں (Close)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Module 4: WhatsApp Support Helpline Configuration */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md md:col-span-2 space-y-4">
          <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2">
            <span>واٹس ایپ ہیلپ لائن اور رابطہ سیٹنگز (WhatsApp Help Settings)</span>
            <MessageCircle className="w-5 h-5 text-emerald-600" />
          </h4>

          {whatsappError && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right">
              ⚠️ {whatsappError}
            </div>
          )}
          {whatsappSuccess && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right">
              ✓ {whatsappSuccess}
            </div>
          )}

          <form onSubmit={handleWhatsappSubmit} className="space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed text-right">
              یہاں پر وہ واٹس ایپ نمبر درج کریں جس پر کسٹمرز کسی مدد یا والٹ بیلنس ریچارج کے لیے رابطہ کر سکیں۔ نمبر میں کنٹری کوڈ (جیسے پاکستان کے لیے 92) لازمی لکھیں بغیر پلس (+) یا صفر (0) کے، جیسے 923001234567۔
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-6 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md sm:w-48 whitespace-nowrap"
              >
                <span>محفوظ کریں (Save Phone)</span>
              </button>

              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="923001234567"
                  value={whatsappVal}
                  onChange={(e) => setWhatsappVal(e.target.value)}
                  className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                  required
                />
              </div>
            </div>
          </form>
        </div>

        {/* Module 5: Admin Password Configuration (ایڈمن پاس ورڈ تبدیل کریں) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md md:col-span-2 space-y-4">
          <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2">
            <span>ایڈمن پاس ورڈ اور سیکیورٹی سیٹنگز (Admin Password Settings)</span>
            <ShieldCheck className="w-5 h-5 text-blue-600" />
          </h4>

          {passwordError && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right">
              ⚠️ {passwordError}
            </div>
          )}
          {passwordSuccess && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right">
              ✓ {passwordSuccess}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed text-right">
              یہاں سے آپ ایڈمن کا لاگ ان پاس ورڈ تبدیل کر سکتے ہیں۔ پاس ورڈ تبدیل ہونے کے بعد، اگلی بار ایڈمن کو نئے پاس ورڈ کے ساتھ ہی لاگ ان کرنا ہوگا۔
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                  نیا مضبوط پاس ورڈ (New Password) *
                </label>
                <input
                  type="password"
                  placeholder="نیا پاس ورڈ درج کریں"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                  ایڈمن ای میل (Admin Email)
                </label>
                <input
                  type="email"
                  value={adminEmailInput}
                  readOnly
                  disabled
                  className="w-full text-left bg-slate-100 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-mono text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>پاس ورڈ تبدیل کریں (Update Password)</span>
            </button>
          </form>
        </div>

      </div>

      {/* Active limits display list */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md">
        <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 mb-5 text-right">
          فعال بکنگ لمٹس (Active Limits)
        </h4>

        {limits.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-6">کوئی خصوصی لِمٹ لاگو نہیں کی گئی ہے۔ تمام نمبرز لامحدود بک ہو سکتے ہیں۔</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {limits.map((l) => (
              <div 
                key={l.id} 
                className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-150 rounded-2xl"
              >
                <button
                  type="button"
                  onClick={() => onDeleteLimit(l.id)}
                  className="p-1 px-1.5 text-red-500 hover:bg-red-50 rounded-lg hover:text-red-700 transition-all cursor-pointer"
                  title="لمٹ ختم کریں"
                >
                  <Trash className="w-4 h-4" />
                </button>

                <div className="text-right">
                  <span className="font-mono text-sm font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg ml-2">
                    {l.number}
                  </span>
                  <span className="text-xs text-slate-400 font-mono tracking-wider">حد: Rs. {l.maxAmount}</span>
                  <div className="text-[10px] text-slate-500 mt-1 font-sans">
                    {l.category === 'pakistan_bond' ? 'پاکستان بانڈ' : 'تھائی لینڈ لاٹری'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
