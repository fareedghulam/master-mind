import React, { useState, useEffect, FormEvent } from 'react';
import { User, Booking, NumberLimit, Demand, DrawDeadline, DrawCategory } from '../types';
import { generateBookingPDF } from '../utils/pdfGenerator';
import { BookingDrawHeader } from './booking/BookingDrawHeader';
import { BookingFormSection } from './booking/BookingFormSection';
import { BookingsAndDemandsTables } from './booking/BookingsAndDemandsTables';

interface BookingPageProps {
  user: User;
  bookings: Booking[];
  limits: NumberLimit[];
  demands?: Demand[];
  deadlines?: DrawDeadline[];
  category: DrawCategory | 'unified';
  onAddBooking: (number: string, firstAmt: number, secondAmt: number, bondValue?: string, drawNumber?: string, drawDate?: string, drawCity?: string, drawId?: string) => Promise<{ success: boolean; error?: string }>;
  onCancelBooking: (id: string) => Promise<{ success: boolean; error?: string }>;
  onAddDemand: (number: string, firstAmt: number, secondAmt: number, bondValue?: string, drawNumber?: string, drawDate?: string, drawCity?: string, drawId?: string) => Promise<{ success: boolean; error?: string }>;
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

  // Available active draws
  const activeDrawsList = (deadlines || []).filter(d => d.status !== 'result_announced' && !d.isArchived);
  const categoryDraws = category === 'unified' ? activeDrawsList : activeDrawsList.filter(d => d.category === category);
  const pakDraws = activeDrawsList.filter(d => d.category === 'pakistan_bond');

  const [selectedDrawId, setSelectedDrawId] = useState<string>('');

  useEffect(() => {
    if (categoryDraws.length > 0) {
      if (!selectedDrawId || !categoryDraws.some(d => (d.id || d.drawId || d.category) === selectedDrawId)) {
        const defaultDraw = categoryDraws[0];
        setSelectedDrawId(defaultDraw.id || defaultDraw.drawId || defaultDraw.category);
      }
    }
  }, [category, deadlines, categoryDraws]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeTicker(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Selected draw deadline evaluation
  const activeDraw = categoryDraws.find(d => (d.id || d.drawId || d.category) === selectedDrawId) || categoryDraws[0] || (deadlines || [])[0];

  const rawDeadlineTime = activeDraw && activeDraw.deadlineIso 
    ? (typeof activeDraw.deadlineIso === 'object' && (activeDraw.deadlineIso as any).seconds 
        ? (activeDraw.deadlineIso as any).seconds * 1000 
        : new Date(activeDraw.deadlineIso).getTime()) 
    : 0;
  const deadlineTime = isNaN(rawDeadlineTime) ? 0 : rawDeadlineTime;
  const isTimeUp = (activeDraw?.status === 'closed') || (activeDraw?.bookingStatusUrdu === 'بکنگ بند ہے') || (deadlineTime > 0 && timeTicker >= deadlineTime);

  const getRemainingTimeString = () => {
    if (activeDraw?.status === 'closed') return 'بکنگ بند ہے (Closed)';
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

  const getFormattedDeadline = (drawObj = activeDraw) => {
    if (!drawObj || !drawObj.deadlineIso) return 'مقرر نہیں ہے';
    try {
      const d = typeof drawObj.deadlineIso === 'object' && (drawObj.deadlineIso as any).seconds 
        ? new Date((drawObj.deadlineIso as any).seconds * 1000) 
        : new Date(drawObj.deadlineIso);
      if (isNaN(d.getTime())) return String(drawObj.deadlineIso || 'مقرر نہیں ہے');
      const dateStr = d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
      const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      return `${dateStr} بوقت ${timeStr}`;
    } catch (e) {
      return String(drawObj.deadlineIso || 'مقرر نہیں ہے');
    }
  };

  const getFormattedClosedOn = (drawObj = activeDraw) => {
    if (!drawObj || !drawObj.deadlineIso) return '';
    try {
      const d = typeof drawObj.deadlineIso === 'object' && (drawObj.deadlineIso as any).seconds 
        ? new Date((drawObj.deadlineIso as any).seconds * 1000) 
        : new Date(drawObj.deadlineIso);
      if (isNaN(d.getTime())) return String(drawObj.deadlineIso || '');
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (e) {
      return String(drawObj.deadlineIso || '');
    }
  };

  const pageTitleUrdu = category === 'pakistan_bond'
    ? 'پاکستان پرائز بانڈ بکنگ پورٹل'
    : category === 'thailand_lottery'
      ? 'تھائی لینڈ ڈرا بکنگ پورٹل'
      : 'پرائز بانڈ و ڈرا بکنگ پورٹل (Unified Draw Booking)';
  
  const pageTitleEnglish = category === 'pakistan_bond'
    ? 'PAKISTAN BOND DRAW'
    : category === 'thailand_lottery'
      ? 'THAILAND LOTTERY DRAW'
      : 'UNIFIED DRAW BOOKING';

  const userEmailLower = (user?.email || '').toLowerCase();
  
  // Filter bookings and demands for current active customer view
  const filterBookings = (bookings || []).filter(b => {
    if (!b || (b.userEmail || '').toLowerCase() !== userEmailLower) return false;
    if (category === 'unified') {
      return selectedDrawId ? (b.drawId === selectedDrawId || b.category === activeDraw?.category) : true;
    }
    return b.category === category;
  });

  const filterDemands = (demands || []).filter(d => {
    if (!d || (d.userEmail || '').toLowerCase() !== userEmailLower) return false;
    if (category === 'unified') {
      return selectedDrawId ? (d.drawId === selectedDrawId || d.category === activeDraw?.category) : true;
    }
    return d.category === category;
  });

  const relevantLimits = (limits || []).filter(l => {
    if (!l) return false;
    if (selectedDrawId && l.drawId) {
      return l.drawId === selectedDrawId;
    }
    return l.category === (activeDraw?.category || (category === 'unified' ? 'pakistan_bond' : category));
  });

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

    if ((user?.balance ?? 0) < totalCost) {
      setErrorStatus('آپ کے والٹ میں کافی رقم موجود نہیں ہے! ڈیمانڈ منظور ہونے پر رقم درکار ہوگی۔');
      return;
    }

    const res = await onAddDemand(
      numInput, 
      firstAmt, 
      secondAmt, 
      activeDraw?.nextPrizeBondValue, 
      activeDraw?.nextDrawNumber, 
      activeDraw?.nextDrawDate,
      activeDraw?.nextDrawCity,
      activeDraw?.id || activeDraw?.category
    );
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
    if ((user?.balance ?? 0) < totalCost) {
      setErrorStatus('آپ کے والٹ میں کافی رقم موجود نہیں ہے! کسٹمر سپورٹ یا ایڈمن سے رابطہ کریں۔');
      return;
    }

    const res = await onAddBooking(
      numInput, 
      firstAmt, 
      secondAmt, 
      activeDraw?.nextPrizeBondValue, 
      activeDraw?.nextDrawNumber, 
      activeDraw?.nextDrawDate,
      activeDraw?.nextDrawCity,
      activeDraw?.id || activeDraw?.category
    );
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
    const res = generateBookingPDF(
      user.name || '',
      user.email || '',
      user.phone || '',
      user.city || '',
      filterBookings,
      category
    );
    if (res.success) {
      setSuccessStatus('پی ڈی ایف فائل کامیابی سے تیار اور ڈاؤن لوڈ کر دی گئی ہے!');
    } else {
      setErrorStatus(res.error || 'پی ڈی ایف فائل بنانے میں خرابی پیش آئی۔');
    }
  };

  return (
    <div className="space-y-6 text-right font-sans max-w-4xl mx-auto">
      <BookingDrawHeader
        category={category}
        pageTitleUrdu={pageTitleUrdu}
        pageTitleEnglish={pageTitleEnglish}
        isTimeUp={isTimeUp}
        activeDraw={activeDraw}
        pakDraws={pakDraws}
        availableDraws={categoryDraws}
        selectedDrawId={selectedDrawId}
        setSelectedDrawId={setSelectedDrawId}
        timeTicker={timeTicker}
        getRemainingTimeString={getRemainingTimeString}
        getFormattedDeadline={getFormattedDeadline}
        getFormattedClosedOn={getFormattedClosedOn}
      />

      <BookingFormSection
        isTimeUp={isTimeUp}
        errorStatus={errorStatus}
        successStatus={successStatus}
        numInput={numInput}
        setNumInput={setNumInput}
        firstAmtInput={firstAmtInput}
        setFirstAmtInput={setFirstAmtInput}
        secondAmtInput={secondAmtInput}
        setSecondAmtInput={setSecondAmtInput}
        currentTotalCost={currentTotalCost}
        handleSubmit={handleSubmit}
        handleDemandClick={handleDemandClick}
        relevantLimits={relevantLimits}
      />

      <BookingsAndDemandsTables
        category={category}
        filterBookings={filterBookings}
        filterDemands={filterDemands}
        timeTicker={timeTicker}
        handleDownloadPDF={handleDownloadPDF}
        handleCancelClick={handleCancelClick}
      />
    </div>
  );
}
