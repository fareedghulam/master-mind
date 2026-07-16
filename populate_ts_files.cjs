const fs = require('fs');
const path = require('path');

try {
  const extData = JSON.parse(fs.readFileSync('extracted_thai.json', 'utf8'));
  const matchStr = extData[0];
  
  // Safely evaluate the string to turn it into a real JS array
  const draws = eval(matchStr);
  console.log(`Successfully parsed ${draws.length} Thai Lottery historical draws!`);

  // Write to src/utils/thaiLotteryData.ts
  const outputContent = `export interface HistoricalDraw {
  id: string;
  category: 'pakistan_bond' | 'thailand_lottery';
  drawNo: string;
  firstPrize: string;
  secondPrizes: string[];
  date: string;
  city: string;
}

export const thaiHistoricalDraws: HistoricalDraw[] = ${JSON.stringify(draws, null, 2)};
`;

  fs.writeFileSync(path.join(__dirname, 'src/utils/thaiLotteryData.ts'), outputContent, 'utf8');
  console.log("Successfully wrote src/utils/thaiLotteryData.ts!");
} catch (e) {
  console.error("Error populating TS files:", e);
}
