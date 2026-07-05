import { User, Booking } from '../types';
import { CreditCard, ArrowLeft, ArrowUpRight, Shield, ScrollText, CalendarRange, Clock, Sparkles, MessageCircle } from 'lucide-react';
import { getSupportWhatsAppNumber } from '../utils/store';

interface DashboardOverviewProps {
  user: User;
  bookings: Booking[];
  onTabChange: (tab: string) => void;
  adminMode: boolean;
}

export default function DashboardOverview({
  user,
  bookings,
  onTabChange,
  adminMode
}: DashboardOverviewProps) {
  // Compute some brief states
  const myBookings = bookings.filter(b => b.userEmail === user.email);
  const totalBondsAmount = myBookings
    .filter(b => b.category === 'pakistan_bond')
    .reduce((sum, b) => sum + b.firstAmount + b.secondAmount, 0);
  const totalLottoAmount = myBookings
    .filter(b => b.category === 'thailand_lottery')
    .reduce((sum, b) => sum + b.firstAmount + b.secondAmount, 0);

  const whatsappNumber = getSupportWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("السلام علیکم! مجھے ماسٹر مائینڈ قریشی انٹرپرائز پرائز بانڈ سسٹم کے بارے میں مدد چاہئے۔")}`;

  return (
    <div className="space-y-8 font-sans text-right max-w-4xl mx-auto">
      {/* Premium Welcome Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative border-b-4 border-amber-500 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl"></div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
          
          {/* Quick wallet card visual display */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 w-full sm:w-72 order-last sm:order-first">
            <div className="flex justify-between items-center mb-4">
              <CreditCard className="w-5 h-5 text-amber-400" />
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">My Wallet System</span>
            </div>
            <p className="text-[10px] text-slate-400">کل موجودہ والٹ رقم</p>
            <p className="text-2xl font-bold font-mono text-amber-400 mt-1">
              Rs. {user.balance.toLocaleString()}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
              <span>{user.city}</span>
              <span>{user.phone}</span>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-400 text-xs px-2.5 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>خوش آمدید کسٹمر پورٹل</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">محترم {user.name} صاحب!</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
              ماسٹر مائینڈ قریشی انٹرپرائز میں خوش آمدید۔ آپ کا اکاؤنٹ لاگ ان ہے۔ نیچے دی گئی کیٹیگریز میں سے انتخاب کریں اور نمبر بک کروائیں۔
            </p>
          </div>
        </div>
      </div>

      {/* Main Portals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Pakistan Bond */}
        <div 
          onClick={() => onTabChange('pakistan_bond')}
          className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-64 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.02] rounded-full blur-xl group-hover:scale-150 transition-all"></div>
          
          <div className="flex justify-between items-start">
            <div className="bg-emerald-50 text-emerald-700 p-3.5 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <CalendarRange className="w-6 h-6" />
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Draw Category</span>
              <h3 className="text-xl font-bold text-slate-800 mt-1 group-hover:text-amber-500 transition-colors">پاکستان بانڈ</h3>
            </div>
          </div>

          <div>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">
              پاکستان نیشنل بانڈز کی مرضی کے نمبرز بکنگ کروائیں۔ فرسٹ اور سیکنڈ بکنگ کے لئے کوئی حد نہیں۔ ادائیگی والٹ سے ہو گی۔
            </p>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
              <div className="flex items-center gap-1 hover:text-slate-700 font-semibold text-slate-900 group-hover:translate-x-[-4px] transition-transform">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span>نمبر بکنگ کے لئے کھولیں</span>
              </div>
              <span className="font-mono">میری کل بکنگ: Rs. {totalBondsAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Thailand Lottery */}
        <div 
          onClick={() => onTabChange('thailand_lottery')}
          className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-64 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.02] rounded-full blur-xl group-hover:scale-150 transition-all"></div>

          <div className="flex justify-between items-start">
            <div className="bg-amber-50 text-amber-700 p-3.5 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-all">
              <ScrollText className="w-6 h-6" />
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Draw Category</span>
              <h3 className="text-xl font-bold text-slate-800 mt-1 group-hover:text-amber-500 transition-colors">تھائی لینڈ لاٹری</h3>
            </div>
          </div>

          <div>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">
              تھائی لینڈ لاٹری قرعہ اندازی کے نمبر بک کریں۔ اپنی پسند کی رقم کا اندراج کریں اور شیٹ کی ڈیٹیل پی ڈی ایف (PDF) میں محفوظ کریں۔
            </p>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
              <div className="flex items-center gap-1 hover:text-slate-700 font-semibold text-slate-900 group-hover:translate-x-[-4px] transition-transform">
                <ArrowUpRight className="w-4 h-4 text-amber-600" />
                <span>نمبر بکنگ کے لئے کھولیں</span>
              </div>
              <span className="font-mono">میری کل بکنگ: Rs. {totalLottoAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Premium WhatsApp Contact Support Card */}
      <div className="bg-emerald-50/60 border-2 border-emerald-500/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row shadow-sm gap-6 items-center justify-between text-right relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
        
        {/* Left Side: Dynamic Contact Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noopener noreferrer"
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/10 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span>ابھی واٹس ایپ پر رابطہ کریں (WhatsApp Support)</span>
        </a>

        {/* Right Side: Urdu Help Context */}
        <div className="space-y-2 flex-1 text-center sm:text-right">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex-row-reverse">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse"></span>
            <span>24/7 لائیو سپورٹ دستیاب ہے</span>
          </div>
          <h3 className="text-lg font-bold text-emerald-950">کسی بھی مدد یا والٹ ریچارج کے لیے رابطہ کریں</h3>
          <p className="text-emerald-900/80 text-xs leading-relaxed max-w-xl">
            اگر آپ کو والٹ ریچارج کروانا ہے، بکنگ کے طریقہ کار میں کوئی الجھن ہے یا کوئی اور مدد چاہیے، تو نیچے دیے گئے بٹن پر کلک کر کے براہ راست واٹس ایپ پر ایڈمن سے رابطہ کریں۔
          </p>
        </div>
      </div>

      {/* System policy brief */}
      <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="flex items-start gap-3 justify-end text-right">
          <div>
            <h4 className="font-semibold text-slate-800">ایڈمن والٹ ریچارج پالیسی</h4>
            <p className="text-slate-500 mt-1">آپ اپنی رجسٹرڈ ای میل آئی ڈی کے ساتھ ایڈمن سے والٹ میں رقم ریچارج کروا سکتے ہیں۔</p>
          </div>
          <div className="bg-slate-200 p-1.5 rounded-lg text-slate-600">
            <CreditCard className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-start gap-3 justify-end text-right">
          <div>
            <h4 className="font-semibold text-slate-800">2-منٹ منسوخی (Cancellation Rules)</h4>
            <p className="text-slate-500 mt-1">کسی بھی نمبر کو بک کرنے کے بعد آپ اسے 2 منٹ کے اندر کینسل کر سکتے ہیں۔ رقم واپس والٹ میں آ جائے گی۔</p>
          </div>
          <div className="bg-slate-200 p-1.5 rounded-lg text-slate-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
