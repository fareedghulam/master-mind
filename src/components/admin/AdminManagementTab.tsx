import React, { useState } from 'react';
import { User, AdminRole } from '../../types';
import { ShieldCheck, Plus, Trash, Sparkles, UserCheck, Building2, UserX } from 'lucide-react';
import { getAdminConfiguredEmail } from '../../utils/store';

interface AdminManagementTabProps {
  users: User[];
  adminManageError: string;
  adminManageSuccess: string;
  newAdminName: string;
  setNewAdminName: (v: string) => void;
  newAdminPhone: string;
  setNewAdminPhone: (v: string) => void;
  newAdminEmail: string;
  setNewAdminEmail: (v: string) => void;
  newAdminPassword: string;
  setNewAdminPassword: (v: string) => void;
  newAdminRole: AdminRole;
  setNewAdminRole: (v: AdminRole) => void;
  handleCreateAdminSubmit: (e: React.FormEvent) => void;
  handleDeleteAdmin: (email: string) => void;
  handleToggleActiveAdmin: (email: string, currentStatus: boolean) => void;
  handleChangeAdminRole: (email: string, newRole: AdminRole) => void;
  safeFormatDate: (timestamp: any, locale?: string, options?: Intl.DateTimeFormatOptions) => string;
}

export const AdminManagementTab: React.FC<AdminManagementTabProps> = ({
  users,
  adminManageError,
  adminManageSuccess,
  newAdminName,
  setNewAdminName,
  newAdminPhone,
  setNewAdminPhone,
  newAdminEmail,
  setNewAdminEmail,
  newAdminPassword,
  setNewAdminPassword,
  newAdminRole,
  setNewAdminRole,
  handleCreateAdminSubmit,
  handleDeleteAdmin,
  handleToggleActiveAdmin,
  handleChangeAdminRole,
  safeFormatDate
}) => {
  const [filterType, setFilterType] = useState<'all' | 'admins' | 'dealers'>('all');

  const privilegedUsers = users.filter(u => 
    u.isAdmin === true || 
    u.role === 'superAdmin' || 
    u.role === 'dataEntryAdmin' || 
    u.role === 'admin' || 
    u.role === 'dealer'
  );

  const filteredUsers = privilegedUsers.filter(u => {
    if (filterType === 'admins') {
      return u.role === 'superAdmin' || u.role === 'dataEntryAdmin' || u.role === 'admin' || (u.isAdmin === true && u.role !== 'dealer');
    }
    if (filterType === 'dealers') {
      return u.role === 'dealer';
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Create New Admin or Dealer Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
        <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2">
          <span>نیا ایڈمن یا مجاز ڈیلر بنائیں (Register Admin / Dealer)</span>
          <ShieldCheck className="w-5 h-5 text-amber-500" />
        </h4>

        {adminManageError && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right font-sans" dir="rtl">
            ⚠️ {adminManageError}
          </div>
        )}
        {adminManageSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right font-sans" dir="rtl">
            ✓ {adminManageSuccess}
          </div>
        )}

        <form onSubmit={handleCreateAdminSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right font-sans">
                مکمل نام (Full Name) *
              </label>
              <input
                type="text"
                placeholder="نام لکھیں (مثلاً علی خان)"
                value={newAdminName}
                onChange={(e) => setNewAdminName(e.target.value)}
                className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                required
              />
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right font-sans">
                موبائل نمبر (Mobile Number) *
              </label>
              <input
                type="tel"
                placeholder="03001234567"
                value={newAdminPhone}
                onChange={(e) => setNewAdminPhone(e.target.value)}
                className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right font-sans">
                ای میل ایڈریس (Email Address) *
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right font-sans">
                لاگ ان پاس ورڈ (Login Password) *
              </label>
              <input
                type="password"
                placeholder="کم از کم 6 ہندسے"
                value={newAdminPassword}
                onChange={(e) => setNewAdminPassword(e.target.value)}
                className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                required
              />
            </div>
          </div>

          {/* Role Selection Box */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="text-right">
              <span className="text-slate-700 text-xs font-bold font-sans">
                اکاؤنٹ کا عہدہ منتخب کریں (Select Role):
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option 1: Data Entry Admin */}
              <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                newAdminRole === 'dataEntryAdmin'
                  ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-400/20'
                  : 'bg-white border-slate-200 hover:bg-slate-100'
              }`}>
                <input
                  type="radio"
                  name="adminRole"
                  checked={newAdminRole === 'dataEntryAdmin'}
                  onChange={() => setNewAdminRole('dataEntryAdmin')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800 font-sans">ڈیٹا انٹری ایڈمن</div>
                  <div className="text-[10px] text-slate-500 font-sans">صرف نتائج درج کرنے کا مجاز</div>
                </div>
              </label>

              {/* Option 2: Super Admin */}
              <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                newAdminRole === 'superAdmin'
                  ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-400/20'
                  : 'bg-white border-slate-200 hover:bg-slate-100'
              }`}>
                <input
                  type="radio"
                  name="adminRole"
                  checked={newAdminRole === 'superAdmin'}
                  onChange={() => setNewAdminRole('superAdmin')}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800 font-sans">سپر ایڈمن</div>
                  <div className="text-[10px] text-slate-500 font-sans">مکمل کنٹرول اور فنانس مینجمنٹ</div>
                </div>
              </label>

              {/* Option 3: Authorized Dealer */}
              <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                newAdminRole === 'dealer'
                  ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/30'
                  : 'bg-white border-slate-200 hover:bg-slate-100'
              }`}>
                <input
                  type="radio"
                  name="adminRole"
                  checked={newAdminRole === 'dealer'}
                  onChange={() => setNewAdminRole('dealer')}
                  className="text-amber-500 focus:ring-amber-500"
                />
                <div className="text-right">
                  <div className="text-xs font-bold text-amber-900 font-sans">مجاز ڈیلر (Dealer)</div>
                  <div className="text-[10px] text-amber-700 font-sans">ڈیلرشپ پورٹل اور بکنگز</div>
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-8 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span className="font-sans font-bold">
                {newAdminRole === 'dealer'
                  ? 'نیا مجاز ڈیلر رجسٹر کریں (Register Dealer)'
                  : 'نیا ایڈمن رجسٹر کریں (Register Admin)'}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Registered Admins & Dealers List */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              تمام ({privilegedUsers.length})
            </button>
            <button
              onClick={() => setFilterType('admins')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'admins' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ایڈمنز ({privilegedUsers.filter(u => u.role !== 'dealer').length})
            </button>
            <button
              onClick={() => setFilterType('dealers')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'dealers' ? 'bg-white text-amber-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              مجاز ڈیلرز ({privilegedUsers.filter(u => u.role === 'dealer').length})
            </button>
          </div>

          <h4 className="text-base font-bold text-slate-800 flex items-center justify-end gap-2">
            <span>رجسٹرڈ ایڈمنز اور ڈیلرز کی فہرست</span>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-2.5 px-3 font-semibold text-slate-600 text-left">اقدامات (Actions)</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600">آخری لاگ ان (Last Login)</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600">حیثیت (Status)</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600">عہدہ (Role)</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600">موبائل نمبر</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600 text-right">صارف / ایڈمن تفصیل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-sans">
                    کوئی ریکارڈ موجود نہیں ہے۔
                  </td>
                </tr>
              ) : (
                filteredUsers.map((admin) => {
                  const isMainOwner = (admin.email || '').toLowerCase() === getAdminConfiguredEmail().toLowerCase().trim();
                  const isActive = admin.active !== false;
                  const loginTime = admin.lastLogin ? safeFormatDate(admin.lastLogin, 'ur-PK', { timeZone: 'Asia/Karachi' }) : 'N/A';
                  const formattedLogin = loginTime === 'N/A' ? 'لاگ ان نہیں ہوا (No Login)' : loginTime;
                  const isDealer = admin.role === 'dealer';

                  return (
                    <tr key={admin.email || admin.uid} className="hover:bg-slate-50/50 transition-colors">
                      {/* Actions Column */}
                      <td className="py-3 px-3 text-left">
                        {!isMainOwner ? (
                          <div className="flex flex-wrap gap-1.5 items-center">
                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteAdmin(admin.email)}
                              className="bg-red-50 hover:bg-red-100 text-red-600 p-1.5 rounded-xl border border-red-200 transition-all cursor-pointer"
                              title="اکاؤنٹ حذف کریں"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>

                            {/* Toggle Active Status */}
                            <button
                              onClick={() => handleToggleActiveAdmin(admin.email, isActive)}
                              className={`px-2 py-1 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200'
                                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                              }`}
                            >
                              {isActive ? 'Deactivate' : 'Activate'}
                            </button>

                            {/* Role Switcher */}
                            {admin.role === 'dealer' ? (
                              <button
                                onClick={() => handleChangeAdminRole(admin.email, 'customer')}
                                className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-[10px] font-bold transition-all cursor-pointer"
                                title="عام کسٹمر بنائیں"
                              >
                                Revoke Dealer
                              </button>
                            ) : (
                              <button
                                onClick={() => handleChangeAdminRole(
                                  admin.email,
                                  admin.role === 'superAdmin' ? 'dataEntryAdmin' : 'superAdmin'
                                )}
                                className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-[10px] font-bold transition-all cursor-pointer"
                              >
                                {admin.role === 'superAdmin' ? 'Make DataEntry' : 'Make Super'}
                              </button>
                            )}

                            {admin.role !== 'dealer' && (
                              <button
                                onClick={() => handleChangeAdminRole(admin.email, 'dealer')}
                                className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-[10px] font-bold transition-all cursor-pointer"
                                title="ڈیلر رول تفویض کریں"
                              >
                                Make Dealer
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-sans italic">سپر مالک (Owner)</span>
                        )}
                      </td>

                      {/* Last Login timestamp */}
                      <td className="py-3 px-3 font-mono text-xs text-slate-500 text-left" dir="ltr">
                        {formattedLogin}
                      </td>

                      {/* Active Status */}
                      <td className="py-3 px-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                          isActive 
                            ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                            : 'text-red-600 bg-red-50 border-red-200'
                        }`}>
                          {isActive ? 'فعال (Active)' : 'غیر فعال (Inactive)'}
                        </span>
                      </td>

                      {/* Role */}
                      <td className="py-3 px-3">
                        <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold ${
                          admin.role === 'superAdmin'
                            ? 'text-purple-700 bg-purple-50 border-purple-200'
                            : admin.role === 'dealer'
                            ? 'text-amber-900 bg-amber-50 border-amber-300 shadow-sm'
                            : 'text-blue-700 bg-blue-50 border-blue-200'
                        }`}>
                          {admin.role === 'superAdmin' 
                            ? 'سپر ایڈمن (Super Admin)' 
                            : admin.role === 'dealer'
                            ? 'مجاز ڈیلر (Dealer)'
                            : 'ڈیٹا انٹری ایڈمن (Data Entry)'}
                        </span>
                      </td>

                      {/* Mobile Phone */}
                      <td className="py-3 px-3 font-mono text-slate-600">
                        {admin.phone}
                      </td>

                      {/* Name and Email */}
                      <td className="py-3 px-3 text-right">
                        <span className="font-semibold block text-slate-800 font-sans">{admin.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono block">{admin.email}</span>
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
  );
};

