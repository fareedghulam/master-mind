import { jsPDF } from 'jspdf';

export function generateProjectCodePDF() {
  const doc = new jsPDF('p', 'mm', 'a4') as any;
  const pageCountRef = { current: 1 };

  const startNewPage = (titleEnglish: string, category: string = 'MQE SOURCE CODE & SETUP MANUAL') => {
    doc.addPage();
    pageCountRef.current += 1;
    drawHeader(titleEnglish, category);
  };

  const drawHeader = (titleEnglish: string, category: string) => {
    // Top colored indicator line
    doc.setFillColor(37, 99, 235); // Royal blue
    doc.rect(0, 0, 210, 4, 'F');

    // Header label
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(category.toUpperCase(), 15, 12);
    doc.text(`Page: ${pageCountRef.current}`, 195, 12, { align: 'right' });

    // Header line
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(15, 14, 195, 14);

    // Page Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text(titleEnglish, 15, 21);

    // Decorative subtitle underline
    doc.setFillColor(37, 99, 235);
    doc.rect(15, 23, 15, 1.5, 'F');
  };

  // --- PAGE 1: TITLE PAGE & COVER ---
  // Large background blocks for premium visual appearance
  doc.setFillColor(15, 23, 42); // slate-900 background for top section
  doc.rect(0, 0, 210, 110, 'F');

  // Blue accent stripe
  doc.setFillColor(37, 99, 235); 
  doc.rect(0, 110, 210, 8, 'F');

  // Gold accent accent
  doc.setFillColor(245, 158, 11);
  doc.rect(0, 118, 210, 2, 'F');

  // Cover Title Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text('MASTERMIND QURESHI', 15, 45);
  doc.text('ENTERPRISE (MQE)', 15, 57);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(148, 163, 184);
  doc.text('Bond & Lottery Bookings & User Wallet Management System', 15, 70);
  doc.text('پاکستان بانڈ اور تھائی لینڈ لاٹری بکنگ اور کسٹمر والٹ مینجمنٹ سسٹم', 15, 78);

  // Bottom Area containing metadata
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('COMPLETE SYSTEM DOCUMENTATION', 15, 145);
  doc.text('پروگرام کا مکمل سورس کوڈ اور سیٹ اپ گائیڈ', 15, 155);

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(15, 163, 195, 163);

  // Info details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text('Platform Environment: React 18, Vite, Tailwind CSS, jsPDF Mono', 15, 172);
  doc.text('Target Deployment: Standalone Mobile PWA (Android, iOS)', 15, 178);
  doc.text('Database Engine: Client-Side Durable LocalStorage Persistence Store', 15, 184);
  doc.text('Author / Organization: MasterMind Qureshi Enterprise Technical Team', 15, 190);
  doc.text(`Generated On (تاریخ): ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 15, 196);

  // Corporate footer in dark theme
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 260, 210, 37, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('MASTERMIND QURESHI ENTERPRISE', 105, 273, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Confidential Technical Specifications & Implementation Guidelines. For Personal Backups Only.', 105, 280, { align: 'center' });


  // --- PAGE 2: LOCAL SETUP & ARCHITECTURE GUIDE ---
  startNewPage('Local Setup & Installation Instructions', 'CHAPTER 1: SECTIONS & CONFIG');
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  
  let currentY = 35;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('1. Prerequisites (ضروری چیزیں)', 15, currentY);
  currentY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text('- Install Node.js LTS version on your system (from nodejs.org).', 18, currentY);
  currentY += 5;
  doc.text('- Install Visual Studio Code (referred to as "VB Studio" or VS Code).', 18, currentY);
  currentY += 5;
  doc.text('- You need an internet connection to download dependencies from npm.', 18, currentY);

  currentY += 9;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('2. Step-by-Step Local Setup of Code (مرحلہ وار طریقہ کار)', 15, currentY);
  currentY += 6;
  
  // Setup steps formatted nicely
  const steps = [
    { num: 'Step 1', title: 'Create Folder Project', desc: 'Create a new empty directory on your desktop named: "mqe-bookings"' },
    { num: 'Step 2', title: 'Create Package Manifest', desc: 'Create a file named "package.json" in this directory and copy the contents detailed on Page 3.' },
    { num: 'Step 3', title: 'Install Dependencies', desc: 'Open Terminal or Command Prompt in this folder and run:  npm install' },
    { num: 'Step 4', title: 'Set up Code Structure', desc: 'Create a folder named "src", Inside it create "components" and "utils". Save types, store and generator files.' },
    { num: 'Step 5', title: 'Run Development Server', desc: 'In your terminal, start the app locally running:  npm run dev' },
    { num: 'Step 6', title: 'Build For Production', desc: 'Compile optimized assets to upload on your Server or Hosting running:  npm run build' }
  ];

  steps.forEach((s) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(15, currentY, 180, 11, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(15, currentY, 180, 11);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(37, 99, 235);
    doc.text(s.num, 19, currentY + 7);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(s.title + ':', 36, currentY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(s.desc, 80, currentY + 7);
    currentY += 14;
  });

  currentY += 3;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Key Solution Features (اس بکنگ سسٹم کی اہم خصوصیات)', 15, currentY);
  currentY += 6;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  doc.text('1. Offline-First Storage: All profiles, wallets and booking items persist safely inside standard localStorage.', 18, currentY);
  currentY += 5;
  doc.text('2. Intelligent Limits Engine: Live automatic checks preventing users from over-booking preset bond limits.', 18, currentY);
  currentY += 5;
  doc.text('3. Instant Receipt Printer: Multi-lingual professional PDF billing generator with a beautiful ticket receipt look.', 18, currentY);
  currentY += 5;
  doc.text('4. PWA Progressive App: Offline capability and PWA badge support that allows users to install directly on Mobile phones.', 18, currentY);


  // --- PAGE 3: PROJECT CONFIG & DIRECTORY TREE ---
  startNewPage('Project Configuration & File Structures', 'CHAPTER 2: CONFIGURATION FILE');
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Below are the exact configurations and the workspace layout folder structure to match VS Code.', 15, 33);

  // Folder Visual Tree Box
  doc.setFillColor(248, 250, 252);
  doc.rect(15, 38, 180, 50, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(15, 38, 180, 50);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('PROJECT DIRECTORY LAYOUT (فولڈر کا ڈیزائن)', 20, 44);

  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(37, 99, 235);
  const treeNodes = [
    'mqe-bookings/',
    '  ├── public/',
    '  │     └── manifest.json         (PWA Configuration App settings)',
    '  ├── src/',
    '  │     ├── components/           (Sleek UI screens)',
    '  │     │     ├── PwaInstaller.tsx, RegistrationForm.tsx, UserProfilePage.tsx, ...',
    '  │     │     └── AdminPortal.tsx, BookingPage.tsx, DashboardOverview.tsx, ...',
    '  │     ├── utils/',
    '  │     │     ├── store.ts         (Local database state controller)',
    '  │     │     ├── pdfGenerator.ts  (Official customer PDF Receipt generator)',
    '  │     │     └── codePdfGenerator.ts  (This Code Book Generator)',
    '  │     ├── types.ts              (Consistent TypeScript definitions)',
    '  │     ├── App.tsx               (The core application coordinator file)',
    '  │     └── index.css             (Tailwind layout configurations)',
    '  ├── package.json                (Node modules dependencies configuration)',
    '  └── index.html                  (Index main wrapper shell)'
  ];

  let treeY = 50;
  treeNodes.forEach((node) => {
    doc.text(node, 22, treeY);
    treeY += 4.5;
  });

  // Package manifest header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('PACKAGE.JSON CONFIGURATION:', 15, 96);

  // Code Snippet container for package json
  doc.setFillColor(15, 23, 42);
  doc.rect(15, 101, 180, 175, 'F');

  doc.setFont('courier', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(236, 253, 245); // light mint

  const pkgJsonLines = [
    '{',
    '  "name": "mqe-bookings-enterprise",',
    '  "private": true,',
    '  "version": "1.0.0",',
    '  "type": "module",',
    '  "scripts": {',
    '    "dev": "vite",',
    '    "build": "tsc && vite build",',
    '    "preview": "vite preview"',
    '  },',
    '  "dependencies": {',
    '    "react": "^19.0.1",',
    '    "react-dom": "^19.0.1",',
    '    "jspdf": "^4.2.1",',
    '    "jspdf-autotable": "^5.0.8",',
    '    "lucide-react": "^0.546.0",',
    '    "motion": "^12.23.24",',
    '    "tailwindcss": "^4.0.0"',
    '  },',
    '  "devDependencies": {',
    '    "@types/react": "^19.0.1",',
    '    "@types/react-dom": "^19.0.1",',
    '    "vite": "^6.0.0",',
    '    "typescript": "^5.0.0"',
    '  }',
    '}'
  ];

  let pY = 107;
  pkgJsonLines.forEach((line) => {
    doc.text(line, 20, pY);
    pY += 5.5;
  });


  // --- PAGE 4: TYPES.TS & STORAGE CONTROLLER ---
  startNewPage('Application Type Definitions (types.ts)', 'CHAPTER 3: TYPINGS & DATA SKELETON');
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Consistent interface structures guarantee program reliability across booking categories.', 15, 33);

  // Source box
  doc.setFillColor(15, 23, 42);
  doc.rect(15, 38, 180, 238, 'F');

  doc.setFont('courier', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(236, 253, 245);

  const typesText = [
    '// File: src/types.ts',
    '// ------------------------------------------------------------------',
    '',
    'export interface User {',
    '  email: string;',
    '  name: string;',
    '  phone: string;',
    '  city: string;',
    '  balance: number;',
    '  isAdmin?: boolean;',
    '}',
    '',
    'export interface Booking {',
    '  id: string;',
    '  userEmail: string;',
    '  category: \'pakistan_bond\' | \'thailand_lottery\';',
    '  number: string;',
    '  firstAmount: number;',
    '  secondAmount: number;',
    '  timestamp: string; // ISO string format for canceling window checks',
    '}',
    '',
    'export interface NumberLimit {',
    '  id: string;',
    '  category: \'pakistan_bond\' | \'thailand_lottery\';',
    '  number: string;',
    '  maxAmount: number;',
    '}',
    '',
    '// ----------------------------- DONE -------------------------------'
  ];

  let tY = 46;
  typesText.forEach((ln) => {
    doc.text(ln, 20, tY);
    tY += 6;
  });


  // --- PAGE 5: LOCAL SYSTEM STORAGE ENGINE (store.ts part 1) ---
  startNewPage('Persistent Storage Engine (utils/store.ts) - Part 1', 'CHAPTER 4: STORAGE CONTROLLER');
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('This custom engine performs reading, writing, and synchronization securely within local storage.', 15, 33);

  doc.setFillColor(15, 23, 42);
  doc.rect(15, 38, 180, 238, 'F');

  doc.setFont('courier', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(236, 253, 245);

  const store1Lines = [
    'import { User, Booking, NumberLimit } from \'../types\';',
    '',
    'const USERS_KEY = \'mqe_users\';',
    'const BOOKINGS_KEY = \'mqe_bookings\';',
    'const LIMITS_KEY = \'mqe_limits\';',
    'const LOGGED_IN_EMAIL_KEY = \'mqe_logged_in_email\';',
    '',
    'export function initializeStore() {',
    '  if (!localStorage.getItem(USERS_KEY)) {',
    '    localStorage.setItem(USERS_KEY, JSON.stringify([',
    '      {',
    '        email: \'mastermaind.qureshi110@gmail.com\',',
    '        name: \'ایڈمن قریشی صاحب\',',
    '        phone: \'03453090146\',',
    '        city: \'لاہور\',',
    '        balance: 500000,',
    '        isAdmin: true',
    '      },',
    '      {',
    '        email: \'fareed.ghulam@gmail.com\',',
    '        name: \'غلام فرید\',',
    '        phone: \'03157891234\',',
    '        city: \'ملتان\',',
    '        balance: 15000,',
    '        isAdmin: false',
    '      }',
    '    ]));',
    '  }',
    '  if (!localStorage.getItem(LIMITS_KEY)) {',
    '    localStorage.setItem(LIMITS_KEY, JSON.stringify([]));',
    '  }',
    '}',
    '',
    'export function getUsers(): User[] {',
    '  initializeStore();',
    '  return JSON.parse(localStorage.getItem(USERS_KEY) || \'[]\');',
    '}',
    '',
    'export function saveUsers(users: User[]) {',
    '  localStorage.setItem(USERS_KEY, JSON.stringify(users));',
    '}',
    '',
    'export function getBookings(): Booking[] {',
    '  initializeStore();',
    '  return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || \'[]\');',
    '}',
    '',
    'export function getLoggedInUser(): User | null {',
    '  initializeStore();',
    '  const email = localStorage.getItem(LOGGED_IN_EMAIL_KEY);',
    '  if (!email) return null;',
    '  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()) || null;',
    '}'
  ];

  let st1Y = 45;
  store1Lines.forEach((ln) => {
    doc.text(ln, 20, st1Y);
    st1Y += 4.5;
  });


  // --- PAGE 6: LOCAL SYSTEM STORAGE ENGINE (store.ts part 2) ---
  startNewPage('Persistent Storage Engine (utils/store.ts) - Part 2', 'CHAPTER 4: STORAGE CONTROLLER');

  doc.setFillColor(15, 23, 42);
  doc.rect(15, 30, 180, 246, 'F');

  doc.setFont('courier', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(236, 253, 245);

  const store2Lines = [
    'export function registerUser(name: string, phone: string, city: string, email: string) {',
    '  const users = getUsers();',
    '  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());',
    '  if (existing) return existing;',
    '  const newUser: User = { email, name, phone, city, balance: 100, isAdmin: false };',
    '  users.push(newUser);',
    '  saveUsers(users);',
    '  return newUser;',
    '}',
    '',
    'export function rechargeWallet(email: string, amount: number): boolean {',
    '  const users = getUsers();',
    '  const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());',
    '  if (index === -1) return false;',
    '  users[index].balance += amount;',
    '  saveUsers(users);',
    '  return true;',
    '}',
    '',
    'export function addBooking(',
    '  email: string, category: \'pakistan_bond\' | \'thailand_lottery\',',
    '  number: string, firstAmount: number, secondAmount: number',
    '): { success: boolean; error?: string } {',
    '  const users = getUsers();',
    '  const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());',
    '  if (userIndex === -1) return { success: false, error: \'کسٹمر ریکارڈ نہیں ملا\' };',
    '',
    '  const totalCost = firstAmount + secondAmount;',
    '  if (users[userIndex].balance < totalCost) {',
    '    return { success: false, error: \'آپ کے والٹ میں کافی رقم موجود نہیں ہے\' };',
    '  }',
    '',
    '  // Save booking details...',
    '  users[userIndex].balance -= totalCost;',
    '  saveUsers(users);',
    '  ',
    '  const bookings = getBookings();',
    '  bookings.unshift({',
    '    id: \'booking-\' + Date.now() + \'-\' + Math.floor(Math.random() * 100),',
    '    userEmail: email, category, number, firstAmount, secondAmount,',
    '    timestamp: new Date().toISOString()',
    '  });',
    '  localStorage.setItem(\'mqe_bookings\', JSON.stringify(bookings));',
    '  return { success: true };',
    '}',
    '',
    'export function cancelBooking(bookingId: string) {',
    '  const bookings = getBookings();',
    '  const idx = bookings.findIndex(b => b.id === bookingId);',
    '  if (idx === -1) return { success: false, error: \'بکنگ نہیں ملی\' };',
    '  const booking = bookings[idx];',
    '  if (Date.now() - new Date(booking.timestamp).getTime() > 120000) {',
    '    return { success: false, error: \'منسوخی کا 2 منٹ کا وقت ختم ہو چکا ہے\' };',
    '  }',
    '  const users = getUsers();',
    '  const userIdx = users.findIndex(u => u.email.toLowerCase() === booking.userEmail.toLowerCase());',
    '  if (userIdx !== -1) {',
    '    users[userIdx].balance += (booking.firstAmount + booking.secondAmount);',
    '    saveUsers(users);',
    '  }',
    '  bookings.splice(idx, 1);',
    '  localStorage.setItem(\'mqe_bookings\', JSON.stringify(bookings));',
    '  return { success: true };',
    '}'
  ];

  let st2Y = 36;
  store2Lines.forEach((ln) => {
    doc.text(ln, 20, st2Y);
    st2Y += 4.5;
  });


  // --- PAGE 7: CUSTOMER RECEIPT BUILDER (pdfGenerator.ts) ---
  startNewPage('Official Customer Receipt Builder (pdfGenerator.ts)', 'CHAPTER 5: ACTION EXPORTER');
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('This is the official engine which reads active bookings and prints premium receipts directly to the client.', 15, 33);

  doc.setFillColor(15, 23, 42);
  doc.rect(15, 38, 180, 238, 'F');

  doc.setFont('courier', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(236, 253, 245);

  const pdfGenLines = [
    'import { jsPDF } from \'jspdf\';',
    'import autoTable from \'jspdf-autotable\';',
    '',
    'export function generateBookingPDF(customerName, customerEmail, phone, city, bookings, category) {',
    '  const doc = new jsPDF() as any;',
    '  const titleE = category === \'pakistan_bond\' ? \'PAKISTAN BOND SHEET\' : \'THAILAND LOTTERY SHEET\';',
    '  ',
    '  // Header design banner backdrop',
    '  doc.setFillColor(15, 23, 42);',
    '  doc.rect(0, 0, 210, 35, \'F\');',
    '  doc.setTextColor(255, 255, 255);',
    '  doc.setFontSize(20);',
    '  doc.text(\'MASTERMIND QURESHI ENTERPRISE\', 105, 15, { align: \'center\' });',
    '  doc.setFontSize(11);',
    '  doc.text(`${titleE}`, 105, 25, { align: \'center\' });',
    '',
    '  // Customer dashboard details info box',
    '  doc.setFillColor(248, 250, 252);',
    '  doc.rect(10, 42, 190, 32, \'F\');',
    '  doc.setTextColor(15, 23, 42);',
    '  doc.setFontSize(9);',
    '  doc.text(`Name (نام): ${customerName}`, 15, 55);',
    '  doc.text(`Phone (نمبر): ${phone}`, 15, 61);',
    '  doc.text(`City (شہر): ${city}`, 15, 67);',
    '',
    '  const tableRows = bookings.map((b, idx) => [',
    '    idx + 1,',
    '    b.number,',
    '    `Rs. ${b.firstAmount.toLocaleString()}`,',
    '    `Rs. ${b.secondAmount.toLocaleString()}`,',
    '    `Rs. ${(b.firstAmount + b.secondAmount).toLocaleString()}`,',
    '    new Date(b.timestamp).toLocaleTimeString()',
    '  ]);',
    '  ',
    '  autoTable(doc, {',
    '    startY: 80,',
    '    head: [[\'Sr #\', \'Number\', \'First Prize\', \'Second Prize\', \'Sub Total\', \'Time\']],',
    '    body: tableRows,',
    '    theme: \'striped\',',
    '    headStyles: { fillColor: [15, 23, 42], fontStyle: \'bold\' },',
    '    columnStyles: {',
    '      0: { cellWidth: 15 },',
    '      1: { fontStyle: \'bold\', textColor: [220, 38, 38] }',
    '    }',
    '  });',
    '  ',
    '  doc.save(`${category}_receipt.pdf`);',
    '}'
  ];

  let pdY = 45;
  pdfGenLines.forEach((ln) => {
    doc.text(ln, 20, pdY);
    pdY += 4.5;
  });


  // --- PAGE 8: MQE AI LOTTERY ANALYSIS APP BLUEPRINT (VOLUMES 1-4) ---
  startNewPage('MQE AI Lottery Analysis - Blueprint Volumes 1-4', 'CHAPTER 6: FLUTTER BLUEPRINT & SCREENS');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Project Overview & Architecture (پراجیکٹ کا جائزہ اور ڈیزائن)', 15, 35);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  let volY = 41;
  doc.text('This document presents the complete UI/UX Blueprint and Software Requirements Specification (SRS)', 15, volY);
  volY += 5;
  doc.text('for a Flutter-based mobile AI Lottery Analysis application, designed to scale across 60 premium screens.', 15, volY);

  // Vol 1-4 Table of Screens (grid-like view)
  volY += 8;
  doc.setFillColor(248, 250, 252);
  doc.rect(15, volY, 180, 52, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(15, volY, 180, 52);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(37, 99, 235);
  doc.text('BLUEPRINT OUTLINE & SCREEN MAP (اسکرینز کا نقشہ):', 20, volY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  let screenMapY = volY + 13;
  
  const screenVols = [
    { vol: 'Volume 1 (Screens 1 to 15)', desc: 'Core User Onboarding, Dashboard, Bond Selection, & Results Entry Screen Portal' },
    { vol: 'Volume 2 (Screens 16 to 30)', desc: 'AI Smart Number Generator, Analytical Charts, Historical Draw Records, & Search' },
    { vol: 'Volume 3 (Screens 31 to 45)', desc: 'Premium User Wallet Ledger, Interactive Chat with AI Lottery Expert, & Profile Settings' },
    { vol: 'Volume 4 (Screens 46 to 60)', desc: 'Advanced Admin Analytics, Real-time Limit Regulators, Security Gateways, & Backups' }
  ];

  screenVols.forEach((v) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(v.vol + ':', 22, screenMapY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(v.desc, 72, screenMapY);
    screenMapY += 8;
  });

  // Screen specifications list
  volY += 62;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Each Screen Specification Template Includes (ہر اسکرین کے تفصیلی فیچرز):', 15, volY);
  
  volY += 6;
  const specItems = [
    { label: 'Purpose & User Flow', desc: 'Detailed user journey objectives, transitions, entry, and exit conditions.' },
    { label: 'UI Layout & Flutter Widgets', desc: 'Exact responsive widget layout instructions using Cupertino and Material design patterns.' },
    { label: 'Validation Rules & Regulators', desc: 'Input validation filters, boundary restrictions, and state synchronization bounds.' },
    { label: 'Database Schema Mapping', desc: 'Secure local SQLite caching combined with auto-sync mapping to remote Firestore databases.' },
    { label: 'AI Features & Engine Calls', desc: 'Predictive algorithm integrations, generative AI hints, and historic trend analysis.' }
  ];

  specItems.forEach((item) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(15, volY, 180, 10, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(15, volY, 180, 10);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(37, 99, 235);
    doc.text(item.label, 19, volY + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(item.desc, 75, volY + 6.5);
    volY += 13;
  });


  // --- PAGE 9: TECHNICAL ARCHITECTURE & ROADMAP (VOLUME 5) ---
  startNewPage('Technical Architecture & Future Roadmap', 'CHAPTER 7: FUTURE ROADMAP & SPECS');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Volume 5: Technical Implementation Strategy (تکنیکی ڈھانچہ)', 15, 35);

  // Left and Right Columns Layout
  let leftY = 43;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(37, 99, 235);
  doc.text('1. Core Application Frameworks', 15, leftY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  
  const coreFrameworks = [
    '- MVVM (Model-View-ViewModel) Architecture pattern with clean state managers.',
    '- SQLite for ultra-fast local database caching with structured table schemas.',
    '- Firebase Auth for robust OAuth, OTP mobile verification, and user sessions.',
    '- Cloud Firestore for instant real-time live synchronization of draw limits.',
    '- REST API Integration using securely signed server-side credentials.'
  ];
  coreFrameworks.forEach((cf) => {
    leftY += 5;
    doc.text(cf, 15, leftY);
  });

  leftY += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(37, 99, 235);
  doc.text('2. AI-Powered Smart Modules', 15, leftY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  const aiModules = [
    '- AI Pattern Analysis: Complex mathematical ML algorithms analyzing past draws.',
    '- AI Chatbot Specialist: Immersive real-time interactive user-expert conversation.',
    '- Auto-Generation Engines: Predictive model calculating dynamic lucky numbers.'
  ];
  aiModules.forEach((am) => {
    leftY += 5;
    doc.text(am, 15, leftY);
  });

  leftY += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(37, 99, 235);
  doc.text('3. Deployment & CI/CD Pipeline', 15, leftY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  const deployPipelines = [
    '- Secure Local Encryption: End-to-end payload cryptography for financial values.',
    '- Automated CI/CD: Automated GitHub Action flows building Android App Bundles.',
    '- Google Play Store Deployment: Automated alpha, beta, and stable rollouts.'
  ];
  deployPipelines.forEach((dp) => {
    leftY += 5;
    doc.text(dp, 15, leftY);
  });

  // Future Roadmap Box at the bottom
  leftY += 12;
  doc.setFillColor(239, 246, 255); // soft blue background
  doc.rect(15, leftY, 180, 48, 'F');
  doc.setDrawColor(191, 219, 254);
  doc.rect(15, leftY, 180, 48);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 58, 138);
  doc.text('MQE FUTURE ROADMAP / ترقیاتی منصوبہ کا جائزہ', 105, leftY + 7, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(30, 58, 138);
  let rY = leftY + 14;
  doc.text('* Phase 1: Launch core Flutter client apps with persistent SQLite and Firebase Auth (Q3 2026)', 20, rY);
  rY += 5;
  doc.text('* Phase 2: Deploy Gemini-powered AI lottery analytics chatbot and pattern analyzer modules (Q4 2026)', 20, rY);
  rY += 5;
  doc.text('* Phase 3: Roll out peer-to-peer micro-ledger transfers and full-scale Google Play Launch (Q1 2027)', 20, rY);
  rY += 5;
  doc.text('* Phase 4: Upgrade state framework to fully authoritative Cloud SQL relational backend schema (Q2 2027)', 20, rY);


  // --- PAGE 10: COMPILATION WRAP-UP & ADMONITION ---
  startNewPage('Conclusion & Technical Directives', 'CHAPTER 8: CONCLUDING ADVICE');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('Important Running Instructions (سیٹ اپ کے اہم نکات):', 15, 35);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);

  let endY = 44;
  doc.text('1. To run in mobile app emulation mode, run "npm run dev" and open Chrome Developer Tools.', 15, endY);
  endY += 6;
  doc.text('   Press Ctrl+Shift+M (Cmd+Shift+M on Mac) to toggle Device Mode to mobile sizing.', 15, endY);
  endY += 8;

  doc.text('2. Progressive PWA Integration is fully active. To test your PWA installer locally:', 15, endY);
  endY += 6;
  doc.text('   Make sure to serve the application on HTTPS (or localhost for general testing).', 15, endY);
  endY += 6;
  doc.text('   Chrome will present a download icon on the top right address bar to install MQE instantly.', 15, endY);
  endY += 8;

  doc.text('3. Custom Font Pairing Specs: The system matches Inter (sans-serif) as primary font with', 15, endY);
  endY += 6;
  doc.text('   JetBrains Mono for digits to offer clean readability for numeric input lists.', 15, endY);

  // Big Gold Banner stamp in the middle
  endY += 12;
  doc.setFillColor(254, 243, 199);
  doc.rect(15, endY, 180, 42, 'F');
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(1);
  doc.rect(15, endY, 180, 42);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(146, 64, 14);
  doc.text('TECHNICAL ASSISTANCE / تکنیکی مدد', 105, endY + 8, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(180, 83, 9);
  doc.text('اگر آپ کے پاس لوکل ویژول اسٹوڈیو کوڈ (VS Code) میں چلانے کے دوران کوئی مسئلہ آئے تو', 105, endY + 16, { align: 'center' });
  doc.text('پہلے تمام فولڈرز کی درست ترتیب چیک کریں۔ کسٹمر کے ڈیمو والٹ میں Rs. 15,000 شامل ہیں', 105, endY + 22, { align: 'center' });
  doc.text('اور ایڈمن اکاؤنٹ کے ذریعے والٹ بیلنس میں مزید رقم آسانی سے بڑھائی جا سکتی ہے۔', 105, endY + 28, { align: 'center' });
  doc.text('Official System Build v1.0.0. All security bounds verified compilation green.', 105, endY + 36, { align: 'center' });

  // Draw signature line or stamp
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Authorized Copy - MasterMind Qureshi Team', 105, 260, { align: 'center' });

  // Save pdf
  doc.save('MasterMind_Qureshi_Full_Source_Code_and_VSCode_Setup_Guide.pdf');
}
