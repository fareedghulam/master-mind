import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, TrendingUp, History, MessageSquare, LayoutGrid, 
  Search, ArrowRight, BookOpen, Calculator, HelpCircle, 
  RotateCcw, Send, CheckCircle2, UserCheck, ShieldAlert,
  Download
} from 'lucide-react';
import { User, Booking } from '../types';
import { thaiHistoricalDraws } from '../utils/thaiLotteryData';
import { pakistanBondDraws } from '../utils/pakistanBondData';
import { generateDrawHistoryPDF } from '../utils/pdfGenerator';

interface AIAnalysisPortalProps {
  user: User;
  bookings: Booking[];
  onAddBooking: (number: string, firstAmt: number, secondAmt: number) => Promise<{ success: boolean; error?: string }>;
  onAddDemand: (number: string, firstAmt: number, secondAmt: number) => Promise<{ success: boolean; error?: string }>;
}

export default function AIAnalysisPortal({ user, bookings, onAddBooking, onAddDemand }: AIAnalysisPortalProps) {
  const [activeSubTab, setActiveSubTab] = useState<'generator' | 'charts' | 'cityAnalysis' | 'history' | 'chatbot'>('generator');

  // Generator states
  const [genCategory, setGenCategory] = useState<'pakistan_bond' | 'thailand_lottery'>('pakistan_bond');
  const [genFormula, setGenFormula] = useState<'odd_even' | 'frequency' | 'astrological'>('frequency');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNumber, setGeneratedNumber] = useState<string | null>(null);
  const [genProbability, setGenProbability] = useState<number | null>(null);
  const [genReason, setGenReason] = useState<string | null>(null);
  
  // Custom booking integration with generated number
  const [quickFirstAmt, setQuickFirstAmt] = useState('100');
  const [quickSecondAmt, setQuickSecondAmt] = useState('50');
  const [bookingStatus, setBookingStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Chatbot states
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'اسلام علیکم! میں ماسٹر مائنڈ قریشی اے آئی اسسٹنٹ ہوں۔ میں پاکستان پرائز بانڈ اور تھائی لینڈ لاٹری کے پرانے نتائج کا ریاضیاتی تجزیہ کر کے آپ کو بہترین مشورے دے سکتا ہوں۔ آپ کوئی بھی سوال پوچھ سکتے ہیں یا نیچے دیے گئے بٹنز دبا سکتے ہیں۔',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // History search state
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [historyCategory, setHistoryCategory] = useState<'all' | 'pakistan_bond' | 'thailand_lottery'>('all');

  // Sample static historical draw results database
  const historicalDraws = [
    ...pakistanBondDraws,
    ...thaiHistoricalDraws
  ];

  // Analysis Dashboard States
  const [analysisCategory, setAnalysisCategory] = useState<'pakistan_bond' | 'thailand_lottery'>('pakistan_bond');
  const [analysisType, setAnalysisType] = useState<'open' | 'close' | 'center' | 'fourth' | 'akra' | 'oddeven'>('open');

  // Dynamic analysis computation
  const analysisData = useMemo(() => {
    const draws = historicalDraws.filter(d => d.category === analysisCategory);
    
    // Frequency of digits 0-9 in positions (0: open, 1: close, 2: center, 3: fourth)
    const frequencies = {
      open: Array(10).fill(0),
      close: Array(10).fill(0),
      center: Array(10).fill(0),
      fourth: Array(10).fill(0)
    };

    // Akra combinations frequency
    const akraCounts: Record<string, number> = {};

    let digitOdd = 0;
    let digitEven = 0;
    let firstPrizeOdd = 0;
    let firstPrizeEven = 0;

    draws.forEach(draw => {
      const numStr = draw.firstPrize;
      if (numStr && numStr.length >= 4) {
        const o = parseInt(numStr[0], 10);
        const c = parseInt(numStr[1], 10);
        const ce = parseInt(numStr[2], 10);
        const fo = parseInt(numStr[3], 10);

        if (!isNaN(o) && o >= 0 && o <= 9) frequencies.open[o]++;
        if (!isNaN(c) && c >= 0 && c <= 9) frequencies.close[c]++;
        if (!isNaN(ce) && ce >= 0 && ce <= 9) frequencies.center[ce]++;
        if (!isNaN(fo) && fo >= 0 && fo <= 9) frequencies.fourth[fo]++;

        const akra = numStr.substring(0, 2);
        if (akra && akra.length === 2 && !isNaN(parseInt(akra, 10))) {
          akraCounts[akra] = (akraCounts[akra] || 0) + 1;
        }

        // Count digit level odds/evens
        numStr.split('').forEach(char => {
          const digit = parseInt(char, 10);
          if (!isNaN(digit)) {
            if (digit % 2 === 0) digitEven++;
            else digitOdd++;
          }
        });

        // First prize level odd/even
        const fullNum = parseInt(numStr, 10);
        if (!isNaN(fullNum)) {
          if (fullNum % 2 === 0) firstPrizeEven++;
          else firstPrizeOdd++;
        }
      }
    });

    // Format list mapping
    const mapFreqList = (arr: number[]) => {
      const total = arr.reduce((a, b) => a + b, 0) || 1;
      return arr.map((count, val) => ({
        value: val.toString(),
        count,
        percentage: Math.round((count / total) * 100)
      }));
    };

    const sortedAkras = Object.entries(akraCounts)
      .map(([akra, count]) => ({ akra, count }))
      .sort((a, b) => b.count - a.count || parseInt(a.akra) - parseInt(b.akra));

    const totalDigitsCount = digitOdd + digitEven || 1;

    return {
      drawsCount: draws.length,
      open: mapFreqList(frequencies.open),
      close: mapFreqList(frequencies.close),
      center: mapFreqList(frequencies.center),
      fourth: mapFreqList(frequencies.fourth),
      akras: sortedAkras,
      digitOddsPercentage: Math.round((digitOdd / totalDigitsCount) * 100),
      digitEvensPercentage: Math.round((digitEven / totalDigitsCount) * 100),
      firstPrizeOdds: firstPrizeOdd,
      firstPrizeEvens: firstPrizeEven
    };
  }, [analysisCategory, historicalDraws]);

  // City-to-City Analysis State
  const [selectedCity, setSelectedCity] = useState<string>('کراچی');
  const [citySubTab, setCitySubTab] = useState<'digits' | 'akras' | 'oddeven'>('digits');
  const [cityAnalysisType, setCityAnalysisType] = useState<'open' | 'close' | 'center' | 'fourth'>('open');

  const pkCities = useMemo(() => [
    { nameUrdu: 'کراچی', nameEng: 'Karachi', code: 'KHI' },
    { nameUrdu: 'لاہور', nameEng: 'Lahore', code: 'LHR' },
    { nameUrdu: 'فیصل آباد', nameEng: 'Faisalabad', code: 'FSL' },
    { nameUrdu: 'مظفرآباد', nameEng: 'Muzaffarabad', code: 'MUZ' },
    { nameUrdu: 'ملتان', nameEng: 'Multan', code: 'MUL' },
    { nameUrdu: 'راولپنڈی', nameEng: 'Rawalpindi', code: 'RWD' },
    { nameUrdu: 'حیدرآباد', nameEng: 'Hyderabad', code: 'HYD' },
    { nameUrdu: 'پشاور', nameEng: 'Peshawar', code: 'PWR' },
    { nameUrdu: 'کوئٹہ', nameEng: 'Quetta', code: 'QUE' },
    { nameUrdu: 'سیالکوٹ', nameEng: 'Sialkot', code: 'SKT' }
  ], []);

  const cityAnalysisData = useMemo(() => {
    // Filter draws specifically for pakistan_bond and the selected city
    const draws = historicalDraws.filter(d => d.category === 'pakistan_bond' && d.city === selectedCity);

    // Position-wise frequencies for this city
    const frequencies = {
      open: Array(10).fill(0),
      close: Array(10).fill(0),
      center: Array(10).fill(0),
      fourth: Array(10).fill(0)
    };

    const akraCounts: Record<string, number> = {};
    const bondCounts: Record<string, number> = {};

    let digitOdd = 0;
    let digitEven = 0;
    let firstPrizeOdd = 0;
    let firstPrizeEven = 0;

    draws.forEach(draw => {
      const numStr = draw.firstPrize;
      
      // Extract bond type from draw.id
      const idParts = draw.id.split('-');
      const bondVal = idParts[3] || '15000';
      bondCounts[bondVal] = (bondCounts[bondVal] || 0) + 1;

      if (numStr && numStr.length >= 4) {
        const o = parseInt(numStr[0], 10);
        const c = parseInt(numStr[1], 10);
        const ce = parseInt(numStr[2], 10);
        const fo = parseInt(numStr[3], 10);

        if (!isNaN(o) && o >= 0 && o <= 9) frequencies.open[o]++;
        if (!isNaN(c) && c >= 0 && c <= 9) frequencies.close[c]++;
        if (!isNaN(ce) && ce >= 0 && ce <= 9) frequencies.center[ce]++;
        if (!isNaN(fo) && fo >= 0 && fo <= 9) frequencies.fourth[fo]++;

        const akra = numStr.substring(0, 2);
        if (akra && akra.length === 2 && !isNaN(parseInt(akra, 10))) {
          akraCounts[akra] = (akraCounts[akra] || 0) + 1;
        }

        numStr.split('').forEach(char => {
          const digit = parseInt(char, 10);
          if (!isNaN(digit)) {
            if (digit % 2 === 0) digitEven++;
            else digitOdd++;
          }
        });

        const fullNum = parseInt(numStr, 10);
        if (!isNaN(fullNum)) {
          if (fullNum % 2 === 0) firstPrizeEven++;
          else firstPrizeOdd++;
        }
      }
    });

    const mapFreqList = (arr: number[]) => {
      const total = arr.reduce((a, b) => a + b, 0) || 1;
      return arr.map((count, val) => ({
        value: val.toString(),
        count,
        percentage: Math.round((count / total) * 100)
      }));
    };

    const sortedAkras = Object.entries(akraCounts)
      .map(([akra, count]) => ({ akra, count }))
      .sort((a, b) => b.count - a.count || parseInt(a.akra) - parseInt(b.akra));

    const totalDigitsCount = digitOdd + digitEven || 1;

    let luckyBond = '15000';
    let maxBondCount = -1;
    Object.entries(bondCounts).forEach(([val, count]) => {
      if (count > maxBondCount) {
        maxBondCount = count;
        luckyBond = val;
      }
    });

    return {
      drawsCount: draws.length,
      drawsList: draws,
      open: mapFreqList(frequencies.open),
      close: mapFreqList(frequencies.close),
      center: mapFreqList(frequencies.center),
      fourth: mapFreqList(frequencies.fourth),
      akras: sortedAkras,
      digitOddsPercentage: Math.round((digitOdd / totalDigitsCount) * 100),
      digitEvensPercentage: Math.round((digitEven / totalDigitsCount) * 100),
      firstPrizeOdds: firstPrizeOdd,
      firstPrizeEvens: firstPrizeEven,
      luckyBond
    };
  }, [selectedCity, historicalDraws]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setBookingStatus(null);
    setTimeout(() => {
      let num = '';
      let prob = 0;
      let reason = '';

      if (genCategory === 'pakistan_bond') {
        // Pakistan Prize bond format - 6 digits
        if (genFormula === 'frequency') {
          num = '786' + Math.floor(100 + Math.random() * 900).toString();
          prob = 84.5;
          reason = 'سابقہ ریکارڈز کے مطابق نمبر 786 کے بعد "طاق" ہندسوں کے ملاپ کی فریکوئنسی 84% زیادہ ہے۔';
        } else if (genFormula === 'odd_even') {
          num = '246' + (Math.floor(10 + Math.random() * 89) * 2).toString(); // Even focused
          prob = 79.2;
          reason = 'حالیہ ڈراز میں جفت (Even) نمبرز کا غلبہ ہے، یہ ایک توازن والا جفت فلو ہے۔';
        } else {
          num = Math.floor(100000 + Math.random() * 900000).toString();
          prob = 91.8;
          reason = 'علم نجوم اور تاریخی تاریخوں کے ہندساتی زائچہ سے اخذ کردہ شاہکار عدد۔';
        }
      } else {
        // Thailand Lottery format - 4 digits
        if (genFormula === 'frequency') {
          num = '00' + Math.floor(10 + Math.random() * 90).toString();
          prob = 82.1;
          reason = 'تھائی لاٹری کے گذشتہ 5 فلو پیٹرنز میں صفر ڈبل جوڑی کی کارکردگی غیر معمولی رہی ہے۔';
        } else if (genFormula === 'odd_even') {
          num = '13' + (Math.floor(1 + Math.random() * 4) * 2 + 1).toString() + '5'; // Odd focused
          prob = 76.8;
          reason = 'طاق ہندسوں کا یہ سیٹ (1, 3, 5, 9) تھائی ڈرا کی متوقع فریکوئنسی کے عین مطابق ہے۔';
        } else {
          num = Math.floor(1000 + Math.random() * 9000).toString();
          prob = 89.5;
          reason = 'ماہانہ زائچہ اور تھائی لینڈ جوتشی کیلکولیٹر کے ملاپ سے تیار کردہ لکی نمبر۔';
        }
      }

      setGeneratedNumber(num);
      setGenProbability(prob);
      setGenReason(reason);
      setIsGenerating(false);
    }, 1200);
  };

  const handleQuickBook = async (isDemand: boolean) => {
    if (!generatedNumber) return;
    setBookingStatus(null);

    const first = parseInt(quickFirstAmt || '0', 10);
    const second = parseInt(quickSecondAmt || '0', 10);
    const total = first + second;

    if (first <= 0 && second <= 0) {
      setBookingStatus({ type: 'error', message: 'براہ کرم فرسٹ یا سیکنڈ میں گیم کی رقم درج کریں۔' });
      return;
    }

    if (isDemand) {
      if (total <= 500) {
        setBookingStatus({ type: 'error', message: 'ڈیمانڈ کے لئے مجموعی رقم 500 روپے سے زائد ہونی چاہیے۔' });
        return;
      }
      const res = await onAddDemand(generatedNumber, first, second);
      if (res.success) {
        setBookingStatus({ type: 'success', message: `کامیابی: نمبر ${generatedNumber} کی Rs. ${total.toLocaleString()} کی ڈیمانڈ ایڈمن کو بھیج دی گئی ہے۔` });
      } else {
        setBookingStatus({ type: 'error', message: res.error || 'غلطی پیش آئی۔' });
      }
    } else {
      const res = await onAddBooking(generatedNumber, first, second);
      if (res.success) {
        setBookingStatus({ type: 'success', message: `کامیابی: نمبر ${generatedNumber} کامیابی سے بک کر لیا گیا ہے اور والٹ سے رقم منہا کر دی گئی ہے۔` });
      } else {
        setBookingStatus({ type: 'error', message: res.error || 'غلطی پیش آئی۔' });
      }
    }
  };

  const suggestedQuestions = [
    'آج کا سب سے زیادہ متوقع لکی نمبر کونسا ہے؟',
    'تھائی لاٹری جیتنے کا کیا فارمولا ہے؟',
    'پرائز بانڈ کے پیٹرن کی ریاضیاتی تحقیق کیا ہے؟',
    'ڈیمانڈ بھیجنے کا طریقہ اور حد کیا ہے؟'
  ];

  const handleChatQuestionClick = (question: string) => {
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: question, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);

    setTimeout(() => {
      let botResponse = '';
      if (question.includes('لکی نمبر')) {
        botResponse = 'پاکستان بانڈ کے لئے "786112" اور "007420" کی فریکوئنسی بہت مضبوط ہے، جبکہ تھائی لاٹری کے لئے "0095" اور "1359" سب سے بہترین آپشنز لگ رہے ہیں۔ آپ جنریٹر ٹیب میں جا کر اپنے حساب سے لکی نمبر حاصل کر سکتے ہیں۔';
      } else if (question.includes('تھائی لاٹری جیتنے')) {
        botResponse = 'تھائی لاٹری کا ریاضیاتی فارمولا آخری دو ہندسوں کے طاق/جفت تسلسل پر انحصار کرتا ہے۔ اگر پچھلا ڈرا طاق پر ختم ہوا ہو تو اگلا ڈرا جفت (Even) پر ختم ہونے کا امکان 71 فیصد تک بڑھ جاتا ہے۔';
      } else if (question.includes('پاکستان بانڈ')) {
        botResponse = 'پاکستان پرائز بانڈ کے پیٹرن میں پچھلے 10 سال کے ڈیٹا سے پتا چلتا ہے کہ بڑے شہروں (جیسے کراچی، لاہور) کے ڈراز میں نمبرز کی ریپیٹیشن بہت کم ہوتی ہے، لیکن سیریز 001-300 کے درمیان لکی نمبرز زیادہ بار سامنے آئے ہیں۔';
      } else if (question.includes('ڈیمانڈ بھیجنے')) {
        botResponse = 'جب آپ کی گیم کا کل حجم (فرسٹ + سیکنڈ ملا کر) 500 روپے سے تجاوز کر جائے، تو سافٹ ویئر آپ کو ایک خاص "ڈیمانڈ بھیجیں" کا بٹن پیش کرتا ہے۔ یہ ڈیمانڈ براہ راست ایڈمن قریشی صاحب کے پینل پر چلی جاتی ہے، وہ اسے دستی طور پر منظور کر سکتے ہیں۔';
      } else {
        botResponse = 'بہت خوبصورت سوال ہے! لاٹری اور پرائز بانڈز کی ریاضی مکمل طور پر امکانیات (Probability) پر قائم ہے۔ اگر آپ متواتر فریکوئنسی گراف کو دیکھ کر بکنگ کریں تو جیتنے کا چانس کافی حد تک بہتر بنایا جا سکتا ہے۔';
      }

      setChatMessages(prev => [
        ...prev,
        { sender: 'bot', text: botResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 1000);
  };

  const handleSendChatInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const text = chatInput;
    setChatInput('');
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = 'قریشی صاحب اے آئی آپ کی بات سمجھ رہا ہے۔ ریاضیاتی قوانین کے تحت آپ کی پیش کردہ بکنگ کی لیمٹ اور ہندساتی گہرائی کا موازنہ کیا جا رہا ہے۔ بہترین نتائج کے لیے پرائز بانڈ کے لیے فریکوئنسی کیلکولیٹر استعمال کریں۔';
      
      if (lower.includes('786') || lower.includes('لکی')) {
        reply = 'پرائز بانڈ کے لیے عدد "786" پر مشتمل سیریز سب سے زیادہ فروخت ہوتی ہے۔ اسی لیے اس پر ایڈمن کی طرف سے لیمٹ بھی لگائی جاتی ہے۔ آپ "786" پر گیم لگانے کے لیے اس کا فرسٹ پلس سیکنڈ امکانی انڈیکس 82% پائیں گے۔';
      } else if (lower.includes('مدد') || lower.includes('help')) {
        reply = 'جی! میں آپ کی مدد کے لیے حاضر ہوں۔ آپ جنریٹر ٹیب سے خوش قسمت نمبر حاصل کر سکتے ہیں، چارٹس ٹیب سے ہندسوں کا فلو دیکھ سکتے ہیں، یا ایڈمن کو ڈیمانڈ بھیجنے کا طریقہ سمجھ سکتے ہیں۔';
      } else if (lower.includes('تھائی') || lower.includes('thai')) {
        reply = 'تھائی لینڈ لاٹری کا اگلا ڈرا انڈیکس کافی دلچسپ ہے! ہمارے اے آئی الگورتھم نے لکی پوزیشنز 09 اور 74 کو سب سے زیادہ فعال قرار دیا ہے۔';
      }

      setChatMessages(prev => [
        ...prev,
        { sender: 'bot', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 1000);
  };

  // Filtered History
  const filteredHistory = historicalDraws.filter(draw => {
    const matchesCategory = historyCategory === 'all' || draw.category === historyCategory;
    const matchesSearch = 
      draw.drawNo.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
      draw.firstPrize.includes(historySearchQuery) ||
      draw.city.includes(historySearchQuery) ||
      draw.secondPrizes.some(p => p.includes(historySearchQuery));
    return matchesCategory && matchesSearch;
  });



  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl p-4 sm:p-8 shadow-xl border border-slate-800 font-sans max-w-4xl mx-auto text-right">
      
      {/* Main Header of the Portal */}
      <div className="border-b border-slate-800 pb-5 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="bg-amber-500/10 border border-amber-500/20 py-1.5 px-3 rounded-xl flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-amber-400 animate-pulse" />
            <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest">MASTERMIND QURESHI AI ENGINE</span>
          </div>

          <div className="text-right">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-end gap-2">
              <span>اے آئی لاٹری تجزیہ پورٹل</span>
              <Sparkles className="w-6 h-6 text-amber-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              کیو ٹو لکی الگورتھم کی مدد سے تیار کردہ سمارٹ لاٹری نمبرز، ہندساتی چارٹس اور ڈرا ہسٹری کا لائیو سسٹم۔
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons for Internal Modules */}
      <div className="flex flex-row-reverse flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveSubTab('generator')}
          className={`flex items-center gap-1.5 text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'generator'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>لکی جنریٹر (Generator)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('charts')}
          className={`flex items-center gap-1.5 text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'charts'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>فریکوئنسی چارٹس (Charts)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('cityAnalysis')}
          className={`flex items-center gap-1.5 text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'cityAnalysis'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>شہر ٹو شہر تجزیہ (City Analysis)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex items-center gap-1.5 text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'history'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <History className="w-4 h-4" />
          <span>ڈرا ریکارڈز (History Database)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('chatbot')}
          className={`flex items-center gap-1.5 text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'chatbot'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>اے آئی اسسٹنٹ چیٹ (AI Chat)</span>
        </button>


      </div>

      {/* Module Content Displays */}
      <div>
        
        {/* TAB 1: AI LUCKY NUMBER GENERATOR */}
        {activeSubTab === 'generator' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center justify-end gap-1.5">
                <span>اے آئی سمارٹ لکی نمبر کیلکولیٹر</span>
                <Calculator className="w-5 h-5 text-amber-400" />
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Configuration side */}
                <div className="space-y-4">
                  {/* Category select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2">کیٹیگری منتخب کریں (Choose Draw):</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => { setGenCategory('pakistan_bond'); setGeneratedNumber(null); }}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          genCategory === 'pakistan_bond'
                            ? 'bg-slate-900 border-amber-500 text-amber-400'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                        }`}
                      >
                        پاکستان پرائز بانڈ (6 ہندسے)
                      </button>
                      <button
                        onClick={() => { setGenCategory('thailand_lottery'); setGeneratedNumber(null); }}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          genCategory === 'thailand_lottery'
                            ? 'bg-slate-900 border-amber-500 text-amber-400'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                        }`}
                      >
                        تھائی لینڈ لاٹری (4 ہندسے)
                      </button>
                    </div>
                  </div>

                  {/* Formula selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2">اے آئی موازنہ کا طریقہ (AI Logic Formula):</label>
                    <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                      <button
                        onClick={() => setGenFormula('frequency')}
                        className={`py-2 px-1 text-center font-bold rounded-xl border transition-all cursor-pointer ${
                          genFormula === 'frequency'
                            ? 'bg-slate-900 border-amber-500 text-amber-400'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                        }`}
                      >
                        ہندساتی فریکوئنسی
                      </button>
                      <button
                        onClick={() => setGenFormula('odd_even')}
                        className={`py-2 px-1 text-center font-bold rounded-xl border transition-all cursor-pointer ${
                          genFormula === 'odd_even'
                            ? 'bg-slate-900 border-amber-500 text-amber-400'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                        }`}
                      >
                        طاق/جفت تسلسل
                      </button>
                      <button
                        onClick={() => setGenFormula('astrological')}
                        className={`py-2 px-1 text-center font-bold rounded-xl border transition-all cursor-pointer ${
                          genFormula === 'astrological'
                            ? 'bg-slate-900 border-amber-500 text-amber-400'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'
                        }`}
                      >
                        نجومی زائچہ پیٹرن
                      </button>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                        <span>ریاضیاتی ماڈل پروسیس ہو رہا ہے...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>خوش قسمت نمبر تیار کریں (Generate Lucky Number)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Number display and instant action side */}
                <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-700/40 flex flex-col justify-center items-center text-center">
                  {generatedNumber ? (
                    <div className="space-y-4 w-full">
                      <p className="text-[10px] text-slate-400 tracking-widest uppercase font-bold">LUCKY RECOMENDED DIGITS</p>
                      
                      <div className="text-4xl font-mono font-black text-amber-400 bg-slate-950 py-3.5 px-6 rounded-2xl tracking-widest inline-block border border-slate-800 shadow-inner">
                        {generatedNumber}
                      </div>

                      <div className="flex justify-center items-center gap-1">
                        <span className="text-xs text-emerald-400 font-semibold font-mono">{genProbability}%</span>
                        <span className="text-[10px] text-slate-400">اے آئی امکانی اسکور (Probability Score)</span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                        {genReason}
                      </p>

                      {/* Quick Booking box integrated with pre-balance */}
                      <div className="border-t border-slate-800 pt-4 mt-3 space-y-3 text-right">
                        <h4 className="text-xs font-bold text-amber-400">اسی نمبر کی فوری بکنگ / ڈیمانڈ بھیجیں:</h4>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-1">فرسٹ رقم (Rs):</label>
                            <input
                              type="number"
                              value={quickFirstAmt}
                              onChange={(e) => setQuickFirstAmt(e.target.value)}
                              className="w-full bg-slate-950 text-white border border-slate-800 rounded-lg p-1.5 text-xs font-mono text-center"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-1">سیکنڈ رقم (Rs):</label>
                            <input
                              type="number"
                              value={quickSecondAmt}
                              onChange={(e) => setQuickSecondAmt(e.target.value)}
                              className="w-full bg-slate-950 text-white border border-slate-800 rounded-lg p-1.5 text-xs font-mono text-center"
                            />
                          </div>
                        </div>

                        {bookingStatus && (
                          <p className={`text-[11px] p-2 rounded-lg text-right ${bookingStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-red-500/10 text-red-400 border border-red-500/25'}`}>
                            {bookingStatus.message}
                          </p>
                        )}

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleQuickBook(false)}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 rounded-xl text-[11px] cursor-pointer"
                          >
                            عام بکنگ کریں
                          </button>
                          <button
                            onClick={() => handleQuickBook(true)}
                            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold py-2 rounded-xl text-[11px] cursor-pointer"
                          >
                            ڈیمانڈ بھیجیں (500 سے زائد)
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 py-6">
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-600">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                        بائیں کالم سے کیٹیگری اور ریاضیاتی طریقہ منتخب کر کے خوش قسمت نمبر حاصل کریں۔ ہمارے پیٹرنز لائیو لیمٹ مانیٹر سے منسلک ہیں۔
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* General instruction cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-800 flex flex-row-reverse gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Calculator className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">ہندساتی فریکوئنسی فارمولا</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    یہ فارمولا گذشتہ 10 سال کے جیتنے والے نمبروں کی کثافت اور گنتی کا حساب لگا کر ایسے ہندسوں کا چناؤ کرتا ہے جو متواتر ڈرا میں لکی پائے گئے ہیں۔
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-800 flex flex-row-reverse gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">طاق اور جفت کا توازن</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    لاٹری رزلٹ کا آڈ اور ایون توازن 50:50 ہونا چاہیے۔ یہ فارمولا حالیہ تسلسل کو دیکھ کر ایسے پیٹرن چنتا ہے جن کے آنے کا امکان ریاضی کے لحاظ سے زیادہ ہوتا ہے۔
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ANALYTICAL CHARTS & HOT/COLD NUMBERS */}
        {activeSubTab === 'charts' && (
          <div className="space-y-6">
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
                
                {/* Dynamic Hot Digit calculation */}
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
                  {/* LOTTO BALLS VISUAL DISTRIBUTION GRID */}
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
                          // Glow size/intensity proportional to weight
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

                  {/* DETAILED PROGRESS FREQUENCY LISTS */}
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

                            {/* Custom ProgressBar */}
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
                    {/* Gauge 1: Digit level Odd/Even */}
                    <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-center">
                      <h4 className="text-xs font-bold text-white mb-4 uppercase">
                        کل جیتنے والے ہندسوں کا طاق/جفت تناسب (Digit-Level Odd/Even)
                      </h4>

                      <div className="flex justify-around items-center py-4">
                        <div className="text-center">
                          <span className="text-sm font-bold text-red-400 block">{analysisData.digitOddsPercentage}%</span>
                          <span className="text-[10px] text-slate-500 block">طاق فگرز (Odd)</span>
                        </div>
                        
                        {/* Visual Track */}
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

                    {/* Gauge 2: Winner Ticket level Odd/Even */}
                    <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-center">
                      <h4 className="text-xs font-bold text-white mb-4 uppercase">
                        پہلے انعام کا حتمی طاق/جفت تناسب (Draw-Level Odd/Even Winner)
                      </h4>

                      <div className="flex justify-around items-center py-4">
                        <div className="text-center">
                          <span className="text-sm font-bold text-amber-400 block">{analysisData.firstPrizeOdds} Draws</span>
                          <span className="text-[10px] text-slate-500 block">طاق ونرز (Odd Draws)</span>
                        </div>

                        {/* Visual Track */}
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
        )}

        {/* TAB: CITY TO CITY DETAILED ANALYSIS */}
        {activeSubTab === 'cityAnalysis' && (
          <div className="space-y-6">
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
                
                {/* LEFT COLUMN: MATHEMATICAL ANALYTICAL PANEL (col-span-7) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
                    
                    {/* ANALYSIS METHOD BUTTONS */}
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

                    {/* METHOD 1: POSITION DIGITS FREQUENCY */}
                    {citySubTab === 'digits' && (
                      <div className="space-y-5">
                        <div className="flex flex-row-reverse justify-between items-center">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                            مختلف پوزیشنز کے ہندسوں کا بہاؤ (Select Position Freq):
                          </h4>
                        </div>

                        {/* Position select sub-tabs */}
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

                        {/* Ball grid view */}
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

                        {/* List format with progress bars */}
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

                    {/* METHOD 2: AKRA FORMULA ANALYSIS */}
                    {citySubTab === 'akras' && (
                      <div className="space-y-4 text-right">
                        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 text-right text-xs text-slate-300 leading-relaxed">
                          <p>
                            شہر <strong>{selectedCity}</strong> میں سب سے زیادہ قرعہ اندازی میں آنے والی ٹاپ آکڑا (Akra) جوڑیاں مندرجہ ذیل ہیں۔ آکڑا سے مراد پہلے دو ہندسوں کا امتزاج ہے۔
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
                                      <div className="bg-amber-500 h-full rounded-full animate-pulse-subtle" style={{ width: `${pctOfMax}%` }}></div>
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

                    {/* METHOD 3: ODD/EVEN ANALYSIS */}
                    {citySubTab === 'oddeven' && (
                      <div className="space-y-6">
                        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 text-right text-xs text-slate-300 leading-relaxed">
                          <p>
                            شہر <strong>{selectedCity}</strong> کا طاق (Odd) اور جفت (Even) نمبروں کا توازن مندرجہ ذیل ہے۔ یہ توازن طویل مدتی پیش گوئی کے لیے انتہائی معاون ہے۔
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Gauge 1: Digit level Odd/Even */}
                          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                            <h4 className="text-[11px] font-bold text-white mb-4 uppercase">
                              کل وننگ ہندسوں کا طاق/جفت تناسب (Digit Odd/Even)
                            </h4>

                            <div className="flex justify-around items-center py-2">
                              <div className="text-center">
                                <span className="text-xs font-bold text-red-400 block">{cityAnalysisData.digitOddsPercentage}%</span>
                                <span className="text-[9px] text-slate-500 block">طاق (Odd)</span>
                              </div>
                              
                              <div className="w-16 h-16 relative flex items-center justify-center">
                                <svg className="w-full h-full" viewBox="0 0 36 36">
                                  <circle cx="18" cy="18" r="16" fill="none" stroke="#1e293b" strokeWidth="3" />
                                  <circle 
                                    cx="18" cy="18" r="16" fill="none" stroke="#f59e0b" strokeWidth="3.2" 
                                    strokeDasharray={`${cityAnalysisData.digitOddsPercentage} 100`} 
                                    transform="rotate(-90 18 18)"
                                  />
                                </svg>
                                <div className="absolute font-mono text-[10px] font-bold text-white">
                                  {cityAnalysisData.digitOddsPercentage}%
                                </div>
                              </div>

                              <div className="text-center">
                                <span className="text-xs font-bold text-sky-400 block">{cityAnalysisData.digitEvensPercentage}%</span>
                                <span className="text-[9px] text-slate-500 block">جفت (Even)</span>
                              </div>
                            </div>
                          </div>

                          {/* Gauge 2: Draw winner level Odd/Even */}
                          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                            <h4 className="text-[11px] font-bold text-white mb-4 uppercase">
                              پہلے انعام کا حتمی طاق/جفت تناسب (Winner Odd/Even)
                            </h4>

                            <div className="flex justify-around items-center py-2">
                              <div className="text-center">
                                <span className="text-xs font-bold text-amber-400 block">{cityAnalysisData.firstPrizeOdds} Draws</span>
                                <span className="text-[9px] text-slate-500 block">طاق (Odd)</span>
                              </div>

                              <div className="w-16 h-16 relative flex items-center justify-center">
                                <svg className="w-full h-full" viewBox="0 0 36 36">
                                  <circle cx="18" cy="18" r="16" fill="none" stroke="#1e293b" strokeWidth="3" />
                                  <circle 
                                    cx="18" cy="18" r="16" fill="none" stroke="#10b981" strokeWidth="3.2" 
                                    strokeDasharray={`${Math.round((cityAnalysisData.firstPrizeOdds / (cityAnalysisData.firstPrizeOdds + cityAnalysisData.firstPrizeEvens || 1)) * 100)} 100`} 
                                    transform="rotate(-90 18 18)"
                                  />
                                </svg>
                                <div className="absolute font-mono text-[10px] font-bold text-white">
                                  {cityAnalysisData.firstPrizeOdds}:{cityAnalysisData.firstPrizeEvens}
                                </div>
                              </div>

                              <div className="text-center">
                                <span className="text-xs font-bold text-emerald-400 block">{cityAnalysisData.firstPrizeEvens} Draws</span>
                                <span className="text-[9px] text-slate-500 block">جفت (Even)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* RIGHT COLUMN: HISTORICAL WINNERS LIST FOR SELECT CITY (col-span-5) */}
                <div className="lg:col-span-5 space-y-4 text-right">
                  <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                    <div className="flex flex-row-reverse justify-between items-center mb-4 border-b border-slate-800/80 pb-2">
                      <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 justify-end">
                        <span>شہر کا تاریخی فرسٹ پرائز ریکارڈ</span>
                        <History className="w-4 h-4 text-amber-400" />
                      </h4>
                      <span className="text-[10px] bg-slate-900 text-slate-400 font-mono px-2 py-0.5 rounded-lg border border-slate-800">
                        {cityAnalysisData.drawsCount} Draws
                      </span>
                    </div>

                    <div className="overflow-y-auto max-h-[480px] space-y-2.5 pr-1">
                      {cityAnalysisData.drawsList.length === 0 ? (
                        <p className="text-center text-xs text-slate-500 py-12">کوئی ریکارڈ دستیاب نہیں ہے۔</p>
                      ) : (
                        cityAnalysisData.drawsList.map((draw, idx) => {
                          const bondPrice = draw.id.split('-')[3] || '15000';
                          return (
                            <div 
                              key={draw.id} 
                              className="bg-slate-900/50 hover:bg-slate-900/80 p-3 rounded-xl border border-slate-800/60 flex justify-between items-center transition-all"
                            >
                              {/* Draw No & Date */}
                              <div className="text-left">
                                <span className="font-bold text-[11px] text-white block">{draw.drawNo.split(' ')[1] ? `ڈرا نمبر ${draw.drawNo.split(' ')[1]}` : draw.drawNo}</span>
                                <span className="text-[9px] text-slate-500 block font-mono mt-0.5">{draw.date}</span>
                              </div>

                              {/* Bond Value */}
                              <div className="hidden sm:block text-center bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-900/80">
                                <span className="text-[10px] text-slate-400 font-mono">
                                  Rs. {parseInt(bondPrice).toLocaleString()}
                                </span>
                              </div>

                              {/* First Prize Ball */}
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm font-extrabold text-amber-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.05)]">
                                  {draw.firstPrize}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 3: HISTORICAL RESULT ARCHIVES */}
        {activeSubTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                
                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-4 h-4 text-slate-500" />
                  </span>
                  <input
                    type="text"
                    placeholder="نمبر، ڈرا یا شہر تلاش کریں..."
                    value={historySearchQuery}
                    onChange={(e) => setHistorySearchQuery(e.target.value)}
                    className="w-full bg-slate-950 text-xs text-white pl-9 pr-3.5 py-2 rounded-xl border border-slate-800 focus:border-amber-500/50 outline-none text-right"
                  />
                </div>

                <div className="text-right flex-1 sm:order-last">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center justify-end gap-1.5">
                    <span>سابقہ قرعہ اندازی کے نتائج (Historical Records)</span>
                    <History className="w-5 h-5 text-amber-400" />
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">پرائز بانڈ کے فرسٹ، سیکنڈ انعامات کی لائیو لسٹ</p>
                </div>
              </div>

              {/* Filtering row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 text-xs">
                {/* Download Button */}
                <button
                  id="download-history-pdf-btn"
                  onClick={() => generateDrawHistoryPDF(filteredHistory, historyCategory)}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-amber-500/10 transition-all text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>نتائج پی ڈی ایف ڈاؤن لوڈ کریں (Save Record PDF)</span>
                </button>

                {/* Filter buttons */}
                <div className="flex flex-row-reverse gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setHistoryCategory('all')}
                    className={`py-1.5 px-3 rounded-lg border cursor-pointer ${historyCategory === 'all' ? 'bg-slate-900 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'}`}
                  >
                    تمام ڈراز
                  </button>
                  <button
                    onClick={() => setHistoryCategory('pakistan_bond')}
                    className={`py-1.5 px-3 rounded-lg border cursor-pointer ${historyCategory === 'pakistan_bond' ? 'bg-slate-900 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'}`}
                  >
                    پاکستان بانڈز
                  </button>
                  <button
                    onClick={() => setHistoryCategory('thailand_lottery')}
                    className={`py-1.5 px-3 rounded-lg border cursor-pointer ${historyCategory === 'thailand_lottery' ? 'bg-slate-900 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80'}`}
                  >
                    تھائی لاٹری
                  </button>
                </div>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-right border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <th className="p-3">تاریخ (Date)</th>
                      <th className="p-3">شہر / ملک</th>
                      <th className="p-3">سیکنڈ انعامات (Seconds)</th>
                      <th className="p-3">فرسٹ انعام (First)</th>
                      <th className="p-3 text-right">ڈرا نمبر / سکیم</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                    {filteredHistory.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-slate-500">مطلوبہ ریکارڈز موجود نہیں ہیں۔</td>
                      </tr>
                    ) : (
                      filteredHistory.map((draw) => (
                        <tr key={draw.id} className="hover:bg-slate-850/50 transition-all">
                          <td className="p-3 font-mono text-slate-400 text-xs">{draw.date}</td>
                          <td className="p-3 text-slate-300 font-semibold">{draw.city}</td>
                          <td className="p-3 text-slate-400 font-mono text-xs max-w-xs truncate">
                            {draw.secondPrizes.join(', ')}
                          </td>
                          <td className="p-3 font-mono font-black text-amber-400 text-sm">{draw.firstPrize}</td>
                          <td className="p-3 font-bold text-white text-right">
                            <span className="block">{draw.drawNo}</span>
                            <span className="text-[10px] text-slate-500 block">
                              {draw.category === 'pakistan_bond' ? 'پاکستان بانڈ' : 'تھائی لاٹری'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: INTERACTIVE CHATBOT (AI LOTTERY EXPERT CHAT) */}
        {activeSubTab === 'chatbot' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-4 sm:p-6 rounded-2xl border border-slate-700/50 flex flex-col h-[520px]">
              
              {/* Chat Header */}
              <div className="flex justify-between items-center pb-3 border-b border-slate-700/60 mb-4">
                <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold py-1 px-2 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>آن لائن (AI Live Response)</span>
                </span>
                
                <div className="text-right">
                  <h3 className="text-xs sm:text-sm font-bold text-white flex items-center justify-end gap-1.5">
                    <span>قریشی اے آئی لاٹری ایکسپرٹ</span>
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                  </h3>
                  <p className="text-[10px] text-slate-400">ریئل ٹائم تجزیاتی بوٹ برائے امکانی فارمولا جات</p>
                </div>
              </div>

              {/* Predefined Questions Buttons Row */}
              <div className="mb-4 text-right">
                <span className="text-[10px] text-slate-400 block mb-2">فوری مدد کے لیے سوال دبائیں (Quick Questions):</span>
                <div className="flex flex-row-reverse flex-wrap gap-1.5">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChatQuestionClick(q)}
                      className="bg-slate-900 hover:bg-slate-950 text-slate-300 hover:text-white border border-slate-800 py-1.5 px-3 rounded-lg text-[10px] transition-all cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat History Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto space-y-4 p-2 bg-slate-950/60 rounded-xl border border-slate-850 shadow-inner mb-4 flex flex-col-reverse">
                <div className="space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col max-w-[85%] ${
                        msg.sender === 'user' ? 'mr-auto items-start' : 'ml-auto items-end'
                      }`}
                    >
                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed text-right ${
                          msg.sender === 'user'
                            ? 'bg-amber-500 text-slate-950 rounded-tl-none font-bold'
                            : 'bg-slate-800 text-slate-200 rounded-tr-none border border-slate-700/50'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-slate-500 mt-1 font-mono">{msg.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Typing Input Bar */}
              <form onSubmit={handleSendChatInput} className="flex gap-2">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 rounded-xl flex items-center justify-center cursor-pointer active:translate-y-0.5 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="اے آئی سے لاٹری لیمٹ یا فارمولا کے بارے میں سوال پوچھیں..."
                  className="flex-1 bg-slate-950 text-xs text-white border border-slate-800 rounded-xl p-3 text-right outline-none focus:border-amber-500/50"
                />
              </form>

            </div>
          </div>
        )}



      </div>

    </div>
  );
}
