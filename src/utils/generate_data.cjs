const fs = require('fs');
const path = require('path');

const cityMap = {
  Karachi: 'کراچی',
  Lahore: 'لاہور',
  Faisalabad: 'فیصل آباد',
  Muzaffarabad: 'مظفرآباد',
  Multan: 'ملتان',
  Rawalpindi: 'راولپنڈی',
  Hyderabad: 'حیدرآباد',
  Peshawar: 'پشاور',
  Quetta: 'کوئٹہ',
  Sialkot: 'سیالکوٹ',
  Gwadar: 'گوادر',
  Bahawalpur: 'بہاولپور',
  Sukkur: 'سکھر',
  Gujranwala: 'گوجرانوالہ'
};

const bondValueMap = {
  '100': 'Rs. 100 Bond',
  '200': 'Rs. 200 Bond',
  '750': 'Rs. 750 Bond',
  '1500': 'Rs. 1,500 Bond',
  '7500': 'Rs. 7,500 Bond',
  '15000': 'Rs. 15,000 Bond',
  '25000': 'Rs. 25,000 Bond',
  '40000': 'Rs. 40,000 Bond'
};

function parseOcrText(rawText) {
  const lines = rawText.split('\n');
  const draws = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Split line into space-separated tokens
    const tokens = line.split(/\s+/).map(t => t.trim()).filter(Boolean);
    if (tokens.length < 5) continue; // Must have at least Rs, bondValue, drawNo, firstPrize, city, date

    // First token must be 'Rs.' or 'Rs' or similar
    if (!tokens[0].toLowerCase().startsWith('rs')) continue;

    let index = 1;
    // Next token is the bond value
    const bondValue = tokens[index++];
    
    // Check if next token is Premium
    let isPremium = false;
    if (tokens[index] && tokens[index].toLowerCase() === 'premium') {
      isPremium = true;
      index++;
    }

    // Next token is the draw number
    const drawNo = tokens[index++];

    // Next token is the first prize number
    const firstPrize = tokens[index++];

    // The last token is the date
    const rawDate = tokens[tokens.length - 1];
    if (!/^\d{2}-\d{2}-\d{4}$/.test(rawDate)) continue;

    // The second-to-last token is the city
    const foundCity = tokens[tokens.length - 2];

    // Everything in between firstPrize and the city is the second prizes!
    const secondPrizes = [];
    for (let i = index; i < tokens.length - 2; i++) {
      // Clean comma and non-digits from prizes
      const cleanedPrize = tokens[i].replace(/[^0-9]/g, '');
      if (cleanedPrize.length === 6) {
        secondPrizes.push(cleanedPrize);
      }
    }

    // Convert date DD-MM-YYYY to YYYY-MM-DD
    const dateParts = rawDate.split('-');
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

    const cityUrdu = cityMap[foundCity] || foundCity;
    const bondTypeDisplay = isPremium ? 'Premium' : '';
    const bondLabelUrdu = `بانڈ Rs. ${parseInt(bondValue).toLocaleString()}${bondTypeDisplay ? ' Premium' : ''}`;

    draws.push({
      id: `pk-draw-${bondValue}-${bondTypeDisplay ? 'premium-' : ''}${drawNo}`,
      category: 'pakistan_bond',
      drawNo: `ڈرا نمبر ${drawNo} (${bondLabelUrdu})`,
      firstPrize: firstPrize,
      secondPrizes: secondPrizes,
      date: formattedDate,
      city: cityUrdu
    });
  }

  return draws;
}

// Read raw ocr text
const rawOcrPath = path.join(__dirname, 'raw_ocr_data.txt');
if (fs.existsSync(rawOcrPath)) {
  const ocrContent = fs.readFileSync(rawOcrPath, 'utf8');
  const draws = parseOcrText(ocrContent);
  
  // Sort draws by date descending (newest first)
  draws.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Generate output file pakistanBondData.ts
  const outputContent = `export interface PakistanBondDraw {
  id: string;
  category: 'pakistan_bond';
  drawNo: string;
  firstPrize: string;
  secondPrizes: string[];
  date: string;
  city: string;
}

export const pakistanBondDraws: PakistanBondDraw[] = ${JSON.stringify(draws, null, 2)};
`;

  fs.writeFileSync(path.join(__dirname, 'pakistanBondData.ts'), outputContent, 'utf8');
  console.log(`Successfully generated pakistanBondData.ts with ${draws.length} draws!`);
} else {
  console.error('raw_ocr_data.txt not found!');
}
