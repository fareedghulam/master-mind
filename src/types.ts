export interface User {
  email: string;
  name: string;
  phone: string;
  city: string;
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
  category: 'pakistan_bond' | 'thailand_lottery';
  number: string;
  firstAmount: number;
  secondAmount: number;
  timestamp: string; // ISO string
}

export interface NumberLimit {
  id: string;
  category: 'pakistan_bond' | 'thailand_lottery';
  number: string;
  maxAmount: number;
}

export interface Demand {
  id: string;
  userEmail: string;
  category: 'pakistan_bond' | 'thailand_lottery';
  number: string;
  firstAmount: number;
  secondAmount: number;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface DrawDeadline {
  category: 'pakistan_bond' | 'thailand_lottery';
  titleUrdu: string;
  deadlineIso: string;
  status: 'open' | 'closed';
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

export type AllResultType = PakistanBondResult | ThaiLotteryResult;



