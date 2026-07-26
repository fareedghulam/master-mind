export type DrawCategory = 'pakistan_bond' | 'thailand_lottery' | 'dubai_draw' | 'zee_music_draw';

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
}

export interface Booking {
  id: string;
  userEmail: string;
  category: DrawCategory;
  number: string;
  firstAmount: number;
  secondAmount: number;
  timestamp: string; // ISO string
  drawId?: string;
  bondValue?: string;
  drawNumber?: string;
  drawCity?: string;
  drawDate?: string;
}

export interface NumberLimit {
  id: string;
  category: DrawCategory;
  number: string;
  maxAmount: number;
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
  drawId?: string;
  bondValue?: string;
  drawNumber?: string;
  drawCity?: string;
  drawDate?: string;
}

export interface DrawDeadline {
  id?: string;
  category: DrawCategory;
  titleUrdu: string;
  deadlineIso: string;
  status: 'open' | 'closed' | 'result_announced';
  nextPrizeBondValue?: string;
  nextDrawCity?: string;
  nextDrawNumber?: string;
  nextDrawDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

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
