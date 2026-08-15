import React from 'react';
import { User, AdminRole } from '../../types';
import { ShieldCheck, Plus, Sparkles, Trash } from 'lucide-react';
import { getAdminConfiguredEmail } from '../../utils/store';

interface AdminManagementTabProps {
  users: User[];
  adminManageError: string;
  adminManageSuccess: string;
  newAdminName: string;
  setNewAdminName: (val: string) => void;
  newAdminPhone: string;
  setNewAdminPhone: (val: string) => void;
  newAdminEmail: string;
  setNewAdminEmail: (val: string) => void;
  newAdminPassword: string;
  setNewAdminPassword: (val: string) => void;
  newAdminRole: AdminRole;
  setNewAdminRole: (role: AdminRole) => void;
  handleCreateAdminSubmit: (e: React.FormEvent) => void;
  handleDeleteAdmin: (email: string) => void;
  handleToggleActiveAdmin: (email: string, currentActive: boolean) => void;
  handleChangeAdminRole: (email: string, newRole: AdminRole) => void;
  safeFormatDate: (val: any, locale?: string, options?: Intl.DateTimeFormatOptions) => string;
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
  return (
    <div className="space-y-8">
      {/* Create New Admin Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
        <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2">
          <span>نیا ایڈمن بنائیں (Create New Admin)</span>
          <ShieldCheck className="w-5 h-5 text-amber-500" />
        </h4>

        {adminManageError && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right" dir="rtl">
            ⚠️ {adminManageError}
          </div>
        )}
        {adminManageSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right" dir="rtl">
            ✓ {adminManageSuccess}
          </div>
        )}

        <form onSubmit={handleCreateAdminSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right font-sans">ایڈمن نام (Admin Name) *</label>
              <input
                type="text"
                placeholder="نام لکھیں"
                value={newAdminName}
                onChange={(e) => setNewAdminName(e.target.value)}
                className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                required
              />
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right font-sans">موبائل نمبر (Mobile Number) *</label>
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
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right font-sans">ای میل ایڈریس (Admin Email) *</label>
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
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right font-sans">لاگ ان پاس ورڈ (Login Password) *</label>
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

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-slate-600 text-xs font-semibold font-sans">انتخابِ عہدہ (Role):</span>
              <label className="inline-flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="adminRole"
                  checked={newAdminRole === 'dataEntryAdmin'}
                  onChange={() => setNewAdminRole('dataEntryAdmin')}
                  className="text-amber-500 focus:ring-amber-500"
                />
                <span className="text-xs text-slate-700 font-semibold font-sans">ڈیٹا انٹری ایڈمن (Data Entry Admin)</span>
              </label>
              <label className="inline-flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="adminRole"
                  checked={newAdminRole === 'superAdmin'}
                  onChange={() => setNewAdminRole('superAdmin')}
                  className="text-amber-500 focus:ring-amber-500"
                />
                <span className="text-xs text-slate-700 font-semibold font-sans">سپر ایڈمن (Super Admin)</span>
              </label>
              <label className="inline-flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="adminRole"
                  checked={newAdminRole === 'dealer'}
                  onChange={() => setNewAdminRole('dealer')}
                  className="text-amber-500 focus:ring-amber-500"
                />
                <span className="text-xs text-amber-900 font-bold font-sans bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">مجاز ڈیلر (Dealer)</span>
              </label>
            </div>

            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-2.5 px-6 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span className="font-sans font-bold">نیا ایڈمن / ڈیلر رجسٹر کریں (Register Account)</span>
            </button>
          </div>
        </form>
      </div>

      {/* Registered Admins List */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
        <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2">
          <span>رجسٹرڈ ایڈمنز کی فہرست (Registered Admins)</span>
          <Sparkles className="w-5 h-5 text-amber-500" />
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-2.5 px-3 font-semibold text-slate-600 text-left">اقدامات (Actions)</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600">آخری لاگ ان (Last Login)</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600">حیثیت (Status)</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600">عہدہ (Role)</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600">موبائل نمبر</th>
                <th className="py-2.5 px-3 font-semibold text-slate-600 text-right">ایڈمن تفصیل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users
                .filter(u => u.isAdmin === true || u.role === 'superAdmin' || u.role === 'dataEntryAdmin' || u.role === 'admin')
                .map((admin) => {
                  const isMainOwner = (admin.email || '').toLowerCase() === getAdminConfiguredEmail().toLowerCase().trim();
                  const isActive = admin.active !== false;
                  const loginTime = admin.lastLogin ? safeFormatDate(admin.lastLogin, 'ur-PK', { timeZone: 'Asia/Karachi' }) : 'N/A';
                  const formattedLogin = loginTime === 'N/A' ? 'لاگ ان نہیں ہوا (No Login)' : loginTime;

                  return (
                    <tr key={admin.email || admin.uid} className="hover:bg-slate-50/50 transition-colors">
                      {/* Actions Column */}
                      <td className="py-3 px-3 text-left">
                        {!isMainOwner ? (
                          <div className="flex gap-2">
                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteAdmin(admin.email)}
                              className="bg-red-50 hover:bg-red-100 text-red-600 p-1.5 rounded-xl border border-red-200 transition-all cursor-pointer"
                              title="ایڈمن کو حذف کریں"
                            >
                              <Trash className="w-4 h-4" />
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

                            {/* Toggle Role */}
                            <button
                              onClick={() => handleChangeAdminRole(
                                admin.email,
                                admin.role === 'superAdmin' ? 'dataEntryAdmin' : 'superAdmin'
                              )}
                              className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-[10px] font-bold transition-all cursor-pointer"
                            >
                              {admin.role === 'superAdmin' ? 'Make DataEntry' : 'Make Super'}
                            </button>
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
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                          admin.role === 'superAdmin'
                            ? 'text-purple-700 bg-purple-50 border-purple-200 font-bold'
                            : 'text-blue-700 bg-blue-50 border-blue-200 font-semibold'
                        }`}>
                          {admin.role === 'superAdmin' ? 'Super Admin' : 'Data Entry Admin'}
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
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
