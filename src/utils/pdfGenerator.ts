import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Booking, DrawCategory } from '../types';

/**
 * Universal safe PDF saver that handles standard browser downloads,
 * Android WebView environments, Blob creation, and mobile fallbacks.
 */
function savePdfDocument(doc: any, filename: string): { success: boolean; error?: string } {
  try {
    const cleanFilename = (filename || 'Document.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
    
    // 1. Try native jsPDF save method
    if (typeof doc.save === 'function') {
      try {
        doc.save(cleanFilename);
      } catch (saveErr) {
        console.warn('[savePdfDocument] jsPDF doc.save threw error, attempting fallback:', saveErr);
      }
    }

    // 2. Fallback / Universal blob anchor for WebView and mobile browsers
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      try {
        const blob = doc.output('blob');
        if (blob) {
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = cleanFilename;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            try {
              document.body.removeChild(link);
              window.URL.revokeObjectURL(blobUrl);
            } catch (cleanupErr) {
              // Ignore DOM cleanup error
            }
          }, 1500);
        }
      } catch (blobErr) {
        console.warn('[savePdfDocument] Blob creation failed, attempting dataurl fallback:', blobErr);
        try {
          doc.output('dataurlnewwindow');
        } catch (dataurlErr) {
          console.error('[savePdfDocument] All PDF export mechanisms failed:', dataurlErr);
        }
      }
    }

    return { success: true };
  } catch (err: any) {
    console.error('[savePdfDocument] Unhandled exception during PDF export:', err);
    return { success: false, error: err?.message || 'پی ڈی ایف فائل محفوظ کرنے میں ناکامی ہوئی۔' };
  }
}

export function generateBookingPDF(
  customerName: string,
  customerEmail: string,
  customerPhone: string,
  customerCity: string,
  bookings: Booking[],
  category: DrawCategory | 'unified' | string
): { success: boolean; error?: string } {
  try {
    const doc = new jsPDF() as any;

    const safeName = customerName || 'Customer';
    const safeEmail = customerEmail || 'N/A';
    const safePhone = customerPhone || '--';
    const safeCity = customerCity || '--';
    const safeCategory = category || 'pakistan_bond';
    const safeBookings = Array.isArray(bookings) ? bookings : [];

    const titleEnglishMap: Record<string, string> = {
      pakistan_bond: 'PAKISTAN BOND BOOKING SHEET',
      thailand_lottery: 'THAILAND LOTTERY BOOKING SHEET'
    };

    const titleUrduMap: Record<string, string> = {
      pakistan_bond: 'پاکستان بانڈ بکنگ شیٹ',
      thailand_lottery: 'تھائی لینڈ لاٹری بکنگ شیٹ'
    };

    const titleEnglish = titleEnglishMap[safeCategory] || 'PRIZE BOND BOOKING SHEET';
    const titleUrdu = titleUrduMap[safeCategory] || 'پرائز بانڈ بکنگ شیٹ';

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
    doc.text(`Name (نام): ${safeName}`, 15, 55);
    doc.text(`Phone (موبائل نمبر): ${safePhone}`, 15, 61);
    doc.text(`City (شہر): ${safeCity}`, 15, 67);
    doc.text(`Email (ایمیل): ${safeEmail}`, 110, 55);
    doc.text(`Date of Issue: ${new Date().toLocaleString()}`, 110, 61);
    doc.text(`Total Bookings: ${safeBookings.length}`, 110, 67);

    const isPak = safeCategory === 'pakistan_bond';
    
    // Table header
    const tableHeaders = isPak
      ? [['Sr #', 'Bond / Draw Details', 'Number', 'First Prize', 'Second Prize', 'Sub Total', 'Time']]
      : [['Sr #', 'Number (نمبر)', 'First Prize (فرسٹ)', 'Second Prize (سیکنڈ)', 'Sub Total (کل رقم)', 'Time (وقت)']];

    const tableRows = safeBookings.map((b, index) => {
      const drawInfo = [
        b.bondValue ? (b.bondValue.startsWith('Rs') ? b.bondValue : `Rs. ${b.bondValue}`) : '',
        b.drawNumber ? (b.drawNumber.includes('Draw') ? b.drawNumber : `Draw #${b.drawNumber}`) : '',
        b.drawCity || '',
        b.drawDate || ''
      ].filter(Boolean).join(' | ') || 'Pakistan Prize Bond';

      const firstAmt = Number(b.firstAmount) || 0;
      const secAmt = Number(b.secondAmount) || 0;
      const subTotal = firstAmt + secAmt;
      const timeStr = b.timestamp ? new Date(b.timestamp).toLocaleTimeString() : '--';

      return isPak
        ? [
            index + 1,
            drawInfo,
            b.number || '--',
            `Rs. ${firstAmt.toLocaleString()}`,
            `Rs. ${secAmt.toLocaleString()}`,
            `Rs. ${subTotal.toLocaleString()}`,
            timeStr
          ]
        : [
            index + 1,
            b.number || '--',
            `Rs. ${firstAmt.toLocaleString()}`,
            `Rs. ${secAmt.toLocaleString()}`,
            `Rs. ${subTotal.toLocaleString()}`,
            timeStr
          ];
    });

    const totalFirst = safeBookings.reduce((sum, b) => sum + (Number(b.firstAmount) || 0), 0);
    const totalSecond = safeBookings.reduce((sum, b) => sum + (Number(b.secondAmount) || 0), 0);
    const grandTotal = totalFirst + totalSecond;

    // Append total row
    if (isPak) {
      tableRows.push([
        'Total',
        '--',
        '--',
        `Rs. ${totalFirst.toLocaleString()}`,
        `Rs. ${totalSecond.toLocaleString()}`,
        `Rs. ${grandTotal.toLocaleString()}`,
        '--'
      ]);
    } else {
      tableRows.push([
        'Total',
        '--',
        `Rs. ${totalFirst.toLocaleString()}`,
        `Rs. ${totalSecond.toLocaleString()}`,
        `Rs. ${grandTotal.toLocaleString()}`,
        '--'
      ]);
    }

    // Construct table using jspdf-autotable
    autoTable(doc, {
      startY: 80,
      head: tableHeaders,
      body: tableRows,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42], fontStyle: 'bold' },
      footStyles: { fillColor: [241, 196, 15] },
      styles: { fontSize: 8.5, cellPadding: 3, font: 'helvetica' },
      columnStyles: isPak ? {
        0: { cellWidth: 12 },
        1: { fontStyle: 'bold', textColor: [15, 23, 42], cellWidth: 50 },
        2: { fontStyle: 'bold', textColor: [220, 38, 38] },
      } : {
        0: { cellWidth: 15 },
        1: { fontStyle: 'bold', textColor: [220, 38, 38] },
      },
      didParseCell: function(data: any) {
        if (data.row.index === safeBookings.length) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.textColor = [15, 23, 42];
          const totalColIndex = isPak ? 5 : 4;
          if (data.column.index === totalColIndex) {
            data.cell.styles.fillColor = [252, 211, 77];
          }
        }
      }
    });

    // Footer Disclaimer
    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY || 150 : 150;
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('This is an official receipt of bookings with MasterMind Qureshi Enterprise.', 105, finalY + 15, { align: 'center' });
    doc.text('Please verify your profile email in final logs.', 105, finalY + 20, { align: 'center' });

    // Save the PDF
    const cleanCustomerName = safeName.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${safeCategory}_${cleanCustomerName}_${new Date().toISOString().split('T')[0]}.pdf`;
    return savePdfDocument(doc, filename);
  } catch (err: any) {
    console.error('Failed to generate booking PDF:', err);
    return { success: false, error: err?.message || 'بکنگ پی ڈی ایف بنانے میں خرابی پیش آئی۔' };
  }
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

export function generateDrawHistoryPDF(
  draws: any[],
  category: 'all' | 'pakistan_bond' | 'thailand_lottery'
): { success: boolean; error?: string } {
  try {
    const doc = new jsPDF() as any;
    const safeCategory = category || 'all';
    const safeDraws = Array.isArray(draws) ? draws : [];

    let titleEnglish = 'HISTORICAL DRAW RESULTS RECORD';
    if (safeCategory === 'pakistan_bond') {
      titleEnglish = 'PAKISTAN PRIZE BOND DRAW HISTORY';
    } else if (safeCategory === 'thailand_lottery') {
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
    doc.text(`Category: ${safeCategory === 'all' ? 'All Records' : safeCategory === 'pakistan_bond' ? 'Pakistan Prize Bond' : 'Thailand Lottery'}`, 15, 55);
    doc.text(`Total Records: ${safeDraws.length}`, 15, 61);
    doc.text(`Generated Date: ${new Date().toLocaleString()}`, 110, 55);
    doc.text('Authorized: MasterMind Qureshi AI Portal', 110, 61);

    // Table header
    const tableRows = safeDraws.map((d, index) => [
      index + 1,
      translateDrawNo(d.drawNo || ''),
      d.category === 'pakistan_bond' ? 'Pakistan Bond' : 'Thai Lottery',
      d.firstPrize || '--',
      Array.isArray(d.secondPrizes) ? d.secondPrizes.join(', ') : (d.secondPrizes || '--'),
      translateCity(d.city || ''),
      d.date || '--'
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
    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY || 150 : 150;
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('This history report is fetched directly from MasterMind Qureshi Enterprise database.', 105, finalY + 12, { align: 'center' });

    // Save the PDF
    const filename = `${safeCategory}_history_record_${new Date().toISOString().split('T')[0]}.pdf`;
    return savePdfDocument(doc, filename);
  } catch (err: any) {
    console.error('Failed to generate draw history PDF:', err);
    return { success: false, error: err?.message || 'ہسٹری پی ڈی ایف بنانے میں خرابی پیش آئی۔' };
  }
}

export function generateAdminBookingsPDF(
  reportTitle: string,
  bookings: Booking[],
  filterType: 'draw' | 'date' | 'all',
  filterValueLabel?: string
): { success: boolean; error?: string } {
  try {
    const doc = new jsPDF() as any;
    const safeTitle = reportTitle || 'All_Bookings';
    const safeBookings = Array.isArray(bookings) ? bookings : [];

    // Header banner
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 35, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('MASTERMIND QURESHI ENTERPRISE', 105, 14, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`ADMIN BOOKINGS REPORT - ${safeTitle.toUpperCase()}`, 105, 24, { align: 'center' });

    // Summary box
    doc.setFillColor(248, 250, 252);
    doc.rect(10, 40, 190, 26, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(10, 40, 190, 26);

    const totalFirst = safeBookings.reduce((sum, b) => sum + (Number(b.firstAmount) || 0), 0);
    const totalSecond = safeBookings.reduce((sum, b) => sum + (Number(b.secondAmount) || 0), 0);
    const grandTotal = totalFirst + totalSecond;

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('REPORT METRICS', 15, 46);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Filter Scope: ${(filterType || 'ALL').toUpperCase()} ${filterValueLabel ? `(${filterValueLabel})` : ''}`, 15, 53);
    doc.text(`Total Bookings Count: ${safeBookings.length}`, 15, 59);
    doc.text(`Generated Date: ${new Date().toLocaleString()}`, 110, 53);
    doc.text(`Grand Total Amount: Rs. ${grandTotal.toLocaleString()}`, 110, 59);

    // Table rows
    const tableRows = safeBookings.map((b, idx) => {
      const drawInfo = [
        b.bondValue ? (b.bondValue.startsWith('Rs') ? b.bondValue : `Rs. ${b.bondValue}`) : '',
        b.drawNumber ? `Draw #${b.drawNumber}` : '',
        b.drawCity || '',
        b.drawDate || ''
      ].filter(Boolean).join(' | ') || (b.category === 'pakistan_bond' ? 'Pakistan Prize Bond' : 'Thailand Lottery');

      const firstAmt = Number(b.firstAmount) || 0;
      const secAmt = Number(b.secondAmount) || 0;
      const subTotal = firstAmt + secAmt;
      const timeStr = b.timestamp ? new Date(b.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--';

      return [
        idx + 1,
        b.userEmail || '--',
        drawInfo,
        b.number || '--',
        `Rs. ${firstAmt.toLocaleString()}`,
        `Rs. ${secAmt.toLocaleString()}`,
        `Rs. ${subTotal.toLocaleString()}`,
        b.isArchived ? 'Archived' : 'Active',
        timeStr
      ];
    });

    // Append summary total row
    tableRows.push([
      'Total',
      '--',
      '--',
      '--',
      `Rs. ${totalFirst.toLocaleString()}`,
      `Rs. ${totalSecond.toLocaleString()}`,
      `Rs. ${grandTotal.toLocaleString()}`,
      '--',
      '--'
    ]);

    autoTable(doc, {
      startY: 72,
      head: [['Sr #', 'Customer Email', 'Draw / Scheme Details', 'Number', '1st Prize', '2nd Prize', 'Sub Total', 'Status', 'Time']],
      body: tableRows,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42], fontStyle: 'bold' },
      styles: { fontSize: 7.5, cellPadding: 2.5, font: 'helvetica' },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 42, fontStyle: 'bold' },
        2: { cellWidth: 42 },
        3: { fontStyle: 'bold', textColor: [220, 38, 38], cellWidth: 16 },
        4: { cellWidth: 18 },
        5: { cellWidth: 18 },
        6: { fontStyle: 'bold', cellWidth: 20 },
        7: { cellWidth: 14 },
        8: { cellWidth: 10 }
      },
      didParseCell: function(data: any) {
        if (data.row.index === safeBookings.length) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.textColor = [15, 23, 42];
          if (data.column.index === 6) {
            data.cell.styles.fillColor = [252, 211, 77];
          }
        }
      }
    });

    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY || 150 : 150;
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('MasterMind Qureshi Enterprise - Official Admin Record', 105, finalY + 12, { align: 'center' });

    const cleanTitle = safeTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `Admin_Bookings_${cleanTitle}_${new Date().toISOString().split('T')[0]}.pdf`;
    return savePdfDocument(doc, filename);
  } catch (err: any) {
    console.error('Failed to generate admin bookings PDF:', err);
    return { success: false, error: err?.message || 'ایڈمن بکنگ رپورٹ بنانے میں خرابی پیش آئی۔' };
  }
}
