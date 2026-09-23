import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ThaiLotteryResult } from '../types';
import { 
  ThaiAnalysisMetrics, 
  ThaiDrawDateFilter, 
  THAI_MONTHS_LIST,
  parseThaiDrawDate
} from './thaiAnalysisUtils';
import { savePdfDocument } from './pdfGenerator';

export interface ThaiPdfFilterContext {
  drawDateFilter: ThaiDrawDateFilter;
  monthFilter: string;
  yearFilter: string;
}

/**
 * Returns formatted human-readable labels for the active Thai filter combination.
 */
export function getThaiFilterLabels(context: ThaiPdfFilterContext, filteredDraws: ThaiLotteryResult[]) {
  const { drawDateFilter, monthFilter, yearFilter } = context;

  // Date Grouping label & explanation
  let dateGroupLabel = 'All Draw Dates (تمام تاریخیں)';
  let dateGroupExplanation = 'تمام دستیاب قرعہ اندازیاں (All available dates)';
  if (drawDateFilter === '1st') {
    dateGroupLabel = '1st Date Analysis (1 تاریخ اینالیسس)';
    dateGroupExplanation = 'Group Rule: 30 Previous Month ➔ 1st Current Month ➔ 2nd Current Month';
  } else if (drawDateFilter === '16th') {
    dateGroupLabel = '16th Date Analysis (16 تاریخ اینالیسس)';
    dateGroupExplanation = 'Group Rule: 15th ➔ 16th ➔ 17th Current Month';
  }

  // Month label
  const monthObj = THAI_MONTHS_LIST.find((m) => m.value === monthFilter);
  const monthLabel = monthObj && monthFilter !== 'all'
    ? `${monthObj.labelEng} (${monthObj.labelUrdu})`
    : 'All Months (تمام مہینے)';

  // Year label
  const yearLabel = yearFilter === 'all' ? 'All Years (تمام سال)' : `Year ${yearFilter}`;

  // Collect distinct dates present in the analyzed dataset
  const distinctDates = Array.from(new Set(filteredDraws.map((d) => d.date).filter(Boolean)))
    .sort()
    .join(', ');

  return {
    dateGroupLabel,
    dateGroupExplanation,
    monthLabel,
    yearLabel,
    distinctDates: distinctDates || 'None',
    totalRecords: filteredDraws.length
  };
}

/**
 * Adds the official MasterMind header banner to a jsPDF document.
 */
function drawHeaderBanner(doc: any, subtitle: string) {
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(17);
  doc.setFont('helvetica', 'bold');
  doc.text('MASTERMIND QURESHI ENTERPRISE', 105, 14, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(251, 191, 36); // amber-400
  doc.text(subtitle.toUpperCase(), 105, 24, { align: 'center' });
}

/**
 * Adds the metadata filter parameters box to the document.
 */
function drawMetadataBox(
  doc: any, 
  startY: number, 
  labels: ReturnType<typeof getThaiFilterLabels>,
  reportName: string
): number {
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(10, startY, 190, 36, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`REPORT PARAMETERS - ${reportName.toUpperCase()}`, 15, startY + 6);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);

  doc.text(`Filter Group: ${labels.dateGroupLabel}`, 15, startY + 13);
  doc.text(`Rule Definition: ${labels.dateGroupExplanation}`, 15, startY + 19);
  doc.text(`Month & Year: ${labels.monthLabel} | ${labels.yearLabel}`, 15, startY + 25);
  
  // Truncate long dates list if needed
  const dateStr = labels.distinctDates.length > 85 
    ? labels.distinctDates.substring(0, 82) + '...' 
    : labels.distinctDates;
  doc.text(`Dates Included: ${dateStr}`, 15, startY + 31);

  doc.text(`Analyzed Draws: ${labels.totalRecords}`, 145, startY + 13);
  doc.text(`City / Origin: Bangkok, Thailand`, 145, startY + 19);
  doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, 145, startY + 25);
  doc.text(`System: AI Analysis Portal`, 145, startY + 31);

  return startY + 40;
}

/**
 * Adds a key analytics summary highlight box.
 */
function drawHighlightsBox(doc: any, startY: number, stats: ThaiAnalysisMetrics): number {
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.rect(10, startY, 190, 20, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('KEY STATISTICAL HIGHLIGHTS', 15, startY + 6);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);

  doc.text(`Total Draws: ${stats.totalDraws} | Digits Sample: ${stats.totalDigitsAnalyzed}`, 15, startY + 14);
  doc.text(`Hot Digit: ${stats.highlights.topHotDigit} (${stats.highlights.topHotDigitCount}x) | Cold: ${stats.highlights.topColdDigit} (${stats.highlights.topColdDigitCount}x)`, 75, startY + 14);
  doc.text(`Hot Open: ${stats.highlights.topOpenDigit} (${stats.highlights.topOpenDigitCount}x) | Akra: ${stats.highlights.topAkra} | L2: ${stats.highlights.topL2}`, 140, startY + 14);

  return startY + 24;
}

/**
 * Adds page numbering and footer to every page in the document.
 */
function finalizePagesAndFooter(doc: any) {
  const pageCount = (doc.internal as any).getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Page ${i} of ${pageCount} | MasterMind Qureshi Enterprise - Thailand Lottery Official Analysis Report`,
      105,
      290,
      { align: 'center' }
    );
  }
}

/**
 * Generates Full Thailand Analysis PDF containing all analytical sections.
 */
export async function generateThaiFullAnalysisPDF(
  filteredDraws: ThaiLotteryResult[],
  stats: ThaiAnalysisMetrics,
  context: ThaiPdfFilterContext
): Promise<{ success: boolean; error?: string }> {
  try {
    const doc = new jsPDF() as any;
    const labels = getThaiFilterLabels(context, filteredDraws);

    // 1. Header banner
    drawHeaderBanner(doc, 'Thailand Lottery - Full Comprehensive AI Analysis');

    // 2. Metadata Box
    let currentY = drawMetadataBox(doc, 40, labels, 'Complete Thailand Lottery Analysis');

    // 3. Highlights Box
    currentY = drawHighlightsBox(doc, currentY, stats);

    // If empty dataset
    if (filteredDraws.length === 0) {
      doc.setFontSize(10);
      doc.setTextColor(220, 38, 38);
      doc.text('No Thailand Lottery historical records match the selected date/month/year filter.', 105, currentY + 20, { align: 'center' });
      finalizePagesAndFooter(doc);
      return await savePdfDocument(doc, `Thai_Full_Analysis_Empty_${new Date().toISOString().split('T')[0]}.pdf`);
    }

    // 4. Position-wise Summary Table (Positions 1 to 6)
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('1. POSITION-WISE BREAKDOWN (POSITIONS 1 TO 6)', 10, currentY + 4);

    const posRows = stats.positions.map((p) => {
      const hotItems = p.items.filter((i) => i.status === 'hot').map((i) => `${i.digit} (${i.count}x)`).join(', ') || '--';
      const coldItems = p.items.filter((i) => i.status === 'cold').map((i) => `${i.digit} (${i.count}x)`).join(', ') || '--';
      const topPercentage = p.items.find((i) => i.digit === p.topDigit)?.percentage || 0;

      return [
        `Pos ${p.positionIndex + 1}`,
        p.positionLabelEng,
        p.topDigit,
        `${p.topCount} times`,
        `${topPercentage}%`,
        hotItems,
        coldItems
      ];
    });

    autoTable(doc, {
      startY: currentY + 7,
      margin: { left: 10, right: 10 },
      head: [['Position', 'Label', 'Top Digit', 'Frequency', 'Top %', 'Hot Digits', 'Cold Digits']],
      body: posRows,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42], fontStyle: 'bold', fontSize: 7.5 },
      styles: { fontSize: 7.5, cellPadding: 2, font: 'helvetica' },
      columnStyles: {
        0: { cellWidth: 16, fontStyle: 'bold', halign: 'center' },
        2: { fontStyle: 'bold', textColor: [220, 38, 38], cellWidth: 18, halign: 'center' },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 18, halign: 'center' }
      }
    });

    currentY = doc.lastAutoTable.finalY + 8;

    // 5. Digit Frequency Table 0-9 across all positions
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('2. DIGIT FREQUENCY SPECTRUM (DIGITS 0 TO 9)', 10, currentY);

    const digitRows = stats.singleDigitStats0to9.map((d) => [
      `#${d.rank}`,
      `Digit ${d.digit}`,
      d.status === 'hot' ? 'HOT (Ziada)' : d.status === 'cold' ? 'COLD (Kam)' : 'NORMAL',
      `${d.count} times`,
      `${d.percentage}%`
    ]);

    autoTable(doc, {
      startY: currentY + 3,
      margin: { left: 10, right: 10 },
      head: [['Rank', 'Digit (0-9)', 'Status', 'Appearance Count', 'Percentage Ratio']],
      body: digitRows,
      theme: 'striped',
      headStyles: { fillColor: [30, 41, 59], fontStyle: 'bold', fontSize: 7.5 },
      styles: { fontSize: 7.5, cellPadding: 2, font: 'helvetica' },
      columnStyles: {
        0: { cellWidth: 18, halign: 'center' },
        1: { fontStyle: 'bold' },
        3: { halign: 'center' },
        4: { halign: 'center' }
      },
      didParseCell: function (data: any) {
        if (data.column.index === 2 && data.cell.raw && typeof data.cell.raw === 'string') {
          if (data.cell.raw.includes('HOT')) {
            data.cell.styles.textColor = [217, 119, 6]; // amber-600
            data.cell.styles.fontStyle = 'bold';
          } else if (data.cell.raw.includes('COLD')) {
            data.cell.styles.textColor = [8, 145, 178]; // cyan-600
            data.cell.styles.fontStyle = 'bold';
          }
        }
      }
    });

    currentY = doc.lastAutoTable.finalY + 8;

    // Check page space for Akra & Odd/Even
    if (currentY > 230) {
      doc.addPage();
      currentY = 20;
    }

    // 6. Akra & L2 Pairs Summary Table
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('3. TOP AKRA (FRONT 2) & TOP L2 (DOWN 2) PAIRS', 10, currentY);

    const akraTableRows: string[][] = [];
    const maxPairs = Math.max(stats.topAkras.length, stats.topL2.length, 5);
    for (let i = 0; i < Math.min(maxPairs, 8); i++) {
      const a = stats.topAkras[i];
      const l = stats.topL2[i];
      akraTableRows.push([
        `#${i + 1}`,
        a ? a.pair : '--',
        a ? `${a.count}x (${a.percentage}%)` : '--',
        `#${i + 1}`,
        l ? l.pair : '--',
        l ? `${l.count}x (${l.percentage}%)` : '--'
      ]);
    }

    autoTable(doc, {
      startY: currentY + 3,
      margin: { left: 10, right: 10 },
      head: [['Rank', 'Top Akra (Front 2)', 'Akra Freq', 'Rank', 'Top L2 (Last 2)', 'L2 Freq']],
      body: akraTableRows,
      theme: 'striped',
      headStyles: { fillColor: [51, 65, 85], fontStyle: 'bold', fontSize: 7.5 },
      styles: { fontSize: 7.5, cellPadding: 2, font: 'helvetica' },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { fontStyle: 'bold', textColor: [220, 38, 38], halign: 'center' },
        2: { halign: 'center' },
        3: { cellWidth: 15, halign: 'center' },
        4: { fontStyle: 'bold', textColor: [79, 70, 229], halign: 'center' },
        5: { halign: 'center' }
      }
    });

    currentY = doc.lastAutoTable.finalY + 8;

    // 7. Odd vs Even Analysis Table
    if (currentY > 235) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('4. ODD VS EVEN BALANCE RATIO ANALYSIS', 10, currentY);

    const oddEvenRows = [
      [
        'All Digits Spectrum (Tamam Hindse)',
        `${stats.oddVsEven.totalOddDigits} digits (${stats.oddVsEven.digitOddsPercentage}%)`,
        `${stats.oddVsEven.totalEvenDigits} digits (${stats.oddVsEven.digitEvensPercentage}%)`,
        stats.oddVsEven.digitOddsPercentage > stats.oddVsEven.digitEvensPercentage ? 'Odd Dominant' : 'Even Dominant'
      ],
      [
        'First Prize Ending Digit (Aakhri Hindsa)',
        `${stats.oddVsEven.firstPrizeOddsCount} draws (${stats.totalDraws > 0 ? Math.round((stats.oddVsEven.firstPrizeOddsCount / stats.totalDraws) * 100) : 0}%)`,
        `${stats.oddVsEven.firstPrizeEvensCount} draws (${stats.totalDraws > 0 ? Math.round((stats.oddVsEven.firstPrizeEvensCount / stats.totalDraws) * 100) : 0}%)`,
        stats.oddVsEven.firstPrizeOddsCount > stats.oddVsEven.firstPrizeEvensCount ? 'Odd Ending' : 'Even Ending'
      ]
    ];

    autoTable(doc, {
      startY: currentY + 3,
      margin: { left: 10, right: 10 },
      head: [['Dimension / Level', 'Odd (Taaq) Distribution', 'Even (Juft) Distribution', 'Dominance']],
      body: oddEvenRows,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42], fontStyle: 'bold', fontSize: 7.5 },
      styles: { fontSize: 7.5, cellPadding: 2, font: 'helvetica' }
    });

    currentY = doc.lastAutoTable.finalY + 8;

    // 8. Filtered Historical Draw Records Table (Starts on next page for clean continuous display)
    doc.addPage();
    currentY = 20;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`5. HISTORICAL DRAW RECORDS INCLUDED IN THIS ANALYSIS (${filteredDraws.length} DRAWS)`, 10, currentY);

    const drawRows = filteredDraws.map((d, index) => {
      const parsed = parseThaiDrawDate(d.date);
      const tag = parsed.is1st ? '1st Draw' : parsed.is16th ? '16th Draw' : 'Draw';
      const secondPrizesStr = Array.isArray(d.secondPrizes) && d.secondPrizes.length > 0
        ? d.secondPrizes.join(', ')
        : '--';

      return [
        index + 1,
        d.date || '--',
        `${tag} | ${d.drawNo || 'Bangkok'}`,
        d.firstPrize || '--',
        `F: ${d.front3Digits || '-'} | B: ${d.back3Digits || '-'}`,
        d.last2Digits || '--',
        secondPrizesStr
      ];
    });

    autoTable(doc, {
      startY: currentY + 4,
      margin: { left: 10, right: 10 },
      head: [['Sr #', 'Draw Date', 'Draw Details', '1st Prize', '3 Digits (F/B)', 'L2 (Down)', '2nd Prizes']],
      body: drawRows,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42], fontStyle: 'bold', fontSize: 7.5 },
      styles: { fontSize: 7, cellPadding: 2, font: 'helvetica' },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 20, fontStyle: 'bold' },
        3: { cellWidth: 22, fontStyle: 'bold', textColor: [220, 38, 38], halign: 'center' },
        4: { cellWidth: 26, halign: 'center' },
        5: { cellWidth: 18, fontStyle: 'bold', textColor: [79, 70, 229], halign: 'center' }
      }
    });

    finalizePagesAndFooter(doc);

    const cleanDateFilter = context.drawDateFilter.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `Thailand_Full_Analysis_${cleanDateFilter}_M${context.monthFilter}_Y${context.yearFilter}_${new Date().toISOString().split('T')[0]}.pdf`;
    return await savePdfDocument(doc, filename);
  } catch (err: any) {
    console.error('Error generating Thai Full Analysis PDF:', err);
    return { success: false, error: err?.message || 'تھائی لینڈ مکمل اینالیسس پی ڈی ایف بنانے میں خرابی پیش آئی۔' };
  }
}

/**
 * Generates Section PDF: Position-wise Analysis (Positions 1 to 6 and Selected Position breakdown).
 */
export async function generateThaiPositionAnalysisPDF(
  filteredDraws: ThaiLotteryResult[],
  stats: ThaiAnalysisMetrics,
  selectedPositionIndex: number,
  context: ThaiPdfFilterContext
): Promise<{ success: boolean; error?: string }> {
  try {
    const doc = new jsPDF() as any;
    const labels = getThaiFilterLabels(context, filteredDraws);
    const pos = stats.positions[selectedPositionIndex] || stats.positions[0];

    drawHeaderBanner(doc, 'Thailand Lottery - Position-wise Historical Analysis');

    let currentY = drawMetadataBox(doc, 40, labels, `Position Analysis (Position 1 to 6 & Focus: ${pos?.positionLabelEng || 'Pos 1'})`);
    currentY = drawHighlightsBox(doc, currentY, stats);

    if (filteredDraws.length === 0) {
      doc.setFontSize(10);
      doc.setTextColor(220, 38, 38);
      doc.text('No historical records match the selected date/month/year filter.', 105, currentY + 20, { align: 'center' });
      finalizePagesAndFooter(doc);
      return await savePdfDocument(doc, `Thai_Positions_Empty_${new Date().toISOString().split('T')[0]}.pdf`);
    }

    // 1. All Positions Summary Table
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('SUMMARY OF ALL 6 POSITIONS IN FIRST PRIZE', 10, currentY + 4);

    const posSummaryRows = stats.positions.map((p) => {
      const topPercentage = p.items.find((i) => i.digit === p.topDigit)?.percentage || 0;
      const hotList = p.items.filter((i) => i.status === 'hot').map((i) => `${i.digit} (${i.count}x)`).join(', ') || '--';
      const coldList = p.items.filter((i) => i.status === 'cold').map((i) => `${i.digit} (${i.count}x)`).join(', ') || '--';

      return [
        `Pos ${p.positionIndex + 1}`,
        p.positionLabelEng,
        p.topDigit,
        `${p.topCount}x (${topPercentage}%)`,
        hotList,
        coldList
      ];
    });

    autoTable(doc, {
      startY: currentY + 7,
      margin: { left: 10, right: 10 },
      head: [['Position', 'Label', 'Top Digit', 'Frequency', 'Hot Digits', 'Cold Digits']],
      body: posSummaryRows,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42], fontStyle: 'bold', fontSize: 8 },
      styles: { fontSize: 8, cellPadding: 2.5, font: 'helvetica' },
      columnStyles: {
        0: { cellWidth: 18, fontStyle: 'bold', halign: 'center' },
        2: { cellWidth: 20, fontStyle: 'bold', textColor: [220, 38, 38], halign: 'center' },
        3: { cellWidth: 22, halign: 'center' }
      }
    });

    currentY = doc.lastAutoTable.finalY + 10;

    // 2. Focused Detailed Frequency Distribution for the Active Position
    if (pos) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(`DETAILED 0-9 SPECTRUM FOR ${pos.positionLabelEng.toUpperCase()}`, 10, currentY);

      const detailedRows = pos.items.map((it) => [
        `#${it.rank}`,
        `Digit ${it.digit}`,
        it.status === 'hot' ? 'HOT (Ziada Freq)' : it.status === 'cold' ? 'COLD (Kam Freq)' : 'NORMAL',
        `${it.count} times`,
        `${it.percentage}%`
      ]);

      autoTable(doc, {
        startY: currentY + 3,
        margin: { left: 10, right: 10 },
        head: [['Rank', 'Digit (0-9)', 'Status', 'Appearance Count', 'Percentage Ratio']],
        body: detailedRows,
        theme: 'striped',
        headStyles: { fillColor: [30, 41, 59], fontStyle: 'bold', fontSize: 8 },
        styles: { fontSize: 8, cellPadding: 2.5, font: 'helvetica' },
        columnStyles: {
          0: { cellWidth: 18, halign: 'center' },
          1: { fontStyle: 'bold' },
          3: { halign: 'center' },
          4: { halign: 'center' }
        },
        didParseCell: function (data: any) {
          if (data.column.index === 2 && data.cell.raw && typeof data.cell.raw === 'string') {
            if (data.cell.raw.includes('HOT')) {
              data.cell.styles.textColor = [217, 119, 6];
              data.cell.styles.fontStyle = 'bold';
            } else if (data.cell.raw.includes('COLD')) {
              data.cell.styles.textColor = [8, 145, 178];
              data.cell.styles.fontStyle = 'bold';
            }
          }
        }
      });
    }

    finalizePagesAndFooter(doc);

    const filename = `Thailand_Position_Analysis_Pos${selectedPositionIndex + 1}_${new Date().toISOString().split('T')[0]}.pdf`;
    return await savePdfDocument(doc, filename);
  } catch (err: any) {
    console.error('Error generating Position Analysis PDF:', err);
    return { success: false, error: err?.message || 'پوزیشن اینالیسس پی ڈی ایف بنانے میں خرابی پیش آئی۔' };
  }
}

/**
 * Generates Section PDF: Single Digit Frequency (0 to 9) across all positions.
 */
export async function generateThaiDigitFrequencyPDF(
  filteredDraws: ThaiLotteryResult[],
  stats: ThaiAnalysisMetrics,
  context: ThaiPdfFilterContext
): Promise<{ success: boolean; error?: string }> {
  try {
    const doc = new jsPDF() as any;
    const labels = getThaiFilterLabels(context, filteredDraws);

    drawHeaderBanner(doc, 'Thailand Lottery - Single Digit (0 to 9) Frequency');

    let currentY = drawMetadataBox(doc, 40, labels, 'Digit Frequency Spectrum (0-9)');
    currentY = drawHighlightsBox(doc, currentY, stats);

    if (filteredDraws.length === 0) {
      doc.setFontSize(10);
      doc.setTextColor(220, 38, 38);
      doc.text('No historical records match the selected date/month/year filter.', 105, currentY + 20, { align: 'center' });
      finalizePagesAndFooter(doc);
      return await savePdfDocument(doc, `Thai_Digit_Freq_Empty_${new Date().toISOString().split('T')[0]}.pdf`);
    }

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`COMPLETE 0-9 DIGIT OCCURRENCE DISTRIBUTION (TOTAL DIGITS: ${stats.totalDigitsAnalyzed})`, 10, currentY + 4);

    const digitRows = stats.singleDigitStats0to9.map((d) => [
      `#${d.rank}`,
      `Digit ${d.digit}`,
      d.status === 'hot' ? 'HOT (Ziada Zahir Hua)' : d.status === 'cold' ? 'COLD (Kam Zahir Hua)' : 'NORMAL',
      `${d.count} times`,
      `${d.percentage}%`
    ]);

    autoTable(doc, {
      startY: currentY + 7,
      margin: { left: 10, right: 10 },
      head: [['Rank', 'Digit', 'Status Category', 'Total Occurrences', 'Percentage Ratio']],
      body: digitRows,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42], fontStyle: 'bold', fontSize: 8 },
      styles: { fontSize: 8, cellPadding: 3, font: 'helvetica' },
      columnStyles: {
        0: { cellWidth: 18, halign: 'center' },
        1: { fontStyle: 'bold' },
        3: { halign: 'center' },
        4: { halign: 'center' }
      },
      didParseCell: function (data: any) {
        if (data.column.index === 2 && data.cell.raw && typeof data.cell.raw === 'string') {
          if (data.cell.raw.includes('HOT')) {
            data.cell.styles.textColor = [217, 119, 6];
            data.cell.styles.fontStyle = 'bold';
          } else if (data.cell.raw.includes('COLD')) {
            data.cell.styles.textColor = [8, 145, 178];
            data.cell.styles.fontStyle = 'bold';
          }
        }
      }
    });

    finalizePagesAndFooter(doc);

    const filename = `Thailand_Digit_Frequency_0to9_${new Date().toISOString().split('T')[0]}.pdf`;
    return await savePdfDocument(doc, filename);
  } catch (err: any) {
    console.error('Error generating Digit Frequency PDF:', err);
    return { success: false, error: err?.message || 'ہندساتی فریکوئنسی پی ڈی ایف بنانے میں خرابی پیش آئی۔' };
  }
}

/**
 * Generates Section PDF: Akra (Front 2) & Last 2 (L2 / Down 2) Pairs Analysis.
 */
export async function generateThaiAkraL2PDF(
  filteredDraws: ThaiLotteryResult[],
  stats: ThaiAnalysisMetrics,
  context: ThaiPdfFilterContext
): Promise<{ success: boolean; error?: string }> {
  try {
    const doc = new jsPDF() as any;
    const labels = getThaiFilterLabels(context, filteredDraws);

    drawHeaderBanner(doc, 'Thailand Lottery - Akra & Last 2 (L2) Pairs Analysis');

    let currentY = drawMetadataBox(doc, 40, labels, 'Akra (Front 2) & Last 2 (L2) Analysis');
    currentY = drawHighlightsBox(doc, currentY, stats);

    if (filteredDraws.length === 0) {
      doc.setFontSize(10);
      doc.setTextColor(220, 38, 38);
      doc.text('No historical records match the selected date/month/year filter.', 105, currentY + 20, { align: 'center' });
      finalizePagesAndFooter(doc);
      return await savePdfDocument(doc, `Thai_Akra_L2_Empty_${new Date().toISOString().split('T')[0]}.pdf`);
    }

    // 1. Akra Table
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`TOP AKRA PAIRS (FIRST 2 DIGITS) - TOTAL RECORDED: ${stats.topAkras.length}`, 10, currentY + 4);

    const akraRows = stats.topAkras.map((a) => [
      `#${a.rank}`,
      a.pair,
      `${a.count} times`,
      `${a.percentage}%`
    ]);

    autoTable(doc, {
      startY: currentY + 7,
      margin: { left: 10, right: 10 },
      head: [['Rank', 'Akra Pair (Front 2)', 'Frequency Count', 'Occurrence %']],
      body: akraRows.length > 0 ? akraRows : [['--', 'No data available', '--', '--']],
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42], fontStyle: 'bold', fontSize: 8 },
      styles: { fontSize: 8, cellPadding: 2.5, font: 'helvetica' },
      columnStyles: {
        0: { cellWidth: 20, halign: 'center' },
        1: { fontStyle: 'bold', textColor: [220, 38, 38], halign: 'center' },
        2: { halign: 'center' },
        3: { halign: 'center' }
      }
    });

    currentY = doc.lastAutoTable.finalY + 10;

    // Check space for L2 table
    if (currentY > 210) {
      doc.addPage();
      currentY = 20;
    }

    // 2. L2 (Last 2 / Down 2) Table
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`TOP LAST 2 DIGIT PAIRS (L2 / DOWN 2) - TOTAL RECORDED: ${stats.topL2.length}`, 10, currentY);

    const l2Rows = stats.topL2.map((l) => [
      `#${l.rank}`,
      l.pair,
      `${l.count} times`,
      `${l.percentage}%`
    ]);

    autoTable(doc, {
      startY: currentY + 3,
      margin: { left: 10, right: 10 },
      head: [['Rank', 'L2 Pair (Last 2)', 'Frequency Count', 'Occurrence %']],
      body: l2Rows.length > 0 ? l2Rows : [['--', 'No data available', '--', '--']],
      theme: 'striped',
      headStyles: { fillColor: [79, 70, 229], fontStyle: 'bold', fontSize: 8 },
      styles: { fontSize: 8, cellPadding: 2.5, font: 'helvetica' },
      columnStyles: {
        0: { cellWidth: 20, halign: 'center' },
        1: { fontStyle: 'bold', textColor: [79, 70, 229], halign: 'center' },
        2: { halign: 'center' },
        3: { halign: 'center' }
      }
    });

    finalizePagesAndFooter(doc);

    const filename = `Thailand_Akra_L2_Analysis_${new Date().toISOString().split('T')[0]}.pdf`;
    return await savePdfDocument(doc, filename);
  } catch (err: any) {
    console.error('Error generating Akra & L2 PDF:', err);
    return { success: false, error: err?.message || 'آکڑا اور ایل 2 پی ڈی ایف بنانے میں خرابی پیش آئی۔' };
  }
}

/**
 * Generates Section PDF: Odd vs Even Balance Analysis.
 */
export async function generateThaiOddEvenPDF(
  filteredDraws: ThaiLotteryResult[],
  stats: ThaiAnalysisMetrics,
  context: ThaiPdfFilterContext
): Promise<{ success: boolean; error?: string }> {
  try {
    const doc = new jsPDF() as any;
    const labels = getThaiFilterLabels(context, filteredDraws);

    drawHeaderBanner(doc, 'Thailand Lottery - Odd vs Even Distribution');

    let currentY = drawMetadataBox(doc, 40, labels, 'Odd vs Even Ratio Analysis');
    currentY = drawHighlightsBox(doc, currentY, stats);

    if (filteredDraws.length === 0) {
      doc.setFontSize(10);
      doc.setTextColor(220, 38, 38);
      doc.text('No historical records match the selected date/month/year filter.', 105, currentY + 20, { align: 'center' });
      finalizePagesAndFooter(doc);
      return await savePdfDocument(doc, `Thai_OddEven_Empty_${new Date().toISOString().split('T')[0]}.pdf`);
    }

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('ODD VS EVEN SPECTRUM AT DIGIT LEVEL & DRAW LEVEL', 10, currentY + 4);

    const rows = [
      [
        'Total Individual Digits Analyzed',
        `${stats.oddVsEven.totalOddDigits} digits`,
        `${stats.oddVsEven.digitOddsPercentage}%`,
        `${stats.oddVsEven.totalEvenDigits} digits`,
        `${stats.oddVsEven.digitEvensPercentage}%`,
        stats.oddVsEven.digitOddsPercentage > stats.oddVsEven.digitEvensPercentage ? 'Odd Dominant' : 'Even Dominant'
      ],
      [
        'First Prize Draw Ending Digit (Last Digit)',
        `${stats.oddVsEven.firstPrizeOddsCount} draws`,
        `${stats.totalDraws > 0 ? Math.round((stats.oddVsEven.firstPrizeOddsCount / stats.totalDraws) * 100) : 0}%`,
        `${stats.oddVsEven.firstPrizeEvensCount} draws`,
        `${stats.totalDraws > 0 ? Math.round((stats.oddVsEven.firstPrizeEvensCount / stats.totalDraws) * 100) : 0}%`,
        stats.oddVsEven.firstPrizeOddsCount > stats.oddVsEven.firstPrizeEvensCount ? 'Odd Ending' : 'Even Ending'
      ]
    ];

    autoTable(doc, {
      startY: currentY + 7,
      margin: { left: 10, right: 10 },
      head: [['Dimension / Level', 'Odd (Taaq) Count', 'Odd %', 'Even (Juft) Count', 'Even %', 'Dominance']],
      body: rows,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42], fontStyle: 'bold', fontSize: 8 },
      styles: { fontSize: 8, cellPadding: 3, font: 'helvetica' }
    });

    finalizePagesAndFooter(doc);

    const filename = `Thailand_Odd_Even_Analysis_${new Date().toISOString().split('T')[0]}.pdf`;
    return await savePdfDocument(doc, filename);
  } catch (err: any) {
    console.error('Error generating Odd vs Even PDF:', err);
    return { success: false, error: err?.message || 'طاق و جفت پی ڈی ایف بنانے میں خرابی پیش آئی۔' };
  }
}

/**
 * Generates Section PDF: Filtered Historical Draw Records.
 */
export async function generateThaiDrawRecordsPDF(
  filteredDraws: ThaiLotteryResult[],
  context: ThaiPdfFilterContext
): Promise<{ success: boolean; error?: string }> {
  try {
    const doc = new jsPDF() as any;
    const labels = getThaiFilterLabels(context, filteredDraws);

    drawHeaderBanner(doc, 'Thailand Lottery - Filtered Historical Draw Records');

    let currentY = drawMetadataBox(doc, 40, labels, `Filtered Draw Records (${filteredDraws.length} Draws)`);

    if (filteredDraws.length === 0) {
      doc.setFontSize(10);
      doc.setTextColor(220, 38, 38);
      doc.text('No historical records match the selected date/month/year filter.', 105, currentY + 20, { align: 'center' });
      finalizePagesAndFooter(doc);
      return await savePdfDocument(doc, `Thai_Records_Empty_${new Date().toISOString().split('T')[0]}.pdf`);
    }

    const drawRows = filteredDraws.map((d, index) => {
      const parsed = parseThaiDrawDate(d.date);
      const tag = parsed.is1st ? '1st Draw' : parsed.is16th ? '16th Draw' : 'Draw';
      const secondPrizesStr = Array.isArray(d.secondPrizes) && d.secondPrizes.length > 0
        ? d.secondPrizes.join(', ')
        : '--';

      return [
        index + 1,
        d.date || '--',
        `${tag} | ${d.drawNo || 'Bangkok'}`,
        d.firstPrize || '--',
        `F: ${d.front3Digits || '-'} | B: ${d.back3Digits || '-'}`,
        d.last2Digits || '--',
        secondPrizesStr
      ];
    });

    autoTable(doc, {
      startY: currentY + 4,
      margin: { left: 10, right: 10 },
      head: [['Sr #', 'Draw Date', 'Draw Details', '1st Prize', '3 Digits (F/B)', 'L2 (Down)', '2nd Prizes']],
      body: drawRows,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42], fontStyle: 'bold', fontSize: 7.5 },
      styles: { fontSize: 7, cellPadding: 2, font: 'helvetica' },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 20, fontStyle: 'bold' },
        3: { cellWidth: 22, fontStyle: 'bold', textColor: [220, 38, 38], halign: 'center' },
        4: { cellWidth: 26, halign: 'center' },
        5: { cellWidth: 18, fontStyle: 'bold', textColor: [79, 70, 229], halign: 'center' }
      }
    });

    finalizePagesAndFooter(doc);

    const filename = `Thailand_Historical_Records_${new Date().toISOString().split('T')[0]}.pdf`;
    return await savePdfDocument(doc, filename);
  } catch (err: any) {
    console.error('Error generating Draw Records PDF:', err);
    return { success: false, error: err?.message || 'ڈرا ریکارڈز پی ڈی ایف بنانے میں خرابی پیش آئی۔' };
  }
}
