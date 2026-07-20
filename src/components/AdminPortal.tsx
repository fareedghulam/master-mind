import React, { useState, useEffect, FormEvent } from 'react';
import { User, NumberLimit, Demand, DrawDeadline, Booking, PakistanBondResult, ThaiLotteryResult, AllResultType } from '../types';
import { Shield, Plus, Trash, Check, X, UserCheck, AlertTriangle, ShieldCheck, HelpCircle, Sparkles, Clock, MessageCircle, Search, History } from 'lucide-react';
import { getSupportWhatsAppNumber, setSupportWhatsAppNumber, updateUserPassword, getAdminConfiguredEmail, updateCustomerPassword, registerInAuthOnly, changeLoggedAdminPassword } from '../utils/store';
import { db } from '../lib/firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

interface AdminPortalProps {
  users: User[];
  limits: NumberLimit[];
  demands: Demand[];
  deadlines: DrawDeadline[];
  bookings: Booking[];
  pakistanBondResults: PakistanBondResult[];
  thaiLotteryResults: ThaiLotteryResult[];
  currentUser: User | null;
  onCancelBookingByAdmin: (bookingId: string) => Promise<{ success: boolean; error?: string }>;
  onRecharge: (email: string, amount: number) => Promise<boolean>;
  onSetLimit: (category: 'pakistan_bond' | 'thailand_lottery', number: string, maxAmount: number) => Promise<any>;
  onDeleteLimit: (id: string) => Promise<any>;
  onApproveDemand: (id: string) => Promise<{ success: boolean; error?: string }>;
  onRejectDemand: (id: string) => Promise<{ success: boolean; error?: string }>;
  onSetDeadline: (
    category: 'pakistan_bond' | 'thailand_lottery',
    deadlineIso: string,
    titleUrdu: string,
    status: 'open' | 'closed',
    nextPrizeBondValue?: string,
    nextDrawCity?: string,
    nextDrawNumber?: string,
    nextDrawDate?: string
  ) => void;
  onAddResult: (result: AllResultType) => Promise<{ success: boolean; error?: string }>;
  onEditResult: (result: AllResultType) => Promise<{ success: boolean; error?: string }>;
  onDeleteResult: (id: string, category: 'pakistan_bond' | 'thailand_lottery') => Promise<{ success: boolean; error?: string }>;
}

function safeGetTime(value: any): number {
  if (!value) return 0;

  try {
    let d: Date;

    if (value instanceof Date) {
      d = value;
    } else if (typeof value?.toDate === "function") {
      d = value.toDate();
    } else if (typeof value?.seconds === "number") {
      d = new Date(value.seconds * 1000);
    } else {
      d = new Date(value);
    }

    const t = d.getTime();
    return Number.isNaN(t) ? 0 : t;
  } catch {
    return 0;
  }
}

function safeFormatDate(
  value: any,
  locale = "en-US",
  options?: Intl.DateTimeFormatOptions
): string {
  const t = safeGetTime(value);

  if (!t) return "N/A";

  try {
    return new Date(t).toLocaleString(locale, options);
  } catch {
    return "N/A";
  }
}
  }
}

export default function AdminPortal({
  users,
  limits,
  demands = [],
  deadlines = [],
  bookings = [],
  pakistanBondResults = [],
  thaiLotteryResults = [],
  currentUser,
  onCancelBookingByAdmin,
  onRecharge,
  onSetLimit,
  onDeleteLimit,
  onApproveDemand,
  onRejectDemand,
  onSetDeadline,
  onAddResult,
  onEditResult,
  onDeleteResult
}: AdminPortalProps) {
  const isSuper = currentUser?.role === 'superAdmin' || currentUser?.role === 'admin';
  const defaultTab = isSuper ? 'demands_bookings' : 'results';
  const [activeAdminTab, setActiveAdminTab] = useState<'demands_bookings' | 'results' | 'limits_deadlines' | 'users_finance' | 'admin_management'>(defaultTab);

  // Admin Management Screen States
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminPhone, setNewAdminPhone] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'superAdmin' | 'dataEntryAdmin'>('dataEntryAdmin');
  const [adminManageError, setAdminManageError] = useState('');
  const [adminManageSuccess, setAdminManageSuccess] = useState('');

  // Recharge States
  const [rechargeEmail, setRechargeEmail] = useState('');
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [rechargeError, setRechargeError] = useState('');
  const [rechargeSuccess, setRechargeSuccess] = useState('');

  // Limit States
  const [limitCategory, setLimitCategory] = useState<'pakistan_bond' | 'thailand_lottery'>('pakistan_bond');
  const [limitNumber, setLimitNumber] = useState('');
  const [limitAmount, setLimitAmount] = useState('');
  const [limitError, setLimitError] = useState('');
  const [limitSuccess, setLimitSuccess] = useState('');

  // Deadline configuration states
  const [deadlineCategory, setDeadlineCategory] = useState<'pakistan_bond' | 'thailand_lottery'>('pakistan_bond');
  const [deadlineTitle, setDeadlineTitle] = useState('بکنگ فائنل کھل گئی ہے');
  const [deadlineDateTime, setDeadlineDateTime] = useState('');
  const [deadlineStatus, setDeadlineStatus] = useState<'open' | 'closed'>('open');
  const [deadlineError, setDeadlineError] = useState('');
  const [deadlineSuccess, setDeadlineSuccess] = useState('');

  const [nextPrizeBondValue, setNextPrizeBondValue] = useState('');
  const [nextDrawCity, setNextDrawCity] = useState('');
  const [nextDrawNumber, setNextDrawNumber] = useState('');
  const [nextDrawDate, setNextDrawDate] = useState('');

  // Pre-populate deadline inputs when category or deadlines change
  useEffect(() => {
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
  }, [deadlineCategory, deadlines]);

  // Demand management state
  const [demandError, setDemandError] = useState('');
  const [demandSuccess, setDemandSuccess] = useState('');

  // Master Bookings states
  const [bookingSearchQuery, setBookingSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'pakistan_bond' | 'thailand_lottery'>('all');
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
      // 1. Register/Sync in Firebase Authentication first so they can log in
      const uid = await registerInAuthOnly(emailClean, newAdminPassword);

      if (!uid) {
        throw new Error('ایڈمن لاگ ان بنانے میں ناکامی (Failed to create auth user)');
      }

      // 2. Create user document in Firestore users collection (profile data only, no password!)
      const newAdminDoc = {
        uid,
        email: emailClean,
        name: newAdminName.trim(),
        phone: newAdminPhone.trim(),
        city: 'Enterprise HQ',
        balance: 0,
        isAdmin: true,
        role: newAdminRole,
        active: true,
        lastLogin: null
      };

      // [UID-Migration] Save the admin profile document in Firestore under users/{uid}
      await setDoc(doc(db, 'users', uid), newAdminDoc);

      setAdminManageSuccess(`کامیاب: نیا ایڈمن ${newAdminName} کامیابی سے بنا دیا گیا ہے اور لاگ ان کے لیے تیار ہے۔`);
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
      // [UID-Migration] Delete the admin record strictly using their secure UID
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

  const handleChangeAdminRole = async (email: string, roleToSet: 'superAdmin' | 'dataEntryAdmin') => {
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
        throw new Error('ایڈمن کا UID نہیں ملا۔ (Admin UID not found.)');
      }
      await setDoc(doc(db, 'users', cached.uid), {
        role: roleToSet
      }, { merge: true });
      setAdminManageSuccess(`ایڈمن رول کامیابی سے تبدیل کر کے ${roleToSet === 'superAdmin' ? 'Super Admin' : 'Data Entry Admin'} کر دیا گیا ہے۔`);
    } catch (err: any) {
      console.error("Change admin role error:", err);
      setAdminManageError(err?.message || 'ایڈمن کا رول تبدیل کرنے میں خرابی پیش آئی۔');
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

  const handleApprove = async (id: string, num: string) => {
    setDemandError('');
    setDemandSuccess('');
    const res = await onApproveDemand(id);
    if (res.success) {
      setDemandSuccess(`کامیاب: نمبر ${num} کے لئے ڈیمانڈ کامیابی سے منظور کر کے بکنگ شیٹ میں شامل کر دی گئی ہے۔`);
    } else {
      setDemandError(res.error || 'ڈیمانڈ منظور کرنے میں غلطی پیش آئی۔');
    }
  };

  const handleReject = async (id: string, num: string) => {
    setDemandError('');
    setDemandSuccess('');
    const res = await onRejectDemand(id);
    if (res.success) {
      setDemandSuccess(`کامیاب: نمبر ${num} کے لئے بھیجی گئی ڈیمانڈ کو مسترد کر دیا گیا ہے۔`);
    } else {
      setDemandError(res.error || 'ڈیمانڈ مسترد کرنے میں غلطی پیش آئی۔');
    }
  };

  const handleCancelBookingClick = async (bookingId: string, number: string) => {
    setCancelSuccess('');
    setCancelError('');
    const res = await onCancelBookingByAdmin(bookingId);
    if (res.success) {
      setCancelSuccess(`کامیاب: نمبر (${number}) کی بکنگ کامیابی سے منسوخ کر دی گئی ہے اور رقم کسٹمر کے والٹ میں واپس جمع ہو گئی ہے!`);
    } else {
      setCancelError(res.error || 'بکنگ منسوخ کرنے میں کوئی خامی پیش آئی۔');
    }
  };

  const handleRechargeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setRechargeError('');
    setRechargeSuccess('');

    if (!rechargeEmail || !rechargeAmount) {
      setRechargeError('براہ کرم کسٹمر ایمیل اور رقم دونوں لکھیں۔');
      return;
    }

    const amountNum = parseInt(rechargeAmount, 10);
    if (isNaN(amountNum) || amountNum <= 0) {
      setRechargeError('براہ کرم درست رقم درج کریں۔ (نمبر صفر سے زیادہ ہونا چاہیے)');
      return;
    }

    const ok = await onRecharge(rechargeEmail, amountNum);
    if (ok) {
      const updatedUser = users.find(u => (u.email || '').toLowerCase() === (rechargeEmail || '').toLowerCase());
      setRechargeSuccess(` Rs. ${amountNum.toLocaleString()} والٹ میں کامیابی سے جمع کر دیئے گئے۔ کسٹمر کا نیا والٹ بیلنس: Rs. ${(updatedUser?.balance ?? 0).toLocaleString()}`);
      setRechargeAmount('');
    } else {
      setRechargeError('اس ایمیل کا کوئی کسٹمر نہیں ملا۔ براہ کرم درست ایمیل لکھیں۔');
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

    onSetDeadline(
      deadlineCategory,
      deadlineDateTime,
      deadlineTitle || 'بکنگ فائنل کھل گئی ہے',
      deadlineStatus,
      nextPrizeBondValue,
      nextDrawCity,
      nextDrawNumber,
      nextDrawDate
    );
    setDeadlineSuccess(`کامیاب: ${deadlineCategory === 'pakistan_bond' ? 'پاکستان بانڈ' : 'تھائی لینڈ لاٹری'} کی سیٹنگز کامیابی سے محفوظ ہو گئی ہیں!`);
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
        <>
          {/* Incoming Demands Control Panel Module */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
        <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2">
          <span>موصولہ ڈیمانڈز کا پینل (Incoming Demands Approval)</span>
          <Sparkles className="w-5 h-5 text-amber-500" />
        </h4>

        {demandError && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right">
            ⚠️ {demandError}
          </div>
        )}
        {demandSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right">
            ✓ {demandSuccess}
          </div>
        )}

        {demands.length === 0 ? (
          <p className="text-slate-400 text-xs text-center py-6">کوئی ڈیمانڈ موصول نہیں ہوئی۔</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="py-2.5 px-3 font-semibold text-slate-600 text-left">اقدام (Action)</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-600">حیثیت</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-600">میزان رقم</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-600">فرسٹ/سیکنڈ</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-600">نمبر (No)</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-600">کیٹیگری</th>
                  <th className="py-2.5 px-3 font-semibold text-slate-600 text-right">کسٹمر تفصیل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {demands.map((d) => {
                  const customer = users.find(u => (u.email || '').toLowerCase() === (d.userEmail || '').toLowerCase());
                  return (
                     <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                       {/* Action Buttons */}
                       <td className="py-3 px-3 text-left">
                         {d.status === 'pending' ? (
                           <div className="flex gap-2">
                             <button
                               onClick={() => handleReject(d.id, d.number)}
                               className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 border border-red-200 cursor-pointer text-[10px]"
                             >
                               <X className="w-3 h-3" />
                               <span>مسترد</span>
                             </button>
                             <button
                               onClick={() => handleApprove(d.id, d.number)}
                               className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 border border-emerald-200 cursor-pointer text-[10px]"
                             >
                               <Check className="w-3 h-3" />
                               <span>منظور</span>
                             </button>
                           </div>
                         ) : (
                           <span className="text-[10px] text-slate-400 font-sans italic">حل شدہ (Processed)</span>
                         )}
                       </td>

                       {/* Status Indicator */}
                       <td className="py-3 px-3">
                         {d.status === 'pending' && <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">زیرِ غور ⏳</span>}
                         {d.status === 'approved' && <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">منظور شدہ ✓</span>}
                         {d.status === 'rejected' && <span className="text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full border border-red-200">مسترد ✗</span>}
                       </td>

                       {/* Total Amount */}
                       <td className="py-3 px-3 font-mono font-semibold text-slate-700">
                         Rs. {((d.firstAmount ?? 0) + (d.secondAmount ?? 0)).toLocaleString()}
                       </td>

                       {/* Breakdown First/Second */}
                       <td className="py-3 px-3 font-mono text-slate-550 text-xs">
                         F: {d.firstAmount} / S: {d.secondAmount}
                       </td>

                       {/* Target Number */}
                       <td className="py-3 px-3 font-mono font-bold text-red-600 text-sm">
                         {d.number}
                       </td>

                       {/* Category Type */}
                       <td className="py-3 px-3 text-slate-600 text-xs font-semibold">
                         {d.category === 'pakistan_bond' ? 'پاکستان بانڈ' : 'تھائی لاٹری'}
                       </td>

                       {/* Customer Details info */}
                       <td className="py-3 px-3 text-right">
                         <span className="font-semibold block text-slate-800">{customer?.name || 'نامعلوم'}</span>
                         <span className="text-[10px] text-slate-400 font-mono block">{d.userEmail}</span>
                       </td>
                     </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Master Booking Control Panel Module */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === 'all' ? 'bg-slate-900 text-amber-400 font-bold' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              تمام بکنگز ({bookings.length})
            </button>
            <button
              onClick={() => setCategoryFilter('pakistan_bond')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === 'pakistan_bond' ? 'bg-slate-900 text-amber-400 font-bold' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              پاکستان بانڈ ({bookings.filter(b => b.category === 'pakistan_bond').length})
            </button>
            <button
              onClick={() => setCategoryFilter('thailand_lottery')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === 'thailand_lottery' ? 'bg-slate-900 text-amber-400 font-bold' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              تھائی لینڈ لاٹری ({bookings.filter(b => b.category === 'thailand_lottery').length})
            </button>
          </div>

          <h4 className="text-base font-bold text-slate-800 flex items-center justify-end gap-2">
            <span>تمام کسٹمرز کی بکنگز کا پینل (Master Booking Control)</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </h4>
        </div>

        {/* Filter and Search Box */}
        <div className="grid grid-cols-1 gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="کسٹمر کی ای میل یا بکنگ نمبر سے تلاش کریں..."
              value={bookingSearchQuery}
              onChange={(e) => setBookingSearchQuery(e.target.value)}
              className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-4 top-3.5" />
          </div>
        </div>

        {cancelError && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right">
            ⚠️ {cancelError}
          </div>
        )}
        {cancelSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right font-sans">
            ✓ {cancelSuccess}
          </div>
        )}

        {(() => {
          const filteredBookings = bookings.filter((b) => {
            const matchesCategory = categoryFilter === 'all' || b.category === categoryFilter;
            const matchesSearch =
              !bookingSearchQuery ||

              (b.number || '').includes(bookingSearchQuery) ||
              b.userEmail.toLowerCase().includes(bookingSearchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
          }).sort((a, b) => safeGetTime(b.timestamp) - safeGetTime(a.timestamp));

          if (filteredBookings.length === 0) {
            return <p className="text-slate-400 text-xs text-center py-6 font-sans">کوئی بکنگ ریکارڈ نہیں ملا۔</p>;
          }

          return (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="py-2.5 px-3 font-semibold text-slate-600 text-left">منسوخ کریں (Cancel)</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600 font-mono text-[10px]">ٹائم اسٹیمپ</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600">کل لاگت</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600">سیکنڈ</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600">فرسٹ</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600">بک شدہ نمبر</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600">کیٹیگری</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600 text-right">کسٹمر تفصیل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map((b) => {
                    const customer = users.find(u => (u.email || '').toLowerCase() === (b.userEmail || '').toLowerCase());
                    return (
                      <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                        {/* Cancel Action Button */}
                        <td className="py-3 px-3 text-left">
                          <button
                            onClick={() => handleCancelBookingClick(b.id, b.number)}
                            className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 border border-red-200 cursor-pointer text-[10px]"
                          >
                            <Trash className="w-3 h-3" />
                            <span>منسوخ کریں</span>
                          </button>
                        </td>

                        {/* Timestamp */}
                        <td className="py-3 px-3 text-slate-400 font-mono text-[10px]">
                          {safeFormatDate(b.timestamp, 'en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>

                        {/* Total Amount */}
                        <td className="py-3 px-3 font-mono font-semibold text-slate-700">
                          Rs. {((b.firstAmount ?? 0) + (b.secondAmount ?? 0)).toLocaleString()}
                        </td>

                        {/* Breakdown Second */}
                        <td className="py-3 px-3 font-mono text-slate-550 text-xs">
                          Rs. {(b.secondAmount ?? 0).toLocaleString()}
                        </td>

                        {/* Breakdown First */}
                        <td className="py-3 px-3 font-mono text-slate-550 text-xs">
                          Rs. {(b.firstAmount ?? 0).toLocaleString()}
                        </td>

                        {/* Target Number */}
                        <td className="py-3 px-3 font-mono font-bold text-red-600 text-sm">
                          {b.number}
                        </td>

                        {/* Category Type */}
                        <td className="py-3 px-3 text-slate-600 text-xs font-semibold">
                          {b.category === 'pakistan_bond' ? 'پاکستان بانڈ' : 'تھائی لاٹری'}
                        </td>

                        {/* Customer Details info */}
                        <td className="py-3 px-3 text-right">
                          <span className="font-semibold block text-slate-800">{customer?.name || 'نامعلوم'}</span>
                          <span className="text-[10px] text-slate-400 font-mono block">{b.userEmail}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })()}
      </div>
        </>
      )}

      {activeAdminTab === 'users_finance' && isSuper && (
        <div className="space-y-8">

        {/* Module 1: Wallet Recharge (کسٹمر والٹ ریچارج کریں) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md">
          <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 mb-5 flex items-center justify-end gap-2">
            <span>کسٹمر والٹ ریچارج پورٹل</span>
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
          </h4>

          {rechargeError && (
            <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs leading-relaxed">
              ⚠️ {rechargeError}
            </div>
          )}
          {rechargeSuccess && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs leading-relaxed">
              ✓ {rechargeSuccess}
            </div>
          )}

          <form onSubmit={handleRechargeSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5">
                کسٹمر رجسٹرڈ ایمیل آئی دی (Customer Email) *
              </label>
              <input
                type="email"
                placeholder="customer@example.com"
                value={rechargeEmail}
                onChange={(e) => setRechargeEmail(e.target.value)}
                className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                لاگ ان کسٹمر اپنی بکنگ شیٹ کے اوپر اور پروفائل پر ایمیل دیکھ سکتا ہے۔
              </p>
            </div>

            <div>
              <label className="block text-slate-600 text-xs font-semibold mb-1.5">
                ریچارج رقم درج کریں (Amount in Rs.) *
              </label>
              <input
                type="number"
                placeholder="1000"
                value={rechargeAmount}
                onChange={(e) => setRechargeAmount(e.target.value)}
                className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>والٹ رقم جمع کریں (Recharge)</span>
            </button>
          </form>

          {/* Quick list of registered customers to quickly recharge */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h5 className="text-[11px] text-slate-500 font-bold mb-3">رجسٹرڈ کسٹمرز کی لسٹ اور موجودہ بیلنس</h5>
            <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
              {users.map((u) => (
                <div 
                  key={u.email || u.uid} 
                  onClick={() => setRechargeEmail(u.email || '')}
                  className="flex justify-between items-center bg-slate-50 hover:bg-amber-50/50 p-2.5 rounded-xl text-xs transition-all cursor-pointer border border-slate-100"
                >
                  <span className="font-mono text-slate-600 font-semibold">Rs. {(u.balance ?? 0).toLocaleString()}</span>
                  <div className="text-right">
                    <span className="font-semibold block text-slate-800">{u.name} {u.isAdmin && '(ایڈمن)'}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{u.email || 'ای میل کے بغیر'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}

      {activeAdminTab === 'limits_deadlines' && isSuper && (
        <div className="space-y-8">
          {/* Module 2: Number Booking Limit Configuration (نمبر لمٹ مقرر کریں) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 mb-5 flex items-center justify-end gap-2">
              <span>بکنگ نمبر زیادہ سے زیادہ لمٹ</span>
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
            </h4>

            {limitError && (
              <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs leading-relaxed">
                ⚠️ {limitError}
              </div>
            )}
            {limitSuccess && (
              <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs leading-relaxed">
                ✓ {limitSuccess}
              </div>
            )}

            <form onSubmit={handleLimitSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1.5">
                  کیٹیگری منتخب کریں (Choose Draw Type) *
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setLimitCategory('pakistan_bond')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      limitCategory === 'pakistan_bond'
                        ? 'bg-slate-900 text-amber-400 border-slate-900 font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    پاکستان بانڈ
                  </button>
                  <button
                    type="button"
                    onClick={() => setLimitCategory('thailand_lottery')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      limitCategory === 'thailand_lottery'
                        ? 'bg-slate-900 text-amber-400 border-slate-900 font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    تھائی لینڈ لاٹری
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                    زیادہ سے زیادہ رقم لمٹ *
                  </label>
                  <input
                    type="number"
                    placeholder="مثال: 50"
                    value={limitAmount}
                    onChange={(e) => setLimitAmount(e.target.value)}
                    className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>
                
                <div>
                  <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                    مخصوص نمبر لکھیں *
                  </label>
                  <input
                    type="text"
                    placeholder="نمبر لکھیں"
                    value={limitNumber}
                    onChange={(e) => setLimitNumber(e.target.value)}
                    className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>خصوصی بکنگ لمٹ لگائیں</span>
              </button>
            </form>
          </div>
        </div>

        {/* Module 3: Booking Deadline Settings (بکنگ آخری وقت اور تاریخ) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md md:col-span-2 space-y-4">
          <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2">
            <span>ڈرا کی بکنگ کا آخری وقت اور تاریخ (Booking Deadlines)</span>
            <Clock className="w-5 h-5 text-red-500" />
          </h4>

          {deadlineError && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs">
              ⚠️ {deadlineError}
            </div>
          )}
          {deadlineSuccess && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs">
              ✓ {deadlineSuccess}
            </div>
          )}

          <form onSubmit={handleDeadlineSubmit} className="space-y-4">
            {/* Booking Status Selector (Open / Closed manual switch) */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <label className="block text-slate-700 text-xs font-bold text-right">
                بکنگ اسٹیٹس (دستی کنٹرول) *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDeadlineStatus('open');
                    setDeadlineTitle('بکنگ فائنل کھل گئی ہے');
                  }}
                  className={`py-3 px-4 rounded-2xl border text-center transition-all text-xs font-bold flex items-center justify-center gap-2 ${
                    deadlineStatus === 'open'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/10'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${deadlineStatus === 'open' ? 'bg-white animate-ping' : 'bg-slate-400'}`}></span>
                  <span>بکنگ کھول گئے (Booking Open)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeadlineStatus('closed');
                    setDeadlineTitle('بکنگ فائنل بند ہے');
                  }}
                  className={`py-3 px-4 rounded-2xl border text-center transition-all text-xs font-bold flex items-center justify-center gap-2 ${
                    deadlineStatus === 'closed'
                      ? 'bg-red-600 text-white border-red-600 shadow-sm shadow-red-600/10'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  <span>بکنگ بند ہے (Booking Closed)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Field 1: Category Selection */}
              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                  کیٹیگری منتخب کریں *
                </label>
                <select
                  value={deadlineCategory}
                  onChange={(e) => {
                    const cat = e.target.value as 'pakistan_bond' | 'thailand_lottery';
                    setDeadlineCategory(cat);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                >
                  <option value="pakistan_bond">پاکستان بانڈ</option>
                  <option value="thailand_lottery">تھائی لینڈ لاٹری</option>
                </select>
              </div>

              {/* Field 2: Status Text / Title */}
              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                  اسٹیٹس پیغام (Urdu Status Message) *
                </label>
                <input
                  type="text"
                  placeholder="مثال: بکنگ فائنل کھل گئی ہے"
                  value={deadlineTitle}
                  onChange={(e) => setDeadlineTitle(e.target.value)}
                  className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                  required
                />
              </div>

              {/* Field 3: Date & Time Picker */}
              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                  آخری تاریخ اور وقت (Deadline Date & Time) *
                </label>
                <input
                  type="datetime-local"
                  value={deadlineDateTime}
                  onChange={(e) => setDeadlineDateTime(e.target.value)}
                  className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                  required
                />
              </div>

              {/* Next Draw Fields (Conditional on category) */}
              {deadlineCategory === 'pakistan_bond' && (
                <>
                  <div>
                    <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                      اگلی انعامی بانڈ مالیت (Next Prize Bond Value)
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: 750"
                      value={nextPrizeBondValue}
                      onChange={(e) => setNextPrizeBondValue(e.target.value)}
                      className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                      اگلا ڈرا شہر (Next Draw City)
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: لاہور"
                      value={nextDrawCity}
                      onChange={(e) => setNextDrawCity(e.target.value)}
                      className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                      اگلا ڈرا نمبر (Next Draw Number)
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: 95"
                      value={nextDrawNumber}
                      onChange={(e) => setNextDrawNumber(e.target.value)}
                      className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-slate-600 text-xs font-semibold mb-1.5 text-right">
                  اگلی ڈرا تاریخ (Next Draw Date)
                </label>
                <input
                  type="text"
                  placeholder="مثال: 15-08-2026"
                  value={nextDrawDate}
                  onChange={(e) => setNextDrawDate(e.target.value)}
                  className="w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                />
              </div>

            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>ڈیڈلائن اور اسٹیٹس محفوظ کریں (Save Draw Settings)</span>
            </button>
          </form>

          {/* Display active deadlines */}
          <div className="pt-4 border-t border-slate-100">
            <h5 className="text-xs font-bold text-slate-700 mb-3">موجودہ فعال بکنگ ڈیڈلائنز کی حیثیت</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deadlines.map((d) => {
                const isOver = d.status === 'closed' || safeGetTime(d.deadlineIso) <= Date.now();
                return (
                  <div key={d.category} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isOver ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        }`}>
                          {isOver ? 'بند ہے (Closed)' : 'اوپن ہے (Open)'}
                        </span>
                        <span className="font-bold text-xs text-slate-800">
                          {d.category === 'pakistan_bond' ? 'پاکستان بانڈ' : 'تھائی لینڈ لاٹری'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        مینوئل کنٹرول: <strong className={d.status === 'closed' ? 'text-red-600' : 'text-emerald-600'}>{d.status === 'closed' ? 'بند (Closed)' : 'اوپن (Open)'}</strong>
                      </p>
                      <p className="text-[11px] text-slate-600">
                        عنوان: <strong className="text-slate-800">{d.titleUrdu}</strong>
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        تاریخ: {safeFormatDate(d.deadlineIso, 'en-US')}
                      </p>
                      {d.category === 'pakistan_bond' ? (
                        <div className="mt-1 pt-1 border-t border-slate-200/50 space-y-0.5 text-[10px] text-slate-500">
                          {d.nextPrizeBondValue && (
                            <div>اگلی مالیت: <strong className="text-slate-700">{d.nextPrizeBondValue}</strong></div>
                          )}
                          {d.nextDrawCity && (
                            <div>اگلا شہر: <strong className="text-slate-700">{d.nextDrawCity}</strong></div>
                          )}
                          {d.nextDrawNumber && (
                            <div>اگلا نمبر: <strong className="text-slate-700">{d.nextDrawNumber}</strong></div>
                          )}
                          {d.nextDrawDate && (
                            <div>اگلی ڈرا تاریخ: <strong className="text-slate-700">{d.nextDrawDate}</strong></div>
                          )}
                        </div>
                      ) : (
                        d.nextDrawDate && (
                          <div className="mt-1 pt-1 border-t border-slate-200/50 text-[10px] text-slate-500">
                            اگلی ڈرا تاریخ: <strong className="text-slate-700">{d.nextDrawDate}</strong>
                          </div>
                        )
                      )}
                    </div>

                    {/* Quick action buttons to instantly toggle booking status */}
                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/60">
                      <button
                        type="button"
                        onClick={() => {
                          const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                          const isoStr = futureDate.toISOString().slice(0, 16);
                          onSetDeadline(
                            d.category,
                            isoStr,
                            'بکنگ فائنل کھل گئی ہے',
                            'open',
                            d.nextPrizeBondValue,
                            d.nextDrawCity,
                            d.nextDrawNumber,
                            d.nextDrawDate
                          );
                        }}
                        className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 border ${
                          !isOver 
                            ? 'bg-emerald-600 text-white border-emerald-600' 
                            : 'bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                        <span>بکنگ کھولیں (Open)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
                          const isoStr = pastDate.toISOString().slice(0, 16);
                          onSetDeadline(
                            d.category,
                            isoStr,
                            'بکنگ فائنل بند ہے',
                            'closed',
                            d.nextPrizeBondValue,
                            d.nextDrawCity,
                            d.nextDrawNumber,
                            d.nextDrawDate
                          );
                        }}
                        className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 border ${
                          isOver 
                            ? 'bg-red-600 text-white border-red-600' 
                            : 'bg-white text-red-600 border-red-200 hover:bg-red-50'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>بکنگ بند کریں (Close)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )}

      {activeAdminTab === 'users_finance' && isSuper && (
        <div className="space-y-8">
          {/* Module 4: WhatsApp Support Helpline Configuration */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md md:col-span-2 space-y-4">
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

        {/* Module 5: Admin Password Configuration (ایڈمن پاس ورڈ تبدیل کریں) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md md:col-span-2 space-y-4">
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

        {/* Module 6: User Password Management (صارفین کے پاس ورڈ کا انتظام) */}
        <div id="module-user-password-management" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md md:col-span-2 space-y-4">
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
    )}

      {activeAdminTab === 'results' && (
        <>
          {/* Module 7: Result Management (قرعہ اندازی کے نتائج کا انتظام) */}
        <div id="module-result-management" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md md:col-span-2 space-y-6 text-right">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-slate-100">
            {/* Add Result Button */}
            {!resultFormOpen ? (
              <button
                type="button"
                onClick={() => {
                  setResultFormMode('add');
                  resetResultForm();
                  setResultFormOpen(true);
                }}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-amber-500/10 transition-all text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>نیا نتیجہ شامل کریں (Add New Result)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setResultFormOpen(false)}
                className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all text-xs"
              >
                <X className="w-4 h-4" />
                <span>فارم بند کریں (Close Form)</span>
              </button>
            )}

            <div className="text-right">
              <h4 className="text-base font-bold text-slate-800 flex items-center justify-end gap-2">
                <span>قرعہ اندازی کے نتائج کا انتظام (Result Management)</span>
                <History className="w-5 h-5 text-amber-500" />
              </h4>
              <p className="text-xs text-slate-400 mt-1">پاکستان پرائز بانڈ اور تھائی لینڈ لاٹری کے نتائج شامل کریں، تبدیل کریں یا حذف کریں</p>
            </div>
          </div>

          {resultError && (
            <div id="admin-result-error" className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right font-sans">
              ⚠️ {resultError}
            </div>
          )}
          {resultSuccess && (
            <div id="admin-result-success" className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right font-sans">
              ✓ {resultSuccess}
            </div>
          )}

          {/* Form Modal / Collapsible Section */}
          {resultFormOpen && (
            <div id="admin-result-form" className="bg-slate-50 p-5 sm:p-6 rounded-3xl border border-slate-150 space-y-4 text-right">
              <h5 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2">
                {resultFormMode === 'add' ? 'نیا نتیجہ شامل کریں (Add New Result)' : 'نتیجہ ایڈٹ کریں (Edit Result)'}
              </h5>

              <form onSubmit={handleSaveResult} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-sans">
                  
                  {/* Category Selection */}
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1 text-right">کیٹیگری (Category) *</label>
                    <select
                      id="result-form-category"
                      value={resCategory}
                      onChange={(e) => {
                        const cat = e.target.value as 'pakistan_bond' | 'thailand_lottery';
                        setResCategory(cat);
                        if (cat === 'thailand_lottery') {
                          setResCity('بنکاک');
                        } else {
                          setResCity('');
                        }
                      }}
                      disabled={resultFormMode === 'edit'}
                      className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                    >
                      <option value="pakistan_bond">پاکستان پرائز بانڈ</option>
                      <option value="thailand_lottery">تھائی لینڈ لاٹری</option>
                    </select>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1 text-right">ڈرا کی تاریخ (Draw Date) *</label>
                    <input
                      id="result-form-date"
                      type="date"
                      value={resDate}
                      onChange={(e) => setResDate(e.target.value)}
                      required
                      className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1 text-right">شہر (City) *</label>
                    <input
                      id="result-form-city"
                      type="text"
                      placeholder={resCategory === 'pakistan_bond' ? "مثلاً ملتان، کراچی" : "مثلاً بنکاک"}
                      value={resCity}
                      onChange={(e) => setResCity(e.target.value)}
                      required
                      className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                    />
                  </div>

                  {/* Conditional: Pakistan Bond Fields */}
                  {resCategory === 'pakistan_bond' && (
                    <>
                      {/* Bond Value */}
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1 text-right">بانڈ کی مالیت (Bond Value) *</label>
                        <select
                          id="result-form-bond-value"
                          value={resBondValue}
                          onChange={(e) => setResBondValue(e.target.value)}
                          className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                        >
                          <option value="Rs. 100">Rs. 100</option>
                          <option value="Rs. 200">Rs. 200</option>
                          <option value="Rs. 750">Rs. 750</option>
                          <option value="Rs. 1,500">Rs. 1,500</option>
                          <option value="Rs. 7,500">Rs. 7,500</option>
                          <option value="Rs. 15,000">Rs. 15,000</option>
                          <option value="Rs. 25,000 Premium">Rs. 25,000 Premium</option>
                          <option value="Rs. 40,000 Premium">Rs. 40,000 Premium</option>
                        </select>
                      </div>

                      {/* Draw Number Only */}
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1 text-right">ڈرا نمبر (Draw Number Only) *</label>
                        <input
                          id="result-form-draw-no-only"
                          type="text"
                          placeholder="مثلاً 106"
                          value={resDrawNoOnly}
                          onChange={(e) => setResDrawNoOnly(e.target.value)}
                          required
                          className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                        />
                      </div>
                    </>
                  )}

                  {/* Conditional: Thai Lottery Fields */}
                  {resCategory === 'thailand_lottery' && (
                    <>
                      {/* Draw No Full */}
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1 text-right">ڈرا نمبر اور نام (Draw Title) *</label>
                        <input
                          id="result-form-draw-no-thai"
                          type="text"
                          placeholder="مثلاً Thai Draw #384"
                          value={resDrawNo}
                          onChange={(e) => setResDrawNo(e.target.value)}
                          required
                          className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                        />
                      </div>
                    </>
                  )}

                  {/* First Prize */}
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1 text-right">فرسٹ پرائز نمبر (First Prize Number) *</label>
                    <input
                      id="result-form-first-prize"
                      type="text"
                      maxLength={6}
                      placeholder="6 ہندسوں کا لکی نمبر"
                      value={resFirstPrize}
                      onChange={(e) => setResFirstPrize(e.target.value.replace(/\D/g, ''))}
                      required
                      className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                    />
                  </div>

                  {/* Conditional: Thai Lottery Digits (Auto-computed but editable) */}
                  {resCategory === 'thailand_lottery' && (
                    <>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1 text-right">آخری 2 ہندسے (Last 2 Digits)</label>
                        <input
                          id="result-form-last2"
                          type="text"
                          maxLength={2}
                          value={resLast2Digits}
                          onChange={(e) => setResLast2Digits(e.target.value.replace(/\D/g, ''))}
                          className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1 text-right">فرنٹ 3 ہندسے (Front 3 Digits)</label>
                        <input
                          id="result-form-front3"
                          type="text"
                          maxLength={3}
                          value={resFront3Digits}
                          onChange={(e) => setResFront3Digits(e.target.value.replace(/\D/g, ''))}
                          className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1 text-right">بیک 3 ہندسے (Back 3 Digits)</label>
                        <input
                          id="result-form-back3"
                          type="text"
                          maxLength={3}
                          value={resBack3Digits}
                          onChange={(e) => setResBack3Digits(e.target.value.replace(/\D/g, ''))}
                          className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Second Prizes textarea */}
                <div>
                  <label className="block text-xs text-slate-600 font-semibold mb-1 text-right">سیکنڈ پرائز نمبرز - کوما سے الگ کریں (Second Prize Numbers - Comma separated)</label>
                  <textarea
                    id="result-form-seconds"
                    rows={2}
                    placeholder="مثال کے طور پر: 070148, 194865, 222052"
                    value={resSecondPrizesStr}
                    onChange={(e) => setResSecondPrizesStr(e.target.value)}
                    className="w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono text-xs"
                  />
                </div>

                {/* Display constructed Pakistan Draw Name preview */}
                {resCategory === 'pakistan_bond' && resDrawNoOnly && (
                  <div className="bg-amber-50 border border-amber-200/50 p-2.5 rounded-xl text-xs text-amber-800 font-semibold text-right">
                    <span>ڈرا کا پورا نام (Full Draw Name Preview): </span>
                    <span className="font-mono">{resDrawNo}</span>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    id="result-form-submit"
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition-all shadow-md cursor-pointer text-center"
                  >
                    <span>نتیجہ محفوظ کریں (Save Result)</span>
                  </button>
                  <button
                    id="result-form-cancel"
                    type="button"
                    onClick={() => {
                      setResultFormOpen(false);
                      resetResultForm();
                    }}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-6 rounded-2xl text-xs sm:text-sm transition-all cursor-pointer text-center"
                  >
                    <span>منسوخ کریں (Cancel)</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Results List View & Filtering */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3 justify-between items-center bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs font-sans">
              
              {/* Search Result Bar */}
              <div className="relative w-full md:w-64">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-slate-400" />
                </span>
                <input
                  id="result-search-bar"
                  type="text"
                  placeholder="سرچ کریں (نمبر، شہر، ڈرا)..."
                  value={resultSearchQuery}
                  onChange={(e) => setResultSearchQuery(e.target.value)}
                  className="w-full bg-white text-right text-xs text-slate-800 pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
                />
              </div>

              {/* View Category Toggles */}
              <div className="flex gap-2 w-full md:w-auto">
                <button
                  id="btn-filter-pakbond"
                  type="button"
                  onClick={() => {
                    setResultViewCategory('pakistan_bond');
                    if (!resultFormOpen) setResCategory('pakistan_bond');
                  }}
                  className={`flex-1 md:flex-initial py-1.5 px-3 rounded-lg border font-semibold cursor-pointer text-center transition-all ${resultViewCategory === 'pakistan_bond' ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  پاکستان بانڈز (Pakistan Bonds)
                </button>
                <button
                  id="btn-filter-thai"
                  type="button"
                  onClick={() => {
                    setResultViewCategory('thailand_lottery');
                    if (!resultFormOpen) setResCategory('thailand_lottery');
                  }}
                  className={`flex-1 md:flex-initial py-1.5 px-3 rounded-lg border font-semibold cursor-pointer text-center transition-all ${resultViewCategory === 'thailand_lottery' ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  تھائی لاٹری (Thai Lottery)
                </button>
              </div>
            </div>

            {/* Rendered List */}
            <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm max-h-[380px] overflow-y-auto">
              <table className="w-full text-right border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-100 sticky top-0 z-10">
                    <th className="py-2.5 px-3 text-left">اقدام (Actions)</th>
                    <th className="py-2.5 px-3">تاریخ (Date)</th>
                    <th className="py-2.5 px-3">شہر / ملک</th>
                    <th className="py-2.5 px-3">سیکنڈ پرائزز</th>
                    <th className="py-2.5 px-3">فرسٹ پرائز</th>
                    <th className="py-2.5 px-3">ڈرا نمبر / تفصیل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {(() => {
                    const activeResults = resultViewCategory === 'pakistan_bond' ? pakistanBondResults : thaiLotteryResults;
                    const queryClean = resultSearchQuery.trim().toLowerCase();
                    const filtered = activeResults.filter(r => {
                      if (!queryClean) return true;
                      const matchesDrawNo = r.drawNo && r.drawNo.toLowerCase().includes(queryClean);
                      const matchesCity = r.city && r.city.toLowerCase().includes(queryClean);
                      const matchesFirst = r.firstPrize && r.firstPrize.includes(queryClean);
                      const matchesDate = r.date && r.date.includes(queryClean);
                      const matchesSeconds = r.secondPrizes && r.secondPrizes.some(s => s.includes(queryClean));
                      const matchesBondVal = r.category === 'pakistan_bond' && (r as PakistanBondResult).bondValue && (r as PakistanBondResult).bondValue.toLowerCase().includes(queryClean);
                      return matchesDrawNo || matchesCity || matchesFirst || matchesDate || matchesSeconds || matchesBondVal;
                    });

                    if (filtered.length === 0) {
                      return (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400">کوئی نتیجہ نہیں ملا۔</td>
                        </tr>
                      );
                    }

                    return filtered.map((draw) => (
                      <tr key={draw.id} className="hover:bg-slate-50/50 transition-colors">
                        {/* Actions */}
                        <td className="py-3 px-3 text-left flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEditClick(draw)}
                            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all"
                          >
                            ایڈٹ (Edit)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(draw.id, draw.category)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all"
                          >
                            حذف (Delete)
                          </button>
                        </td>
                        
                        {/* Date */}
                        <td className="py-3 px-3 font-mono text-slate-500 text-xs">{draw.date}</td>
                        
                        {/* City */}
                        <td className="py-3 px-3 text-slate-700 font-semibold">{draw.city}</td>
                        
                        {/* Seconds */}
                        <td className="py-3 px-3 text-slate-500 font-mono text-xs max-w-[150px] truncate" title={draw.secondPrizes.join(', ')}>
                          {draw.secondPrizes.join(', ')}
                        </td>
                        
                        {/* First */}
                        <td className="py-3 px-3 font-mono font-bold text-amber-600">{draw.firstPrize}</td>
                        
                        {/* Draw No */}
                        <td className="py-3 px-3 font-bold text-slate-800">
                          <div>{draw.drawNo}</div>
                          {draw.category === 'pakistan_bond' && (
                            <span className="text-[10px] text-slate-400">پاکستان بانڈ - {(draw as PakistanBondResult).bondValue}</span>
                          )}
                          {draw.category === 'thailand_lottery' && (
                            <div className="text-[9px] text-slate-400 font-mono flex gap-1 justify-end mt-0.5">
                              <span>L2: {(draw as ThaiLotteryResult).last2Digits}</span> |
                              <span>F3: {(draw as ThaiLotteryResult).front3Digits}</span> |
                              <span>B3: {(draw as ThaiLotteryResult).back3Digits}</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </>
      )}

      {/* Active limits display list */}
      {activeAdminTab === 'limits_deadlines' && isSuper && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md">
          <h4 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 mb-5 text-right">
            فعال بکنگ لمٹس (Active Limits)
          </h4>

          {limits.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-6">کوئی خصوصی لِمٹ لاگو نہیں کی گئی ہے۔ تمام نمبرز لامحدود بک ہو سکتے ہیں۔</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {limits.map((l) => (
                <div 
                  key={l.id} 
                  className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-150 rounded-2xl"
                >
                  <button
                    type="button"
                    onClick={() => onDeleteLimit(l.id)}
                    className="p-1 px-1.5 text-red-500 hover:bg-red-50 rounded-lg hover:text-red-700 transition-all cursor-pointer"
                    title="لمٹ ختم کریں"
                  >
                    <Trash className="w-4 h-4" />
                  </button>

                  <div className="text-right">
                    <span className="font-mono text-sm font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg ml-2">
                      {l.number}
                    </span>
                    <span className="text-xs text-slate-400 font-mono tracking-wider">حد: Rs. {l.maxAmount}</span>
                    <div className="text-[10px] text-slate-500 mt-1 font-sans">
                      {l.category === 'pakistan_bond' ? 'پاکستان بانڈ' : 'تھائی لینڈ لاٹری'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Admin Management Screen */}
      {activeAdminTab === 'admin_management' && isSuper && (
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
                <div className="flex gap-4 items-center">
                  <span className="text-slate-600 text-xs font-semibold font-sans">انتخابِ عہدہ (Admin Role):</span>
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
                </div>

                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-2.5 px-6 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-sans font-bold">نیا ایڈمن رجسٹر کریں (Register Admin)</span>
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

                      const formattedLogin = admin.lastLogin 
                        ? safeFormatDate(admin.lastLogin, 'ur-PK', { timeZone: 'Asia/Karachi' })
                        : 'لاگ ان نہیں ہوا (No Login)';


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
      )}

    </div>
  );
}
