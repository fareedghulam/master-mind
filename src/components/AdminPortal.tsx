import React, { useState, useEffect, FormEvent } from 'react';
import { User, AdminRole, NumberLimit, Demand, DrawDeadline, Booking, DealerBooking, PakistanBondResult, ThaiLotteryResult, AllResultType, DrawCategory } from '../types';
import { ShieldCheck, UserCheck, Sparkles, Clock, History, Building2 } from 'lucide-react';
import { getSupportWhatsAppNumber, setSupportWhatsAppNumber, getAdminConfiguredEmail, updateCustomerPassword, registerInAuthOnly, changeLoggedAdminPassword, assignDealerRole, cancelDealerBookingByAdmin } from '../utils/store';
import { db } from '../lib/firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

import { AdminDemandsBookingsTab } from './admin/AdminDemandsBookingsTab';
import { AdminUsersFinanceTab } from './admin/AdminUsersFinanceTab';
import { AdminLimitsDeadlinesTab } from './admin/AdminLimitsDeadlinesTab';
import { AdminResultsTab } from './admin/AdminResultsTab';
import { AdminManagementTab } from './admin/AdminManagementTab';
import { AdminDealershipTab } from './admin/AdminDealershipTab';

interface AdminPortalProps {
  users: User[];
  limits: NumberLimit[];
  demands: Demand[];
  deadlines: DrawDeadline[];
  bookings: Booking[];
  dealerBookings?: DealerBooking[];
  pakistanBondResults: PakistanBondResult[];
  thaiLotteryResults: ThaiLotteryResult[];
  currentUser: User | null;
  onCancelBookingByAdmin: (bookingId: string) => Promise<{ success: boolean; error?: string }>;
  onCancelDealerBookingByAdmin?: (bookingId: string) => Promise<{ success: boolean; error?: string }>;
  onAssignDealer?: (uid: string, enableDealer: boolean) => Promise<{ success: boolean; error?: string }>;
  onRecharge: (email: string, amount: number, note?: string) => Promise<{ success: boolean; error?: string }>;
  onSetLimit: (category: DrawCategory, number: string, maxAmount: number) => Promise<any>;
  onDeleteLimit: (id: string) => Promise<any>;
  onApproveDemand: (id: string) => Promise<{ success: boolean; error?: string }>;
  onRejectDemand: (id: string) => Promise<{ success: boolean; error?: string }>;
  onSetDeadline: (
    category: DrawCategory,
    deadlineIso: string,
    titleUrdu: string,
    status: 'open' | 'closed' | 'result_announced',
    nextPrizeBondValue?: string,
    nextDrawCity?: string,
    nextDrawNumber?: string,
    nextDrawDate?: string,
    drawId?: string
  ) => void;
  onDeleteDeadline?: (id: string) => Promise<any>;
  onAddResult: (result: AllResultType) => Promise<{ success: boolean; error?: string }>;
  onEditResult: (result: AllResultType) => Promise<{ success: boolean; error?: string }>;
  onDeleteResult: (id: string, category: 'pakistan_bond' | 'thailand_lottery') => Promise<{ success: boolean; error?: string }>;
}

function safeGetTime(value: any): number {
  if (!value) return 0;
  let date: Date;
  if (value instanceof Date) {
    date = value;
  } else if (typeof value === 'number') {
    date = new Date(value);
  } else if (typeof value === 'string') {
    date = new Date(value);
  } else if (typeof value === 'object') {
    if (typeof value.seconds === 'number') {
      date = new Date(value.seconds * 1000);
    } else if (typeof value.toDate === 'function') {
      try {
        date = value.toDate();
      } catch (e) {
        return 0;
      }
    } else {
      date = new Date(value.toString());
    }
  } else {
    return 0;
  }
  const time = date.getTime();
  return isNaN(time) ? 0 : time;
}

function safeFormatDate(value: any, locale = 'en-US', options?: Intl.DateTimeFormatOptions): string {
  if (!value) return 'N/A';
  let date: Date;
  if (value instanceof Date) {
    date = value;
  } else if (typeof value === 'number') {
    date = new Date(value);
  } else if (typeof value === 'string') {
    date = new Date(value);
  } else if (typeof value === 'object') {
    if (typeof value.seconds === 'number') {
      date = new Date(value.seconds * 1000);
    } else if (typeof value.toDate === 'function') {
      try {
        date = value.toDate();
      } catch (e) {
        return 'N/A';
      }
    } else {
      date = new Date(value.toString());
    }
  } else {
    return 'N/A';
  }
  if (isNaN(date.getTime())) {
    return 'N/A';
  }
  try {
    return date.toLocaleString(locale, options);
  } catch (e) {
    try {
      return date.toISOString();
    } catch (err) {
      return 'N/A';
    }
  }
}

export default function AdminPortal({
  users,
  limits,
  demands = [],
  deadlines = [],
  bookings = [],
  dealerBookings = [],
  pakistanBondResults = [],
  thaiLotteryResults = [],
  currentUser,
  onCancelBookingByAdmin,
  onCancelDealerBookingByAdmin,
  onAssignDealer,
  onRecharge,
  onSetLimit,
  onDeleteLimit,
  onApproveDemand,
  onRejectDemand,
  onSetDeadline,
  onDeleteDeadline,
  onAddResult,
  onEditResult,
  onDeleteResult
}: AdminPortalProps) {
  const isSuper = currentUser?.role === 'superAdmin' || currentUser?.role === 'admin' || (currentUser?.isAdmin && currentUser?.role !== 'dataEntryAdmin');
  const defaultTab = isSuper ? 'demands_bookings' : 'results';
  const [activeAdminTab, setActiveAdminTab] = useState<'demands_bookings' | 'results' | 'limits_deadlines' | 'users_finance' | 'admin_management'>(defaultTab);

  // Fallback to 'results' tab for Data Entry Admin if currently on a Super Admin tab
  useEffect(() => {
    if (!isSuper && (activeAdminTab === 'demands_bookings' || activeAdminTab === 'users_finance' || activeAdminTab === 'limits_deadlines' || activeAdminTab === 'admin_management')) {
      setActiveAdminTab('results');
    }
  }, [isSuper, activeAdminTab]);

  // Admin Management Screen States
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminPhone, setNewAdminPhone] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'superAdmin' | 'dataEntryAdmin' | 'dealer'>('dataEntryAdmin');
  const [adminManageError, setAdminManageError] = useState('');
  const [adminManageSuccess, setAdminManageSuccess] = useState('');

  // Recharge States
  const [rechargeEmail, setRechargeEmail] = useState('');
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [rechargeReason, setRechargeReason] = useState('');
  const [rechargeError, setRechargeError] = useState('');
  const [rechargeSuccess, setRechargeSuccess] = useState('');

  // Limit States
  const [limitCategory, setLimitCategory] = useState<'pakistan_bond' | 'thailand_lottery'>('pakistan_bond');
  const [limitNumber, setLimitNumber] = useState('');
  const [limitAmount, setLimitAmount] = useState('');
  const [limitError, setLimitError] = useState('');
  const [limitSuccess, setLimitSuccess] = useState('');

  // Deadline configuration states
  const [editingDrawId, setEditingDrawId] = useState<string>('');
  const [deadlineCategory, setDeadlineCategory] = useState<'pakistan_bond' | 'thailand_lottery'>('pakistan_bond');
  const [deadlineTitle, setDeadlineTitle] = useState('بکنگ فائنل کھل گئی ہے');
  const [deadlineDateTime, setDeadlineDateTime] = useState('');
  const [deadlineStatus, setDeadlineStatus] = useState<'open' | 'closed' | 'result_announced'>('open');
  const [deadlineError, setDeadlineError] = useState('');
  const [deadlineSuccess, setDeadlineSuccess] = useState('');

  const [nextPrizeBondValue, setNextPrizeBondValue] = useState('');
  const [nextDrawCity, setNextDrawCity] = useState('');
  const [nextDrawNumber, setNextDrawNumber] = useState('');
  const [nextDrawDate, setNextDrawDate] = useState('');

  const resetDeadlineForm = () => {
    setEditingDrawId('');
    setDeadlineTitle('بکنگ فائنل کھل گئی ہے');
    setDeadlineDateTime('');
    setDeadlineStatus('open');
    setNextPrizeBondValue('');
    setNextDrawCity('');
    setNextDrawNumber('');
    setNextDrawDate('');
  };

  // Pre-populate deadline inputs when category or deadlines change if not editing specific draw
  useEffect(() => {
    if (!editingDrawId) {
      const existing = deadlines.find(d => d.category === deadlineCategory);
      if (existing) {
        setDeadlineTitle(existing.titleUrdu);
        setDeadlineDateTime(existing.deadlineIso);
        setDeadlineStatus(existing.status || 'open');
        setNextPrizeBondValue(existing.nextPrizeBondValue || '');
        setNextDrawCity(existing.nextDrawCity || '');
        setNextDrawNumber(existing.nextDrawNumber || '');
        setNextDrawDate(existing.nextDrawDate || '');
      } else {
        setNextPrizeBondValue('');
        setNextDrawCity('');
        setNextDrawNumber('');
        setNextDrawDate('');
      }
    }
  }, [deadlineCategory, deadlines, editingDrawId]);

  // Demand management state
  const [demandError, setDemandError] = useState('');
  const [demandSuccess, setDemandSuccess] = useState('');

  // Master Bookings states
  const [cancelSuccess, setCancelSuccess] = useState('');
  const [cancelError, setCancelError] = useState('');

  // WhatsApp configuration states
  const [whatsappVal, setWhatsappVal] = useState('');
  const [whatsappSuccess, setWhatsappSuccess] = useState('');
  const [whatsappError, setWhatsappError] = useState('');

  // Admin Password configuration states
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [adminCurrentPasswordInput, setAdminCurrentPasswordInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminConfirmPasswordInput, setAdminConfirmPasswordInput] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // User Password Management states
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [foundUser, setFoundUser] = useState<User | null>(null);
  const [userNewPassword, setUserNewPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [userPasswordSuccess, setUserPasswordSuccess] = useState('');
  const [userPasswordError, setUserPasswordError] = useState('');

  // Result Management states
  const [resultSuccess, setResultSuccess] = useState('');
  const [resultError, setResultError] = useState('');
  const [resultViewCategory, setResultViewCategory] = useState<'pakistan_bond' | 'thailand_lottery'>('pakistan_bond');
  const [resultSearchQuery, setResultSearchQuery] = useState('');
  const [resultFormOpen, setResultFormOpen] = useState(false);
  const [resultFormMode, setResultFormMode] = useState<'add' | 'edit'>('add');
  const [editingResultId, setEditingResultId] = useState('');

  // Result Form fields
  const [resCategory, setResCategory] = useState<'pakistan_bond' | 'thailand_lottery'>('pakistan_bond');
  const [resBondValue, setResBondValue] = useState('Rs. 200');
  const [resDrawNoOnly, setResDrawNoOnly] = useState('');
  const [resDrawNo, setResDrawNo] = useState('');
  const [resDate, setResDate] = useState('');
  const [resCity, setResCity] = useState('');
  const [resFirstPrize, setResFirstPrize] = useState('');
  const [resSecondPrizesStr, setResSecondPrizesStr] = useState('');
  const [resLast2Digits, setResLast2Digits] = useState('');
  const [resFront3Digits, setResFront3Digits] = useState('');
  const [resBack3Digits, setResBack3Digits] = useState('');

  // Auto-derives or autofills when fields change
  useEffect(() => {
    if (resCategory === 'pakistan_bond') {
      const val = resBondValue ? ` Rs. ${resBondValue.replace(/Rs\./i, '').trim()}` : '';
      if (resDrawNoOnly) {
        setResDrawNo(`ڈرا نمبر ${resDrawNoOnly} (بانڈ${val})`);
      }
    }
  }, [resBondValue, resDrawNoOnly, resCategory]);

  useEffect(() => {
    if (resCategory === 'thailand_lottery' && resFirstPrize) {
      const prize = resFirstPrize.trim();
      if (prize.length >= 6) {
        setResLast2Digits(prize.substring(4));
        setResFront3Digits(prize.substring(0, 3));
        setResBack3Digits(prize.substring(3));
      }
    }
  }, [resFirstPrize, resCategory]);

  const resetResultForm = () => {
    setResCategory(resultViewCategory);
    setResBondValue('Rs. 200');
    setResDrawNoOnly('');
    setResDrawNo('');
    setResDate('');
    setResCity(resultViewCategory === 'thailand_lottery' ? 'بنکاک' : '');
    setResFirstPrize('');
    setResSecondPrizesStr('');
    setResLast2Digits('');
    setResFront3Digits('');
    setResBack3Digits('');
    setEditingResultId('');
  };

  const handleSaveResult = async (e: FormEvent) => {
    e.preventDefault();
    setResultSuccess('');
    setResultError('');

    if (resCategory === 'pakistan_bond') {
      if (!resBondValue || !resDrawNoOnly || !resDate || !resCity || !resFirstPrize) {
        setResultError('براہ کرم تمام لازمی فیلڈز پُر کریں۔');
        return;
      }
      if (resFirstPrize.length < 5) {
        setResultError('پہلا انعام کم از کم 5 ہندسوں کا ہونا چاہیے۔');
        return;
      }
    } else {
      if (!resDrawNo || !resDate || !resCity || !resFirstPrize || !resLast2Digits || !resFront3Digits || !resBack3Digits) {
        setResultError('تھائی لاٹری کے لیے تمام فیلڈز لازمی ہیں۔');
        return;
      }
    }

    const secondsArray = resSecondPrizesStr
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const generatedId = resultFormMode === 'add' 
      ? (resCategory === 'pakistan_bond' 
          ? `pk-draw-${resBondValue.replace(/[\s,.]+/g, '').toLowerCase()}-${resDrawNoOnly}` 
          : `thai-${Date.now()}`)
      : editingResultId;

    let resultDoc: AllResultType;
    if (resCategory === 'pakistan_bond') {
      const formattedBondVal = resBondValue.toLowerCase().startsWith('rs.') ? resBondValue : `Rs. ${resBondValue}`;
      resultDoc = {
        id: generatedId,
        category: 'pakistan_bond',
        bondValue: formattedBondVal,
        drawNoOnly: resDrawNoOnly,
        drawNo: resDrawNo || `ڈرا نمبر ${resDrawNoOnly} (بانڈ ${formattedBondVal})`,
        date: resDate,
        city: resCity,
        firstPrize: resFirstPrize,
        secondPrizes: secondsArray
      };
    } else {
      resultDoc = {
        id: generatedId,
        category: 'thailand_lottery',
        drawNo: resDrawNo,
        date: resDate,
        city: resCity,
        firstPrize: resFirstPrize,
        secondPrizes: secondsArray,
        last2Digits: resLast2Digits,
        front3Digits: resFront3Digits,
        back3Digits: resBack3Digits
      };
    }

    const response = resultFormMode === 'add' 
      ? await onAddResult(resultDoc) 
      : await onEditResult(resultDoc);

    if (response.success) {
      setResultSuccess(resultFormMode === 'add' ? 'قرعہ اندازی کا نتیجہ کامیابی سے شامل کر دیا گیا ہے۔' : 'قرعہ اندازی کا نتیجہ کامیابی سے اپ ڈیٹ کر دیا گیا ہے۔');
      setResultFormOpen(false);
      resetResultForm();
    } else {
      setResultError(response.error || 'نتیجہ محفوظ کرنے میں خرابی پیش آئی۔');
    }
  };

  const handleEditClick = (draw: AllResultType) => {
    setResultSuccess('');
    setResultError('');
    setResultFormMode('edit');
    setEditingResultId(draw.id);
    setResCategory(draw.category);
    setResDate(draw.date);
    setResCity(draw.city);
    setResFirstPrize(draw.firstPrize);
    setResSecondPrizesStr(draw.secondPrizes.join(', '));

    if (draw.category === 'pakistan_bond') {
      const pb = draw as PakistanBondResult;
      setResBondValue(pb.bondValue);
      setResDrawNoOnly(pb.drawNoOnly);
      setResDrawNo(pb.drawNo);
    } else {
      const tl = draw as ThaiLotteryResult;
      setResDrawNo(tl.drawNo);
      setResLast2Digits(tl.last2Digits);
      setResFront3Digits(tl.front3Digits);
      setResBack3Digits(tl.back3Digits);
    }
    setResultFormOpen(true);
  };

  const handleDeleteClick = async (id: string, category: 'pakistan_bond' | 'thailand_lottery') => {
    if (!window.confirm('کیا آپ واقعی یہ قرعہ اندازی کا نتیجہ حذف کرنا چاہتے ہیں؟')) return;

    setResultSuccess('');
    setResultError('');
    const res = await onDeleteResult(id, category);
    if (res.success) {
      setResultSuccess('قرعہ اندازی کا نتیجہ کامیابی سے حذف کر دیا گیا ہے۔');
    } else {
      setResultError(res.error || 'نتیجہ حذف کرنے میں خرابی پیش آئی۔');
    }
  };

  const handleSearchUser = () => {
    setUserPasswordError('');
    setUserPasswordSuccess('');
    setFoundUser(null);

    const queryClean = userSearchQuery.trim().toLowerCase();
    if (!queryClean) {
      setUserPasswordError('براہ کرم تلاش کرنے کے لئے ای میل یا موبائل نمبر درج کریں۔ (Please enter an email or mobile number to search.)');
      return;
    }

    const matched = users.find(u => 
      (u.email || '').toLowerCase().trim() === queryClean || 
      (u.phone || '').trim() === queryClean
    );

    if (matched) {
      setFoundUser(matched);
      setUserNewPassword('');
      setUserConfirmPassword('');
    } else {
      setUserPasswordError('صارف نہیں ملا۔ براہ کرم درج کردہ معلومات درست کریں۔ (User not found.)');
    }
  };

  const handleUserPasswordReset = async (e: FormEvent) => {
    e.preventDefault();
    setUserPasswordError('');
    setUserPasswordSuccess('');

    if (!foundUser) {
      setUserPasswordError('براہ کرم پہلے صارف تلاش کریں۔');
      return;
    }

    if (userNewPassword.length < 8) {
      setUserPasswordError('پاس ورڈ کم از کم 8 حروف کا ہونا چاہیے۔ (Password must be at least 8 characters.)');
      return;
    }

    if (userNewPassword !== userConfirmPassword) {
      setUserPasswordError('پاس ورڈز آپس میں میل نہیں کھاتے (Password confirmation does not match.)');
      return;
    }

    const success = await updateCustomerPassword(foundUser.email, userNewPassword);
    if (success) {
      setUserPasswordSuccess(`پاس ورڈ کامیابی سے تبدیل کر دیا گیا ہے۔ (Password updated successfully for ${foundUser.name})`);
      setUserNewPassword('');
      setUserConfirmPassword('');
      setFoundUser(null);
      setUserSearchQuery('');
    } else {
      setUserPasswordError('پاس ورڈ تبدیل کرنے میں خرابی پیش آئی۔ براہ کرم انٹرنیٹ چیک کریں۔ (Firestore update failed.)');
    }
  };

  useEffect(() => {
    setWhatsappVal(getSupportWhatsAppNumber());
    setAdminEmailInput(currentUser?.email || getAdminConfiguredEmail());
  }, [currentUser]);

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordSuccess('');
    setPasswordError('');

    if (!adminCurrentPasswordInput.trim()) {
      setPasswordError('برائے مہربانی موجودہ پاس ورڈ درج کریں۔ (Please enter current password.)');
      return;
    }
    if (!adminPasswordInput.trim() || adminPasswordInput.trim().length < 6) {
      setPasswordError('نیا پاس ورڈ کم از کم 6 ہندسوں کا ہونا ضروری ہے۔ (New password must be at least 6 characters.)');
      return;
    }
    if (adminPasswordInput !== adminConfirmPasswordInput) {
      setPasswordError('پاس ورڈ کی تصدیق مماثل نہیں ہے۔ (Confirm password does not match.)');
      return;
    }

    const res = await changeLoggedAdminPassword(adminCurrentPasswordInput.trim(), adminPasswordInput.trim());
    if (res.success) {
      setPasswordSuccess('کامیاب: پاس ورڈ کامیابی سے تبدیل کر دیا گیا ہے۔ (Success: Password updated successfully.)');
      setAdminCurrentPasswordInput('');
      setAdminPasswordInput('');
      setAdminConfirmPasswordInput('');
    } else {
      setPasswordError(res.error || 'پاس ورڈ تبدیل کرنے میں خرابی پیش آئی۔');
    }
  };

  const handleCreateAdminSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAdminManageError('');
    setAdminManageSuccess('');

    if (!newAdminName.trim() || !newAdminPhone.trim() || !newAdminEmail.trim() || !newAdminPassword.trim()) {
      setAdminManageError('براہ کرم تمام فیلڈز پُر کریں۔ (Please fill in all fields.)');
      return;
    }

    if (newAdminPassword.length < 6) {
      setAdminManageError('پاس ورڈ کم از کم 6 ہندسوں کا ہونا ضروری ہے۔ (Password must be at least 6 characters.)');
      return;
    }

    const emailClean = newAdminEmail.toLowerCase().trim();

    try {
      const uid = await registerInAuthOnly(emailClean, newAdminPassword);

      if (!uid) {
        throw new Error('ایڈمن لاگ ان بنانے میں ناکامی (Failed to create auth user)');
      }

      const isDealerCreation = newAdminRole === 'dealer';
      const newAdminDoc = {
        uid,
        email: emailClean,
        name: newAdminName.trim(),
        phone: newAdminPhone.trim(),
        city: isDealerCreation ? 'Authorized Dealer' : 'Enterprise HQ',
        balance: 0,
        isAdmin: !isDealerCreation,
        role: newAdminRole,
        active: true,
        lastLogin: null
      };

      await setDoc(doc(db, 'users', uid), newAdminDoc);

      setAdminManageSuccess(
        isDealerCreation
          ? `کامیاب: نیا مجاز ڈیلر ${newAdminName} کامیابی سے بنا دیا گیا ہے اور لاگ ان کے لیے تیار ہے۔`
          : `کامیاب: نیا ایڈمن ${newAdminName} کامیابی سے بنا دیا گیا ہے اور لاگ ان کے لیے تیار ہے۔`
      );
      setNewAdminName('');
      setNewAdminPhone('');
      setNewAdminEmail('');
      setNewAdminPassword('');
    } catch (err: any) {
      console.error("Failed to create admin:", err);
      setAdminManageError(err?.message || 'نیا ایڈمن بنانے میں خرابی پیش آئی۔');
    }
  };

  const handleDeleteAdmin = async (email: string) => {
    const emailClean = email.toLowerCase().trim();
    const mainOwnerEmail = getAdminConfiguredEmail().toLowerCase().trim();
    if (emailClean === mainOwnerEmail || emailClean === currentUser?.email?.toLowerCase().trim()) {
      alert('سپر مالک (Super Owner) یا خود کو حذف نہیں کیا جا سکتا۔');
      return;
    }

    if (!window.confirm(`کیا آپ واقعی ایڈمن (${email}) کو حذف کرنا چاہتے ہیں؟`)) {
      return;
    }

    setAdminManageError('');
    setAdminManageSuccess('');

    try {
      const cached = users.find(u => (u.email || '').toLowerCase() === emailClean);
      if (!cached || !cached.uid) {
        throw new Error('ایڈمن کا UID نہیں ملا۔ (Admin UID not found.)');
      }
      await deleteDoc(doc(db, 'users', cached.uid));
      setAdminManageSuccess(`کامیاب: ایڈمن (${email}) کا ریکارڈ کامیابی سے حذف کر دیا گیا ہے۔`);
    } catch (err: any) {
      console.error("Delete admin error:", err);
      setAdminManageError(err?.message || 'ایڈمن ریکارڈ حذف کرنے میں خرابی پیش آئی۔');
    }
  };

  const handleToggleActiveAdmin = async (email: string, currentActive: boolean) => {
    const emailClean = email.toLowerCase().trim();
    const mainOwnerEmail = getAdminConfiguredEmail().toLowerCase().trim();
    if (emailClean === mainOwnerEmail || emailClean === currentUser?.email?.toLowerCase().trim()) {
      alert('سپر مالک (Super Owner) کے سٹیٹس میں تبدیلی نہیں کی جا سکتی۔');
      return;
    }

    setAdminManageError('');
    setAdminManageSuccess('');

    try {
      const isDeactivating = (currentActive !== false);
      const cached = users.find(u => (u.email || '').toLowerCase() === emailClean);
      if (!cached || !cached.uid) {
        throw new Error('ایڈمن کا UID نہیں ملا۔ (Admin UID not found.)');
      }
      await setDoc(doc(db, 'users', cached.uid), {
        active: !isDeactivating
      }, { merge: true });
      setAdminManageSuccess(`ایڈمن اکاؤنٹ کامیابی سے ${!isDeactivating ? 'فعال (Activate)' : 'غیر فعال (Deactivate)'} کر دیا گیا ہے۔`);
    } catch (err: any) {
      console.error("Toggle active status error:", err);
      setAdminManageError(err?.message || 'سٹیٹس تبدیل کرنے میں خرابی پیش آئی۔');
    }
  };

  const handleChangeAdminRole = async (email: string, roleToSet: AdminRole) => {
    const emailClean = email.toLowerCase().trim();
    const mainOwnerEmail = getAdminConfiguredEmail().toLowerCase().trim();
    if (emailClean === mainOwnerEmail || emailClean === currentUser?.email?.toLowerCase().trim()) {
      alert('سپر مالک (Super Owner) کا رول تبدیل نہیں کیا جا سکتا۔');
      return;
    }

    setAdminManageError('');
    setAdminManageSuccess('');

    try {
      const cached = users.find(u => (u.email || '').toLowerCase() === emailClean);
      if (!cached || !cached.uid) {
        throw new Error('صارف کا UID نہیں ملا۔ (User UID not found.)');
      }
      const isDealer = roleToSet === 'dealer';
      const isCustomer = roleToSet === 'customer';
      await setDoc(doc(db, 'users', cached.uid), {
        role: roleToSet,
        isAdmin: (!isDealer && !isCustomer)
      }, { merge: true });
      
      const roleLabel = roleToSet === 'superAdmin' 
        ? 'Super Admin' 
        : roleToSet === 'dataEntryAdmin' 
        ? 'Data Entry Admin' 
        : roleToSet === 'dealer' 
        ? 'Authorized Dealer' 
        : 'Customer';
      setAdminManageSuccess(`رول کامیابی سے تبدیل کر کے ${roleLabel} کر دیا گیا ہے۔`);
    } catch (err: any) {
      console.error("Change role error:", err);
      setAdminManageError(err?.message || 'رول تبدیل کرنے میں خرابی پیش آئی۔');
    }
  };

  const handleWhatsappSubmit = (e: FormEvent) => {
    e.preventDefault();
    setWhatsappSuccess('');
    setWhatsappError('');

    if (!whatsappVal.trim()) {
      setWhatsappError('برائے مہربانی ایک درست واٹس ایپ نمبر درج کریں۔');
      return;
    }

    setSupportWhatsAppNumber(whatsappVal);
    const updated = getSupportWhatsAppNumber();
    setWhatsappVal(updated);
    setWhatsappSuccess(`کامیاب: واٹس ایپ سپورٹ نمبر تبدیل کر کے +${updated} کر دیا گیا ہے۔ تمام کسٹمرز کے رابطہ لنکس اپ ڈیٹ ہو چکے ہیں۔`);
  };

  const handleWalletAction = async (action: 'recharge' | 'deduct') => {
    setRechargeError('');
    setRechargeSuccess('');

    if (!rechargeEmail.trim() || !rechargeAmount.trim()) {
      setRechargeError('ای میل اور رقم درج کرنا ضروری ہے۔');
      return;
    }

    const amt = parseInt(rechargeAmount, 10);
    if (isNaN(amt) || amt <= 0) {
      setRechargeError('برائے مہربانی ایک درست مثبت رقم درج کریں۔');
      return;
    }

    const finalAmount = action === 'deduct' ? -amt : amt;
    const res = await onRecharge(rechargeEmail.trim(), finalAmount, rechargeReason.trim());
    if (res.success) {
      setRechargeSuccess(action === 'deduct' ? `کامیاب: Rs. ${amt.toLocaleString()} اکاؤنٹ سے منہا کر دیے گئے ہیں۔` : `کامیاب: Rs. ${amt.toLocaleString()} اکاؤنٹ میں شامل کر دیے گئے ہیں۔`);
      setRechargeAmount('');
      setRechargeReason('');
    } else {
      setRechargeError(res.error || 'والٹ ٹرانزیکشن میں خرابی پیش آئی۔');
    }
  };

  const handleLimitSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLimitError('');
    setLimitSuccess('');

    if (!limitNumber || !limitAmount) {
      setLimitError('نمبر اور زیادہ سے زیادہ رقم دونوں لازمی ہیں۔');
      return;
    }

    const limitNumVal = parseInt(limitAmount, 10);
    if (isNaN(limitNumVal) || limitNumVal <= 0) {
      setLimitError('براہ کرم درست لمٹ رقم لکھیں۔');
      return;
    }

    await onSetLimit(limitCategory, limitNumber, limitNumVal);
    setLimitSuccess(`کامیاب: نمبر ${limitNumber} کی حد Rs. ${limitNumVal} مقرر کر دی گئی ہے۔`);
    setLimitNumber('');
    setLimitAmount('');
  };

  const handleDeadlineSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDeadlineError('');
    setDeadlineSuccess('');

    if (!deadlineDateTime) {
      setDeadlineError('براہ کرم تاریخ اور وقت منتخب کریں۔');
      return;
    }

    const drawIdToSave = editingDrawId || (
      deadlineCategory === 'pakistan_bond'
        ? `pk-bond-${nextPrizeBondValue ? nextPrizeBondValue.replace(/\D/g, '') : Date.now()}`
        : deadlineCategory
    );

    onSetDeadline(
      deadlineCategory,
      deadlineDateTime,
      deadlineTitle || 'بکنگ فائنل کھل گئی ہے',
      deadlineStatus,
      nextPrizeBondValue,
      nextDrawCity,
      nextDrawNumber,
      nextDrawDate,
      drawIdToSave
    );
    setDeadlineSuccess(`کامیاب: ${deadlineCategory === 'pakistan_bond' ? 'پاکستان بانڈ ڈرا' : 'تھائی لینڈ لاٹری'} کی سیٹنگز کامیابی سے محفوظ ہو گئی ہیں!`);
    resetDeadlineForm();
  };


  return (
    <div className="space-y-8 font-sans text-right max-w-4xl mx-auto">
      {/* Dynamic Security Banner */}
      <div className="bg-amber-500/10 border border-amber-500/35 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row shadow-sm gap-4 items-center sm:items-start justify-between">
        <div className="bg-amber-500/20 p-3 rounded-2xl text-amber-600 sm:order-last">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-amber-900 flex items-center justify-end gap-2">
            <span>ایڈمن کنٹرول پینل</span>
          </h3>
          <p className="text-slate-600 text-xs mt-2 leading-relaxed max-w-lg">
            قریشی صاحب! یہاں سے آپ موصولہ ڈیمانڈز قبول یا مسترد کر سکتے ہیں، کسی بھی رجسٹرڈ کسٹمر کے اکاؤنٹ میں رقم ریچارج کر سکتے ہیں، اور خاص نمبرز پر زیادہ سے زیادہ بکنگ کی لمٹ لگا سکتے ہیں۔
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-end gap-2 border-b border-slate-200 pb-3">
        {isSuper && (
          <button
            onClick={() => setActiveAdminTab('admin_management')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
              activeAdminTab === 'admin_management'
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/10 font-bold'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>ایڈمنز کا انتظام (Admins)</span>
          </button>
        )}

        {isSuper && (
          <button
            onClick={() => setActiveAdminTab('users_finance')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
              activeAdminTab === 'users_finance'
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/10'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>صارفین اور فنانس (Users)</span>
          </button>
        )}

        {isSuper && (
          <button
            onClick={() => setActiveAdminTab('limits_deadlines')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
              activeAdminTab === 'limits_deadlines'
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/10'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>لمٹس اور ڈیڈ لائنز (Limits)</span>
          </button>
        )}

        <button
          onClick={() => setActiveAdminTab('results')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
            activeAdminTab === 'results'
              ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/10'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <History className="w-4 h-4" />
          <span>نتائج کا انتظام (Results)</span>
        </button>

        {isSuper && (
          <button
            id="admin-tab-dealership-btn"
            onClick={() => setActiveAdminTab('dealership' as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
              (activeAdminTab as any) === 'dealership'
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/10'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>ڈیلرشپ انتظام (Dealership)</span>
          </button>
        )}

        {isSuper && (
          <button
            onClick={() => setActiveAdminTab('demands_bookings')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
              activeAdminTab === 'demands_bookings'
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/10'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>ڈیمانڈز اور بکنگز (Demands)</span>
          </button>
        )}
      </div>

      {activeAdminTab === 'demands_bookings' && isSuper && (
        <AdminDemandsBookingsTab
          users={users}
          demands={demands}
          bookings={bookings}
          demandError={demandError}
          demandSuccess={demandSuccess}
          cancelError={cancelError}
          cancelSuccess={cancelSuccess}
          onApproveDemand={onApproveDemand}
          onRejectDemand={onRejectDemand}
          onCancelBookingByAdmin={onCancelBookingByAdmin}
          safeGetTime={safeGetTime}
          safeFormatDate={safeFormatDate}
        />
      )}

      {(activeAdminTab as any) === 'dealership' && isSuper && (
        <AdminDealershipTab
          dealers={users.filter(u => u.role === 'dealer')}
          allUsers={users}
          dealerBookings={dealerBookings || []}
          onAssignDealer={onAssignDealer || assignDealerRole}
          onCancelDealerBookingByAdmin={onCancelDealerBookingByAdmin || cancelDealerBookingByAdmin}
        />
      )}

      {activeAdminTab === 'users_finance' && isSuper && (
        <AdminUsersFinanceTab
          users={users}
          rechargeError={rechargeError}
          rechargeSuccess={rechargeSuccess}
          rechargeEmail={rechargeEmail}
          setRechargeEmail={setRechargeEmail}
          rechargeAmount={rechargeAmount}
          setRechargeAmount={setRechargeAmount}
          rechargeReason={rechargeReason}
          setRechargeReason={setRechargeReason}
          handleWalletAction={handleWalletAction}
          whatsappError={whatsappError}
          whatsappSuccess={whatsappSuccess}
          whatsappVal={whatsappVal}
          setWhatsappVal={setWhatsappVal}
          handleWhatsappSubmit={handleWhatsappSubmit}
          passwordError={passwordError}
          passwordSuccess={passwordSuccess}
          adminCurrentPasswordInput={adminCurrentPasswordInput}
          setAdminCurrentPasswordInput={setAdminCurrentPasswordInput}
          adminEmailInput={adminEmailInput}
          adminPasswordInput={adminPasswordInput}
          setAdminPasswordInput={setAdminPasswordInput}
          adminConfirmPasswordInput={adminConfirmPasswordInput}
          setAdminConfirmPasswordInput={setAdminConfirmPasswordInput}
          handlePasswordSubmit={handlePasswordSubmit}
          userPasswordError={userPasswordError}
          userPasswordSuccess={userPasswordSuccess}
          userSearchQuery={userSearchQuery}
          setUserSearchQuery={setUserSearchQuery}
          foundUser={foundUser}
          setFoundUser={setFoundUser}
          handleSearchUser={handleSearchUser}
          userNewPassword={userNewPassword}
          setUserNewPassword={setUserNewPassword}
          userConfirmPassword={userConfirmPassword}
          setUserConfirmPassword={setUserConfirmPassword}
          handleUserPasswordReset={handleUserPasswordReset}
        />
      )}

      {activeAdminTab === 'limits_deadlines' && isSuper && (
        <AdminLimitsDeadlinesTab
          limits={limits}
          deadlines={deadlines}
          limitError={limitError}
          limitSuccess={limitSuccess}
          limitCategory={limitCategory}
          setLimitCategory={setLimitCategory}
          limitNumber={limitNumber}
          setLimitNumber={setLimitNumber}
          limitAmount={limitAmount}
          setLimitAmount={setLimitAmount}
          handleLimitSubmit={handleLimitSubmit}
          onDeleteLimit={onDeleteLimit}
          deadlineError={deadlineError}
          deadlineSuccess={deadlineSuccess}
          editingDrawId={editingDrawId}
          resetDeadlineForm={resetDeadlineForm}
          deadlineCategory={deadlineCategory}
          setDeadlineCategory={setDeadlineCategory}
          deadlineTitle={deadlineTitle}
          setDeadlineTitle={setDeadlineTitle}
          deadlineDateTime={deadlineDateTime}
          setDeadlineDateTime={setDeadlineDateTime}
          deadlineStatus={deadlineStatus}
          setDeadlineStatus={setDeadlineStatus}
          nextPrizeBondValue={nextPrizeBondValue}
          setNextPrizeBondValue={setNextPrizeBondValue}
          nextDrawCity={nextDrawCity}
          setNextDrawCity={setNextDrawCity}
          nextDrawNumber={nextDrawNumber}
          setNextDrawNumber={setNextDrawNumber}
          nextDrawDate={nextDrawDate}
          setNextDrawDate={setNextDrawDate}
          handleDeadlineSubmit={handleDeadlineSubmit}
          onSetDeadline={onSetDeadline}
          onDeleteDeadline={onDeleteDeadline}
          setEditingDrawId={setEditingDrawId}
          safeGetTime={safeGetTime}
          safeFormatDate={safeFormatDate}
        />
      )}

      {activeAdminTab === 'results' && (
        <AdminResultsTab
          pakistanBondResults={pakistanBondResults}
          thaiLotteryResults={thaiLotteryResults}
          resultError={resultError}
          resultSuccess={resultSuccess}
          resultFormOpen={resultFormOpen}
          setResultFormOpen={setResultFormOpen}
          resultFormMode={resultFormMode}
          setResultFormMode={setResultFormMode}
          resCategory={resCategory}
          setResCategory={setResCategory}
          resDate={resDate}
          setResDate={setResDate}
          resCity={resCity}
          setResCity={setResCity}
          resBondValue={resBondValue}
          setResBondValue={setResBondValue}
          resDrawNoOnly={resDrawNoOnly}
          setResDrawNoOnly={setResDrawNoOnly}
          resDrawNo={resDrawNo}
          setResDrawNo={setResDrawNo}
          resFirstPrize={resFirstPrize}
          setResFirstPrize={setResFirstPrize}
          resLast2Digits={resLast2Digits}
          setResLast2Digits={setResLast2Digits}
          resFront3Digits={resFront3Digits}
          setResFront3Digits={setResFront3Digits}
          resBack3Digits={resBack3Digits}
          setResBack3Digits={setResBack3Digits}
          resSecondPrizesStr={resSecondPrizesStr}
          setResSecondPrizesStr={setResSecondPrizesStr}
          resetResultForm={resetResultForm}
          handleSaveResult={handleSaveResult}
          resultSearchQuery={resultSearchQuery}
          setResultSearchQuery={setResultSearchQuery}
          resultViewCategory={resultViewCategory}
          setResultViewCategory={setResultViewCategory}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      )}

      {activeAdminTab === 'admin_management' && isSuper && (
        <AdminManagementTab
          users={users}
          adminManageError={adminManageError}
          adminManageSuccess={adminManageSuccess}
          newAdminName={newAdminName}
          setNewAdminName={setNewAdminName}
          newAdminPhone={newAdminPhone}
          setNewAdminPhone={setNewAdminPhone}
          newAdminEmail={newAdminEmail}
          setNewAdminEmail={setNewAdminEmail}
          newAdminPassword={newAdminPassword}
          setNewAdminPassword={setNewAdminPassword}
          newAdminRole={newAdminRole}
          setNewAdminRole={setNewAdminRole}
          handleCreateAdminSubmit={handleCreateAdminSubmit}
          handleDeleteAdmin={handleDeleteAdmin}
          handleToggleActiveAdmin={handleToggleActiveAdmin}
          handleChangeAdminRole={handleChangeAdminRole}
          safeFormatDate={safeFormatDate}
        />
      )}
    </div>
  );
}
