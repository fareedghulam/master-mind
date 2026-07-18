import React, { useState, useEffect, FormEvent } from 'react';
import { User, Booking, NumberLimit, Demand, DrawDeadline } from '../types';
import { generateBookingPDF } from '../utils/pdfGenerator';
import { Trash2, Plus, Download, ShieldAlert, Sparkles, AlertCircle, Clock } from 'lucide-react';

interface BookingPageProps {
  user: User;
  bookings: Booking[];
  limits: NumberLimit[];
  demands: Demand[];
  deadlines?: DrawDeadline[];
  category: 'pakistan_bond' | 'thailand_lottery';
  onAddBooking: (number: string, firstAmt: number, secondAmt: number) => Promise<{ success: boolean; error?: string }>;
  onCancelBooking: (id: string) => Promise<{ success: boolean; error?: string }>;
  onAddDemand: (number: string, firstAmt: number, secondAmt: number) => Promise<{ success: boolean; error?: string }>;
}

export default function BookingPage({
  user,
  bookings,
  limits,
  demands = [],
  deadlines = [],
  category,
  onAddBooking,
  onCancelBooking,
  onAddDemand
}: BookingPageProps) {
  // Input fields
  const [numInput, setNumInput] = useState('');
  const [firstAmtInput, setFirstAmtInput] = useState('');
  const [secondAmtInput, setSecondAmtInput] = useState('');

  // Status message
  const [errorStatus, setErrorStatus] = useState('');
  const [successStatus, setSuccessStatus] = useState('');

  // Ticker for cancellation live updates
  const [timeTicker, setTimeTicker] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeTicker(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Deadline evaluation
  const categoryDeadline = deadlines.find(d => d.category === category);
  const deadlineTime = categoryDeadline ? new Date(categoryDeadline.deadlineIso).getTime() : 0;
  const isTimeUp = (categoryDeadline?.status === 'closed') || (deadlineTime > 0 && timeTicker >= deadlineTime);

  const getRemainingTimeString = () => {
    if (categoryDeadline?.status === 'closed') return 'بکنگ بند ہے (Closed)';
    if (!deadlineTime) return '';
    const diff = deadlineTime - timeTicker;
    if (diff <= 0) return 'وقت ختم ہو چکا ہے (Closed)';
    
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const mins = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const secs = Math.floor((diff % (60 * 1000)) / 1000);
    
    let str = '';
    if (days > 0) str += `${days} دن `;
    if (hours > 0 || days > 0) str += `${hours} گھنٹے `;
    str += `${mins} منٹ ${secs} سیکنڈ`;
    return str;
  };

  const getFormattedDeadline = () => {
    if (!categoryDeadline) return 'مقرر نہیں ہے';
    try {
      const d = new Date(categoryDeadline.deadlineIso);
      const dateStr = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      return `${dateStr} بوقت ${timeStr}`;
    } catch (e) {
      return categoryDeadline.deadlineIso;
    }
  };

  const getFormattedClosedOn = () => {
    if (!categoryDeadline) return '';
    try {
      const d = new Date(categoryDeadline.deadlineIso);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (e) {
      return categoryDeadline.deadlineIso;
    }
  };

  const pageTitleUrdu = category === 'pakistan_bond' ? 'پاکستان بانڈ بکنگ پورٹل' : 'تھائی لینڈ لاٹری بکنگ پورٹل';
  const pageTitleEnglish = category === 'pakistan_bond' ? 'PAKISTAN BOND DRAW' : 'THAILAND LOTTERY DRAW';

  const filterBookings = bookings.filter(b => b.category === category && b.userEmail === user.email);
  const filterDemands = demands.filter(d => d.category === category && d.userEmail === user.email);
  const relevantLimits = limits.filter(l => l.category === category);

  const currentFirstAmt = parseInt(firstAmtInput || '0', 10);
  const currentSecondAmt = parseInt(secondAmtInput || '0', 10);
  const currentTotalCost = currentFirstAmt + currentSecondAmt;

  const handleDemandClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorStatus('');
    setSuccessStatus('');

    if (isTimeUp) {
      setErrorStatus('معذرت! بکنگ کا وقت پورا ہو چکا ہے۔ اب مزید کوئی ڈیمانڈ قبول نہیں کی جا سکتی۔');
      return;
    }

    if (!numInput) {
      setErrorStatus('براہ کرم نمبر درج کریں۔');
      return;
    }

    const firstAmt = parseInt(firstAmtInput || '0', 10);
    const secondAmt = parseInt(secondAmtInput || '0', 10);

    if (firstAmt <= 0 && secondAmt <= 0) {
      setErrorStatus('براہ کرم فرسٹ یا سیکنڈ میں سے کسی ایک میں رقم درج کریں۔');
      return;
    }

    const totalCost = firstAmt + secondAmt;
    if (totalCost <= 500) {
      setErrorStatus('ڈیمانڈ بھیجنے کے لئے گیم کی رقم 500 روپے سے زیادہ ہونی چاہیے۔');
      return;
    }

    if (user.balance < totalCost) {
      setErrorStatus('آپ کے والٹ میں کافی رقم موجود نہیں ہے! ڈیمانڈ منظور ہونے پر رقم درکار ہوگی۔');
      return;
    }

    const res = await onAddDemand(numInput, firstAmt, secondAmt);
    if (res.success) {
      setSuccessStatus(`کامیاب: نمبر ${numInput} کے لئے Rs. ${totalCost.toLocaleString()} کی ڈیمانڈ ایڈمن کو بھیج دی گئی ہے!`);
      setNumInput('');
      setFirstAmtInput('');
      setSecondAmtInput('');
    } else {
      setErrorStatus(res.error || 'ڈیمانڈ بھیجنے کے دوران غلطی پیش آئی۔');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorStatus('');
    setSuccessStatus('');

    if (isTimeUp) {
      setErrorStatus('معذرت! بکنگ کا وقت پورا ہو چکا ہے۔ اب مزید کوئی بکنگ قبول نہیں کی جا سکتی۔');
      return;
    }

    if (!numInput) {
      setErrorStatus('براہ کرم نمبر درج کریں۔');
      return;
    }

    const firstAmt = parseInt(firstAmtInput || '0', 10);
    const secondAmt = parseInt(secondAmtInput || '0', 10);

    if (firstAmt <= 0 && secondAmt <= 0) {
      setErrorStatus('براہ کرم فرسٹ یا سیکنڈ میں سے کسی ایک میں رقم درج کریں۔');
      return;
    }

    const totalCost = firstAmt + secondAmt;
    if (user.balance < totalCost) {
      setErrorStatus('آپ کے والٹ میں کافی رقم موجود نہیں ہے! کسٹمر سپورٹ یا ایڈمن سے رابطہ کریں۔');
      return;
    }

    const res = await onAddBooking(numInput, firstAmt, secondAmt);
    if (res.success) {
      setSuccessStatus(`کامیاب: نمبر ${numInput} کی بکنگ رجسٹر ہو گئی ہے!`);
      setNumInput('');
      setFirstAmtInput('');
      setSecondAmtInput('');
    } else {
      setErrorStatus(res.error || 'بکنگ کے دوران غلطی پیش آئی۔');
    }
  };

  const handleCancelClick = async (id: string, number: string) => {
    setErrorStatus('');
    setSuccessStatus('');

    const res = await onCancelBooking(id);
    if (res.success) {
      setSuccessStatus(`منسوخ: نمبر ${number} کو منسوخ کر کے رقم والٹ میں جمع کر دی گئی ہے!`);
    } else {
      setErrorStatus(res.error || 'منسوخی کے دوران غلطی پیش آئی۔');
    }
  };

  const handleDownloadPDF = () => {
    if (filterBookings.length === 0) {
      setErrorStatus('پی ڈی ایف ڈاؤن لوڈ کرنے کے لئے لسٹ میں نمبر ہونا لازمی ہے۔');
      return;
    }
    generateBookingPDF(
      user.name,
      user.email,
      user.phone,
      user.city,
      filterBookings,
      category
    );
    setSuccessStatus('پی ڈی ایف فائل ڈاؤن لوڈ شروع ہو گئی ہے!');
  };

  return (
    <div className="space-y-6 text-right font-sans max-w-4xl mx-auto">
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
                  <span>بکنگ پورشن بند ہے (Closed)</span>
                </div>
                <div className="text-left mt-2 pl-1">
                  <div className="text-xs font-bold text-red-800">Booking Closed</div>
                  <div className="text-[11px] text-slate-600 font-mono">Closed On: {getFormattedClosedOn()}</div>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-600 text-white font-bold px-4 py-2 rounded-2xl text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-500/10">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span>بکنگ فائنل کھل گئی ہے (Open)</span>
              </div>
            )}
          </div>

          <div className="text-center md:text-right space-y-1 w-full md:w-auto">
            <div className="flex items-center justify-center md:justify-end gap-2 text-slate-900 font-bold">
              <span className={isTimeUp ? 'text-red-700' : 'text-slate-800'}>
                {categoryDeadline?.titleUrdu || 'بکنگ فائنل کھل گئی ہے'}
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

        {/* Next Draw Information Section */}
        <div className="mt-4 pt-4 border-t border-dashed border-slate-300/60">
          <h4 className="text-xs font-bold text-slate-700 mb-2.5 flex items-center justify-end gap-1.5">
            <span>اگلے ڈرا کی معلومات (Next Draw Info)</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </h4>
          {category === 'pakistan_bond' ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-right">
              <div className="p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-xs">
                <span className="block text-[10px] text-slate-500 font-medium mb-0.5">اگلی بانڈ مالیت</span>
                <span className="text-xs font-bold text-slate-800 font-mono">{categoryDeadline?.nextPrizeBondValue || '---'}</span>
              </div>
              <div className="p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-xs">
                <span className="block text-[10px] text-slate-500 font-medium mb-0.5">اگلا ڈرا شہر</span>
                <span className="text-xs font-bold text-slate-800">{categoryDeadline?.nextDrawCity || '---'}</span>
              </div>
              <div className="p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-xs">
                <span className="block text-[10px] text-slate-500 font-medium mb-0.5">اگلا ڈرا نمبر</span>
                <span className="text-xs font-bold text-slate-800 font-mono">{categoryDeadline?.nextDrawNumber || '---'}</span>
              </div>
              <div className="p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-xs">
                <span className="block text-[10px] text-slate-500 font-medium mb-0.5">اگلی ڈرا تاریخ</span>
                <span className="text-xs font-bold text-slate-800 font-mono">{categoryDeadline?.nextDrawDate || '---'}</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 text-right">
              <div className="p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-xs flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-medium">اگلی ڈرا تاریخ (Next Draw Date)</span>
                <span className="text-xs font-bold text-slate-800 font-mono">{categoryDeadline?.nextDrawDate || '---'}</span>
              </div>
            </div>
          )}
        </div>
      </div>

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

      {/* Booked Numbers List Underlying Sheet */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pb-4 border-b border-slate-100 mb-6">
          
          {/* Download PDF button (پی ڈی ایف ڈاؤن لوڈ) */}
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
                  <th className="py-3 px-4 font-semibold text-slate-600">میزان رقم</th>
                  <th className="py-3 px-4 font-semibold text-slate-600">سیکنڈ (Second)</th>
                  <th className="py-3 px-4 font-semibold text-slate-600">فرسٹ (First)</th>
                  <th className="py-3 px-4 font-semibold text-slate-600 text-right">بک نمبر (No)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filterBookings.map((b) => {
                  // Compute how long ago built
                  const diffMs = timeTicker - new Date(b.timestamp).getTime();
                  const remainingMs = Math.max(0, (2 * 60 * 1000) - diffMs);
                  const canCancel = remainingMs > 0;
                  const secondsLeft = Math.floor(remainingMs / 1000);

                  return (
                    <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Cancellation Column with Live Timer */}
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
                        {new Date(b.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>

                      <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                        Rs. {(b.firstAmount + b.secondAmount).toLocaleString()}
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-550">
                        Rs. {b.secondAmount.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-550">
                        Rs. {b.firstAmount.toLocaleString()}
                      </td>

                      {/* Number Display Highlighted */}
                      <td className="py-3 px-4 font-mono font-bold text-red-650 text-base">
                        {b.number}
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
                {filterDemands.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
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
                       {new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </td>

                     <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                       Rs. {(d.firstAmount + d.secondAmount).toLocaleString()}
                     </td>

                     <td className="py-3 px-4 font-mono text-slate-550">
                       Rs. {d.secondAmount.toLocaleString()}
                     </td>

                     <td className="py-3 px-4 font-mono text-slate-550">
                       Rs. {d.firstAmount.toLocaleString()}
                     </td>

                     <td className="py-3 px-4 font-mono font-bold text-slate-800 text-base">
                       {d.number}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         )}
       </div>

    </div>
  );
}
