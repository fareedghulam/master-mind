import React, { useState } from 'react';
import { User, DealerBooking } from '../../types';
import { MessageCircle, ShieldCheck, UserCheck, Search } from 'lucide-react';
import { getAdminConfiguredEmail } from '../../utils/store';

interface AdminUsersFinanceTabProps {
  users: User[];
  dealerBookings: DealerBooking[];
  whatsappError: string;
  whatsappSuccess: string;
  whatsappVal: string;
  setWhatsappVal: (val: string) => void;
  handleWhatsappSubmit: (e: React.FormEvent) => void;
  passwordError: string;
  passwordSuccess: string;
  adminCurrentPasswordInput: string;
  setAdminCurrentPasswordInput: (val: string) => void;
  adminEmailInput: string;
  adminPasswordInput: string;
  setAdminPasswordInput: (val: string) => void;
  adminConfirmPasswordInput: string;
  setAdminConfirmPasswordInput: (val: string) => void;
  handlePasswordSubmit: (e: React.FormEvent) => void;
  userPasswordError: string;
  userPasswordSuccess: string;
  userSearchQuery: string;
  setUserSearchQuery: (val: string) => void;
  foundUser: User | null;
  setFoundUser: (user: User | null) => void;
  handleSearchUser: () => void;
  userNewPassword: string;
  setUserNewPassword: (val: string) => void;
  userConfirmPassword: string;
  setUserConfirmPassword: (val: string) => void;
  handleUserPasswordReset: (e: React.FormEvent) => void;
}

export const AdminUsersFinanceTab: React.FC<AdminUsersFinanceTabProps> = ({
  users,
  dealerBookings,
  whatsappError,
  whatsappSuccess,
  whatsappVal,
  setWhatsappVal,
  handleWhatsappSubmit,
  passwordError,
  passwordSuccess,
  adminCurrentPasswordInput,
  setAdminCurrentPasswordInput,
  adminEmailInput,
  adminPasswordInput,
  setAdminPasswordInput,
  adminConfirmPasswordInput,
  setAdminConfirmPasswordInput,
  handlePasswordSubmit,
  userPasswordError,
  userPasswordSuccess,
  userSearchQuery,
  setUserSearchQuery,
  foundUser,
  setFoundUser,
  handleSearchUser,
  userNewPassword,
  setUserNewPassword,
  userConfirmPassword,
  setUserConfirmPassword,
  handleUserPasswordReset
}) => {
  return (
    <div className="space-y-8">
      {/* Module 1: Registered Customers List & Balances */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md">
        <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 mb-5 flex items-center justify-end gap-2">
          <span>رجسٹرڈ کسٹمرز کی لسٹ اور والٹ بیلنس (Registered Customers)</span>
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
        </h4>

        <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
          {users.map((u) => {
            const userEmail = (u.email || '').toLowerCase().trim();

            const userDealerBookings = (dealerBookings || []).filter(
              (b) =>
                (b.dealerId && u.uid && b.dealerId === u.uid) ||
                (b.dealerEmail || '').toLowerCase().trim() === userEmail
            );

            return (
              <div
                key={u.email || u.uid}
                className="bg-slate-50 p-3 rounded-2xl text-xs border border-slate-100"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-xl">
                    Rs. {(u.balance ?? 0).toLocaleString()}
                  </span>

                  <div className="text-right">
                    <span className="font-semibold block text-slate-800">
                      {u.name} {u.isAdmin && '(ایڈمن)'} {u.role === 'dealer' && '(ڈیلر)'}
                    </span>

                    <span className="text-[10px] text-slate-400 font-mono">
                      {u.email || 'ای میل کے بغیر'} {u.phone ? `| ${u.phone}` : ''}
                    </span>
                  </div>
                </div>

                {u.role === 'dealer' && (
                  <div className="mt-3 pt-3 border-t border-slate-200 text-right">
                    <div className="font-bold text-slate-700 mb-2">
                      ڈیلر کی بکنگز ({userDealerBookings.length})
                    </div>

                    {userDealerBookings.length > 0 ? (
                      <div className="space-y-1">
                        {userDealerBookings.map((b) => (
                          <div
                            key={b.id}
                            className="bg-white rounded-xl px-3 py-2 border border-slate-100"
                          >
                            <div className="flex justify-between items-center gap-2">
                              <span className="font-mono font-bold text-indigo-700">
                                #{b.number}
                              </span>

                              <span className="text-[10px] text-slate-500">
                                فرسٹ: Rs. {(b.firstAmount || 0).toLocaleString()}
                                {' | '}
                                سیکنڈ: Rs. {(b.secondAmount || 0).toLocaleString()}
                              </span>
                            </div>

                            <div className="text-[10px] text-slate-400 mt-1">
                              {b.category === 'pakistan_bond'
                                ? 'پاکستان پرائز بانڈ'
                                : b.category === 'thailand_lottery'
                                  ? 'تھائی لینڈ لاٹری'
                                  : b.category}
                              {b.drawNumber ? ` | ڈرا #${b.drawNumber}` : ''}
                              {b.drawDate ? ` | ${b.drawDate}` : ''}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[10px] text-slate-400">
                        ابھی کوئی ڈیلر بکنگ موجود نہیں
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Module 4: WhatsApp Support Helpline Configuration */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-4">
        <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2">
          <span>واٹس ایپ ہیلپ لائن اور رابطہ سیٹنگز (WhatsApp Help Settings)</span>
          <MessageCircle className="w-5 h-5 text-emerald-600" />
        </h4>

        {whatsappError && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right">
            ⚠️ {whatsappError}
          </div>
        )}
        {whatsappSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right">
            ✓ {whatsappSuccess}
          </div>
        )}

        <form onSubmit={handleWhatsappSubmit} className="space-y-4">
          <p className="text-xs text-slate-500 leading-relaxed text-right">
            یہاں پر وہ واٹس ایپ نمبر درج کریں جس پر کسٹمرز کسی مدد یا والٹ بیلنس ریچارج کے لیے رابطہ کر سکیں۔ نمبر میں کنٹری کوڈ (جیسے پاکستان کے لیے 92) لازمی لکھیں بغیر پلس (+) یا صفر (0) کے، جیسے 923001234567۔
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-6 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md sm:w-48 whitespace-nowrap"
            >
              <span>محفوظ کریں (Save Phone)</span>
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="923001234567"
                value={whatsappVal}
                onChange={(e) => setWhatsappVal(e.target.value)}
                className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                required
              />
            </div>
          </div>
        </form>
      </div>

      {/* Module 5: Admin Password Configuration */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-4">
        <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2">
          <span>ایڈمن پاس ورڈ اور سیکیورٹی سیٹنگز (Admin Password Settings)</span>
          <ShieldCheck className="w-5 h-5 text-blue-600" />
        </h4>

        {passwordError && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right">
            ⚠️ {passwordError}
          </div>
        )}
        {passwordSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right">
            ✓ {passwordSuccess}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <p className="text-xs text-slate-500 leading-relaxed text-right">
            یہاں سے آپ ایڈمن کا لاگ ان پاس ورڈ تبدیل کر سکتے ہیں۔ پاس ورڈ تبدیل ہونے کے بعد، اگلی بار ایڈمن کو نئے پاس ورڈ کے ساتھ ہی لاگ ان کرنا ہوگا۔
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                موجودہ پاس ورڈ (Current Password) *
              </label>
              <input
                type="password"
                placeholder="موجودہ پاس ورڈ درج کریں"
                value={adminCurrentPasswordInput}
                onChange={(e) => setAdminCurrentPasswordInput(e.target.value)}
                className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                ایڈمن ای میل (Admin Email)
              </label>
              <input
                type="email"
                value={adminEmailInput}
                readOnly
                disabled
                className="w-full text-left bg-slate-100 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-mono text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                نیا مضبوط پاس ورڈ (New Password) *
              </label>
              <input
                type="password"
                placeholder="نیا پاس ورڈ درج کریں"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                نیا پاس ورڈ دوبارہ درج کریں (Confirm Password) *
              </label>
              <input
                type="password"
                placeholder="نیا پاس ورڈ دوبارہ درج کریں"
                value={adminConfirmPasswordInput}
                onChange={(e) => setAdminConfirmPasswordInput(e.target.value)}
                className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>پاس ورڈ تبدیل کریں (Update Password)</span>
          </button>
        </form>
      </div>

      {/* Module 6: User Password Management */}
      <div id="module-user-password-management" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-4">
        <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2">
          <span>صارفین کے پاس ورڈ کا انتظام (User Password Management)</span>
          <UserCheck className="w-5 h-5 text-indigo-600" />
        </h4>

        {userPasswordError && (
          <div id="admin-user-password-reset-error" className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right font-sans">
            ⚠️ {userPasswordError}
          </div>
        )}
        {userPasswordSuccess && (
          <div id="admin-user-password-reset-success" className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right font-sans">
            ✓ {userPasswordSuccess}
          </div>
        )}

        <div className="space-y-4">
          <p className="text-xs text-slate-500 leading-relaxed text-right">
            یہاں سے آپ کسی بھی کسٹمر کا پاس ورڈ براہِ راست تبدیل کر سکتے ہیں۔ پہلے کسٹمر کا ای میل یا موبائل نمبر درج کر کے تلاش کریں۔
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              id="admin-search-user-btn"
              type="button"
              onClick={handleSearchUser}
              className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-6 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md sm:w-48 whitespace-nowrap"
            >
              <span>تلاش کریں (Search)</span>
              <Search className="w-4 h-4" />
            </button>

            <div className="flex-1 relative">
              <input
                id="admin-search-user-query"
                type="text"
                placeholder="ای میل یا موبائل نمبر درج کریں"
                value={userSearchQuery}
                onChange={(e) => {
                  setUserSearchQuery(e.target.value);
                  setFoundUser(null);
                }}
                className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              />
            </div>
          </div>

          {foundUser && (
            <div id="searched-user-details" className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4 text-right">
              <h5 className="text-xs font-bold text-slate-700 border-b border-slate-200 pb-2">صارف کی تفصیلات (User Details)</h5>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans text-slate-700">
                <div className="bg-white p-3 rounded-xl border border-slate-100">
                  <span className="block text-slate-400 mb-1 font-semibold text-[10px]">کردار (Role)</span>
                  <span className="font-bold text-slate-800">{foundUser.role || (foundUser.isAdmin ? 'admin' : 'customer')}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100">
                  <span className="block text-slate-400 mb-1 font-semibold text-[10px]">موبائل نمبر (Mobile)</span>
                  <span className="font-mono font-bold text-slate-800">{foundUser.phone || 'N/A'}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100">
                  <span className="block text-slate-400 mb-1 font-semibold text-[10px]">ای میل (Email)</span>
                  <span className="font-mono font-bold text-slate-800 break-all">{foundUser.email}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100">
                  <span className="block text-slate-400 mb-1 font-semibold text-[10px]">نام (Name)</span>
                  <span className="font-bold text-slate-800">{foundUser.name}</span>
                </div>
              </div>

              <form id="admin-user-password-reset-form" onSubmit={handleUserPasswordReset} className="space-y-4 pt-2 border-t border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                      پاس ورڈ کی تصدیق کریں (Confirm New Password) *
                    </label>
                    <input
                      id="admin-confirm-reset-user-password"
                      type="password"
                      placeholder="دوبارہ پاس ورڈ درج کریں"
                      value={userConfirmPassword}
                      onChange={(e) => setUserConfirmPassword(e.target.value)}
                      className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                      نیا پاس ورڈ - کم از کم 8 ہندسے (New Password - Min 8 chars) *
                    </label>
                    <input
                      id="admin-reset-user-password"
                      type="password"
                      placeholder="نیا پاس ورڈ درج کریں"
                      value={userNewPassword}
                      onChange={(e) => setUserNewPassword(e.target.value)}
                      className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                      required
                    />
                  </div>
                </div>

                <button
                  id="admin-save-user-password-btn"
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>پاس ورڈ محفوظ کریں (Save Password)</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
