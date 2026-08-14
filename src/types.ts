export type DrawCategory = 'pakistan_bond' | 'thailand_lottery';

export type AdminRole = 'superAdmin' | 'dataEntryAdmin' | 'admin' | 'customer';

export interface User {
  uid?: string;
  email: string;
  name: string;
  phone: string;
  city: string;
  photoURL?: string;
  balance: number;
  password?: string;
  isAdmin?: boolean;
  role?: string;
  active?: boolean;
  lastLogin?: string;
  profileCompleted?: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  userEmail: string;
  category: DrawCategory;
  number: string;
  firstAmount: number;
  secondAmount: number;
  timestamp: string; // ISO string
  drawId: string;
  bondValue?: string;
  drawNumber?: string;
  drawCity?: string;
  drawDate?: string;
  isArchived?: boolean;
}

export interface NumberLimit {
  id: string;
  category: DrawCategory;
  number: string;
  maxAmount: number;
  drawId: string;
  isArchived?: boolean;
}

export interface Demand {
  id: string;
  userEmail: string;
  category: DrawCategory;
  number: string;
  firstAmount: number;
  secondAmount: number;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
  drawId: string;
  bondValue?: string;
  drawNumber?: string;
  drawCity?: string;
  drawDate?: string;
  isArchived?: boolean;
}

export interface DrawDeadline {
  id?: string;
  drawId?: string;
  category: DrawCategory;
  titleUrdu: string;
  deadlineIso: string;
  status: 'open' | 'closed' | 'result_announced';
  bookingStatusUrdu?: 'بکنگ کھول گئی' | 'بکنگ بند ہے';
  nextPrizeBondValue?: string;
  nextDrawCity?: string;
  nextDrawNumber?: string;
  nextDrawDate?: string;
  createdAt?: string;
  updatedAt?: string;
  isArchived?: boolean;
}

export type Draw = DrawDeadline;

export interface PakistanBondResult {
  id: string;
  category: 'pakistan_bond';
  bondValue: string;
  drawNoOnly: string;
  drawNo: string;
  date: string;
  city: string;
  firstPrize: string;
  secondPrizes: string[];
  drawId?: string;
}

export interface ThaiLotteryResult {
  id: string;
  category: 'thailand_lottery';
  drawNo: string;
  date: string;
  city: string;
  firstPrize: string;
  secondPrizes: string[];
  last2Digits: string;
  front3Digits: string;
  back3Digits: string;
  drawId?: string;
}

export interface Transaction {
  id: string;
  userId?: string;
  userEmail: string;
  userName?: string;
  type: 'recharge' | 'withdrawal' | 'booking_deduction' | 'refund';
  amount: number;
  date: string; // ISO string
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  note?: string;
  paymentMethod?: string;
  accountDetails?: string;
}

export type AllResultType = PakistanBondResult | ThaiLotteryResult;
