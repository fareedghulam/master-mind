import { ThaiLotteryResult } from '../types';
import { 
  ThaiDrawDateFilter, 
  THAI_MONTHS_LIST, 
  filterThaiLotteryDraws, 
  getAvailableThaiYears, 
  parseThaiDrawDate,
  ParsedThaiDate 
} from './thaiAnalysisUtils';

export interface Front3Record {
  id: string;
  drawNo: string;
  date: string;
  parsedDate: ParsedThaiDate;
  firstPrize: string;
  front3: string; // Exactly 3 digits, e.g. "715"
  d1: string;     // Position 1 (Open of Front 3)
  d2: string;     // Position 2 (Center of Front 3)
  d3: string;     // Position 3 (Close of Front 3)
  pair12: string; // Pos 1 + Pos 2
  pair23: string; // Pos 2 + Pos 3
  sum: number;    // d1 + d2 + d3
  rootSum: number; // Single root 1-9
  oddCount: number;
  evenCount: number;
  patternType: 'triple' | 'double' | 'distinct';
}

export interface Front3DigitStat {
  digit: string;
  count: number;
  percentage: number;
  rank: number;
  status: 'hot' | 'cold' | 'neutral';
  recentCount: number;
  recentPercentage: number;
  historicalCount: number;
  historicalPercentage: number;
}

export interface Front3PositionAnalysis {
  positionIndex: 1 | 2 | 3;
  labelUrdu: string;
  labelEng: string;
  digits0to9: Front3DigitStat[];
  hotDigits: string[];
  coldDigits: string[];
  topDigit: string;
  topDigitCount: number;
  topDigitPercentage: number;
}

export interface Front3CombinationStat {
  combination: string;
  count: number;
  percentage: number;
  rank: number;
  dates: string[];
  isRepeated: boolean;
}

export interface Front3PairStat {
  pair: string;
  count: number;
  percentage: number;
  rank: number;
}

export interface Front3PatternDistribution {
  triplesCount: number;
  triplesPercentage: number;
  doublesCount: number;
  doublesPercentage: number;
  distinctCount: number;
  distinctPercentage: number;
}

export interface Front3OddEvenDistribution {
  totalOddDigits: number;
  totalEvenDigits: number;
  oddDigitsPercentage: number;
  evenDigitsPercentage: number;
  threeOddsCount: number;
  threeOddsPercentage: number;
  twoOddsOneEvenCount: number;
  twoOddsOneEvenPercentage: number;
  oneOddTwoEvensCount: number;
  oneOddTwoEvensPercentage: number;
  threeEvensCount: number;
  threeEvensPercentage: number;
}

export interface Front3SumStat {
  sum: number;
  count: number;
  percentage: number;
}

export interface Front3RootStat {
  root: number;
  count: number;
  percentage: number;
}

export interface Front3AnalysisMetrics {
  totalRecords: number;
  recentSampleSize: number; // Number of draws used for "recent" calculation (e.g. up to 10)
  positions: {
    pos1: Front3PositionAnalysis;
    pos2: Front3PositionAnalysis;
    pos3: Front3PositionAnalysis;
  };
  overallDigitStats: Front3DigitStat[];
  topCombinations: Front3CombinationStat[];
  leastCombinations: Front3CombinationStat[];
  repeatedCombinations: Front3CombinationStat[];
  pair12Stats: Front3PairStat[]; // Position 1 + 2
  pair23Stats: Front3PairStat[]; // Position 2 + 3
  patterns: Front3PatternDistribution;
  oddEven: Front3OddEvenDistribution;
  sumStats: Front3SumStat[];
  rootStats: Front3RootStat[];
  highlights: {
    topOverallHotDigit: string;
    topOverallColdDigit: string;
    topCombo: string;
    topComboCount: number;
    topPair12: string;
    topPair12Count: number;
    topPair23: string;
    topPair23Count: number;
    mostCommonSum: number;
    mostCommonSumCount: number;
    mostCommonRoot: number;
  };
}

/**
 * Robustly extracts the clean 3-digit "front3Digits" from a Thai Lottery record.
 * Falls back to first 3 digits of firstPrize if front3Digits is absent or invalid.
 */
export function extractFront3FromDraw(draw: ThaiLotteryResult): string | null {
  if (draw.front3Digits && typeof draw.front3Digits === 'string') {
    const clean = draw.front3Digits.trim();
    if (/^\d{3}$/.test(clean)) {
      return clean;
    }
  }

  // Fallback: Check firstPrize if available
  if (draw.firstPrize && typeof draw.firstPrize === 'string') {
    const cleanFp = draw.firstPrize.trim().replace(/\D/g, '');
    if (cleanFp.length >= 3) {
      return cleanFp.slice(0, 3);
    }
  }

  return null;
}

/**
 * Calculates single root (1-9) by recursively summing digits
 */
export function calculateRootSum(num: number): number {
  let val = Math.abs(num);
  while (val >= 10) {
    val = val.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  }
  return val;
}

/**
 * Parses and maps Thai Lottery draws into strongly-typed Front3Record objects.
 */
export function buildFront3Records(draws: ThaiLotteryResult[]): Front3Record[] {
  const records: Front3Record[] = [];

  draws.forEach((draw) => {
    const front3 = extractFront3FromDraw(draw);
    if (!front3) return;

    const parsedDate = parseThaiDrawDate(draw.date);
    const d1 = front3[0];
    const d2 = front3[1];
    const d3 = front3[2];
    const n1 = parseInt(d1, 10);
    const n2 = parseInt(d2, 10);
    const n3 = parseInt(d3, 10);

    const sum = n1 + n2 + n3;
    const rootSum = calculateRootSum(sum);

    let oddCount = 0;
    if (n1 % 2 !== 0) oddCount++;
    if (n2 % 2 !== 0) oddCount++;
    if (n3 % 2 !== 0) oddCount++;
    const evenCount = 3 - oddCount;

    let patternType: 'triple' | 'double' | 'distinct' = 'distinct';
    if (d1 === d2 && d2 === d3) {
      patternType = 'triple';
    } else if (d1 === d2 || d2 === d3 || d1 === d3) {
      patternType = 'double';
    }

    records.push({
      id: draw.id || `${draw.date}-${front3}`,
      drawNo: draw.drawNo || 'تھائی ڈرا',
      date: draw.date,
      parsedDate,
      firstPrize: draw.firstPrize || '',
      front3,
      d1,
      d2,
      d3,
      pair12: `${d1}${d2}`,
      pair23: `${d2}${d3}`,
      sum,
      rootSum,
      oddCount,
      evenCount,
      patternType,
    });
  });

  return records;
}

/**
 * Filter Front3 records by Date ('all' | '1st' | '16th'), Month ('all' | '1'..'12'), and Year.
 */
export function filterFront3Records(
  records: Front3Record[],
  dateFilter: ThaiDrawDateFilter = 'all',
  monthFilter: string = 'all',
  yearFilter: string = 'all'
): Front3Record[] {
  if (!records || records.length === 0) return [];

  return records.filter((r) => {
    const parsed = r.parsedDate;
    if (dateFilter !== 'all' || monthFilter !== 'all' || yearFilter !== 'all') {
      if (!parsed.isValid) return false;
    }

    if (dateFilter === '1st' && !parsed.is1st) return false;
    if (dateFilter === '16th' && !parsed.is16th) return false;

    if (monthFilter !== 'all') {
      const targetMonth = parseInt(monthFilter, 10);
      if (parsed.month !== targetMonth) return false;
    }

    if (yearFilter !== 'all') {
      const targetYear = parseInt(yearFilter, 10);
      if (parsed.year !== targetYear) return false;
    }

    return true;
  });
}

/**
 * Deep, authentic statistical computation for Thailand Front 3 Digits.
 */
export function computeFront3Analysis(filteredRecords: Front3Record[]): Front3AnalysisMetrics {
  const totalRecords = filteredRecords.length;

  // Recent subset (up to 10 latest records)
  const recentSampleSize = Math.min(10, totalRecords);
  const recentRecords = filteredRecords.slice(0, recentSampleSize);

  // 1. Position-wise counts
  const posCounts: Record<1 | 2 | 3, Record<string, number>> = {
    1: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0 },
    2: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0 },
    3: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0 },
  };

  const posRecentCounts: Record<1 | 2 | 3, Record<string, number>> = {
    1: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0 },
    2: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0 },
    3: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0 },
  };

  const overallCounts: Record<string, number> = {
    '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0,
  };
  const overallRecentCounts: Record<string, number> = {
    '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0,
  };

  const comboMap: Record<string, { count: number; dates: string[] }> = {};
  const pair12Counts: Record<string, number> = {};
  const pair23Counts: Record<string, number> = {};

  let triplesCount = 0;
  let doublesCount = 0;
  let distinctCount = 0;

  let totalOddDigits = 0;
  let totalEvenDigits = 0;

  let threeOddsCount = 0;
  let twoOddsOneEvenCount = 0;
  let oneOddTwoEvensCount = 0;
  let threeEvensCount = 0;

  const sumCounts: Record<number, number> = {};
  const rootCounts: Record<number, number> = {};

  filteredRecords.forEach((r, idx) => {
    const isRecent = idx < recentSampleSize;

    // Position 1, 2, 3
    posCounts[1][r.d1] = (posCounts[1][r.d1] || 0) + 1;
    posCounts[2][r.d2] = (posCounts[2][r.d2] || 0) + 1;
    posCounts[3][r.d3] = (posCounts[3][r.d3] || 0) + 1;

    if (isRecent) {
      posRecentCounts[1][r.d1] = (posRecentCounts[1][r.d1] || 0) + 1;
      posRecentCounts[2][r.d2] = (posRecentCounts[2][r.d2] || 0) + 1;
      posRecentCounts[3][r.d3] = (posRecentCounts[3][r.d3] || 0) + 1;
    }

    // Overall digits
    [r.d1, r.d2, r.d3].forEach((d) => {
      overallCounts[d] = (overallCounts[d] || 0) + 1;
      if (isRecent) {
        overallRecentCounts[d] = (overallRecentCounts[d] || 0) + 1;
      }
    });

    // Combinations
    if (!comboMap[r.front3]) {
      comboMap[r.front3] = { count: 0, dates: [] };
    }
    comboMap[r.front3].count++;
    comboMap[r.front3].dates.push(r.date);

    // Pairs
    pair12Counts[r.pair12] = (pair12Counts[r.pair12] || 0) + 1;
    pair23Counts[r.pair23] = (pair23Counts[r.pair23] || 0) + 1;

    // Patterns
    if (r.patternType === 'triple') triplesCount++;
    else if (r.patternType === 'double') doublesCount++;
    else distinctCount++;

    // Odds / Evens
    totalOddDigits += r.oddCount;
    totalEvenDigits += r.evenCount;

    if (r.oddCount === 3) threeOddsCount++;
    else if (r.oddCount === 2) twoOddsOneEvenCount++;
    else if (r.oddCount === 1) oneOddTwoEvensCount++;
    else threeEvensCount++;

    // Sums
    sumCounts[r.sum] = (sumCounts[r.sum] || 0) + 1;
    rootCounts[r.rootSum] = (rootCounts[r.rootSum] || 0) + 1;
  });

  // Build Position Analyses
  const buildPosStats = (posIndex: 1 | 2 | 3, labelUrdu: string, labelEng: string): Front3PositionAnalysis => {
    const rawCounts = posCounts[posIndex];
    const rawRecent = posRecentCounts[posIndex];

    const sortedDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      .map((digit) => {
        const count = rawCounts[digit] || 0;
        const percentage = totalRecords > 0 ? Math.round((count / totalRecords) * 100) : 0;
        const recentCount = rawRecent[digit] || 0;
        const recentPercentage = recentSampleSize > 0 ? Math.round((recentCount / recentSampleSize) * 100) : 0;

        return {
          digit,
          count,
          percentage,
          recentCount,
          recentPercentage,
          historicalCount: count,
          historicalPercentage: percentage,
        };
      })
      .sort((a, b) => b.count - a.count);

    const digits0to9: Front3DigitStat[] = sortedDigits.map((it, idx) => {
      let status: 'hot' | 'cold' | 'neutral' = 'neutral';
      if (idx < 2 && it.count > 0) status = 'hot';
      else if (idx >= 8) status = 'cold';

      return {
        ...it,
        rank: idx + 1,
        status,
      };
    });

    const hotDigits = digits0to9.filter((d) => d.status === 'hot').map((d) => d.digit);
    const coldDigits = digits0to9.filter((d) => d.status === 'cold').map((d) => d.digit);

    const topItem = digits0to9[0];

    return {
      positionIndex: posIndex,
      labelUrdu,
      labelEng,
      digits0to9,
      hotDigits,
      coldDigits,
      topDigit: topItem ? topItem.digit : '-',
      topDigitCount: topItem ? topItem.count : 0,
      topDigitPercentage: topItem ? topItem.percentage : 0,
    };
  };

  const pos1 = buildPosStats(1, 'فرنٹ پوزیشن 1 (اوپن ہندسہ)', 'Front Position 1 (Open)');
  const pos2 = buildPosStats(2, 'فرنٹ پوزیشن 2 (درمیانی ہندسہ)', 'Front Position 2 (Center)');
  const pos3 = buildPosStats(3, 'فرنٹ پوزیشن 3 (اختتامی ہندسہ)', 'Front Position 3 (Close)');

  // Overall Digit 0-9 stats across all 3 positions (total 3 * totalRecords digits)
  const totalDigitsInRecords = totalRecords * 3;
  const overallRecentTotalDigits = recentSampleSize * 3;

  const overallSorted = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    .map((digit) => {
      const count = overallCounts[digit] || 0;
      const percentage = totalDigitsInRecords > 0 ? Math.round((count / totalDigitsInRecords) * 100) : 0;
      const recentCount = overallRecentCounts[digit] || 0;
      const recentPercentage = overallRecentTotalDigits > 0 ? Math.round((recentCount / overallRecentTotalDigits) * 100) : 0;

      return {
        digit,
        count,
        percentage,
        recentCount,
        recentPercentage,
        historicalCount: count,
        historicalPercentage: percentage,
      };
    })
    .sort((a, b) => b.count - a.count);

  const overallDigitStats: Front3DigitStat[] = overallSorted.map((it, idx) => ({
    ...it,
    rank: idx + 1,
    status: idx < 2 && it.count > 0 ? 'hot' : idx >= 8 ? 'cold' : 'neutral',
  }));

  // Combinations
  const allCombos: Front3CombinationStat[] = Object.keys(comboMap)
    .map((comb) => ({
      combination: comb,
      count: comboMap[comb].count,
      percentage: totalRecords > 0 ? Math.round((comboMap[comb].count / totalRecords) * 100) : 0,
      rank: 0,
      dates: comboMap[comb].dates,
      isRepeated: comboMap[comb].count > 1,
    }))
    .sort((a, b) => b.count - a.count);

  const topCombinations = allCombos.slice(0, 15).map((item, idx) => ({ ...item, rank: idx + 1 }));
  const leastCombinations = [...allCombos].reverse().slice(0, 15);
  const repeatedCombinations = allCombos.filter((c) => c.isRepeated);

  // Pairs Pos 1+2
  const pair12Stats: Front3PairStat[] = Object.keys(pair12Counts)
    .map((pair) => ({
      pair,
      count: pair12Counts[pair],
      percentage: totalRecords > 0 ? Math.round((pair12Counts[pair] / totalRecords) * 100) : 0,
      rank: 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)
    .map((p, idx) => ({ ...p, rank: idx + 1 }));

  // Pairs Pos 2+3
  const pair23Stats: Front3PairStat[] = Object.keys(pair23Counts)
    .map((pair) => ({
      pair,
      count: pair23Counts[pair],
      percentage: totalRecords > 0 ? Math.round((pair23Counts[pair] / totalRecords) * 100) : 0,
      rank: 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)
    .map((p, idx) => ({ ...p, rank: idx + 1 }));

  // Patterns
  const patterns: Front3PatternDistribution = {
    triplesCount,
    triplesPercentage: totalRecords > 0 ? Math.round((triplesCount / totalRecords) * 100) : 0,
    doublesCount,
    doublesPercentage: totalRecords > 0 ? Math.round((doublesCount / totalRecords) * 100) : 0,
    distinctCount,
    distinctPercentage: totalRecords > 0 ? Math.round((distinctCount / totalRecords) * 100) : 0,
  };

  // Odd / Even
  const totalDigits = totalOddDigits + totalEvenDigits;
  const oddEven: Front3OddEvenDistribution = {
    totalOddDigits,
    totalEvenDigits,
    oddDigitsPercentage: totalDigits > 0 ? Math.round((totalOddDigits / totalDigits) * 100) : 50,
    evenDigitsPercentage: totalDigits > 0 ? Math.round((totalEvenDigits / totalDigits) * 100) : 50,
    threeOddsCount,
    threeOddsPercentage: totalRecords > 0 ? Math.round((threeOddsCount / totalRecords) * 100) : 0,
    twoOddsOneEvenCount,
    twoOddsOneEvenPercentage: totalRecords > 0 ? Math.round((twoOddsOneEvenCount / totalRecords) * 100) : 0,
    oneOddTwoEvensCount,
    oneOddTwoEvensPercentage: totalRecords > 0 ? Math.round((oneOddTwoEvensCount / totalRecords) * 100) : 0,
    threeEvensCount,
    threeEvensPercentage: totalRecords > 0 ? Math.round((threeEvensCount / totalRecords) * 100) : 0,
  };

  // Sums
  const sumStats: Front3SumStat[] = Object.keys(sumCounts)
    .map((sStr) => {
      const sum = parseInt(sStr, 10);
      return {
        sum,
        count: sumCounts[sum],
        percentage: totalRecords > 0 ? Math.round((sumCounts[sum] / totalRecords) * 100) : 0,
      };
    })
    .sort((a, b) => b.count - a.count);

  // Roots (1-9)
  const rootStats: Front3RootStat[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map((root) => {
      const count = rootCounts[root] || 0;
      return {
        root,
        count,
        percentage: totalRecords > 0 ? Math.round((count / totalRecords) * 100) : 0,
      };
    })
    .sort((a, b) => b.count - a.count);

  // Highlights
  const highlights = {
    topOverallHotDigit: overallDigitStats[0]?.digit || '-',
    topOverallColdDigit: overallDigitStats[overallDigitStats.length - 1]?.digit || '-',
    topCombo: topCombinations[0]?.combination || '-',
    topComboCount: topCombinations[0]?.count || 0,
    topPair12: pair12Stats[0]?.pair || '-',
    topPair12Count: pair12Stats[0]?.count || 0,
    topPair23: pair23Stats[0]?.pair || '-',
    topPair23Count: pair23Stats[0]?.count || 0,
    mostCommonSum: sumStats[0]?.sum ?? 0,
    mostCommonSumCount: sumStats[0]?.count ?? 0,
    mostCommonRoot: rootStats[0]?.root ?? 0,
  };

  return {
    totalRecords,
    recentSampleSize,
    positions: {
      pos1,
      pos2,
      pos3,
    },
    overallDigitStats,
    topCombinations,
    leastCombinations,
    repeatedCombinations,
    pair12Stats,
    pair23Stats,
    patterns,
    oddEven,
    sumStats,
    rootStats,
    highlights,
  };
}
