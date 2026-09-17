import { ThaiLotteryResult } from '../types';

export type ThaiDrawDateFilter = 'all' | '1st' | '16th';

export interface MonthOption {
  value: string; // 'all' | '1' .. '12'
  labelUrdu: string;
  labelEng: string;
}

export const THAI_MONTHS_LIST: MonthOption[] = [
  { value: 'all', labelUrdu: 'تمام مہینے (All Months)', labelEng: 'All Months' },
  { value: '1', labelUrdu: 'جنوری (January)', labelEng: 'January' },
  { value: '2', labelUrdu: 'فروری (February)', labelEng: 'February' },
  { value: '3', labelUrdu: 'مارچ (March)', labelEng: 'March' },
  { value: '4', labelUrdu: 'اپریل (April)', labelEng: 'April' },
  { value: '5', labelUrdu: 'مئی (May)', labelEng: 'May' },
  { value: '6', labelUrdu: 'جون (June)', labelEng: 'June' },
  { value: '7', labelUrdu: 'جولائی (July)', labelEng: 'July' },
  { value: '8', labelUrdu: 'اگست (August)', labelEng: 'August' },
  { value: '9', labelUrdu: 'ستمبر (September)', labelEng: 'September' },
  { value: '10', labelUrdu: 'اکتوبر (October)', labelEng: 'October' },
  { value: '11', labelUrdu: 'نومبر (November)', labelEng: 'November' },
  { value: '12', labelUrdu: 'دسمبر (December)', labelEng: 'December' },
];

export interface ParsedThaiDate {
  isValid: boolean;
  year: number;
  month: number; // 1 to 12
  day: number; // 1 to 31
  is1st: boolean;
  is16th: boolean;
  formattedDate: string;
  monthNameEng: string;
  monthNameUrdu: string;
}

const URDU_MONTH_NAMES: Record<number, string> = {
  1: 'جنوری',
  2: 'فروری',
  3: 'مارچ',
  4: 'اپریل',
  5: 'مئی',
  6: 'جون',
  7: 'جولائی',
  8: 'اگست',
  9: 'ستمبر',
  10: 'اکتوبر',
  11: 'نومبر',
  12: 'دسمبر',
};

const ENG_MONTH_NAMES: Record<number, string> = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

/**
 * Robustly parses structured date strings for Thailand Lottery.
 * Recognizes formats:
 * - YYYY-MM-DD
 * - DD-MM-YYYY
 * - YYYY/MM/DD
 * - Standard Date objects / ISO strings
 */
export function parseThaiDrawDate(dateStr?: string): ParsedThaiDate {
  if (!dateStr || typeof dateStr !== 'string') {
    return {
      isValid: false,
      year: 0,
      month: 0,
      day: 0,
      is1st: false,
      is16th: false,
      formattedDate: '',
      monthNameEng: '',
      monthNameUrdu: '',
    };
  }

  const clean = dateStr.trim();

  // 1. Try matching YYYY-MM-DD or YYYY/MM/DD
  const ymd = clean.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if (ymd) {
    const y = parseInt(ymd[1], 10);
    const m = parseInt(ymd[2], 10);
    const d = parseInt(ymd[3], 10);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31 && y >= 1900 && y <= 2100) {
      return {
        isValid: true,
        year: y,
        month: m,
        day: d,
        is1st: d === 1,
        is16th: d === 16,
        formattedDate: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
        monthNameEng: ENG_MONTH_NAMES[m] || '',
        monthNameUrdu: URDU_MONTH_NAMES[m] || '',
      };
    }
  }

  // 2. Try matching DD-MM-YYYY or DD/MM/YYYY
  const dmy = clean.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})/);
  if (dmy) {
    const d = parseInt(dmy[1], 10);
    const m = parseInt(dmy[2], 10);
    const y = parseInt(dmy[3], 10);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31 && y >= 1900 && y <= 2100) {
      return {
        isValid: true,
        year: y,
        month: m,
        day: d,
        is1st: d === 1,
        is16th: d === 16,
        formattedDate: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
        monthNameEng: ENG_MONTH_NAMES[m] || '',
        monthNameUrdu: URDU_MONTH_NAMES[m] || '',
      };
    }
  }

  // 3. Fallback standard JavaScript Date parse
  const parsed = new Date(clean);
  if (!isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = parsed.getMonth() + 1;
    const d = parsed.getDate();
    if (y >= 1900 && y <= 2100) {
      return {
        isValid: true,
        year: y,
        month: m,
        day: d,
        is1st: d === 1,
        is16th: d === 16,
        formattedDate: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
        monthNameEng: ENG_MONTH_NAMES[m] || '',
        monthNameUrdu: URDU_MONTH_NAMES[m] || '',
      };
    }
  }

  return {
    isValid: false,
    year: 0,
    month: 0,
    day: 0,
    is1st: false,
    is16th: false,
    formattedDate: clean,
    monthNameEng: '',
    monthNameUrdu: '',
  };
}

/**
 * Filter Thailand Lottery draws by Draw Date ('all' | '1st' | '16th'),
 * Month ('all' | '1' .. '12'), and Year ('all' | '2025' ..).
 * Safely excludes missing or invalid date records when filtering.
 */
export function filterThaiLotteryDraws(
  draws: ThaiLotteryResult[],
  dateFilter: ThaiDrawDateFilter = 'all',
  monthFilter: string = 'all',
  yearFilter: string = 'all'
): ThaiLotteryResult[] {
  if (!draws || draws.length === 0) return [];

  return draws.filter((draw) => {
    const parsed = parseThaiDrawDate(draw.date);

    // If any date/month/year filter is specified, require a valid date
    if (dateFilter !== 'all' || monthFilter !== 'all' || yearFilter !== 'all') {
      if (!parsed.isValid) return false;
    }

    // 1. Draw Date Filter:
    if (dateFilter === '1st') {
      if (!parsed.is1st) return false;
    } else if (dateFilter === '16th') {
      if (!parsed.is16th) return false;
    }

    // 2. Month Filter:
    if (monthFilter !== 'all') {
      const targetMonth = parseInt(monthFilter, 10);
      if (parsed.month !== targetMonth) return false;
    }

    // 3. Year Filter:
    if (yearFilter !== 'all') {
      const targetYear = parseInt(yearFilter, 10);
      if (parsed.year !== targetYear) return false;
    }

    return true;
  });
}

/**
 * Extracts list of unique available years from Thailand draws, sorted descending.
 */
export function getAvailableThaiYears(draws: ThaiLotteryResult[]): string[] {
  const yearsSet = new Set<string>();
  draws.forEach((draw) => {
    const parsed = parseThaiDrawDate(draw.date);
    if (parsed.isValid && parsed.year > 0) {
      yearsSet.add(parsed.year.toString());
    }
  });

  return Array.from(yearsSet).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
}

export interface DigitStatItem {
  digit: string;
  count: number;
  percentage: number;
  rank: number;
  status: 'hot' | 'cold' | 'neutral';
  sampleSize: number;
}

export interface PositionDigitStats {
  positionIndex: number;
  positionLabelUrdu: string;
  positionLabelEng: string;
  items: DigitStatItem[];
  topDigit: string;
  topCount: number;
}

export interface ThaiPairFrequency {
  pair: string;
  count: number;
  percentage: number;
  rank: number;
}

export interface ThaiAnalysisMetrics {
  totalDraws: number;
  totalDigitsAnalyzed: number;
  singleDigitStats0to9: DigitStatItem[];
  positions: PositionDigitStats[];
  topAkras: ThaiPairFrequency[]; // Front 2 digits
  topL2: ThaiPairFrequency[]; // Last 2 digits
  topF3: { num: string; count: number }[];
  topB3: { num: string; count: number }[];
  oddVsEven: {
    digitOddsPercentage: number;
    digitEvensPercentage: number;
    totalOddDigits: number;
    totalEvenDigits: number;
    firstPrizeOddsCount: number;
    firstPrizeEvensCount: number;
  };
  highlights: {
    topHotDigit: string;
    topHotDigitCount: number;
    topColdDigit: string;
    topColdDigitCount: number;
    topOpenDigit: string;
    topOpenDigitCount: number;
    topLastDigit: string;
    topLastDigitCount: number;
    topAkra: string;
    topAkraCount: number;
    topL2: string;
    topL2Count: number;
  };
}

/**
 * Computes deep, comprehensive statistics for Thailand Lottery records.
 */
export function computeThaiAnalysisMetrics(filteredDraws: ThaiLotteryResult[]): ThaiAnalysisMetrics {
  const totalDraws = filteredDraws.length;

  // Single digit 0-9 counters
  const digitCounts: Record<string, number> = {
    '0': 0, '1': 0, '2': 0, '3': 0, '4': 0,
    '5': 0, '6': 0, '7': 0, '8': 0, '9': 0,
  };

  // Position-wise counters (Position 0 to 5 for 6-digit firstPrize)
  const posCounts: Record<number, Record<string, number>> = {
    0: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0 },
    1: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0 },
    2: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0 },
    3: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0 },
    4: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0 },
    5: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0 },
  };

  const akraCounts: Record<string, number> = {};
  const l2Counts: Record<string, number> = {};
  const f3Counts: Record<string, number> = {};
  const b3Counts: Record<string, number> = {};

  let totalDigitsAnalyzed = 0;
  let totalOddDigits = 0;
  let totalEvenDigits = 0;
  let firstPrizeOddsCount = 0;
  let firstPrizeEvensCount = 0;

  filteredDraws.forEach((draw) => {
    const raw = (draw.firstPrize || '').trim();
    if (!raw) return;

    // Last digit of firstPrize odd / even
    const lastChar = raw[raw.length - 1];
    if (['1', '3', '5', '7', '9'].includes(lastChar)) {
      firstPrizeOddsCount++;
    } else if (['0', '2', '4', '6', '8'].includes(lastChar)) {
      firstPrizeEvensCount++;
    }

    // Process positions
    for (let pos = 0; pos < raw.length; pos++) {
      const ch = raw[pos];
      if (ch >= '0' && ch <= '9') {
        digitCounts[ch] = (digitCounts[ch] || 0) + 1;
        totalDigitsAnalyzed++;

        if (['1', '3', '5', '7', '9'].includes(ch)) {
          totalOddDigits++;
        } else {
          totalEvenDigits++;
        }

        if (pos < 6) {
          posCounts[pos][ch] = (posCounts[pos][ch] || 0) + 1;
        }
      }
    }

    // Akra (Front 2 digits)
    if (raw.length >= 2) {
      const akra = raw.slice(0, 2);
      akraCounts[akra] = (akraCounts[akra] || 0) + 1;
    }

    // Last 2 digits (from draw.last2Digits or raw)
    const l2 = draw.last2Digits || (raw.length >= 2 ? raw.slice(-2) : '');
    if (l2 && l2.length === 2) {
      l2Counts[l2] = (l2Counts[l2] || 0) + 1;
    }

    // Front 3
    const f3 = draw.front3Digits || (raw.length >= 3 ? raw.slice(0, 3) : '');
    if (f3 && f3.length === 3) {
      f3Counts[f3] = (f3Counts[f3] || 0) + 1;
    }

    // Back 3
    const b3 = draw.back3Digits || (raw.length >= 3 ? raw.slice(-3) : '');
    if (b3 && b3.length === 3) {
      b3Counts[b3] = (b3Counts[b3] || 0) + 1;
    }
  });

  // Calculate single digit 0-9 stats & ranking
  const singleDigitsSorted = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    .map((digit) => ({
      digit,
      count: digitCounts[digit] || 0,
      percentage: totalDigitsAnalyzed > 0 ? Math.round(((digitCounts[digit] || 0) / totalDigitsAnalyzed) * 100) : 0,
      sampleSize: totalDigitsAnalyzed,
    }))
    .sort((a, b) => b.count - a.count);

  const singleDigitStats0to9: DigitStatItem[] = singleDigitsSorted.map((item, idx) => {
    let status: 'hot' | 'cold' | 'neutral' = 'neutral';
    if (idx < 2 && item.count > 0) status = 'hot';
    else if (idx >= 8) status = 'cold';
    return {
      ...item,
      rank: idx + 1,
      status,
    };
  });

  // Positions configurations
  const posLabels: { urdu: string; eng: string }[] = [
    { urdu: 'پہلا ہندسہ (Open / First Digit)', eng: 'Position 1 (Open)' },
    { urdu: 'دوسرا ہندسہ (Close / Second Digit)', eng: 'Position 2 (Close)' },
    { urdu: 'تیسرا ہندسہ (Center / Third Digit)', eng: 'Position 3 (Center)' },
    { urdu: 'چوتھا ہندسہ (Fourth Digit)', eng: 'Position 4' },
    { urdu: 'پانچواں ہندسہ (Fifth Digit)', eng: 'Position 5' },
    { urdu: 'چھٹا ہندسہ (Last Digit)', eng: 'Position 6 (Last)' },
  ];

  const positions: PositionDigitStats[] = [0, 1, 2, 3, 4, 5].map((posIdx) => {
    const rawPosMap = posCounts[posIdx];
    const sorted = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      .map((d) => ({
        digit: d,
        count: rawPosMap[d] || 0,
        percentage: totalDraws > 0 ? Math.round(((rawPosMap[d] || 0) / totalDraws) * 100) : 0,
        sampleSize: totalDraws,
      }))
      .sort((a, b) => b.count - a.count);

    const items: DigitStatItem[] = sorted.map((it, idx) => ({
      ...it,
      rank: idx + 1,
      status: idx < 2 && it.count > 0 ? 'hot' : idx >= 8 ? 'cold' : 'neutral',
    }));

    return {
      positionIndex: posIdx,
      positionLabelUrdu: posLabels[posIdx].urdu,
      positionLabelEng: posLabels[posIdx].eng,
      items,
      topDigit: items[0]?.digit || '-',
      topCount: items[0]?.count || 0,
    };
  });

  // Top Akras
  const topAkras: ThaiPairFrequency[] = Object.keys(akraCounts)
    .map((pair) => ({
      pair,
      count: akraCounts[pair],
      percentage: totalDraws > 0 ? Math.round((akraCounts[pair] / totalDraws) * 100) : 0,
      rank: 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  // Top L2
  const topL2: ThaiPairFrequency[] = Object.keys(l2Counts)
    .map((pair) => ({
      pair,
      count: l2Counts[pair],
      percentage: totalDraws > 0 ? Math.round((l2Counts[pair] / totalDraws) * 100) : 0,
      rank: 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  // Top F3
  const topF3 = Object.keys(f3Counts)
    .map((num) => ({ num, count: f3Counts[num] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Top B3
  const topB3 = Object.keys(b3Counts)
    .map((num) => ({ num, count: b3Counts[num] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const digitOddsPercentage = totalDigitsAnalyzed > 0 ? Math.round((totalOddDigits / totalDigitsAnalyzed) * 100) : 50;
  const digitEvensPercentage = totalDigitsAnalyzed > 0 ? 100 - digitOddsPercentage : 50;

  const highlights = {
    topHotDigit: singleDigitStats0to9[0]?.digit || '-',
    topHotDigitCount: singleDigitStats0to9[0]?.count || 0,
    topColdDigit: singleDigitStats0to9[singleDigitStats0to9.length - 1]?.digit || '-',
    topColdDigitCount: singleDigitStats0to9[singleDigitStats0to9.length - 1]?.count || 0,
    topOpenDigit: positions[0]?.topDigit || '-',
    topOpenDigitCount: positions[0]?.topCount || 0,
    topLastDigit: positions[5]?.topDigit || '-',
    topLastDigitCount: positions[5]?.topCount || 0,
    topAkra: topAkras[0]?.pair || '-',
    topAkraCount: topAkras[0]?.count || 0,
    topL2: topL2[0]?.pair || '-',
    topL2Count: topL2[0]?.count || 0,
  };

  return {
    totalDraws,
    totalDigitsAnalyzed,
    singleDigitStats0to9,
    positions,
    topAkras,
    topL2,
    topF3,
    topB3,
    oddVsEven: {
      digitOddsPercentage,
      digitEvensPercentage,
      totalOddDigits,
      totalEvenDigits,
      firstPrizeOddsCount,
      firstPrizeEvensCount,
    },
    highlights,
  };
}
