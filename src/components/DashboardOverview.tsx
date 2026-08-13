import React, { useState } from 'react';
import { User, Booking, DrawCategory } from '../types';
import { 
  ArrowUpRight, 
  Sparkles, 
  MessageCircle, 
  Wallet, 
  User as UserIcon, 
  Edit3, 
  Gift, 
  Globe, 
  FileText
} from 'lucide-react';
import { getSupportWhatsAppNumber } from '../utils/store';
import ProfileSetupModal from './ProfileSetupModal';

interface DashboardOverviewProps {
  user: User;
  bookings: Booking[];
  onTabChange: (tab: string) => void;
  adminMode: boolean;
  onUpdateProfile: (name: string, phone: string, city: string) => Promise<{ success: boolean; message: string }>;
}

export default function DashboardOverview({
  user,
  bookings,
  onTabChange,
  adminMode,
  onUpdateProfile
}: DashboardOverviewProps) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // User stats calculations
  const myBookings = bookings.filter(b => b.userEmail.toLowerCase() === user.email.toLowerCase());

  const getCategoryTotal = (cat: DrawCategory) => {
    return myBookings
      .filter(b => b.category === cat)
      .reduce((sum, b) => sum + b.firstAmount + b.secondAmount, 0);
  };

  const whatsappNumber = getSupportWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("السلام علیکم! مجھے ماسٹر مائینڈ قریشی انٹرپرائز پرائز بانڈ سسٹم کے بارے میں مدد چاہئے۔")}`;

  return (
    <div className="space-y-8 font-sans text-right max-w-5xl mx-auto pb-10">
      
      {/* 1. Header & User Profile Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative border-b-4 border-amber-500 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* User Identity Info */}
          <div className="flex items-center gap-4 text-right">
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.name} 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-400 object-cover shadow-lg shrink-0"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600/30 border-2 border-amber-400/50 flex items-center justify-center text-white shrink-0">
                <UserIcon className="w-8 h-8 text-amber-400" />
              </div>
            )}
            
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-[11px] font-bold px-3 py-0.5 rounded-full mb-1">
                <Sparkles className="w-3 h-3" />
                <span>ماسٹر مائینڈ وی آئی پی ممبر</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-sans">{user.name}</h2>
              <p className="text-xs text-slate-300 font-mono mt-0.5">{user.email}</p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2 font-mono">
                <span>📍 {user.city || 'شہر متعین نہیں'}</span>
                <span>📞 {user.phone || 'فون متعین نہیں'}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Profile Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md"
            >
              <Edit3 className="w-4 h-4 text-amber-400" />
              <span>پروفائل تبد یل کریں</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Wallet Balance Card & Actions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200/80 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-6">
          
          {/* Main Wallet Display */}
          <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Wallet className="w-4 h-4" />
                <span>موجودہ والٹ بیلنس</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                ایکٹو (Live)
              </span>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 tracking-tight">
                Rs. {user.balance.toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                آپ کے اکاؤنٹ کا موجودہ دستیاب بیلنس (Real-time Updated)
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs text-slate-400">
              <span>میرا UID: <span className="font-mono text-slate-300">{user.uid || '---'}</span></span>
              <span>کل بکنگز: <span className="font-bold text-white">{myBookings.length}</span></span>
            </div>
          </div>

          {/* Wallet Action Buttons */}
          <div className="w-full md:w-80 flex flex-col justify-center gap-3">
            <button
              onClick={() => onTabChange('my_bookings')}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 px-5 rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <FileText className="w-5 h-5 text-slate-600" />
              <span>میری کل بکنگ ہسٹری ({myBookings.length})</span>
            </button>
          </div>

        </div>
      </div>

      {/* 3. Available Draws Header */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-slate-500 font-mono">ALL ACTIVE DRAWS</span>
          <h3 className="text-xl font-bold text-slate-900 font-sans">
            دستیاب قرعہ اندازی کیٹیگریز (Available Draws)
          </h3>
        </div>

        {/* 4 Cards Grid for all 4 Draw Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Category 1: Pakistan Bond */}
          <div 
            onClick={() => onTabChange('pakistan_bond')}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-64 group relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div className="bg-emerald-50 text-emerald-700 p-3.5 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Gift className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-600 font-bold tracking-wider font-mono uppercase bg-emerald-50 px-2 py-0.5 rounded-md">
                  Category 1
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-emerald-600 transition-colors">
                  پاکستان پرائز بانڈ (Pakistan Prize Bond)
                </h3>
              </div>
            </div>

            <div>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                پاکستان نیشنل پرائز بانڈز کی مرضی کے نمبرز بکنگ کروائیں۔ فرسٹ اور سیکنڈ رقم منتخب کریں۔
              </p>
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-mono">
                <span className="text-emerald-700 font-bold flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                  <ArrowUpRight className="w-4 h-4" /> بکنگ کے لیے کھولیں
                </span>
                <span>میری بکنگ: Rs. {getCategoryTotal('pakistan_bond').toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Category 2: Thailand Lottery */}
          <div 
            onClick={() => onTabChange('thailand_lottery')}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-64 group relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div className="bg-amber-50 text-amber-700 p-3.5 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-all">
                <Globe className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-[10px] text-amber-600 font-bold tracking-wider font-mono uppercase bg-amber-50 px-2 py-0.5 rounded-md">
                  Category 2
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-amber-600 transition-colors">
                  تھائی لینڈ ڈرا (Thailand Lottery)
                </h3>
              </div>
            </div>

            <div>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                تھائی لینڈ لاٹری کے لکی نمبرز کی بکنگ کریں۔ پی ڈی ایف لسٹ ڈائریکٹ ڈاؤن لوڈ یا شیئر کریں۔
              </p>
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-mono">
                <span className="text-amber-700 font-bold flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                  <ArrowUpRight className="w-4 h-4" /> بکنگ کے لیے کھولیں
                </span>
                <span>میری بکنگ: Rs. {getCategoryTotal('thailand_lottery').toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* WhatsApp Support Section */}
      <div className="bg-emerald-50/70 border-2 border-emerald-500/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row shadow-sm gap-6 items-center justify-between text-right relative overflow-hidden">
        <a
          href={whatsappUrl}
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noopener noreferrer"
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span>واٹس ایپ پر رابطہ کریں (WhatsApp Admin)</span>
        </a>

        <div className="space-y-1 flex-1 text-center sm:text-right">
          <h3 className="text-lg font-bold text-emerald-950">کسی بھی مسئلہ یا والٹ میں رقم جمع کروانے کے لیے</h3>
          <p className="text-emerald-900/80 text-xs leading-relaxed">
            براہِ راست ایڈمن قریشی صاحب سے رابطہ کریں۔ Easypaisa, JazzCash, یا Bank Account سے ریچارج کروائیں۔
          </p>
        </div>
      </div>

      {/* Profile Edit Modal Component */}
      <ProfileSetupModal
        user={user}
        isOpen={isProfileModalOpen}
        onSave={onUpdateProfile}
        onClose={() => setIsProfileModalOpen(false)}
      />

    </div>
  );
}
