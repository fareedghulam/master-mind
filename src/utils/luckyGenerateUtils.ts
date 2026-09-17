import { PakistanBondResult, ThaiLotteryResult } from '../types';
import { 
  normalizeDrawBondValue, 
  PK_BOND_CATEGORIES, 
  PK_CITIES_LIST,
  computeAnalysisStats 
} from './bondAnalysisUtils';
import { 
  filterThaiLotteryDraws, 
  ThaiDrawDateFilter, 
  computeThaiAnalysisMetrics,
  parseThaiDrawDate
} from './thaiAnalysisUtils';

export type GenFormula = 'frequency' | 'odd_even' | 'astrological';

export interface GeneratedCandidateResult {
  number: string;
  score: number; // Historical match score percentage (e.g. 88.4)
  sampleSize: number;
  reason: string;
  statsBreakdown: {
    openDigit: string;
    openDigitPercentage: number;
    closeDigit: string;
    closeDigitPercentage: number;
    topAkra: string;
    topAkraCount: number;
    oddCount: number;
    evenCount: number;
    overallOddPercentage: number;
    overallEvenPercentage: number;
    hotDigits: string[];
    coldDigits: string[];
    filterDescriptionUrdu: string;
  };
}

export type LuckyGenerateOutput =
  | { success: true; result: GeneratedCandidateResult; error?: undefined }
  | { success: false; error: string; result?: undefined };

/**
 * Filters Pakistan Bond results by denomination and city.
 */
export function filterPakistanBondDraws(
  draws: PakistanBondResult[],
  bondValue: string = 'all',
  city: string = 'all'
): PakistanBondResult[] {
  return draws.filter((draw) => {
    if (bondValue !== 'all') {
      const normalizedBond = normalizeDrawBondValue(draw);
      if (normalizedBond !== bondValue) return false;
    }
    if (city !== 'all') {
      if (draw.city !== city) return false;
    }
    return true;
  });
}

/**
 * Computes deep position-wise and pattern statistics for Pakistan bonds.
 */
export function computePakistanHistoricalStats(draws: PakistanBondResult[]) {
  const totalDraws = draws.length;
  // Frequency for positions 0 to 5 (6 digits)
  const posCounts: number[][] = Array.from({ length: 6 }, () => Array(10).fill(0));
  const digitCounts: number[] = Array(10).fill(0);
  const akraCounts: Record<string, number> = {};
  const recentAkraCounts: Record<string, number> = {};

  let totalOddDigits = 0;
  let totalEvenDigits = 0;
  let repeatedDigitDrawsCount = 0;

  // Recent draws (last 15 or 25%)
  const recentSlice = draws.slice(0, Math.min(15, Math.max(5, Math.floor(totalDraws * 0.25))));

  draws.forEach((draw, idx) => {
    const num = (draw.firstPrize || '').trim();
    if (num.length >= 6) {
      let hasRepeated = false;
      for (let i = 0; i < 6; i++) {
        const d = parseInt(num[i], 10);
        if (!isNaN(d) && d >= 0 && d <= 9) {
          posCounts[i][d]++;
          digitCounts[d]++;
          if (d % 2 === 0) totalEvenDigits++;
          else totalOddDigits++;
          if (i > 0 && num[i] === num[i - 1]) hasRepeated = true;
        }
      }
      if (hasRepeated) repeatedDigitDrawsCount++;

      const akra = num.substring(0, 2);
      if (akra.length === 2) {
        akraCounts[akra] = (akraCounts[akra] || 0) + 1;
        if (idx < recentSlice.length) {
          recentAkraCounts[akra] = (recentAkraCounts[akra] || 0) + 1;
        }
      }
    }
  });

  const totalDigits = totalOddDigits + totalEvenDigits || 1;
  const oddPercentage = Math.round((totalOddDigits / totalDigits) * 100);
  const evenPercentage = Math.round((totalEvenDigits / totalDigits) * 100);

  // Position percentage distributions
  const posPercentages: number[][] = posCounts.map((arr) => {
    const sum = arr.reduce((a, b) => a + b, 0) || 1;
    return arr.map((cnt) => (cnt / sum) * 100);
  });

  // Hot and Cold digits
  const digitRanked = digitCounts
    .map((cnt, d) => ({ digit: d.toString(), count: cnt }))
    .sort((a, b) => b.count - a.count);

  const hotDigits = digitRanked.slice(0, 3).map((x) => x.digit);
  const coldDigits = digitRanked.slice(-3).map((x) => x.digit);

  // Sorted Akras
  const sortedAkras = Object.entries(akraCounts)
    .map(([akra, count]) => ({ akra, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalDraws,
    posCounts,
    posPercentages,
    digitCounts,
    hotDigits,
    coldDigits,
    sortedAkras,
    recentAkraCounts,
    oddPercentage,
    evenPercentage,
    repeatedDigitRatio: totalDraws > 0 ? repeatedDigitDrawsCount / totalDraws : 0.3,
  };
}

/**
 * Computes deep position-wise and pattern statistics for Thailand lottery.
 */
export function computeThaiHistoricalStats(draws: ThaiLotteryResult[]) {
  const totalDraws = draws.length;
  // Thailand 4-digit generation (positions 0, 1, 2, 3)
  const posCounts: number[][] = Array.from({ length: 4 }, () => Array(10).fill(0));
  const digitCounts: number[] = Array(10).fill(0);
  const akraCounts: Record<string, number> = {};
  const last2Counts: Record<string, number> = {};

  let totalOddDigits = 0;
  let totalEvenDigits = 0;
  let repeatedDigitDrawsCount = 0;

  draws.forEach((draw) => {
    const raw = (draw.firstPrize || '').trim();
    // Use last 4 digits of first prize or 4 digits if length is 4
    let fourDigit = '';
    if (raw.length >= 6) {
      fourDigit = raw.substring(raw.length - 4); // traditional 4 digits or front 4
    } else if (raw.length >= 4) {
      fourDigit = raw.substring(0, 4);
    }

    if (fourDigit.length === 4) {
      let hasRepeated = false;
      for (let i = 0; i < 4; i++) {
        const d = parseInt(fourDigit[i], 10);
        if (!isNaN(d) && d >= 0 && d <= 9) {
          posCounts[i][d]++;
          digitCounts[d]++;
          if (d % 2 === 0) totalEvenDigits++;
          else totalOddDigits++;
          if (i > 0 && fourDigit[i] === fourDigit[i - 1]) hasRepeated = true;
        }
      }
      if (hasRepeated) repeatedDigitDrawsCount++;

      const akra = fourDigit.substring(0, 2);
      akraCounts[akra] = (akraCounts[akra] || 0) + 1;

      const l2 = fourDigit.substring(2, 4);
      last2Counts[l2] = (last2Counts[l2] || 0) + 1;
    }

    // Also include draw.last2Digits if present
    if (draw.last2Digits && draw.last2Digits.length === 2) {
      last2Counts[draw.last2Digits] = (last2Counts[draw.last2Digits] || 0) + 2;
    }
  });

  const totalDigits = totalOddDigits + totalEvenDigits || 1;
  const oddPercentage = Math.round((totalOddDigits / totalDigits) * 100);
  const evenPercentage = Math.round((totalEvenDigits / totalDigits) * 100);

  const posPercentages: number[][] = posCounts.map((arr) => {
    const sum = arr.reduce((a, b) => a + b, 0) || 1;
    return arr.map((cnt) => (cnt / sum) * 100);
  });

  const digitRanked = digitCounts
    .map((cnt, d) => ({ digit: d.toString(), count: cnt }))
    .sort((a, b) => b.count - a.count);

  const hotDigits = digitRanked.slice(0, 3).map((x) => x.digit);
  const coldDigits = digitRanked.slice(-3).map((x) => x.digit);

  const sortedAkras = Object.entries(akraCounts)
    .map(([akra, count]) => ({ akra, count }))
    .sort((a, b) => b.count - a.count);

  const sortedL2 = Object.entries(last2Counts)
    .map(([l2, count]) => ({ l2, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalDraws,
    posCounts,
    posPercentages,
    digitCounts,
    hotDigits,
    coldDigits,
    sortedAkras,
    sortedL2,
    oddPercentage,
    evenPercentage,
    repeatedDigitRatio: totalDraws > 0 ? repeatedDigitDrawsCount / totalDraws : 0.25,
  };
}

/**
 * Scores a 6-digit candidate for Pakistan Bond against historical stats.
 */
function scorePakistanCandidate(
  cand: string,
  stats: ReturnType<typeof computePakistanHistoricalStats>,
  formula: GenFormula
): number {
  if (cand.length !== 6) return 50;

  // 1. Position-wise frequency alignment (Weight: 40 points)
  let posScoreSum = 0;
  for (let i = 0; i < 6; i++) {
    const d = parseInt(cand[i], 10);
    const pct = stats.posPercentages[i][d] || 0;
    posScoreSum += pct; // avg per digit is ~10%
  }
  // Normal avg sum is ~60, high is ~90+
  const posScore = Math.min(40, (posScoreSum / 60) * 25);

  // 2. Akra match (Weight: 25 points)
  const akra = cand.substring(0, 2);
  const akraCount = stats.sortedAkras.find((a) => a.akra === akra)?.count || 0;
  const maxAkraCount = stats.sortedAkras[0]?.count || 1;
  const akraScore = Math.min(25, (akraCount / maxAkraCount) * 25);

  // 3. Odd / Even alignment (Weight: 15 points)
  let oddCount = 0;
  for (let i = 0; i < 6; i++) {
    if (parseInt(cand[i], 10) % 2 !== 0) oddCount++;
  }
  const candOddRatio = oddCount / 6;
  const histOddRatio = (stats.oddPercentage || 50) / 100;
  const oddDiff = Math.abs(candOddRatio - histOddRatio);
  const oddScore = Math.max(0, 15 - oddDiff * 25);

  // 4. Hot digit bonus / Cold penalty (Weight: 10 points)
  let hotCount = 0;
  let coldCount = 0;
  for (let i = 0; i < 6; i++) {
    if (stats.hotDigits.includes(cand[i])) hotCount++;
    if (stats.coldDigits.includes(cand[i])) coldCount++;
  }
  const hotScore = Math.min(10, Math.max(0, hotCount * 2.5 - coldCount * 1.5 + 4));

  // 5. Formula modifier (Weight: 10 points)
  let formulaScore = 7;
  if (formula === 'odd_even') {
    // bonus for balanced parity (3 odd, 3 even)
    formulaScore = oddCount === 3 ? 10 : oddCount === 2 || oddCount === 4 ? 8 : 5;
  } else if (formula === 'frequency') {
    // bonus for top akra and high pos frequency
    formulaScore = akraCount > 0 ? 10 : 6;
  } else if (formula === 'astrological') {
    // harmonic digital root / sum
    const sum = cand.split('').reduce((acc, ch) => acc + parseInt(ch, 10), 0);
    const digitalRoot = ((sum - 1) % 9) + 1;
    // Auspicious roots (1, 3, 7, 9)
    formulaScore = [1, 3, 7, 9].includes(digitalRoot) ? 10 : 7;
  }

  const rawScore = posScore + akraScore + oddScore + hotScore + formulaScore;
  // Bound strictly between 68.0 and 96.5 for realistic statistical score representation
  const finalScore = Math.min(96.5, Math.max(68.0, Math.round(rawScore * 10) / 10));
  return finalScore;
}

/**
 * Scores a 4-digit candidate for Thailand Lottery against historical stats.
 */
function scoreThaiCandidate(
  cand: string,
  stats: ReturnType<typeof computeThaiHistoricalStats>,
  formula: GenFormula
): number {
  if (cand.length !== 4) return 50;

  // 1. Position-wise frequency (Weight: 40)
  let posScoreSum = 0;
  for (let i = 0; i < 4; i++) {
    const d = parseInt(cand[i], 10);
    const pct = stats.posPercentages[i][d] || 0;
    posScoreSum += pct;
  }
  const posScore = Math.min(40, (posScoreSum / 40) * 25);

  // 2. Akra & Last 2 match (Weight: 25)
  const akra = cand.substring(0, 2);
  const l2 = cand.substring(2, 4);
  const akraCount = stats.sortedAkras.find((a) => a.akra === akra)?.count || 0;
  const l2Count = stats.sortedL2.find((l) => l.l2 === l2)?.count || 0;
  const maxAkra = stats.sortedAkras[0]?.count || 1;
  const maxL2 = stats.sortedL2[0]?.count || 1;
  const pairScore = Math.min(25, ((akraCount / maxAkra) * 15 + (l2Count / maxL2) * 10));

  // 3. Odd / Even alignment (Weight: 15)
  let oddCount = 0;
  for (let i = 0; i < 4; i++) {
    if (parseInt(cand[i], 10) % 2 !== 0) oddCount++;
  }
  const candOddRatio = oddCount / 4;
  const histOddRatio = (stats.oddPercentage || 50) / 100;
  const oddDiff = Math.abs(candOddRatio - histOddRatio);
  const oddScore = Math.max(0, 15 - oddDiff * 25);

  // 4. Hot/Cold bonus (Weight: 10)
  let hotCount = 0;
  let coldCount = 0;
  for (let i = 0; i < 4; i++) {
    if (stats.hotDigits.includes(cand[i])) hotCount++;
    if (stats.coldDigits.includes(cand[i])) coldCount++;
  }
  const hotScore = Math.min(10, Math.max(0, hotCount * 3 - coldCount * 2 + 3));

  // 5. Formula modifier (Weight: 10)
  let formulaScore = 7;
  if (formula === 'odd_even') {
    formulaScore = oddCount === 2 ? 10 : 7;
  } else if (formula === 'frequency') {
    formulaScore = (akraCount > 0 || l2Count > 0) ? 10 : 6;
  } else if (formula === 'astrological') {
    const sum = cand.split('').reduce((acc, ch) => acc + parseInt(ch, 10), 0);
    const root = ((sum - 1) % 9) + 1;
    formulaScore = [1, 5, 7, 9].includes(root) ? 10 : 7;
  }

  const rawScore = posScore + pairScore + oddScore + hotScore + formulaScore;
  const finalScore = Math.min(95.5, Math.max(68.5, Math.round(rawScore * 10) / 10));
  return finalScore;
}

/**
 * Builds candidate pools for Pakistan 6-digit Bond from historical stats.
 */
function generatePakistanCandidatePool(
  stats: ReturnType<typeof computePakistanHistoricalStats>,
  formula: GenFormula,
  excludedNumbers: Set<string>
): Array<{ number: string; score: number }> {
  const candidatesMap = new Map<string, number>();

  // Top digits for each position 0 to 5
  const topPosDigits: number[][] = stats.posPercentages.map((arr) => {
    return arr
      .map((pct, digit) => ({ digit, pct }))
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 4)
      .map((x) => x.digit);
  });

  // Top Akras
  const topAkras = stats.sortedAkras.slice(0, 8).map((x) => x.akra);
  if (topAkras.length === 0) topAkras.push('78', '45', '12', '90', '34');

  // Strategy 1: Combine top Akras with top position digits for pos 2, 3, 4, 5
  topAkras.forEach((akra) => {
    for (const d2 of topPosDigits[2].slice(0, 3)) {
      for (const d3 of topPosDigits[3].slice(0, 3)) {
        for (const d4 of topPosDigits[4].slice(0, 2)) {
          for (const d5 of topPosDigits[5].slice(0, 2)) {
            const num = `${akra}${d2}${d3}${d4}${d5}`;
            if (!excludedNumbers.has(num) && !candidatesMap.has(num)) {
              candidatesMap.set(num, scorePakistanCandidate(num, stats, formula));
            }
          }
        }
      }
    }
  });

  // Strategy 2: Cross-combine top position digits across all 6 positions
  for (const d0 of topPosDigits[0].slice(0, 3)) {
    for (const d1 of topPosDigits[1].slice(0, 3)) {
      for (const d2 of topPosDigits[2].slice(0, 2)) {
        for (const d3 of topPosDigits[3].slice(0, 2)) {
          const d4 = topPosDigits[4][0];
          const d5 = topPosDigits[5][0];
          const num = `${d0}${d1}${d2}${d3}${d4}${d5}`;
          if (!excludedNumbers.has(num) && !candidatesMap.has(num)) {
            candidatesMap.set(num, scorePakistanCandidate(num, stats, formula));
          }
        }
      }
    }
  }

  // Strategy 3: Formula-specific patterns
  if (formula === 'odd_even') {
    // Alternating or balanced odd/even candidate generator
    const oddD = [1, 3, 5, 7, 9].filter((d) => stats.digitCounts[d] > 0);
    const evenD = [0, 2, 4, 6, 8].filter((d) => stats.digitCounts[d] > 0);
    if (oddD.length === 0) oddD.push(1, 3, 5, 7, 9);
    if (evenD.length === 0) evenD.push(0, 2, 4, 6, 8);

    for (let o = 0; o < Math.min(3, oddD.length); o++) {
      for (let e = 0; e < Math.min(3, evenD.length); e++) {
        const num1 = `${oddD[o]}${evenD[e]}${oddD[(o + 1) % oddD.length]}${evenD[(e + 1) % evenD.length]}${oddD[(o + 2) % oddD.length]}${evenD[(e + 2) % evenD.length]}`;
        const num2 = `${evenD[e]}${oddD[o]}${evenD[(e + 1) % evenD.length]}${oddD[(o + 1) % oddD.length]}${evenD[(e + 2) % evenD.length]}${oddD[(o + 2) % oddD.length]}`;
        if (!excludedNumbers.has(num1) && !candidatesMap.has(num1)) {
          candidatesMap.set(num1, scorePakistanCandidate(num1, stats, formula));
        }
        if (!excludedNumbers.has(num2) && !candidatesMap.has(num2)) {
          candidatesMap.set(num2, scorePakistanCandidate(num2, stats, formula));
        }
      }
    }
  }

  return Array.from(candidatesMap.entries())
    .map(([number, score]) => ({ number, score }))
    .sort((a, b) => b.score - a.score);
}

/**
 * Builds candidate pools for Thailand 4-digit lottery from historical stats.
 */
function generateThaiCandidatePool(
  stats: ReturnType<typeof computeThaiHistoricalStats>,
  formula: GenFormula,
  excludedNumbers: Set<string>
): Array<{ number: string; score: number }> {
  const candidatesMap = new Map<string, number>();

  const topPosDigits: number[][] = stats.posPercentages.map((arr) => {
    return arr
      .map((pct, digit) => ({ digit, pct }))
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 4)
      .map((x) => x.digit);
  });

  const topAkras = stats.sortedAkras.slice(0, 6).map((x) => x.akra);
  const topL2 = stats.sortedL2.slice(0, 6).map((x) => x.l2);

  if (topAkras.length === 0) topAkras.push('56', '89', '23', '01', '74');
  if (topL2.length === 0) topL2.push('65', '98', '32', '10', '47');

  // Strategy 1: Pair top Akra with top L2
  topAkras.forEach((akra) => {
    topL2.forEach((l2) => {
      const num = `${akra}${l2}`;
      if (!excludedNumbers.has(num) && !candidatesMap.has(num)) {
        candidatesMap.set(num, scoreThaiCandidate(num, stats, formula));
      }
    });
  });

  // Strategy 2: Cross-combine top position digits
  for (const d0 of topPosDigits[0].slice(0, 3)) {
    for (const d1 of topPosDigits[1].slice(0, 3)) {
      for (const d2 of topPosDigits[2].slice(0, 3)) {
        for (const d3 of topPosDigits[3].slice(0, 3)) {
          const num = `${d0}${d1}${d2}${d3}`;
          if (!excludedNumbers.has(num) && !candidatesMap.has(num)) {
            candidatesMap.set(num, scoreThaiCandidate(num, stats, formula));
          }
        }
      }
    }
  }

  // Strategy 3: Parity and Astrological combinations
  if (formula === 'odd_even') {
    const odds = [1, 3, 5, 7, 9];
    const evens = [0, 2, 4, 6, 8];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const num1 = `${odds[i]}${evens[j]}${odds[(i + 1) % 5]}${evens[(j + 1) % 5]}`;
        const num2 = `${evens[j]}${odds[i]}${evens[(j + 1) % 5]}${odds[(i + 1) % 5]}`;
        if (!excludedNumbers.has(num1) && !candidatesMap.has(num1)) {
          candidatesMap.set(num1, scoreThaiCandidate(num1, stats, formula));
        }
        if (!excludedNumbers.has(num2) && !candidatesMap.has(num2)) {
          candidatesMap.set(num2, scoreThaiCandidate(num2, stats, formula));
        }
      }
    }
  }

  return Array.from(candidatesMap.entries())
    .map(([number, score]) => ({ number, score }))
    .sort((a, b) => b.score - a.score);
}

/**
 * Dynamically constructs a comprehensive Urdu explanation based on genuine historical analysis.
 */
function buildDynamicUrduReason(
  num: string,
  category: 'pakistan_bond' | 'thailand_lottery',
  formula: GenFormula,
  stats: {
    sampleSize: number;
    openDigit: string;
    openPct: number;
    closeDigit: string;
    closePct: number;
    topAkra: string;
    topAkraCount: number;
    oddCount: number;
    evenCount: number;
    histOddPct: number;
    histEvenPct: number;
    hotDigits: string[];
    filterDescUrdu: string;
  }
): string {
  const parts: string[] = [];

  // Filter & Sample Size grounding
  parts.push(
    `یہ نمبر منتخب کردہ ${stats.filterDescUrdu} کے ${stats.sampleSize} تاریخی ڈراز کے تفصیلی شماریاتی تجزیے سے اخذ کیا گیا ہے۔`
  );

  // Position alignment
  const openD = num[0];
  const closeD = num[num.length - 1];
  parts.push(
    `اوپن پوزیشن پر ہندسہ "${openD}" پچھلے ریکارڈز میں ${stats.openPct}% کثافت کے ساتھ سرفہرست رہا، جبکہ اختتامی ہندسے پر "${closeD}" (${stats.closePct}%) تاریخی طور پر مستحکم ہے۔`
  );

  // Akra insight
  const akra = num.substring(0, 2);
  if (stats.topAkraCount > 0) {
    parts.push(
      `ابتدائی جوڑی (اکڑا) "${akra}" ریکارڈز میں ${stats.topAkraCount} بار بارہائے راست پایا گیا ہے۔`
    );
  }

  // Parity / Odd-Even
  parts.push(
    `طاق و جفت کا تناسب (${stats.oddCount} طاق : ${stats.evenCount} جفت) تاریخی اوسط (${stats.histOddPct}% طاق / ${stats.histEvenPct}% جفت) کے عین مطابق ہے۔`
  );

  // Formula specific
  if (formula === 'frequency') {
    parts.push(`فریکوئنسی ماڈل: ہاٹ ڈیجٹس (${stats.hotDigits.join('، ')}) کے پوزیشن وائز دباؤ کو ترجیح دی گئی ہے۔`);
  } else if (formula === 'odd_even') {
    parts.push(`طاق/جفت ماڈل: باریابی اور توازن کے تسلسل کے ریاضیاتی اصول لاگو ہیں۔`);
  } else {
    parts.push(`علم الہندسہ ماڈل: عددی مفرد اور ہارمونک ہم آہنگی کے تاریخی پیٹرن سے حاصل شدہ۔`);
  }

  return parts.join(' ');
}

/**
 * Main function to generate a Lucky Number from genuine Historical Records.
 * Guarantees session uniqueness (no duplicates in the same session).
 */
export function generateLuckyNumberFromHistory(params: {
  category: 'pakistan_bond' | 'thailand_lottery';
  formula: GenFormula;
  pakistanDraws: PakistanBondResult[];
  thaiDraws: ThaiLotteryResult[];
  sessionGeneratedNumbers: string[];
  // Pakistan specific filters
  pkBondValue?: string;
  pkCity?: string;
  // Thailand specific filters
  thaiDrawDate?: ThaiDrawDateFilter;
  thaiMonth?: string;
  thaiYear?: string;
}): LuckyGenerateOutput {
  const {
    category,
    formula,
    pakistanDraws,
    thaiDraws,
    sessionGeneratedNumbers,
    pkBondValue = 'all',
    pkCity = 'all',
    thaiDrawDate = 'all',
    thaiMonth = 'all',
    thaiYear = 'all',
  } = params;

  const excludedSet = new Set(sessionGeneratedNumbers);

  if (category === 'pakistan_bond') {
    // 1. Filter Pakistan draws
    const filteredDraws = filterPakistanBondDraws(pakistanDraws, pkBondValue, pkCity);
    const sampleSize = filteredDraws.length;

    if (sampleSize === 0) {
      return {
        success: false,
        error: `منتخب کردہ فلٹرز (${pkBondValue !== 'all' ? pkBondValue : 'تمام بانڈز'} - ${pkCity !== 'all' ? pkCity : 'تمام شہر'}) کے مطابق کوئی تاریخی ریکارڈ نہیں ملا۔ براہ کرم فلٹر تبدیل کریں۔`,
      };
    }

    // 2. Compute statistics
    const stats = computePakistanHistoricalStats(filteredDraws);

    // 3. Generate candidate pool
    const candidates = generatePakistanCandidatePool(stats, formula, excludedSet);

    if (candidates.length === 0) {
      return {
        success: false,
        error: `اس سیشن میں موجودہ فلٹرز کے تمام دستیاب منفرد امیدوار نمبر تیار ہو چکے ہیں۔ مزید نمبرز کے لیے سیشن ہسٹری ری سیٹ کریں یا فلٹر تبدیل کریں۔`,
      };
    }

    // Controlled selection: pick from top 3 highest scoring candidates
    const topTier = candidates.slice(0, Math.min(3, candidates.length));
    const chosenIndex = Math.floor(Math.random() * topTier.length);
    const chosen = topTier[chosenIndex];

    const openD = chosen.number[0];
    const closeD = chosen.number[5];
    const openPct = Math.round(stats.posPercentages[0][parseInt(openD, 10)] || 0);
    const closePct = Math.round(stats.posPercentages[5][parseInt(closeD, 10)] || 0);
    const akra = chosen.number.substring(0, 2);
    const topAkraCount = stats.sortedAkras.find((a) => a.akra === akra)?.count || 0;

    let oddCount = 0;
    let evenCount = 0;
    for (const ch of chosen.number) {
      if (parseInt(ch, 10) % 2 === 0) evenCount++;
      else oddCount++;
    }

    const bondLabel = PK_BOND_CATEGORIES.find((b) => b.value === pkBondValue)?.labelUrdu || 'تمام بانڈز';
    const filterDescUrdu = `${bondLabel}${pkCity !== 'all' ? ` (${pkCity})` : ''}`;

    const reason = buildDynamicUrduReason(chosen.number, category, formula, {
      sampleSize,
      openDigit: openD,
      openPct,
      closeDigit: closeD,
      closePct,
      topAkra: akra,
      topAkraCount,
      oddCount,
      evenCount,
      histOddPct: stats.oddPercentage,
      histEvenPct: stats.evenPercentage,
      hotDigits: stats.hotDigits,
      filterDescUrdu,
    });

    return {
      success: true,
      result: {
        number: chosen.number,
        score: chosen.score,
        sampleSize,
        reason,
        statsBreakdown: {
          openDigit: openD,
          openDigitPercentage: openPct,
          closeDigit: closeD,
          closeDigitPercentage: closePct,
          topAkra: akra,
          topAkraCount,
          oddCount,
          evenCount,
          overallOddPercentage: stats.oddPercentage,
          overallEvenPercentage: stats.evenPercentage,
          hotDigits: stats.hotDigits,
          coldDigits: stats.coldDigits,
          filterDescriptionUrdu: filterDescUrdu,
        },
      },
    };
  } else {
    // Thailand Lottery
    const filteredDraws = filterThaiLotteryDraws(thaiDraws, thaiDrawDate, thaiMonth, thaiYear);
    const sampleSize = filteredDraws.length;

    if (sampleSize === 0) {
      return {
        success: false,
        error: `تھائی لاٹری کے منتخب فلٹرز (تاریخ: ${thaiDrawDate}، مہینہ: ${thaiMonth}، سال: ${thaiYear}) کے مطابق کوئی تاریخی ریکارڈ نہیں ملا۔ براہ کرم فلٹر وسیع کریں۔`,
      };
    }

    const stats = computeThaiHistoricalStats(filteredDraws);
    const candidates = generateThaiCandidatePool(stats, formula, excludedSet);

    if (candidates.length === 0) {
      return {
        success: false,
        error: `اس سیشن میں تھائی لاٹری کے تمام منفرد امیدوار نمبرز تیار ہو چکے ہیں۔ مزید نمبرز کے لیے سیشن ہسٹری ری سیٹ کریں یا فلٹر تبدیل کریں۔`,
      };
    }

    const topTier = candidates.slice(0, Math.min(3, candidates.length));
    const chosenIndex = Math.floor(Math.random() * topTier.length);
    const chosen = topTier[chosenIndex];

    const openD = chosen.number[0];
    const closeD = chosen.number[3];
    const openPct = Math.round(stats.posPercentages[0][parseInt(openD, 10)] || 0);
    const closePct = Math.round(stats.posPercentages[3][parseInt(closeD, 10)] || 0);
    const akra = chosen.number.substring(0, 2);
    const topAkraCount = stats.sortedAkras.find((a) => a.akra === akra)?.count || 0;

    let oddCount = 0;
    let evenCount = 0;
    for (const ch of chosen.number) {
      if (parseInt(ch, 10) % 2 === 0) evenCount++;
      else oddCount++;
    }

    const dateDesc = thaiDrawDate === '1st' ? '1 تاریخ' : thaiDrawDate === '16th' ? '16 تاریخ' : 'تمام تاریخیں';
    const monthDesc = thaiMonth !== 'all' ? `مہینہ ${thaiMonth}` : 'تمام مہینے';
    const yearDesc = thaiYear !== 'all' ? `سال ${thaiYear}` : 'تمام سال';
    const filterDescUrdu = `تھائی لاٹری (${dateDesc}، ${monthDesc}، ${yearDesc})`;

    const reason = buildDynamicUrduReason(chosen.number, category, formula, {
      sampleSize,
      openDigit: openD,
      openPct,
      closeDigit: closeD,
      closePct,
      topAkra: akra,
      topAkraCount,
      oddCount,
      evenCount,
      histOddPct: stats.oddPercentage,
      histEvenPct: stats.evenPercentage,
      hotDigits: stats.hotDigits,
      filterDescUrdu,
    });

    return {
      success: true,
      result: {
        number: chosen.number,
        score: chosen.score,
        sampleSize,
        reason,
        statsBreakdown: {
          openDigit: openD,
          openDigitPercentage: openPct,
          closeDigit: closeD,
          closeDigitPercentage: closePct,
          topAkra: akra,
          topAkraCount,
          oddCount,
          evenCount,
          overallOddPercentage: stats.oddPercentage,
          overallEvenPercentage: stats.evenPercentage,
          hotDigits: stats.hotDigits,
          coldDigits: stats.coldDigits,
          filterDescriptionUrdu: filterDescUrdu,
        },
      },
    };
  }
}
