import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Booking } from '../types';
import { Filesystem, Directory } from '@capacitor/filesystem';

export async function generateBookingPDF(
  customerName: string,
  customerEmail: string,
  customerPhone: string,
  customerCity: string,
  bookings: Booking[],
  category: 'pakistan_bond' | 'thailand_lottery'
) {
  const doc = new jsPDF() as any; // Cast as any to bypass internal plugin issues if TypeScript complains

  const titleEnglish = category === 'pakistan_bond' ? 'PAKISTAN BOND BOOKING SHEET' : 'THAILAND LOTTERY BOOKING SHEET';
  const titleUrdu = category === 'pakistan_bond' ? 'پاکستان بانڈ بکنگ شیٹ' : 'تھائی لینڈ لاٹری بکنگ شیٹ';

  // Header banner
  doc.setFillColor(15, 23, 42); // Primary Dark grey State Blue
  doc.rect(0, 0, 210, 35, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('MASTERMIND QURESHI ENTERPRISE', 105, 15, { align: 'center' });
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`${titleEnglish} - ${titleUrdu}`, 105, 25, { align: 'center' });

  // Customer Information Box
  doc.setFillColor(248, 250, 252);
  doc.rect(10, 42, 190, 32, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(10, 42, 190, 32);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('CUSTOMER PROFILE (کسٹمر پروفائل)', 15, 48);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Name (نام): ${customerName}`, 15, 55);
  doc.text(`Phone (موبائل نمبر): ${customerPhone}`, 15, 61);
  doc.text(`City (شہر): ${customerCity}`, 15, 67);
  doc.text(`Email (ایمیل): ${customerEmail}`, 110, 55);
  doc.text(`Date of Issue: ${new Date().toLocaleString()}`, 110, 61);
  doc.text(`Total Bookings: ${bookings.length}`, 110, 67);

  // Table header
  const tableRows = bookings.map((b, index) => [
    index + 1,
    b.number,
    `Rs. ${b.firstAmount.toLocaleString()}`,
    `Rs. ${b.secondAmount.toLocaleString()}`,
    `Rs. ${(b.firstAmount + b.secondAmount).toLocaleString()}`,
    new Date(b.timestamp).toLocaleTimeString()
  ]);

  const totalFirst = bookings.reduce((sum, b) => sum + b.firstAmount, 0);
  const totalSecond = bookings.reduce((sum, b) => sum + b.secondAmount, 0);
  const grandTotal = totalFirst + totalSecond;

  // Append total row
  tableRows.push([
    'Total',
    '--',
    `Rs. ${totalFirst.toLocaleString()}`,
    `Rs. ${totalSecond.toLocaleString()}`,
    `Rs. ${grandTotal.toLocaleString()}`,
    '--'
  ]);

  // Construct table using jspdf-autotable
  autoTable(doc, {
    startY: 80,
    head: [['Sr #', 'Number (نمبر)', 'First Prize (فرسٹ)', 'Second Prize (سیکنڈ)', 'Sub Total (کل رقم)', 'Time (وقت)']],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [15, 23, 42], fontStyle: 'bold' },
    footStyles: { fillColor: [241, 196, 15] },
    styles: { fontSize: 9, cellPadding: 3, font: 'helvetica' },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { fontStyle: 'bold', textColor: [220, 38, 38] }, // highlight the secret booking numbers in red!
    },
    didParseCell: function(data: any) {
      // Bold the last row (Totals)
      if (data.row.index === bookings.length) {
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.textColor = [15, 23, 42];
        if (data.column.index === 4) {
          data.cell.styles.fillColor = [252, 211, 77]; // beautiful gold background for total amount
        }
      }
    }
  });

  // Footer Disclaimer
  const finalY = doc.lastAutoTable.finalY || 150;
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('This is an official receipt of bookings with MasterMind Qureshi Enterprise.', 105, finalY + 15, { align: 'center' });
  doc.text('Please verify your profile email in final logs.', 105, finalY + 20, { align: 'center' });

  // Save the PDF (Android Capacitor)
  const filename = `${category}_${customerName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;

  const pdfBase64 = doc.output('datauristring').split(',')[1];

  await Filesystem.writeFile({
    path: filename,
    data: pdfBase64,
    directory: Directory.Documents
  });

  alert('✓ PDF فائل Documents فولڈر میں محفوظ ہو گئی ہے!');
}

const urduToEnglishCity: Record<string, string> = {
  'پشاور': 'Peshawar',
  'اسلام آباد': 'Islamabad',
  'لاہور': 'Lahore',
  'کراچی': 'Karachi',
  'کوئٹہ': 'Quetta',
  'راولپنڈی': 'Rawalpindi',
  'فیصل آباد': 'Faisalabad',
  'ملتان': 'Multan',
  'حیدرآباد': 'Hyderabad',
  'مظفرآباد': 'Muzaffarabad',
  'گوجرانوالہ': 'Gujranwala',
  'بہاولپور': 'Bahawalpur',
  'سیالکوٹ': 'Sialkot',
  'سکھر': 'Sukkur',
  'گوادر': 'Gwadar',
  'بنکاک': 'Bangkok'
};

function translateCity(city: string): string {
  if (!city) return '--';
  const trimmed = city.trim();
  return urduToEnglishCity[trimmed] || trimmed;
}

function translateDrawNo(drawNo: string): string {
  if (!drawNo) return '';
  return drawNo.replace(/ڈرا نمبر/g, 'Draw No.');
}

export async function generateDrawHistoryPDF(
  draws: any[],
  category: 'all' | 'pakistan_bond' | 'thailand_lottery'
) {
  const doc = new jsPDF() as any;

  let titleEnglish = 'HISTORICAL DRAW RESULTS RECORD';
  if (category === 'pakistan_bond') {
    titleEnglish = 'PAKISTAN PRIZE BOND DRAW HISTORY';
  } else if (category === 'thailand_lottery') {
    titleEnglish = 'THAILAND LOTTERY DRAW HISTORY';
  }

  // Header banner
  doc.setFillColor(15, 23, 42); // Primary Dark grey State Blue
  doc.rect(0, 0, 210, 35, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('MASTERMIND QURESHI ENTERPRISE', 105, 15, { align: 'center' });
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`${titleEnglish}`, 105, 25, { align: 'center' });

  // Filter Information Box
  doc.setFillColor(248, 250, 252);
  doc.rect(10, 42, 190, 24, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(10, 42, 190, 24);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('REPORT DETAILS', 15, 48);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Category: ${category === 'all' ? 'All Records' : category === 'pakistan_bond' ? 'Pakistan Prize Bond' : 'Thailand Lottery'}`, 15, 55);
  doc.text(`Total Records: ${draws.length}`, 15, 61);
  doc.text(`Generated Date: ${new Date().toLocaleString()}`, 110, 55);
  doc.text('Authorized: MasterMind Qureshi AI Portal', 110, 61);

  // Table header
  const tableRows = draws.map((d, index) => [
    index + 1,
    translateDrawNo(d.drawNo),
    d.category === 'pakistan_bond' ? 'Pakistan Bond' : 'Thai Lottery',
    d.firstPrize,
    Array.isArray(d.secondPrizes) ? d.secondPrizes.join(', ') : d.secondPrizes,
    translateCity(d.city),
    d.date
  ]);

  // Construct table using jspdf-autotable
  autoTable(doc, {
    startY: 72,
    head: [['Sr #', 'Draw/Scheme', 'Category', '1st Prize', '2nd Prizes', 'City', 'Date']],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [15, 23, 42], fontStyle: 'bold' },
    styles: { fontSize: 8, cellPadding: 2.5, font: 'helvetica' },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { fontStyle: 'bold', textColor: [15, 23, 42], cellWidth: 45 },
      3: { fontStyle: 'bold', textColor: [220, 38, 38], fontSize: 9 }, // bold red 1st prize
      4: { cellWidth: 50 }, // Second prizes can be long
      5: { cellWidth: 20 }
    }
  });

  // Footer
  const finalY = doc.lastAutoTable.finalY || 150;
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('This history report is fetched directly from MasterMind Qureshi Enterprise database.', 105, finalY + 12, { align: 'center' });

  // Save the PDF
  const filename = `${category}_history_record_${new Date().toISOString().split('T')[0]}.pdf`;
  const pdfBase64 = doc.output('datauristring').split(',')[1];

  await Filesystem.writeFile({
    path: filename,
    data: pdfBase64,
    directory: Directory.Documents
  });

  alert('✓ رزلٹ PDF فائل Documents فولڈر میں محفوظ ہو گئی ہے!');
}
