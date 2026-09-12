import { PakistanBondResult } from '../types';

export interface BondCategoryInfo {
  value: string;
  labelUrdu: string;
  labelEng: string;
  badgeColor?: string;
  firstPrizeAmount?: string;
}

export const PK_BOND_CATEGORIES: BondCategoryInfo[] = [
  { value: 'all', labelUrdu: 'تمام بانڈز', labelEng: 'All Bonds' },
  { value: 'Rs. 100', labelUrdu: 'روپے 100', labelEng: 'Rs. 100', firstPrizeAmount: '700,000' },
  { value: 'Rs. 200', labelUrdu: 'روپے 200', labelEng: 'Rs. 200', firstPrizeAmount: '750,000' },
  { value: 'Rs. 750', labelUrdu: 'روپے 750', labelEng: 'Rs. 750', firstPrizeAmount: '1,500,000' },
  { value: 'Rs. 1,500', labelUrdu: 'روپے 1,500', labelEng: 'Rs. 1,500', firstPrizeAmount: '3,000,000' },
  { value: 'Rs. 7,500', labelUrdu: 'روپے 7,500', labelEng: 'Rs. 7,500', firstPrizeAmount: '15,000,000' },
  { value: 'Rs. 15,000', labelUrdu: 'روپے 15,000', labelEng: 'Rs. 15,000', firstPrizeAmount: '30,000,000' },
  { value: 'Rs. 25,000 Premium', labelUrdu: 'روپے 25,000 پریمیم', labelEng: 'Rs. 25,000 Prem.', firstPrizeAmount: '50,000,000' },
  { value: 'Rs. 40,000 Premium', labelUrdu: 'روپے 40,000 پریمیم', labelEng: 'Rs. 40,000 Prem.', firstPrizeAmount: '80,000,000' },
];

export const PK_CITIES_LIST = [
  { nameUrdu: 'کراچی', nameEng: 'Karachi', code: 'KHI' },
  { nameUrdu: 'لاہور', nameEng: 'Lahore', code: 'LHR' },
  { nameUrdu: 'فیصل آباد', nameEng: 'Faisalabad', code: 'FSL' },
  { nameUrdu: 'مظفرآباد', nameEng: 'Muzaffarabad', code: 'MUZ' },
  { nameUrdu: 'ملتان', nameEng: 'Multan', code: 'MUL' },
  { nameUrdu: 'راولپنڈی', nameEng: 'Rawalpindi', code: 'RWD' },
  { nameUrdu: 'حیدرآباد', nameEng: 'Hyderabad', code: 'HYD' },
  { nameUrdu: 'پشاور', nameEng: 'Peshawar', code: 'PWR' },
  { nameUrdu: 'کوئٹہ', nameEng: 'Quetta', code: 'QUE' },
  { nameUrdu: 'سیالکوٹ', nameEng: 'Sialkot', code: 'SKT' },
];

/**
 * Standardizes any draw's bond value into one of the canonical 8 PK bond values.
 */
export function normalizeDrawBondValue(draw: {
  bondValue?: string;
  drawNo?: string;
  id?: string;
}): string {
  const combined = `${draw.bondValue || ''} ${draw.drawNo || ''} ${draw.id || ''}`
    .replace(/[\s,]+/g, '')
    .toLowerCase();

  if (combined.includes('40000')) return 'Rs. 40,000 Premium';
  if (combined.includes('25000')) return 'Rs. 25,000 Premium';
  if (combined.includes('15000')) return 'Rs. 15,000';
  if (combined.includes('7500')) return 'Rs. 7,500';
  if (combined.includes('1500')) return 'Rs. 1,500';
  if (combined.includes('750')) return 'Rs. 750';
  if (combined.includes('200')) return 'Rs. 200';
  if (combined.includes('100')) return 'Rs. 100';

  return 'Rs. 200';
}

export interface FreqItem {
  value: string;
  count: number;
  percentage: number;
}

export interface AkraItem {
  akra: string;
  count: number;
  percentage: number;
}

export interface CityDistributionItem {
  city: string;
  cityEng: string;
  count: number;
  percentage: number;
}

export interface BondAnalysisStats {
  totalDraws: number;
  openFreq: FreqItem[];
  closeFreq: FreqItem[];
  centerFreq: FreqItem[];
  fourthFreq: FreqItem[];
  topAkras: AkraItem[];
  cityDistribution: CityDistributionItem[];
  topCity: string;
  topCityCount: number;
  topOpenDigit: string;
  topOpenCount: number;
  topCloseDigit: string;
  topCloseCount: number;
  digitOddsPercentage: number;
  digitEvensPercentage: number;
  firstPrizeOdds: number;
  firstPrizeEvens: number;
}

export function computeAnalysisStats(draws: PakistanBondResult[]): BondAnalysisStats {
  const totalDraws = draws.length;

  const frequencies = {
    open: Array(10).fill(0),
    close: Array(10).fill(0),
    center: Array(10).fill(0),
    fourth: Array(10).fill(0),
  };

  const akraCounts: Record<string, number> = {};
  const cityCounts: Record<string, number> = {};

  let digitOdd = 0;
  let digitEven = 0;
  let firstPrizeOdd = 0;
  let firstPrizeEven = 0;

  draws.forEach((draw) => {
    const numStr = draw.firstPrize || '';
    const city = draw.city || 'نامعلوم';
    cityCounts[city] = (cityCounts[city] || 0) + 1;

    if (numStr && numStr.length >= 4) {
      const o = parseInt(numStr[0], 10);
      const c = parseInt(numStr[1], 10);
      const ce = parseInt(numStr[2], 10);
      const fo = parseInt(numStr[3], 10);

      if (!isNaN(o) && o >= 0 && o <= 9) frequencies.open[o]++;
      if (!isNaN(c) && c >= 0 && c <= 9) frequencies.close[c]++;
      if (!isNaN(ce) && ce >= 0 && ce <= 9) frequencies.center[ce]++;
      if (!isNaN(fo) && fo >= 0 && fo <= 9) frequencies.fourth[fo]++;

      const akra = numStr.substring(0, 2);
      if (akra && akra.length === 2 && !isNaN(parseInt(akra, 10))) {
        akraCounts[akra] = (akraCounts[akra] || 0) + 1;
      }

      numStr.split('').forEach((char) => {
        const digit = parseInt(char, 10);
        if (!isNaN(digit)) {
          if (digit % 2 === 0) digitEven++;
          else digitOdd++;
        }
      });

      const fullNum = parseInt(numStr, 10);
      if (!isNaN(fullNum)) {
        if (fullNum % 2 === 0) firstPrizeEven++;
        else firstPrizeOdd++;
      }
    }
  });

  const mapFreqList = (arr: number[]): FreqItem[] => {
    const total = arr.reduce((a, b) => a + b, 0) || 1;
    return arr.map((count, val) => ({
      value: val.toString(),
      count,
      percentage: Math.round((count / total) * 100),
    }));
  };

  const sortedAkras: AkraItem[] = Object.entries(akraCounts)
    .map(([akra, count]) => ({
      akra,
      count,
      percentage: totalDraws > 0 ? Math.round((count / totalDraws) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count || parseInt(a.akra, 10) - parseInt(b.akra, 10));

  const sortedCities: CityDistributionItem[] = Object.entries(cityCounts)
    .map(([city, count]) => {
      const cityObj = PK_CITIES_LIST.find((c) => c.nameUrdu === city);
      return {
        city,
        cityEng: cityObj ? cityObj.nameEng : city,
        count,
        percentage: totalDraws > 0 ? Math.round((count / totalDraws) * 100) : 0,
      };
    })
    .sort((a, b) => b.count - a.count);

  const totalDigitsCount = digitOdd + digitEven || 1;

  const openFreq = mapFreqList(frequencies.open);
  const closeFreq = mapFreqList(frequencies.close);
  const centerFreq = mapFreqList(frequencies.center);
  const fourthFreq = mapFreqList(frequencies.fourth);

  const sortedOpen = [...openFreq].sort((a, b) => b.count - a.count);
  const sortedClose = [...closeFreq].sort((a, b) => b.count - a.count);

  return {
    totalDraws,
    openFreq,
    closeFreq,
    centerFreq,
    fourthFreq,
    topAkras: sortedAkras,
    cityDistribution: sortedCities,
    topCity: sortedCities[0] ? sortedCities[0].city : 'کراچی',
    topCityCount: sortedCities[0] ? sortedCities[0].count : 0,
    topOpenDigit: sortedOpen[0] ? sortedOpen[0].value : '7',
    topOpenCount: sortedOpen[0] ? sortedOpen[0].count : 0,
    topCloseDigit: sortedClose[0] ? sortedClose[0].value : '8',
    topCloseCount: sortedClose[0] ? sortedClose[0].count : 0,
    digitOddsPercentage: Math.round((digitOdd / totalDigitsCount) * 100),
    digitEvensPercentage: Math.round((digitEven / totalDigitsCount) * 100),
    firstPrizeOdds: firstPrizeOdd,
    firstPrizeEvens: firstPrizeEven,
  };
}
