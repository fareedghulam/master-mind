import { useState } from 'react';
import { FileCode, Clipboard, Check, Terminal, FolderDot, Laptop, HelpCircle } from 'lucide-react';
import { generateProjectCodePDF } from '../utils/codePdfGenerator';

export default function CodeGuidePanel() {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [activeFileTab, setActiveFileTab] = useState<string>('package');

  const copyToClipboard = (text: string, filename: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(filename);
    setTimeout(() => {
      setCopiedFile(null);
    }, 2000);
  };

  const codeFiles = {
    package: {
      name: 'package.json',
      path: './package.json',
      lang: 'json',
      desc: 'یہ فائل پروجیکٹ کے تمام انحصار (Dependencies) اور چلانے والی اسکرپٹس کا حساب رکھتی ہے۔',
      code: `{
  "name": "mqe-bookings-enterprise",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "jspdf": "^4.2.1",
    "jspdf-autotable": "^5.0.8",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "tailwindcss": "^4.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.1",
    "vite": "^6.0.0",
    "typescript": "^5.0.0"
  }
}`
    },
    types: {
      name: 'types.ts',
      path: './src/types.ts',
      lang: 'typescript',
      desc: 'یہ فائل پورے پروجیکٹ کے ڈیٹا ٹائپس (User, Booking, NumberLimit) کا فریم ورک متعین کرتی ہے۔',
      code: `export interface User {
  email: string;
  name: string;
  phone: string;
  city: string;
  balance: number;
  isAdmin?: boolean;
}

export interface Booking {
  id: string;
  userEmail: string;
  category: 'pakistan_bond' | 'thailand_lottery';
  number: string;
  firstAmount: number;
  secondAmount: number;
  timestamp: string; // ISO format string
}

export interface NumberLimit {
  id: string;
  category: 'pakistan_bond' | 'thailand_lottery';
  number: string;
  maxAmount: number;
}`
    },
    store: {
      name: 'store.ts',
      path: './src/utils/store.ts',
      lang: 'typescript',
      desc: 'یہ پروگرام کا لوکل ڈیٹا بیس انجن ہے جو ڈیٹا کو مستقل محفوظ رکھنے اور والٹ بیلنس چیک کرنے کا ذمہ دار ہے۔',
      code: `import { User, Booking, NumberLimit } from '../types';

const USERS_KEY = 'mqe_users';
const BOOKINGS_KEY = 'mqe_bookings';
const LIMITS_KEY = 'mqe_limits';
const LOGGED_IN_EMAIL_KEY = 'mqe_logged_in_email';

export function initializeStore() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([
      {
        email: 'mastermaind.qureshi110@gmail.com',
        name: 'ایڈمن قریشی صاحب',
        phone: '03453090146',
        city: 'لاہور',
        balance: 500000,
        isAdmin: true
      },
      {
        email: 'fareed.ghulam@gmail.com',
        name: 'غلام فرید',
        phone: '03157891234',
        city: 'ملتان',
        balance: 15000,
        isAdmin: false
      }
    ]));
  }
  if (!localStorage.getItem(LIMITS_KEY)) {
    localStorage.setItem(LIMITS_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(BOOKINGS_KEY)) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify([]));
  }
}

export function getUsers(): User[] {
  initializeStore();
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getBookings(): Booking[] {
  initializeStore();
  return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
}

export function getNumberLimits(): NumberLimit[] {
  initializeStore();
  return JSON.parse(localStorage.getItem(LIMITS_KEY) || '[]');
}

export function saveNumberLimits(limits: NumberLimit[]) {
  localStorage.setItem(LIMITS_KEY, JSON.stringify(limits));
}

export function getLoggedInUser(): User | null {
  initializeStore();
  const email = localStorage.getItem(LOGGED_IN_EMAIL_KEY);
  if (!email) return null;
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function setLoggedInUser(email: string | null) {
  if (email) {
    localStorage.setItem(LOGGED_IN_EMAIL_KEY, email);
  } else {
    localStorage.removeItem(LOGGED_IN_EMAIL_KEY);
  }
}

export function logout() {
  setLoggedInUser(null);
}

export function registerUser(name: string, phone: string, city: string, email: string): User {
  const users = getUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) return existing;
  
  const newUser: User = { email, name, phone, city, balance: 100, isAdmin: false };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function rechargeWallet(email: string, amount: number): boolean {
  const users = getUsers();
  const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (index === -1) return false;
  users[index].balance += amount;
  saveUsers(users);
  return true;
}

export function setOrUpdateLimit(category: 'pakistan_bond' | 'thailand_lottery', number: string, maxAmount: number) {
  const currentLimits = getNumberLimits();
  const idx = currentLimits.findIndex(l => l.category === category && l.number === number);
  if (idx !== -1) {
    currentLimits[idx].maxAmount = maxAmount;
  } else {
    currentLimits.push({
      id: 'limit-' + Date.now(),
      category,
      number,
      maxAmount
    });
  }
  saveNumberLimits(currentLimits);
}

export function deleteLimit(id: string) {
  const filtered = getNumberLimits().filter(l => l.id !== id);
  saveNumberLimits(filtered);
}

export function addBooking(
  email: string, category: 'pakistan_bond' | 'thailand_lottery',
  number: string, firstAmount: number, secondAmount: number
): { success: boolean; error?: string } {
  const users = getUsers();
  const userIdx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (userIdx === -1) return { success: false, error: 'کسٹمر ریکارڈ نہیں ملا' };

  const totalCost = firstAmount + secondAmount;
  if (users[userIdx].balance < totalCost) {
    return { success: false, error: 'آپ کے والٹ میں کافی رقم موجود نہیں ہے' };
  }

  // Check limit restrictions
  const currentLimits = getNumberLimits();
  const activeLimit = currentLimits.find(l => l.category === category && l.number === number);
  if (activeLimit) {
    const previousActiveBookingsSum = getBookings()
      .filter(b => b.category === category && b.number === number)
      .reduce((sum, current) => sum + current.firstAmount + current.secondAmount, 0);
    
    if (previousActiveBookingsSum + totalCost > activeLimit.maxAmount) {
      return { 
        success: false, 
        error: \`اس نمبر کی بکنگ لیمٹ ختم ہوچکی ہے۔ باقی گنجائش: Rs. \${Math.max(0, activeLimit.maxAmount - previousActiveBookingsSum).toLocaleString()}\` 
      };
    }
  }

  // Deduct user balance
  users[userIdx].balance -= totalCost;
  saveUsers(users);

  // Keep bookings local store
  const bookings = getBookings();
  const newBooking: Booking = {
    id: 'booking-' + Date.now() + '-' + Math.floor(Math.random() * 100),
    userEmail: email,
    category,
    number,
    firstAmount,
    secondAmount,
    timestamp: new Date().toISOString()
  };
  bookings.unshift(newBooking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));

  return { success: true };
}

export function cancelBooking(bookingId: string): { success: boolean; error?: string } {
  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.id === bookingId);
  if (idx === -1) return { success: false, error: 'بکنگ ریکارڈ نہیں ملا۔' };

  const booking = bookings[idx];
  // Calculate cancellation time window (e.g. 2 minutes)
  const duration = Date.now() - new Date(booking.timestamp).getTime();
  if (duration > 120000) {
    return { success: false, error: 'معذرت، بکنگ منسوخ کرنے کا 2 منٹ کا وقت گزر چکا ہے۔' };
  }

  // Refund wallet
  const users = getUsers();
  const userIdx = users.findIndex(u => u.email.toLowerCase() === booking.userEmail.toLowerCase());
  if (userIdx !== -1) {
    users[userIdx].balance += (booking.firstAmount + booking.secondAmount);
    saveUsers(users);
  }

  // Splice booking entry
  bookings.splice(idx, 1);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));

  return { success: true };
}`
    },
    pdf: {
      name: 'pdfGenerator.ts',
      path: './src/utils/pdfGenerator.ts',
      lang: 'typescript',
      desc: 'یہ کسٹمر کی رسید پرنٹ کرنے والی فائل ہے جو جے ایس پی ڈی ایف (jsPDF) ای لائیبریری کے ذریعے کام کرتی ہے۔',
      code: `import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Booking } from '../types';

export function generateBookingPDF(
  customerName: string,
  customerEmail: string,
  phone: string,
  city: string,
  bookings: Booking[],
  category: 'pakistan_bond' | 'thailand_lottery'
) {
  const doc = new jsPDF('p', 'mm', 'a4') as any;
  const isBond = category === 'pakistan_bond';
  const labelUrdu = isBond ? 'پاکستان بانڈ بکنگ شیٹ' : 'تھائی لینڈ لاٹری بکنگ شیٹ';
  const labelEng = isBond ? 'PAKISTAN BOND BOOKING SHEET' : 'THAILAND LOTTERY BOOKING SHEET';

  // Draw royal style top headers
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 32, 'F');

  doc.setFillColor(245, 158, 11); // amber-500
  doc.rect(0, 32, 210, 2, 'F');

  // Title text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('MASTERMIND QURESHI ENTERPRISE', 105, 14, { align: 'center' });
  doc.setFontSize(10);
  doc.text('FAST DIGITAL BOOKING RECEIPT ENGINE & DIGITAL LEDGER', 105, 21, { align: 'center' });
  doc.setFontSize(11);
  doc.setTextColor(245, 158, 11);
  doc.text(labelEng, 105, 27, { align: 'center' });

  // Customer metadata banner box
  doc.setFillColor(248, 250, 252);
  doc.rect(10, 40, 190, 36, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(10, 40, 190, 36);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('CUSTOMER STATEMENT / کسٹمر کی تفصیلات:', 14, 47);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text(\`Name (نام): \${customerName}\`, 14, 55);
  doc.text(\`Email (ای میل): \${customerEmail}\`, 14, 61);
  doc.text(\`Mobile (نمبر): \${phone}\`, 14, 67);
  doc.text(\`City (شہر): \${city}\`, 120, 55);
  doc.text(\`Category: \${isBond ? 'Pakistan Bond' : 'Thailand Lottery'}\`, 120, 61);
  doc.text(\`Date: \${new Date().toLocaleDateString()}\`, 120, 67);

  // Bookings list table mappings
  const heads = [['Sr #', 'Target Number', 'First Prize (Rs)', 'Second Prize (Rs)', 'Sub-Total (Rs)', 'Booking Timestamp']];
  let sumFirst = 0;
  let sumSecond = 0;

  const rows = bookings.map((b, index) => {
    sumFirst += b.firstAmount;
    sumSecond += b.secondAmount;
    return [
      index + 1,
      b.number,
      \`Rs. \${b.firstAmount.toLocaleString()}\`,
      \`Rs. \${b.secondAmount.toLocaleString()}\`,
      \`Rs. \${(b.firstAmount + b.secondAmount).toLocaleString()}\`,
      new Date(b.timestamp).toLocaleTimeString()
    ];
  });

  // Append total calculated row line info
  rows.push([
    'TOTAL',
    \`\${bookings.length} numbers\`,
    \`Rs. \${sumFirst.toLocaleString()}\`,
    \`Rs. \${sumSecond.toLocaleString()}\`,
    \`Rs. \${(sumFirst + sumSecond).toLocaleString()}\`,
    'Verified Ledger'
  ]);

  autoTable(doc, {
    startY: 83,
    head: heads,
    body: rows,
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold' },
    footStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      1: { fontStyle: 'bold', textColor: [220, 38, 38] },
      4: { fontStyle: 'bold' }
    }
  });

  // Footer visual block signature marks
  const finalY = (doc as any).lastAutoTable.finalY + 15;
  doc.setDrawColor(226, 232, 240);
  doc.line(10, finalY, 200, finalY);

  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text('* Note: Booking values are securely debited from user wallet pre-balance logs.', 10, finalY + 6);
  doc.text('This is an automatic electronic billing report authorized by MQE. No signature required.', 10, finalY + 11);

  doc.save(\`MQE_\${category}_booking_ledger.pdf\`);
}`
    },
    css: {
      name: 'index.css',
      path: './src/index.css',
      lang: 'css',
      desc: 'یہ فائل ٹیلونڈ سی ایس ایس (Tailwind CSS) کو کنفیگر کرتی ہے اور خوبصورت اور جدید فونٹس لاگو کرتی ہے۔',
      code: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", "Noto Nastaliq Urdu", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

/* Customized scrollbar design configuration */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 99px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}`
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-100 max-w-4xl mx-auto text-right font-sans">
      
      {/* Upper header */}
      <div className="border-b border-slate-100 pb-5 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          
          <button
            onClick={() => {
              try {
                generateProjectCodePDF();
              } catch (e) {
                alert('براہ کرم ایپ کو دوسرے ٹیب میں کھولیں یا سورس بلاک سے سورس کاپی کریں۔');
              }
            }}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:translate-y-0.5"
          >
            <FileCode className="w-4 h-4 shrink-0" />
            <span>پی ڈی ایف فائل ڈاؤن لوڈ کریں (Download PDF)</span>
          </button>

          <div className="text-right flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center justify-end gap-2">
              <span>ویژول اسٹوڈیو کوڈ اور سورس فائلز</span>
              <Terminal className="w-6 h-6 text-indigo-600" />
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              اس پورے پروگرام کو خود بنانے کا طریقہ کار، تمام فائلز کی سیٹ اپ تفصیلات اور کاپی ایبل کوڈ۔
            </p>
          </div>
        </div>
      </div>

      {/* Steps Visual Layout Guide */}
      <div className="mb-8">
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest pb-3 border-b border-slate-100 mb-4 flex items-center justify-end gap-1.5">
          <span>پروگرام کو خود تیار کرنے کا مکمل طریقہ کار</span>
          <Laptop className="w-4 h-4 text-slate-500" />
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/60 text-right">
            <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">مرحلہ 1</span>
            <h5 className="font-bold text-indigo-950 mt-2 text-sm">پی سی پر نوڈ انسٹال کریں</h5>
            <p className="text-[11px] text-indigo-900/80 mt-1 leading-relaxed">
              سب سے پہلے اپنے کمپیوٹر پر <strong>nodejs.org</strong> سے Node.js انسٹال کریں۔ پھر اپنے کمپیوٹر پر Visual Studio Code ڈاؤن لوڈ کر کے انسٹال کریں۔
            </p>
          </div>

          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/60 text-right">
            <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">مرحلہ 2</span>
            <h5 className="font-bold text-amber-950 mt-2 text-sm">نیا فولڈر بنائیں</h5>
            <p className="text-[11px] text-amber-900/80 mt-1 leading-relaxed">
              ڈیسک ٹاپ پر <code>mqe-bookings</code> نام سے ایک نیا فولڈر بنائیں۔ اب وی ایس کوڈ (VS Code) کھولیں اور اس میں یہ فولڈر لوڈ کریں۔
            </p>
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/60 text-right">
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">مرحلہ 3</span>
            <h5 className="font-bold text-emerald-950 mt-2 text-sm">پیکیج انسٹال کر کے رن کریں</h5>
            <p className="text-[11px] text-emerald-900/80 mt-1 leading-relaxed">
              نیچے موجود <strong>package.json</strong> والی ٹیب دبا کر کوڈ کاپی کریں اور فائل بنائیں۔ کمانڈ پرامپٹ کھولیں اور <code>npm install</code> کے بعد <code>npm run dev</code> چلائیں۔
            </p>
          </div>
        </div>
      </div>

      {/* Directory Visual map */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 text-left mb-8 font-mono text-xs overflow-x-auto relative leading-relaxed">
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-800 text-slate-400 text-[10px] py-1 px-2.5 rounded-full font-sans">
          <span>فولڈر لسٹ گائیڈ</span>
          <FolderDot className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <div className="text-amber-400 font-bold mb-2 font-sans text-xs">FOLDER DIRECTORY STRUCTURE FOR VS CODE:</div>
        <div>{`mqe-bookings/`}</div>
        <div>{`  ├── package.json               <-- Copy from Tab 1 below`}</div>
        <div>{`  ├── src/`}</div>
        <div>{`  │    ├── types.ts              <-- Copy from Tab 2 below`}</div>
        <div>{`  │    ├── utils/`}</div>
        <div>{`  │    │     ├── store.ts         <-- Copy from Tab 3 below`}</div>
        <div>{`  │    │     └── pdfGenerator.ts  <-- Copy from Tab 4 below`}</div>
        <div>{`  │    └── index.css             <-- Copy from Tab 5 below`}</div>
      </div>

      {/* Code Tabs Area */}
      <div>
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest pb-3 border-b border-slate-100 mb-4 flex items-center justify-end gap-1.5">
          <span>سورس فائلز کا کارآمد سورس کوڈ (Copy with One Click)</span>
          <FileCode className="w-4 h-4 text-slate-500" />
        </h4>

        {/* Tab Selection Row */}
        <div className="flex flex-row-reverse flex-wrap gap-1 mb-4 border-b border-slate-100 pb-2">
          {Object.entries(codeFiles).map(([key, file]) => (
            <button
              key={key}
              onClick={() => setActiveFileTab(key)}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeFileTab === key
                  ? 'bg-slate-900 text-amber-400 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>

        {/* Selected code file display */}
        {Object.entries(codeFiles).map(([key, file]) => {
          if (activeFileTab !== key) return null;
          return (
            <div key={key} className="space-y-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <button
                  type="button"
                  id={`copy-btn-${key}`}
                  onClick={() => copyToClipboard(file.code, file.name)}
                  className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-1.5 px-3.5 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer border border-slate-200"
                >
                  {copiedFile === file.name ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">کوڈ کاپی ہو گیا!</span>
                    </>
                  ) : (
                    <>
                      <Clipboard className="w-3.5 h-3.5" />
                      <span>کوڈ کاپی کریں (Copy Code)</span>
                    </>
                  )}
                </button>

                <div className="text-right w-full sm:w-auto">
                  <span className="font-mono text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full">
                    {file.path}
                  </span>
                  <p className="text-xs text-slate-500 mt-1.5">{file.desc}</p>
                </div>
              </div>

              {/* Code Snippet Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-inner border border-slate-950">
                <pre className="bg-slate-950 p-5 rounded-2xl overflow-x-auto text-left text-xs font-mono font-medium text-emerald-400 whitespace-pre leading-relaxed max-h-[450px]">
                  <code>{file.code}</code>
                </pre>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
