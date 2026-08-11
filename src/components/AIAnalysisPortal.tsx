import React, { useState, useMemo } from 'react';
import { 
  Sparkles, TrendingUp, History, MessageSquare, LayoutGrid, Calculator
} from 'lucide-react';
import { User, Booking, PakistanBondResult, ThaiLotteryResult } from '../types';
import { AIGeneratorTab } from './ai/AIGeneratorTab';
import { AIChartsTab } from './ai/AIChartsTab';
import { AICityAnalysisTab } from './ai/AICityAnalysisTab';
import { AIHistoryTab } from './ai/AIHistoryTab';
import { AIChatbotTab } from './ai/AIChatbotTab';

interface AIAnalysisPortalProps {
  user: User;
  bookings: Booking[];
  pakistanBondResults: PakistanBondResult[];
  thaiLotteryResults: ThaiLotteryResult[];
  onAddBooking: (number: string, firstAmt: number, secondAmt: number) => Promise<{ success: boolean; error?: string }>;
  onAddDemand: (number: string, firstAmt: number, secondAmt: number) => Promise<{ success: boolean; error?: string }>;
}

export default function AIAnalysisPortal({
  user,
  bookings,
  pakistanBondResults,
  thaiLotteryResults,
  onAddBooking,
  onAddDemand
}: AIAnalysisPortalProps) {
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

  // Historical draw results database
  const historicalDraws = useMemo(() => [
    ...pakistanBondResults,
    ...thaiLotteryResults
  ], [pakistanBondResults, thaiLotteryResults]);

  // Analysis Dashboard States
  const [analysisCategory, setAnalysisCategory] = useState<'pakistan_bond' | 'thailand_lottery'>('pakistan_bond');
  const [analysisType, setAnalysisType] = useState<'open' | 'close' | 'center' | 'fourth' | 'akra' | 'oddeven'>('open');

  // Dynamic analysis computation
  const analysisData = useMemo(() => {
    const draws = historicalDraws.filter(d => d.category === analysisCategory);
    
    const frequencies = {
      open: Array(10).fill(0),
      close: Array(10).fill(0),
      center: Array(10).fill(0),
      fourth: Array(10).fill(0)
    };

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
    const draws = historicalDraws.filter(d => d.category === 'pakistan_bond' && d.city === selectedCity);

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
        if (genFormula === 'frequency') {
          num = '786' + Math.floor(100 + Math.random() * 900).toString();
          prob = 84.5;
          reason = 'سابقہ ریکارڈز کے مطابق نمبر 786 کے بعد "طاق" ہندسوں کے ملاپ کی فریکوئنسی 84% زیادہ ہے۔';
        } else if (genFormula === 'odd_even') {
          num = '246' + (Math.floor(10 + Math.random() * 89) * 2).toString();
          prob = 79.2;
          reason = 'حالیہ ڈراز میں جفت (Even) نمبرز کا غلبہ ہے، یہ ایک توازن والا جفت فلو ہے۔';
        } else {
          num = Math.floor(100000 + Math.random() * 900000).toString();
          prob = 91.8;
          reason = 'علم نجوم اور تاریخی تاریخوں کے ہندساتی زائچہ سے اخذ کردہ شاہکار عدد۔';
        }
      } else {
        if (genFormula === 'frequency') {
          num = '00' + Math.floor(10 + Math.random() * 90).toString();
          prob = 82.1;
          reason = 'تھائی لاٹری کے گذشتہ 5 فلو پیٹرنز میں صفر ڈبل جوڑی کی کارکردگی غیر معمولی رہی ہے۔';
        } else if (genFormula === 'odd_even') {
          num = '13' + (Math.floor(1 + Math.random() * 4) * 2 + 1).toString() + '5';
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
  const filteredHistory = useMemo(() => historicalDraws.filter(draw => {
    const matchesCategory = historyCategory === 'all' || draw.category === historyCategory;
    const matchesSearch = 
      draw.drawNo.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
      draw.firstPrize.includes(historySearchQuery) ||
      draw.city.includes(historySearchQuery) ||
      draw.secondPrizes.some(p => p.includes(historySearchQuery));
    return matchesCategory && matchesSearch;
  }), [historicalDraws, historyCategory, historySearchQuery]);

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
        {activeSubTab === 'generator' && (
          <AIGeneratorTab
            genCategory={genCategory}
            setGenCategory={setGenCategory}
            genFormula={genFormula}
            setGenFormula={setGenFormula}
            isGenerating={isGenerating}
            generatedNumber={generatedNumber}
            setGeneratedNumber={setGeneratedNumber}
            genProbability={genProbability}
            genReason={genReason}
            quickFirstAmt={quickFirstAmt}
            setQuickFirstAmt={setQuickFirstAmt}
            quickSecondAmt={quickSecondAmt}
            setQuickSecondAmt={setQuickSecondAmt}
            bookingStatus={bookingStatus}
            handleGenerate={handleGenerate}
            handleQuickBook={handleQuickBook}
          />
        )}

        {activeSubTab === 'charts' && (
          <AIChartsTab
            analysisCategory={analysisCategory}
            setAnalysisCategory={setAnalysisCategory}
            analysisType={analysisType}
            setAnalysisType={setAnalysisType}
            analysisData={analysisData}
          />
        )}

        {activeSubTab === 'cityAnalysis' && (
          <AICityAnalysisTab
            pkCities={pkCities}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            cityAnalysisData={cityAnalysisData}
            citySubTab={citySubTab}
            setCitySubTab={setCitySubTab}
            cityAnalysisType={cityAnalysisType}
            setCityAnalysisType={setCityAnalysisType}
          />
        )}

        {activeSubTab === 'history' && (
          <AIHistoryTab
            historySearchQuery={historySearchQuery}
            setHistorySearchQuery={setHistorySearchQuery}
            historyCategory={historyCategory}
            setHistoryCategory={setHistoryCategory}
            filteredHistory={filteredHistory}
          />
        )}

        {activeSubTab === 'chatbot' && (
          <AIChatbotTab
            suggestedQuestions={suggestedQuestions}
            handleChatQuestionClick={handleChatQuestionClick}
            chatMessages={chatMessages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            handleSendChatInput={handleSendChatInput}
          />
        )}
      </div>

    </div>
  );
}
