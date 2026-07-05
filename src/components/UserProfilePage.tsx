import { User } from '../types';
import { User as UserIcon, Phone, MapPin, Mail, ShieldAlert, Award, CreditCard, MessageCircle } from 'lucide-react';
import { getSupportWhatsAppNumber } from '../utils/store';

interface ProfileProps {
  user: User;
  totalBookingsCount: number;
}

export default function UserProfilePage({ user, totalBookingsCount }: ProfileProps) {
  const whatsappNumber = getSupportWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("السلام علیکم! مجھے ماسٹر مائینڈ قریشی انٹرپرائز پرائز بانڈ سسٹم کے بارے میں مدد چاہئے۔")}`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-100 max-w-2xl mx-auto text-right font-sans">
      <div className="flex flex-col items-center pb-6 border-b border-slate-100 mb-6">
        <div className="w-20 h-20 bg-slate-900 border-2 border-amber-400 rounded-full flex items-center justify-center text-white mb-4 shadow-lg text-3xl font-bold font-sans">
          {user.name.trim().charAt(0) || 'ک'}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">{user.name}</h3>
        <p className="text-xs text-slate-400 font-mono mt-1">{user.email}</p>
        
        {user.isAdmin && (
          <span className="mt-2.5 inline-flex items-center gap-1 bg-amber-500 text-slate-950 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>ایڈمن اکاؤنٹ (Admin)</span>
          </span>
        )}
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-500 pb-2 border-b border-slate-50 uppercase tracking-widest text-left">
          PERSONAL DOSSIER / کسٹمر کی مکمل پروفائل
        </h4>

        {/* Dynamic Detail Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 flex items-center gap-3 justify-between">
            <Phone className="w-5 h-5 text-amber-500/80" />
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">موبائل نمبر (Mobile)</span>
              <span className="font-mono text-sm text-slate-800 font-semibold">{user.phone}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 flex items-center gap-3 justify-between">
            <MapPin className="w-5 h-5 text-amber-500/80" />
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">شہر (City)</span>
              <span className="text-sm text-slate-800 font-semibold">{user.city}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 flex items-center gap-3 justify-between">
            <Mail className="w-5 h-5 text-amber-500/80" />
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">رجسٹریشن ایمیل (Email ID)</span>
              <span className="font-mono text-sm text-slate-800 font-semibold">{user.email}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50 flex items-center gap-3 justify-between">
            <CreditCard className="w-5 h-5 text-amber-500/80" />
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">والٹ رقم (Wallet Balance)</span>
              <span className="font-mono text-sm text-amber-600 font-bold">Rs. {user.balance.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl mt-6 flex justify-between items-center">
          <div className="text-left font-mono">
            <span className="block text-[10px] text-slate-400 uppercase">Bookings Record</span>
            <span className="text-2xl font-bold text-amber-400">{totalBookingsCount}</span>
          </div>
          <div className="text-right">
            <h5 className="font-semibold text-sm">سروس بکنگ کی تفصیلات</h5>
            <p className="text-xs text-slate-300 mt-1">
              آپ کے پاکستان بانڈ اور تھائی لینڈ لاٹری کے کل بک شدہ نمبرز۔
            </p>
          </div>
        </div>

        {/* WhatsApp Contact Section */}
        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/10 cursor-pointer hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>واٹس ایپ پر رابطہ کریں (WhatsApp)</span>
          </a>
          <div className="text-center sm:text-right">
            <h5 className="font-bold text-xs text-emerald-950">کسٹمر سپورٹ و والٹ فنڈز ہیلپ</h5>
            <p className="text-[11px] text-emerald-800 mt-1">
              بیلنس چارج کروانے یا کسی بھی مدد کے لیے ابھی ایڈمن سے واٹس ایپ پر رابطہ کریں۔
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
