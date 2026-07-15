import { User } from '../types';
import { Wallet, LogOut, Shield, User as UserIcon, ArrowLeftRight } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  onToggleAdminView: () => void;
  adminMode: boolean;
}

export default function DashboardHeader({
  user,
  onLogout,
  onTabChange,
  activeTab,
  onToggleAdminView,
  adminMode
}: HeaderProps) {
  if (!user) return null;

  return (
    <header className="bg-slate-950 text-white sticky top-0 z-50 border-b-4 border-blue-500">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* App Logo & English/Urdu Title */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div 
            onClick={() => onTabChange('dashboard')} 
            className="cursor-pointer select-none"
          >
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <img 
                src="/mastermind_logo.jpg" 
                alt="MQE Logo" 
                className="w-10 h-10 rounded-full border border-blue-500/30 object-cover shadow-sm"
                referrerPolicy="no-referrer"
              />
              <span className="font-sans">ماسٹر مائینڈ قریشی انٹرپرائز</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">MASTERMIND QURESHI ENTERPRISE</p>
          </div>

          {/* Quick Admin Override Button - only visible if logged in user is actually an admin */}
          {user.role === 'admin' && (
            <button
              id="toggle-admin-btn"
              onClick={onToggleAdminView}
              className={`sm:hidden flex items-center gap-1 text-[11px] px-2 py-1 rounded-none transition-all ${
                adminMode 
                  ? 'bg-blue-500 text-white font-bold border-l-4 border-blue-700' 
                  : 'bg-slate-800 text-slate-300 border border-slate-700'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>ایڈمن موڈ</span>
            </button>
          )}
        </div>

        {/* User Navigation, Core Corner Wallet Component */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t border-slate-800 pt-2 sm:pt-0 sm:border-0">
          <div className="flex items-center gap-3">
            {/* Wallet Cash Balance - Displayed Conspicuously at the Corner of the Nav Header */}
            <div 
              id="wallet-badge" 
              className="wallet-pill flex flex-col justify-center text-right shadow-none min-w-[140px]"
            >
              <span className="text-[9px] text-slate-400 block font-normal leading-3 font-sans">والٹ رقم (Wallet)</span>
              <span className="text-white text-base font-bold font-mono">
                Rs. {user.balance.toLocaleString()}
              </span>
            </div>

            {/* Profile Button */}
            <button
              id="profile-nav-btn"
              onClick={() => onTabChange('profile')}
              className={`py-2.5 px-4 rounded-none transition-all flex items-center gap-2 text-xs font-semibold ${
                activeTab === 'profile'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border-b border-slate-700'
              }`}
              title="کسٹمر پروفائل"
            >
              <UserIcon className="w-4 h-4 text-blue-400" />
              <span className="hidden md:inline">کسٹمر پروفائل</span>
            </button>
          </div>

          {/* Desktop Admin switch & Logout */}
          <div className="flex items-center gap-2">
            {user.role === 'admin' && (
              <button
                id="desktop-admin-toggle"
                onClick={onToggleAdminView}
                className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-none transition-all ${
                  adminMode 
                    ? 'bg-blue-500 text-white border-b-2 border-blue-700' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <Shield className="w-4 h-4 text-blue-400" />
                <span>ایڈمن پورٹل</span>
              </button>
            )}

            <button
              id="logout-btn"
              onClick={onLogout}
              className="flex items-center gap-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-200 hover:text-white text-xs font-medium px-4 py-2.5 rounded-none border border-red-500/20 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>لاگ آؤٹ</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
