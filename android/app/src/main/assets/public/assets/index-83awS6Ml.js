import { j as jsxRuntimeExports, r as reactExports, b as registerPlugin, C as Capacitor, c as React, e as clientExports } from "./vendor-DRXD56HP.js";
import { i as initializeApp, g as getDatabase, a as getAuth, b as getFirestore, s as setPersistence, c as browserLocalPersistence, d as sendPasswordResetEmail, E as EmailAuthProvider, r as reauthenticateWithCredential, e as remove, f as ref, h as get, u as update, j as deleteUser, k as signOut, G as GoogleAuthProvider, l as signInWithPopup, m as createUserWithEmailAndPassword, n as deleteApp, o as onAuthStateChanged, p as onValue, q as set, t as updatePassword, v as getDocs, w as collection, x as getDoc, y as doc, z as query, A as where, B as signInWithEmailAndPassword } from "./vendor-firebase-DwWk7YAc.js";
import { p as pakistanBondDraws } from "./lottery-historical-data-B6qQglrt.js";
import { S as Shield, U as User, L as LogOut, P as Phone, M as MapPin, a as Mail, b as Lock, c as Sparkles, d as LogIn, e as MessageCircle, X, C as CircleCheck, f as CircleAlert, g as PenLine, W as Wallet, F as FileText, G as Gift, A as ArrowUpRight, h as Globe, i as Clock, j as Plus, k as ShieldCheck, D as Download, T as Trash2, l as Award, m as CircleCheckBig, n as LoaderCircle, o as Save, p as CreditCard, E as ExternalLink, q as ShieldAlert, r as TriangleAlert, K as KeyRound, s as Check, t as Search, u as Funnel, v as Trash, w as Database, x as FileUp, R as RefreshCw, y as UserCheck, z as Pen, B as Ban, H as History, I as Calendar, J as Users, N as Building2, O as UserMinus, Q as RotateCcw, V as Calculator, Y as Info, Z as TrendingUp, _ as LayoutGrid, $ as ArrowLeftRight, a0 as Coins, a1 as ChartColumn, a2 as Flame, a3 as Snowflake, a4 as Layers, a5 as Hash, a6 as Percent, a7 as Table, a8 as ChartPie, a9 as MessageSquare, aa as Send, ab as LayoutDashboard, ac as CalendarRange, ad as ScrollText } from "./vendor-icons-CySAJ9fA.js";
import { E, a as autoTable } from "./vendor-pdf-DQry_Bu0.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const __vite_import_meta_env__$1 = {};
const firebaseConfig = {
  apiKey: "AIzaSyAx59hRoNxWI7a4iQtIaPkOGftFW1EMmfc",
  authDomain: "master-mind-qureshi-enterprise.firebaseapp.com",
  databaseURL: (__vite_import_meta_env__$1 == null ? void 0 : __vite_import_meta_env__$1.VITE_FIREBASE_DATABASE_URL) || "https://master-mind-qureshi-enterprise-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "master-mind-qureshi-enterprise",
  storageBucket: "master-mind-qureshi-enterprise.firebasestorage.app",
  messagingSenderId: "343587675373",
  appId: "1:343587675373:web:26be133df0ec77ae4e40e4"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app, firebaseConfig.databaseURL);
const auth = getAuth(app);
const firestore = getFirestore(app);
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("[FirebaseAuth] Failed to configure local persistence:", error);
});
const thailandLotteryDraws = [
  // 2026
  {
    id: "thai-draw-2026-06-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 جون 2026",
    date: "2026-06-16",
    city: "بنکاک",
    firstPrize: "715428",
    secondPrizes: ["314589", "625104"],
    last2Digits: "28",
    front3Digits: "715",
    back3Digits: "428"
  },
  {
    id: "thai-draw-2026-06-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 جون 2026",
    date: "2026-06-01",
    city: "بنکاک",
    firstPrize: "839174",
    secondPrizes: ["195420", "782341"],
    last2Digits: "74",
    front3Digits: "839",
    back3Digits: "174"
  },
  {
    id: "thai-draw-2026-05-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 مئی 2026",
    date: "2026-05-16",
    city: "بنکاک",
    firstPrize: "205936",
    secondPrizes: ["451298", "908312"],
    last2Digits: "36",
    front3Digits: "205",
    back3Digits: "936"
  },
  {
    id: "thai-draw-2026-05-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 مئی 2026",
    date: "2026-05-01",
    city: "بنکاک",
    firstPrize: "647209",
    secondPrizes: ["120934", "563821"],
    last2Digits: "09",
    front3Digits: "647",
    back3Digits: "209"
  },
  {
    id: "thai-draw-2026-04-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 اپریل 2026",
    date: "2026-04-16",
    city: "بنکاک",
    firstPrize: "918352",
    secondPrizes: ["239841", "764510"],
    last2Digits: "52",
    front3Digits: "918",
    back3Digits: "352"
  },
  {
    id: "thai-draw-2026-04-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 اپریل 2026",
    date: "2026-04-01",
    city: "بنکاک",
    firstPrize: "472815",
    secondPrizes: ["891243", "345672"],
    last2Digits: "15",
    front3Digits: "472",
    back3Digits: "815"
  },
  {
    id: "thai-draw-2026-03-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 مارچ 2026",
    date: "2026-03-16",
    city: "بنکاک",
    firstPrize: "583491",
    secondPrizes: ["672109", "184532"],
    last2Digits: "91",
    front3Digits: "583",
    back3Digits: "491"
  },
  {
    id: "thai-draw-2026-03-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 مارچ 2026",
    date: "2026-03-01",
    city: "بنکاک",
    firstPrize: "129064",
    secondPrizes: ["541289", "832941"],
    last2Digits: "64",
    front3Digits: "129",
    back3Digits: "064"
  },
  {
    id: "thai-draw-2026-02-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 فروری 2026",
    date: "2026-02-16",
    city: "بنکاک",
    firstPrize: "394720",
    secondPrizes: ["710924", "458316"],
    last2Digits: "20",
    front3Digits: "394",
    back3Digits: "720"
  },
  {
    id: "thai-draw-2026-02-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 فروری 2026",
    date: "2026-02-01",
    city: "بنکاک",
    firstPrize: "806153",
    secondPrizes: ["294817", "631549"],
    last2Digits: "53",
    front3Digits: "806",
    back3Digits: "153"
  },
  {
    id: "thai-draw-2026-01-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 جنوری 2026",
    date: "2026-01-16",
    city: "بنکاک",
    firstPrize: "651382",
    secondPrizes: ["428910", "193567"],
    last2Digits: "82",
    front3Digits: "651",
    back3Digits: "382"
  },
  {
    id: "thai-draw-2026-01-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 جنوری 2026",
    date: "2026-01-01",
    city: "بنکاک",
    firstPrize: "048739",
    secondPrizes: ["762149", "385012"],
    last2Digits: "39",
    front3Digits: "048",
    back3Digits: "739"
  },
  // 2025
  {
    id: "thai-draw-2025-12-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 دسمبر 2025",
    date: "2025-12-16",
    city: "بنکاک",
    firstPrize: "529147",
    secondPrizes: ["183042", "764951"],
    last2Digits: "47",
    front3Digits: "529",
    back3Digits: "147"
  },
  {
    id: "thai-draw-2025-12-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 دسمبر 2025",
    date: "2025-12-01",
    city: "بنکاک",
    firstPrize: "914830",
    secondPrizes: ["352981", "804712"],
    last2Digits: "30",
    front3Digits: "914",
    back3Digits: "830"
  },
  {
    id: "thai-draw-2025-11-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 نومبر 2025",
    date: "2025-11-16",
    city: "بنکاک",
    firstPrize: "738205",
    secondPrizes: ["914562", "240893"],
    last2Digits: "05",
    front3Digits: "738",
    back3Digits: "205"
  },
  {
    id: "thai-draw-2025-11-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 نومبر 2025",
    date: "2025-11-01",
    city: "بنکاک",
    firstPrize: "360591",
    secondPrizes: ["829471", "154308"],
    last2Digits: "91",
    front3Digits: "360",
    back3Digits: "591"
  },
  {
    id: "thai-draw-2025-10-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 اکتوبر 2025",
    date: "2025-10-16",
    city: "بنکاک",
    firstPrize: "481926",
    secondPrizes: ["670314", "925841"],
    last2Digits: "26",
    front3Digits: "481",
    back3Digits: "926"
  },
  {
    id: "thai-draw-2025-10-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 اکتوبر 2025",
    date: "2025-10-01",
    city: "بنکاک",
    firstPrize: "159483",
    secondPrizes: ["384729", "501627"],
    last2Digits: "83",
    front3Digits: "159",
    back3Digits: "483"
  },
  {
    id: "thai-draw-2025-09-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 ستمبر 2025",
    date: "2025-09-16",
    city: "بنکاک",
    firstPrize: "827360",
    secondPrizes: ["194852", "630174"],
    last2Digits: "60",
    front3Digits: "827",
    back3Digits: "360"
  },
  {
    id: "thai-draw-2025-09-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 ستمبر 2025",
    date: "2025-09-01",
    city: "بنکاک",
    firstPrize: "640718",
    secondPrizes: ["582319", "271403"],
    last2Digits: "18",
    front3Digits: "640",
    back3Digits: "718"
  },
  {
    id: "thai-draw-2025-08-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 اگست 2025",
    date: "2025-08-16",
    city: "بنکاک",
    firstPrize: "295174",
    secondPrizes: ["740918", "413825"],
    last2Digits: "74",
    front3Digits: "295",
    back3Digits: "174"
  },
  {
    id: "thai-draw-2025-08-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 اگست 2025",
    date: "2025-08-01",
    city: "بنکاک",
    firstPrize: "732049",
    secondPrizes: ["891502", "364128"],
    last2Digits: "49",
    front3Digits: "732",
    back3Digits: "049"
  },
  {
    id: "thai-draw-2025-07-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 جولائی 2025",
    date: "2025-07-16",
    city: "بنکاک",
    firstPrize: "084921",
    secondPrizes: ["952317", "148603"],
    last2Digits: "21",
    front3Digits: "084",
    back3Digits: "921"
  },
  {
    id: "thai-draw-2025-07-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 جولائی 2025",
    date: "2025-07-01",
    city: "بنکاک",
    firstPrize: "518367",
    secondPrizes: ["329841", "704592"],
    last2Digits: "67",
    front3Digits: "518",
    back3Digits: "367"
  },
  {
    id: "thai-draw-2025-06-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 جون 2025",
    date: "2025-06-16",
    city: "بنکاک",
    firstPrize: "392680",
    secondPrizes: ["841753", "260914"],
    last2Digits: "80",
    front3Digits: "392",
    back3Digits: "680"
  },
  {
    id: "thai-draw-2025-06-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 جون 2025",
    date: "2025-06-01",
    city: "بنکاک",
    firstPrize: "870415",
    secondPrizes: ["415928", "938201"],
    last2Digits: "15",
    front3Digits: "870",
    back3Digits: "415"
  },
  {
    id: "thai-draw-2025-05-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 مئی 2025",
    date: "2025-05-16",
    city: "بنکاک",
    firstPrize: "146892",
    secondPrizes: ["602481", "379154"],
    last2Digits: "92",
    front3Digits: "146",
    back3Digits: "892"
  },
  {
    id: "thai-draw-2025-05-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 مئی 2025",
    date: "2025-05-01",
    city: "بنکاک",
    firstPrize: "603527",
    secondPrizes: ["781943", "245081"],
    last2Digits: "27",
    front3Digits: "603",
    back3Digits: "527"
  },
  {
    id: "thai-draw-2025-04-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 اپریل 2025",
    date: "2025-04-16",
    city: "بنکاک",
    firstPrize: "945108",
    secondPrizes: ["519382", "860471"],
    last2Digits: "08",
    front3Digits: "945",
    back3Digits: "108"
  },
  {
    id: "thai-draw-2025-04-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 اپریل 2025",
    date: "2025-04-01",
    city: "بنکاک",
    firstPrize: "281634",
    secondPrizes: ["137950", "492806"],
    last2Digits: "34",
    front3Digits: "281",
    back3Digits: "634"
  },
  {
    id: "thai-draw-2025-03-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 مارچ 2025",
    date: "2025-03-16",
    city: "بنکاک",
    firstPrize: "753901",
    secondPrizes: ["924618", "380157"],
    last2Digits: "01",
    front3Digits: "753",
    back3Digits: "901"
  },
  {
    id: "thai-draw-2025-03-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 مارچ 2025",
    date: "2025-03-01",
    city: "بنکاک",
    firstPrize: "419862",
    secondPrizes: ["675034", "182945"],
    last2Digits: "62",
    front3Digits: "419",
    back3Digits: "862"
  },
  {
    id: "thai-draw-2025-02-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 فروری 2025",
    date: "2025-02-16",
    city: "بنکاک",
    firstPrize: "830475",
    secondPrizes: ["409162", "753821"],
    last2Digits: "75",
    front3Digits: "830",
    back3Digits: "475"
  },
  {
    id: "thai-draw-2025-02-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 فروری 2025",
    date: "2025-02-01",
    city: "بنکاک",
    firstPrize: "567129",
    secondPrizes: ["284930", "916047"],
    last2Digits: "29",
    front3Digits: "567",
    back3Digits: "129"
  },
  {
    id: "thai-draw-2025-01-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 جنوری 2025",
    date: "2025-01-16",
    city: "بنکاک",
    firstPrize: "024893",
    secondPrizes: ["391580", "648217"],
    last2Digits: "93",
    front3Digits: "024",
    back3Digits: "893"
  },
  {
    id: "thai-draw-2025-01-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 جنوری 2025",
    date: "2025-01-01",
    city: "بنکاک",
    firstPrize: "970618",
    secondPrizes: ["815234", "439067"],
    last2Digits: "18",
    front3Digits: "970",
    back3Digits: "618"
  },
  // 2024
  {
    id: "thai-draw-2024-12-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 دسمبر 2024",
    date: "2024-12-16",
    city: "بنکاک",
    firstPrize: "351842",
    secondPrizes: ["729015", "184396"],
    last2Digits: "42",
    front3Digits: "351",
    back3Digits: "842"
  },
  {
    id: "thai-draw-2024-12-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 دسمبر 2024",
    date: "2024-12-01",
    city: "بنکاک",
    firstPrize: "804791",
    secondPrizes: ["631980", "295417"],
    last2Digits: "91",
    front3Digits: "804",
    back3Digits: "791"
  },
  {
    id: "thai-draw-2024-11-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 نومبر 2024",
    date: "2024-11-16",
    city: "بنکاک",
    firstPrize: "196305",
    secondPrizes: ["482159", "907342"],
    last2Digits: "05",
    front3Digits: "196",
    back3Digits: "305"
  },
  {
    id: "thai-draw-2024-11-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 نومبر 2024",
    date: "2024-11-01",
    city: "بنکاک",
    firstPrize: "538274",
    secondPrizes: ["814902", "370561"],
    last2Digits: "74",
    front3Digits: "538",
    back3Digits: "274"
  },
  {
    id: "thai-draw-2024-10-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 اکتوبر 2024",
    date: "2024-10-16",
    city: "بنکاک",
    firstPrize: "429718",
    secondPrizes: ["603841", "158927"],
    last2Digits: "18",
    front3Digits: "429",
    back3Digits: "718"
  },
  {
    id: "thai-draw-2024-10-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 اکتوبر 2024",
    date: "2024-10-01",
    city: "بنکاک",
    firstPrize: "765039",
    secondPrizes: ["941280", "283715"],
    last2Digits: "39",
    front3Digits: "765",
    back3Digits: "039"
  },
  {
    id: "thai-draw-2024-09-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 ستمبر 2024",
    date: "2024-09-16",
    city: "بنکاک",
    firstPrize: "912480",
    secondPrizes: ["375019", "584962"],
    last2Digits: "80",
    front3Digits: "912",
    back3Digits: "480"
  },
  {
    id: "thai-draw-2024-09-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 ستمبر 2024",
    date: "2024-09-01",
    city: "بنکاک",
    firstPrize: "248963",
    secondPrizes: ["710492", "409385"],
    last2Digits: "63",
    front3Digits: "248",
    back3Digits: "963"
  },
  {
    id: "thai-draw-2024-08-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 اگست 2024",
    date: "2024-08-16",
    city: "بنکاک",
    firstPrize: "670154",
    secondPrizes: ["829341", "154702"],
    last2Digits: "54",
    front3Digits: "670",
    back3Digits: "154"
  },
  {
    id: "thai-draw-2024-08-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 اگست 2024",
    date: "2024-08-01",
    city: "بنکاک",
    firstPrize: "381529",
    secondPrizes: ["904816", "527390"],
    last2Digits: "29",
    front3Digits: "381",
    back3Digits: "529"
  },
  {
    id: "thai-draw-2024-07-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 جولائی 2024",
    date: "2024-07-16",
    city: "بنکاک",
    firstPrize: "854092",
    secondPrizes: ["416738", "793201"],
    last2Digits: "92",
    front3Digits: "854",
    back3Digits: "092"
  },
  {
    id: "thai-draw-2024-07-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 جولائی 2024",
    date: "2024-07-01",
    city: "بنکاک",
    firstPrize: "109367",
    secondPrizes: ["248590", "631478"],
    last2Digits: "67",
    front3Digits: "109",
    back3Digits: "367"
  },
  {
    id: "thai-draw-2024-06-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 جون 2024",
    date: "2024-06-16",
    city: "بنکاک",
    firstPrize: "593814",
    secondPrizes: ["802149", "374965"],
    last2Digits: "14",
    front3Digits: "593",
    back3Digits: "814"
  },
  {
    id: "thai-draw-2024-06-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 جون 2024",
    date: "2024-06-01",
    city: "بنکاک",
    firstPrize: "421706",
    secondPrizes: ["159843", "980231"],
    last2Digits: "06",
    front3Digits: "421",
    back3Digits: "706"
  },
  {
    id: "thai-draw-2024-05-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 مئی 2024",
    date: "2024-05-16",
    city: "بنکاک",
    firstPrize: "705238",
    secondPrizes: ["341908", "826541"],
    last2Digits: "38",
    front3Digits: "705",
    back3Digits: "238"
  },
  {
    id: "thai-draw-2024-05-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 مئی 2024",
    date: "2024-05-01",
    city: "بنکاک",
    firstPrize: "983451",
    secondPrizes: ["570291", "194830"],
    last2Digits: "51",
    front3Digits: "983",
    back3Digits: "451"
  },
  {
    id: "thai-draw-2024-04-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 اپریل 2024",
    date: "2024-04-16",
    city: "بنکاک",
    firstPrize: "647092",
    secondPrizes: ["283149", "719503"],
    last2Digits: "92",
    front3Digits: "647",
    back3Digits: "092"
  },
  {
    id: "thai-draw-2024-04-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 اپریل 2024",
    date: "2024-04-01",
    city: "بنکاک",
    firstPrize: "318925",
    secondPrizes: ["904712", "462830"],
    last2Digits: "25",
    front3Digits: "318",
    back3Digits: "925"
  },
  {
    id: "thai-draw-2024-03-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 مارچ 2024",
    date: "2024-03-16",
    city: "بنکاک",
    firstPrize: "870634",
    secondPrizes: ["139582", "548201"],
    last2Digits: "34",
    front3Digits: "870",
    back3Digits: "634"
  },
  {
    id: "thai-draw-2024-03-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 مارچ 2024",
    date: "2024-03-01",
    city: "بنکاک",
    firstPrize: "253819",
    secondPrizes: ["780419", "391624"],
    last2Digits: "19",
    front3Digits: "253",
    back3Digits: "819"
  },
  {
    id: "thai-draw-2024-02-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 فروری 2024",
    date: "2024-02-16",
    city: "بنکاک",
    firstPrize: "094178",
    secondPrizes: ["625801", "847293"],
    last2Digits: "78",
    front3Digits: "094",
    back3Digits: "178"
  },
  {
    id: "thai-draw-2024-02-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 فروری 2024",
    date: "2024-02-01",
    city: "بنکاک",
    firstPrize: "761503",
    secondPrizes: ["419382", "950614"],
    last2Digits: "03",
    front3Digits: "761",
    back3Digits: "503"
  },
  {
    id: "thai-draw-2024-01-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 جنوری 2024",
    date: "2024-01-16",
    city: "بنکاک",
    firstPrize: "482936",
    secondPrizes: ["307159", "184620"],
    last2Digits: "36",
    front3Digits: "482",
    back3Digits: "936"
  },
  {
    id: "thai-draw-2024-01-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 جنوری 2024",
    date: "2024-01-01",
    city: "بنکاک",
    firstPrize: "519047",
    secondPrizes: ["892431", "275810"],
    last2Digits: "47",
    front3Digits: "519",
    back3Digits: "047"
  },
  // 2023
  {
    id: "thai-draw-2023-12-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 دسمبر 2023",
    date: "2023-12-16",
    city: "بنکاک",
    firstPrize: "625184",
    secondPrizes: ["194830", "730592"],
    last2Digits: "84",
    front3Digits: "625",
    back3Digits: "184"
  },
  {
    id: "thai-draw-2023-12-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 دسمبر 2023",
    date: "2023-12-01",
    city: "بنکاک",
    firstPrize: "948301",
    secondPrizes: ["582914", "317046"],
    last2Digits: "01",
    front3Digits: "948",
    back3Digits: "301"
  },
  {
    id: "thai-draw-2023-11-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 نومبر 2023",
    date: "2023-11-16",
    city: "بنکاک",
    firstPrize: "380927",
    secondPrizes: ["761502", "429813"],
    last2Digits: "27",
    front3Digits: "380",
    back3Digits: "927"
  },
  {
    id: "thai-draw-2023-11-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 نومبر 2023",
    date: "2023-11-01",
    city: "بنکاک",
    firstPrize: "713495",
    secondPrizes: ["208941", "854129"],
    last2Digits: "95",
    front3Digits: "713",
    back3Digits: "495"
  },
  {
    id: "thai-draw-2023-10-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 اکتوبر 2023",
    date: "2023-10-16",
    city: "بنکاک",
    firstPrize: "159842",
    secondPrizes: ["430719", "982631"],
    last2Digits: "42",
    front3Digits: "159",
    back3Digits: "842"
  },
  {
    id: "thai-draw-2023-10-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 اکتوبر 2023",
    date: "2023-10-01",
    city: "بنکاک",
    firstPrize: "840263",
    secondPrizes: ["591384", "274901"],
    last2Digits: "63",
    front3Digits: "840",
    back3Digits: "263"
  },
  {
    id: "thai-draw-2023-09-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 ستمبر 2023",
    date: "2023-09-16",
    city: "بنکاک",
    firstPrize: "294715",
    secondPrizes: ["810529", "643891"],
    last2Digits: "15",
    front3Digits: "294",
    back3Digits: "715"
  },
  {
    id: "thai-draw-2023-09-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 ستمبر 2023",
    date: "2023-09-01",
    city: "بنکاک",
    firstPrize: "506198",
    secondPrizes: ["372940", "195482"],
    last2Digits: "98",
    front3Digits: "506",
    back3Digits: "198"
  },
  {
    id: "thai-draw-2023-08-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 اگست 2023",
    date: "2023-08-16",
    city: "بنکاک",
    firstPrize: "971830",
    secondPrizes: ["428905", "760143"],
    last2Digits: "30",
    front3Digits: "971",
    back3Digits: "830"
  },
  {
    id: "thai-draw-2023-08-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 اگست 2023",
    date: "2023-08-01",
    city: "بنکاک",
    firstPrize: "438209",
    secondPrizes: ["695128", "214730"],
    last2Digits: "09",
    front3Digits: "438",
    back3Digits: "209"
  },
  {
    id: "thai-draw-2023-07-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 جولائی 2023",
    date: "2023-07-16",
    city: "بنکاک",
    firstPrize: "682941",
    secondPrizes: ["150389", "893472"],
    last2Digits: "41",
    front3Digits: "682",
    back3Digits: "941"
  },
  {
    id: "thai-draw-2023-07-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 جولائی 2023",
    date: "2023-07-01",
    city: "بنکاک",
    firstPrize: "307518",
    secondPrizes: ["941820", "572639"],
    last2Digits: "18",
    front3Digits: "307",
    back3Digits: "518"
  },
  {
    id: "thai-draw-2023-06-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 جون 2023",
    date: "2023-06-16",
    city: "بنکاک",
    firstPrize: "819462",
    secondPrizes: ["264903", "738150"],
    last2Digits: "62",
    front3Digits: "819",
    back3Digits: "462"
  },
  {
    id: "thai-draw-2023-06-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 جون 2023",
    date: "2023-06-01",
    city: "بنکاک",
    firstPrize: "542079",
    secondPrizes: ["389145", "107482"],
    last2Digits: "79",
    front3Digits: "542",
    back3Digits: "079"
  },
  {
    id: "thai-draw-2023-05-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 مئی 2023",
    date: "2023-05-16",
    city: "بنکاک",
    firstPrize: "193850",
    secondPrizes: ["750241", "482916"],
    last2Digits: "50",
    front3Digits: "193",
    back3Digits: "850"
  },
  {
    id: "thai-draw-2023-05-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 مئی 2023",
    date: "2023-05-01",
    city: "بنکاک",
    firstPrize: "760421",
    secondPrizes: ["921853", "345098"],
    last2Digits: "21",
    front3Digits: "760",
    back3Digits: "421"
  },
  {
    id: "thai-draw-2023-04-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 اپریل 2023",
    date: "2023-04-16",
    city: "بنکاک",
    firstPrize: "428193",
    secondPrizes: ["619405", "803724"],
    last2Digits: "93",
    front3Digits: "428",
    back3Digits: "193"
  },
  {
    id: "thai-draw-2023-04-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 اپریل 2023",
    date: "2023-04-01",
    city: "بنکاک",
    firstPrize: "905364",
    secondPrizes: ["184297", "572018"],
    last2Digits: "64",
    front3Digits: "905",
    back3Digits: "364"
  },
  {
    id: "thai-draw-2023-03-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 مارچ 2023",
    date: "2023-03-16",
    city: "بنکاک",
    firstPrize: "374018",
    secondPrizes: ["829156", "240893"],
    last2Digits: "18",
    front3Digits: "374",
    back3Digits: "018"
  },
  {
    id: "thai-draw-2023-03-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 مارچ 2023",
    date: "2023-03-01",
    city: "بنکاک",
    firstPrize: "619285",
    secondPrizes: ["405819", "938271"],
    last2Digits: "85",
    front3Digits: "619",
    back3Digits: "285"
  },
  {
    id: "thai-draw-2023-02-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 فروری 2023",
    date: "2023-02-16",
    city: "بنکاک",
    firstPrize: "852940",
    secondPrizes: ["193478", "704162"],
    last2Digits: "40",
    front3Digits: "852",
    back3Digits: "940"
  },
  {
    id: "thai-draw-2023-02-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 فروری 2023",
    date: "2023-02-01",
    city: "بنکاک",
    firstPrize: "240713",
    secondPrizes: ["589304", "361849"],
    last2Digits: "13",
    front3Digits: "240",
    back3Digits: "713"
  },
  {
    id: "thai-draw-2023-01-16",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 16 جنوری 2023",
    date: "2023-01-16",
    city: "بنکاک",
    firstPrize: "791836",
    secondPrizes: ["432901", "805624"],
    last2Digits: "36",
    front3Digits: "791",
    back3Digits: "836"
  },
  {
    id: "thai-draw-2023-01-01",
    category: "thailand_lottery",
    drawNo: "تھائی ڈرا 01 جنوری 2023",
    date: "2023-01-01",
    city: "بنکاک",
    firstPrize: "158492",
    secondPrizes: ["620184", "947351"],
    last2Digits: "92",
    front3Digits: "158",
    back3Digits: "492"
  }
];
const SUPER_OWNER_EMAILS = [
  "mastermaind.qureshi110@gmail.com",
  "fareed.ghulam@gmail.com"
];
function isSuperOwner(email) {
  if (!email) return false;
  return SUPER_OWNER_EMAILS.includes(email.toLowerCase().trim());
}
async function registerInAuthOnly$1(email, passwordInput, cachedUsers2) {
  const secondaryAppName = `SecondaryAuth_${Date.now()}_${Math.floor(Math.random() * 1e3)}`;
  const secondaryApp = initializeApp(firebaseConfig, secondaryAppName);
  const secondaryAuth = getAuth(secondaryApp);
  try {
    const cred = await createUserWithEmailAndPassword(secondaryAuth, email.toLowerCase().trim(), passwordInput);
    console.log(`[FirebaseAuth] Registered user ${email} in Auth successfully.`);
    return cred.user.uid;
  } catch (err) {
    if (err && err.code === "auth/email-already-in-use") {
      console.log(`[FirebaseAuth] User ${email} already exists in Auth.`);
      if (cachedUsers2 && Array.isArray(cachedUsers2)) {
        const existingUser = cachedUsers2.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
        if (existingUser && existingUser.uid) {
          return existingUser.uid;
        }
      }
      throw err;
    } else if (err && err.code === "auth/operation-not-allowed") {
      console.error(`[FirebaseAuth] Error: Email/Password provider is disabled in the Firebase Console.`, err);
      throw err;
    } else {
      console.error(`[FirebaseAuth] Error in registerInAuthOnly for ${email}:`, err);
      throw err;
    }
  } finally {
    await deleteApp(secondaryApp);
  }
}
async function sendPasswordResetLink$1(email) {
  try {
    if (!email || !email.includes("@")) {
      return { success: false, error: "براہ کرم درست ای میل درج کریں۔" };
    }
    await sendPasswordResetEmail(auth, email.toLowerCase().trim());
    return { success: true };
  } catch (err) {
    console.error("Password reset link error:", err);
    let msg = "پاس ورڈ ری سیٹ ای میل بھیجنے میں ناکامی۔";
    if (err.code === "auth/user-not-found") {
      msg = "اس ای میل کا کوئی اکاؤنٹ موجود نہیں ہے۔";
    } else if (err.code === "auth/invalid-email") {
      msg = "ای میل ایڈریس درست نہیں ہے۔";
    }
    return { success: false, error: msg };
  }
}
async function deleteCurrentUserAccount(password) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return {
      success: false,
      error: "آپ لاگ ان نہیں ہیں۔ براہ کرم پہلے لاگ ان کریں۔ (User is not authenticated.)"
    };
  }
  const uid = currentUser.uid;
  const email = (currentUser.email || "").toLowerCase().trim();
  if (isSuperOwner(email)) {
    return {
      success: false,
      error: "سپر اونر (Super Owner) اکاؤنٹ کو حذف نہیں کیا جا سکتا۔"
    };
  }
  if (password && email) {
    try {
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(currentUser, credential);
    } catch (reauthErr) {
      console.warn("[AccountDeletion] Reauthentication with password failed:", reauthErr);
      if ((reauthErr == null ? void 0 : reauthErr.code) === "auth/wrong-password" || (reauthErr == null ? void 0 : reauthErr.code) === "auth/invalid-credential") {
        return {
          success: false,
          error: "درج کردہ پاس ورڈ درست نہیں ہے۔ براہ کرم درست پاس ورڈ درج کریں۔"
        };
      }
      return {
        success: false,
        error: (reauthErr == null ? void 0 : reauthErr.message) || "تصدیق کے دوران خرابی پیش آئی۔"
      };
    }
  }
  try {
    await remove(ref(db, `users/${uid}`));
    if (email) {
      const legacyEmailKey = email.replace(/[.#$\[\]]/g, "_");
      try {
        const legacySnap = await get(ref(db, `users/${legacyEmailKey}`));
        if (legacySnap.exists()) {
          await remove(ref(db, `users/${legacyEmailKey}`));
        }
      } catch (legacyErr) {
      }
    }
    try {
      const demandsSnap = await get(ref(db, "demands"));
      if (demandsSnap.exists()) {
        const val = demandsSnap.val();
        const updates = {};
        for (const dId of Object.keys(val)) {
          const dem = val[dId];
          if (dem && (dem.userEmail || "").toLowerCase().trim() === email && dem.status === "pending") {
            updates[`demands/${dId}`] = null;
          }
        }
        if (Object.keys(updates).length > 0) {
          await update(ref(db), updates);
        }
      }
    } catch (demandsErr) {
      console.warn("[AccountDeletion] Pending demands cleanup error:", demandsErr);
    }
  } catch (dbErr) {
    console.error("[AccountDeletion] RTDB deletion error:", dbErr);
    return {
      success: false,
      error: "ڈیٹا بیس سے پروفائل حذف کرنے میں ناکامی: " + ((dbErr == null ? void 0 : dbErr.message) || "نامعلوم خرابی")
    };
  }
  try {
    await deleteUser(currentUser);
  } catch (authErr) {
    console.warn("[AccountDeletion] deleteUser failed:", authErr);
    if ((authErr == null ? void 0 : authErr.code) === "auth/requires-recent-login") {
      return {
        success: false,
        requiresRecentLogin: true,
        error: "سیکیورٹی تقاضے کے تحت، اکاؤنٹ حذف کرنے سے پہلے حالیہ لاگ ان یا پاس ورڈ کی تصدیق لازمی ہے۔"
      };
    }
    return {
      success: false,
      error: "فائر بیس اکاؤنٹ حذف کرنے میں ناکامی: " + ((authErr == null ? void 0 : authErr.message) || "نامعلوم خرابی")
    };
  }
  try {
    localStorage.removeItem("mqe_cached_user_profile");
    sessionStorage.removeItem("admin_verified");
    await signOut(auth);
  } catch (e) {
  }
  return {
    success: true,
    message: "آپ کا اکاؤنٹ اور تمام ذاتی ڈیٹا کامیابی سے مستقل طور پر حذف کر دیا گیا ہے۔"
  };
}
async function reauthenticateGoogleAndDelete() {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return { success: false, error: "صارف لاگ ان نہیں ہے۔" };
  }
  const email = (currentUser.email || "").toLowerCase().trim();
  if (isSuperOwner(email)) {
    return { success: false, error: "سپر اونر (Super Owner) اکاؤنٹ کو حذف نہیں کیا جا سکتا۔" };
  }
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    return await deleteCurrentUserAccount();
  } catch (err) {
    console.error("[AccountDeletion] Google reauth failed:", err);
    return {
      success: false,
      error: (err == null ? void 0 : err.message) || "گوگل تصدیق میں خرابی پیش آئی۔"
    };
  }
}
async function adminDeleteUserDatabaseRecord(targetEmail, actor, cachedUsers2) {
  if (!actor || !actor.isAdmin && actor.role !== "superAdmin") {
    return {
      success: false,
      error: "صرف سپر ایڈمن کو صارفین کے ریکارڈز حذف کرنے کا اختیار حاصل ہے۔ (Unauthorized: Super Admin required.)"
    };
  }
  const targetClean = targetEmail.toLowerCase().trim();
  const actorEmailClean = (actor.email || "").toLowerCase().trim();
  if (isSuperOwner(targetClean)) {
    return {
      success: false,
      error: "سپر مالک (Super Owner) اکاؤنٹ کا ڈیٹا بیس ریکارڈ حذف نہیں کیا جا سکتا۔"
    };
  }
  if (targetClean === actorEmailClean) {
    return {
      success: false,
      error: "آپ ایڈمن پورٹل سے اپنا اکاؤنٹ خود حذف نہیں کر سکتے۔ براہ کرم ذاتی پروفائل کا ڈیلیٹ آپشن استعمال کریں۔"
    };
  }
  const targetUser = cachedUsers2.find((u) => (u.email || "").toLowerCase().trim() === targetClean);
  const targetUid = targetUser == null ? void 0 : targetUser.uid;
  if (!targetUid) {
    return {
      success: false,
      error: `صارف (${targetEmail}) کا درست UID سسٹم میں نہیں ملا۔`
    };
  }
  try {
    await remove(ref(db, `users/${targetUid}`));
    const legacyKey = targetClean.replace(/[.#$\[\]]/g, "_");
    try {
      const snap = await get(ref(db, `users/${legacyKey}`));
      if (snap.exists()) {
        await remove(ref(db, `users/${legacyKey}`));
      }
    } catch (e) {
    }
    return {
      success: true,
      isDatabaseOnly: true,
      message: `کامیاب: صارف (${targetEmail}) کا ڈیٹا بیس پروفائل اور تمام رسائیاں کامیابی سے حذف کر دی گئی ہیں۔ کلائنٹ سیکیورٹی اصولوں کے تحت فائر بیس آتھ (Authentication) ریکارڈ اگر درکار ہو تو فائر بیس کنسول سے مانیٹر یا ڈیلیٹ کیا جا سکتا ہے۔`
    };
  } catch (err) {
    console.error("[AdminDeleteUser] Failed to remove RTDB user node:", err);
    return {
      success: false,
      error: `ڈیٹا بیس ریکارڈ حذف کرنے میں خرابی: ${(err == null ? void 0 : err.message) || "نامعلوم خرابی"}`
    };
  }
}
async function deleteOwnAccount(password) {
  var _a;
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: "انٹرنیٹ کنکشن دستیاب نہیں ہے۔ براہ کرم انٹرنیٹ چیک کریں۔" };
  }
  const currentAuthUid = (_a = auth.currentUser) == null ? void 0 : _a.uid;
  const res = await deleteCurrentUserAccount(password);
  if (res.success) {
    if (currentAuthUid) {
      cachedUsers = cachedUsers.filter((u) => u.uid !== currentAuthUid);
    }
    notifyListeners();
  }
  return res;
}
async function deleteOwnAccountWithGoogle() {
  var _a;
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: "انٹرنیٹ کنکشن دستیاب نہیں ہے۔ براہ کرم انٹرنیٹ چیک کریں۔" };
  }
  const currentAuthUid = (_a = auth.currentUser) == null ? void 0 : _a.uid;
  const res = await reauthenticateGoogleAndDelete();
  if (res.success) {
    if (currentAuthUid) {
      cachedUsers = cachedUsers.filter((u) => u.uid !== currentAuthUid);
    }
    notifyListeners();
  }
  return res;
}
async function adminDeleteUserRecord(targetEmail, actor) {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: "انٹرنیٹ کنکشن دستیاب نہیں ہے۔" };
  }
  const res = await adminDeleteUserDatabaseRecord(targetEmail, actor, cachedUsers);
  if (res.success) {
    const cleanTarget = targetEmail.toLowerCase().trim();
    cachedUsers = cachedUsers.filter((u) => (u.email || "").toLowerCase().trim() !== cleanTarget);
    notifyListeners();
  }
  return res;
}
async function registerInAuthOnly(email, passwordInput) {
  return registerInAuthOnly$1(email, passwordInput, cachedUsers);
}
async function checkInternetConnection() {
  if (!navigator.onLine) {
    return false;
  }
  const endpoints = [
    "https://www.google.com",
    "https://1.1.1.1",
    "https://api.github.com"
  ];
  for (const url of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3e3);
      await fetch(url, {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store",
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return true;
    } catch (e) {
    }
  }
  return false;
}
let cachedUsers = [];
let cachedBookings = [];
let cachedDealerBookings = [];
let cachedLimits = [];
let cachedHardFavoriteNumbers = [];
let cachedDemands = [];
let cachedDeadlines = [];
let cachedSupportWhatsApp = "923453090146";
let cachedAdminEmail = "mastermaind.qureshi110@gmail.com";
const listeners = /* @__PURE__ */ new Set();
let started = false;
function subscribeToStore(callback) {
  listeners.add(callback);
  callback();
  return () => {
    listeners.delete(callback);
  };
}
function notifyListeners() {
  listeners.forEach((cb) => {
    try {
      cb();
    } catch (e) {
      console.error("Error in store listener:", e);
    }
  });
}
function sortResultsChronological(list) {
  return [...list].sort((a, b) => {
    const timeA = a.date ? new Date(a.date).getTime() : 0;
    const timeB = b.date ? new Date(b.date).getTime() : 0;
    if (timeB !== timeA) {
      return timeB - timeA;
    }
    return (b.drawNo || b.id || "").localeCompare(a.drawNo || a.id || "");
  });
}
function normalizeBookingNumber(raw) {
  if (raw === void 0 || raw === null) return "";
  const str = String(raw).trim();
  if (!str) return "";
  const arabicUrduMap = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9"
  };
  let cleaned = str.replace(/[۰-۹٠-٩]/g, (ch) => arabicUrduMap[ch] || ch);
  cleaned = cleaned.replace(/[\s\-_#]/g, "");
  return cleaned;
}
function isLoggedUserAdminOrSuper() {
  var _a;
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return false;
  const user = cachedUsers.find((u) => u.uid === firebaseUser.uid);
  if (user) {
    return user.role === "superAdmin" || user.role === "admin" || user.isAdmin === true;
  }
  const email = (_a = firebaseUser.email) == null ? void 0 : _a.toLowerCase().trim();
  if (email) {
    if (email === "mastermaind.qureshi110@gmail.com") {
      return true;
    }
    const userByEmail = cachedUsers.find((u) => (u.email || "").toLowerCase() === email);
    return !!(userByEmail && (userByEmail.role === "superAdmin" || userByEmail.role === "admin" || userByEmail.isAdmin === true));
  }
  return false;
}
function isLoggedUserDataEntry() {
  var _a;
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return false;
  const user = cachedUsers.find((u) => u.uid === firebaseUser.uid);
  if (user) {
    return user.role === "dataEntryAdmin";
  }
  const email = (_a = firebaseUser.email) == null ? void 0 : _a.toLowerCase().trim();
  if (email) {
    if (email === "fareed.ghulam@gmail.com") {
      return true;
    }
    const userByEmail = cachedUsers.find((u) => (u.email || "").toLowerCase() === email);
    return !!(userByEmail && userByEmail.role === "dataEntryAdmin");
  }
  return false;
}
function initializeStore() {
  if (started) return;
  started = true;
  if (!localStorage.getItem("mqe_admin_configured_email")) {
    localStorage.setItem("mqe_admin_configured_email", "mastermaind.qureshi110@gmail.com");
  }
  if (!localStorage.getItem("mqe_whatsapp_number")) {
    localStorage.setItem("mqe_whatsapp_number", "923453090146");
  }
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const email = firebaseUser.email;
      const uid = firebaseUser.uid;
      if (email) {
        let userProfile = cachedUsers.find((u) => u.uid === uid);
        if (!userProfile) {
          try {
            const userSnap = await get(ref(db, `users/${uid}`));
            if (userSnap.exists()) {
              userProfile = userSnap.val();
              const idx = cachedUsers.findIndex((u) => u.uid === uid);
              if (idx !== -1) {
                cachedUsers[idx] = userProfile;
              } else {
                cachedUsers.push(userProfile);
              }
            }
          } catch (e) {
            console.error("Failed to fetch user role on auth state change:", e);
          }
        }
        if (userProfile) {
          try {
            localStorage.setItem("mqe_cached_user_profile", JSON.stringify(userProfile));
          } catch (e) {
          }
        }
      }
    } else {
      sessionStorage.removeItem("admin_verified");
      try {
        localStorage.removeItem("mqe_cached_user_profile");
      } catch (e) {
      }
    }
    notifyListeners();
  });
  onValue(ref(db, "users"), (snapshot) => {
    const val = snapshot.val();
    if (!val) {
      cachedUsers = [];
      notifyListeners();
    } else {
      const tempUsers = Object.keys(val).map((uid) => {
        var _a, _b, _c;
        const data = val[uid];
        const mappedUser = {
          ...data,
          uid: data.uid || uid
        };
        if (!mappedUser.email) {
          if (uid.includes("@")) {
            mappedUser.email = uid;
          } else {
            mappedUser.email = "";
          }
        }
        const emailLower = (mappedUser.email || data.email || "").toLowerCase().trim();
        const isSuperAdminEmail = emailLower === "mastermaind.qureshi110@gmail.com";
        const isDataEntryEmail = emailLower === "fareed.ghulam@gmail.com";
        const isSuper = isSuperAdminEmail || data.role === "superAdmin" || data.role === "admin";
        const isDataEntry = isDataEntryEmail || data.role === "dataEntryAdmin";
        if (isSuper) {
          mappedUser.isAdmin = true;
          mappedUser.role = "superAdmin";
        } else if (isDataEntry) {
          mappedUser.isAdmin = true;
          mappedUser.role = "dataEntryAdmin";
        } else {
          mappedUser.isAdmin = data.isAdmin || false;
          mappedUser.role = data.role || "customer";
        }
        const isComplete = data.profileCompleted === true || Boolean((_a = mappedUser.name) == null ? void 0 : _a.trim()) && Boolean((_b = mappedUser.phone) == null ? void 0 : _b.trim()) && Boolean((_c = mappedUser.city) == null ? void 0 : _c.trim());
        mappedUser.profileCompleted = isComplete;
        return mappedUser;
      });
      const emailMap = /* @__PURE__ */ new Map();
      tempUsers.forEach((u) => {
        var _a, _b;
        const emailLower = (u.email || "").toLowerCase().trim();
        if (!emailLower) return;
        const existing = emailMap.get(emailLower);
        if (!existing) {
          emailMap.set(emailLower, u);
        } else {
          if (((_a = existing.uid) == null ? void 0 : _a.includes("@")) && !((_b = u.uid) == null ? void 0 : _b.includes("@"))) {
            emailMap.set(emailLower, u);
          }
        }
      });
      cachedUsers = Array.from(emailMap.values());
      notifyListeners();
    }
  }, (error) => {
    console.log("[UsersCollection] RTDB users listener restricted for non-admin user (using document listener):", error.message);
  });
  let activeUserUnsub = null;
  let activeDealerBookingsUnsub = null;
  let activeHardFavoriteUnsub = null;
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (activeUserUnsub) {
      activeUserUnsub();
      activeUserUnsub = null;
    }
    if (activeDealerBookingsUnsub) {
      activeDealerBookingsUnsub();
      activeDealerBookingsUnsub = null;
    }
    if (activeHardFavoriteUnsub) {
      activeHardFavoriteUnsub();
      activeHardFavoriteUnsub = null;
    }
    cachedDealerBookings = [];
    cachedHardFavoriteNumbers = [];
    if (firebaseUser) {
      const uid = firebaseUser.uid;
      const email = firebaseUser.email || "";
      const emailLower = email.toLowerCase().trim();
      const isSuperAdminEmail = emailLower === "mastermaind.qureshi110@gmail.com";
      const isDataEntryEmail = emailLower === "fareed.ghulam@gmail.com";
      const syncDealerBookingsListener = (roleData) => {
        if (activeDealerBookingsUnsub) {
          activeDealerBookingsUnsub();
          activeDealerBookingsUnsub = null;
        }
        cachedDealerBookings = [];
        const role = roleData.role;
        const isDealer = role === "dealer";
        const isDealerAdmin = role === "superAdmin" || role === "admin" || role === "dataEntryAdmin" || isSuperAdminEmail || isDataEntryEmail || roleData.isAdmin === true;
        if (!isDealer && !isDealerAdmin) {
          notifyListeners();
          return;
        }
        activeDealerBookingsUnsub = onValue(
          ref(db, "dealerBookings"),
          (snapshot) => {
            const val = snapshot.val();
            const list = val ? Object.keys(val).map((k) => ({ ...val[k], id: val[k].id || k })) : [];
            const filtered = isDealer ? list.filter((b) => b.dealerId === uid) : list;
            cachedDealerBookings = filtered.sort(
              (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
            notifyListeners();
          },
          (err) => {
            console.error(
              `[DealerBookings] Listener failed for ${uid}:`,
              err
            );
            cachedDealerBookings = [];
            notifyListeners();
          }
        );
      };
      const syncHardFavoriteListener = (roleData) => {
        if (activeHardFavoriteUnsub) {
          activeHardFavoriteUnsub();
          activeHardFavoriteUnsub = null;
        }
        cachedHardFavoriteNumbers = [];
        const role = roleData.role;
        const isAdminUser = role === "superAdmin" || role === "admin" || role === "dataEntryAdmin" || isSuperAdminEmail || isDataEntryEmail || roleData.isAdmin === true;
        if (!isAdminUser) {
          notifyListeners();
          return;
        }
        activeHardFavoriteUnsub = onValue(
          ref(db, "hardFavoriteNumbers"),
          (snapshot) => {
            const val = snapshot.val();
            const list = val ? Object.keys(val).map((k) => ({ ...val[k], id: val[k].id || k })) : [];
            cachedHardFavoriteNumbers = list.filter((hf) => !hf.isArchived).sort(
              (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
            );
            notifyListeners();
          },
          (err) => {
            console.error(
              `[HardFavoriteNumbers] Listener failed for ${uid}:`,
              err
            );
            cachedHardFavoriteNumbers = [];
            notifyListeners();
          }
        );
      };
      activeUserUnsub = onValue(ref(db, `users/${uid}`), (docSnap) => {
        var _a, _b, _c;
        if (docSnap.exists()) {
          const data = docSnap.val();
          const userObj = {
            ...data,
            uid: data.uid || uid,
            email: data.email || firebaseUser.email || ""
          };
          const emailLower2 = (userObj.email || data.email || "").toLowerCase().trim();
          const isSuperAdminEmail2 = emailLower2 === "mastermaind.qureshi110@gmail.com";
          const isDataEntryEmail2 = emailLower2 === "fareed.ghulam@gmail.com";
          const isSuper = isSuperAdminEmail2 || data.role === "superAdmin" || data.role === "admin";
          const isDataEntry = isDataEntryEmail2 || data.role === "dataEntryAdmin";
          if (isSuper) {
            userObj.isAdmin = true;
            userObj.role = "superAdmin";
          } else if (isDataEntry) {
            userObj.isAdmin = true;
            userObj.role = "dataEntryAdmin";
          } else {
            userObj.isAdmin = data.isAdmin || false;
            userObj.role = data.role || "customer";
          }
          syncDealerBookingsListener(userObj);
          syncHardFavoriteListener(userObj);
          const isComplete = data.profileCompleted === true || Boolean((_a = userObj.name) == null ? void 0 : _a.trim()) && Boolean((_b = userObj.phone) == null ? void 0 : _b.trim()) && Boolean((_c = userObj.city) == null ? void 0 : _c.trim());
          userObj.profileCompleted = isComplete;
          const idx = cachedUsers.findIndex((u) => u.uid === uid || u.email && userObj.email && u.email.toLowerCase() === userObj.email.toLowerCase());
          if (idx !== -1) {
            cachedUsers[idx] = userObj;
          } else {
            cachedUsers.push(userObj);
          }
          try {
            localStorage.setItem("mqe_cached_user_profile", JSON.stringify(userObj));
          } catch (e) {
          }
          notifyListeners();
        } else {
          console.warn(`[UserSync] Profile document users/${uid} not found yet.`);
        }
      }, (err) => {
        console.error(`[UserSync] Error listening to user document ${uid}:`, err);
      });
    }
  });
  onValue(ref(db, "bookings"), (snapshot) => {
    const val = snapshot.val();
    if (!val) {
      cachedBookings = [];
    } else {
      const list = Object.keys(val).map((k) => ({ ...val[k], id: val[k].id || k }));
      cachedBookings = list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    notifyListeners();
  });
  onValue(ref(db, "limits"), (snapshot) => {
    const val = snapshot.val();
    if (!val) {
      cachedLimits = [];
    } else {
      cachedLimits = Object.keys(val).map((k) => ({ ...val[k], id: val[k].id || k }));
    }
    notifyListeners();
  });
  onValue(ref(db, "demands"), (snapshot) => {
    const val = snapshot.val();
    if (!val) {
      cachedDemands = [];
    } else {
      const list = Object.keys(val).map((k) => ({ ...val[k], id: val[k].id || k }));
      cachedDemands = list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    notifyListeners();
  });
  onValue(ref(db, "deadlines"), (snapshot) => {
    const val = snapshot.val();
    if (!val) {
      cachedDeadlines = [];
    } else {
      cachedDeadlines = Object.keys(val).map((k) => ({ id: k, ...val[k] }));
    }
    notifyListeners();
  });
  onValue(ref(db, "transactions"), (snapshot) => {
    const val = snapshot.val();
    if (!val) ;
    else {
      const list = Object.keys(val).map((k) => ({ ...val[k], id: val[k].id || k }));
      list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    notifyListeners();
  });
  onValue(ref(db, "settings/general"), async (snapshot) => {
    if (!snapshot.exists()) {
      if (isLoggedUserAdminOrSuper()) {
        try {
          await set(ref(db, "settings/general"), {
            adminEmail: "mastermaind.qureshi110@gmail.com",
            whatsappNumber: "923453090146"
          });
        } catch (e) {
          console.error("Failed to initialize default settings:", e);
        }
      }
    } else {
      const data = snapshot.val();
      const adminEmail = (data == null ? void 0 : data.adminEmail) || "mastermaind.qureshi110@gmail.com";
      cachedAdminEmail = adminEmail;
      cachedSupportWhatsApp = (data == null ? void 0 : data.whatsappNumber) || "923453090146";
      notifyListeners();
    }
  });
  onValue(ref(db, "pakistanBondResults"), (snapshot) => {
    const val = snapshot.val();
    if (!val) {
      if (isLoggedUserAdminOrSuper() || isLoggedUserDataEntry()) {
        console.log("Migrating Pakistan Bond results to RTDB...");
        if (pakistanBondDraws && pakistanBondDraws.length > 0) {
          const updates = {};
          pakistanBondDraws.forEach((draw) => {
            let bondValue = "Rs. 200";
            let drawNoOnly = "";
            const bondMatch = draw.drawNo.match(/\(بانڈ\s+([^)]+)\)/);
            if (bondMatch) bondValue = bondMatch[1];
            const drawNoMatch = draw.drawNo.match(/ڈرا نمبر\s+(\d+)/);
            if (drawNoMatch) drawNoOnly = drawNoMatch[1];
            const resultDoc = {
              id: draw.id,
              category: "pakistan_bond",
              bondValue,
              drawNoOnly,
              drawNo: draw.drawNo,
              date: draw.date,
              city: draw.city,
              firstPrize: draw.firstPrize,
              secondPrizes: draw.secondPrizes
            };
            updates[`pakistanBondResults/${draw.id}`] = resultDoc;
          });
          update(ref(db), updates).catch((e) => console.error("Failed to migrate pakistanBondResult docs:", e));
        }
      }
    } else {
      const parsedList = Object.keys(val).map((k) => ({ ...val[k], id: val[k].id || k }));
      cachedPakistanBondResults = sortResultsChronological(parsedList);
      notifyListeners();
    }
  });
  onValue(ref(db, "thaiLotteryResults"), (snapshot) => {
    const val = snapshot.val();
    if (!val) {
      if (isLoggedUserAdminOrSuper() || isLoggedUserDataEntry()) {
        console.log("Migrating Thailand Lottery results to RTDB...");
        if (thailandLotteryDraws && thailandLotteryDraws.length > 0) {
          const updates = {};
          thailandLotteryDraws.forEach((draw) => {
            updates[`thaiLotteryResults/${draw.id}`] = draw;
          });
          update(ref(db), updates).catch((e) => console.error("Failed to migrate thaiLotteryResult docs:", e));
        }
      }
      cachedThaiLotteryResults = sortResultsChronological([...thailandLotteryDraws]);
    } else {
      const parsedList = Object.keys(val).map(
        (k) => ({ ...val[k], id: val[k].id || k })
      );
      const existingIds = new Set(parsedList.map((p) => p.id));
      const combined = [...parsedList];
      thailandLotteryDraws.forEach((d) => {
        if (!existingIds.has(d.id)) {
          combined.push(d);
        }
      });
      cachedThaiLotteryResults = sortResultsChronological(combined);
    }
    notifyListeners();
  });
}
function getSupportWhatsAppNumber() {
  return cachedSupportWhatsApp;
}
function setSupportWhatsAppNumber(num) {
  let cleaned = num.replace(/[\s-+]/g, "");
  if (cleaned.startsWith("03")) {
    cleaned = "92" + cleaned.substring(1);
  }
  update(ref(db, "settings/general"), {
    adminEmail: cachedAdminEmail,
    whatsappNumber: cleaned
  });
}
function getUsers() {
  return cachedUsers;
}
function getBookings() {
  return cachedBookings;
}
function getDealerBookings() {
  return cachedDealerBookings;
}
function getNumberLimits() {
  return cachedLimits;
}
function getHardFavoriteNumbers() {
  if (!isLoggedUserAdminOrSuper() && !isLoggedUserDataEntry()) {
    return [];
  }
  return cachedHardFavoriteNumbers;
}
function getLoggedInUser() {
  var _a, _b, _c, _d, _e;
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return null;
  const emailLower = ((_a = firebaseUser.email) == null ? void 0 : _a.toLowerCase().trim()) || "";
  let user = cachedUsers.find((u) => u.uid === firebaseUser.uid || emailLower && u.email && u.email.toLowerCase().trim() === emailLower) || null;
  if (!user) {
    try {
      const localCached = localStorage.getItem("mqe_cached_user_profile");
      if (localCached) {
        const parsed = JSON.parse(localCached);
        if (parsed && (parsed.uid === firebaseUser.uid || emailLower && ((_b = parsed.email) == null ? void 0 : _b.toLowerCase().trim()) === emailLower)) {
          user = parsed;
        }
      }
    } catch (e) {
    }
  }
  if (user) {
    const userEmail = (user.email || "").toLowerCase().trim();
    const isUserSuperEmail = userEmail === "mastermaind.qureshi110@gmail.com";
    const isUserDataEntryEmail = userEmail === "fareed.ghulam@gmail.com";
    const isSuper = isUserSuperEmail || user.role === "superAdmin" || user.role === "admin" || user.isAdmin === true;
    const isDataEntry = isUserDataEntryEmail || user.role === "dataEntryAdmin";
    const isComplete = user.profileCompleted === true || Boolean((_c = user.name) == null ? void 0 : _c.trim()) && Boolean((_d = user.phone) == null ? void 0 : _d.trim()) && Boolean((_e = user.city) == null ? void 0 : _e.trim());
    if (isSuper) {
      return {
        ...user,
        isAdmin: true,
        role: "superAdmin",
        profileCompleted: isComplete
      };
    }
    if (isDataEntry) {
      return {
        ...user,
        isAdmin: true,
        role: "dataEntryAdmin",
        profileCompleted: isComplete
      };
    }
    return {
      ...user,
      profileCompleted: isComplete
    };
  }
  return null;
}
function setLoggedInUser(emailOrUid) {
  const clean = emailOrUid.toLowerCase().trim();
  cachedUsers.find((u) => (u.email || "").toLowerCase() === clean || u.uid === emailOrUid);
  notifyListeners();
}
function logout() {
  sessionStorage.removeItem("admin_verified");
  try {
    localStorage.removeItem("mqe_cached_user_profile");
  } catch (e) {
  }
  signOut(auth).catch((e) => console.error("Firebase signOut failed:", e));
  notifyListeners();
}
function getAdminConfiguredEmail() {
  return cachedAdminEmail;
}
async function changeLoggedAdminPassword(currentPassword, newPassword) {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: "انٹرنیٹ کنکشن دستیاب نہیں ہے۔ (No internet connection.)" };
  }
  const user = auth.currentUser;
  if (!user || !user.email) {
    return { success: false, error: "صارف لاگ ان نہیں ہے۔ (User is not logged in.)" };
  }
  try {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    return { success: true };
  } catch (e) {
    console.error("Error changing admin password:", e);
    if (e && e.code === "auth/wrong-password") {
      return { success: false, error: "موجودہ پاس ورڈ درست نہیں ہے۔ (Current password is incorrect.)" };
    } else if (e && e.code === "auth/invalid-credential") {
      return { success: false, error: "موجودہ پاس ورڈ درست نہیں ہے۔ (Current password is incorrect.)" };
    } else if (e && e.code === "auth/weak-password") {
      return { success: false, error: "نیا پاس ورڈ کم از کم 6 ہندسوں کا ہونا ضروری ہے۔ (New password must be at least 6 characters.)" };
    }
    return { success: false, error: (e == null ? void 0 : e.message) || "پاس ورڈ تبدیل کرنے میں خرابی پیش آئی۔" };
  }
}
async function updateCustomerPassword(email, passwordInput) {
  var _a;
  const online = await checkInternetConnection();
  if (!online) return false;
  const normalizedEmail = email.toLowerCase().trim();
  try {
    if (auth.currentUser && ((_a = auth.currentUser.email) == null ? void 0 : _a.toLowerCase().trim()) === normalizedEmail) {
      await updatePassword(auth.currentUser, passwordInput);
    } else {
      await sendPasswordResetEmail(auth, normalizedEmail);
    }
    const cached = cachedUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (cached == null ? void 0 : cached.uid) {
      await update(ref(db, `users/${cached.uid}`), {
        email: normalizedEmail
      });
    } else {
      console.warn(`Could not update customer metadata in RTDB for ${normalizedEmail} because no UID was found.`);
    }
    return true;
  } catch (e) {
    console.error("Error updating customer password:", e);
    return false;
  }
}
async function registerUser(name, phone, city, email, password) {
  const online = await checkInternetConnection();
  if (!online) {
    return null;
  }
  const normalizedEmail = email.toLowerCase().trim();
  const isAdmin = normalizedEmail === cachedAdminEmail.toLowerCase() || normalizedEmail === "mastermaind.qureshi110@gmail.com";
  try {
    const cred = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
    const uid = cred.user.uid;
    const newUser = {
      uid,
      email: normalizedEmail,
      name: name.trim(),
      phone: phone.trim(),
      city: city.trim(),
      balance: 0,
      // production starting balance = 0
      isAdmin,
      role: isAdmin ? "admin" : "customer",
      profileCompleted: true
    };
    await set(ref(db, `users/${uid}`), newUser);
    const existingIdx = cachedUsers.findIndex((u) => u.uid === uid || u.email.toLowerCase() === normalizedEmail);
    if (existingIdx !== -1) {
      cachedUsers[existingIdx] = newUser;
    } else {
      cachedUsers.push(newUser);
    }
    try {
      localStorage.setItem("mqe_cached_user_profile", JSON.stringify(newUser));
    } catch (e) {
    }
    notifyListeners();
    return newUser;
  } catch (e) {
    console.error("Error in registerUser:", e);
    return null;
  }
}
async function signInWithGoogle() {
  var _a, _b;
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: "انٹرنیٹ کنکشن دستیاب نہیں ہے۔ براہ کرم اپنا انٹرنیٹ کنکشن چیک کریں۔" };
  }
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;
    if (!firebaseUser || !firebaseUser.email) {
      return { success: false, error: "گوگل اکاؤنٹ کی معلومات حاصل نہیں ہو سکیں۔" };
    }
    const uid = firebaseUser.uid;
    const email = firebaseUser.email.toLowerCase().trim();
    const photoURL = firebaseUser.photoURL || "";
    const userRef = ref(db, `users/${uid}`);
    const userSnap = await get(userRef);
    let userProfile;
    let isNewOrIncomplete = false;
    if (userSnap.exists()) {
      const data = userSnap.val();
      const isComplete = data.profileCompleted === true || Boolean((_a = data.phone) == null ? void 0 : _a.trim()) && Boolean((_b = data.city) == null ? void 0 : _b.trim());
      userProfile = {
        ...data,
        uid,
        email,
        photoURL: photoURL || data.photoURL || "",
        profileCompleted: isComplete
      };
      if (photoURL && data.photoURL !== photoURL) {
        await update(userRef, { photoURL });
      }
      if (!isComplete) {
        isNewOrIncomplete = true;
      }
    } else {
      const isAdmin = email === cachedAdminEmail.toLowerCase() || email === "mastermaind.qureshi110@gmail.com";
      userProfile = {
        uid,
        email,
        name: firebaseUser.displayName || "گوگل صارف",
        phone: "",
        city: "",
        photoURL,
        balance: 0,
        isAdmin,
        role: isAdmin ? "admin" : "customer",
        profileCompleted: false
      };
      await set(userRef, userProfile);
      isNewOrIncomplete = true;
    }
    try {
      localStorage.setItem("mqe_cached_user_profile", JSON.stringify(userProfile));
    } catch (e) {
    }
    notifyListeners();
    return { success: true, user: userProfile, isNewOrIncomplete };
  } catch (err) {
    console.error("Google sign in error:", err);
    if (err && err.code === "auth/popup-closed-by-user") {
      return { success: false, error: "گوگل لاگ ان منسوخ کر دیا گیا ہے۔" };
    }
    return { success: false, error: (err == null ? void 0 : err.message) || "گوگل سائن ان کے دوران غلطی پیش آئی۔" };
  }
}
async function updateUserProfile(uid, updatedData) {
  var _a, _b;
  const online = await checkInternetConnection();
  if (!online) {
    return {
      success: false,
      message: "انٹرنیٹ کنکشن دستیاب نہیں ہے۔ براہ کرم اپنا انٹرنیٹ کنکشن چیک کریں۔"
    };
  }
  const name = updatedData.name.trim();
  const phone = updatedData.phone.trim();
  const city = updatedData.city.trim();
  const photoURL = ((_a = updatedData.photoURL) == null ? void 0 : _a.trim()) || "";
  if (!name) {
    return { success: false, message: "نام درج کرنا لازمی ہے۔" };
  }
  if (name.length < 2 || name.length > 100) {
    return { success: false, message: "نام 2 سے 100 حروف کے درمیان ہونا چاہیے۔" };
  }
  if (!phone) {
    return { success: false, message: "موبائل نمبر درج کرنا لازمی ہے۔" };
  }
  const phoneRegex = /^[\d\+\-\s]{10,20}$/;
  if (!phoneRegex.test(phone)) {
    return { success: false, message: "براہ کرم درست فون نمبر درج کریں۔ (مثلاً: 03001234567)" };
  }
  if (!city) {
    return { success: false, message: "شہر کا نام درج کرنا لازمی ہے۔" };
  }
  if (city.length > 50) {
    return { success: false, message: "شہر کا نام 50 حروف سے زیادہ نہیں ہو سکتا۔" };
  }
  if (!uid) {
    return { success: false, message: "صارف کی شناخت (UID) موجود نہیں ہے۔" };
  }
  try {
    const existingUser = cachedUsers.find((u) => u.uid === uid);
    const userEmail = (existingUser == null ? void 0 : existingUser.email) || ((_b = auth.currentUser) == null ? void 0 : _b.email) || "";
    const updatePayload = {
      uid,
      email: userEmail,
      name,
      phone,
      city,
      profileCompleted: true
    };
    if (photoURL) {
      updatePayload.photoURL = photoURL;
    }
    await update(ref(db, `users/${uid}`), updatePayload);
    if (existingUser) {
      existingUser.name = name;
      existingUser.phone = phone;
      existingUser.city = city;
      existingUser.profileCompleted = true;
      if (photoURL) existingUser.photoURL = photoURL;
      try {
        localStorage.setItem("mqe_cached_user_profile", JSON.stringify(existingUser));
      } catch (e) {
      }
    } else {
      const newUserObj = {
        uid,
        email: userEmail,
        name,
        phone,
        city,
        balance: 0,
        photoURL,
        isAdmin: false,
        role: "customer",
        profileCompleted: true
      };
      cachedUsers.push(newUserObj);
      try {
        localStorage.setItem("mqe_cached_user_profile", JSON.stringify(newUserObj));
      } catch (e) {
      }
    }
    notifyListeners();
    return {
      success: true,
      message: "آپ کی پروفائل کامیابی سے اپ ڈیٹ ہو گئی ہے۔"
    };
  } catch (error) {
    console.error("Error updating user profile in RTDB:", error);
    return {
      success: false,
      message: "پروفائل اپ ڈیٹ کرتے وقت ایک خطاء پیش آئی: " + ((error == null ? void 0 : error.message) || "نامعلوم غلطی")
    };
  }
}
async function rechargeWallet(email, amount, note) {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: "انٹرنیٹ کنکشن موجود نہیں ہے۔" };
  const normalizedEmail = email.toLowerCase().trim();
  if (!normalizedEmail) {
    return { success: false, error: "ای میل ایڈریس صحیح نہیں ہے۔" };
  }
  let cached = cachedUsers.find((u) => (u.email || "").toLowerCase().trim() === normalizedEmail);
  let targetUid = cached == null ? void 0 : cached.uid;
  let targetName = (cached == null ? void 0 : cached.name) || "صارف";
  let targetBalance = (cached == null ? void 0 : cached.balance) || 0;
  if (!targetUid) {
    try {
      const usersSnap = await get(ref(db, "users"));
      if (usersSnap.exists()) {
        const usersVal = usersSnap.val();
        for (const k of Object.keys(usersVal)) {
          const u = usersVal[k];
          if ((u.email || "").toLowerCase().trim() === normalizedEmail) {
            targetUid = u.uid || k;
            targetName = u.name || "صارف";
            targetBalance = u.balance || 0;
            break;
          }
        }
      }
    } catch (err) {
      console.error("[rechargeWallet] RTDB user query failed:", err);
    }
  }
  if (!targetUid) {
    console.error(`[rechargeWallet] Recharge failed: Customer ${normalizedEmail} has no valid firebase UID loaded.`);
    return { success: false, error: "اس ای میل کے ساتھ کوئی رجسٹرڈ کسٹمر نہیں ملا۔" };
  }
  if (amount < 0 && targetBalance + amount < 0) {
    return {
      success: false,
      error: `کسٹمر کے پاس کافی بیلنس نہیں ہے۔ موجودہ بیلنس: Rs. ${targetBalance.toLocaleString()}`
    };
  }
  const txId = "tx-" + Date.now() + "-" + Math.floor(Math.random() * 1e3);
  try {
    const userSnap = await get(ref(db, `users/${targetUid}`));
    if (!userSnap.exists()) {
      throw new Error("کسٹمر کا اکاؤنٹ نہیں ملا۔");
    }
    const user = userSnap.val();
    const currentBal = user.balance ?? 0;
    if (amount < 0 && currentBal + amount < 0) {
      throw new Error(`کسٹمر کا بیلنس منفی نہیں ہو سکتا۔ موجودہ بیلنس: Rs. ${currentBal.toLocaleString()}`);
    }
    const newBal = currentBal + amount;
    const defaultNote = amount >= 0 ? "ایڈمن کی جانب سے والٹ ریچارج" : "ایڈمن کی جانب سے والٹ سے کٹوتی";
    const tx = {
      id: txId,
      userId: targetUid,
      userEmail: normalizedEmail,
      userName: user.name || targetName,
      type: amount >= 0 ? "recharge" : "withdrawal",
      amount: Math.abs(amount),
      date: (/* @__PURE__ */ new Date()).toISOString(),
      status: "approved",
      paymentMethod: "ایڈمن والٹ چارج",
      note: note && note.trim() ? note.trim() : defaultNote
    };
    const updates = {};
    updates[`users/${targetUid}/balance`] = newBal;
    updates[`transactions/${txId}`] = tx;
    await update(ref(db), updates);
    if (cached) {
      cached.balance = (cached.balance || 0) + amount;
    }
    notifyListeners();
    return { success: true };
  } catch (e) {
    console.error("Recharge transaction failed:", e);
    return {
      success: false,
      error: (e == null ? void 0 : e.message) || "والٹ ٹرانزیکشن میں خرابی پیش آئی۔"
    };
  }
}
async function addBooking(email, category, number, firstAmount, secondAmount, bondValue, drawNumber, drawDate, drawCity, drawId) {
  var _a;
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: "NO_INTERNET" };
  }
  const normalizedEmail = email.toLowerCase().trim();
  const currentAuthUid = (_a = auth.currentUser) == null ? void 0 : _a.uid;
  const cached = cachedUsers.find((u) => u.email && u.email.toLowerCase().trim() === normalizedEmail || currentAuthUid && u.uid === currentAuthUid);
  const uid = currentAuthUid || (cached == null ? void 0 : cached.uid);
  if (!uid) {
    return { success: false, error: "صارف کا ریکارڈ نہیں ملا" };
  }
  const isDealer = (cached == null ? void 0 : cached.role) === "dealer";
  const collectionPath = isDealer ? "dealerBookings" : "bookings";
  const bookingId = (isDealer ? "dlr-booking-" : "booking-") + Date.now() + "-" + Math.floor(Math.random() * 1e3);
  const txId = "tx-" + Date.now() + "-" + Math.floor(Math.random() * 1e3);
  const totalCost = firstAmount + secondAmount;
  try {
    const userSnap = await get(ref(db, `users/${uid}`));
    if (!userSnap.exists()) {
      throw new Error("صارف کا ریکارڈ نہیں ملا");
    }
    const userData = userSnap.val();
    const currentBal = userData.balance ?? 0;
    if (currentBal < totalCost) {
      throw new Error("آپ کے والٹ میں کافی رقم موجود نہیں ہے");
    }
    const limit = cachedLimits.find((l) => (drawId ? l.drawId === drawId : l.category === category) && normalizeBookingNumber(l.number) === normalizeBookingNumber(number));
    if (limit) {
      const firstLimit = typeof limit.firstPrizeAmountLimit === "number" ? limit.firstPrizeAmountLimit : limit.maxAmount;
      const secondLimit = typeof limit.secondPrizeAmountLimit === "number" ? limit.secondPrizeAmountLimit : limit.maxAmount;
      if (firstLimit > 0 && firstAmount > firstLimit) {
        throw new Error("یہ نمبر اس وقت booking کے لیے دستیاب نہیں ہے۔");
      }
      if (secondLimit > 0 && secondAmount > secondLimit) {
        throw new Error("یہ نمبر اس وقت booking کے لیے دستیاب نہیں ہے۔");
      }
    }
    const isHardFavBlocked = await checkIsNumberHardFavorite(category, number, drawId);
    if (isHardFavBlocked) {
      throw new Error("یہ نمبر اس وقت booking کے لیے دستیاب نہیں ہے۔");
    }
    const categoryLabelMap = {
      pakistan_bond: "پاکستان پرائز بانڈ",
      thailand_lottery: "تھائی لینڈ لاٹری"
    };
    let newBookingObj;
    if (isDealer) {
      newBookingObj = {
        id: bookingId,
        dealerId: uid,
        dealerEmail: normalizedEmail,
        dealerName: userData.name || (cached == null ? void 0 : cached.name) || "ڈیلر",
        category,
        number,
        firstAmount,
        secondAmount,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        ...drawId && { drawId },
        ...bondValue && { bondValue },
        ...drawNumber && { drawNumber },
        ...drawCity && { drawCity },
        ...drawDate && { drawDate }
      };
    } else {
      newBookingObj = {
        id: bookingId,
        userEmail: normalizedEmail,
        category,
        number,
        firstAmount,
        secondAmount,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        ...drawId && { drawId },
        ...bondValue && { bondValue },
        ...drawNumber && { drawNumber },
        ...drawCity && { drawCity },
        ...drawDate && { drawDate }
      };
    }
    const tx = {
      id: txId,
      userId: uid,
      userEmail: normalizedEmail,
      userName: userData.name || (cached == null ? void 0 : cached.name) || (isDealer ? "ڈیلر" : "صارف"),
      type: "booking_deduction",
      amount: totalCost,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      status: "approved",
      note: `${categoryLabelMap[category] || category} نمبر #${number} ${isDealer ? "ڈیلر " : ""}بکنگ کٹوتی`
    };
    const updates = {};
    updates[`${collectionPath}/${bookingId}`] = newBookingObj;
    updates[`transactions/${txId}`] = tx;
    updates[`users/${uid}/balance`] = currentBal - totalCost;
    await update(ref(db), updates);
    if (cached) {
      cached.balance = (cached.balance || 0) - totalCost;
    }
    notifyListeners();
    return { success: true };
  } catch (err) {
    console.error("Booking transaction failed:", err);
    return { success: false, error: err.message || "بکنگ کے دوران غلطی پیش آئی۔" };
  }
}
async function cancelDealerBookingByAdmin(bookingId) {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: "NO_INTERNET" };
  }
  const booking = cachedDealerBookings.find((b) => b.id === bookingId);
  if (!booking) return { success: false, error: "ڈیلر بکنگ کا ریکارڈ نہیں ملا" };
  const dealerId = booking.dealerId;
  const refundAmount = booking.firstAmount + booking.secondAmount;
  try {
    const userSnap = await get(ref(db, `users/${dealerId}`));
    const userData = userSnap.exists() ? userSnap.val() : null;
    const currentBalance = (userData == null ? void 0 : userData.balance) || 0;
    const updates = {};
    updates[`dealerBookings/${bookingId}`] = null;
    if (userData) {
      updates[`users/${dealerId}/balance`] = currentBalance + refundAmount;
    }
    await update(ref(db), updates);
    return { success: true };
  } catch (err) {
    console.error("Admin cancel dealer booking failed:", err);
    return { success: false, error: err.message || "منسوخی کے دوران غلطی پیش آئی۔" };
  }
}
async function assignDealerRole(uid, enableDealer) {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: "NO_INTERNET" };
  if (!isLoggedUserAdminOrSuper()) {
    return { success: false, error: "صرف ایڈمن کو ڈیلر رول تبدیل کرنے کا اختیار ہے۔" };
  }
  try {
    const newRole = enableDealer ? "dealer" : "customer";
    await update(ref(db, `users/${uid}`), {
      role: newRole
    });
    const idx = cachedUsers.findIndex((u) => u.uid === uid);
    if (idx !== -1) {
      cachedUsers[idx].role = newRole;
      notifyListeners();
    }
    return { success: true };
  } catch (err) {
    console.error("Assign dealer role failed:", err);
    return { success: false, error: err.message || "ڈیلر رول تبدیل کرنے میں غلطی پیش آئی۔" };
  }
}
async function cancelBooking(bookingId) {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: "NO_INTERNET" };
  }
  const booking = cachedBookings.find((b) => b.id === bookingId);
  if (!booking) return { success: false, error: "بکنگ کا ریکارڈ نہیں ملا" };
  const timeDiffMs = Date.now() - new Date(booking.timestamp).getTime();
  const limitMs = 2 * 60 * 1e3;
  if (timeDiffMs > limitMs) {
    return { success: false, error: "کینسل کرنے کا وقت (2 منٹ) ختم ہو چکا ہے" };
  }
  const userEmail = booking.userEmail.toLowerCase().trim();
  const cached = cachedUsers.find((u) => u.email.toLowerCase() === userEmail);
  if (!cached || !cached.uid) {
    return { success: false, error: "کسٹمر ریکارڈ (یا یو آئی ڈی) نہیں ملا۔" };
  }
  const refundAmount = booking.firstAmount + booking.secondAmount;
  const refundTxId = "refund-" + bookingId;
  try {
    const userSnap = await get(ref(db, `users/${cached.uid}`));
    if (!userSnap.exists()) {
      throw new Error("کسٹمر کا والٹ ریکارڈ موجود نہیں ہے۔");
    }
    const userData = userSnap.val();
    const refundTx = {
      id: refundTxId,
      userId: cached.uid,
      userEmail,
      userName: userData.name || cached.name || "صارف",
      type: "refund",
      amount: refundAmount,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      status: "approved",
      bookingId,
      note: `بکنگ #${bookingId} کی منسوخی پر والٹ ریفنڈ`
    };
    const updates = {};
    updates[`transactions/${refundTxId}`] = refundTx;
    updates[`users/${cached.uid}/balance`] = (userData.balance || 0) + refundAmount;
    updates[`users/${cached.uid}/lastRefundBookingId`] = bookingId;
    updates[`bookings/${bookingId}`] = null;
    await update(ref(db), updates);
    return { success: true };
  } catch (err) {
    console.error("Cancel booking failed:", err);
    return { success: false, error: err.message || "منسوخی کے دوران غلطی پیش آئی۔" };
  }
}
async function cancelBookingByAdmin(bookingId) {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: "NO_INTERNET" };
  }
  const booking = cachedBookings.find((b) => b.id === bookingId);
  if (!booking) return { success: false, error: "بکنگ کا ریکارڈ نہیں ملا" };
  const userEmail = booking.userEmail.toLowerCase().trim();
  const cached = cachedUsers.find((u) => u.email.toLowerCase() === userEmail);
  if (!cached || !cached.uid) {
    return { success: false, error: "کسٹمر ریکارڈ (یا یو آئی ڈی) نہیں ملا۔" };
  }
  const refundAmount = booking.firstAmount + booking.secondAmount;
  const refundTxId = "refund-" + bookingId;
  try {
    const userSnap = await get(ref(db, `users/${cached.uid}`));
    if (!userSnap.exists()) {
      throw new Error("کسٹمر کا والٹ ریکارڈ موجود نہیں ہے۔");
    }
    const userData = userSnap.val();
    const refundTx = {
      id: refundTxId,
      userId: cached.uid,
      userEmail,
      userName: userData.name || cached.name || "صارف",
      type: "refund",
      amount: refundAmount,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      status: "approved",
      bookingId,
      note: `ایڈمن کی جانب سے بکنگ #${bookingId} کی منسوخی پر والٹ ریفنڈ`
    };
    const updates = {};
    updates[`transactions/${refundTxId}`] = refundTx;
    updates[`users/${cached.uid}/balance`] = (userData.balance || 0) + refundAmount;
    updates[`users/${cached.uid}/lastRefundBookingId`] = bookingId;
    updates[`bookings/${bookingId}`] = null;
    await update(ref(db), updates);
    return { success: true };
  } catch (err) {
    console.error("Admin cancel booking failed:", err);
    return { success: false, error: err.message || "منسوخی کے دوران غلطی پیش آئی۔" };
  }
}
async function setOrUpdateLimit(category, number, firstLimitOrMax, secondLimit, drawId) {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: "انٹرنیٹ کنکشن موجود نہیں ہے۔" };
  if (!isLoggedUserAdminOrSuper() && !isLoggedUserDataEntry()) {
    return { success: false, error: "صرف ایڈمن کو لمٹ تبدیل کرنے کا اختیار ہے۔" };
  }
  const normalized = normalizeBookingNumber(number);
  if (!normalized) {
    return { success: false, error: "براہ کرم درست نمبر درج کریں۔" };
  }
  const firstPrizeAmountLimit = typeof firstLimitOrMax === "number" && !isNaN(firstLimitOrMax) ? Math.max(0, firstLimitOrMax) : 0;
  const secondPrizeAmountLimit = typeof secondLimit === "number" && !isNaN(secondLimit) ? Math.max(0, secondLimit) : firstPrizeAmountLimit;
  const maxAmount = Math.max(firstPrizeAmountLimit, secondPrizeAmountLimit);
  const existing = cachedLimits.find((l) => (drawId ? l.drawId === drawId : l.category === category) && normalizeBookingNumber(l.number) === normalized);
  const limitId = existing ? existing.id : "limit-" + Date.now();
  const limit = {
    id: limitId,
    category,
    number: normalized,
    maxAmount,
    firstPrizeAmountLimit,
    secondPrizeAmountLimit,
    ...drawId && { drawId }
  };
  await set(ref(db, `limits/${limitId}`), limit);
  const idx = cachedLimits.findIndex((l) => l.id === limitId);
  if (idx !== -1) {
    cachedLimits[idx] = limit;
  } else {
    cachedLimits.push(limit);
  }
  notifyListeners();
  return { success: true };
}
async function deleteLimit(id) {
  const online = await checkInternetConnection();
  if (!online) return;
  await remove(ref(db, `limits/${id}`));
  cachedLimits = cachedLimits.filter((l) => l.id !== id);
  notifyListeners();
}
async function checkIsNumberHardFavorite(category, number, drawId) {
  const norm = normalizeBookingNumber(number);
  if (!norm) return false;
  if (cachedHardFavoriteNumbers && cachedHardFavoriteNumbers.length > 0) {
    const isCachedBlocked = cachedHardFavoriteNumbers.some((hf) => {
      if (hf.isArchived) return false;
      if (normalizeBookingNumber(hf.number) !== norm) return false;
      const catMatch = hf.category === "all" || hf.category === category;
      if (!catMatch) return false;
      if (hf.drawId && drawId && hf.drawId !== drawId) return false;
      return true;
    });
    if (isCachedBlocked) return true;
  }
  try {
    const snap = await get(ref(db, "hardFavoriteNumbers"));
    if (snap.exists()) {
      const val = snap.val();
      const list = Object.keys(val).map((k) => ({ ...val[k], id: val[k].id || k }));
      return list.some((hf) => {
        if (hf.isArchived) return false;
        if (normalizeBookingNumber(hf.number) !== norm) return false;
        const catMatch = hf.category === "all" || hf.category === category;
        if (!catMatch) return false;
        if (hf.drawId && drawId && hf.drawId !== drawId) return false;
        return true;
      });
    }
  } catch (err) {
    console.error("[HardFavorite] Error querying database for validation:", err);
  }
  return false;
}
async function addHardFavoriteNumber(category, rawNumber, note, drawId) {
  var _a;
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: "NO_INTERNET" };
  if (!isLoggedUserAdminOrSuper() && !isLoggedUserDataEntry()) {
    return { success: false, error: "صرف ایڈمن کو ہارڈ فیورٹ نمبر شامل کرنے کی اجازت ہے۔" };
  }
  const normalized = normalizeBookingNumber(rawNumber);
  if (!normalized) {
    return { success: false, error: "براہ کرم درست نمبر درج کریں۔" };
  }
  if (!/^\d+$/.test(normalized)) {
    return { success: false, error: "نمبر میں صرف ہندسے (0-9) ہونے چاہئیں۔" };
  }
  try {
    const snap = await get(ref(db, "hardFavoriteNumbers"));
    const val = snap.exists() ? snap.val() : {};
    const existingList = Object.keys(val).map((k) => ({ ...val[k], id: val[k].id || k }));
    const isDuplicate = existingList.some((hf) => {
      if (hf.isArchived) return false;
      if (normalizeBookingNumber(hf.number) !== normalized) return false;
      if (category === "all" || hf.category === "all" || hf.category === category) {
        if (drawId && hf.drawId && hf.drawId !== drawId) ;
        return true;
      }
      return false;
    });
    if (isDuplicate) {
      return { success: false, error: `نمبر ${normalized} پہلے سے ہارڈ فیورٹ / بلاک لسٹ میں موجود ہے۔` };
    }
    const id = "hf-" + Date.now() + "-" + Math.floor(Math.random() * 1e3);
    const newEntry = {
      id,
      category,
      number: normalized,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      createdBy: ((_a = auth.currentUser) == null ? void 0 : _a.email) || "admin",
      ...(note == null ? void 0 : note.trim()) && { note: note.trim() },
      ...drawId && { drawId },
      isArchived: false
    };
    await set(ref(db, `hardFavoriteNumbers/${id}`), newEntry);
    const idx = cachedHardFavoriteNumbers.findIndex((h) => h.id === id);
    if (idx !== -1) {
      cachedHardFavoriteNumbers[idx] = newEntry;
    } else {
      cachedHardFavoriteNumbers.unshift(newEntry);
    }
    notifyListeners();
    return { success: true };
  } catch (err) {
    console.error("[HardFavorite] Error adding entry:", err);
    return { success: false, error: err.message || "ہارڈ فیورٹ نمبر شامل کرنے میں خرابی پیش آئی۔" };
  }
}
async function removeHardFavoriteNumber(id) {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: "NO_INTERNET" };
  if (!isLoggedUserAdminOrSuper() && !isLoggedUserDataEntry()) {
    return { success: false, error: "صرف ایڈمن کو ہارڈ فیورٹ نمبر ہٹانے کی اجازت ہے۔" };
  }
  try {
    await remove(ref(db, `hardFavoriteNumbers/${id}`));
    cachedHardFavoriteNumbers = cachedHardFavoriteNumbers.filter((h) => h.id !== id);
    notifyListeners();
    return { success: true };
  } catch (err) {
    console.error("[HardFavorite] Error removing entry:", err);
    return { success: false, error: err.message || "ہارڈ فیورٹ نمبر ہٹانے میں خرابی پیش آئی۔" };
  }
}
function getDemands() {
  return cachedDemands;
}
async function addDemand(email, category, number, firstAmount, secondAmount, bondValue, drawNumber, drawDate, drawCity, drawId) {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: "NO_INTERNET" };
  }
  const normalizedEmail = email.toLowerCase();
  const user = cachedUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (!user) return { success: false, error: "کسٹمر ریکارڈ نہیں ملا" };
  const isHardFavBlocked = await checkIsNumberHardFavorite(category, number, drawId);
  if (isHardFavBlocked) {
    return { success: false, error: "یہ نمبر اس وقت booking کے لیے دستیاب نہیں ہے۔" };
  }
  const totalCost = firstAmount + secondAmount;
  if (user.balance < totalCost) {
    return { success: false, error: "آپ کے والٹ میں کافی رقم موجود نہیں ہے" };
  }
  const demandId = "demand-" + Date.now() + "-" + Math.floor(Math.random() * 1e3);
  const isDealer = user.role === "dealer";
  const newDemand = {
    id: demandId,
    userEmail: normalizedEmail,
    ...isDealer && { requesterRole: "dealer" },
    ...isDealer && user.uid && { dealerId: user.uid },
    ...isDealer && { dealerEmail: user.email || normalizedEmail },
    ...isDealer && { dealerName: user.name || "ڈیلر" },
    category,
    number,
    firstAmount,
    secondAmount,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    status: "pending",
    ...drawId && { drawId },
    ...bondValue && { bondValue },
    ...drawNumber && { drawNumber },
    ...drawCity && { drawCity },
    ...drawDate && { drawDate }
  };
  try {
    await set(ref(db, `demands/${demandId}`), newDemand);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message || "ڈیمانڈ بھیجنے کے دوران غلطی پیش آئی۔" };
  }
}
async function approveDemand(demandId) {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: "NO_INTERNET" };
  }
  const demand = cachedDemands.find((d) => d.id === demandId);
  if (!demand) {
    return { success: false, error: "ڈیمانڈ ریکارڈ نہیں ملا" };
  }
  if (demand.status !== "pending") {
    return {
      success: false,
      error: "یہ ڈیمانڈ پہلے ہی عمل میں لائی جا چکی ہے"
    };
  }
  const userEmail = demand.userEmail.toLowerCase().trim();
  const cached = cachedUsers.find(
    (u) => u.email && u.email.toLowerCase().trim() === userEmail
  );
  if (!(cached == null ? void 0 : cached.uid)) {
    return {
      success: false,
      error: "صارف کا ریکارڈ (یا یو آئی ڈی) نہیں ملا۔"
    };
  }
  const requesterRole = demand.requesterRole || (cached.role === "dealer" ? "dealer" : "customer");
  const isDealer = requesterRole === "dealer";
  const bookingId = (isDealer ? "dlr-booking-" : "booking-") + Date.now() + "-" + Math.floor(Math.random() * 1e3);
  const bookingCollection = isDealer ? "dealerBookings" : "bookings";
  const txId = "tx-booking-" + bookingId;
  try {
    const demandSnap = await get(ref(db, `demands/${demandId}`));
    if (!demandSnap.exists()) {
      throw new Error("ڈیمانڈ ریکارڈ نہیں ملا");
    }
    const currentDemand = demandSnap.val();
    if (currentDemand.status !== "pending") {
      throw new Error("یہ ڈیمانڈ پہلے ہی عمل میں لائی جا چکی ہے");
    }
    const userSnap = await get(ref(db, `users/${cached.uid}`));
    if (!userSnap.exists()) {
      throw new Error("صارف کا ریکارڈ نہیں ملا");
    }
    const userData = userSnap.val();
    const currentBalance = userData.balance ?? 0;
    const totalCost = (currentDemand.firstAmount || 0) + (currentDemand.secondAmount || 0);
    if (totalCost <= 0) {
      throw new Error("ڈیمانڈ کی رقم درست نہیں ہے");
    }
    if (currentBalance < totalCost) {
      throw new Error("صارف کے والٹ میں کافی رقم موجود نہیں ہے");
    }
    const isHardFavBlocked = await checkIsNumberHardFavorite(currentDemand.category, currentDemand.number, currentDemand.drawId);
    if (isHardFavBlocked) {
      throw new Error("یہ نمبر اس وقت booking کے لیے دستیاب نہیں ہے۔");
    }
    let bookingObj;
    if (isDealer) {
      bookingObj = {
        id: bookingId,
        dealerId: cached.uid,
        dealerEmail: userData.email || currentDemand.dealerEmail || userEmail,
        dealerName: userData.name || currentDemand.dealerName || cached.name || "ڈیلر",
        category: currentDemand.category,
        number: currentDemand.number,
        firstAmount: currentDemand.firstAmount,
        secondAmount: currentDemand.secondAmount,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        ...currentDemand.drawId && {
          drawId: currentDemand.drawId
        },
        ...currentDemand.bondValue && {
          bondValue: currentDemand.bondValue
        },
        ...currentDemand.drawNumber && {
          drawNumber: currentDemand.drawNumber
        },
        ...currentDemand.drawCity && {
          drawCity: currentDemand.drawCity
        },
        ...currentDemand.drawDate && {
          drawDate: currentDemand.drawDate
        }
      };
    } else {
      bookingObj = {
        id: bookingId,
        userEmail: currentDemand.userEmail,
        category: currentDemand.category,
        number: currentDemand.number,
        firstAmount: currentDemand.firstAmount,
        secondAmount: currentDemand.secondAmount,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        ...currentDemand.drawId && {
          drawId: currentDemand.drawId
        },
        ...currentDemand.bondValue && {
          bondValue: currentDemand.bondValue
        },
        ...currentDemand.drawNumber && {
          drawNumber: currentDemand.drawNumber
        },
        ...currentDemand.drawCity && {
          drawCity: currentDemand.drawCity
        },
        ...currentDemand.drawDate && {
          drawDate: currentDemand.drawDate
        }
      };
    }
    const categoryLabelMap = {
      pakistan_bond: "پاکستان پرائز بانڈ",
      thailand_lottery: "تھائی لینڈ لاٹری"
    };
    const tx = {
      id: txId,
      userId: cached.uid,
      userEmail: userData.email || currentDemand.userEmail || userEmail,
      userName: userData.name || cached.name || (isDealer ? "ڈیلر" : "صارف"),
      type: "booking_deduction",
      amount: totalCost,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      status: "approved",
      bookingId,
      note: `${categoryLabelMap[currentDemand.category] || currentDemand.category} نمبر #${currentDemand.number} ${isDealer ? "ڈیلر " : ""}بکنگ ڈیمانڈ منظوری کٹوتی`
    };
    const updates = {};
    updates[`${bookingCollection}/${bookingId}`] = bookingObj;
    updates[`transactions/${txId}`] = tx;
    updates[`users/${cached.uid}/balance`] = currentBalance - totalCost;
    updates[`users/${cached.uid}/lastBookingId`] = bookingId;
    updates[`demands/${demandId}/status`] = "approved";
    await update(ref(db), updates);
    cached.balance = (cached.balance || 0) - ((demand.firstAmount || 0) + (demand.secondAmount || 0));
    demand.status = "approved";
    notifyListeners();
    return { success: true };
  } catch (err) {
    console.error(
      "Approve demand transaction failed:",
      err
    );
    return {
      success: false,
      error: err.message || "ڈیمانڈ منظور کرنے کے دوران غلطی پیش آئی۔"
    };
  }
}
async function rejectDemand(demandId) {
  const online = await checkInternetConnection();
  if (!online) {
    return { success: false, error: "NO_INTERNET" };
  }
  const demand = cachedDemands.find((d) => d.id === demandId);
  if (!demand) return { success: false, error: "ڈیمانڈ ریکارڈ نہیں ملا" };
  if (demand.status !== "pending") {
    return { success: false, error: "یہ ڈیمانڈ پہلے ہی عمل میں لائی جا چکی ہے" };
  }
  try {
    await update(ref(db, `demands/${demandId}`), {
      status: "rejected"
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message || "ڈیمانڈ مسترد کرنے کے دوران غلطی پیش آئی۔" };
  }
}
function getDrawDeadlines() {
  return cachedDeadlines;
}
async function setDrawDeadline(category, deadlineIso, titleUrdu, status, nextPrizeBondValue, nextDrawCity, nextDrawNumber, nextDrawDate, drawId, bookingStatusUrdu) {
  const online = await checkInternetConnection();
  if (!online) return;
  const targetDocId = drawId || (category === "pakistan_bond" ? `pb_draw_${Date.now()}` : `th_draw_${Date.now()}`);
  const existing = cachedDeadlines.find((d) => (d.id || d.drawId || d.category) === targetDocId);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const deadline = {
    id: targetDocId,
    drawId: targetDocId,
    category,
    deadlineIso,
    titleUrdu,
    status,
    bookingStatusUrdu: status === "closed" || status === "result_announced" ? "بکنگ بند ہے" : "بکنگ کھول گئی",
    ...nextPrizeBondValue !== void 0 && { nextPrizeBondValue },
    ...nextDrawCity !== void 0 && { nextDrawCity },
    ...nextDrawNumber !== void 0 && { nextDrawNumber },
    ...nextDrawDate !== void 0 && { nextDrawDate },
    createdAt: (existing == null ? void 0 : existing.createdAt) || now,
    updatedAt: now
  };
  await set(ref(db, `deadlines/${targetDocId}`), deadline);
  const idx = cachedDeadlines.findIndex((d) => (d.id || d.drawId || d.category) === targetDocId);
  if (idx !== -1) {
    cachedDeadlines[idx] = deadline;
  } else {
    cachedDeadlines.push(deadline);
  }
  notifyListeners();
}
async function deleteDrawDeadline(id) {
  const online = await checkInternetConnection();
  if (!online) return;
  await remove(ref(db, `deadlines/${id}`));
  cachedDeadlines = cachedDeadlines.filter((d) => d.id !== id);
  notifyListeners();
}
let cachedPakistanBondResults = [];
let cachedThaiLotteryResults = [];
function getPakistanBondResults() {
  return cachedPakistanBondResults;
}
function getThaiLotteryResults() {
  if (cachedThaiLotteryResults.length === 0) {
    return thailandLotteryDraws;
  }
  return cachedThaiLotteryResults;
}
async function autoCleanOldDrawData(category, targetDrawId) {
  var _a, _b, _c, _d;
  if (!targetDrawId) {
    console.log(`[Store] No targetDrawId provided for autoCleanOldDrawData (${category}). Skipping archiving of active draws.`);
    return;
  }
  try {
    console.log(`Starting auto archiving for completed draw data of category: ${category}, drawId: ${targetDrawId}`);
    const updates = {};
    const bookingsSnap = await get(ref(db, "bookings"));
    if (bookingsSnap.exists()) {
      const val = bookingsSnap.val();
      for (const id of Object.keys(val)) {
        if (((_a = val[id]) == null ? void 0 : _a.drawId) === targetDrawId) {
          updates[`bookings/${id}/isArchived`] = true;
        }
      }
    }
    const dealerBookingsSnap = await get(ref(db, "dealerBookings"));
    if (dealerBookingsSnap.exists()) {
      const val = dealerBookingsSnap.val();
      for (const id of Object.keys(val)) {
        if (((_b = val[id]) == null ? void 0 : _b.drawId) === targetDrawId) {
          updates[`dealerBookings/${id}/isArchived`] = true;
        }
      }
    }
    const demandsSnap = await get(ref(db, "demands"));
    if (demandsSnap.exists()) {
      const val = demandsSnap.val();
      for (const id of Object.keys(val)) {
        if (((_c = val[id]) == null ? void 0 : _c.drawId) === targetDrawId) {
          updates[`demands/${id}/isArchived`] = true;
        }
      }
    }
    const limitsSnap = await get(ref(db, "limits"));
    if (limitsSnap.exists()) {
      const val = limitsSnap.val();
      for (const id of Object.keys(val)) {
        if (((_d = val[id]) == null ? void 0 : _d.drawId) === targetDrawId) {
          updates[`limits/${id}/isArchived`] = true;
        }
      }
    }
    const matchingDeadline = cachedDeadlines.find(
      (d) => d.id === targetDrawId || d.drawId === targetDrawId
    );
    const deadlineDocId = (matchingDeadline == null ? void 0 : matchingDeadline.id) || targetDrawId;
    updates[`deadlines/${deadlineDocId}/status`] = "result_announced";
    updates[`deadlines/${deadlineDocId}/bookingStatusUrdu`] = "بکنگ بند ہے";
    updates[`deadlines/${deadlineDocId}/isArchived`] = false;
    updates[`deadlines/${deadlineDocId}/updatedAt`] = (/* @__PURE__ */ new Date()).toISOString();
    if (Object.keys(updates).length > 0) {
      await update(ref(db), updates);
    }
    const idx = cachedDeadlines.findIndex(
      (d) => d.id === deadlineDocId || d.drawId === targetDrawId
    );
    if (idx !== -1) {
      cachedDeadlines[idx] = {
        ...cachedDeadlines[idx],
        status: "result_announced",
        bookingStatusUrdu: "بکنگ بند ہے",
        isArchived: false
      };
    }
    notifyListeners();
  } catch (err) {
    console.error("Auto archiving of completed draw data failed:", err);
    throw err;
  }
}
async function addResult(result) {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: "NO_INTERNET" };
  if (result.category === "pakistan_bond") {
    const pb = result;
    const exists = cachedPakistanBondResults.some(
      (r) => r.bondValue.toLowerCase().replace(/[\s,.]+/g, "") === pb.bondValue.toLowerCase().replace(/[\s,.]+/g, "") && r.drawNoOnly.trim() === pb.drawNoOnly.trim()
    );
    if (exists) {
      return {
        success: false,
        error: `اس بانڈ مالیت (${pb.bondValue}) اور ڈرا نمبر (${pb.drawNoOnly}) کا نتیجہ پہلے ہی موجود ہے۔`
      };
    }
  } else {
    const tl = result;
    const exists = cachedThaiLotteryResults.some(
      (r) => r.drawNo.trim().toLowerCase() === tl.drawNo.trim().toLowerCase()
    );
    if (exists) {
      return {
        success: false,
        error: `تھائی لاٹری ڈرا (${tl.drawNo}) کا نتیجہ پہلے ہی موجود ہے۔`
      };
    }
  }
  try {
    const colName = result.category === "pakistan_bond" ? "pakistanBondResults" : "thaiLotteryResults";
    await set(ref(db, `${colName}/${result.id}`), result);
    if (result.category === "pakistan_bond") {
      const pb = result;
      const idx = cachedPakistanBondResults.findIndex((r) => r.id === pb.id);
      if (idx !== -1) cachedPakistanBondResults[idx] = pb;
      else cachedPakistanBondResults.push(pb);
      cachedPakistanBondResults = sortResultsChronological(cachedPakistanBondResults);
    } else {
      const tl = result;
      const idx = cachedThaiLotteryResults.findIndex((r) => r.id === tl.id);
      if (idx !== -1) cachedThaiLotteryResults[idx] = tl;
      else cachedThaiLotteryResults.push(tl);
      cachedThaiLotteryResults = sortResultsChronological(cachedThaiLotteryResults);
    }
    notifyListeners();
    if (result.drawId) {
      await autoCleanOldDrawData(result.category, result.drawId);
    }
    return { success: true };
  } catch (err) {
    console.error("Add result failed:", err);
    return { success: false, error: err.message || "قرعہ اندازی کا نتیجہ محفوظ کرنے میں غلطی پیش آئی۔" };
  }
}
async function editResult(result) {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: "NO_INTERNET" };
  try {
    const colName = result.category === "pakistan_bond" ? "pakistanBondResults" : "thaiLotteryResults";
    await update(ref(db, `${colName}/${result.id}`), result);
    if (result.category === "pakistan_bond") {
      const pb = result;
      const idx = cachedPakistanBondResults.findIndex((r) => r.id === pb.id);
      if (idx !== -1) cachedPakistanBondResults[idx] = pb;
      else cachedPakistanBondResults.push(pb);
      cachedPakistanBondResults = sortResultsChronological(cachedPakistanBondResults);
    } else {
      const tl = result;
      const idx = cachedThaiLotteryResults.findIndex((r) => r.id === tl.id);
      if (idx !== -1) cachedThaiLotteryResults[idx] = tl;
      else cachedThaiLotteryResults.push(tl);
      cachedThaiLotteryResults = sortResultsChronological(cachedThaiLotteryResults);
    }
    notifyListeners();
    if (result.drawId) {
      const activeMatchingDeadline = cachedDeadlines.find(
        (d) => (d.id === result.drawId || d.drawId === result.drawId) && d.status !== "result_announced"
      );
      if (activeMatchingDeadline) {
        await autoCleanOldDrawData(result.category, result.drawId);
      }
    }
    return { success: true };
  } catch (err) {
    console.error("Edit result failed:", err);
    return { success: false, error: err.message || "قرعہ اندازی کا نتیجہ ترمیم کرنے میں غلطی پیش آئی۔" };
  }
}
async function deleteResult(id, category) {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: "NO_INTERNET" };
  try {
    const colName = category === "pakistan_bond" ? "pakistanBondResults" : "thaiLotteryResults";
    await remove(ref(db, `${colName}/${id}`));
    return { success: true };
  } catch (err) {
    console.error("Delete result failed:", err);
    return { success: false, error: err.message || "قرعہ اندازی کا نتیجہ حذف کرنے میں غلطی پیش آئی۔" };
  }
}
async function sendPasswordResetLink(email) {
  const online = await checkInternetConnection();
  if (!online) return { success: false, error: "انٹرنیٹ کنکشن دستیاب نہیں ہے۔" };
  return sendPasswordResetLink$1(email);
}
async function migrateUserProfileFromFirestore(uid, email) {
  if (!uid) return null;
  const normalizedEmail = (email || "").toLowerCase().trim();
  const cleanEmailKey = normalizedEmail.replace(/[.#$\[\]]/g, "_");
  try {
    let fsDocSnap = await getDoc(doc(firestore, "users", uid));
    if ((!fsDocSnap || !fsDocSnap.exists()) && cleanEmailKey) {
      const fallbackSnap = await getDoc(doc(firestore, "users", cleanEmailKey));
      if (fallbackSnap.exists()) {
        fsDocSnap = fallbackSnap;
      }
    }
    if ((!fsDocSnap || !fsDocSnap.exists()) && normalizedEmail) {
      const rawEmailSnap = await getDoc(doc(firestore, "users", normalizedEmail));
      if (rawEmailSnap.exists()) {
        fsDocSnap = rawEmailSnap;
      }
    }
    if (!fsDocSnap || !fsDocSnap.exists()) {
      try {
        const qEmail = query(collection(firestore, "users"), where("email", "==", normalizedEmail));
        const qEmailSnap = await getDocs(qEmail);
        if (!qEmailSnap.empty) {
          fsDocSnap = qEmailSnap.docs[0];
        }
      } catch (e) {
        console.warn("[FirestoreToRTDB] Query by email failed:", e);
      }
    }
    if (!fsDocSnap || !fsDocSnap.exists()) {
      try {
        const qUid = query(collection(firestore, "users"), where("uid", "==", uid));
        const qUidSnap = await getDocs(qUid);
        if (!qUidSnap.empty) {
          fsDocSnap = qUidSnap.docs[0];
        }
      } catch (e) {
        console.warn("[FirestoreToRTDB] Query by uid failed:", e);
      }
    }
    if (!fsDocSnap || !fsDocSnap.exists()) {
      try {
        const allDocsSnap = await getDocs(collection(firestore, "users"));
        for (const d of allDocsSnap.docs) {
          const data = d.data();
          const docEmail = (data.email || "").toLowerCase().trim();
          if (docEmail === normalizedEmail || data.uid === uid || d.id === uid || d.id.toLowerCase().trim() === normalizedEmail) {
            fsDocSnap = d;
            break;
          }
        }
      } catch (e) {
        console.warn("[FirestoreToRTDB] Scan all docs failed:", e);
      }
    }
    if (!fsDocSnap || !fsDocSnap.exists()) {
      return null;
    }
    const fsData = fsDocSnap.data();
    const rtdbSnap = await get(ref(db, `users/${uid}`));
    const existingRtdbData = rtdbSnap.exists() ? rtdbSnap.val() : {};
    const isSuperAdminEmail = normalizedEmail === "mastermaind.qureshi110@gmail.com";
    const isDataEntryEmail = normalizedEmail === "fareed.ghulam@gmail.com";
    let resolvedRole = fsData.role || existingRtdbData.role || "customer";
    let resolvedIsAdmin = fsData.isAdmin ?? existingRtdbData.isAdmin ?? false;
    if (isSuperAdminEmail || resolvedRole === "superAdmin") {
      resolvedRole = "superAdmin";
      resolvedIsAdmin = true;
    } else if (isDataEntryEmail || resolvedRole === "dataEntryAdmin") {
      resolvedRole = "dataEntryAdmin";
      resolvedIsAdmin = true;
    } else if (resolvedRole === "admin" || resolvedIsAdmin === true) {
      resolvedRole = "admin";
      resolvedIsAdmin = true;
    } else if (resolvedRole === "dealer") {
      resolvedRole = "dealer";
      resolvedIsAdmin = false;
    } else {
      resolvedRole = "customer";
      resolvedIsAdmin = false;
    }
    const migratedUser = {
      ...fsData,
      ...existingRtdbData,
      uid,
      email: normalizedEmail || fsData.email || existingRtdbData.email || "",
      name: fsData.name ?? existingRtdbData.name ?? "",
      phone: fsData.phone ?? existingRtdbData.phone ?? "",
      city: fsData.city ?? existingRtdbData.city ?? "",
      status: fsData.status ?? existingRtdbData.status ?? (fsData.active === false ? "inactive" : "active"),
      balance: typeof fsData.balance === "number" ? fsData.balance : typeof existingRtdbData.balance === "number" ? existingRtdbData.balance : Number(fsData.balance) || 0,
      role: resolvedRole,
      isAdmin: resolvedIsAdmin,
      active: fsData.active ?? existingRtdbData.active ?? true,
      profileCompleted: Boolean(
        fsData.profileCompleted || existingRtdbData.profileCompleted || fsData.name && fsData.phone && fsData.city
      )
    };
    await set(ref(db, `users/${uid}`), migratedUser);
    console.log(`[FirestoreToRTDB] Successfully migrated profile for ${normalizedEmail} (UID: ${uid}) to RTDB`);
    return migratedUser;
  } catch (err) {
    console.error(`[FirestoreToRTDB] Failed to migrate user ${email}:`, err);
    return null;
  }
}
async function migrateAllFirestoreUsersToRtdb() {
  const details = [];
  const report = {
    success: false,
    firestoreCount: 0,
    rtdbCount: 0,
    migratedCount: 0,
    mergedCount: 0,
    missingUids: 0,
    duplicateUids: 0,
    roleVerification: {},
    fieldVerification: {
      totalProfilesChecked: 0,
      profilesWithUid: 0,
      profilesWithEmail: 0,
      profilesWithName: 0,
      profilesWithRole: 0,
      profilesWithPhone: 0
    },
    firestoreDataPreserved: true,
    uids: [],
    details
  };
  try {
    const fsSnapshot = await getDocs(collection(firestore, "users"));
    report.firestoreCount = fsSnapshot.size;
    details.push(`Found ${fsSnapshot.size} user documents in Firestore.`);
    if (fsSnapshot.empty) {
      details.push("Firestore users collection is empty.");
      report.success = true;
      return report;
    }
    const rtdbSnap = await get(ref(db, "users"));
    const existingRtdbUsers = rtdbSnap.exists() ? rtdbSnap.val() : {};
    const seenUids = /* @__PURE__ */ new Set();
    const duplicateUidSet = /* @__PURE__ */ new Set();
    for (const docSnap of fsSnapshot.docs) {
      const fsData = docSnap.data();
      let targetUid = fsData.uid;
      if (!targetUid && docSnap.id && !docSnap.id.includes("@") && !docSnap.id.includes(".")) {
        targetUid = docSnap.id;
      }
      const email = (fsData.email || "").toLowerCase().trim();
      if (!targetUid) {
        const foundInRtdb = Object.values(existingRtdbUsers).find(
          (u) => ((u == null ? void 0 : u.email) || "").toLowerCase().trim() === email
        );
        if (foundInRtdb == null ? void 0 : foundInRtdb.uid) {
          targetUid = foundInRtdb.uid;
        } else {
          targetUid = docSnap.id;
        }
      }
      if (seenUids.has(targetUid)) {
        duplicateUidSet.add(targetUid);
      }
      seenUids.add(targetUid);
      report.uids.push(targetUid);
      const existingUser = existingRtdbUsers[targetUid];
      const isSuper = email === "mastermaind.qureshi110@gmail.com" || fsData.role === "superAdmin";
      const isDataEntry = email === "fareed.ghulam@gmail.com" || fsData.role === "dataEntryAdmin";
      let role = fsData.role || (existingUser == null ? void 0 : existingUser.role) || "customer";
      let isAdmin = fsData.isAdmin ?? (existingUser == null ? void 0 : existingUser.isAdmin) ?? false;
      if (isSuper) {
        role = "superAdmin";
        isAdmin = true;
      } else if (isDataEntry) {
        role = "dataEntryAdmin";
        isAdmin = true;
      } else if (role === "admin" || isAdmin === true) {
        role = "admin";
        isAdmin = true;
      } else if (role === "dealer") {
        role = "dealer";
        isAdmin = false;
      } else {
        role = "customer";
        isAdmin = false;
      }
      const mergedUser = {
        ...fsData,
        ...existingUser || {},
        uid: targetUid,
        email: email || fsData.email || (existingUser == null ? void 0 : existingUser.email) || "",
        name: fsData.name ?? (existingUser == null ? void 0 : existingUser.name) ?? "",
        phone: fsData.phone ?? (existingUser == null ? void 0 : existingUser.phone) ?? "",
        city: fsData.city ?? (existingUser == null ? void 0 : existingUser.city) ?? "",
        status: fsData.status ?? (existingUser == null ? void 0 : existingUser.status) ?? (fsData.active === false ? "inactive" : "active"),
        balance: typeof (existingUser == null ? void 0 : existingUser.balance) === "number" ? existingUser.balance : typeof fsData.balance === "number" ? fsData.balance : Number(fsData.balance) || 0,
        role,
        isAdmin,
        active: fsData.active ?? (existingUser == null ? void 0 : existingUser.active) ?? true,
        profileCompleted: Boolean(
          fsData.profileCompleted || (existingUser == null ? void 0 : existingUser.profileCompleted) || fsData.name && fsData.phone && fsData.city
        )
      };
      if (existingUser) {
        await update(ref(db, `users/${targetUid}`), mergedUser);
        report.mergedCount++;
      } else {
        await set(ref(db, `users/${targetUid}`), mergedUser);
        report.migratedCount++;
      }
      report.roleVerification[role] = (report.roleVerification[role] || 0) + 1;
      report.fieldVerification.totalProfilesChecked++;
      if (mergedUser.uid) report.fieldVerification.profilesWithUid++;
      if (mergedUser.email) report.fieldVerification.profilesWithEmail++;
      if (mergedUser.name) report.fieldVerification.profilesWithName++;
      if (mergedUser.role) report.fieldVerification.profilesWithRole++;
      if (mergedUser.phone) report.fieldVerification.profilesWithPhone++;
    }
    const finalRtdbSnap = await get(ref(db, "users"));
    const finalRtdbUsers = finalRtdbSnap.exists() ? finalRtdbSnap.val() : {};
    const finalRtdbKeys = Object.keys(finalRtdbUsers);
    report.rtdbCount = finalRtdbKeys.length;
    const missing = Array.from(seenUids).filter((uid) => !finalRtdbKeys.includes(uid));
    report.missingUids = missing.length;
    report.duplicateUids = duplicateUidSet.size;
    report.success = report.missingUids === 0;
    details.push(`Migration complete: ${report.migratedCount} new, ${report.mergedCount} merged.`);
    details.push(`Total RTDB users: ${report.rtdbCount}, Missing UIDs: ${report.missingUids}, Duplicate UIDs: ${report.duplicateUids}`);
    return report;
  } catch (err) {
    report.error = (err == null ? void 0 : err.message) || String(err);
    details.push(`Error during migration: ${report.error}`);
    console.error("[FirestoreToRTDB] Batch migration error:", err);
    return report;
  }
}
async function migrateUsersFromJson(usersList) {
  const details = [];
  const report = {
    success: false,
    firestoreCount: usersList.length,
    rtdbCount: 0,
    migratedCount: 0,
    mergedCount: 0,
    missingUids: 0,
    duplicateUids: 0,
    roleVerification: {},
    fieldVerification: {
      totalProfilesChecked: 0,
      profilesWithUid: 0,
      profilesWithEmail: 0,
      profilesWithName: 0,
      profilesWithRole: 0,
      profilesWithPhone: 0
    },
    firestoreDataPreserved: true,
    uids: [],
    details
  };
  try {
    const rtdbSnap = await get(ref(db, "users"));
    const existingRtdbUsers = rtdbSnap.exists() ? rtdbSnap.val() : {};
    const seenUids = /* @__PURE__ */ new Set();
    const duplicateUidSet = /* @__PURE__ */ new Set();
    for (const item of usersList) {
      const email = (item.email || "").toLowerCase().trim();
      const targetUid = item.uid || item.id;
      if (!targetUid) continue;
      if (seenUids.has(targetUid)) {
        duplicateUidSet.add(targetUid);
      }
      seenUids.add(targetUid);
      report.uids.push(targetUid);
      const existingUser = existingRtdbUsers[targetUid];
      const isSuper = email === "mastermaind.qureshi110@gmail.com" || item.role === "superAdmin";
      const isDataEntry = email === "fareed.ghulam@gmail.com" || item.role === "dataEntryAdmin";
      let role = item.role || (existingUser == null ? void 0 : existingUser.role) || "customer";
      let isAdmin = item.isAdmin ?? (existingUser == null ? void 0 : existingUser.isAdmin) ?? false;
      if (isSuper) {
        role = "superAdmin";
        isAdmin = true;
      } else if (isDataEntry) {
        role = "dataEntryAdmin";
        isAdmin = true;
      } else if (role === "admin" || isAdmin === true) {
        role = "admin";
        isAdmin = true;
      } else if (role === "dealer") {
        role = "dealer";
        isAdmin = false;
      } else {
        role = "customer";
        isAdmin = false;
      }
      const mergedUser = {
        ...item,
        ...existingUser || {},
        uid: targetUid,
        email: email || item.email || (existingUser == null ? void 0 : existingUser.email) || "",
        name: item.name ?? (existingUser == null ? void 0 : existingUser.name) ?? "",
        phone: item.phone ?? (existingUser == null ? void 0 : existingUser.phone) ?? "",
        city: item.city ?? (existingUser == null ? void 0 : existingUser.city) ?? "",
        balance: typeof (existingUser == null ? void 0 : existingUser.balance) === "number" ? existingUser.balance : typeof item.balance === "number" ? item.balance : Number(item.balance) || 0,
        role,
        isAdmin,
        active: item.active ?? (existingUser == null ? void 0 : existingUser.active) ?? true,
        profileCompleted: Boolean(
          item.profileCompleted || (existingUser == null ? void 0 : existingUser.profileCompleted) || item.name && item.phone && item.city
        )
      };
      if (existingUser) {
        await update(ref(db, `users/${targetUid}`), mergedUser);
        report.mergedCount++;
      } else {
        await set(ref(db, `users/${targetUid}`), mergedUser);
        report.migratedCount++;
      }
      report.roleVerification[role] = (report.roleVerification[role] || 0) + 1;
      report.fieldVerification.totalProfilesChecked++;
      if (mergedUser.uid) report.fieldVerification.profilesWithUid++;
      if (mergedUser.email) report.fieldVerification.profilesWithEmail++;
      if (mergedUser.name) report.fieldVerification.profilesWithName++;
      if (mergedUser.role) report.fieldVerification.profilesWithRole++;
      if (mergedUser.phone) report.fieldVerification.profilesWithPhone++;
    }
    const finalRtdbSnap = await get(ref(db, "users"));
    const finalRtdbUsers = finalRtdbSnap.exists() ? finalRtdbSnap.val() : {};
    const finalRtdbKeys = Object.keys(finalRtdbUsers);
    report.rtdbCount = finalRtdbKeys.length;
    const missing = Array.from(seenUids).filter((uid) => !finalRtdbKeys.includes(uid));
    report.missingUids = missing.length;
    report.duplicateUids = duplicateUidSet.size;
    report.success = report.missingUids === 0;
    return report;
  } catch (err) {
    report.error = (err == null ? void 0 : err.message) || String(err);
    return report;
  }
}
function DashboardHeader({
  user,
  onLogout,
  onTabChange,
  activeTab,
  onToggleAdminView,
  adminMode
}) {
  if (!user) return null;
  const isUserAdmin = user.isAdmin || user.role === "superAdmin" || user.role === "dataEntryAdmin" || user.role === "admin";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-slate-950 text-white sticky top-0 z-50 border-b-4 border-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => onTabChange("dashboard"),
          className: "cursor-pointer select-none",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/mastermind_logo.jpg",
                  alt: "MQE Logo",
                  className: "w-10 h-10 rounded-full border border-blue-500/30 object-cover shadow-sm",
                  referrerPolicy: "no-referrer"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans", children: "ماسٹر مائینڈ قریشی انٹرپرائز" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 font-mono tracking-wider", children: "MASTERMIND QURESHI ENTERPRISE" })
          ]
        }
      ),
      isUserAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          id: "toggle-admin-btn",
          onClick: onToggleAdminView,
          className: `sm:hidden flex items-center gap-1 text-[11px] px-2 py-1 rounded-none transition-all ${adminMode ? "bg-blue-500 text-white font-bold border-l-4 border-blue-700" : "bg-slate-800 text-slate-300 border border-slate-700"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-blue-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ایڈمن موڈ" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t border-slate-800 pt-2 sm:pt-0 sm:border-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            id: "wallet-badge",
            className: "wallet-pill flex flex-col justify-center text-right shadow-none min-w-[140px]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-slate-400 block font-normal leading-3 font-sans", children: "والٹ رقم (Wallet)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white text-base font-bold font-mono", children: [
                "Rs. ",
                user.balance.toLocaleString()
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "profile-nav-btn",
            onClick: () => onTabChange("profile"),
            className: `py-2.5 px-4 rounded-none transition-all flex items-center gap-2 text-xs font-semibold ${activeTab === "profile" ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-200 hover:bg-slate-700 border-b border-slate-700"}`,
            title: "کسٹمر پروفائل",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-blue-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:inline", children: "کسٹمر پروفائل" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        isUserAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "desktop-admin-toggle",
            onClick: onToggleAdminView,
            className: `hidden sm:flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-none transition-all ${adminMode ? "bg-blue-500 text-white border-b-2 border-blue-700" : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-blue-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ایڈمن پورٹل" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "logout-btn",
            onClick: onLogout,
            className: "flex items-center gap-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-200 hover:text-white text-xs font-medium px-4 py-2.5 rounded-none border border-red-500/20 transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "لاگ آؤٹ" })
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
const __vite_import_meta_env__ = {};
const PRODUCTION_FIREBASE_HOSTING_DOMAIN = "https://master-mind-qureshi-enterprise.web.app";
const getCanonicalPublicUrl = (path) => {
  var _a;
  const envUrl = (_a = __vite_import_meta_env__ == null ? void 0 : __vite_import_meta_env__.VITE_PUBLIC_URL) == null ? void 0 : _a.replace(/\/$/, "");
  const base = envUrl || PRODUCTION_FIREBASE_HOSTING_DOMAIN;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
};
const PRIVACY_POLICY_URL = getCanonicalPublicUrl("/privacy-policy.html");
const DELETE_ACCOUNT_URL = getCanonicalPublicUrl("/delete-account.html");
const openExternalUrl = (url) => {
  if (typeof window === "undefined") return;
  try {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      window.location.assign(url);
    }
  } catch (error) {
    console.warn("Falling back to direct window.location navigation for URL:", url, error);
    window.location.href = url;
  }
};
function RegistrationForm({ onRegister, onLoginWithCredentials, onGoogleLogin }) {
  const [isLoginTab, setIsLoginTab] = reactExports.useState(true);
  const whatsappNumber = getSupportWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("السلام علیکم! مجھے ماسٹر مائینڈ قریشی انٹرپرائز پرائز بانڈ سسٹم کے بارے میں مدد چاہئے۔")}`;
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [registerPassword, setRegisterPassword] = reactExports.useState("");
  const [loginIdentifier, setLoginIdentifier] = reactExports.useState("");
  const [loginPassword, setLoginPassword] = reactExports.useState("");
  const [isForgotPassword, setIsForgotPassword] = reactExports.useState(false);
  const [forgotEmail, setForgotEmail] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const handleGoogleSignIn = async () => {
    if (!onGoogleLogin) return;
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      const res = await onGoogleLogin();
      if (res.success) {
        setSuccess("گوگل لاگ ان کامیاب ہو گیا ہے!");
      } else {
        setError(res.error || "گوگل سائن ان میں کوئی مسئلہ پیش آیا۔");
      }
    } catch (err) {
      setError((err == null ? void 0 : err.message) || "گوگل لاگ ان میں خرابی پیش آئی۔");
    } finally {
      setIsLoading(false);
    }
  };
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!forgotEmail) {
      setError("براہ کرم اپنا ایمیل ایڈریس درج کریں۔ (Please enter your email address.)");
      return;
    }
    setIsLoading(true);
    try {
      const res = await sendPasswordResetLink(forgotEmail);
      if (res.success) {
        setSuccess("پاس ورڈ دوبارہ ترتیب دینے کی ای میل کامیابی سے بھیج دی گئی ہے! براہ کرم اپنا ان باکس چیک کریں۔");
        setForgotEmail("");
        setIsForgotPassword(false);
      } else {
        setError(res.error || "پاس ورڈ دوبارہ ترتیب دینے میں خرابی پیش آئی۔");
      }
    } catch (err) {
      setError((err == null ? void 0 : err.message) || "خرابی پیش آئی۔");
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name || !phone || !city || !email || !registerPassword) {
      setError("براہ کرم تمام خانے پُر کریں۔ (Please fill in all fields.)");
      return;
    }
    if (!email.includes("@")) {
      setError("براہ کرم درست ایمیل ایڈریس ٹائپ کریں۔ (Please enter a valid email.)");
      return;
    }
    setIsLoading(true);
    try {
      const online = await checkInternetConnection();
      if (!online) {
        setError("No internet connection. Please turn on Wi-Fi or Mobile Data and try again.");
        setIsLoading(false);
        return;
      }
      const res = await onRegister(name, phone, city, email, registerPassword);
      if (res && res.success) {
        setSuccess("رجسٹریشن کامیاب ہو گئی ہے! لاگ ان کیا جا رہا ہے...");
      } else {
        setError((res == null ? void 0 : res.error) || "رجسٹریشن کے دوران کوئی خرابی پیش آئی۔");
      }
    } catch (err) {
      setError(err.message || "رجسٹریشن کے دوران کوئی خرابی پیش آئی۔");
    } finally {
      setIsLoading(false);
    }
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!loginIdentifier || !loginPassword) {
      setError("براہ کرم اپنا ایمیل/فون اور پاس ورڈ درج کریں۔ (Please enter your email/phone and password.)");
      return;
    }
    setIsLoading(true);
    try {
      const online = await checkInternetConnection();
      if (!online) {
        setError("No internet connection. Please turn on Wi-Fi or Mobile Data and try again.");
        setIsLoading(false);
        return;
      }
      const res = await onLoginWithCredentials(loginIdentifier, loginPassword);
      if (res.success) {
        setSuccess("لاگ ان کامیاب ہو گیا ہے!");
      } else {
        setError(res.error || "ایمیل/فون یا پاس ورڈ درست نہیں ہے۔ (Invalid credentials.)");
      }
    } catch (err) {
      setError(err.message || "لاگ ان کے دوران کوئی خرابی پیش آئی۔");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-4 bg-slate-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-white rounded-none border-2 border-slate-300 overflow-hidden shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950 text-white p-8 text-center relative border-b-4 border-blue-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto mb-4 w-24 h-24 rounded-full border-2 border-amber-500/30 overflow-hidden shadow-lg shadow-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/mastermind_logo.jpg",
          alt: "MasterMind Qureshi Logo",
          className: "w-full h-full object-cover",
          referrerPolicy: "no-referrer"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold font-sans text-white", children: "ماسٹر مائینڈ قریشی انٹرپرائز" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs mt-1 font-mono tracking-widest", children: "MASTERMIND QURESHI ENTERPRISE" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-b border-slate-300 font-bold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          id: "tab-login",
          type: "button",
          onClick: () => {
            setIsLoginTab(true);
            setError("");
            setSuccess("");
          },
          className: `w-1/2 py-4 text-center text-sm transition-colors cursor-pointer rounded-none ${isLoginTab ? "text-blue-600 border-b-4 border-blue-600 bg-slate-50 font-extrabold" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/50"}`,
          children: "لاگ ان (Login)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          id: "tab-register",
          type: "button",
          onClick: () => {
            setIsLoginTab(false);
            setError("");
            setSuccess("");
          },
          className: `w-1/2 py-4 text-center text-sm transition-colors cursor-pointer rounded-none ${!isLoginTab ? "text-blue-600 border-b-4 border-blue-600 bg-slate-50 font-extrabold" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/50"}`,
          children: "کسٹمر رجسٹریشن (Register)"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 sm:p-8", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 p-3 rounded-none bg-red-50 border-r-4 border-red-500 border-l border-t border-b border-slate-200 text-red-700 text-xs leading-relaxed text-right font-sans", children: [
        "⚠️ ",
        error
      ] }),
      success && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 p-3 rounded-none bg-emerald-50 border-r-4 border-emerald-500 border-l border-t border-b border-slate-200 text-emerald-800 text-xs leading-relaxed text-right font-sans", children: [
        "✓ ",
        success
      ] }),
      onGoogleLogin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleGoogleSignIn,
            disabled: isLoading,
            className: "w-full bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-800 font-bold py-3.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer hover:border-slate-300 disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-5 h-5 shrink-0", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4285F4", d: "M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#34A853", d: "M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FBBC05", d: "M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EA4335", d: "M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-sans", children: "گوگل کے ساتھ سائن ان کریں (Sign in with Google)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative my-5 flex items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-slate-200 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white px-3 text-[11px] text-slate-400 font-bold uppercase tracking-wider absolute", children: "یا (OR)" })
        ] })
      ] }),
      !isLoginTab ? (
        /* Registration Form */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleRegisterSubmit, className: "space-y-4 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-700 text-xs font-bold mb-1.5 font-sans", htmlFor: "reg-name", children: "کسٹمر نام (Customer Name) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "reg-name",
                  type: "text",
                  required: true,
                  disabled: isLoading,
                  placeholder: "اپنا نام لکھیں",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  className: "w-full text-right bg-slate-50 border border-slate-300 rounded-none py-3 px-4 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-sans",
                  dir: "rtl"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 right-4 -translate-y-1/2 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-700 text-xs font-bold mb-1.5 font-sans", htmlFor: "reg-phone", children: "موبائل نمبر (Mobile Number) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "reg-phone",
                  type: "tel",
                  required: true,
                  disabled: isLoading,
                  placeholder: "03001234567",
                  value: phone,
                  onChange: (e) => setPhone(e.target.value),
                  className: "w-full text-left bg-slate-50 border border-slate-300 rounded-none py-3 px-4 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 right-4 -translate-y-1/2 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-700 text-xs font-bold mb-1.5 font-sans", htmlFor: "reg-city", children: "شہر (City) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "reg-city",
                  type: "text",
                  required: true,
                  disabled: isLoading,
                  placeholder: "مثال: لاہور، کراچی، ملتان",
                  value: city,
                  onChange: (e) => setCity(e.target.value),
                  className: "w-full text-right bg-slate-50 border border-slate-300 rounded-none py-3 px-4 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-sans",
                  dir: "rtl"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 right-4 -translate-y-1/2 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-700 text-xs font-bold mb-1.5 font-sans", htmlFor: "reg-email", children: "ایمیل ایڈریس (Email / ID) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "reg-email",
                  type: "email",
                  required: true,
                  disabled: isLoading,
                  placeholder: "name@example.com",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "w-full text-left bg-slate-50 border border-slate-300 rounded-none py-3 px-4 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 right-4 -translate-y-1/2 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-700 text-xs font-bold mb-1.5 font-sans", htmlFor: "reg-password", children: "پاس ورڈ (Password) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "reg-password",
                  type: "password",
                  required: true,
                  disabled: isLoading,
                  placeholder: "••••••••",
                  value: registerPassword,
                  onChange: (e) => setRegisterPassword(e.target.value),
                  className: "w-full text-left bg-slate-50 border border-slate-300 rounded-none py-3 px-4 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 right-4 -translate-y-1/2 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              id: "submit-register",
              type: "submit",
              disabled: isLoading,
              className: "w-full mt-4 bg-slate-950 hover:bg-slate-900 text-blue-400 hover:text-blue-300 py-3.5 px-4 rounded-none font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border-b-4 border-blue-600 disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isLoading ? "رجسٹریشن جاری ہے..." : "نیا اکاؤنٹ رجسٹر کریں" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-blue-400" })
              ]
            }
          )
        ] })
      ) : isForgotPassword ? (
        /* Forgot Password Form */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleForgotPasswordSubmit, className: "space-y-4 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-700 text-xs font-bold mb-1.5 font-sans", htmlFor: "forgot-email", children: "اپنا رجسٹرڈ ایمیل درج کریں (Enter Registered Email) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "forgot-email",
                  type: "email",
                  required: true,
                  disabled: isLoading,
                  placeholder: "name@example.com",
                  value: forgotEmail,
                  onChange: (e) => setForgotEmail(e.target.value),
                  className: "w-full text-left bg-slate-50 border border-slate-300 rounded-none py-3 px-4 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 right-4 -translate-y-1/2 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end items-center pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setIsForgotPassword(false);
                setError("");
                setSuccess("");
              },
              className: "text-xs text-blue-600 hover:underline cursor-pointer font-semibold",
              children: "لاگ ان پر واپس جائیں (Back to Login)"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              id: "submit-forgot",
              type: "submit",
              disabled: isLoading,
              className: "w-full mt-4 bg-slate-950 hover:bg-slate-900 text-blue-400 hover:text-blue-300 py-3.5 px-4 rounded-none font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border-b-4 border-blue-600 disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isLoading ? "ای میل بھیجی جا رہی ہے..." : "ری سیٹ لنک بھیجیں (Reset Link)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4 text-blue-400" })
              ]
            }
          )
        ] })
      ) : (
        /* Login Form */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLoginSubmit, className: "space-y-4 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-700 text-xs font-bold mb-1.5 font-sans", htmlFor: "login-identifier", children: "اپنا رجسٹرڈ ایمیل یا موبائل نمبر لکھیں (Email or Phone) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "login-identifier",
                  type: "text",
                  required: true,
                  disabled: isLoading,
                  placeholder: "name@example.com / 03001234567",
                  value: loginIdentifier,
                  onChange: (e) => setLoginIdentifier(e.target.value),
                  className: "w-full text-left bg-slate-50 border border-slate-300 rounded-none py-3 px-4 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 right-4 -translate-y-1/2 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-700 text-xs font-bold mb-1.5 font-sans", htmlFor: "login-password", children: "پاس ورڈ (Password) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "login-password",
                  type: "password",
                  required: true,
                  disabled: isLoading,
                  placeholder: "••••••••",
                  value: loginPassword,
                  onChange: (e) => setLoginPassword(e.target.value),
                  className: "w-full text-left bg-slate-50 border border-slate-300 rounded-none py-3 px-4 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 right-4 -translate-y-1/2 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end items-center pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setIsForgotPassword(true);
                setError("");
                setSuccess("");
              },
              className: "text-xs text-blue-600 hover:underline cursor-pointer font-semibold",
              children: "پاس ورڈ بھول گئے؟ (Forgot Password?)"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              id: "submit-login",
              type: "submit",
              disabled: isLoading,
              className: "w-full mt-4 bg-slate-950 hover:bg-slate-900 text-blue-400 hover:text-blue-300 py-3.5 px-4 rounded-none font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border-b-4 border-blue-600 disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isLoading ? "لاگ ان جاری ہے..." : "اپنے اکاؤنٹ میں لاگ ان کریں" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4 text-blue-400" })
              ]
            }
          )
        ] })
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-5 border-t border-slate-200 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-emerald-950 text-xs font-bold mb-2 font-sans flex items-center justify-center gap-1.5 flex-row-reverse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "رجسٹریشن اور اکاؤنٹ ہیلپ لائن (WhatsApp Support)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5 text-emerald-600" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-600 mb-3.5 font-sans leading-relaxed", children: "اگر آپ کو اکاؤنٹ بنانے یا لاگ ان میں کوئی مسئلہ پیش آ رہا ہے، تو مدد کے لئے ایڈمن سے رابطہ کریں۔" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            id: "registration-whatsapp-link",
            href: whatsappUrl,
            target: "_blank",
            referrerPolicy: "no-referrer",
            rel: "noopener noreferrer",
            className: "bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-4 rounded-none border-b-2 border-emerald-800 transition-all flex items-center justify-center gap-1.5 mx-auto cursor-pointer max-w-[240px] hover:-translate-y-0.5 active:translate-y-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5 text-white" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ایڈمن سے رابطہ کریں (WhatsApp)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] text-slate-500 font-sans", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: PRIVACY_POLICY_URL,
              onClick: (e) => {
                e.preventDefault();
                openExternalUrl(PRIVACY_POLICY_URL);
              },
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:text-amber-600 transition-colors underline cursor-pointer",
              children: "رازداری کی پالیسی (Privacy Policy)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: DELETE_ACCOUNT_URL,
              onClick: (e) => {
                e.preventDefault();
                openExternalUrl(DELETE_ACCOUNT_URL);
              },
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:text-red-600 transition-colors underline cursor-pointer",
              children: "اکاؤنٹ خاتمہ (Delete Account)"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
function ProfileSetupModal({
  user,
  isOpen,
  isMandatory = false,
  onSave,
  onClose
}) {
  const [name, setName] = reactExports.useState(user.name || "");
  const [phone, setPhone] = reactExports.useState(user.phone || "");
  const [city, setCity] = reactExports.useState(user.city || "");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (isOpen) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setCity(user.city || "");
      setMessage(null);
    }
  }, [user, isOpen]);
  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!name.trim()) {
      setMessage({ type: "error", text: "براہ کرم اپنا پورا نام درج کریں۔" });
      return;
    }
    if (!phone.trim()) {
      setMessage({ type: "error", text: "براہ کرم اپنا موبائل نمبر درج کریں۔" });
      return;
    }
    if (!city.trim()) {
      setMessage({ type: "error", text: "براہ کرم اپنے شہر کا نام درج کریں۔" });
      return;
    }
    setIsLoading(true);
    try {
      const res = await onSave(name.trim(), phone.trim(), city.trim());
      if (res.success) {
        setMessage({ type: "success", text: res.message || "پروفائل کامیابی سے محفوظ ہو گئی ہے!" });
        setTimeout(() => {
          if (onClose) onClose();
        }, 1200);
      } else {
        setMessage({ type: "error", text: res.message || "پروفائل کی معلومات اپ ڈیٹ کرنے میں غلطی پیش آئی۔" });
      }
    } catch (err) {
      setMessage({ type: "error", text: (err == null ? void 0 : err.message) || "ایک غیر متوقع غلطی پیش آئی۔" });
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-right font-sans animate-in fade-in zoom-in duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 p-6 text-white relative", children: [
      !isMandatory && onClose && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "absolute top-4 left-4 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold font-sans", children: isMandatory ? "پروفائل سیٹ اپ (Profile Setup)" : "پروفائل تبدیل کریں" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-200/80 font-sans mt-0.5", children: isMandatory ? "برائے کرم آگے بڑھنے سے پہلے اپنی معلومات مکمل کریں" : "اپنی بنیادی معلومات اپ ڈیٹ کریں" })
        ] }),
        user.photoURL ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: user.photoURL,
            alt: user.name,
            className: "w-12 h-12 rounded-full border-2 border-amber-400 object-cover shadow-md",
            referrerPolicy: "no-referrer"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-6 h-6" }) })
      ] })
    ] }),
    message && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 mx-6 mt-4 rounded-xl flex items-start gap-3 ${message.type === "success" ? "bg-emerald-50 border border-emerald-200 text-emerald-800" : "bg-red-50 border border-red-200 text-red-700"}`, children: [
      message.type === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-emerald-600 shrink-0 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-red-600 shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed font-semibold", children: message.text })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-bold mb-1", children: "ای میل (غیر قابل تبدیلی)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: user.email,
            disabled: true,
            className: "w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500 font-mono text-left cursor-not-allowed"
          }
        )
      ] }),
      user.uid && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-bold mb-1", children: "یوزر ID (UID)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: user.uid,
            disabled: true,
            className: "w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500 font-mono text-left cursor-not-allowed"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-800 text-xs font-bold mb-1", children: "مکمل نام (Full Name) *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "اپنا پورا نام درج کریں",
              className: "w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-900 text-right pr-10 focus:outline-none transition-all",
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-slate-400 absolute right-3 top-3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-800 text-xs font-bold mb-1", children: "موبائل نمبر (Mobile Number) *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              placeholder: "03001234567",
              className: "w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-900 text-right pr-10 focus:outline-none transition-all",
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-slate-400 absolute right-3 top-3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-800 text-xs font-bold mb-1", children: "شہر (City) *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: city,
              onChange: (e) => setCity(e.target.value),
              placeholder: "اپنا شہر درج کریں",
              className: "w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-900 text-right pr-10 focus:outline-none transition-all",
              required: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-slate-400 absolute right-3 top-3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 flex items-center justify-end gap-3", children: [
        !isMandatory && onClose && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors",
            children: "منسوخ کریں"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: isLoading,
            className: "flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 text-xs transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer",
            children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "محفوظ ہو رہا ہے..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "معلومات محفوظ کریں (Save Profile)" })
          }
        )
      ] })
    ] })
  ] }) });
}
function DashboardOverview({
  user,
  bookings,
  onTabChange,
  adminMode,
  onUpdateProfile
}) {
  const [isProfileModalOpen, setIsProfileModalOpen] = reactExports.useState(false);
  const myBookings = bookings.filter((b) => b.userEmail.toLowerCase() === user.email.toLowerCase());
  const getCategoryTotal = (cat) => {
    return myBookings.filter((b) => b.category === cat).reduce((sum, b) => sum + b.firstAmount + b.secondAmount, 0);
  };
  const whatsappNumber = getSupportWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("السلام علیکم! مجھے ماسٹر مائینڈ قریشی انٹرپرائز پرائز بانڈ سسٹم کے بارے میں مدد چاہئے۔")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 font-sans text-right max-w-5xl mx-auto pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative border-b-4 border-amber-500 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-6 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-right", children: [
          user.photoURL ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: user.photoURL,
              alt: user.name,
              className: "w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-400 object-cover shadow-lg shrink-0",
              referrerPolicy: "no-referrer"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600/30 border-2 border-amber-400/50 flex items-center justify-center text-white shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-amber-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-[11px] font-bold px-3 py-0.5 rounded-full mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ماسٹر مائینڈ وی آئی پی ممبر" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl sm:text-2xl font-bold font-sans", children: user.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-300 font-mono mt-0.5", children: user.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[11px] text-slate-400 mt-2 font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "📍 ",
                user.city || "شہر متعین نہیں"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "📞 ",
                user.phone || "فون متعین نہیں"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center justify-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setIsProfileModalOpen(true),
            className: "bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4 text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پروفائل تبد یل کریں" })
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200/80 relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-stretch gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "موجودہ والٹ بیلنس" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30", children: "ایکٹو (Live)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 tracking-tight", children: [
            "Rs. ",
            user.balance.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mt-1", children: "آپ کے اکاؤنٹ کا موجودہ دستیاب بیلنس (Real-time Updated)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs text-slate-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "میرا UID: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-slate-300", children: user.uid || "---" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "کل بکنگز: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white", children: myBookings.length })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full md:w-80 flex flex-col justify-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => onTabChange("my_bookings"),
          className: "w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 px-5 rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-slate-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "میری کل بکنگ ہسٹری (",
              myBookings.length,
              ")"
            ] })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500 font-mono", children: "ALL ACTIVE DRAWS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-900 font-sans", children: "دستیاب قرعہ اندازی کیٹیگریز (Available Draws)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: () => onTabChange("pakistan_bond"),
            className: "bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-64 group relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-emerald-50 text-emerald-700 p-3.5 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-6 h-6" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-emerald-600 font-bold tracking-wider font-mono uppercase bg-emerald-50 px-2 py-0.5 rounded-md", children: "Category 1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-900 mt-1 group-hover:text-emerald-600 transition-colors", children: "پاکستان پرائز بانڈ (Pakistan Prize Bond)" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-xs leading-relaxed mb-4", children: "پاکستان نیشنل پرائز بانڈز کی مرضی کے نمبرز بکنگ کروائیں۔ فرسٹ اور سیکنڈ رقم منتخب کریں۔" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-mono", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-700 font-bold flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4" }),
                    " بکنگ کے لیے کھولیں"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "میری بکنگ: Rs. ",
                    getCategoryTotal("pakistan_bond").toLocaleString()
                  ] })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: () => onTabChange("thailand_lottery"),
            className: "bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-64 group relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-amber-50 text-amber-700 p-3.5 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-6 h-6" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-amber-600 font-bold tracking-wider font-mono uppercase bg-amber-50 px-2 py-0.5 rounded-md", children: "Category 2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-900 mt-1 group-hover:text-amber-600 transition-colors", children: "تھائی لینڈ ڈرا (Thailand Lottery)" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-xs leading-relaxed mb-4", children: "تھائی لینڈ لاٹری کے لکی نمبرز کی بکنگ کریں۔ پی ڈی ایف لسٹ ڈائریکٹ ڈاؤن لوڈ یا شیئر کریں۔" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-mono", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-700 font-bold flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4" }),
                    " بکنگ کے لیے کھولیں"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "میری بکنگ: Rs. ",
                    getCategoryTotal("thailand_lottery").toLocaleString()
                  ] })
                ] })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-50/70 border-2 border-emerald-500/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row shadow-sm gap-6 items-center justify-between text-right relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: whatsappUrl,
          target: "_blank",
          referrerPolicy: "no-referrer",
          rel: "noopener noreferrer",
          className: "w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5 text-white" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "واٹس ایپ پر رابطہ کریں (WhatsApp Admin)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 flex-1 text-center sm:text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-emerald-950", children: "کسی بھی مسئلہ یا والٹ میں رقم جمع کروانے کے لیے" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-emerald-900/80 text-xs leading-relaxed", children: "براہِ راست ایڈمن قریشی صاحب سے رابطہ کریں۔ Easypaisa, JazzCash, یا Bank Account سے ریچارج کروائیں۔" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProfileSetupModal,
      {
        user,
        isOpen: isProfileModalOpen,
        onSave: onUpdateProfile,
        onClose: () => setIsProfileModalOpen(false)
      }
    )
  ] });
}
const THAI_MONTHS_LIST = [
  { value: "all", labelUrdu: "تمام مہینے (All Months)", labelEng: "All Months" },
  { value: "1", labelUrdu: "جنوری (January)", labelEng: "January" },
  { value: "2", labelUrdu: "فروری (February)", labelEng: "February" },
  { value: "3", labelUrdu: "مارچ (March)", labelEng: "March" },
  { value: "4", labelUrdu: "اپریل (April)", labelEng: "April" },
  { value: "5", labelUrdu: "مئی (May)", labelEng: "May" },
  { value: "6", labelUrdu: "جون (June)", labelEng: "June" },
  { value: "7", labelUrdu: "جولائی (July)", labelEng: "July" },
  { value: "8", labelUrdu: "اگست (August)", labelEng: "August" },
  { value: "9", labelUrdu: "ستمبر (September)", labelEng: "September" },
  { value: "10", labelUrdu: "اکتوبر (October)", labelEng: "October" },
  { value: "11", labelUrdu: "نومبر (November)", labelEng: "November" },
  { value: "12", labelUrdu: "دسمبر (December)", labelEng: "December" }
];
const URDU_MONTH_NAMES = {
  1: "جنوری",
  2: "فروری",
  3: "مارچ",
  4: "اپریل",
  5: "مئی",
  6: "جون",
  7: "جولائی",
  8: "اگست",
  9: "ستمبر",
  10: "اکتوبر",
  11: "نومبر",
  12: "دسمبر"
};
const ENG_MONTH_NAMES = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};
function parseThaiDrawDate(dateStr) {
  if (!dateStr || typeof dateStr !== "string") {
    return {
      isValid: false,
      year: 0,
      month: 0,
      day: 0,
      is1st: false,
      is16th: false,
      formattedDate: "",
      monthNameEng: "",
      monthNameUrdu: ""
    };
  }
  const clean = dateStr.trim();
  const ymd = clean.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if (ymd) {
    const y = parseInt(ymd[1], 10);
    const m = parseInt(ymd[2], 10);
    const d = parseInt(ymd[3], 10);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31 && y >= 1900 && y <= 2100) {
      return {
        isValid: true,
        year: y,
        month: m,
        day: d,
        is1st: d === 1 || d === 2 || d === 30 || d === 31,
        is16th: d === 15 || d === 16 || d === 17,
        formattedDate: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
        monthNameEng: ENG_MONTH_NAMES[m] || "",
        monthNameUrdu: URDU_MONTH_NAMES[m] || ""
      };
    }
  }
  const dmy = clean.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})/);
  if (dmy) {
    const d = parseInt(dmy[1], 10);
    const m = parseInt(dmy[2], 10);
    const y = parseInt(dmy[3], 10);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31 && y >= 1900 && y <= 2100) {
      return {
        isValid: true,
        year: y,
        month: m,
        day: d,
        is1st: d === 1 || d === 2 || d === 30 || d === 31,
        is16th: d === 15 || d === 16 || d === 17,
        formattedDate: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
        monthNameEng: ENG_MONTH_NAMES[m] || "",
        monthNameUrdu: URDU_MONTH_NAMES[m] || ""
      };
    }
  }
  const parsed = new Date(clean);
  if (!isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = parsed.getMonth() + 1;
    const d = parsed.getDate();
    if (y >= 1900 && y <= 2100) {
      return {
        isValid: true,
        year: y,
        month: m,
        day: d,
        is1st: d === 1 || d === 2 || d === 30 || d === 31,
        is16th: d === 15 || d === 16 || d === 17,
        formattedDate: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
        monthNameEng: ENG_MONTH_NAMES[m] || "",
        monthNameUrdu: URDU_MONTH_NAMES[m] || ""
      };
    }
  }
  return {
    isValid: false,
    year: 0,
    month: 0,
    day: 0,
    is1st: false,
    is16th: false,
    formattedDate: clean,
    monthNameEng: "",
    monthNameUrdu: ""
  };
}
function isThaiDrawMatchingFilters(parsed, dateFilter = "all", monthFilter = "all", yearFilter = "all") {
  if (!parsed || !parsed.isValid) return false;
  const { year, month, day } = parsed;
  const hasSpecificMonth = monthFilter !== "all";
  const hasSpecificYear = yearFilter !== "all";
  const targetMonth = hasSpecificMonth ? parseInt(monthFilter, 10) : 0;
  const targetYear = hasSpecificYear ? parseInt(yearFilter, 10) : 0;
  if (dateFilter === "1st") {
    if (hasSpecificMonth && hasSpecificYear) {
      const isCurrentMonthDraw = year === targetYear && month === targetMonth && (day === 1 || day === 2);
      let prevMonth = targetMonth - 1;
      let prevYear = targetYear;
      if (prevMonth === 0) {
        prevMonth = 12;
        prevYear = targetYear - 1;
      }
      const isPrevMonthDraw = year === prevYear && month === prevMonth && (day === 30 || day === 31);
      return isCurrentMonthDraw || isPrevMonthDraw;
    }
    if (hasSpecificMonth && !hasSpecificYear) {
      const isCurrentMonthDraw = month === targetMonth && (day === 1 || day === 2);
      let prevMonth = targetMonth - 1;
      if (prevMonth === 0) {
        prevMonth = 12;
      }
      const isPrevMonthDraw = month === prevMonth && (day === 30 || day === 31);
      return isCurrentMonthDraw || isPrevMonthDraw;
    }
    if (!hasSpecificMonth && hasSpecificYear) {
      const isCurrentYear1stDraw = year === targetYear && (day === 1 || day === 2 || day === 30 || day === 31);
      const isJanPrevMonthDraw = year === targetYear - 1 && month === 12 && (day === 30 || day === 31);
      return isCurrentYear1stDraw || isJanPrevMonthDraw;
    }
    return day === 1 || day === 2 || day === 30 || day === 31;
  }
  if (dateFilter === "16th") {
    const is16thDrawGroup = day === 15 || day === 16 || day === 17;
    if (!is16thDrawGroup) return false;
    if (hasSpecificMonth && month !== targetMonth) return false;
    if (hasSpecificYear && year !== targetYear) return false;
    return true;
  }
  if (hasSpecificMonth && month !== targetMonth) return false;
  if (hasSpecificYear && year !== targetYear) return false;
  return true;
}
function filterThaiLotteryDraws(draws, dateFilter = "all", monthFilter = "all", yearFilter = "all") {
  if (!draws || draws.length === 0) return [];
  const seen = /* @__PURE__ */ new Set();
  const filtered = [];
  for (const draw of draws) {
    const parsed = parseThaiDrawDate(draw.date);
    if (!parsed.isValid) continue;
    if (isThaiDrawMatchingFilters(parsed, dateFilter, monthFilter, yearFilter)) {
      const key = draw.id || `${draw.date}-${draw.drawNo}`;
      if (!seen.has(key)) {
        seen.add(key);
        filtered.push(draw);
      }
    }
  }
  return filtered;
}
function getAvailableThaiYears(draws) {
  const yearsSet = /* @__PURE__ */ new Set();
  draws.forEach((draw) => {
    const parsed = parseThaiDrawDate(draw.date);
    if (parsed.isValid && parsed.year > 0) {
      yearsSet.add(parsed.year.toString());
    }
  });
  return Array.from(yearsSet).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
}
function computeThaiAnalysisMetrics(filteredDraws) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const totalDraws = filteredDraws.length;
  const digitCounts = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0
  };
  const posCounts = {
    0: { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 },
    1: { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 },
    2: { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 },
    3: { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 },
    4: { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 },
    5: { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 }
  };
  const akraCounts = {};
  const l2Counts = {};
  const f3Counts = {};
  const b3Counts = {};
  let totalDigitsAnalyzed = 0;
  let totalOddDigits = 0;
  let totalEvenDigits = 0;
  let firstPrizeOddsCount = 0;
  let firstPrizeEvensCount = 0;
  filteredDraws.forEach((draw) => {
    const raw = (draw.firstPrize || "").trim();
    if (!raw) return;
    const lastChar = raw[raw.length - 1];
    if (["1", "3", "5", "7", "9"].includes(lastChar)) {
      firstPrizeOddsCount++;
    } else if (["0", "2", "4", "6", "8"].includes(lastChar)) {
      firstPrizeEvensCount++;
    }
    for (let pos = 0; pos < raw.length; pos++) {
      const ch = raw[pos];
      if (ch >= "0" && ch <= "9") {
        digitCounts[ch] = (digitCounts[ch] || 0) + 1;
        totalDigitsAnalyzed++;
        if (["1", "3", "5", "7", "9"].includes(ch)) {
          totalOddDigits++;
        } else {
          totalEvenDigits++;
        }
        if (pos < 6) {
          posCounts[pos][ch] = (posCounts[pos][ch] || 0) + 1;
        }
      }
    }
    if (raw.length >= 2) {
      const akra = raw.slice(0, 2);
      akraCounts[akra] = (akraCounts[akra] || 0) + 1;
    }
    const l2 = draw.last2Digits || (raw.length >= 2 ? raw.slice(-2) : "");
    if (l2 && l2.length === 2) {
      l2Counts[l2] = (l2Counts[l2] || 0) + 1;
    }
    const f3 = draw.front3Digits || (raw.length >= 3 ? raw.slice(0, 3) : "");
    if (f3 && f3.length === 3) {
      f3Counts[f3] = (f3Counts[f3] || 0) + 1;
    }
    const b3 = draw.back3Digits || (raw.length >= 3 ? raw.slice(-3) : "");
    if (b3 && b3.length === 3) {
      b3Counts[b3] = (b3Counts[b3] || 0) + 1;
    }
  });
  const singleDigitsSorted = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => ({
    digit,
    count: digitCounts[digit] || 0,
    percentage: totalDigitsAnalyzed > 0 ? Math.round((digitCounts[digit] || 0) / totalDigitsAnalyzed * 100) : 0,
    sampleSize: totalDigitsAnalyzed
  })).sort((a, b) => b.count - a.count);
  const singleDigitStats0to9 = singleDigitsSorted.map((item, idx) => {
    let status = "neutral";
    if (idx < 2 && item.count > 0) status = "hot";
    else if (idx >= 8) status = "cold";
    return {
      ...item,
      rank: idx + 1,
      status
    };
  });
  const posLabels = [
    { urdu: "پہلا ہندسہ (Open / First Digit)", eng: "Position 1 (Open)" },
    { urdu: "دوسرا ہندسہ (Close / Second Digit)", eng: "Position 2 (Close)" },
    { urdu: "تیسرا ہندسہ (Center / Third Digit)", eng: "Position 3 (Center)" },
    { urdu: "چوتھا ہندسہ (Fourth Digit)", eng: "Position 4" },
    { urdu: "پانچواں ہندسہ (Fifth Digit)", eng: "Position 5" },
    { urdu: "چھٹا ہندسہ (Last Digit)", eng: "Position 6 (Last)" }
  ];
  const positions = [0, 1, 2, 3, 4, 5].map((posIdx) => {
    var _a2, _b2;
    const rawPosMap = posCounts[posIdx];
    const sorted = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => ({
      digit: d,
      count: rawPosMap[d] || 0,
      percentage: totalDraws > 0 ? Math.round((rawPosMap[d] || 0) / totalDraws * 100) : 0,
      sampleSize: totalDraws
    })).sort((a, b) => b.count - a.count);
    const items = sorted.map((it, idx) => ({
      ...it,
      rank: idx + 1,
      status: idx < 2 && it.count > 0 ? "hot" : idx >= 8 ? "cold" : "neutral"
    }));
    return {
      positionIndex: posIdx,
      positionLabelUrdu: posLabels[posIdx].urdu,
      positionLabelEng: posLabels[posIdx].eng,
      items,
      topDigit: ((_a2 = items[0]) == null ? void 0 : _a2.digit) || "-",
      topCount: ((_b2 = items[0]) == null ? void 0 : _b2.count) || 0
    };
  });
  const topAkras = Object.keys(akraCounts).map((pair) => ({
    pair,
    count: akraCounts[pair],
    percentage: totalDraws > 0 ? Math.round(akraCounts[pair] / totalDraws * 100) : 0,
    rank: 0
  })).sort((a, b) => b.count - a.count).slice(0, 15).map((item, idx) => ({ ...item, rank: idx + 1 }));
  const topL2 = Object.keys(l2Counts).map((pair) => ({
    pair,
    count: l2Counts[pair],
    percentage: totalDraws > 0 ? Math.round(l2Counts[pair] / totalDraws * 100) : 0,
    rank: 0
  })).sort((a, b) => b.count - a.count).slice(0, 15).map((item, idx) => ({ ...item, rank: idx + 1 }));
  const topF3 = Object.keys(f3Counts).map((num) => ({ num, count: f3Counts[num] })).sort((a, b) => b.count - a.count).slice(0, 10);
  const topB3 = Object.keys(b3Counts).map((num) => ({ num, count: b3Counts[num] })).sort((a, b) => b.count - a.count).slice(0, 10);
  const digitOddsPercentage = totalDigitsAnalyzed > 0 ? Math.round(totalOddDigits / totalDigitsAnalyzed * 100) : 50;
  const digitEvensPercentage = totalDigitsAnalyzed > 0 ? 100 - digitOddsPercentage : 50;
  const highlights = {
    topHotDigit: ((_a = singleDigitStats0to9[0]) == null ? void 0 : _a.digit) || "-",
    topHotDigitCount: ((_b = singleDigitStats0to9[0]) == null ? void 0 : _b.count) || 0,
    topColdDigit: ((_c = singleDigitStats0to9[singleDigitStats0to9.length - 1]) == null ? void 0 : _c.digit) || "-",
    topColdDigitCount: ((_d = singleDigitStats0to9[singleDigitStats0to9.length - 1]) == null ? void 0 : _d.count) || 0,
    topOpenDigit: ((_e = positions[0]) == null ? void 0 : _e.topDigit) || "-",
    topOpenDigitCount: ((_f = positions[0]) == null ? void 0 : _f.topCount) || 0,
    topLastDigit: ((_g = positions[5]) == null ? void 0 : _g.topDigit) || "-",
    topLastDigitCount: ((_h = positions[5]) == null ? void 0 : _h.topCount) || 0,
    topAkra: ((_i = topAkras[0]) == null ? void 0 : _i.pair) || "-",
    topAkraCount: ((_j = topAkras[0]) == null ? void 0 : _j.count) || 0,
    topL2: ((_k = topL2[0]) == null ? void 0 : _k.pair) || "-",
    topL2Count: ((_l = topL2[0]) == null ? void 0 : _l.count) || 0
  };
  return {
    totalDraws,
    totalDigitsAnalyzed,
    singleDigitStats0to9,
    positions,
    topAkras,
    topL2,
    topF3,
    topB3,
    oddVsEven: {
      digitOddsPercentage,
      digitEvensPercentage,
      totalOddDigits,
      totalEvenDigits,
      firstPrizeOddsCount,
      firstPrizeEvensCount
    },
    highlights
  };
}
function getThaiFilterLabels(context, filteredDraws) {
  const { drawDateFilter, monthFilter, yearFilter } = context;
  let dateGroupLabel = "All Draw Dates (تمام تاریخیں)";
  let dateGroupExplanation = "تمام دستیاب قرعہ اندازیاں (All available dates)";
  if (drawDateFilter === "1st") {
    dateGroupLabel = "1st Date Analysis (1 تاریخ اینالیسس)";
    dateGroupExplanation = "Group Rule: 30 Previous Month ➔ 1st Current Month ➔ 2nd Current Month";
  } else if (drawDateFilter === "16th") {
    dateGroupLabel = "16th Date Analysis (16 تاریخ اینالیسس)";
    dateGroupExplanation = "Group Rule: 15th ➔ 16th ➔ 17th Current Month";
  }
  const monthObj = THAI_MONTHS_LIST.find((m) => m.value === monthFilter);
  const monthLabel = monthObj && monthFilter !== "all" ? `${monthObj.labelEng} (${monthObj.labelUrdu})` : "All Months (تمام مہینے)";
  const yearLabel = yearFilter === "all" ? "All Years (تمام سال)" : `Year ${yearFilter}`;
  const distinctDates = Array.from(new Set(filteredDraws.map((d) => d.date).filter(Boolean))).sort().join(", ");
  return {
    dateGroupLabel,
    dateGroupExplanation,
    monthLabel,
    yearLabel,
    distinctDates: distinctDates || "None",
    totalRecords: filteredDraws.length
  };
}
function drawHeaderBanner(doc2, subtitle) {
  doc2.setFillColor(15, 23, 42);
  doc2.rect(0, 0, 210, 35, "F");
  doc2.setTextColor(255, 255, 255);
  doc2.setFontSize(17);
  doc2.setFont("helvetica", "bold");
  doc2.text("MASTERMIND QURESHI ENTERPRISE", 105, 14, { align: "center" });
  doc2.setFontSize(10);
  doc2.setFont("helvetica", "bold");
  doc2.setTextColor(251, 191, 36);
  doc2.text(subtitle.toUpperCase(), 105, 24, { align: "center" });
}
function drawMetadataBox(doc2, startY, labels, reportName) {
  doc2.setFillColor(248, 250, 252);
  doc2.setDrawColor(226, 232, 240);
  doc2.rect(10, startY, 190, 36, "FD");
  doc2.setTextColor(15, 23, 42);
  doc2.setFontSize(9);
  doc2.setFont("helvetica", "bold");
  doc2.text(`REPORT PARAMETERS - ${reportName.toUpperCase()}`, 15, startY + 6);
  doc2.setFontSize(8);
  doc2.setFont("helvetica", "normal");
  doc2.setTextColor(51, 65, 85);
  doc2.text(`Filter Group: ${labels.dateGroupLabel}`, 15, startY + 13);
  doc2.text(`Rule Definition: ${labels.dateGroupExplanation}`, 15, startY + 19);
  doc2.text(`Month & Year: ${labels.monthLabel} | ${labels.yearLabel}`, 15, startY + 25);
  const dateStr = labels.distinctDates.length > 85 ? labels.distinctDates.substring(0, 82) + "..." : labels.distinctDates;
  doc2.text(`Dates Included: ${dateStr}`, 15, startY + 31);
  doc2.text(`Analyzed Draws: ${labels.totalRecords}`, 145, startY + 13);
  doc2.text(`City / Origin: Bangkok, Thailand`, 145, startY + 19);
  doc2.text(`Generated: ${(/* @__PURE__ */ new Date()).toLocaleDateString()} ${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`, 145, startY + 25);
  doc2.text(`System: AI Analysis Portal`, 145, startY + 31);
  return startY + 40;
}
function drawHighlightsBox(doc2, startY, stats) {
  doc2.setFillColor(241, 245, 249);
  doc2.setDrawColor(203, 213, 225);
  doc2.rect(10, startY, 190, 20, "FD");
  doc2.setFontSize(8.5);
  doc2.setFont("helvetica", "bold");
  doc2.setTextColor(15, 23, 42);
  doc2.text("KEY STATISTICAL HIGHLIGHTS", 15, startY + 6);
  doc2.setFontSize(8);
  doc2.setFont("helvetica", "normal");
  doc2.setTextColor(71, 85, 105);
  doc2.text(`Total Draws: ${stats.totalDraws} | Digits Sample: ${stats.totalDigitsAnalyzed}`, 15, startY + 14);
  doc2.text(`Hot Digit: ${stats.highlights.topHotDigit} (${stats.highlights.topHotDigitCount}x) | Cold: ${stats.highlights.topColdDigit} (${stats.highlights.topColdDigitCount}x)`, 75, startY + 14);
  doc2.text(`Hot Open: ${stats.highlights.topOpenDigit} (${stats.highlights.topOpenDigitCount}x) | Akra: ${stats.highlights.topAkra} | L2: ${stats.highlights.topL2}`, 140, startY + 14);
  return startY + 24;
}
function finalizePagesAndFooter(doc2) {
  const pageCount = doc2.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc2.setPage(i);
    doc2.setFontSize(7.5);
    doc2.setFont("helvetica", "normal");
    doc2.setTextColor(148, 163, 184);
    doc2.text(
      `Page ${i} of ${pageCount} | MasterMind Qureshi Enterprise - Thailand Lottery Official Analysis Report`,
      105,
      290,
      { align: "center" }
    );
  }
}
async function generateThaiFullAnalysisPDF(filteredDraws, stats, context) {
  try {
    const doc2 = new E();
    const labels = getThaiFilterLabels(context, filteredDraws);
    drawHeaderBanner(doc2, "Thailand Lottery - Full Comprehensive AI Analysis");
    let currentY = drawMetadataBox(doc2, 40, labels, "Complete Thailand Lottery Analysis");
    currentY = drawHighlightsBox(doc2, currentY, stats);
    if (filteredDraws.length === 0) {
      doc2.setFontSize(10);
      doc2.setTextColor(220, 38, 38);
      doc2.text("No Thailand Lottery historical records match the selected date/month/year filter.", 105, currentY + 20, { align: "center" });
      finalizePagesAndFooter(doc2);
      return await savePdfDocument(doc2, `Thai_Full_Analysis_Empty_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`);
    }
    doc2.setFontSize(9);
    doc2.setFont("helvetica", "bold");
    doc2.setTextColor(15, 23, 42);
    doc2.text("1. POSITION-WISE BREAKDOWN (POSITIONS 1 TO 6)", 10, currentY + 4);
    const posRows = stats.positions.map((p) => {
      var _a;
      const hotItems = p.items.filter((i) => i.status === "hot").map((i) => `${i.digit} (${i.count}x)`).join(", ") || "--";
      const coldItems = p.items.filter((i) => i.status === "cold").map((i) => `${i.digit} (${i.count}x)`).join(", ") || "--";
      const topPercentage = ((_a = p.items.find((i) => i.digit === p.topDigit)) == null ? void 0 : _a.percentage) || 0;
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
    autoTable(doc2, {
      startY: currentY + 7,
      margin: { left: 10, right: 10 },
      head: [["Position", "Label", "Top Digit", "Frequency", "Top %", "Hot Digits", "Cold Digits"]],
      body: posRows,
      theme: "striped",
      headStyles: { fillColor: [15, 23, 42], fontStyle: "bold", fontSize: 7.5 },
      styles: { fontSize: 7.5, cellPadding: 2, font: "helvetica" },
      columnStyles: {
        0: { cellWidth: 16, fontStyle: "bold", halign: "center" },
        2: { fontStyle: "bold", textColor: [220, 38, 38], cellWidth: 18, halign: "center" },
        3: { cellWidth: 20, halign: "center" },
        4: { cellWidth: 18, halign: "center" }
      }
    });
    currentY = doc2.lastAutoTable.finalY + 8;
    doc2.setFontSize(9);
    doc2.setFont("helvetica", "bold");
    doc2.setTextColor(15, 23, 42);
    doc2.text("2. DIGIT FREQUENCY SPECTRUM (DIGITS 0 TO 9)", 10, currentY);
    const digitRows = stats.singleDigitStats0to9.map((d) => [
      `#${d.rank}`,
      `Digit ${d.digit}`,
      d.status === "hot" ? "HOT (Ziada)" : d.status === "cold" ? "COLD (Kam)" : "NORMAL",
      `${d.count} times`,
      `${d.percentage}%`
    ]);
    autoTable(doc2, {
      startY: currentY + 3,
      margin: { left: 10, right: 10 },
      head: [["Rank", "Digit (0-9)", "Status", "Appearance Count", "Percentage Ratio"]],
      body: digitRows,
      theme: "striped",
      headStyles: { fillColor: [30, 41, 59], fontStyle: "bold", fontSize: 7.5 },
      styles: { fontSize: 7.5, cellPadding: 2, font: "helvetica" },
      columnStyles: {
        0: { cellWidth: 18, halign: "center" },
        1: { fontStyle: "bold" },
        3: { halign: "center" },
        4: { halign: "center" }
      },
      didParseCell: function(data) {
        if (data.column.index === 2 && data.cell.raw && typeof data.cell.raw === "string") {
          if (data.cell.raw.includes("HOT")) {
            data.cell.styles.textColor = [217, 119, 6];
            data.cell.styles.fontStyle = "bold";
          } else if (data.cell.raw.includes("COLD")) {
            data.cell.styles.textColor = [8, 145, 178];
            data.cell.styles.fontStyle = "bold";
          }
        }
      }
    });
    currentY = doc2.lastAutoTable.finalY + 8;
    if (currentY > 230) {
      doc2.addPage();
      currentY = 20;
    }
    doc2.setFontSize(9);
    doc2.setFont("helvetica", "bold");
    doc2.setTextColor(15, 23, 42);
    doc2.text("3. TOP AKRA (FRONT 2) & TOP L2 (DOWN 2) PAIRS", 10, currentY);
    const akraTableRows = [];
    const maxPairs = Math.max(stats.topAkras.length, stats.topL2.length, 5);
    for (let i = 0; i < Math.min(maxPairs, 8); i++) {
      const a = stats.topAkras[i];
      const l = stats.topL2[i];
      akraTableRows.push([
        `#${i + 1}`,
        a ? a.pair : "--",
        a ? `${a.count}x (${a.percentage}%)` : "--",
        `#${i + 1}`,
        l ? l.pair : "--",
        l ? `${l.count}x (${l.percentage}%)` : "--"
      ]);
    }
    autoTable(doc2, {
      startY: currentY + 3,
      margin: { left: 10, right: 10 },
      head: [["Rank", "Top Akra (Front 2)", "Akra Freq", "Rank", "Top L2 (Last 2)", "L2 Freq"]],
      body: akraTableRows,
      theme: "striped",
      headStyles: { fillColor: [51, 65, 85], fontStyle: "bold", fontSize: 7.5 },
      styles: { fontSize: 7.5, cellPadding: 2, font: "helvetica" },
      columnStyles: {
        0: { cellWidth: 15, halign: "center" },
        1: { fontStyle: "bold", textColor: [220, 38, 38], halign: "center" },
        2: { halign: "center" },
        3: { cellWidth: 15, halign: "center" },
        4: { fontStyle: "bold", textColor: [79, 70, 229], halign: "center" },
        5: { halign: "center" }
      }
    });
    currentY = doc2.lastAutoTable.finalY + 8;
    if (currentY > 235) {
      doc2.addPage();
      currentY = 20;
    }
    doc2.setFontSize(9);
    doc2.setFont("helvetica", "bold");
    doc2.setTextColor(15, 23, 42);
    doc2.text("4. ODD VS EVEN BALANCE RATIO ANALYSIS", 10, currentY);
    const oddEvenRows = [
      [
        "All Digits Spectrum (Tamam Hindse)",
        `${stats.oddVsEven.totalOddDigits} digits (${stats.oddVsEven.digitOddsPercentage}%)`,
        `${stats.oddVsEven.totalEvenDigits} digits (${stats.oddVsEven.digitEvensPercentage}%)`,
        stats.oddVsEven.digitOddsPercentage > stats.oddVsEven.digitEvensPercentage ? "Odd Dominant" : "Even Dominant"
      ],
      [
        "First Prize Ending Digit (Aakhri Hindsa)",
        `${stats.oddVsEven.firstPrizeOddsCount} draws (${stats.totalDraws > 0 ? Math.round(stats.oddVsEven.firstPrizeOddsCount / stats.totalDraws * 100) : 0}%)`,
        `${stats.oddVsEven.firstPrizeEvensCount} draws (${stats.totalDraws > 0 ? Math.round(stats.oddVsEven.firstPrizeEvensCount / stats.totalDraws * 100) : 0}%)`,
        stats.oddVsEven.firstPrizeOddsCount > stats.oddVsEven.firstPrizeEvensCount ? "Odd Ending" : "Even Ending"
      ]
    ];
    autoTable(doc2, {
      startY: currentY + 3,
      margin: { left: 10, right: 10 },
      head: [["Dimension / Level", "Odd (Taaq) Distribution", "Even (Juft) Distribution", "Dominance"]],
      body: oddEvenRows,
      theme: "striped",
      headStyles: { fillColor: [15, 23, 42], fontStyle: "bold", fontSize: 7.5 },
      styles: { fontSize: 7.5, cellPadding: 2, font: "helvetica" }
    });
    currentY = doc2.lastAutoTable.finalY + 8;
    doc2.addPage();
    currentY = 20;
    doc2.setFontSize(10);
    doc2.setFont("helvetica", "bold");
    doc2.setTextColor(15, 23, 42);
    doc2.text(`5. HISTORICAL DRAW RECORDS INCLUDED IN THIS ANALYSIS (${filteredDraws.length} DRAWS)`, 10, currentY);
    const drawRows = filteredDraws.map((d, index) => {
      const parsed = parseThaiDrawDate(d.date);
      const tag = parsed.is1st ? "1st Draw" : parsed.is16th ? "16th Draw" : "Draw";
      const secondPrizesStr = Array.isArray(d.secondPrizes) && d.secondPrizes.length > 0 ? d.secondPrizes.join(", ") : "--";
      return [
        index + 1,
        d.date || "--",
        `${tag} | ${d.drawNo || "Bangkok"}`,
        d.firstPrize || "--",
        `F: ${d.front3Digits || "-"} | B: ${d.back3Digits || "-"}`,
        d.last2Digits || "--",
        secondPrizesStr
      ];
    });
    autoTable(doc2, {
      startY: currentY + 4,
      margin: { left: 10, right: 10 },
      head: [["Sr #", "Draw Date", "Draw Details", "1st Prize", "3 Digits (F/B)", "L2 (Down)", "2nd Prizes"]],
      body: drawRows,
      theme: "striped",
      headStyles: { fillColor: [15, 23, 42], fontStyle: "bold", fontSize: 7.5 },
      styles: { fontSize: 7, cellPadding: 2, font: "helvetica" },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 20, fontStyle: "bold" },
        3: { cellWidth: 22, fontStyle: "bold", textColor: [220, 38, 38], halign: "center" },
        4: { cellWidth: 26, halign: "center" },
        5: { cellWidth: 18, fontStyle: "bold", textColor: [79, 70, 229], halign: "center" }
      }
    });
    finalizePagesAndFooter(doc2);
    const cleanDateFilter = context.drawDateFilter.replace(/[^a-zA-Z0-9]/g, "_");
    const filename = `Thailand_Full_Analysis_${cleanDateFilter}_M${context.monthFilter}_Y${context.yearFilter}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`;
    return await savePdfDocument(doc2, filename);
  } catch (err) {
    console.error("Error generating Thai Full Analysis PDF:", err);
    return { success: false, error: (err == null ? void 0 : err.message) || "تھائی لینڈ مکمل اینالیسس پی ڈی ایف بنانے میں خرابی پیش آئی۔" };
  }
}
async function generateThaiPositionAnalysisPDF(filteredDraws, stats, selectedPositionIndex, context) {
  try {
    const doc2 = new E();
    const labels = getThaiFilterLabels(context, filteredDraws);
    const pos = stats.positions[selectedPositionIndex] || stats.positions[0];
    drawHeaderBanner(doc2, "Thailand Lottery - Position-wise Historical Analysis");
    let currentY = drawMetadataBox(doc2, 40, labels, `Position Analysis (Position 1 to 6 & Focus: ${(pos == null ? void 0 : pos.positionLabelEng) || "Pos 1"})`);
    currentY = drawHighlightsBox(doc2, currentY, stats);
    if (filteredDraws.length === 0) {
      doc2.setFontSize(10);
      doc2.setTextColor(220, 38, 38);
      doc2.text("No historical records match the selected date/month/year filter.", 105, currentY + 20, { align: "center" });
      finalizePagesAndFooter(doc2);
      return await savePdfDocument(doc2, `Thai_Positions_Empty_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`);
    }
    doc2.setFontSize(9);
    doc2.setFont("helvetica", "bold");
    doc2.setTextColor(15, 23, 42);
    doc2.text("SUMMARY OF ALL 6 POSITIONS IN FIRST PRIZE", 10, currentY + 4);
    const posSummaryRows = stats.positions.map((p) => {
      var _a;
      const topPercentage = ((_a = p.items.find((i) => i.digit === p.topDigit)) == null ? void 0 : _a.percentage) || 0;
      const hotList = p.items.filter((i) => i.status === "hot").map((i) => `${i.digit} (${i.count}x)`).join(", ") || "--";
      const coldList = p.items.filter((i) => i.status === "cold").map((i) => `${i.digit} (${i.count}x)`).join(", ") || "--";
      return [
        `Pos ${p.positionIndex + 1}`,
        p.positionLabelEng,
        p.topDigit,
        `${p.topCount}x (${topPercentage}%)`,
        hotList,
        coldList
      ];
    });
    autoTable(doc2, {
      startY: currentY + 7,
      margin: { left: 10, right: 10 },
      head: [["Position", "Label", "Top Digit", "Frequency", "Hot Digits", "Cold Digits"]],
      body: posSummaryRows,
      theme: "striped",
      headStyles: { fillColor: [15, 23, 42], fontStyle: "bold", fontSize: 8 },
      styles: { fontSize: 8, cellPadding: 2.5, font: "helvetica" },
      columnStyles: {
        0: { cellWidth: 18, fontStyle: "bold", halign: "center" },
        2: { cellWidth: 20, fontStyle: "bold", textColor: [220, 38, 38], halign: "center" },
        3: { cellWidth: 22, halign: "center" }
      }
    });
    currentY = doc2.lastAutoTable.finalY + 10;
    if (pos) {
      doc2.setFontSize(9);
      doc2.setFont("helvetica", "bold");
      doc2.setTextColor(15, 23, 42);
      doc2.text(`DETAILED 0-9 SPECTRUM FOR ${pos.positionLabelEng.toUpperCase()}`, 10, currentY);
      const detailedRows = pos.items.map((it) => [
        `#${it.rank}`,
        `Digit ${it.digit}`,
        it.status === "hot" ? "HOT (Ziada Freq)" : it.status === "cold" ? "COLD (Kam Freq)" : "NORMAL",
        `${it.count} times`,
        `${it.percentage}%`
      ]);
      autoTable(doc2, {
        startY: currentY + 3,
        margin: { left: 10, right: 10 },
        head: [["Rank", "Digit (0-9)", "Status", "Appearance Count", "Percentage Ratio"]],
        body: detailedRows,
        theme: "striped",
        headStyles: { fillColor: [30, 41, 59], fontStyle: "bold", fontSize: 8 },
        styles: { fontSize: 8, cellPadding: 2.5, font: "helvetica" },
        columnStyles: {
          0: { cellWidth: 18, halign: "center" },
          1: { fontStyle: "bold" },
          3: { halign: "center" },
          4: { halign: "center" }
        },
        didParseCell: function(data) {
          if (data.column.index === 2 && data.cell.raw && typeof data.cell.raw === "string") {
            if (data.cell.raw.includes("HOT")) {
              data.cell.styles.textColor = [217, 119, 6];
              data.cell.styles.fontStyle = "bold";
            } else if (data.cell.raw.includes("COLD")) {
              data.cell.styles.textColor = [8, 145, 178];
              data.cell.styles.fontStyle = "bold";
            }
          }
        }
      });
    }
    finalizePagesAndFooter(doc2);
    const filename = `Thailand_Position_Analysis_Pos${selectedPositionIndex + 1}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`;
    return await savePdfDocument(doc2, filename);
  } catch (err) {
    console.error("Error generating Position Analysis PDF:", err);
    return { success: false, error: (err == null ? void 0 : err.message) || "پوزیشن اینالیسس پی ڈی ایف بنانے میں خرابی پیش آئی۔" };
  }
}
async function generateThaiDigitFrequencyPDF(filteredDraws, stats, context) {
  try {
    const doc2 = new E();
    const labels = getThaiFilterLabels(context, filteredDraws);
    drawHeaderBanner(doc2, "Thailand Lottery - Single Digit (0 to 9) Frequency");
    let currentY = drawMetadataBox(doc2, 40, labels, "Digit Frequency Spectrum (0-9)");
    currentY = drawHighlightsBox(doc2, currentY, stats);
    if (filteredDraws.length === 0) {
      doc2.setFontSize(10);
      doc2.setTextColor(220, 38, 38);
      doc2.text("No historical records match the selected date/month/year filter.", 105, currentY + 20, { align: "center" });
      finalizePagesAndFooter(doc2);
      return await savePdfDocument(doc2, `Thai_Digit_Freq_Empty_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`);
    }
    doc2.setFontSize(9);
    doc2.setFont("helvetica", "bold");
    doc2.setTextColor(15, 23, 42);
    doc2.text(`COMPLETE 0-9 DIGIT OCCURRENCE DISTRIBUTION (TOTAL DIGITS: ${stats.totalDigitsAnalyzed})`, 10, currentY + 4);
    const digitRows = stats.singleDigitStats0to9.map((d) => [
      `#${d.rank}`,
      `Digit ${d.digit}`,
      d.status === "hot" ? "HOT (Ziada Zahir Hua)" : d.status === "cold" ? "COLD (Kam Zahir Hua)" : "NORMAL",
      `${d.count} times`,
      `${d.percentage}%`
    ]);
    autoTable(doc2, {
      startY: currentY + 7,
      margin: { left: 10, right: 10 },
      head: [["Rank", "Digit", "Status Category", "Total Occurrences", "Percentage Ratio"]],
      body: digitRows,
      theme: "striped",
      headStyles: { fillColor: [15, 23, 42], fontStyle: "bold", fontSize: 8 },
      styles: { fontSize: 8, cellPadding: 3, font: "helvetica" },
      columnStyles: {
        0: { cellWidth: 18, halign: "center" },
        1: { fontStyle: "bold" },
        3: { halign: "center" },
        4: { halign: "center" }
      },
      didParseCell: function(data) {
        if (data.column.index === 2 && data.cell.raw && typeof data.cell.raw === "string") {
          if (data.cell.raw.includes("HOT")) {
            data.cell.styles.textColor = [217, 119, 6];
            data.cell.styles.fontStyle = "bold";
          } else if (data.cell.raw.includes("COLD")) {
            data.cell.styles.textColor = [8, 145, 178];
            data.cell.styles.fontStyle = "bold";
          }
        }
      }
    });
    finalizePagesAndFooter(doc2);
    const filename = `Thailand_Digit_Frequency_0to9_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`;
    return await savePdfDocument(doc2, filename);
  } catch (err) {
    console.error("Error generating Digit Frequency PDF:", err);
    return { success: false, error: (err == null ? void 0 : err.message) || "ہندساتی فریکوئنسی پی ڈی ایف بنانے میں خرابی پیش آئی۔" };
  }
}
async function generateThaiAkraL2PDF(filteredDraws, stats, context) {
  try {
    const doc2 = new E();
    const labels = getThaiFilterLabels(context, filteredDraws);
    drawHeaderBanner(doc2, "Thailand Lottery - Akra & Last 2 (L2) Pairs Analysis");
    let currentY = drawMetadataBox(doc2, 40, labels, "Akra (Front 2) & Last 2 (L2) Analysis");
    currentY = drawHighlightsBox(doc2, currentY, stats);
    if (filteredDraws.length === 0) {
      doc2.setFontSize(10);
      doc2.setTextColor(220, 38, 38);
      doc2.text("No historical records match the selected date/month/year filter.", 105, currentY + 20, { align: "center" });
      finalizePagesAndFooter(doc2);
      return await savePdfDocument(doc2, `Thai_Akra_L2_Empty_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`);
    }
    doc2.setFontSize(9);
    doc2.setFont("helvetica", "bold");
    doc2.setTextColor(15, 23, 42);
    doc2.text(`TOP AKRA PAIRS (FIRST 2 DIGITS) - TOTAL RECORDED: ${stats.topAkras.length}`, 10, currentY + 4);
    const akraRows = stats.topAkras.map((a) => [
      `#${a.rank}`,
      a.pair,
      `${a.count} times`,
      `${a.percentage}%`
    ]);
    autoTable(doc2, {
      startY: currentY + 7,
      margin: { left: 10, right: 10 },
      head: [["Rank", "Akra Pair (Front 2)", "Frequency Count", "Occurrence %"]],
      body: akraRows.length > 0 ? akraRows : [["--", "No data available", "--", "--"]],
      theme: "striped",
      headStyles: { fillColor: [15, 23, 42], fontStyle: "bold", fontSize: 8 },
      styles: { fontSize: 8, cellPadding: 2.5, font: "helvetica" },
      columnStyles: {
        0: { cellWidth: 20, halign: "center" },
        1: { fontStyle: "bold", textColor: [220, 38, 38], halign: "center" },
        2: { halign: "center" },
        3: { halign: "center" }
      }
    });
    currentY = doc2.lastAutoTable.finalY + 10;
    if (currentY > 210) {
      doc2.addPage();
      currentY = 20;
    }
    doc2.setFontSize(9);
    doc2.setFont("helvetica", "bold");
    doc2.setTextColor(15, 23, 42);
    doc2.text(`TOP LAST 2 DIGIT PAIRS (L2 / DOWN 2) - TOTAL RECORDED: ${stats.topL2.length}`, 10, currentY);
    const l2Rows = stats.topL2.map((l) => [
      `#${l.rank}`,
      l.pair,
      `${l.count} times`,
      `${l.percentage}%`
    ]);
    autoTable(doc2, {
      startY: currentY + 3,
      margin: { left: 10, right: 10 },
      head: [["Rank", "L2 Pair (Last 2)", "Frequency Count", "Occurrence %"]],
      body: l2Rows.length > 0 ? l2Rows : [["--", "No data available", "--", "--"]],
      theme: "striped",
      headStyles: { fillColor: [79, 70, 229], fontStyle: "bold", fontSize: 8 },
      styles: { fontSize: 8, cellPadding: 2.5, font: "helvetica" },
      columnStyles: {
        0: { cellWidth: 20, halign: "center" },
        1: { fontStyle: "bold", textColor: [79, 70, 229], halign: "center" },
        2: { halign: "center" },
        3: { halign: "center" }
      }
    });
    finalizePagesAndFooter(doc2);
    const filename = `Thailand_Akra_L2_Analysis_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`;
    return await savePdfDocument(doc2, filename);
  } catch (err) {
    console.error("Error generating Akra & L2 PDF:", err);
    return { success: false, error: (err == null ? void 0 : err.message) || "آکڑا اور ایل 2 پی ڈی ایف بنانے میں خرابی پیش آئی۔" };
  }
}
async function generateThaiOddEvenPDF(filteredDraws, stats, context) {
  try {
    const doc2 = new E();
    const labels = getThaiFilterLabels(context, filteredDraws);
    drawHeaderBanner(doc2, "Thailand Lottery - Odd vs Even Distribution");
    let currentY = drawMetadataBox(doc2, 40, labels, "Odd vs Even Ratio Analysis");
    currentY = drawHighlightsBox(doc2, currentY, stats);
    if (filteredDraws.length === 0) {
      doc2.setFontSize(10);
      doc2.setTextColor(220, 38, 38);
      doc2.text("No historical records match the selected date/month/year filter.", 105, currentY + 20, { align: "center" });
      finalizePagesAndFooter(doc2);
      return await savePdfDocument(doc2, `Thai_OddEven_Empty_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`);
    }
    doc2.setFontSize(9);
    doc2.setFont("helvetica", "bold");
    doc2.setTextColor(15, 23, 42);
    doc2.text("ODD VS EVEN SPECTRUM AT DIGIT LEVEL & DRAW LEVEL", 10, currentY + 4);
    const rows = [
      [
        "Total Individual Digits Analyzed",
        `${stats.oddVsEven.totalOddDigits} digits`,
        `${stats.oddVsEven.digitOddsPercentage}%`,
        `${stats.oddVsEven.totalEvenDigits} digits`,
        `${stats.oddVsEven.digitEvensPercentage}%`,
        stats.oddVsEven.digitOddsPercentage > stats.oddVsEven.digitEvensPercentage ? "Odd Dominant" : "Even Dominant"
      ],
      [
        "First Prize Draw Ending Digit (Last Digit)",
        `${stats.oddVsEven.firstPrizeOddsCount} draws`,
        `${stats.totalDraws > 0 ? Math.round(stats.oddVsEven.firstPrizeOddsCount / stats.totalDraws * 100) : 0}%`,
        `${stats.oddVsEven.firstPrizeEvensCount} draws`,
        `${stats.totalDraws > 0 ? Math.round(stats.oddVsEven.firstPrizeEvensCount / stats.totalDraws * 100) : 0}%`,
        stats.oddVsEven.firstPrizeOddsCount > stats.oddVsEven.firstPrizeEvensCount ? "Odd Ending" : "Even Ending"
      ]
    ];
    autoTable(doc2, {
      startY: currentY + 7,
      margin: { left: 10, right: 10 },
      head: [["Dimension / Level", "Odd (Taaq) Count", "Odd %", "Even (Juft) Count", "Even %", "Dominance"]],
      body: rows,
      theme: "striped",
      headStyles: { fillColor: [15, 23, 42], fontStyle: "bold", fontSize: 8 },
      styles: { fontSize: 8, cellPadding: 3, font: "helvetica" }
    });
    finalizePagesAndFooter(doc2);
    const filename = `Thailand_Odd_Even_Analysis_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`;
    return await savePdfDocument(doc2, filename);
  } catch (err) {
    console.error("Error generating Odd vs Even PDF:", err);
    return { success: false, error: (err == null ? void 0 : err.message) || "طاق و جفت پی ڈی ایف بنانے میں خرابی پیش آئی۔" };
  }
}
async function generateThaiDrawRecordsPDF(filteredDraws, context) {
  try {
    const doc2 = new E();
    const labels = getThaiFilterLabels(context, filteredDraws);
    drawHeaderBanner(doc2, "Thailand Lottery - Filtered Historical Draw Records");
    let currentY = drawMetadataBox(doc2, 40, labels, `Filtered Draw Records (${filteredDraws.length} Draws)`);
    if (filteredDraws.length === 0) {
      doc2.setFontSize(10);
      doc2.setTextColor(220, 38, 38);
      doc2.text("No historical records match the selected date/month/year filter.", 105, currentY + 20, { align: "center" });
      finalizePagesAndFooter(doc2);
      return await savePdfDocument(doc2, `Thai_Records_Empty_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`);
    }
    const drawRows = filteredDraws.map((d, index) => {
      const parsed = parseThaiDrawDate(d.date);
      const tag = parsed.is1st ? "1st Draw" : parsed.is16th ? "16th Draw" : "Draw";
      const secondPrizesStr = Array.isArray(d.secondPrizes) && d.secondPrizes.length > 0 ? d.secondPrizes.join(", ") : "--";
      return [
        index + 1,
        d.date || "--",
        `${tag} | ${d.drawNo || "Bangkok"}`,
        d.firstPrize || "--",
        `F: ${d.front3Digits || "-"} | B: ${d.back3Digits || "-"}`,
        d.last2Digits || "--",
        secondPrizesStr
      ];
    });
    autoTable(doc2, {
      startY: currentY + 4,
      margin: { left: 10, right: 10 },
      head: [["Sr #", "Draw Date", "Draw Details", "1st Prize", "3 Digits (F/B)", "L2 (Down)", "2nd Prizes"]],
      body: drawRows,
      theme: "striped",
      headStyles: { fillColor: [15, 23, 42], fontStyle: "bold", fontSize: 7.5 },
      styles: { fontSize: 7, cellPadding: 2, font: "helvetica" },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 20, fontStyle: "bold" },
        3: { cellWidth: 22, fontStyle: "bold", textColor: [220, 38, 38], halign: "center" },
        4: { cellWidth: 26, halign: "center" },
        5: { cellWidth: 18, fontStyle: "bold", textColor: [79, 70, 229], halign: "center" }
      }
    });
    finalizePagesAndFooter(doc2);
    const filename = `Thailand_Historical_Records_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`;
    return await savePdfDocument(doc2, filename);
  } catch (err) {
    console.error("Error generating Draw Records PDF:", err);
    return { success: false, error: (err == null ? void 0 : err.message) || "ڈرا ریکارڈز پی ڈی ایف بنانے میں خرابی پیش آئی۔" };
  }
}
const DownloadPdf = registerPlugin("DownloadPdf");
async function savePdfDocument(doc2, filename) {
  try {
    const cleanFilename = (filename || "Document.pdf").replace(/[^a-zA-Z0-9._-]/g, "_");
    if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android") {
      const dataUri = doc2.output("datauristring");
      const base64 = dataUri.split(",")[1];
      await DownloadPdf.save({
        filename: cleanFilename,
        data: base64
      });
      console.info(
        `[savePdfDocument] PDF saved to Android Download: ${cleanFilename}`
      );
      return { success: true };
    }
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const blob = doc2.output("blob");
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = cleanFilename;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        try {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        } catch {
        }
      }, 1500);
      return { success: true };
    }
    return {
      success: false,
      error: "پی ڈی ایف محفوظ کرنے کے لیے مناسب اسٹوریج دستیاب نہیں ہے۔"
    };
  } catch (err) {
    console.error("[savePdfDocument] PDF export failed:", err);
    return {
      success: false,
      error: (err == null ? void 0 : err.message) || "پی ڈی ایف فائل Download فولڈر میں محفوظ کرنے میں ناکامی ہوئی۔"
    };
  }
}
async function generateBookingPDF(customerName, customerEmail, customerPhone, customerCity, bookings, category) {
  try {
    const doc2 = new E();
    const safeName = customerName || "Customer";
    const safeEmail = customerEmail || "N/A";
    const safePhone = customerPhone || "--";
    const safeCity = customerCity || "--";
    const safeCategory = category || "pakistan_bond";
    const safeBookings = Array.isArray(bookings) ? bookings : [];
    const titleEnglishMap = {
      pakistan_bond: "PAKISTAN BOND BOOKING SHEET",
      thailand_lottery: "THAILAND LOTTERY BOOKING SHEET"
    };
    const titleUrduMap = {
      pakistan_bond: "پاکستان بانڈ بکنگ شیٹ",
      thailand_lottery: "تھائی لینڈ لاٹری بکنگ شیٹ"
    };
    const titleEnglish = titleEnglishMap[safeCategory] || "PRIZE BOND BOOKING SHEET";
    const titleUrdu = titleUrduMap[safeCategory] || "پرائز بانڈ بکنگ شیٹ";
    doc2.setFillColor(15, 23, 42);
    doc2.rect(0, 0, 210, 35, "F");
    doc2.setTextColor(255, 255, 255);
    doc2.setFontSize(18);
    doc2.setFont("helvetica", "bold");
    doc2.text("MASTERMIND QURESHI ENTERPRISE", 105, 15, { align: "center" });
    doc2.setFontSize(11);
    doc2.setFont("helvetica", "normal");
    doc2.text(`${titleEnglish} - ${titleUrdu}`, 105, 25, { align: "center" });
    doc2.setFillColor(248, 250, 252);
    doc2.rect(10, 42, 190, 32, "F");
    doc2.setDrawColor(226, 232, 240);
    doc2.rect(10, 42, 190, 32);
    doc2.setTextColor(15, 23, 42);
    doc2.setFontSize(9);
    doc2.setFont("helvetica", "bold");
    doc2.text("CUSTOMER PROFILE (کسٹمر پروفائل)", 15, 48);
    doc2.setFont("helvetica", "normal");
    doc2.setTextColor(71, 85, 105);
    doc2.text(`Name (نام): ${safeName}`, 15, 55);
    doc2.text(`Phone (موبائل نمبر): ${safePhone}`, 15, 61);
    doc2.text(`City (شہر): ${safeCity}`, 15, 67);
    doc2.text(`Email (ایمیل): ${safeEmail}`, 110, 55);
    doc2.text(`Date of Issue: ${(/* @__PURE__ */ new Date()).toLocaleString()}`, 110, 61);
    doc2.text(`Total Bookings: ${safeBookings.length}`, 110, 67);
    const isPak = safeCategory === "pakistan_bond";
    const tableHeaders = isPak ? [["Sr #", "Bond / Draw Details", "Number", "First Prize", "Second Prize", "Sub Total", "Time"]] : [["Sr #", "Number (نمبر)", "First Prize (فرسٹ)", "Second Prize (سیکنڈ)", "Sub Total (کل رقم)", "Time (وقت)"]];
    const tableRows = safeBookings.map((b, index) => {
      const drawInfo = [
        b.bondValue ? b.bondValue.startsWith("Rs") ? b.bondValue : `Rs. ${b.bondValue}` : "",
        b.drawNumber ? b.drawNumber.includes("Draw") ? b.drawNumber : `Draw #${b.drawNumber}` : "",
        b.drawCity || "",
        b.drawDate || ""
      ].filter(Boolean).join(" | ") || "Pakistan Prize Bond";
      const firstAmt = Number(b.firstAmount) || 0;
      const secAmt = Number(b.secondAmount) || 0;
      const subTotal = firstAmt + secAmt;
      const timeStr = b.timestamp ? new Date(b.timestamp).toLocaleTimeString() : "--";
      return isPak ? [
        index + 1,
        drawInfo,
        b.number || "--",
        `Rs. ${firstAmt.toLocaleString()}`,
        `Rs. ${secAmt.toLocaleString()}`,
        `Rs. ${subTotal.toLocaleString()}`,
        timeStr
      ] : [
        index + 1,
        b.number || "--",
        `Rs. ${firstAmt.toLocaleString()}`,
        `Rs. ${secAmt.toLocaleString()}`,
        `Rs. ${subTotal.toLocaleString()}`,
        timeStr
      ];
    });
    const totalFirst = safeBookings.reduce((sum, b) => sum + (Number(b.firstAmount) || 0), 0);
    const totalSecond = safeBookings.reduce((sum, b) => sum + (Number(b.secondAmount) || 0), 0);
    const grandTotal = totalFirst + totalSecond;
    if (isPak) {
      tableRows.push([
        "Total",
        "--",
        "--",
        `Rs. ${totalFirst.toLocaleString()}`,
        `Rs. ${totalSecond.toLocaleString()}`,
        `Rs. ${grandTotal.toLocaleString()}`,
        "--"
      ]);
    } else {
      tableRows.push([
        "Total",
        "--",
        `Rs. ${totalFirst.toLocaleString()}`,
        `Rs. ${totalSecond.toLocaleString()}`,
        `Rs. ${grandTotal.toLocaleString()}`,
        "--"
      ]);
    }
    autoTable(doc2, {
      startY: 80,
      head: tableHeaders,
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: [15, 23, 42], fontStyle: "bold" },
      footStyles: { fillColor: [241, 196, 15] },
      styles: { fontSize: 8.5, cellPadding: 3, font: "helvetica" },
      columnStyles: isPak ? {
        0: { cellWidth: 12 },
        1: { fontStyle: "bold", textColor: [15, 23, 42], cellWidth: 50 },
        2: { fontStyle: "bold", textColor: [220, 38, 38] }
      } : {
        0: { cellWidth: 15 },
        1: { fontStyle: "bold", textColor: [220, 38, 38] }
      },
      didParseCell: function(data) {
        if (data.row.index === safeBookings.length) {
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.textColor = [15, 23, 42];
          const totalColIndex = isPak ? 5 : 4;
          if (data.column.index === totalColIndex) {
            data.cell.styles.fillColor = [252, 211, 77];
          }
        }
      }
    });
    const finalY = doc2.lastAutoTable ? doc2.lastAutoTable.finalY || 150 : 150;
    doc2.setFontSize(8);
    doc2.setTextColor(148, 163, 184);
    doc2.text("This is an official receipt of bookings with MasterMind Qureshi Enterprise.", 105, finalY + 15, { align: "center" });
    doc2.text("Please verify your profile email in final logs.", 105, finalY + 20, { align: "center" });
    const cleanCustomerName = safeName.replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `${safeCategory}_${cleanCustomerName}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`;
    return await savePdfDocument(doc2, filename);
  } catch (err) {
    console.error("Failed to generate booking PDF:", err);
    return { success: false, error: (err == null ? void 0 : err.message) || "بکنگ پی ڈی ایف بنانے میں خرابی پیش آئی۔" };
  }
}
const urduToEnglishCity = {
  "پشاور": "Peshawar",
  "اسلام آباد": "Islamabad",
  "لاہور": "Lahore",
  "کراچی": "Karachi",
  "کوئٹہ": "Quetta",
  "راولپنڈی": "Rawalpindi",
  "فیصل آباد": "Faisalabad",
  "ملتان": "Multan",
  "حیدرآباد": "Hyderabad",
  "مظفرآباد": "Muzaffarabad",
  "گوجرانوالہ": "Gujranwala",
  "بہاولپور": "Bahawalpur",
  "سیالکوٹ": "Sialkot",
  "سکھر": "Sukkur",
  "گوادر": "Gwadar",
  "بنکاک": "Bangkok"
};
function translateCity(city) {
  if (!city) return "--";
  const trimmed = city.trim();
  return urduToEnglishCity[trimmed] || trimmed;
}
function translateDrawNo(drawNo) {
  if (!drawNo) return "";
  return drawNo.replace(/ڈرا نمبر/g, "Draw No.");
}
async function generateDrawHistoryPDF(draws, category, filterDetails) {
  try {
    const doc2 = new E();
    const safeCategory = category || "all";
    const safeDraws = Array.isArray(draws) ? draws : [];
    let titleEnglish = "HISTORICAL DRAW RESULTS RECORD";
    if ((filterDetails == null ? void 0 : filterDetails.bondValue) && filterDetails.bondValue !== "all") {
      titleEnglish = `PRIZE BOND ${filterDetails.bondValue.toUpperCase()} DRAW RECORD`;
    } else if (safeCategory === "pakistan_bond") {
      titleEnglish = "PAKISTAN PRIZE BOND DRAW HISTORY";
    } else if (safeCategory === "thailand_lottery") {
      titleEnglish = "THAILAND LOTTERY DRAW HISTORY";
    }
    doc2.setFillColor(15, 23, 42);
    doc2.rect(0, 0, 210, 35, "F");
    doc2.setTextColor(255, 255, 255);
    doc2.setFontSize(18);
    doc2.setFont("helvetica", "bold");
    doc2.text("MASTERMIND QURESHI ENTERPRISE", 105, 15, { align: "center" });
    doc2.setFontSize(11);
    doc2.setFont("helvetica", "normal");
    doc2.text(`${titleEnglish}`, 105, 25, { align: "center" });
    doc2.setFillColor(248, 250, 252);
    doc2.rect(10, 42, 190, 26, "F");
    doc2.setDrawColor(226, 232, 240);
    doc2.rect(10, 42, 190, 26);
    doc2.setTextColor(15, 23, 42);
    doc2.setFontSize(9);
    doc2.setFont("helvetica", "bold");
    doc2.text("REPORT DETAILS", 15, 48);
    doc2.setFont("helvetica", "normal");
    doc2.setTextColor(71, 85, 105);
    const catLabel = safeCategory === "all" ? "All Records" : safeCategory === "pakistan_bond" ? "Pakistan Prize Bond" : "Thailand Lottery";
    const bondLabel = (filterDetails == null ? void 0 : filterDetails.bondValue) && filterDetails.bondValue !== "all" ? ` | Bond: ${filterDetails.bondValue}` : "";
    const cityLabel = (filterDetails == null ? void 0 : filterDetails.city) && filterDetails.city !== "all" ? ` | City: ${translateCity(filterDetails.city)}` : "";
    doc2.text(`Scope: ${catLabel}${bondLabel}${cityLabel}`, 15, 55);
    doc2.text(`Total Records: ${safeDraws.length}`, 15, 62);
    doc2.text(`Generated Date: ${(/* @__PURE__ */ new Date()).toLocaleString()}`, 110, 55);
    doc2.text("Authorized: MasterMind Qureshi AI Portal", 110, 62);
    const tableRows = safeDraws.map((d, index) => [
      index + 1,
      translateDrawNo(d.drawNo || ""),
      d.category === "pakistan_bond" ? "Pakistan Bond" : "Thai Lottery",
      d.firstPrize || "--",
      Array.isArray(d.secondPrizes) ? d.secondPrizes.join(", ") : d.secondPrizes || "--",
      translateCity(d.city || ""),
      d.date || "--"
    ]);
    autoTable(doc2, {
      startY: 72,
      head: [["Sr #", "Draw/Scheme", "Category", "1st Prize", "2nd Prizes", "City", "Date"]],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: [15, 23, 42], fontStyle: "bold" },
      styles: { fontSize: 8, cellPadding: 2.5, font: "helvetica" },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { fontStyle: "bold", textColor: [15, 23, 42], cellWidth: 45 },
        3: { fontStyle: "bold", textColor: [220, 38, 38], fontSize: 9 },
        // bold red 1st prize
        4: { cellWidth: 50 },
        // Second prizes can be long
        5: { cellWidth: 20 }
      }
    });
    const finalY = doc2.lastAutoTable ? doc2.lastAutoTable.finalY || 150 : 150;
    doc2.setFontSize(8);
    doc2.setTextColor(148, 163, 184);
    doc2.text("This history report is fetched directly from MasterMind Qureshi Enterprise database.", 105, finalY + 12, { align: "center" });
    const filename = `${safeCategory}_history_record_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`;
    return await savePdfDocument(doc2, filename);
  } catch (err) {
    console.error("Failed to generate draw history PDF:", err);
    return { success: false, error: (err == null ? void 0 : err.message) || "ہسٹری پی ڈی ایف بنانے میں خرابی پیش آئی۔" };
  }
}
async function generateThaiFront3PDF(records, filterDetails, highlights) {
  try {
    const doc2 = new E();
    const safeRecords = Array.isArray(records) ? records : [];
    doc2.setFillColor(15, 23, 42);
    doc2.rect(0, 0, 210, 35, "F");
    doc2.setTextColor(255, 255, 255);
    doc2.setFontSize(18);
    doc2.setFont("helvetica", "bold");
    doc2.text("MASTERMIND QURESHI ENTERPRISE", 105, 14, { align: "center" });
    doc2.setFontSize(10);
    doc2.setFont("helvetica", "normal");
    doc2.text("THAILAND LOTTERY - FRONT 3 DIGITS HISTORICAL ANALYSIS", 105, 24, { align: "center" });
    doc2.setFillColor(248, 250, 252);
    doc2.rect(10, 40, 190, 30, "F");
    doc2.setDrawColor(226, 232, 240);
    doc2.rect(10, 40, 190, 30);
    doc2.setTextColor(15, 23, 42);
    doc2.setFontSize(9);
    doc2.setFont("helvetica", "bold");
    doc2.text("FRONT 3 HISTORICAL PARAMETERS & HIGHLIGHTS", 15, 47);
    doc2.setFont("helvetica", "normal");
    doc2.setTextColor(71, 85, 105);
    doc2.text(`Filters: Date [${filterDetails.dateLabel}] | Month [${filterDetails.monthLabel}] | Year [${filterDetails.yearLabel}]`, 15, 55);
    doc2.text(`Total Records Analyzed: ${safeRecords.length} draws`, 15, 62);
    doc2.text(`Hot Digit: ${highlights.topOverallHotDigit} | Cold Digit: ${highlights.topOverallColdDigit}`, 110, 55);
    doc2.text(`Top Front 3: ${highlights.topCombo} (${highlights.topComboCount}x) | Pair 1+2: ${highlights.topPair12}`, 110, 62);
    const tableRows = safeRecords.map((r, idx) => [
      idx + 1,
      r.date || "--",
      r.drawNo || "--",
      r.firstPrize || "--",
      r.front3 || "--",
      r.d1 || "--",
      r.d2 || "--",
      r.d3 || "--",
      `${r.sum || 0} (Root ${r.rootSum || 0})`,
      r.patternType || "--"
    ]);
    autoTable(doc2, {
      startY: 75,
      head: [["Sr #", "Draw Date", "Draw No", "First Prize", "Front 3", "Pos 1", "Pos 2", "Pos 3", "Sum", "Pattern"]],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: [15, 23, 42], fontStyle: "bold" },
      styles: { fontSize: 8, cellPadding: 2.5, font: "helvetica" },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 24 },
        2: { cellWidth: 40 },
        3: { cellWidth: 24 },
        4: { fontStyle: "bold", textColor: [220, 38, 38], cellWidth: 20 },
        5: { fontStyle: "bold", cellWidth: 14 },
        6: { fontStyle: "bold", cellWidth: 14 },
        7: { fontStyle: "bold", cellWidth: 14 },
        8: { cellWidth: 20 },
        9: { cellWidth: 20 }
      }
    });
    const finalY = doc2.lastAutoTable ? doc2.lastAutoTable.finalY || 150 : 150;
    doc2.setFontSize(8);
    doc2.setTextColor(148, 163, 184);
    doc2.text("MasterMind Qureshi Enterprise - Official Thailand Front 3 Analytics", 105, finalY + 12, { align: "center" });
    const filename = `Thailand_Front3_Analysis_${filterDetails.dateLabel}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`;
    return await savePdfDocument(doc2, filename);
  } catch (err) {
    console.error("Failed to generate Thai Front 3 PDF:", err);
    return { success: false, error: (err == null ? void 0 : err.message) || "تھائی فرنٹ 3 پی ڈی ایف رپورٹ بنانے میں خرابی پیش آئی۔" };
  }
}
async function generateDealerBookingsPDF(reportTitle, bookings, filterType, filterValueLabel) {
  try {
    const doc2 = new E();
    const safeTitle = reportTitle || "Dealer_Bookings";
    const safeBookings = Array.isArray(bookings) ? bookings : [];
    doc2.setFillColor(15, 23, 42);
    doc2.rect(0, 0, 210, 35, "F");
    doc2.setTextColor(255, 255, 255);
    doc2.setFontSize(18);
    doc2.setFont("helvetica", "bold");
    doc2.text("MASTERMIND QURESHI ENTERPRISE", 105, 14, { align: "center" });
    doc2.setFontSize(10);
    doc2.setFont("helvetica", "normal");
    doc2.text(
      `DEALER BOOKINGS REPORT - ${safeTitle.toUpperCase()}`,
      105,
      24,
      { align: "center" }
    );
    const totalFirst = safeBookings.reduce(
      (sum, b) => sum + (Number(b.firstAmount) || 0),
      0
    );
    const totalSecond = safeBookings.reduce(
      (sum, b) => sum + (Number(b.secondAmount) || 0),
      0
    );
    const grandTotal = totalFirst + totalSecond;
    doc2.setFillColor(248, 250, 252);
    doc2.rect(10, 40, 190, 30, "F");
    doc2.setDrawColor(226, 232, 240);
    doc2.rect(10, 40, 190, 30);
    doc2.setTextColor(15, 23, 42);
    doc2.setFontSize(9);
    doc2.setFont("helvetica", "bold");
    doc2.text("DEALER BOOKING REPORT METRICS", 15, 47);
    doc2.setFont("helvetica", "normal");
    doc2.setTextColor(71, 85, 105);
    doc2.text(
      `Filter: ${(filterType || "ALL").toUpperCase()} ${filterValueLabel ? `(${filterValueLabel})` : ""}`,
      15,
      55
    );
    doc2.text(`Total Dealer Bookings: ${safeBookings.length}`, 15, 62);
    doc2.text(`Generated: ${(/* @__PURE__ */ new Date()).toLocaleString()}`, 110, 55);
    doc2.text(`Grand Total: Rs. ${grandTotal.toLocaleString()}`, 110, 62);
    const categoryMap = {
      pakistan_bond: "Pakistan Prize Bond",
      thailand_lottery: "Thailand Lottery"
    };
    const tableRows = safeBookings.map((b, idx) => {
      const drawInfo = [
        b.bondValue ? b.bondValue.startsWith("Rs") ? b.bondValue : `Rs. ${b.bondValue}` : "",
        b.drawNumber ? `Draw #${b.drawNumber}` : "",
        b.drawCity || "",
        b.drawDate || ""
      ].filter(Boolean).join(" | ") || categoryMap[b.category] || b.category;
      const firstAmt = Number(b.firstAmount) || 0;
      const secondAmt = Number(b.secondAmount) || 0;
      return [
        idx + 1,
        b.dealerName || "--",
        b.dealerEmail || "--",
        categoryMap[b.category] || b.category || "--",
        drawInfo,
        b.number || "--",
        `Rs. ${firstAmt.toLocaleString()}`,
        `Rs. ${secondAmt.toLocaleString()}`,
        `Rs. ${(firstAmt + secondAmt).toLocaleString()}`,
        b.timestamp ? new Date(b.timestamp).toLocaleString() : "--"
      ];
    });
    tableRows.push([
      "Total",
      "--",
      "--",
      "--",
      "--",
      "--",
      `Rs. ${totalFirst.toLocaleString()}`,
      `Rs. ${totalSecond.toLocaleString()}`,
      `Rs. ${grandTotal.toLocaleString()}`,
      "--"
    ]);
    autoTable(doc2, {
      startY: 76,
      head: [[
        "Sr #",
        "Dealer Name",
        "Dealer Email",
        "Category",
        "Draw / Bond Details",
        "Number",
        "1st",
        "2nd",
        "Total",
        "Date / Time"
      ]],
      body: tableRows,
      theme: "striped",
      headStyles: {
        fillColor: [15, 23, 42],
        fontStyle: "bold"
      },
      styles: {
        fontSize: 6.5,
        cellPadding: 2,
        font: "helvetica"
      },
      columnStyles: {
        0: { cellWidth: 9 },
        1: { cellWidth: 24 },
        2: { cellWidth: 32 },
        3: { cellWidth: 22 },
        4: { cellWidth: 34 },
        5: { cellWidth: 16 },
        6: { cellWidth: 17 },
        7: { cellWidth: 17 },
        8: { cellWidth: 18 },
        9: { cellWidth: 27 }
      },
      didParseCell: function(data) {
        if (data.row.index === safeBookings.length) {
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.textColor = [15, 23, 42];
          if (data.column.index === 8) {
            data.cell.styles.fillColor = [252, 211, 77];
          }
        }
      }
    });
    const finalY = doc2.lastAutoTable ? doc2.lastAutoTable.finalY || 150 : 150;
    doc2.setFontSize(8);
    doc2.setTextColor(148, 163, 184);
    doc2.text(
      "MasterMind Qureshi Enterprise - Official Dealer Bookings Record",
      105,
      finalY + 12,
      { align: "center" }
    );
    const cleanTitle = safeTitle.replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `Dealer_Bookings_${cleanTitle}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`;
    return await savePdfDocument(doc2, filename);
  } catch (err) {
    console.error("Failed to generate dealer bookings PDF:", err);
    return {
      success: false,
      error: (err == null ? void 0 : err.message) || "ڈیلر بکنگ رپورٹ بنانے میں خرابی پیش آئی۔"
    };
  }
}
async function generateAdminBookingsPDF(reportTitle, bookings, filterType, filterValueLabel) {
  try {
    const doc2 = new E();
    const safeTitle = reportTitle || "All_Bookings";
    const safeBookings = Array.isArray(bookings) ? bookings : [];
    doc2.setFillColor(15, 23, 42);
    doc2.rect(0, 0, 210, 35, "F");
    doc2.setTextColor(255, 255, 255);
    doc2.setFontSize(18);
    doc2.setFont("helvetica", "bold");
    doc2.text("MASTERMIND QURESHI ENTERPRISE", 105, 14, { align: "center" });
    doc2.setFontSize(10);
    doc2.setFont("helvetica", "normal");
    doc2.text(`ADMIN BOOKINGS REPORT - ${safeTitle.toUpperCase()}`, 105, 24, { align: "center" });
    doc2.setFillColor(248, 250, 252);
    doc2.rect(10, 40, 190, 26, "F");
    doc2.setDrawColor(226, 232, 240);
    doc2.rect(10, 40, 190, 26);
    const totalFirst = safeBookings.reduce((sum, b) => sum + (Number(b.firstAmount) || 0), 0);
    const totalSecond = safeBookings.reduce((sum, b) => sum + (Number(b.secondAmount) || 0), 0);
    const grandTotal = totalFirst + totalSecond;
    doc2.setTextColor(15, 23, 42);
    doc2.setFontSize(9);
    doc2.setFont("helvetica", "bold");
    doc2.text("REPORT METRICS", 15, 46);
    doc2.setFont("helvetica", "normal");
    doc2.setTextColor(71, 85, 105);
    doc2.text(`Filter Scope: ${(filterType || "ALL").toUpperCase()} ${filterValueLabel ? `(${filterValueLabel})` : ""}`, 15, 53);
    doc2.text(`Total Bookings Count: ${safeBookings.length}`, 15, 59);
    doc2.text(`Generated Date: ${(/* @__PURE__ */ new Date()).toLocaleString()}`, 110, 53);
    doc2.text(`Grand Total Amount: Rs. ${grandTotal.toLocaleString()}`, 110, 59);
    const tableRows = safeBookings.map((b, idx) => {
      const drawInfo = [
        b.bondValue ? b.bondValue.startsWith("Rs") ? b.bondValue : `Rs. ${b.bondValue}` : "",
        b.drawNumber ? `Draw #${b.drawNumber}` : "",
        b.drawCity || "",
        b.drawDate || ""
      ].filter(Boolean).join(" | ") || (b.category === "pakistan_bond" ? "Pakistan Prize Bond" : "Thailand Lottery");
      const firstAmt = Number(b.firstAmount) || 0;
      const secAmt = Number(b.secondAmount) || 0;
      const subTotal = firstAmt + secAmt;
      const timeStr = b.timestamp ? new Date(b.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--";
      return [
        idx + 1,
        b.userEmail || "--",
        drawInfo,
        b.number || "--",
        `Rs. ${firstAmt.toLocaleString()}`,
        `Rs. ${secAmt.toLocaleString()}`,
        `Rs. ${subTotal.toLocaleString()}`,
        b.isArchived ? "Archived" : "Active",
        timeStr
      ];
    });
    tableRows.push([
      "Total",
      "--",
      "--",
      "--",
      `Rs. ${totalFirst.toLocaleString()}`,
      `Rs. ${totalSecond.toLocaleString()}`,
      `Rs. ${grandTotal.toLocaleString()}`,
      "--",
      "--"
    ]);
    autoTable(doc2, {
      startY: 72,
      head: [["Sr #", "Customer Email", "Draw / Scheme Details", "Number", "1st Prize", "2nd Prize", "Sub Total", "Status", "Time"]],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: [15, 23, 42], fontStyle: "bold" },
      styles: { fontSize: 7.5, cellPadding: 2.5, font: "helvetica" },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 42, fontStyle: "bold" },
        2: { cellWidth: 42 },
        3: { fontStyle: "bold", textColor: [220, 38, 38], cellWidth: 16 },
        4: { cellWidth: 18 },
        5: { cellWidth: 18 },
        6: { fontStyle: "bold", cellWidth: 20 },
        7: { cellWidth: 14 },
        8: { cellWidth: 10 }
      },
      didParseCell: function(data) {
        if (data.row.index === safeBookings.length) {
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.textColor = [15, 23, 42];
          if (data.column.index === 6) {
            data.cell.styles.fillColor = [252, 211, 77];
          }
        }
      }
    });
    const finalY = doc2.lastAutoTable ? doc2.lastAutoTable.finalY || 150 : 150;
    doc2.setFontSize(8);
    doc2.setTextColor(148, 163, 184);
    doc2.text("MasterMind Qureshi Enterprise - Official Admin Record", 105, finalY + 12, { align: "center" });
    const cleanTitle = safeTitle.replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `Admin_Bookings_${cleanTitle}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`;
    return await savePdfDocument(doc2, filename);
  } catch (err) {
    console.error("Failed to generate admin bookings PDF:", err);
    return { success: false, error: (err == null ? void 0 : err.message) || "ایڈمن بکنگ رپورٹ بنانے میں خرابی پیش آئی۔" };
  }
}
const BookingDrawHeader = ({
  category,
  pageTitleUrdu,
  pageTitleEnglish,
  isTimeUp,
  isManuallyClosed,
  activeDraw,
  pakDraws,
  availableDraws = [],
  selectedDrawId,
  setSelectedDrawId,
  timeTicker,
  getRemainingTimeString,
  getFormattedDeadline,
  getFormattedClosedOn
}) => {
  const displayDraws = availableDraws.length > 0 ? availableDraws : pakDraws;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-4 relative border-b-4 border-amber-500 shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-amber-500 text-slate-950 font-semibold px-4 py-1.5 rounded-full text-xs font-mono order-last md:order-first", children: pageTitleEnglish }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center md:text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-amber-400", children: pageTitleUrdu }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-300 mt-1", children: "اپنی پسند کا نمبر فرسٹ اور سیکنڈ بکنگ کے لئے درج کریں اور رقم والٹ سے ادا کریں۔" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-5 rounded-3xl border flex flex-col shadow-sm transition-all ${isTimeUp ? "bg-red-50 border-red-200 text-red-950" : "bg-emerald-50/70 border-emerald-100 text-slate-800"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 order-last md:order-first w-full md:w-auto justify-between md:justify-start", children: isTimeUp ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-600 text-white font-bold px-4 py-2 rounded-2xl text-xs animate-pulse flex items-center gap-1.5 shadow-sm shadow-red-500/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (activeDraw == null ? void 0 : activeDraw.bookingStatusUrdu) || "بکنگ پورشن بند ہے (Closed)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left mt-2 pl-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-red-800", children: "Booking Closed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-slate-600 font-mono", children: [
              "Closed On: ",
              getFormattedClosedOn()
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-600 text-white font-bold px-4 py-2 rounded-2xl text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-500/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-white animate-ping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (activeDraw == null ? void 0 : activeDraw.bookingStatusUrdu) || "بکنگ فائنل کھل گئی ہے (Open)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center md:text-right space-y-1 w-full md:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center md:justify-end gap-2 text-slate-900 font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isTimeUp ? "text-red-700" : "text-slate-800", children: (activeDraw == null ? void 0 : activeDraw.titleUrdu) || "بکنگ فائنل کھل گئی ہے" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: `w-4 h-4 ${isTimeUp ? "text-red-500" : "text-amber-500"}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500", children: [
            "بکنگ کا آخری وقت اور تاریخ: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-800", children: getFormattedDeadline() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", children: isTimeUp ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-600 font-bold block mt-1", children: isManuallyClosed ? "عارضی طور پر بکنگ بند کی گئی ہے" : "بکنگ کا وقت پورا ہو گیا ہے، اس لئے اب کوئی نئی بکنگ یا ڈیمانڈ قبول نہیں کی جا رہی۔" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-700 font-semibold flex items-center justify-center md:justify-end gap-1 block mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 inline text-emerald-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "بکنگ ختم ہونے میں باقی وقت: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: getRemainingTimeString() })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-dashed border-slate-300/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-bold text-slate-700 mb-2.5 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-500 font-normal", children: displayDraws.length > 0 ? "بکنگ کے لئے مطلوبہ ڈرا منتخب کریں (Select Active Draw)" : "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ڈرا معلومات (Draw Details)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-amber-500" })
          ] })
        ] }),
        displayDraws.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-amber-800 font-semibold text-right", children: "نوٹ: نیچے تمام فعال ڈراز موجود ہیں۔ بکنگ شروع کرنے کے لئے مطلوبہ ڈرا کارڈ پر کلک کریں:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: displayDraws.map((d, idx) => {
            const drawId = d.id || d.drawId || d.category;
            const isSelected = selectedDrawId === drawId;
            const rawDTime = d && d.deadlineIso ? typeof d.deadlineIso === "object" && d.deadlineIso.seconds ? d.deadlineIso.seconds * 1e3 : new Date(d.deadlineIso).getTime() : 0;
            const dTime = isNaN(rawDTime) ? 0 : rawDTime;
            const dClosed = d.status === "closed" || dTime > 0 && timeTicker >= dTime || d.bookingStatusUrdu === "بکنگ بند ہے";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSelectedDrawId(drawId),
                className: `p-3.5 rounded-2xl border text-right transition-all cursor-pointer relative flex flex-col justify-between ${isSelected ? "bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/30 shadow-xs" : "bg-white/90 border-slate-200 hover:border-slate-300"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-slate-200/60 pb-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded-full ${dClosed ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-800"}`, children: dClosed ? "بند (Closed)" : "کھلا (Open)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-extrabold text-slate-900 font-mono", children: d.category === "thailand_lottery" ? "Thailand Lottery" : d.nextPrizeBondValue ? `Rs. ${d.nextPrizeBondValue}` : "Pakistan Bond" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-slate-700", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: d.nextDrawNumber ? `Draw #${d.nextDrawNumber}` : d.category === "thailand_lottery" ? "Thai Draw" : "---" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 text-[11px]", children: "ڈرا نمبر:" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-slate-700", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: d.nextDrawDate || "---" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 text-[11px]", children: "ڈرا تاریخ:" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-slate-700", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-600", children: d.nextDrawCity || (d.category === "thailand_lottery" ? "Bangkok" : "---") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 text-[11px]", children: "شہر:" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 pt-2 border-t border-slate-200/50 text-[10px] text-slate-500 flex justify-between items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-slate-700 font-semibold", children: getFormattedDeadline(d) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "آخری وقت:" })
                  ] })
                ]
              },
              drawId || idx
            );
          }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] text-slate-500 font-medium mb-0.5", children: "اگلی بانڈ مالیت" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-800 font-mono", children: (activeDraw == null ? void 0 : activeDraw.nextPrizeBondValue) || "---" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] text-slate-500 font-medium mb-0.5", children: "اگلا ڈرا شہر" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-800", children: (activeDraw == null ? void 0 : activeDraw.nextDrawCity) || "---" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] text-slate-500 font-medium mb-0.5", children: "اگلا ڈرا نمبر" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-800 font-mono", children: (activeDraw == null ? void 0 : activeDraw.nextDrawNumber) || "---" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-white/80 rounded-2xl border border-slate-100 shadow-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] text-slate-500 font-medium mb-0.5", children: "اگلی ڈرا تاریخ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-800 font-mono", children: (activeDraw == null ? void 0 : activeDraw.nextDrawDate) || "---" })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const BookingFormSection = ({
  isTimeUp,
  errorStatus,
  successStatus,
  numInput,
  setNumInput,
  firstAmtInput,
  setFirstAmtInput,
  secondAmtInput,
  setSecondAmtInput,
  currentTotalCost,
  handleSubmit,
  handleDemandClick
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-3xl border border-slate-100 shadow-md md:col-span-2 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-slate-800 pb-2 border-b border-slate-100 mb-2", children: "بکنگ اندراج فارم (Booking Details)" }),
      errorStatus && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs", children: [
        "⚠️ ",
        errorStatus
      ] }),
      successStatus && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs", children: [
        "✓ ",
        successStatus
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5", htmlFor: "field-second", children: "سیکنڈ رقم (Second Play) Rs." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "field-second",
                type: "number",
                placeholder: "0",
                value: secondAmtInput,
                onChange: (e) => setSecondAmtInput(e.target.value),
                disabled: isTimeUp,
                className: `w-full text-left border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono ${isTimeUp ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"}`,
                min: "0"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5", htmlFor: "field-first", children: "فرسٹ رقم (First Play) Rs." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "field-first",
                type: "number",
                placeholder: "0",
                value: firstAmtInput,
                onChange: (e) => setFirstAmtInput(e.target.value),
                disabled: isTimeUp,
                className: `w-full text-left border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono ${isTimeUp ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"}`,
                min: "0"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", htmlFor: "field-number", children: "بکنگ نمبر (Your Choice Number) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "field-number",
                type: "text",
                placeholder: isTimeUp ? "بکنگ بند ہے" : "نمبر لکھیں",
                value: numInput,
                onChange: (e) => setNumInput(e.target.value),
                disabled: isTimeUp,
                className: `w-full text-left border rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono ${isTimeUp ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"}`,
                required: true
              }
            )
          ] })
        ] }),
        currentTotalCost > 500 && !isTimeUp && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-amber-500/10 border border-amber-500/25 text-amber-900 rounded-2xl text-[11px] leading-relaxed flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "مجموعی رقم ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              "Rs. ",
              currentTotalCost.toLocaleString()
            ] }),
            " ہے، جو کہ 500 روپے سے زائد ہے۔ آپ اسے عام بکنگ کے علاوہ ڈائریکٹ ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"ڈیمانڈ"' }),
            " کے ذریعے بھی ایڈمن کو بھیج سکتے ہیں۔"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-amber-600 shrink-0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              id: "book-number-submit",
              type: "submit",
              disabled: isTimeUp,
              className: `flex-1 font-bold py-3.5 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 shadow-md ${isTimeUp ? "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300/30" : "bg-slate-900 hover:bg-slate-800 text-amber-400 cursor-pointer shadow-slate-900/10"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: `w-4 h-4 ${isTimeUp ? "text-slate-400" : "text-amber-400"}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نمبر بک کریں (Confirm Booking)" })
              ]
            }
          ),
          currentTotalCost > 500 && !isTimeUp && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              id: "send-demand-btn",
              type: "button",
              onClick: handleDemandClick,
              className: "flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3.5 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/15 border border-amber-400/40",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-slate-950" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ڈیمانڈ بھیجیں (Send Demand)" })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-6 rounded-3xl border border-slate-200/60 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-sm text-slate-800 pb-2 border-b border-slate-200 mb-3 flex items-center justify-end gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "بکنگ رہنمائی و قواعد" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-amber-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 leading-relaxed mb-3.5 text-right", children: "درست اندراج اور بروقت بکنگ کے لیے درج ذیل اہم ہدایات ملاحظہ فرمائیں:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-xs text-slate-700 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-2.5 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-slate-800 text-[11px]", children: "والٹ بیلنس کا ہونا" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500 mt-0.5", children: "بکنگ کی تصدیق کے لیے والٹ میں مطلوبہ رقم کا ہونا لازمی ہے۔" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-2.5 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-slate-800 text-[11px]", children: "ڈرا کا اختتامی وقت" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500 mt-0.5", children: "مقررہ ڈیڈ لائن پر بکنگ خودکار بند ہو جائے گی۔ وقت سے پہلے اندراج کریں۔" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-2.5 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-slate-800 text-[11px]", children: "منسوخی کی سہولت" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500 mt-0.5", children: "غلط اندراج کی صورت میں 2 منٹ کے اندر بکنگ کینسل کر کے رقم والٹ میں واپس لی جا سکتی ہے۔" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-2.5 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-slate-800 text-[11px]", children: "ڈیمانڈ آپشن" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500 mt-0.5", children: "اگر مطلوبہ نمبر براہ راست رجسٹر نہ ہو سکے تو 'ڈیمانڈ بھیجیں' کا آپشن استعمال کریں۔" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-3 border-t border-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 leading-normal text-right", children: "نوٹ: تمام بکنگز سسٹم کی عمومی پالیسی اور دستیابی کے تحت منظور کی جاتی ہیں۔" }) })
    ] })
  ] });
};
const BookingsAndDemandsTables = ({
  category,
  filterBookings,
  filterDemands,
  timeTicker,
  handleDownloadPDF,
  handleCancelClick
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-3 pb-4 border-b border-slate-100 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "download-pdf-btn",
            onClick: handleDownloadPDF,
            className: "w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-500/10 cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "بکنگ لسٹ پی ڈی ایف ڈاؤن لوڈ (Save PDF)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base sm:text-lg font-bold text-slate-800 text-center sm:text-right", children: "بک شدہ نمبرز کی لسٹ (Booked Numbers Sheet)" })
      ] }),
      filterBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-150", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm", children: "اس لسٹ میں ابھی کوئی نمبر بک نہیں کیا گیا ہے۔" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-right border-collapse text-xs sm:text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-slate-100/70 border-b border-slate-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-slate-600 text-left", children: "منسوخی (Action)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-slate-600 font-mono text-[11px]", children: "بکنگ کا وقت (Time)" }),
          category === "pakistan_bond" && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-slate-600 text-right", children: "بانڈ / ڈرا معلومات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-slate-600", children: "میزان رقم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-slate-600", children: "سیکنڈ (Second)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-slate-600", children: "فرسٹ (First)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-slate-600 text-right", children: "بک نمبر (No)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-100", children: filterBookings.map((b) => {
          const bTime = (() => {
            if (!b.timestamp) return Date.now();
            try {
              const dateObj = typeof b.timestamp === "object" && b.timestamp.seconds ? new Date(b.timestamp.seconds * 1e3) : new Date(b.timestamp);
              const t = dateObj.getTime();
              return isNaN(t) ? Date.now() : t;
            } catch {
              return Date.now();
            }
          })();
          const diffMs = timeTicker - bTime;
          const remainingMs = Math.max(0, 2 * 60 * 1e3 - diffMs);
          const canCancel = remainingMs > 0;
          const secondsLeft = Math.floor(remainingMs / 1e3);
          const drawText = [
            b.bondValue ? b.bondValue.startsWith("Rs") ? b.bondValue : `Rs. ${b.bondValue}` : "",
            b.drawNumber ? b.drawNumber.includes("Draw") ? b.drawNumber : `Draw #${b.drawNumber}` : "",
            b.drawCity || "",
            b.drawDate || ""
          ].filter(Boolean).join(" | ");
          const formattedTime = (() => {
            if (!b.timestamp) return "---";
            try {
              const dateObj = typeof b.timestamp === "object" && b.timestamp.seconds ? new Date(b.timestamp.seconds * 1e3) : new Date(b.timestamp);
              if (isNaN(dateObj.getTime())) return "---";
              return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            } catch {
              return "---";
            }
          })();
          const firstAmt = typeof b.firstAmount === "number" && !isNaN(b.firstAmount) ? b.firstAmount : 0;
          const secondAmt = typeof b.secondAmount === "number" && !isNaN(b.secondAmount) ? b.secondAmount : 0;
          const totalAmt = firstAmt + secondAmt;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-50/50 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-left", children: canCancel ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleCancelClick(b.id, b.number),
                  className: "p-1.5 text-red-500 hover:bg-red-50 rounded-lg hover:text-red-700 transition-all cursor-pointer flex items-center justify-center gap-1",
                  title: "کینسل کریں",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 leading-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-2.5 h-2.5 animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  secondsLeft,
                  "s left"
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 font-mono italic", children: "منجمد (Locked)" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-slate-400 font-mono text-left", children: formattedTime }),
            category === "pakistan_bond" && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs text-slate-700 font-semibold text-right", children: drawText || "---" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 font-mono font-semibold text-slate-700", children: [
              "Rs. ",
              totalAmt.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 font-mono text-slate-550", children: [
              "Rs. ",
              secondAmt.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 font-mono text-slate-550", children: [
              "Rs. ",
              firstAmt.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono font-bold text-red-650 text-base", children: b.number || "---" })
          ] }, b.id || Math.random());
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-3 pb-4 border-b border-slate-100 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-base sm:text-lg font-bold text-slate-800 text-center sm:text-right flex items-center justify-end gap-1.5 w-full sm:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "میری بھیجی گئی ڈیمانڈز (My Sent Demands)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4.5 h-4.5 text-amber-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400", children: "500 روپے سے زائد گیمز کی ڈیمانڈز اور ان کی موجودہ حالت" })
      ] }),
      filterDemands.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-150", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm", children: "فی الحال کوئی ڈیمانڈ موجود نہیں ہے۔" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-right border-collapse text-xs sm:text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-slate-100/70 border-b border-slate-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-slate-600 text-left", children: "حیثیت (Status)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-slate-600 font-mono text-[11px]", children: "بکنگ کا وقت (Time)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-slate-600", children: "میزان رقم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-slate-600", children: "سیکنڈ (Second)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-slate-600", children: "فرسٹ (First)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-slate-600 text-right", children: "بک نمبر (No)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-100", children: filterDemands.map((d) => {
          const formattedTime = (() => {
            if (!d.timestamp) return "---";
            try {
              const dateObj = typeof d.timestamp === "object" && d.timestamp.seconds ? new Date(d.timestamp.seconds * 1e3) : new Date(d.timestamp);
              if (isNaN(dateObj.getTime())) return "---";
              return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            } catch {
              return "---";
            }
          })();
          const firstAmt = typeof d.firstAmount === "number" && !isNaN(d.firstAmount) ? d.firstAmount : 0;
          const secondAmt = typeof d.secondAmount === "number" && !isNaN(d.secondAmount) ? d.secondAmount : 0;
          const totalAmt = firstAmt + secondAmt;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-50/50 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 text-left", children: [
              d.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-200 inline-block", children: "انتظار ⏳ (Pending)" }),
              d.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200 inline-block", children: "منظور شدہ ✓ (Approved)" }),
              d.status === "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded-full border border-red-200 inline-block", children: "مسترد شدہ ✗ (Rejected)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-slate-400 font-mono text-left", children: formattedTime }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 font-mono font-semibold text-slate-700", children: [
              "Rs. ",
              totalAmt.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 font-mono text-slate-550", children: [
              "Rs. ",
              secondAmt.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 font-mono text-slate-550", children: [
              "Rs. ",
              firstAmt.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono font-bold text-slate-800 text-base", children: d.number || "---" })
          ] }, d.id || Math.random());
        }) })
      ] }) })
    ] })
  ] });
};
function BookingPage({
  user,
  bookings,
  dealerBookings = [],
  demands = [],
  deadlines = [],
  category,
  onAddBooking,
  onCancelBooking,
  onAddDemand
}) {
  const [numInput, setNumInput] = reactExports.useState("");
  const [firstAmtInput, setFirstAmtInput] = reactExports.useState("");
  const [secondAmtInput, setSecondAmtInput] = reactExports.useState("");
  const [errorStatus, setErrorStatus] = reactExports.useState("");
  const [successStatus, setSuccessStatus] = reactExports.useState("");
  const [timeTicker, setTimeTicker] = reactExports.useState(Date.now());
  const activeDrawsList = (deadlines || []).filter((d) => d.status !== "result_announced" && !d.isArchived);
  const categoryDraws = category === "unified" ? activeDrawsList : activeDrawsList.filter((d) => d.category === category);
  const pakDraws = activeDrawsList.filter((d) => d.category === "pakistan_bond");
  const [selectedDrawId, setSelectedDrawId] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (categoryDraws.length > 0) {
      if (!selectedDrawId || !categoryDraws.some((d) => (d.id || d.drawId || d.category) === selectedDrawId)) {
        const defaultDraw = categoryDraws[0];
        setSelectedDrawId(defaultDraw.id || defaultDraw.drawId || defaultDraw.category);
      }
    }
  }, [category, deadlines, categoryDraws]);
  reactExports.useEffect(() => {
    const timer = setInterval(() => {
      setTimeTicker(Date.now());
    }, 1e3);
    return () => clearInterval(timer);
  }, []);
  const activeDraw = categoryDraws.find((d) => (d.id || d.drawId || d.category) === selectedDrawId) || categoryDraws[0] || (deadlines || [])[0];
  const rawDeadlineTime = activeDraw && activeDraw.deadlineIso ? typeof activeDraw.deadlineIso === "object" && activeDraw.deadlineIso.seconds ? activeDraw.deadlineIso.seconds * 1e3 : new Date(activeDraw.deadlineIso).getTime() : 0;
  const deadlineTime = isNaN(rawDeadlineTime) ? 0 : rawDeadlineTime;
  const isManuallyClosed = (activeDraw == null ? void 0 : activeDraw.status) === "closed" || (activeDraw == null ? void 0 : activeDraw.bookingStatusUrdu) === "بکنگ بند ہے";
  const isTimeUp = isManuallyClosed || deadlineTime > 0 && timeTicker >= deadlineTime;
  const getRemainingTimeString = () => {
    if ((activeDraw == null ? void 0 : activeDraw.status) === "closed") return "بکنگ بند ہے (Closed)";
    if (!deadlineTime) return "";
    const diff = deadlineTime - timeTicker;
    if (diff <= 0) return "وقت ختم ہو چکا ہے (Closed)";
    const days = Math.floor(diff / (24 * 60 * 60 * 1e3));
    const hours = Math.floor(diff % (24 * 60 * 60 * 1e3) / (60 * 60 * 1e3));
    const mins = Math.floor(diff % (60 * 60 * 1e3) / (60 * 1e3));
    const secs = Math.floor(diff % (60 * 1e3) / 1e3);
    let str = "";
    if (days > 0) str += `${days} دن `;
    if (hours > 0 || days > 0) str += `${hours} گھنٹے `;
    str += `${mins} منٹ ${secs} سیکنڈ`;
    return str;
  };
  const getFormattedDeadline = (drawObj = activeDraw) => {
    if (!drawObj || !drawObj.deadlineIso) return "مقرر نہیں ہے";
    try {
      const d = typeof drawObj.deadlineIso === "object" && drawObj.deadlineIso.seconds ? new Date(drawObj.deadlineIso.seconds * 1e3) : new Date(drawObj.deadlineIso);
      if (isNaN(d.getTime())) return String(drawObj.deadlineIso || "مقرر نہیں ہے");
      const dateStr = d.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
      const timeStr = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
      return `${dateStr} بوقت ${timeStr}`;
    } catch (e) {
      return String(drawObj.deadlineIso || "مقرر نہیں ہے");
    }
  };
  const getFormattedClosedOn = (drawObj = activeDraw) => {
    if (!drawObj || !drawObj.deadlineIso) return "";
    try {
      const d = typeof drawObj.deadlineIso === "object" && drawObj.deadlineIso.seconds ? new Date(drawObj.deadlineIso.seconds * 1e3) : new Date(drawObj.deadlineIso);
      if (isNaN(d.getTime())) return String(drawObj.deadlineIso || "");
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, "0");
      const minutes = String(d.getMinutes()).padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (e) {
      return String(drawObj.deadlineIso || "");
    }
  };
  const pageTitleUrdu = category === "pakistan_bond" ? "پاکستان پرائز بانڈ بکنگ پورٹل" : category === "thailand_lottery" ? "تھائی لینڈ ڈرا بکنگ پورٹل" : "پرائز بانڈ و ڈرا بکنگ پورٹل (Unified Draw Booking)";
  const pageTitleEnglish = category === "pakistan_bond" ? "PAKISTAN BOND DRAW" : category === "thailand_lottery" ? "THAILAND LOTTERY DRAW" : "UNIFIED DRAW BOOKING";
  const userEmailLower = ((user == null ? void 0 : user.email) || "").toLowerCase();
  const sourceBookings = user.role === "dealer" ? (dealerBookings || []).filter((b) => b.dealerId === user.uid).map((b) => ({
    ...b,
    userEmail: b.dealerEmail,
    userName: b.dealerName
  })) : bookings || [];
  const filterBookings = sourceBookings.filter((b) => {
    if (!b) return false;
    if (user.role !== "dealer" && (b.userEmail || "").toLowerCase() !== userEmailLower) return false;
    if (category === "unified") {
      return selectedDrawId ? b.drawId === selectedDrawId || b.category === (activeDraw == null ? void 0 : activeDraw.category) : true;
    }
    return b.category === category;
  });
  const filterDemands = (demands || []).filter((d) => {
    if (!d || (d.userEmail || "").toLowerCase() !== userEmailLower) return false;
    if (category === "unified") {
      return selectedDrawId ? d.drawId === selectedDrawId || d.category === (activeDraw == null ? void 0 : activeDraw.category) : true;
    }
    return d.category === category;
  });
  const currentFirstAmt = parseInt(firstAmtInput || "0", 10);
  const currentSecondAmt = parseInt(secondAmtInput || "0", 10);
  const currentTotalCost = currentFirstAmt + currentSecondAmt;
  const handleDemandClick = async (e) => {
    e.preventDefault();
    setErrorStatus("");
    setSuccessStatus("");
    if (isTimeUp) {
      setErrorStatus("معذرت! بکنگ کا وقت پورا ہو چکا ہے۔ اب مزید کوئی ڈیمانڈ قبول نہیں کی جا سکتی۔");
      return;
    }
    if (!numInput) {
      setErrorStatus("براہ کرم نمبر درج کریں۔");
      return;
    }
    const firstAmt = parseInt(firstAmtInput || "0", 10);
    const secondAmt = parseInt(secondAmtInput || "0", 10);
    if (firstAmt <= 0 && secondAmt <= 0) {
      setErrorStatus("براہ کرم فرسٹ یا سیکنڈ میں سے کسی ایک میں رقم درج کریں۔");
      return;
    }
    const totalCost = firstAmt + secondAmt;
    if (totalCost <= 500) {
      setErrorStatus("ڈیمانڈ بھیجنے کے لئے گیم کی رقم 500 روپے سے زیادہ ہونی چاہیے۔");
      return;
    }
    if (((user == null ? void 0 : user.balance) ?? 0) < totalCost) {
      setErrorStatus("آپ کے والٹ میں کافی رقم موجود نہیں ہے! ڈیمانڈ منظور ہونے پر رقم درکار ہوگی۔");
      return;
    }
    const res = await onAddDemand(
      numInput,
      firstAmt,
      secondAmt,
      activeDraw == null ? void 0 : activeDraw.nextPrizeBondValue,
      activeDraw == null ? void 0 : activeDraw.nextDrawNumber,
      activeDraw == null ? void 0 : activeDraw.nextDrawDate,
      activeDraw == null ? void 0 : activeDraw.nextDrawCity,
      (activeDraw == null ? void 0 : activeDraw.id) || (activeDraw == null ? void 0 : activeDraw.category)
    );
    if (res.success) {
      setSuccessStatus(`کامیاب: نمبر ${numInput} کے لئے Rs. ${totalCost.toLocaleString()} کی ڈیمانڈ ایڈمن کو بھیج دی گئی ہے!`);
      setNumInput("");
      setFirstAmtInput("");
      setSecondAmtInput("");
    } else {
      setErrorStatus(res.error || "ڈیمانڈ بھیجنے کے دوران غلطی پیش آئی۔");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorStatus("");
    setSuccessStatus("");
    if (isTimeUp) {
      setErrorStatus("معذرت! بکنگ کا وقت پورا ہو چکا ہے۔ اب مزید کوئی بکنگ قبول نہیں کی جا سکتی۔");
      return;
    }
    if (!numInput) {
      setErrorStatus("براہ کرم نمبر درج کریں۔");
      return;
    }
    const firstAmt = parseInt(firstAmtInput || "0", 10);
    const secondAmt = parseInt(secondAmtInput || "0", 10);
    if (firstAmt <= 0 && secondAmt <= 0) {
      setErrorStatus("براہ کرم فرسٹ یا سیکنڈ میں سے کسی ایک میں رقم درج کریں۔");
      return;
    }
    const totalCost = firstAmt + secondAmt;
    if (((user == null ? void 0 : user.balance) ?? 0) < totalCost) {
      setErrorStatus("آپ کے والٹ میں کافی رقم موجود نہیں ہے! کسٹمر سپورٹ یا ایڈمن سے رابطہ کریں۔");
      return;
    }
    const res = await onAddBooking(
      numInput,
      firstAmt,
      secondAmt,
      activeDraw == null ? void 0 : activeDraw.nextPrizeBondValue,
      activeDraw == null ? void 0 : activeDraw.nextDrawNumber,
      activeDraw == null ? void 0 : activeDraw.nextDrawDate,
      activeDraw == null ? void 0 : activeDraw.nextDrawCity,
      (activeDraw == null ? void 0 : activeDraw.id) || (activeDraw == null ? void 0 : activeDraw.category)
    );
    if (res.success) {
      setSuccessStatus(`کامیاب: نمبر ${numInput} کی بکنگ رجسٹر ہو گئی ہے!`);
      setNumInput("");
      setFirstAmtInput("");
      setSecondAmtInput("");
    } else {
      setErrorStatus(res.error || "بکنگ کے دوران غلطی پیش آئی۔");
    }
  };
  const handleCancelClick = async (id, number) => {
    setErrorStatus("");
    setSuccessStatus("");
    const res = await onCancelBooking(id);
    if (res.success) {
      setSuccessStatus(`منسوخ: نمبر ${number} کو منسوخ کر کے رقم والٹ میں جمع کر دی گئی ہے!`);
    } else {
      setErrorStatus(res.error || "منسوخی کے دوران غلطی پیش آئی۔");
    }
  };
  const handleDownloadPDF = async () => {
    if (filterBookings.length === 0) {
      setErrorStatus("پی ڈی ایف ڈاؤن لوڈ کرنے کے لئے لسٹ میں نمبر ہونا لازمی ہے۔");
      return;
    }
    const res = await generateBookingPDF(
      user.name || "",
      user.email || "",
      user.phone || "",
      user.city || "",
      filterBookings,
      category
    );
    if (res.success) {
      setSuccessStatus("پی ڈی ایف فائل کامیابی سے تیار اور ڈاؤن لوڈ کر دی گئی ہے!");
    } else {
      setErrorStatus(res.error || "پی ڈی ایف فائل بنانے میں خرابی پیش آئی۔");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-right font-sans max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingDrawHeader,
      {
        category,
        pageTitleUrdu,
        pageTitleEnglish,
        isTimeUp,
        isManuallyClosed,
        activeDraw,
        pakDraws,
        availableDraws: categoryDraws,
        selectedDrawId,
        setSelectedDrawId,
        timeTicker,
        getRemainingTimeString,
        getFormattedDeadline,
        getFormattedClosedOn
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingFormSection,
      {
        isTimeUp,
        errorStatus,
        successStatus,
        numInput,
        setNumInput,
        firstAmtInput,
        setFirstAmtInput,
        secondAmtInput,
        setSecondAmtInput,
        currentTotalCost,
        handleSubmit,
        handleDemandClick
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingsAndDemandsTables,
      {
        category,
        filterBookings,
        filterDemands,
        timeTicker,
        handleDownloadPDF,
        handleCancelClick
      }
    )
  ] });
}
function UserProfilePage({ user, totalBookingsCount }) {
  const whatsappNumber = getSupportWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("السلام علیکم! مجھے ماسٹر مائینڈ قریشی انٹرپرائز پرائز بانڈ سسٹم کے بارے میں مدد چاہئے۔")}`;
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [name, setName] = reactExports.useState(user.name || "");
  const [phone, setPhone] = reactExports.useState(user.phone || "");
  const [city, setCity] = reactExports.useState(user.city || "");
  const [loading, setLoading] = reactExports.useState(false);
  const [statusMessage, setStatusMessage] = reactExports.useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = reactExports.useState(false);
  const [deletePassword, setDeletePassword] = reactExports.useState("");
  const [confirmKeyword, setConfirmKeyword] = reactExports.useState("");
  const [confirmCheckbox, setConfirmCheckbox] = reactExports.useState(false);
  const [isDeleting, setIsDeleting] = reactExports.useState(false);
  const [deleteError, setDeleteError] = reactExports.useState("");
  const [deleteSuccess, setDeleteSuccess] = reactExports.useState("");
  const [requiresRecentLogin, setRequiresRecentLogin] = reactExports.useState(false);
  const isUserSuperOwner = isSuperOwner(user.email);
  const handleDeleteAccount = async () => {
    setDeleteError("");
    setDeleteSuccess("");
    setIsDeleting(true);
    try {
      const res = await deleteOwnAccount(deletePassword.trim());
      if (res.success) {
        setDeleteSuccess(res.message || "آپ کا اکاؤنٹ اور تمام ذاتی ڈیٹا کامیابی سے مستقل طور پر حذف کر دیا گیا ہے۔");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        if (res.requiresRecentLogin) {
          setRequiresRecentLogin(true);
          setDeleteError("سیکیورٹی تقاضے کے تحت، براہ کرم اپنے پاس ورڈ یا گوگل اکاؤنٹ سے دوبارہ تصدیق کریں۔");
        } else {
          setDeleteError(res.error || "اکاؤنٹ حذف کرنے میں خرابی پیش آئی۔");
        }
      }
    } catch (err) {
      setDeleteError((err == null ? void 0 : err.message) || "خرابی پیش آئی۔");
    } finally {
      setIsDeleting(false);
    }
  };
  const handleGoogleDelete = async () => {
    setDeleteError("");
    setDeleteSuccess("");
    setIsDeleting(true);
    try {
      const res = await deleteOwnAccountWithGoogle();
      if (res.success) {
        setDeleteSuccess(res.message || "آپ کا اکاؤنٹ اور تمام ذاتی ڈیٹا کامیابی سے مستقل طور پر حذف کر دیا گیا ہے۔");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setDeleteError(res.error || "گوگل تصدیق کے دوران خرابی پیش آئی۔");
      }
    } catch (err) {
      setDeleteError((err == null ? void 0 : err.message) || "خرابی پیش آئی۔");
    } finally {
      setIsDeleting(false);
    }
  };
  reactExports.useEffect(() => {
    if (!isEditing) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setCity(user.city || "");
    }
  }, [user, isEditing]);
  const handleStartEditing = () => {
    setName(user.name || "");
    setPhone(user.phone || "");
    setCity(user.city || "");
    setStatusMessage(null);
    setIsEditing(true);
  };
  const handleCancelEditing = () => {
    setIsEditing(false);
    setStatusMessage(null);
  };
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setStatusMessage(null);
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedCity = city.trim();
    if (!trimmedName) {
      setStatusMessage({ text: "نام کا درج کرنا لازمی ہے۔", type: "error" });
      return;
    }
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      setStatusMessage({ text: "نام 2 سے 100 حروف کے درمیان ہونا چاہیے۔", type: "error" });
      return;
    }
    if (!trimmedPhone) {
      setStatusMessage({ text: "موبائل نمبر درج کرنا لازمی ہے۔", type: "error" });
      return;
    }
    const phoneRegex = /^[\d\+\-\s]{10,20}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      setStatusMessage({ text: "براہ کرم درست فون نمبر درج کریں۔ (مثلاً: 03001234567)", type: "error" });
      return;
    }
    if (!trimmedCity) {
      setStatusMessage({ text: "شہر کا نام درج کرنا لازمی ہے۔", type: "error" });
      return;
    }
    if (trimmedCity.length > 50) {
      setStatusMessage({ text: "شہر کا نام 50 حروف سے زیادہ نہیں ہو سکتا۔", type: "error" });
      return;
    }
    if (!user.uid) {
      setStatusMessage({ text: "صارف کی شناخت (UID) موجود نہیں ہے۔", type: "error" });
      return;
    }
    setLoading(true);
    const result = await updateUserProfile(user.uid, {
      name: trimmedName,
      phone: trimmedPhone,
      city: trimmedCity
    });
    setLoading(false);
    if (result.success) {
      setStatusMessage({ text: result.message, type: "success" });
      setTimeout(() => {
        setIsEditing(false);
      }, 1200);
    } else {
      setStatusMessage({ text: result.message, type: "error" });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-100 max-w-2xl mx-auto text-right font-sans", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center pb-6 border-b border-slate-100 mb-6 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-slate-900 border-2 border-amber-400 rounded-full flex items-center justify-center text-white mb-4 shadow-lg text-3xl font-bold font-sans", children: user.name.trim().charAt(0) || "ک" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl sm:text-2xl font-bold text-slate-800", children: user.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 font-mono mt-1", children: user.email }),
      user.isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-2.5 inline-flex items-center gap-1 bg-amber-500 text-slate-950 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ایڈمن اکاؤنٹ (Admin)" })
      ] }) : user.role === "dealer" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-2.5 inline-flex items-center gap-1 bg-amber-100 text-amber-950 border border-amber-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-3.5 h-3.5 text-amber-700" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مجاز ڈیلر (Authorized Dealer)" })
      ] }) : null,
      !isEditing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleStartEditing,
          className: "mt-4 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer hover:-translate-y-0.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پروفائل میں ترمیم کریں (Edit Profile)" })
          ]
        }
      )
    ] }),
    statusMessage && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `p-4 rounded-2xl mb-6 flex items-center justify-between gap-3 text-xs font-bold border ${statusMessage.type === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-rose-50 text-rose-800 border-rose-200"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          statusMessage.type === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-emerald-600 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-rose-600 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: statusMessage.text })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-2 border-b border-slate-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-slate-500 uppercase tracking-widest text-left", children: "PERSONAL DOSSIER / کسٹمر کی مکمل پروفائل" }),
        isEditing && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60", children: "ترمیم موڈ (Editing Mode)" })
      ] }),
      isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveProfile, className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 text-right", children: [
            "پورا نام (Full Name) ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: name,
                onChange: (e) => setName(e.target.value),
                disabled: loading,
                maxLength: 100,
                placeholder: "اپنا مکمل نام درج کریں",
                className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-right"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-slate-400 absolute left-3 top-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 text-right", children: [
            "موبائل نمبر (Mobile / Phone) ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                disabled: loading,
                maxLength: 20,
                placeholder: "03001234567",
                className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono font-semibold text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-right"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-slate-400 absolute left-3 top-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold text-slate-700 mb-1.5 text-right", children: [
            "شہر (City) ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: city,
                onChange: (e) => setCity(e.target.value),
                disabled: loading,
                maxLength: 50,
                placeholder: "اپنا شہر درج کریں",
                className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-right"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-slate-400 absolute left-3 top-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-slate-100 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-400 font-bold flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 text-slate-400" }),
                "غیر تبدیل پذیر (Read Only)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 text-right", children: "ای میل ایڈریس (Email ID)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: user.email,
                  disabled: true,
                  className: "w-full bg-slate-100 border border-slate-200/80 rounded-xl px-4 py-2.5 text-sm font-mono font-semibold text-slate-500 cursor-not-allowed text-right select-all"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-slate-400 absolute left-3 top-3" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-400 font-bold flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 text-slate-400" }),
                "غیر تبدیل پذیر (Read Only)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-500 text-right", children: "صارف کی شناخت (User UID)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: user.uid || "N/A",
                disabled: true,
                className: "w-full bg-slate-100 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-500 cursor-not-allowed text-right select-all"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-slate-100 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleCancelEditing,
              disabled: loading,
              className: "px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "منسوخ کریں (Cancel)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: loading,
              className: "px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50 hover:-translate-y-0.5",
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "محفوظ ہو رہا ہے..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پروفائل محفوظ کریں (Save)" })
              ] })
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-4 rounded-2xl border border-slate-100/50 flex items-center gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-amber-500/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block", children: "موبائل نمبر (Mobile)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-slate-800 font-semibold", children: user.phone })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-4 rounded-2xl border border-slate-100/50 flex items-center gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-amber-500/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block", children: "شہر (City)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-800 font-semibold", children: user.city })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-4 rounded-2xl border border-slate-100/50 flex items-center gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5 text-amber-500/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block", children: "رجسٹریشن ایمیل (Email ID)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-slate-800 font-semibold", children: user.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-4 rounded-2xl border border-slate-100/50 flex items-center gap-3 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-amber-500/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block", children: "والٹ رقم (Wallet Balance)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm text-amber-600 font-bold", children: [
              "Rs. ",
              user.balance.toLocaleString()
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-white p-5 rounded-2xl mt-6 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left font-mono", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] text-slate-400 uppercase", children: "Bookings Record" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-amber-400", children: totalBookingsCount })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-semibold text-sm", children: "سروس بکنگ کی تفصیلات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-300 mt-1", children: "آپ کے پاکستان بانڈ اور تھائی لینڈ لاٹری کے کل بک شدہ نمبرز۔" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-50 border border-emerald-200 p-5 rounded-2xl mt-6 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: whatsappUrl,
            target: "_blank",
            referrerPolicy: "no-referrer",
            rel: "noopener noreferrer",
            className: "w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/10 cursor-pointer hover:-translate-y-0.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 text-white" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "واٹس ایپ پر رابطہ کریں (WhatsApp)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center sm:text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-bold text-xs text-emerald-950", children: "کسٹمر سپورٹ و والٹ فنڈز ہیلپ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-emerald-800 mt-1", children: "بیلنس چارج کروانے یا کسی بھی مدد کے لیے ابھی ایڈمن سے واٹس ایپ پر رابطہ کریں۔" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50/50 border-2 border-red-200 rounded-3xl p-5 sm:p-6 mt-8 space-y-4 text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-red-100 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: DELETE_ACCOUNT_URL,
              onClick: (e) => {
                e.preventDefault();
                openExternalUrl(DELETE_ACCOUNT_URL);
              },
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-[11px] text-red-600 hover:text-red-700 underline font-semibold flex items-center gap-1 cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پالیسی معلومات (Policy)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-red-700", children: "خطرناک زون / اکاؤنٹ مستقل حذف کریں (Account Deletion)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4 text-red-600 shrink-0" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "اگر آپ MasterMind Qureshi Enterprise سسٹم سے اپنا اکاؤنٹ، رابطہ معلومات اور تمام ذاتی ڈیٹا مکمل و مستقل طور پر ختم کرنا چاہتے ہیں تو آپ یہاں سے خودکار طریقے سے اپنا اکاؤنٹ فوری حذف کر سکتے ہیں۔" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/80 p-3.5 rounded-2xl border border-red-100 space-y-2 text-[11px] text-slate-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-end gap-2 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-red-700", children: "کیا حذف ہوگا (What will be deleted):" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-slate-500", children: "فائر بیس لاگ ان اکاؤنٹ (Authentication)، آپ کی پروفائل (نام، موبائل نمبر، شہر، ای میل) اور تمام غیر حل شدہ مطالبات (Demands) ہمیشہ کے لیے مٹ جائیں گے۔" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-end gap-2 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-slate-700", children: "قانونی و مالیاتی ڈیٹا کا تحفظ (Data Retention):" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-slate-500", children: "ماضی کی قرعہ اندازیوں کے مالیاتی ٹرانزیکشنز اور بکنگ ریکارڈز قانون، ٹیکس اور دھوکہ دہی کی روک تھام کے تقاضوں کے تحت شناخت کے بغیر سیکیور سسٹم آرکائیو میں محفوظ رہتے ہیں۔" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: isUserSuperOwner ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-amber-700 font-bold bg-amber-100/70 border border-amber-300 px-4 py-2 rounded-xl", children: "سپر اونر (Super Owner) اکاؤنٹ کی سیکیورٹی کی وجہ سے اسے حذف نہیں کیا جا سکتا۔" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setDeleteError("");
              setDeleteSuccess("");
              setDeletePassword("");
              setConfirmKeyword("");
              setConfirmCheckbox(false);
              setRequiresRecentLogin(false);
              setIsDeleteModalOpen(true);
            },
            className: "bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:-translate-y-0.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "میرا اکاؤنٹ مستقل حذف کریں (Delete My Account)" })
            ]
          }
        ) })
      ] }),
      isDeleteModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white max-w-lg w-full rounded-3xl border border-red-200 shadow-2xl p-6 sm:p-8 text-right font-sans animate-in fade-in max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsDeleteModalOpen(false),
              disabled: isDeleting,
              className: "text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-bold text-red-600", children: "اکاؤنٹ مستقل حذف کرنے کی تصدیق" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-red-600 shrink-0" })
          ] })
        ] }),
        deleteError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs mb-4 text-right flex items-start justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: deleteError }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0 text-red-600 mt-0.5" })
        ] }),
        deleteSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs mb-4 text-right flex items-center justify-end gap-2 font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: deleteSuccess }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 shrink-0 text-emerald-600" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-6 text-xs text-slate-600 leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 border border-slate-200 p-3 rounded-2xl space-y-1 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-slate-500 font-mono", children: [
              "ای میل: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-slate-800", children: user.email })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-slate-500 font-mono", children: [
              "صارف کی شناخت (UID): ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-slate-800", children: user.uid })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-700", children: "کیا آپ واقعی اپنا اکاؤنٹ اور تمام ذاتی ڈیٹا حذف کرنا چاہتے ہیں؟ یہ عمل مستقل ہے اور اسے واپس نہیں لایا جا سکتا۔" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2 border-t border-slate-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-700 font-bold mb-1.5 text-right", children: "پاس ورڈ کی تصدیق (Password Verification):" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "password",
                    placeholder: "اپنا پاس ورڈ درج کریں",
                    value: deletePassword,
                    onChange: (e) => setDeletePassword(e.target.value),
                    disabled: isDeleting,
                    className: "w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-red-500 focus:bg-white text-right"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4 text-slate-400 absolute left-3 top-3" })
              ] })
            ] }),
            requiresRecentLogin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 p-3 rounded-xl space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-800 text-[11px] font-semibold", children: "اگر آپ گوگل کے ذریعے لاگ ان ہوئے تھے، تو نیچے دیے گئے بٹن پر کلک کر کے گوگل تصدیق کریں:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleGoogleDelete,
                  disabled: isDeleting,
                  className: "w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-amber-500" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "گوگل کے ساتھ دوبارہ تصدیق کر کے حذف کریں (Google Re-auth)" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-slate-700 font-bold mb-1.5 text-right", children: [
                "تصدیق کے لیے انگریزی میں ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-600 font-mono", children: "DELETE" }),
                " لکھیں:"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "DELETE",
                  value: confirmKeyword,
                  onChange: (e) => setConfirmKeyword(e.target.value),
                  disabled: isDeleting,
                  className: "w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-red-500 focus:bg-white text-center font-bold tracking-widest uppercase"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2.5 pt-2 cursor-pointer text-right flex-row-reverse", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: confirmCheckbox,
                  onChange: (e) => setConfirmCheckbox(e.target.checked),
                  disabled: isDeleting,
                  className: "mt-1 w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer shrink-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-700 select-none", children: "میں تصدیق کرتا/کرتی ہوں کہ میں اپنا اکاؤنٹ، رابطہ نمبر اور تمام ذاتی پروفائل ہمیشہ کے لیے ختم کرنا چاہتا/چاہتی ہوں۔" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 pt-3 border-t border-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsDeleteModalOpen(false),
              disabled: isDeleting,
              className: "px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer",
              children: "منسوخ کریں (Cancel)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleDeleteAccount,
              disabled: isDeleting || !confirmCheckbox || confirmKeyword.trim() !== "DELETE",
              className: "px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:cursor-not-allowed hover:-translate-y-0.5",
              children: isDeleting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "اکاؤنٹ حذف کیا جا رہا ہے..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مستقل حذف کریں (Confirm Delete)" })
              ] })
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}
const PK_BOND_CATEGORIES = [
  { value: "all", labelUrdu: "تمام بانڈز", labelEng: "All Bonds" },
  { value: "Rs. 100", labelUrdu: "روپے 100", labelEng: "Rs. 100", firstPrizeAmount: "700,000" },
  { value: "Rs. 200", labelUrdu: "روپے 200", labelEng: "Rs. 200", firstPrizeAmount: "750,000" },
  { value: "Rs. 750", labelUrdu: "روپے 750", labelEng: "Rs. 750", firstPrizeAmount: "1,500,000" },
  { value: "Rs. 1,500", labelUrdu: "روپے 1,500", labelEng: "Rs. 1,500", firstPrizeAmount: "3,000,000" },
  { value: "Rs. 7,500", labelUrdu: "روپے 7,500", labelEng: "Rs. 7,500", firstPrizeAmount: "15,000,000" },
  { value: "Rs. 15,000", labelUrdu: "روپے 15,000", labelEng: "Rs. 15,000", firstPrizeAmount: "30,000,000" },
  { value: "Rs. 25,000 Premium", labelUrdu: "روپے 25,000 پریمیم", labelEng: "Rs. 25,000 Prem.", firstPrizeAmount: "50,000,000" },
  { value: "Rs. 40,000", labelUrdu: "روپے 40,000 نارمل", labelEng: "Rs. 40,000 Normal", firstPrizeAmount: "75,000,000" },
  { value: "Rs. 40,000 Premium", labelUrdu: "روپے 40,000 پریمیم", labelEng: "Rs. 40,000 Prem.", firstPrizeAmount: "80,000,000" }
];
const PK_CITIES_LIST = [
  { nameUrdu: "کراچی", nameEng: "Karachi", code: "KHI" },
  { nameUrdu: "لاہور", nameEng: "Lahore", code: "LHR" },
  { nameUrdu: "فیصل آباد", nameEng: "Faisalabad", code: "FSL" },
  { nameUrdu: "مظفرآباد", nameEng: "Muzaffarabad", code: "MUZ" },
  { nameUrdu: "ملتان", nameEng: "Multan", code: "MUL" },
  { nameUrdu: "راولپنڈی", nameEng: "Rawalpindi", code: "RWD" },
  { nameUrdu: "حیدرآباد", nameEng: "Hyderabad", code: "HYD" },
  { nameUrdu: "پشاور", nameEng: "Peshawar", code: "PWR" },
  { nameUrdu: "کوئٹہ", nameEng: "Quetta", code: "QUE" },
  { nameUrdu: "سیالکوٹ", nameEng: "Sialkot", code: "SKT" },
  { nameUrdu: "گوجرانوالہ", nameEng: "Gujranwala", code: "GUJ" },
  { nameUrdu: "اسلام آباد", nameEng: "Islamabad", code: "ISB" },
  { nameUrdu: "سکھر", nameEng: "Sukkur", code: "SKR" },
  { nameUrdu: "بہاولپور", nameEng: "Bahawalpur", code: "BWP" }
];
function normalizeDrawBondValue(draw) {
  const combined = `${draw.bondValue || ""} ${draw.drawNo || ""} ${draw.id || ""}`.replace(/[\s,]+/g, "").toLowerCase();
  if (combined.includes("40000")) {
    if (combined.includes("prem") || combined.includes("پریمیم")) {
      return "Rs. 40,000 Premium";
    }
    return "Rs. 40,000";
  }
  if (combined.includes("25000")) return "Rs. 25,000 Premium";
  if (combined.includes("15000")) return "Rs. 15,000";
  if (combined.includes("7500")) return "Rs. 7,500";
  if (combined.includes("1500")) return "Rs. 1,500";
  if (combined.includes("750")) return "Rs. 750";
  if (combined.includes("200")) return "Rs. 200";
  if (combined.includes("100")) return "Rs. 100";
  return "Rs. 200";
}
function isBondMatchForAnalysis(drawBondNormalized, selectedBond) {
  if (selectedBond === "all") return true;
  const isSelected40k = selectedBond === "Rs. 40,000" || selectedBond === "Rs. 40,000 Premium" || selectedBond === "40000" || selectedBond === "Rs. 40,000 Normal";
  const isDraw40k = drawBondNormalized === "Rs. 40,000" || drawBondNormalized === "Rs. 40,000 Premium" || drawBondNormalized === "40000" || drawBondNormalized === "Rs. 40,000 Normal";
  if (isSelected40k && isDraw40k) {
    return true;
  }
  return drawBondNormalized === selectedBond;
}
function computeAnalysisStats(draws) {
  const totalDraws = draws.length;
  const frequencies = {
    open: Array(10).fill(0),
    close: Array(10).fill(0),
    center: Array(10).fill(0),
    fourth: Array(10).fill(0)
  };
  const akraCounts = {};
  const cityCounts = {};
  let digitOdd = 0;
  let digitEven = 0;
  let firstPrizeOdd = 0;
  let firstPrizeEven = 0;
  draws.forEach((draw) => {
    const numStr = draw.firstPrize || "";
    const city = draw.city || "نامعلوم";
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
      numStr.split("").forEach((char) => {
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
  const mapFreqList = (arr) => {
    const total = arr.reduce((a, b) => a + b, 0) || 1;
    return arr.map((count, val) => ({
      value: val.toString(),
      count,
      percentage: Math.round(count / total * 100)
    }));
  };
  const sortedAkras = Object.entries(akraCounts).map(([akra, count]) => ({
    akra,
    count,
    percentage: totalDraws > 0 ? Math.round(count / totalDraws * 100) : 0
  })).sort((a, b) => b.count - a.count || parseInt(a.akra, 10) - parseInt(b.akra, 10));
  const sortedCities = Object.entries(cityCounts).map(([city, count]) => {
    const cityObj = PK_CITIES_LIST.find((c) => c.nameUrdu === city);
    return {
      city,
      cityEng: cityObj ? cityObj.nameEng : city,
      count,
      percentage: totalDraws > 0 ? Math.round(count / totalDraws * 100) : 0
    };
  }).sort((a, b) => b.count - a.count);
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
    topCity: sortedCities[0] ? sortedCities[0].city : "کراچی",
    topCityCount: sortedCities[0] ? sortedCities[0].count : 0,
    topOpenDigit: sortedOpen[0] ? sortedOpen[0].value : "7",
    topOpenCount: sortedOpen[0] ? sortedOpen[0].count : 0,
    topCloseDigit: sortedClose[0] ? sortedClose[0].value : "8",
    topCloseCount: sortedClose[0] ? sortedClose[0].count : 0,
    digitOddsPercentage: Math.round(digitOdd / totalDigitsCount * 100),
    digitEvensPercentage: Math.round(digitEven / totalDigitsCount * 100),
    firstPrizeOdds: firstPrizeOdd,
    firstPrizeEvens: firstPrizeEven
  };
}
function normalizeDateInput(val) {
  if (!val) return "";
  const trimmed = val.trim();
  const ymdMatch = trimmed.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (ymdMatch) {
    const y = ymdMatch[1];
    const m = ymdMatch[2].padStart(2, "0");
    const d = ymdMatch[3].padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  const dmyMatch = trimmed.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
  if (dmyMatch) {
    const d = dmyMatch[1].padStart(2, "0");
    const m = dmyMatch[2].padStart(2, "0");
    const y = dmyMatch[3];
    return `${y}-${m}-${d}`;
  }
  return trimmed;
}
function formatUrduDatePreview(dStr) {
  if (!dStr) return null;
  const norm = normalizeDateInput(dStr);
  const parts = norm.split("-");
  if (parts.length === 3 && parts[0].length === 4) {
    const monthsUrdu = [
      "جنوری",
      "فروری",
      "مارچ",
      "اپریل",
      "مئی",
      "جون",
      "جولائی",
      "اگست",
      "ستمبر",
      "اکتوبر",
      "نومبر",
      "دسمبر"
    ];
    const y = parts[0];
    const m = parseInt(parts[1], 10);
    const d = parseInt(parts[2], 10);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      return `${d} ${monthsUrdu[m - 1]} ${y}`;
    }
  }
  return null;
}
const AdminDemandsBookingsTab = ({
  users,
  demands,
  bookings,
  demandError,
  demandSuccess,
  cancelError,
  cancelSuccess,
  onApproveDemand,
  onRejectDemand,
  onCancelBookingByAdmin,
  safeGetTime: safeGetTime2,
  safeFormatDate: safeFormatDate2
}) => {
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const [dateFilter, setDateFilter] = reactExports.useState("all");
  const [showArchived, setShowArchived] = reactExports.useState(false);
  const [bookingSearchQuery, setBookingSearchQuery] = reactExports.useState("");
  const [pdfStatus, setPdfStatus] = reactExports.useState(null);
  const availableDates = Array.from(
    new Set(bookings.map((b) => b.drawDate).filter(Boolean))
  );
  const handleApprove = async (id, num) => {
    if (window.confirm(`کیا آپ نمبر #${num} کی ڈیمانڈ منظور کرنا چاہتے ہیں؟`)) {
      await onApproveDemand(id);
    }
  };
  const handleReject = async (id, num) => {
    if (window.confirm(`کیا آپ نمبر #${num} کی ڈیمانڈ مسترد کرنا چاہتے ہیں؟`)) {
      await onRejectDemand(id);
    }
  };
  const handleCancelBookingClick = async (bookingId, number) => {
    if (window.confirm(`کیا آپ واقعی نمبر #${number} کی بکنگ منسوخ کر کے رقم کسٹمر کے والٹ میں واپس منتقل کرنا چاہتے ہیں؟`)) {
      await onCancelBookingByAdmin(bookingId);
    }
  };
  const getFilteredBookings = () => {
    return bookings.filter((b) => {
      const matchesCategory = categoryFilter === "all" || b.category === categoryFilter;
      const matchesDate = dateFilter === "all" || b.drawDate === dateFilter;
      const matchesArchived = showArchived ? true : !b.isArchived;
      const matchesSearch = !bookingSearchQuery || b.number.includes(bookingSearchQuery) || (b.userEmail || "").toLowerCase().includes(bookingSearchQuery.toLowerCase());
      return matchesCategory && matchesDate && matchesArchived && matchesSearch;
    }).sort((a, b) => safeGetTime2(b.timestamp) - safeGetTime2(a.timestamp));
  };
  const handleExportPDF = async (filterType) => {
    const listToExport = getFilteredBookings();
    if (listToExport.length === 0) {
      setPdfStatus({ text: "ایکسپورٹ کے لئے لسٹ میں کوئی بکنگ موجود نہیں ہے۔", isError: true });
      setTimeout(() => setPdfStatus(null), 4e3);
      return;
    }
    const title = filterType === "date" ? `Date_${dateFilter}` : filterType === "draw" ? `Category_${categoryFilter}` : "All_Bookings";
    const res = await generateAdminBookingsPDF(title, listToExport, filterType, dateFilter !== "all" ? dateFilter : categoryFilter);
    if (res.success) {
      setPdfStatus({ text: "ایڈمن پی ڈی ایف رپورٹ کامیابی سے تیار اور ڈاؤن لوڈ کر دی گئی ہے!", isError: false });
      setTimeout(() => setPdfStatus(null), 4e3);
    } else {
      setPdfStatus({ text: res.error || "پی ڈی ایف بنانے میں خرابی پیش آئی۔", isError: true });
      setTimeout(() => setPdfStatus(null), 4e3);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "موصولہ ڈیمانڈز کا پینل (Incoming Demands Approval)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-amber-500" })
      ] }),
      demandError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right", children: [
        "⚠️ ",
        demandError
      ] }),
      demandSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right", children: [
        "✓ ",
        demandSuccess
      ] }),
      demands.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs text-center py-6", children: "کوئی ڈیمانڈ موصول نہیں ہوئی۔" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-right border-collapse text-xs sm:text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-slate-50 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600 text-left", children: "اقدام (Action)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600", children: "حیثیت" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600", children: "میزان رقم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600", children: "فرسٹ/سیکنڈ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600", children: "نمبر (No)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600", children: "کیٹیگری" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600 text-right", children: "کسٹمر تفصیل" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-100", children: demands.map((d) => {
          const customer = users.find((u) => (u.email || "").toLowerCase() === (d.userEmail || "").toLowerCase());
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-50/50 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-left", children: d.status === "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => handleReject(d.id, d.number),
                  className: "bg-red-50 hover:bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 border border-red-200 cursor-pointer text-[10px]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مسترد" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => handleApprove(d.id, d.number),
                  className: "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 border border-emerald-200 cursor-pointer text-[10px]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "منظور" })
                  ]
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 font-sans italic", children: "حل شدہ (Processed)" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3", children: [
              d.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200", children: "زیرِ غور ⏳" }),
              d.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200", children: "منظور شدہ ✓" }),
              d.status === "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full border border-red-200", children: "مسترد ✗" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 font-mono font-semibold text-slate-700", children: [
              "Rs. ",
              (d.firstAmount + d.secondAmount).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 font-mono text-slate-550 text-xs", children: [
              "F: ",
              d.firstAmount,
              " / S: ",
              d.secondAmount
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 font-mono font-bold text-red-600 text-sm", children: d.number }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-slate-600 text-xs font-semibold", children: d.category === "pakistan_bond" ? "پاکستان بانڈ" : "تھائی لاٹری" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold block text-slate-800", children: (customer == null ? void 0 : customer.name) || "نامعلوم" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 font-mono block", children: d.userEmail })
            ] })
          ] }, d.id);
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-4 pb-3 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setCategoryFilter("all"),
              className: `px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${categoryFilter === "all" ? "bg-slate-900 text-amber-400 font-bold" : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"}`,
              children: [
                "تمام بکنگز (",
                bookings.length,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setCategoryFilter("pakistan_bond"),
              className: `px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${categoryFilter === "pakistan_bond" ? "bg-slate-900 text-amber-400 font-bold" : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"}`,
              children: [
                "پاکستان بانڈ (",
                bookings.filter((b) => b.category === "pakistan_bond").length,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setCategoryFilter("thailand_lottery"),
              className: `px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${categoryFilter === "thailand_lottery" ? "bg-slate-900 text-amber-400 font-bold" : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"}`,
              children: [
                "تھائی لینڈ لاٹری (",
                bookings.filter((b) => b.category === "thailand_lottery").length,
                ")"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-slate-800 flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تمام کسٹمرز کی بکنگز کا پینل (Master Booking Control)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-amber-500" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative md:col-span-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "کسٹمر ای میل یا نمبر تلاش کریں...",
              value: bookingSearchQuery,
              onChange: (e) => setBookingSearchQuery(e.target.value),
              className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-2.5 pl-4 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-slate-400 absolute right-3 top-3" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-slate-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: dateFilter,
              onChange: (e) => setDateFilter(e.target.value),
              className: "w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans text-right",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "تمام تاریخیں (All Dates)" }),
                availableDates.map((date) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: date, children: date }, date))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-end gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-slate-600 font-medium flex items-center gap-1.5 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "آرکائیو شدہ بکنگز دکھائیں" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: showArchived,
              onChange: (e) => setShowArchived(e.target.checked),
              className: "rounded border-slate-300 text-amber-600 focus:ring-amber-500"
            }
          )
        ] }) })
      ] }),
      pdfStatus && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-3 rounded-2xl text-xs text-right border ${pdfStatus.isError ? "bg-red-50 border-red-100 text-red-700" : "bg-emerald-50 border-emerald-100 text-emerald-800"}`, children: [
        pdfStatus.isError ? "⚠️ " : "✓ ",
        " ",
        pdfStatus.text
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-slate-600 ml-2", children: "پی ڈی ایف دیکھیں/ڈاؤن لوڈ کریں (PDF Reports):" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => handleExportPDF("draw"),
            className: "bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "PDF برائے ڈرا / کیٹیگری" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => handleExportPDF("date"),
            className: "bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "PDF برائے تاریخ (",
                dateFilter !== "all" ? dateFilter : "منتخب تاریخ",
                ")"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => handleExportPDF("all"),
            className: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تمام فلٹر شدہ بکنگز PDF" })
            ]
          }
        )
      ] }),
      cancelError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right", children: [
        "⚠️ ",
        cancelError
      ] }),
      cancelSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right font-sans", children: [
        "✓ ",
        cancelSuccess
      ] }),
      (() => {
        const filteredBookings = getFilteredBookings();
        if (filteredBookings.length === 0) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs text-center py-6 font-sans", children: "کوئی بکنگ ریکارڈ نہیں ملا۔" });
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-right border-collapse text-xs sm:text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-slate-50 border-b border-slate-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600 text-left", children: "منسوخ کریں (Cancel)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600 font-mono text-[10px]", children: "ٹائم اسٹیمپ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600", children: "کل لاگت" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600", children: "سیکنڈ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600", children: "فرسٹ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600", children: "بک شدہ نمبر" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600", children: "کیٹیگری" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600 text-right", children: "کسٹمر تفصیل" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-100", children: filteredBookings.map((b) => {
            const customer = users.find((u) => (u.email || "").toLowerCase() === (b.userEmail || "").toLowerCase());
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-50/50 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => handleCancelBookingClick(b.id, b.number),
                  className: "bg-red-50 hover:bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 border border-red-200 cursor-pointer text-[10px]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "منسوخ کریں" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-slate-400 font-mono text-[10px]", children: safeFormatDate2(b.timestamp, "en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                month: "short",
                day: "numeric"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 font-mono font-semibold text-slate-700", children: [
                "Rs. ",
                (b.firstAmount + b.secondAmount).toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 font-mono text-slate-550 text-xs", children: [
                "Rs. ",
                b.secondAmount.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 font-mono text-slate-550 text-xs", children: [
                "Rs. ",
                b.firstAmount.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 font-mono font-bold text-red-600 text-sm", children: b.number }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 text-slate-600 text-xs font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: b.category === "pakistan_bond" ? "پاکستان بانڈ" : "تھائی لاٹری" }),
                b.category === "pakistan_bond" && (b.bondValue || b.drawNumber || b.drawDate) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-amber-700 font-mono mt-0.5", children: [
                  b.bondValue && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    b.bondValue,
                    " "
                  ] }),
                  b.drawNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "| ڈرا #",
                    b.drawNumber,
                    " "
                  ] }),
                  b.drawDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "| ",
                    b.drawDate
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold block text-slate-800", children: (customer == null ? void 0 : customer.name) || "نامعلوم" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 font-mono block", children: b.userEmail })
              ] })
            ] }, b.id);
          }) })
        ] }) });
      })()
    ] })
  ] });
};
const AdminUsersFinanceTab = ({
  users,
  dealerBookings,
  whatsappError,
  whatsappSuccess,
  whatsappVal,
  setWhatsappVal,
  handleWhatsappSubmit,
  passwordError,
  passwordSuccess,
  adminCurrentPasswordInput,
  setAdminCurrentPasswordInput,
  adminEmailInput,
  adminPasswordInput,
  setAdminPasswordInput,
  adminConfirmPasswordInput,
  setAdminConfirmPasswordInput,
  handlePasswordSubmit,
  userPasswordError,
  userPasswordSuccess,
  userSearchQuery,
  setUserSearchQuery,
  foundUser,
  setFoundUser,
  handleSearchUser,
  userNewPassword,
  setUserNewPassword,
  userConfirmPassword,
  setUserConfirmPassword,
  handleUserPasswordReset,
  onDeleteUserDatabaseRecord
}) => {
  const [migrating, setMigrating] = reactExports.useState(false);
  const [migrationReport, setMigrationReport] = reactExports.useState(null);
  const [migrationError, setMigrationError] = reactExports.useState("");
  const [showJsonInput, setShowJsonInput] = reactExports.useState(false);
  const [jsonText, setJsonText] = reactExports.useState("");
  const [confirmDeleteUser, setConfirmDeleteUser] = reactExports.useState(null);
  const handleRunMigration = async () => {
    setMigrating(true);
    setMigrationError("");
    try {
      const report = await migrateAllFirestoreUsersToRtdb();
      setMigrationReport(report);
      if (!report.success && report.error) {
        setMigrationError(report.error);
      }
    } catch (err) {
      setMigrationError((err == null ? void 0 : err.message) || "Migration failed");
    } finally {
      setMigrating(false);
    }
  };
  const handleJsonImport = async () => {
    if (!jsonText.trim()) return;
    setMigrating(true);
    setMigrationError("");
    try {
      const parsed = JSON.parse(jsonText.trim());
      const usersList = Array.isArray(parsed) ? parsed : parsed.users ? parsed.users : Object.values(parsed);
      const report = await migrateUsersFromJson(usersList);
      setMigrationReport(report);
      if (!report.success && report.error) {
        setMigrationError(report.error);
      }
    } catch (e) {
      setMigrationError("غلط JSON فارمیٹ: " + ((e == null ? void 0 : e.message) || "Invalid JSON"));
    } finally {
      setMigrating(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "firestore-rtdb-migration-card", className: "bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-700/60 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setShowJsonInput(!showJsonInput),
              className: "text-xs text-slate-400 hover:text-amber-400 underline cursor-pointer transition-colors",
              children: showJsonInput ? "بیک اپ پینل چھپائیں (Hide)" : "JSON بیک اپ امپورٹ (JSON Import)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full text-xs font-mono font-bold", children: [
            "RTDB Users: ",
            users.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-amber-400 flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فائر اسٹور سے RTDB یوزرز مائیگریشن (Firestore to RTDB Migration)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-5 h-5 text-amber-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "صرف Firestore سے تمام user profiles کو بغیر کسی تبدیلی یا ڈیٹا ضائع کیے RTDB میں محفوظ طور پر منتقل کریں" })
        ] }) })
      ] }),
      migrationError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-500/20 border border-red-500/50 rounded-2xl p-4 text-red-200 text-xs mb-4 flex items-center justify-end gap-2 text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: migrationError }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-red-400 shrink-0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] text-slate-400 mb-1", children: "موجودہ RTDB یوزرز (RTDB Users)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xl font-bold text-amber-400", children: users.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] text-slate-400 mb-1", children: "گمشدہ UIDs (Missing UIDs)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xl font-bold text-emerald-400", children: migrationReport ? migrationReport.missingUids : 0 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] text-slate-400 mb-1", children: "ڈپلیکیٹ UIDs (Duplicate UIDs)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xl font-bold text-emerald-400", children: migrationReport ? migrationReport.duplicateUids : 0 })
        ] })
      ] }),
      showJsonInput && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/90 p-4 rounded-2xl border border-amber-500/20 mb-6 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-300 text-right", children: "فائر اسٹور یوزرز JSON بیک اپ ڈیٹا یہاں پیسٹ کریں (Paste Firestore Users JSON Export)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: jsonText,
            onChange: (e) => setJsonText(e.target.value),
            placeholder: '[{"uid": "...", "email": "...", "name": "...", "role": "customer", "balance": 0}]',
            rows: 4,
            className: "w-full text-xs font-mono bg-slate-900 text-slate-200 p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleJsonImport,
            disabled: migrating || !jsonText.trim(),
            className: "w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "JSON ڈیٹا کو RTDB میں منتقل کریں (Import JSON to RTDB)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-3 items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          id: "run-firestore-migration-btn",
          onClick: handleRunMigration,
          disabled: migrating,
          className: "w-full sm:w-auto bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-slate-950 font-bold py-3 px-6 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20",
          children: migrating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ڈیٹا منتقل کیا جا رہا ہے... (Migrating...)" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فائر اسٹور سے RTDB میں تمام یوزرز منتقل کریں (Migrate All Users Now)" })
          ] })
        }
      ) }),
      migrationReport && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-5 border-t border-slate-700/80 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-400 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
            "مائیگریشن مکمل ہو گئی (Migration Finished)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-300", children: [
            "فائر اسٹور ریکارڈز: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-amber-400", children: migrationReport.firestoreCount }),
            " | RTDB کل یوزرز: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-amber-400", children: migrationReport.rtdbCount })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/60 p-2.5 rounded-xl border border-slate-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 block text-[10px]", children: "نئے منتقل شدہ (New)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-amber-400", children: migrationReport.migratedCount })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/60 p-2.5 rounded-xl border border-slate-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 block text-[10px]", children: "محفوظ طور پر ضم شدہ (Merged)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-blue-400", children: migrationReport.mergedCount })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/60 p-2.5 rounded-xl border border-slate-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 block text-[10px]", children: "گمشدہ UIDs (Missing)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-emerald-400", children: migrationReport.missingUids })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/60 p-2.5 rounded-xl border border-slate-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 block text-[10px]", children: "فائر اسٹور اصل ڈیٹا (Original Data)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-emerald-400", children: "محفوظ (Preserved)" })
          ] })
        ] }),
        Object.keys(migrationReport.roleVerification).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/60 p-3 rounded-xl border border-slate-700 text-xs text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 font-semibold block mb-1", children: "رولز کی تصدیق (Role Verification):" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-end", children: Object.entries(migrationReport.roleVerification).map(([r, c]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-slate-700/80 px-2 py-0.5 rounded text-amber-300 font-mono text-[11px]", children: [
            r,
            ": ",
            c
          ] }, r)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-slate-800 pb-3 border-b border-slate-100 mb-5 flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "رجسٹرڈ کسٹمرز کی لسٹ اور والٹ بیلنس (Registered Customers)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 bg-emerald-500 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-60 overflow-y-auto space-y-2 pr-1", children: users.map((u) => {
        const userEmail = (u.email || "").toLowerCase().trim();
        const userDealerBookings = (dealerBookings || []).filter(
          (b) => b.dealerId && u.uid && b.dealerId === u.uid || (b.dealerEmail || "").toLowerCase().trim() === userEmail
        );
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-slate-50 p-3 rounded-2xl text-xs border border-slate-100",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-xl", children: [
                  "Rs. ",
                  (u.balance ?? 0).toLocaleString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold block text-slate-800", children: [
                    u.name,
                    " ",
                    u.isAdmin && "(ایڈمن)",
                    " ",
                    u.role === "dealer" && "(ڈیلر)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-400 font-mono", children: [
                    u.email || "ای میل کے بغیر",
                    " ",
                    u.phone ? `| ${u.phone}` : ""
                  ] })
                ] })
              ] }),
              u.role === "dealer" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-slate-200 text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-slate-700 mb-2", children: [
                  "ڈیلر کی بکنگز (",
                  userDealerBookings.length,
                  ")"
                ] }),
                userDealerBookings.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: userDealerBookings.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "bg-white rounded-xl px-3 py-2 border border-slate-100",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-indigo-700", children: [
                          "#",
                          b.number
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-500", children: [
                          "فرسٹ: Rs. ",
                          (b.firstAmount || 0).toLocaleString(),
                          " | ",
                          "سیکنڈ: Rs. ",
                          (b.secondAmount || 0).toLocaleString()
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-slate-400 mt-1", children: [
                        b.category === "pakistan_bond" ? "پاکستان پرائز بانڈ" : b.category === "thailand_lottery" ? "تھائی لینڈ لاٹری" : b.category,
                        b.drawNumber ? ` | ڈرا #${b.drawNumber}` : "",
                        b.drawDate ? ` | ${b.drawDate}` : ""
                      ] })
                    ]
                  },
                  b.id
                )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-400", children: "ابھی کوئی ڈیلر بکنگ موجود نہیں" })
              ] })
            ]
          },
          u.email || u.uid
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "واٹس ایپ ہیلپ لائن اور رابطہ سیٹنگز (WhatsApp Help Settings)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5 text-emerald-600" })
      ] }),
      whatsappError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right", children: [
        "⚠️ ",
        whatsappError
      ] }),
      whatsappSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right", children: [
        "✓ ",
        whatsappSuccess
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleWhatsappSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 leading-relaxed text-right", children: "یہاں پر وہ واٹس ایپ نمبر درج کریں جس پر کسٹمرز کسی مدد یا والٹ بیلنس ریچارج کے لیے رابطہ کر سکیں۔ نمبر میں کنٹری کوڈ (جیسے پاکستان کے لیے 92) لازمی لکھیں بغیر پلس (+) یا صفر (0) کے، جیسے 923001234567۔" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              className: "bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-6 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md sm:w-48 whitespace-nowrap",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "محفوظ کریں (Save Phone)" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "923001234567",
              value: whatsappVal,
              onChange: (e) => setWhatsappVal(e.target.value),
              className: "w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono",
              required: true
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ایڈمن پاس ورڈ اور سیکیورٹی سیٹنگز (Admin Password Settings)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-blue-600" })
      ] }),
      passwordError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right", children: [
        "⚠️ ",
        passwordError
      ] }),
      passwordSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right", children: [
        "✓ ",
        passwordSuccess
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePasswordSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 leading-relaxed text-right", children: "یہاں سے آپ ایڈمن کا لاگ ان پاس ورڈ تبدیل کر سکتے ہیں۔ پاس ورڈ تبدیل ہونے کے بعد، اگلی بار ایڈمن کو نئے پاس ورڈ کے ساتھ ہی لاگ ان کرنا ہوگا۔" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", children: "موجودہ پاس ورڈ (Current Password) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "password",
                placeholder: "موجودہ پاس ورڈ درج کریں",
                value: adminCurrentPasswordInput,
                onChange: (e) => setAdminCurrentPasswordInput(e.target.value),
                className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", children: "ایڈمن ای میل (Admin Email)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                value: adminEmailInput,
                readOnly: true,
                disabled: true,
                className: "w-full text-left bg-slate-100 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-mono text-slate-500 cursor-not-allowed"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", children: "نیا مضبوط پاس ورڈ (New Password) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "password",
                placeholder: "نیا پاس ورڈ درج کریں",
                value: adminPasswordInput,
                onChange: (e) => setAdminPasswordInput(e.target.value),
                className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", children: "نیا پاس ورڈ دوبارہ درج کریں (Confirm Password) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "password",
                placeholder: "نیا پاس ورڈ دوبارہ درج کریں",
                value: adminConfirmPasswordInput,
                onChange: (e) => setAdminConfirmPasswordInput(e.target.value),
                className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            className: "w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پاس ورڈ تبدیل کریں (Update Password)" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "module-user-password-management", className: "bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "صارفین کے پاس ورڈ کا انتظام (User Password Management)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-5 h-5 text-indigo-600" })
      ] }),
      userPasswordError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "admin-user-password-reset-error", className: "p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right font-sans", children: [
        "⚠️ ",
        userPasswordError
      ] }),
      userPasswordSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "admin-user-password-reset-success", className: "p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right font-sans", children: [
        "✓ ",
        userPasswordSuccess
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 leading-relaxed text-right", children: "یہاں سے آپ کسی بھی کسٹمر کا پاس ورڈ براہِ راست تبدیل کر سکتے ہیں۔ پہلے کسٹمر کا ای میل یا موبائل نمبر درج کر کے تلاش کریں۔" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              id: "admin-search-user-btn",
              type: "button",
              onClick: handleSearchUser,
              className: "bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-6 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md sm:w-48 whitespace-nowrap",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تلاش کریں (Search)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "admin-search-user-query",
              type: "text",
              placeholder: "ای میل یا موبائل نمبر درج کریں",
              value: userSearchQuery,
              onChange: (e) => {
                setUserSearchQuery(e.target.value);
                setFoundUser(null);
              },
              className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            }
          ) })
        ] }),
        foundUser && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "searched-user-details", className: "bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-xs font-bold text-slate-700 border-b border-slate-200 pb-2", children: "صارف کی تفصیلات (User Details)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans text-slate-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-3 rounded-xl border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-slate-400 mb-1 font-semibold text-[10px]", children: "کردار (Role)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-800", children: foundUser.role || (foundUser.isAdmin ? "admin" : "customer") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-3 rounded-xl border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-slate-400 mb-1 font-semibold text-[10px]", children: "موبائل نمبر (Mobile)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-slate-800", children: foundUser.phone || "N/A" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-3 rounded-xl border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-slate-400 mb-1 font-semibold text-[10px]", children: "ای میل (Email)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-slate-800 break-all", children: foundUser.email })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-3 rounded-xl border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-slate-400 mb-1 font-semibold text-[10px]", children: "نام (Name)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-800", children: foundUser.name })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "admin-user-password-reset-form", onSubmit: handleUserPasswordReset, className: "space-y-4 pt-2 border-t border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", children: "پاس ورڈ کی تصدیق کریں (Confirm New Password) *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "admin-confirm-reset-user-password",
                    type: "password",
                    placeholder: "دوبارہ پاس ورڈ درج کریں",
                    value: userConfirmPassword,
                    onChange: (e) => setUserConfirmPassword(e.target.value),
                    className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", children: "نیا پاس ورڈ - کم از کم 8 ہندسے (New Password - Min 8 chars) *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "admin-reset-user-password",
                    type: "password",
                    placeholder: "نیا پاس ورڈ درج کریں",
                    value: userNewPassword,
                    onChange: (e) => setUserNewPassword(e.target.value),
                    className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans",
                    required: true
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                id: "admin-save-user-password-btn",
                type: "submit",
                className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پاس ورڈ محفوظ کریں (Save Password)" })
              }
            )
          ] }),
          onDeleteUserDatabaseRecord && !isSuperOwner(foundUser.email) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 text-right", children: "نوٹ: یہ عمل صارف کی ڈیٹا بیس پروفائل اور تمام رسائیاں منسوخ کر دے گا۔" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setConfirmDeleteUser(foundUser),
                className: "w-full sm:w-auto px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "صارف کا ڈیٹا بیس ریکارڈ حذف کریں (Delete DB Profile)" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    confirmDeleteUser && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white max-w-lg w-full rounded-3xl border border-red-200 shadow-2xl p-6 sm:p-8 text-right font-sans animate-in fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setConfirmDeleteUser(null),
            className: "text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-bold text-red-600", children: "صارف کا ڈیٹا بیس ریکارڈ حذف کرنے کی تصدیق" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-red-600 shrink-0" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6 text-xs text-slate-600 leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50/70 border border-red-200 p-3.5 rounded-2xl text-red-900", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold mb-1", children: [
            "صارف: ",
            confirmDeleteUser.name,
            " (",
            confirmDeleteUser.email,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-red-800", children: [
            "UID: ",
            confirmDeleteUser.uid || "N/A",
            " | رول: ",
            confirmDeleteUser.role || "customer"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-700", children: "کیا آپ واقعی اس صارف کا ریکارڈ Realtime Database سے حذف کرنا چاہتے ہیں؟ اس سے صارف کی پروفائل، معلومات اور والٹ لنکیج فوری منسوخ ہو جائے گی۔" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 text-[11px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "اہم وضاحت:" }),
          " کلائنٹ سیکیورٹی ضوابط کی وجہ سے فائر بیس آتھ کا ریکارڈ ایڈمن فائر بیس کنسول سے مانیٹر یا ڈیلیٹ کر سکتا ہے۔ صارف کی سسٹم تک رسائی فوری بند ہو جائے گی۔"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 pt-3 border-t border-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setConfirmDeleteUser(null),
            className: "px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer",
            children: "منسوخ کریں (Cancel)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              const email = confirmDeleteUser.email;
              setConfirmDeleteUser(null);
              if (onDeleteUserDatabaseRecord) {
                onDeleteUserDatabaseRecord(email);
              }
            },
            className: "px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md hover:-translate-y-0.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ریکارڈ مستقل حذف کریں (Confirm Delete)" })
            ]
          }
        )
      ] })
    ] }) })
  ] });
};
const AdminLimitsDeadlinesTab = ({
  limits,
  deadlines,
  hardFavoriteNumbers = [],
  onAddHardFavorite,
  onRemoveHardFavorite,
  limitError,
  limitSuccess,
  limitCategory,
  setLimitCategory,
  limitNumber,
  setLimitNumber,
  limitAmount = "",
  setLimitAmount,
  firstPrizeLimit = "",
  setFirstPrizeLimit,
  secondPrizeLimit = "",
  setSecondPrizeLimit,
  handleLimitSubmit,
  onDeleteLimit,
  deadlineError,
  deadlineSuccess,
  editingDrawId,
  resetDeadlineForm,
  deadlineCategory,
  setDeadlineCategory,
  deadlineTitle,
  setDeadlineTitle,
  deadlineDateTime,
  setDeadlineDateTime,
  deadlineStatus,
  setDeadlineStatus,
  nextPrizeBondValue,
  setNextPrizeBondValue,
  nextDrawCity,
  setNextDrawCity,
  nextDrawNumber,
  setNextDrawNumber,
  nextDrawDate,
  setNextDrawDate,
  handleDeadlineSubmit,
  onSetDeadline,
  onDeleteDeadline,
  setEditingDrawId,
  safeGetTime: safeGetTime2,
  safeFormatDate: safeFormatDate2
}) => {
  const [hfCategory, setHfCategory] = reactExports.useState("all");
  const [hfNumber, setHfNumber] = reactExports.useState("");
  const [hfNote, setHfNote] = reactExports.useState("");
  const [hfSearch, setHfSearch] = reactExports.useState("");
  const [hfError, setHfError] = reactExports.useState("");
  const [hfSuccess, setHfSuccess] = reactExports.useState("");
  const [hfSubmitting, setHfSubmitting] = reactExports.useState(false);
  const [limitSearchQuery, setLimitSearchQuery] = reactExports.useState("");
  const handleHfSubmit = async (e) => {
    e.preventDefault();
    setHfError("");
    setHfSuccess("");
    const raw = hfNumber.trim();
    if (!raw) {
      setHfError("براہ کرم کوئی نمبر درج کریں۔");
      return;
    }
    if (!onAddHardFavorite) {
      setHfError("ہارڈ فیورٹ سروس دستیاب نہیں ہے۔");
      return;
    }
    setHfSubmitting(true);
    try {
      const res = await onAddHardFavorite(hfCategory, raw, hfNote);
      if (res && res.success) {
        setHfSuccess(`نمبر ${raw} کامیابی سے ہارڈ فیورٹ / بلاک لسٹ میں شامل کر دیا گیا۔`);
        setHfNumber("");
        setHfNote("");
      } else {
        setHfError((res == null ? void 0 : res.error) || "ہارڈ فیورٹ نمبر شامل کرنے میں خرابی پیش آئی۔");
      }
    } catch (err) {
      setHfError(err.message || "غیر متوقع خرابی پیش آئی۔");
    } finally {
      setHfSubmitting(false);
    }
  };
  const handleHfRemove = async (id, num) => {
    if (!window.confirm(`کیا آپ واقعی نمبر #${num} کو ہارڈ فیورٹ / بلاک لسٹ سے ہٹانا چاہتے ہیں؟ اس کے بعد یہ نمبر دوبارہ بکنگ کے لیے دستیاب ہو جائے گا۔`)) {
      return;
    }
    setHfError("");
    setHfSuccess("");
    if (!onRemoveHardFavorite) return;
    try {
      const res = await onRemoveHardFavorite(id);
      if (res && res.success) {
        setHfSuccess(`نمبر #${num} کامیابی سے ان بلاک کر دیا گیا ہے۔`);
      } else {
        setHfError((res == null ? void 0 : res.error) || "نمبر ہٹانے میں خرابی پیش آئی۔");
      }
    } catch (err) {
      setHfError(err.message || "غیر متوقع خرابی پیش آئی۔");
    }
  };
  const filteredHardFavorites = hardFavoriteNumbers.filter((hf) => {
    if (!hfSearch.trim()) return true;
    const q = hfSearch.trim().toLowerCase();
    return hf.number.toLowerCase().includes(q) || hf.note && hf.note.toLowerCase().includes(q) || hf.createdBy && hf.createdBy.toLowerCase().includes(q) || hf.category.toLowerCase().includes(q);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md flex flex-col justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-100 mb-5 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-full", children: [
          "کل لمٹس: ",
          limits.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-slate-800 flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "بکنگ نمبر لمٹ سسٹم (Prize Amount Limits)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 bg-amber-500 rounded-full" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 bg-amber-50/60 border border-amber-200/60 rounded-2xl p-3 text-xs text-amber-950 flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-amber-600 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-0.5", children: "فرسٹ اور سیکنڈ پرائز کی لمٹ الگ الگ مقرر کریں" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-amber-800", children: [
            "دونوں رقمیں مکمل طور پر ایک دوسرے سے الگ ہیں۔ رقم کی فیلڈ میں ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "0" }),
            " لکھنے کا مطلب لامحدود (Unlimited / Open) ہے۔ ایڈمن جب چاہے دونوں رقمیں تبدیل کر سکتا ہے۔"
          ] })
        ] })
      ] }),
      limitError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs leading-relaxed flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0 text-red-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: limitError })
      ] }),
      limitSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs leading-relaxed flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 shrink-0 text-emerald-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: limitSuccess })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLimitSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", children: "کیٹیگری منتخب کریں (Choose Draw Type) *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setLimitCategory("pakistan_bond"),
                className: `py-2 px-3 rounded-xl border text-center transition-all ${limitCategory === "pakistan_bond" ? "bg-slate-900 text-amber-400 border-slate-900 font-bold" : "bg-slate-50 text-slate-600 border-slate-200"}`,
                children: "پاکستان بانڈ"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setLimitCategory("thailand_lottery"),
                className: `py-2 px-3 rounded-xl border text-center transition-all ${limitCategory === "thailand_lottery" ? "bg-slate-900 text-amber-400 border-slate-900 font-bold" : "bg-slate-50 text-slate-600 border-slate-200"}`,
                children: "تھائی لینڈ لاٹری"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", children: "مخصوص نمبر لکھیں (Target Number) *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "مثال: 123456 یا 45",
              value: limitNumber,
              onChange: (e) => setLimitNumber(e.target.value),
              className: "w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50/40 p-3.5 rounded-2xl border border-amber-100/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-amber-950 text-xs font-bold mb-1 text-right flex items-center justify-end gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "First Prize Amount Limit *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-amber-200/80 text-amber-900 px-1.5 py-0.2 rounded text-[10px]", children: "1st" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500 text-right mb-1.5", children: "فرسٹ پرائز رقم کی زیادہ سے زیادہ حد (0 = لامحدود)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-3 text-xs font-mono text-slate-400", children: "Rs." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  min: "0",
                  placeholder: "مثلاً: 100000",
                  value: firstPrizeLimit,
                  onChange: (e) => setFirstPrizeLimit == null ? void 0 : setFirstPrizeLimit(e.target.value),
                  className: "w-full text-left pl-10 bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono font-bold text-slate-900"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-indigo-50/40 p-3.5 rounded-2xl border border-indigo-100/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-indigo-950 text-xs font-bold mb-1 text-right flex items-center justify-end gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Second Prize Amount Limit *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-indigo-200/80 text-indigo-900 px-1.5 py-0.2 rounded text-[10px]", children: "2nd" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-500 text-right mb-1.5", children: "سیکنڈ پرائز رقم کی زیادہ سے زیادہ حد (0 = لامحدود)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-3 text-xs font-mono text-slate-400", children: "Rs." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  min: "0",
                  placeholder: "مثلاً: 50000",
                  value: secondPrizeLimit,
                  onChange: (e) => setSecondPrizeLimit == null ? void 0 : setSecondPrizeLimit(e.target.value),
                  className: "w-full text-left pl-10 bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-bold text-slate-900"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              className: "flex-1 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 text-amber-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "لمٹ محفوظ کریں (Save Prize Limits)" })
              ]
            }
          ),
          (limitNumber || firstPrizeLimit || secondPrizeLimit) && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setLimitNumber("");
                setFirstPrizeLimit == null ? void 0 : setFirstPrizeLimit("");
                setSecondPrizeLimit == null ? void 0 : setSecondPrizeLimit("");
                setLimitAmount == null ? void 0 : setLimitAmount("");
              },
              className: "px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl text-xs font-medium transition-all",
              title: "فارم صاف کریں",
              children: "ری سیٹ"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-5 border-t border-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-48", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3.5 h-3.5 absolute right-2.5 top-2.5 text-slate-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "نمبر تلاش کریں...",
                value: limitSearchQuery,
                onChange: (e) => setLimitSearchQuery(e.target.value),
                className: "w-full text-right bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-3 pr-8 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "text-xs font-bold text-slate-700 text-right", children: [
            "موجودہ سیٹ شدہ نمبر لمٹس کی لسٹ (",
            limits.length,
            ")"
          ] })
        ] }),
        limits.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 text-center py-3 bg-slate-50 rounded-2xl", children: "کوئی فعال نمبر لمٹ نہیں ہے۔" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-64 overflow-y-auto space-y-2 pr-1", children: limits.filter((limit) => {
          if (!limitSearchQuery.trim()) return true;
          const q = limitSearchQuery.trim().toLowerCase();
          return limit.number.includes(q) || limit.category.toLowerCase().includes(q);
        }).map((limit) => {
          const categoryMap = {
            pakistan_bond: "پاکستان پرائز بانڈ",
            thailand_lottery: "تھائی لینڈ لاٹری"
          };
          const firstLimit = typeof limit.firstPrizeAmountLimit === "number" ? limit.firstPrizeAmountLimit : limit.maxAmount;
          const secondLimit = typeof limit.secondPrizeAmountLimit === "number" ? limit.secondPrizeAmountLimit : limit.maxAmount;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl text-xs transition-all border border-slate-200/80 shadow-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setLimitCategory(limit.category);
                    setLimitNumber(limit.number);
                    setFirstPrizeLimit == null ? void 0 : setFirstPrizeLimit(String(firstLimit));
                    setSecondPrizeLimit == null ? void 0 : setSecondPrizeLimit(String(secondLimit));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  },
                  className: "p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-100/60 rounded-xl transition-all cursor-pointer",
                  title: "ترمیم کریں (Edit)",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: async () => {
                    if (window.confirm(`کیا آپ واقعی نمبر #${limit.number} کی لمٹ ختم کرنا چاہتے ہیں؟`)) {
                      await onDeleteLimit(limit.id);
                    }
                  },
                  className: "p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all cursor-pointer",
                  title: "حذف کریں (Delete)",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash, { className: "w-3.5 h-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-slate-800 flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-500 font-normal", children: categoryMap[limit.category] || limit.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-amber-100 text-amber-900 border border-amber-200/60 px-2.5 py-0.5 rounded-lg font-mono font-bold text-xs", children: [
                  "#",
                  limit.number
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2 text-[11px] font-mono", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-md", children: [
                  "1st Prize: ",
                  firstLimit > 0 ? `Rs. ${firstLimit.toLocaleString()}` : "لامحدود (Open)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-indigo-50 text-indigo-900 border border-indigo-200/60 px-2 py-0.5 rounded-md", children: [
                  "2nd Prize: ",
                  secondLimit > 0 ? `Rs. ${secondLimit.toLocaleString()}` : "لامحدود (Open)"
                ] })
              ] })
            ] })
          ] }, limit.id);
        }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-md flex flex-col justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-rose-100 mb-4 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-3.5 h-3.5 text-rose-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مستقل ممنوعہ / بلاکڈ نمبرز" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full", children: [
            "کل تعداد: ",
            hardFavoriteNumbers.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-slate-800 flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ہارڈ فیورٹ نمبرز (Hard Favorite Numbers)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-600 text-right mb-5 leading-relaxed bg-rose-50/40 p-4 rounded-2xl border border-rose-100 flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-rose-800 flex items-center justify-end gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ایڈمن کے لیے اہم نوٹ:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-4 h-4 text-rose-600" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "جس نمبر کو آپ یہاں ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "ہارڈ فیورٹ" }),
          " کے طور پر شامل کریں گے، اس پر کوئی بھی کسٹمر یا ڈیلر نئی بکنگ نہیں کرا سکے گا اور بکنگ فوراً مسترد ہو جائے گی۔"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-slate-500 mt-1", children: [
          "🔒 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "مکمل پرائیویسی:" }),
          " یہ لسٹ صرف ایڈمن پینل میں نظر آتی ہے۔ عام صارفین اور ڈیلرز کو نہ تو یہ لسٹ نظر آتی ہے اور نہ ہی انہیں یہ بتایا جاتا ہے کہ یہ نمبر ایڈمن نے بلاک کیا ہے۔"
        ] })
      ] }),
      hfError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-2xl text-xs text-right font-medium mb-4 flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: hfError }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0 text-rose-600" })
      ] }),
      hfSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-2xl text-xs text-right font-medium mb-4 flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: hfSuccess }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 shrink-0 text-emerald-600" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleHfSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-700 mb-1 text-right", children: "کیٹیگری منتخب کریں" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: hfCategory,
                onChange: (e) => setHfCategory(e.target.value),
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-xs text-right font-medium focus:ring-2 focus:ring-rose-400 focus:outline-none",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "تمام کیٹیگریز (پاکستان بانڈ اور تھائی دونوں)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pakistan_bond", children: "صرف پاکستان پرائز بانڈ" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "thailand_lottery", children: "صرف تھائی لینڈ لاٹری" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold text-slate-700 mb-1 text-right", children: [
              "نمبر درج کریں ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: hfNumber,
                onChange: (e) => setHfNumber(e.target.value),
                placeholder: "مثلاً: 05 یا 786 یا 1234",
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-xs text-right font-mono font-bold tracking-wider focus:ring-2 focus:ring-rose-400 focus:outline-none",
                required: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block text-right mt-1", children: "نوٹ: زیرو محفوظ رہے گا (مثلاً 05 اور 5 الگ ہوں گے)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-700 mb-1 text-right", children: "ریمارکس / وجہ (اختیاری)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: hfNote,
                onChange: (e) => setHfNote(e.target.value),
                placeholder: "مثلاً: خصوصی ہارڈ کوٹہ بلاک",
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-xs text-right focus:ring-2 focus:ring-rose-400 focus:outline-none"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "submit",
            disabled: hfSubmitting,
            className: "w-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: hfSubmitting ? "شامل کیا جا رہا ہے..." : "ہارڈ فیورٹ میں شامل کریں (مکمل بلاک کریں)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-5 border-t border-rose-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3", children: [
          hardFavoriteNumbers.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-64", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: hfSearch,
                onChange: (e) => setHfSearch(e.target.value),
                placeholder: "نمبر یا نوٹ تلاش کریں...",
                className: "w-full bg-slate-50 border border-slate-200 rounded-xl pr-8 pl-3 py-1.5 text-xs text-right focus:outline-none focus:ring-1 focus:ring-rose-400 font-sans"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "text-xs font-bold text-slate-700 text-right w-full sm:w-auto", children: [
            "موجودہ ہارڈ فیورٹ / بلاکڈ نمبرز کی لسٹ (",
            hardFavoriteNumbers.length,
            ")"
          ] })
        ] }),
        hardFavoriteNumbers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 text-center py-4 bg-slate-50 rounded-2xl border border-slate-100", children: "کوئی ہارڈ فیورٹ / بلاکڈ نمبر موجود نہیں ہے۔ تمام نمبرز معمول کے مطابق کھلے ہیں۔" }) : filteredHardFavorites.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 text-center py-4 bg-slate-50 rounded-2xl border border-slate-100", children: "تلاش کے مطابق کوئی نمبر نہیں ملا۔" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-72 overflow-y-auto space-y-2 pr-1", children: filteredHardFavorites.map((hf) => {
          const catLabel = hf.category === "all" ? "تمام کیٹیگریز" : hf.category === "pakistan_bond" ? "پاکستان پرائز بانڈ" : "تھائی لینڈ لاٹری";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex justify-between items-center bg-rose-50/30 hover:bg-rose-50/70 p-3 rounded-2xl text-xs transition-all border border-rose-100",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => handleHfRemove(hf.id, hf.number),
                    className: "px-3 py-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-100 rounded-xl transition-all cursor-pointer flex items-center gap-1 font-bold text-[11px] border border-rose-200",
                    title: "ان بلاک کریں / لسٹ سے ہٹائیں",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ان بلاک کریں" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-slate-800 flex items-center justify-end gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-rose-600 text-white px-2.5 py-0.5 rounded-lg font-mono font-bold text-sm tracking-widest shadow-xs", children: [
                      "#",
                      hf.number
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-700 font-semibold", children: catLabel })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2 mt-1 text-[11px] text-slate-500", children: [
                    hf.note && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200", children: hf.note }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-slate-400", children: safeFormatDate2(hf.createdAt) })
                  ] })
                ] })
              ]
            },
            hf.id
          );
        }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-slate-100", children: [
        editingDrawId ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: resetDeadlineForm,
            className: "bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-2 rounded-2xl text-xs flex items-center gap-1.5 cursor-pointer transition-all",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فارم ریسیٹ کریں / نیا ڈرا بنائیں (Reset Form / Create New Draw)" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: resetDeadlineForm,
            className: "bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-2xl text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نیا ڈرا شامل کریں (Add New Draw)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-slate-800 flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ڈرا کی بکنگ کا آخری وقت اور تاریخ (Booking Deadlines)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-red-500" })
          ] }),
          editingDrawId && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-amber-600 font-semibold", children: [
            "ایڈٹ موڈ: ڈرا ID ",
            editingDrawId
          ] })
        ] })
      ] }),
      deadlineError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs", children: [
        "⚠️ ",
        deadlineError
      ] }),
      deadlineSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs", children: [
        "✓ ",
        deadlineSuccess
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleDeadlineSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-700 text-xs font-bold text-right", children: "بکنگ اسٹیٹس (دستی کنٹرول) *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setDeadlineStatus("open");
                  setDeadlineTitle("بکنگ فائنل کھل گئی ہے");
                },
                className: `py-2.5 px-3 rounded-2xl border text-center transition-all text-xs font-bold flex items-center justify-center gap-1.5 ${deadlineStatus === "open" ? "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/10" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full ${deadlineStatus === "open" ? "bg-white animate-ping" : "bg-slate-400"}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "اوپن (Open)" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setDeadlineStatus("closed");
                  setDeadlineTitle("بکنگ فائنل بند ہے");
                },
                className: `py-2.5 px-3 rounded-2xl border text-center transition-all text-xs font-bold flex items-center justify-center gap-1.5 ${deadlineStatus === "closed" ? "bg-red-600 text-white border-red-600 shadow-sm shadow-red-600/10" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-current" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "بند (Closed)" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setDeadlineStatus("result_announced");
                  setDeadlineTitle("قرعہ اندازی کا نتیجہ جاری ہو گیا ہے");
                },
                className: `py-2.5 px-3 rounded-2xl border text-center transition-all text-xs font-bold flex items-center justify-center gap-1.5 ${deadlineStatus === "result_announced" ? "bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-600/10" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-current" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نتیجہ (Result)" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", children: "کیٹیگری منتخب کریں *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: deadlineCategory,
                onChange: (e) => {
                  const cat = e.target.value;
                  setDeadlineCategory(cat);
                },
                className: "w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pakistan_bond", children: "پاکستان بانڈ" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "thailand_lottery", children: "تھائی لینڈ لاٹری" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", children: "اسٹیٹس پیغام (Urdu Status Message) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "مثال: بکنگ فائنل کھل گئی ہے",
                value: deadlineTitle,
                onChange: (e) => setDeadlineTitle(e.target.value),
                className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", children: "آخری تاریخ اور وقت (Deadline Date & Time) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "datetime-local",
                value: deadlineDateTime,
                onChange: (e) => setDeadlineDateTime(e.target.value),
                className: "w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono",
                required: true
              }
            )
          ] }),
          deadlineCategory === "pakistan_bond" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", children: "انعامی بانڈ مالیت (Prize Bond Value) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "مثال: Rs. 200 یا Rs. 750",
                value: nextPrizeBondValue,
                onChange: (e) => setNextPrizeBondValue(e.target.value),
                className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", children: "ڈرا شہر (Draw City)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "مثال: لاہور / Bangkok",
                value: nextDrawCity,
                onChange: (e) => setNextDrawCity(e.target.value),
                className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", children: "ڈرا نمبر (Draw Number)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "مثال: 95 / 123",
                value: nextDrawNumber,
                onChange: (e) => setNextDrawNumber(e.target.value),
                className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right", children: "ڈرا تاریخ (Draw Date)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "مثال: 15-08-2026",
                value: nextDrawDate,
                onChange: (e) => setNextDrawDate(e.target.value),
                className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            className: "w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: editingDrawId ? "ڈرا سیٹنگز تبدیل کریں (Update Draw Settings)" : "نیا ڈرا محفوظ کریں (Save New Draw)" })
          }
        )
      ] }),
      (() => {
        const activeDeadlines = deadlines.filter(
          (d) => d.status !== "result_announced" && !d.isArchived
        );
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "text-xs font-bold text-slate-700 mb-3", children: [
            "موجودہ فعال بکنگ ڈیڈلائنز کی حیثیت (",
            activeDeadlines.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: activeDeadlines.map((d) => {
            const drawKey = d.id || `${d.category}-${d.nextPrizeBondValue || ""}`;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-50 rounded-2xl border border-slate-150 space-y-2 flex flex-col justify-between shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded-full text-[10px] font-bold ${d.status === "result_announced" ? "bg-amber-50 text-amber-700 border border-amber-200" : d.status === "closed" || safeGetTime2(d.deadlineIso) <= Date.now() ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`, children: d.status === "result_announced" ? "نتیجہ جاری (Result)" : d.status === "closed" || safeGetTime2(d.deadlineIso) <= Date.now() ? "بند ہے (Closed)" : "اوپن ہے (Open)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-xs text-slate-800", children: d.category === "pakistan_bond" ? `پاکستان بانڈ ${d.nextPrizeBondValue ? "- " + d.nextPrizeBondValue : ""}` : "تھائی لینڈ لاٹری" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-slate-600", children: [
                  "اسٹیٹس: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: d.status === "result_announced" ? "text-amber-600" : d.status === "closed" ? "text-red-600" : "text-emerald-600", children: d.status === "result_announced" ? "نتیجہ جاری (Result Announced)" : d.status === "closed" ? "بند (Closed)" : "اوپن (Open)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-slate-600", children: [
                  "عنوان: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-slate-800", children: d.titleUrdu })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-slate-500 font-mono", children: [
                  "آخری وقت: ",
                  safeFormatDate2(d.deadlineIso, "en-US")
                ] }),
                d.category === "pakistan_bond" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 pt-1 border-t border-slate-200/50 space-y-0.5 text-[10px] text-slate-500", children: [
                  d.nextPrizeBondValue && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "مالیت: ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-slate-700", children: d.nextPrizeBondValue })
                  ] }),
                  d.nextDrawCity && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "شہر: ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-slate-700", children: d.nextDrawCity })
                  ] }),
                  d.nextDrawNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "ڈرا نمبر: ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-slate-700", children: d.nextDrawNumber })
                  ] }),
                  d.nextDrawDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "ڈرا تاریخ: ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-slate-700", children: d.nextDrawDate })
                  ] })
                ] }) : d.nextDrawDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 pt-1 border-t border-slate-200/50 text-[10px] text-slate-500", children: [
                  "ڈرا تاریخ: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-slate-700", children: d.nextDrawDate })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mt-2 pt-2 border-t border-slate-200/60", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setEditingDrawId(d.id || d.category);
                        setDeadlineCategory(d.category);
                        setDeadlineTitle(d.titleUrdu);
                        setDeadlineDateTime(d.deadlineIso);
                        setDeadlineStatus(d.status || "open");
                        setNextPrizeBondValue(d.nextPrizeBondValue || "");
                        setNextDrawCity(d.nextDrawCity || "");
                        setNextDrawNumber(d.nextDrawNumber || "");
                        setNextDrawDate(d.nextDrawDate || "");
                      },
                      className: "py-1 px-3 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 cursor-pointer transition-all",
                      children: "ایڈٹ (Edit)"
                    }
                  ),
                  onDeleteDeadline && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: async () => {
                        if (window.confirm("کیا آپ واقعی یہ ڈرا ڈیڈ لائن حذف کرنا چاہتے ہیں؟")) {
                          await onDeleteDeadline(d.id || d.category);
                        }
                      },
                      className: "py-1 px-3 rounded-lg text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer transition-all",
                      children: "حذف (Delete)"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3);
                        const isoStr = futureDate.toISOString().slice(0, 16);
                        onSetDeadline(
                          d.category,
                          isoStr,
                          "بکنگ فائنل کھل گئی ہے",
                          "open",
                          d.nextPrizeBondValue,
                          d.nextDrawCity,
                          d.nextDrawNumber,
                          d.nextDrawDate,
                          d.id || d.category
                        );
                      },
                      className: `py-1.5 px-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 border ${d.status === "open" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-current animate-pulse" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "کھولیں" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1e3);
                        const isoStr = pastDate.toISOString().slice(0, 16);
                        onSetDeadline(
                          d.category,
                          isoStr,
                          "بکنگ فائنل بند ہے",
                          "closed",
                          d.nextPrizeBondValue,
                          d.nextDrawCity,
                          d.nextDrawNumber,
                          d.nextDrawDate,
                          d.id || d.category
                        );
                      },
                      className: `py-1.5 px-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 border ${d.status === "closed" ? "bg-red-600 text-white border-red-600" : "bg-white text-red-600 border-red-200 hover:bg-red-50"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-current" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "بند کریں" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1e3);
                        const isoStr = pastDate.toISOString().slice(0, 16);
                        onSetDeadline(
                          d.category,
                          isoStr,
                          "قرعہ اندازی کا نتیجہ جاری ہو گیا ہے",
                          "result_announced",
                          d.nextPrizeBondValue,
                          d.nextDrawCity,
                          d.nextDrawNumber,
                          d.nextDrawDate,
                          d.id || d.category
                        );
                      },
                      className: `py-1.5 px-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1 border ${d.status === "result_announced" ? "bg-amber-600 text-white border-amber-600" : "bg-white text-amber-700 border-amber-200 hover:bg-amber-50"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-current" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نتیجہ" })
                      ]
                    }
                  )
                ] })
              ] })
            ] }, drawKey);
          }) })
        ] });
      })()
    ] })
  ] });
};
const AdminResultsTab = ({
  pakistanBondResults,
  thaiLotteryResults,
  resultError,
  resultSuccess,
  resultFormOpen,
  setResultFormOpen,
  resultFormMode,
  setResultFormMode,
  resCategory,
  setResCategory,
  resDate,
  setResDate,
  resCity,
  setResCity,
  resBondValue,
  setResBondValue,
  resDrawNoOnly,
  setResDrawNoOnly,
  resDrawNo,
  setResDrawNo,
  resFirstPrize,
  setResFirstPrize,
  resLast2Digits,
  setResLast2Digits,
  resFront3Digits,
  setResFront3Digits,
  resBack3Digits,
  setResBack3Digits,
  resSecondPrizesStr,
  setResSecondPrizesStr,
  resetResultForm,
  handleSaveResult,
  resultSearchQuery,
  setResultSearchQuery,
  resultViewCategory,
  setResultViewCategory,
  handleEditClick,
  handleDeleteClick
}) => {
  const formRef = reactExports.useRef(null);
  const [editScrollPending, setEditScrollPending] = reactExports.useState(false);
  const [isManualDate, setIsManualDate] = reactExports.useState(true);
  const urduDatePreview = formatUrduDatePreview(resDate);
  reactExports.useEffect(() => {
    if (!editScrollPending || !resultFormOpen || resultFormMode !== "edit") {
      return;
    }
    let isMounted = true;
    let attempts = 0;
    const performScroll = () => {
      if (!isMounted) return;
      const target = formRef.current || document.getElementById("admin-result-form");
      if (target) {
        const rect = target.getBoundingClientRect();
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const targetY = Math.max(0, rect.top + currentScroll - 90);
        try {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch {
          target.scrollIntoView(true);
        }
        try {
          window.scrollTo({
            top: targetY,
            behavior: "smooth"
          });
        } catch {
          window.scrollTo(0, targetY);
        }
        setTimeout(() => {
          if (!isMounted) return;
          const currentY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
          if (Math.abs(currentY - targetY) > 80) {
            try {
              window.scrollTo(0, targetY);
            } catch {
              target.scrollIntoView(true);
            }
          }
        }, 280);
        setEditScrollPending(false);
      } else if (attempts < 10) {
        attempts++;
        requestAnimationFrame(performScroll);
      } else {
        setEditScrollPending(false);
      }
    };
    const rafId = requestAnimationFrame(() => {
      setTimeout(performScroll, 50);
    });
    return () => {
      isMounted = false;
      cancelAnimationFrame(rafId);
    };
  }, [editScrollPending, resultFormOpen, resultFormMode]);
  const handleEditWithScroll = (draw) => {
    handleEditClick(draw);
    setEditScrollPending(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "module-result-management", className: "bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6 text-right", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-slate-100", children: [
      !resultFormOpen ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setResultFormMode("add");
            resetResultForm();
            setResultFormOpen(true);
          },
          className: "w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-amber-500/10 transition-all text-xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نیا نتیجہ شامل کریں (Add New Result)" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setResultFormOpen(false),
          className: "w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all text-xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فارم بند کریں (Close Form)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-slate-800 flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "قرعہ اندازی کے نتائج کا انتظام (Result Management)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-5 h-5 text-amber-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1", children: "پاکستان پرائز بانڈ اور تھائی لینڈ لاٹری کے نتائج شامل کریں، تبدیل کریں یا حذف کریں" })
      ] })
    ] }),
    resultError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "admin-result-error", className: "p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right font-sans", children: [
      "⚠️ ",
      resultError
    ] }),
    resultSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "admin-result-success", className: "p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right font-sans", children: [
      "✓ ",
      resultSuccess
    ] }),
    resultFormOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "admin-result-form", ref: formRef, className: "bg-slate-50 p-5 sm:p-6 rounded-3xl border border-slate-150 space-y-4 text-right scroll-mt-24 sm:scroll-mt-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-sm font-bold text-slate-800 border-b border-slate-200 pb-2", children: resultFormMode === "add" ? "نیا نتیجہ شامل کریں (Add New Result)" : "نتیجہ ایڈٹ کریں (Edit Result)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveResult, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-sans", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 font-semibold mb-1 text-right", children: "کیٹیگری (Category) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "result-form-category",
                value: resCategory,
                onChange: (e) => {
                  const cat = e.target.value;
                  setResCategory(cat);
                  if (cat === "thailand_lottery") {
                    setResCity("بنکاک");
                  } else {
                    setResCity("");
                  }
                },
                disabled: resultFormMode === "edit",
                className: "w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pakistan_bond", children: "پاکستان پرائز بانڈ" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "thailand_lottery", children: "تھائی لینڈ لاٹری" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setIsManualDate(!isManualDate),
                  className: "text-[11px] text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 cursor-pointer transition-colors bg-amber-50 hover:bg-amber-100/80 px-2 py-0.5 rounded-lg border border-amber-200/60",
                  children: isManualDate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "کلینڈر کھولیں" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مینول لکھیں (Manual)" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 font-semibold text-right", children: "ڈرا کی تاریخ (Draw Date) *" })
            ] }),
            isManualDate ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "result-form-date",
                  type: "text",
                  dir: "ltr",
                  placeholder: "YYYY-MM-DD (مثلاً: 2015-05-15 یا 15-05-2015)",
                  value: resDate,
                  onChange: (e) => setResDate(e.target.value),
                  onBlur: () => {
                    const normalized = normalizeDateInput(resDate);
                    if (normalized && normalized !== resDate) {
                      setResDate(normalized);
                    }
                  },
                  required: true,
                  className: "w-full text-center font-mono font-bold tracking-wider bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-800 shadow-inner"
                }
              ),
              urduDatePreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[11px] px-2.5 py-1 bg-emerald-50 border border-emerald-150 rounded-lg text-emerald-800", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-emerald-700", dir: "ltr", children: normalizeDateInput(resDate) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-emerald-600" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "تاریخ: ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: urduDatePreview })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-1 pt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
                      setResDate(today);
                    },
                    className: "text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium cursor-pointer transition-colors border border-slate-200",
                    children: "آج کی تاریخ (Today)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400", children: "براہ راست کی بورڈ سے لکھیں (کلینڈر نہیں کھلے گا)" })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "result-form-date-picker",
                  type: "date",
                  value: resDate,
                  onChange: (e) => setResDate(e.target.value),
                  required: true,
                  className: "w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans text-sm"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 text-right", children: "کلینڈر سے تاریخ کا انتخاب کریں" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 font-semibold mb-1 text-right", children: "شہر (City) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "result-form-city",
                type: "text",
                list: "pk-results-cities-datalist",
                placeholder: resCategory === "pakistan_bond" ? "مثلاً ملتان، کراچی، گوجرانوالہ" : "مثلاً بنکاک",
                value: resCity,
                onChange: (e) => setResCity(e.target.value),
                required: true,
                className: "w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("datalist", { id: "pk-results-cities-datalist", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "کراچی" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "لاہور" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "فیصل آباد" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ملتان" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "راولپنڈی" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "پشاور" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "کوئٹہ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "حیدرآباد" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "سیالکوٹ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "مظفرآباد" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "گوجرانوالہ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "اسلام آباد" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "سکھر" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "بہاولپور" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "بنکاک" })
            ] })
          ] }),
          resCategory === "pakistan_bond" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 font-semibold mb-1 text-right", children: "بانڈ کی مالیت (Bond Value) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "result-form-bond-value",
                  value: resBondValue,
                  onChange: (e) => setResBondValue(e.target.value),
                  className: "w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Rs. 100", children: "Rs. 100" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Rs. 200", children: "Rs. 200" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Rs. 750", children: "Rs. 750" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Rs. 1,500", children: "Rs. 1,500" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Rs. 7,500", children: "Rs. 7,500" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Rs. 15,000", children: "Rs. 15,000" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Rs. 25,000 Premium", children: "Rs. 25,000 Premium" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Rs. 40,000", children: "Rs. 40,000 (نارمل / Normal)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Rs. 40,000 Premium", children: "Rs. 40,000 Premium" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 font-semibold mb-1 text-right", children: "ڈرا نمبر (Draw Number Only) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "result-form-draw-no-only",
                  type: "text",
                  placeholder: "مثلاً 106",
                  value: resDrawNoOnly,
                  onChange: (e) => setResDrawNoOnly(e.target.value),
                  required: true,
                  className: "w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
                }
              )
            ] })
          ] }),
          resCategory === "thailand_lottery" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 font-semibold mb-1 text-right", children: "ڈرا نمبر اور نام (Draw Title) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "result-form-draw-no-thai",
                type: "text",
                placeholder: "مثلاً Thai Draw #384",
                value: resDrawNo,
                onChange: (e) => setResDrawNo(e.target.value),
                required: true,
                className: "w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 font-semibold mb-1 text-right", children: "فرسٹ پرائز نمبر (First Prize Number) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "result-form-first-prize",
                type: "text",
                maxLength: 6,
                placeholder: "6 ہندسوں کا لکی نمبر",
                value: resFirstPrize,
                onChange: (e) => setResFirstPrize(e.target.value.replace(/\D/g, "")),
                required: true,
                className: "w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
              }
            )
          ] }),
          resCategory === "thailand_lottery" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 font-semibold mb-1 text-right", children: "آخری 2 ہندسے (Last 2 Digits)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "result-form-last2",
                  type: "text",
                  maxLength: 2,
                  value: resLast2Digits,
                  onChange: (e) => setResLast2Digits(e.target.value.replace(/\D/g, "")),
                  className: "w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 font-semibold mb-1 text-right", children: "فرنٹ 3 ہندسے (Front 3 Digits)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "result-form-front3",
                  type: "text",
                  maxLength: 3,
                  value: resFront3Digits,
                  onChange: (e) => setResFront3Digits(e.target.value.replace(/\D/g, "")),
                  className: "w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 font-semibold mb-1 text-right", children: "بیک 3 ہندسے (Back 3 Digits)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "result-form-back3",
                  type: "text",
                  maxLength: 3,
                  value: resBack3Digits,
                  onChange: (e) => setResBack3Digits(e.target.value.replace(/\D/g, "")),
                  className: "w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-slate-600 font-semibold mb-1 text-right", children: "سیکنڈ پرائز نمبرز - کوما سے الگ کریں (Second Prize Numbers - Comma separated)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "result-form-seconds",
              rows: 2,
              placeholder: "مثال کے طور پر: 070148, 194865, 222052",
              value: resSecondPrizesStr,
              onChange: (e) => setResSecondPrizesStr(e.target.value),
              className: "w-full text-right bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans font-mono text-xs"
            }
          )
        ] }),
        resCategory === "pakistan_bond" && resDrawNoOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200/50 p-2.5 rounded-xl text-xs text-amber-800 font-semibold text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ڈرا کا پورا نام (Full Draw Name Preview): " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: resDrawNo })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              id: "result-form-submit",
              type: "submit",
              className: "flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition-all shadow-md cursor-pointer text-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نتیجہ محفوظ کریں (Save Result)" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              id: "result-form-cancel",
              type: "button",
              onClick: () => {
                setResultFormOpen(false);
                resetResultForm();
              },
              className: "bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-6 rounded-2xl text-xs sm:text-sm transition-all cursor-pointer text-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "منسوخ کریں (Cancel)" })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-3 justify-between items-center bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs font-sans", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:w-64", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-slate-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "result-search-bar",
              type: "text",
              placeholder: "سرچ کریں (نمبر، شہر، ڈرا)...",
              value: resultSearchQuery,
              onChange: (e) => setResultSearchQuery(e.target.value),
              className: "w-full bg-white text-right text-xs text-slate-800 pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 focus:border-amber-500 outline-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full md:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              id: "btn-filter-pakbond",
              type: "button",
              onClick: () => {
                setResultViewCategory("pakistan_bond");
                if (!resultFormOpen) setResCategory("pakistan_bond");
              },
              className: `flex-1 md:flex-initial py-1.5 px-3 rounded-lg border font-semibold cursor-pointer text-center transition-all ${resultViewCategory === "pakistan_bond" ? "bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`,
              children: "پاکستان بانڈز (Pakistan Bonds)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              id: "btn-filter-thai",
              type: "button",
              onClick: () => {
                setResultViewCategory("thailand_lottery");
                if (!resultFormOpen) setResCategory("thailand_lottery");
              },
              className: `flex-1 md:flex-initial py-1.5 px-3 rounded-lg border font-semibold cursor-pointer text-center transition-all ${resultViewCategory === "thailand_lottery" ? "bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`,
              children: "تھائی لاٹری (Thai Lottery)"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-slate-100 shadow-sm max-h-[380px] overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-right border-collapse text-xs sm:text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-slate-50 text-slate-500 border-b border-slate-100 sticky top-0 z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-left", children: "اقدام (Actions)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3", children: "تاریخ (Date)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3", children: "شہر / ملک" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3", children: "سیکنڈ پرائزز" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3", children: "فرسٹ پرائز" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3", children: "ڈرا نمبر / تفصیل" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-100 bg-white", children: (() => {
          const activeResults = resultViewCategory === "pakistan_bond" ? pakistanBondResults : thaiLotteryResults;
          const queryClean = resultSearchQuery.trim().toLowerCase();
          const filtered = activeResults.filter((r) => {
            if (!queryClean) return true;
            const matchesDrawNo = r.drawNo && r.drawNo.toLowerCase().includes(queryClean);
            const matchesCity = r.city && r.city.toLowerCase().includes(queryClean);
            const matchesFirst = r.firstPrize && r.firstPrize.includes(queryClean);
            const matchesDate = r.date && r.date.includes(queryClean);
            const matchesSeconds = r.secondPrizes && r.secondPrizes.some((s) => s.includes(queryClean));
            const matchesBondVal = r.category === "pakistan_bond" && r.bondValue && r.bondValue.toLowerCase().includes(queryClean);
            return matchesDrawNo || matchesCity || matchesFirst || matchesDate || matchesSeconds || matchesBondVal;
          });
          if (filtered.length === 0) {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "py-8 text-center text-slate-400", children: "کوئی نتیجہ نہیں ملا۔" }) });
          }
          return filtered.map((draw) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-50/50 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 text-left flex gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleEditWithScroll(draw),
                  className: "bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all",
                  children: "ایڈٹ (Edit)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleDeleteClick(draw.id, draw.category),
                  className: "bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all",
                  children: "حذف (Delete)"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 font-mono text-slate-500 text-xs", children: draw.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-slate-700 font-semibold", children: draw.city }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-slate-500 font-mono text-xs max-w-[150px] truncate", title: draw.secondPrizes.join(", "), children: draw.secondPrizes.join(", ") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 font-mono font-bold text-amber-600", children: draw.firstPrize }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 font-bold text-slate-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: draw.drawNo }),
              draw.category === "pakistan_bond" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-400", children: [
                "پاکستان بانڈ - ",
                draw.bondValue
              ] }),
              draw.category === "thailand_lottery" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] text-slate-400 font-mono flex gap-1 justify-end mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "L2: ",
                  draw.last2Digits
                ] }),
                " |",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "F3: ",
                  draw.front3Digits
                ] }),
                " |",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "B3: ",
                  draw.back3Digits
                ] })
              ] })
            ] })
          ] }, draw.id));
        })() })
      ] }) })
    ] })
  ] });
};
const AdminManagementTab = ({
  users,
  adminManageError,
  adminManageSuccess,
  newAdminName,
  setNewAdminName,
  newAdminPhone,
  setNewAdminPhone,
  newAdminEmail,
  setNewAdminEmail,
  newAdminPassword,
  setNewAdminPassword,
  newAdminRole,
  setNewAdminRole,
  handleCreateAdminSubmit,
  handleDeleteAdmin,
  handleToggleActiveAdmin,
  handleChangeAdminRole,
  safeFormatDate: safeFormatDate2
}) => {
  const [filterType, setFilterType] = reactExports.useState("all");
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const privilegedUsers = users.filter(
    (u) => u.isAdmin === true || u.role === "superAdmin" || u.role === "dataEntryAdmin" || u.role === "admin" || u.role === "dealer"
  );
  const filteredUsers = privilegedUsers.filter((u) => {
    if (filterType === "admins") {
      return u.role === "superAdmin" || u.role === "dataEntryAdmin" || u.role === "admin" || u.isAdmin === true && u.role !== "dealer";
    }
    if (filterType === "dealers") {
      return u.role === "dealer";
    }
    return true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نیا ایڈمن یا مجاز ڈیلر بنائیں (Register Admin / Dealer)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-amber-500" })
      ] }),
      adminManageError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs text-right font-sans", dir: "rtl", children: [
        "⚠️ ",
        adminManageError
      ] }),
      adminManageSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs text-right font-sans", dir: "rtl", children: [
        "✓ ",
        adminManageSuccess
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreateAdminSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right font-sans", children: "مکمل نام (Full Name) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "نام لکھیں (مثلاً علی خان)",
                value: newAdminName,
                onChange: (e) => setNewAdminName(e.target.value),
                className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right font-sans", children: "موبائل نمبر (Mobile Number) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "tel",
                placeholder: "03001234567",
                value: newAdminPhone,
                onChange: (e) => setNewAdminPhone(e.target.value),
                className: "w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right font-sans", children: "ای میل ایڈریس (Email Address) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                placeholder: "admin@example.com",
                value: newAdminEmail,
                onChange: (e) => setNewAdminEmail(e.target.value),
                className: "w-full text-left bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-slate-600 text-xs font-semibold mb-1.5 text-right font-sans", children: "لاگ ان پاس ورڈ (Login Password) *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "password",
                placeholder: "کم از کم 6 ہندسے",
                value: newAdminPassword,
                onChange: (e) => setNewAdminPassword(e.target.value),
                className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-700 text-xs font-bold font-sans", children: "اکاؤنٹ کا عہدہ منتخب کریں (Select Role):" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${newAdminRole === "dataEntryAdmin" ? "bg-blue-50 border-blue-400 ring-2 ring-blue-400/20" : "bg-white border-slate-200 hover:bg-slate-100"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "radio",
                  name: "adminRole",
                  checked: newAdminRole === "dataEntryAdmin",
                  onChange: () => setNewAdminRole("dataEntryAdmin"),
                  className: "text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-slate-800 font-sans", children: "ڈیٹا انٹری ایڈمن" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-500 font-sans", children: "صرف نتائج درج کرنے کا مجاز" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${newAdminRole === "superAdmin" ? "bg-purple-50 border-purple-400 ring-2 ring-purple-400/20" : "bg-white border-slate-200 hover:bg-slate-100"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "radio",
                  name: "adminRole",
                  checked: newAdminRole === "superAdmin",
                  onChange: () => setNewAdminRole("superAdmin"),
                  className: "text-purple-600 focus:ring-purple-500"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-slate-800 font-sans", children: "سپر ایڈمن" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-500 font-sans", children: "مکمل کنٹرول اور فنانس مینجمنٹ" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${newAdminRole === "dealer" ? "bg-amber-50 border-amber-400 ring-2 ring-amber-400/30" : "bg-white border-slate-200 hover:bg-slate-100"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "radio",
                  name: "adminRole",
                  checked: newAdminRole === "dealer",
                  onChange: () => setNewAdminRole("dealer"),
                  className: "text-amber-500 focus:ring-amber-500"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-amber-900 font-sans", children: "مجاز ڈیلر (Dealer)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-amber-700 font-sans", children: "ڈیلرشپ پورٹل اور بکنگز" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "submit",
            className: "bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-8 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md w-full sm:w-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans font-bold", children: newAdminRole === "dealer" ? "نیا مجاز ڈیلر رجسٹر کریں (Register Dealer)" : "نیا ایڈمن رجسٹر کریں (Register Admin)" })
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-4 pb-3 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-slate-100 p-1 rounded-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setFilterType("all"),
              className: `px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${filterType === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`,
              children: [
                "تمام (",
                privilegedUsers.length,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setFilterType("admins"),
              className: `px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${filterType === "admins" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`,
              children: [
                "ایڈمنز (",
                privilegedUsers.filter((u) => u.role !== "dealer").length,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setFilterType("dealers"),
              className: `px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${filterType === "dealers" ? "bg-white text-amber-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`,
              children: [
                "مجاز ڈیلرز (",
                privilegedUsers.filter((u) => u.role === "dealer").length,
                ")"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-slate-800 flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "رجسٹرڈ ایڈمنز اور ڈیلرز کی فہرست" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-amber-500" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-right border-collapse text-xs sm:text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-slate-50 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600 text-left", children: "اقدامات (Actions)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600", children: "آخری لاگ ان (Last Login)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600", children: "حیثیت (Status)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600", children: "عہدہ (Role)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600", children: "موبائل نمبر" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 font-semibold text-slate-600 text-right", children: "صارف / ایڈمن تفصیل" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-100", children: filteredUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "py-8 text-center text-slate-400 font-sans", children: "کوئی ریکارڈ موجود نہیں ہے۔" }) }) : filteredUsers.map((admin) => {
          const isProtectedOwner = isSuperOwner(admin.email) || (admin.email || "").toLowerCase() === getAdminConfiguredEmail().toLowerCase().trim();
          const isActive = admin.active !== false;
          const loginTime = admin.lastLogin ? safeFormatDate2(admin.lastLogin, "ur-PK", { timeZone: "Asia/Karachi" }) : "N/A";
          const formattedLogin = loginTime === "N/A" ? "لاگ ان نہیں ہوا (No Login)" : loginTime;
          admin.role === "dealer";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-50/50 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-left", children: !isProtectedOwner ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setDeleteTarget(admin),
                  className: "bg-red-50 hover:bg-red-100 text-red-600 p-1.5 rounded-xl border border-red-200 transition-all cursor-pointer",
                  title: "ڈیٹا بیس ریکارڈ اور رسائی حذف کریں",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleToggleActiveAdmin(admin.email, isActive),
                  className: `px-2 py-1 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${isActive ? "bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200" : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"}`,
                  children: isActive ? "Deactivate" : "Activate"
                }
              ),
              admin.role === "dealer" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleChangeAdminRole(admin.email, "customer"),
                  className: "px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-[10px] font-bold transition-all cursor-pointer",
                  title: "عام کسٹمر بنائیں",
                  children: "Revoke Dealer"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleChangeAdminRole(
                    admin.email,
                    admin.role === "superAdmin" ? "dataEntryAdmin" : "superAdmin"
                  ),
                  className: "px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-[10px] font-bold transition-all cursor-pointer",
                  children: admin.role === "superAdmin" ? "Make DataEntry" : "Make Super"
                }
              ),
              admin.role !== "dealer" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleChangeAdminRole(admin.email, "dealer"),
                  className: "px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-[10px] font-bold transition-all cursor-pointer",
                  title: "ڈیلر رول تفویض کریں",
                  children: "Make Dealer"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 font-sans italic font-semibold", children: "سپر مالک (Owner)" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 font-mono text-xs text-slate-500 text-left", dir: "ltr", children: formattedLogin }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] px-2 py-0.5 rounded-full border ${isActive ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-red-600 bg-red-50 border-red-200"}`, children: isActive ? "فعال (Active)" : "غیر فعال (Inactive)" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] px-2.5 py-1 rounded-full border font-bold ${admin.role === "superAdmin" ? "text-purple-700 bg-purple-50 border-purple-200" : admin.role === "dealer" ? "text-amber-900 bg-amber-50 border-amber-300 shadow-sm" : "text-blue-700 bg-blue-50 border-blue-200"}`, children: admin.role === "superAdmin" ? "سپر ایڈمن (Super Admin)" : admin.role === "dealer" ? "مجاز ڈیلر (Dealer)" : "ڈیٹا انٹری ایڈمن (Data Entry)" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 font-mono text-slate-600", children: admin.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold block text-slate-800 font-sans", children: admin.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 font-mono block", children: admin.email })
            ] })
          ] }, admin.email || admin.uid);
        }) })
      ] }) })
    ] }),
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white max-w-lg w-full rounded-3xl border border-red-200 shadow-2xl p-6 sm:p-8 text-right font-sans animate-in fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setDeleteTarget(null),
            className: "text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-bold text-red-600", children: "ڈیٹا بیس ریکارڈ اور رسائی حذف کرنے کی تصدیق" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-red-600 shrink-0" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-6 text-xs text-slate-600 leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50/70 border border-red-200 p-3.5 rounded-2xl text-red-900", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold mb-1", children: [
            "صارف: ",
            deleteTarget.name,
            " (",
            deleteTarget.email,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-red-800", children: [
            "عہدہ (Role): ",
            deleteTarget.role || "Admin/Dealer",
            " | UID: ",
            deleteTarget.uid || "N/A"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-700", children: [
          "یہ کارروائی اس صارف کی ڈیٹا بیس پروفائل، ایڈمن اختیارات، اور ڈیلرشپ ریکارڈ کو Realtime Database (",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "font-mono text-red-600", children: [
            "users/",
            deleteTarget.uid
          ] }),
          ") سے مستقل طور پر حذف کر دے گی۔"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 text-[11px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "اہم وضاحت (Notice):" }),
          " سیکیورٹی اصولوں کے تحت کلائنٹ کوڈ میں سرور کی پرائیویٹ ایڈمن کیز (Admin SDK Keys) محفوظ نہیں کی جاتیں۔ لہٰذا فائر بیس آتھ (Authentication) کا اکاؤنٹ اگر درکار ہو تو فائر بیس کنسول سے مانیٹر کیا جا سکتا ہے۔ اس صارف کی سسٹم تک رسائی فوری طور پر بند ہو جائے گی۔"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 pt-3 border-t border-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setDeleteTarget(null),
            className: "px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer",
            children: "منسوخ کریں (Cancel)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              const email = deleteTarget.email;
              setDeleteTarget(null);
              handleDeleteAdmin(email);
            },
            className: "px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md hover:-translate-y-0.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ریکارڈ مستقل حذف کریں (Confirm Delete)" })
            ]
          }
        )
      ] })
    ] }) })
  ] });
};
const AdminDealershipTab = ({
  dealers,
  allUsers,
  dealerBookings,
  onAssignDealer,
  onCancelDealerBookingByAdmin
}) => {
  const [activeSubTab, setActiveSubTab] = reactExports.useState("dealers");
  const [userSearchQuery, setUserSearchQuery] = reactExports.useState("");
  const [bookingSearchQuery, setBookingSearchQuery] = reactExports.useState("");
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const [statusMessage, setStatusMessage] = reactExports.useState(null);
  const [actionLoading, setActionLoading] = reactExports.useState(null);
  const eligibleUsers = reactExports.useMemo(() => {
    const q = userSearchQuery.trim().toLowerCase();
    if (!q) return allUsers.filter((u) => u.role !== "superAdmin" && u.role !== "dataEntryAdmin");
    return allUsers.filter(
      (u) => {
        var _a, _b, _c, _d;
        return (((_a = u.name) == null ? void 0 : _a.toLowerCase().includes(q)) || ((_b = u.email) == null ? void 0 : _b.toLowerCase().includes(q)) || ((_c = u.phone) == null ? void 0 : _c.toLowerCase().includes(q)) || ((_d = u.city) == null ? void 0 : _d.toLowerCase().includes(q))) && u.role !== "superAdmin" && u.role !== "dataEntryAdmin";
      }
    );
  }, [allUsers, userSearchQuery]);
  const filteredBookings = reactExports.useMemo(() => {
    return dealerBookings.filter((b) => {
      var _a, _b, _c, _d;
      if (b.isArchived === true) return false;
      const matchCategory = categoryFilter === "all" || b.category === categoryFilter;
      const q = bookingSearchQuery.trim().toLowerCase();
      const matchSearch = !q || ((_a = b.number) == null ? void 0 : _a.includes(q)) || ((_b = b.dealerName) == null ? void 0 : _b.toLowerCase().includes(q)) || ((_c = b.dealerEmail) == null ? void 0 : _c.toLowerCase().includes(q)) || ((_d = b.id) == null ? void 0 : _d.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [dealerBookings, categoryFilter, bookingSearchQuery]);
  const handleRoleToggle = async (user, makeDealer) => {
    if (!user.uid) return;
    setActionLoading(user.uid);
    setStatusMessage(null);
    try {
      const res = await onAssignDealer(user.uid, makeDealer);
      if (res.success) {
        setStatusMessage({
          type: "success",
          text: makeDealer ? `صارف ${user.name || user.email} کو کامیابی سے ڈیلر بنا دیا گیا ہے۔` : `صارف ${user.name || user.email} سے ڈیلر رول واپس لے لیا گیا ہے۔`
        });
      } else {
        setStatusMessage({
          type: "error",
          text: res.error || "ڈیلر رول تبدیل کرنے میں ناکامی۔"
        });
      }
    } catch (e) {
      setStatusMessage({
        type: "error",
        text: e.message || "غیر متوقع خرابی پیش آئی۔"
      });
    } finally {
      setActionLoading(null);
    }
  };
  const handleBookingCancel = async (booking) => {
    if (!confirm(`کیا آپ واقعی ڈیلر ${booking.dealerName} کی بکنگ #${booking.number} منسوخ کر کے رقم واپس کرنا چاہتے ہیں؟`)) {
      return;
    }
    setActionLoading(booking.id);
    setStatusMessage(null);
    try {
      const res = await onCancelDealerBookingByAdmin(booking.id);
      if (res.success) {
        setStatusMessage({
          type: "success",
          text: `ڈیلر بکنگ #${booking.number} منسوخ کر کے رقم ڈیلر کے والٹ میں واپس منتقل کر دی گئی ہے۔`
        });
      } else {
        setStatusMessage({
          type: "error",
          text: res.error || "بکنگ منسوخ کرنے میں ناکامی۔"
        });
      }
    } catch (e) {
      setStatusMessage({
        type: "error",
        text: e.message || "غیر متوقع خرابی پیش آئی۔"
      });
    } finally {
      setActionLoading(null);
    }
  };
  const categoryNameMap = {
    pakistan_bond: "پاکستان پرائز بانڈ",
    thailand_lottery: "تھائی لینڈ لاٹری"
  };
  const handleDealerBookingsPDF = async () => {
    const label = categoryFilter === "all" ? "All_Dealer_Bookings" : categoryNameMap[categoryFilter];
    const result = await generateDealerBookingsPDF(
      label,
      filteredBookings,
      categoryFilter === "all" ? "all" : "category",
      label
    );
    if (result.success) {
      setStatusMessage({
        type: "success",
        text: "ڈیلر بکنگز کی PDF رپورٹ کامیابی سے تیار کر دی گئی ہے۔"
      });
    } else {
      setStatusMessage({
        type: "error",
        text: result.error || "ڈیلر بکنگز کی PDF بنانے میں ناکامی ہوئی۔"
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "subtab-dealers-list-btn",
            type: "button",
            onClick: () => setActiveSubTab("dealers"),
            className: `px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${activeSubTab === "dealers" ? "bg-amber-500 text-slate-950 shadow-sm" : "bg-slate-50 hover:bg-slate-100 text-slate-600"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "ڈیلرز کی فہرست (",
                dealers.length,
                ")"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "subtab-dealer-bookings-btn",
            type: "button",
            onClick: () => setActiveSubTab("bookings"),
            className: `px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${activeSubTab === "bookings" ? "bg-amber-500 text-slate-950 shadow-sm" : "bg-slate-50 hover:bg-slate-100 text-slate-600"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "ڈیلر بکنگز (",
                dealerBookings.length,
                ")"
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-xs text-slate-500 font-semibold px-2", children: activeSubTab === "dealers" ? "مجاز ڈیلرز اور اختیارات" : "صرف ڈیلرز کے کھاتے سے کی گئی بکنگز" })
    ] }),
    statusMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 rounded-2xl border flex items-center justify-end gap-2 text-xs sm:text-sm font-sans ${statusMessage.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: statusMessage.text }),
      statusMessage.type === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-emerald-600 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-red-600 shrink-0" })
    ] }),
    activeSubTab === "dealers" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-slate-500", children: "کل رجسٹرڈ ڈیلرز" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black text-slate-900 font-mono", children: dealers.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-slate-500", children: "ڈیلر بکنگز کی تعداد" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black text-amber-600 font-mono", children: dealerBookings.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-1 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-slate-500", children: "ڈیلرز کا مجموعی والٹ بیلنس" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-black text-emerald-600 font-mono", children: [
            "Rs. ",
            dealers.reduce((sum, d) => sum + (d.balance || 0), 0).toLocaleString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-base font-bold text-slate-900 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-amber-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ڈیلرشپ تفویض اور کنٹرول (Dealers Management)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full sm:w-80 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "نام، ای میل، موبائل یا شہر تلاش کریں...",
                value: userSearchQuery,
                onChange: (e) => setUserSearchQuery(e.target.value),
                className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 pr-10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-slate-400 absolute right-3.5 top-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-right text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-slate-50 text-slate-600 border-b border-slate-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3.5 px-4 font-bold", children: "ڈیلر ایکشن" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3.5 px-4 font-bold", children: "والٹ بیلنس" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3.5 px-4 font-bold", children: "شہر" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3.5 px-4 font-bold", children: "موبائل نمبر" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3.5 px-4 font-bold", children: "ای میل" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3.5 px-4 font-bold", children: "صارف کا نام" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3.5 px-4 font-bold", children: "کردار (Role)" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-100 font-sans", children: eligibleUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "py-8 text-center text-slate-400 font-semibold", children: "کوئی صارف یا ڈیلر ریکارڈ نہیں ملا۔" }) }) : eligibleUsers.map((u) => {
            const isDealer = u.role === "dealer";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `hover:bg-slate-50/80 transition-colors ${isDealer ? "bg-amber-50/30" : ""}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4", children: isDealer ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  disabled: actionLoading === u.uid,
                  onClick: () => handleRoleToggle(u, false),
                  className: "bg-red-50 hover:bg-red-100 text-red-700 font-bold py-1.5 px-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-[11px]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserMinus, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ڈیلر رول ختم کریں" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  disabled: actionLoading === u.uid,
                  onClick: () => handleRoleToggle(u, true),
                  className: "bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-1.5 px-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-[11px]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ڈیلر بنائیں" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3.5 px-4 font-mono font-bold text-slate-800", children: [
                "Rs. ",
                (u.balance || 0).toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 text-slate-600", children: u.city || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 font-mono text-slate-600", children: u.phone || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 font-mono text-slate-700", children: u.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 font-bold text-slate-900", children: u.name || "نامعلوم" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${isDealer ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-slate-100 text-slate-600 border border-slate-200"}`, children: isDealer ? "ڈیلر (Dealer)" : "کسٹمر (Customer)" }) })
            ] }, u.uid || u.email);
          }) })
        ] }) })
      ] })
    ] }),
    activeSubTab === "bookings" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-base font-bold text-slate-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-amber-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ڈیلر بکنگز کا ریکارڈ (Dealer Bookings)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 w-full md:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: categoryFilter,
              onChange: (e) => setCategoryFilter(e.target.value),
              className: "bg-slate-50 border border-slate-200 rounded-2xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "تمام کیٹیگریز" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pakistan_bond", children: "پاکستان پرائز بانڈ" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "thailand_lottery", children: "تھائی لینڈ لاٹری" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 md:w-72", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "نمبر، ڈیلر کا نام یا ای میل تلاش کریں...",
                value: bookingSearchQuery,
                onChange: (e) => setBookingSearchQuery(e.target.value),
                className: "w-full text-right bg-slate-50 border border-slate-200 rounded-2xl py-2 px-4 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-slate-400 absolute right-3 top-2.5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleDealerBookingsPDF,
              disabled: filteredBookings.length === 0,
              className: "bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3 rounded-2xl transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-xs whitespace-nowrap",
              title: "Dealer Bookings PDF",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "PDF رپورٹ" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-right text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-slate-50 text-slate-600 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3.5 px-4 font-bold", children: "ایڈمن ایکشن" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3.5 px-4 font-bold", children: "کل رقم (Total)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3.5 px-4 font-bold", children: "سیکنڈ رقم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3.5 px-4 font-bold", children: "فرسٹ رقم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3.5 px-4 font-bold", children: "بکنگ نمبر" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3.5 px-4 font-bold", children: "کیٹیگری / ڈرا" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3.5 px-4 font-bold", children: "وقت / تاریخ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3.5 px-4 font-bold", children: "ڈیلر کی تفصیلات" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-100 font-sans", children: filteredBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, className: "py-8 text-center text-slate-400 font-semibold", children: "کوئی ڈیلر بکنگ ریکارڈ موجود نہیں ہے۔" }) }) : filteredBookings.map((b) => {
          const total = (b.firstAmount || 0) + (b.secondAmount || 0);
          const d = new Date(b.timestamp);
          const dateStr = d.toLocaleDateString("ur-PK");
          const timeStr = d.toLocaleTimeString("ur-PK", { hour: "2-digit", minute: "2-digit" });
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-50/80 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                disabled: actionLoading === b.id,
                onClick: () => handleBookingCancel(b),
                className: "bg-red-50 hover:bg-red-100 text-red-700 font-bold py-1 px-2.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50 text-[10px]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "منسوخ کریں" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3.5 px-4 font-mono font-bold text-amber-700", children: [
              "Rs. ",
              total.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 font-mono text-slate-600", children: b.secondAmount > 0 ? `Rs. ${b.secondAmount.toLocaleString()}` : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 font-mono text-slate-600", children: b.firstAmount > 0 ? `Rs. ${b.firstAmount.toLocaleString()}` : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-4 font-mono font-black text-slate-900 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-amber-100 text-amber-950 px-2 py-0.5 rounded-lg border border-amber-200", children: [
              "#",
              b.number
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3.5 px-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-slate-800", children: categoryNameMap[b.category] || b.category }),
              b.bondValue && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-500 font-mono", children: b.bondValue })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3.5 px-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-slate-700", children: dateStr }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-400 font-mono", children: timeStr })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3.5 px-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-slate-900", children: b.dealerName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] text-slate-500", children: b.dealerEmail })
            ] })
          ] }, b.id);
        }) })
      ] }) })
    ] }) })
  ] });
};
function safeGetTime(value) {
  if (!value) return 0;
  let date;
  if (value instanceof Date) {
    date = value;
  } else if (typeof value === "number") {
    date = new Date(value);
  } else if (typeof value === "string") {
    date = new Date(value);
  } else if (typeof value === "object") {
    if (typeof value.seconds === "number") {
      date = new Date(value.seconds * 1e3);
    } else if (typeof value.toDate === "function") {
      try {
        date = value.toDate();
      } catch (e) {
        return 0;
      }
    } else {
      date = new Date(value.toString());
    }
  } else {
    return 0;
  }
  const time = date.getTime();
  return isNaN(time) ? 0 : time;
}
function safeFormatDate(value, locale = "en-US", options) {
  if (!value) return "N/A";
  let date;
  if (value instanceof Date) {
    date = value;
  } else if (typeof value === "number") {
    date = new Date(value);
  } else if (typeof value === "string") {
    date = new Date(value);
  } else if (typeof value === "object") {
    if (typeof value.seconds === "number") {
      date = new Date(value.seconds * 1e3);
    } else if (typeof value.toDate === "function") {
      try {
        date = value.toDate();
      } catch (e) {
        return "N/A";
      }
    } else {
      date = new Date(value.toString());
    }
  } else {
    return "N/A";
  }
  if (isNaN(date.getTime())) {
    return "N/A";
  }
  try {
    return date.toLocaleString(locale, options);
  } catch (e) {
    try {
      return date.toISOString();
    } catch (err) {
      return "N/A";
    }
  }
}
function AdminPortal({
  users,
  limits,
  demands = [],
  deadlines = [],
  bookings = [],
  dealerBookings = [],
  pakistanBondResults = [],
  thaiLotteryResults = [],
  currentUser,
  hardFavoriteNumbers = [],
  onAddHardFavorite,
  onRemoveHardFavorite,
  onCancelBookingByAdmin,
  onCancelDealerBookingByAdmin,
  onAssignDealer,
  onRecharge,
  onSetLimit,
  onDeleteLimit,
  onApproveDemand,
  onRejectDemand,
  onSetDeadline,
  onDeleteDeadline,
  onAddResult,
  onEditResult,
  onDeleteResult
}) {
  const isSuper = (currentUser == null ? void 0 : currentUser.role) === "superAdmin" || (currentUser == null ? void 0 : currentUser.role) === "admin" || (currentUser == null ? void 0 : currentUser.isAdmin) && (currentUser == null ? void 0 : currentUser.role) !== "dataEntryAdmin";
  const defaultTab = isSuper ? "demands_bookings" : "results";
  const [activeAdminTab, setActiveAdminTab] = reactExports.useState(defaultTab);
  reactExports.useEffect(() => {
    if (!isSuper && (activeAdminTab === "demands_bookings" || activeAdminTab === "users_finance" || activeAdminTab === "limits_deadlines" || activeAdminTab === "admin_management")) {
      setActiveAdminTab("results");
    }
  }, [isSuper, activeAdminTab]);
  const [newAdminName, setNewAdminName] = reactExports.useState("");
  const [newAdminPhone, setNewAdminPhone] = reactExports.useState("");
  const [newAdminEmail, setNewAdminEmail] = reactExports.useState("");
  const [newAdminPassword, setNewAdminPassword] = reactExports.useState("");
  const [newAdminRole, setNewAdminRole] = reactExports.useState("dataEntryAdmin");
  const [adminManageError, setAdminManageError] = reactExports.useState("");
  const [adminManageSuccess, setAdminManageSuccess] = reactExports.useState("");
  const [rechargeEmail, setRechargeEmail] = reactExports.useState("");
  const [rechargeAmount, setRechargeAmount] = reactExports.useState("");
  const [rechargeReason, setRechargeReason] = reactExports.useState("");
  const [rechargeError, setRechargeError] = reactExports.useState("");
  const [rechargeSuccess, setRechargeSuccess] = reactExports.useState("");
  const [limitCategory, setLimitCategory] = reactExports.useState("pakistan_bond");
  const [limitNumber, setLimitNumber] = reactExports.useState("");
  const [limitAmount, setLimitAmount] = reactExports.useState("");
  const [firstPrizeLimit, setFirstPrizeLimit] = reactExports.useState("");
  const [secondPrizeLimit, setSecondPrizeLimit] = reactExports.useState("");
  const [limitError, setLimitError] = reactExports.useState("");
  const [limitSuccess, setLimitSuccess] = reactExports.useState("");
  const [editingDrawId, setEditingDrawId] = reactExports.useState("");
  const [deadlineCategory, setDeadlineCategory] = reactExports.useState("pakistan_bond");
  const [deadlineTitle, setDeadlineTitle] = reactExports.useState("بکنگ فائنل کھل گئی ہے");
  const [deadlineDateTime, setDeadlineDateTime] = reactExports.useState("");
  const [deadlineStatus, setDeadlineStatus] = reactExports.useState("open");
  const [deadlineError, setDeadlineError] = reactExports.useState("");
  const [deadlineSuccess, setDeadlineSuccess] = reactExports.useState("");
  const [nextPrizeBondValue, setNextPrizeBondValue] = reactExports.useState("");
  const [nextDrawCity, setNextDrawCity] = reactExports.useState("");
  const [nextDrawNumber, setNextDrawNumber] = reactExports.useState("");
  const [nextDrawDate, setNextDrawDate] = reactExports.useState("");
  const resetDeadlineForm = () => {
    setEditingDrawId("");
    setDeadlineTitle("بکنگ فائنل کھل گئی ہے");
    setDeadlineDateTime("");
    setDeadlineStatus("open");
    setNextPrizeBondValue("");
    setNextDrawCity("");
    setNextDrawNumber("");
    setNextDrawDate("");
  };
  reactExports.useEffect(() => {
    if (!editingDrawId) {
      const existing = deadlines.find((d) => d.category === deadlineCategory);
      if (existing) {
        setDeadlineTitle(existing.titleUrdu);
        setDeadlineDateTime(existing.deadlineIso);
        setDeadlineStatus(existing.status || "open");
        setNextPrizeBondValue(existing.nextPrizeBondValue || "");
        setNextDrawCity(existing.nextDrawCity || "");
        setNextDrawNumber(existing.nextDrawNumber || "");
        setNextDrawDate(existing.nextDrawDate || "");
      } else {
        setNextPrizeBondValue("");
        setNextDrawCity("");
        setNextDrawNumber("");
        setNextDrawDate("");
      }
    }
  }, [deadlineCategory, deadlines, editingDrawId]);
  const [demandError, setDemandError] = reactExports.useState("");
  const [demandSuccess, setDemandSuccess] = reactExports.useState("");
  const [cancelSuccess, setCancelSuccess] = reactExports.useState("");
  const [cancelError, setCancelError] = reactExports.useState("");
  const [whatsappVal, setWhatsappVal] = reactExports.useState("");
  const [whatsappSuccess, setWhatsappSuccess] = reactExports.useState("");
  const [whatsappError, setWhatsappError] = reactExports.useState("");
  const [adminEmailInput, setAdminEmailInput] = reactExports.useState("");
  const [adminCurrentPasswordInput, setAdminCurrentPasswordInput] = reactExports.useState("");
  const [adminPasswordInput, setAdminPasswordInput] = reactExports.useState("");
  const [adminConfirmPasswordInput, setAdminConfirmPasswordInput] = reactExports.useState("");
  const [passwordSuccess, setPasswordSuccess] = reactExports.useState("");
  const [passwordError, setPasswordError] = reactExports.useState("");
  const [userSearchQuery, setUserSearchQuery] = reactExports.useState("");
  const [foundUser, setFoundUser] = reactExports.useState(null);
  const [userNewPassword, setUserNewPassword] = reactExports.useState("");
  const [userConfirmPassword, setUserConfirmPassword] = reactExports.useState("");
  const [userPasswordSuccess, setUserPasswordSuccess] = reactExports.useState("");
  const [userPasswordError, setUserPasswordError] = reactExports.useState("");
  const [resultSuccess, setResultSuccess] = reactExports.useState("");
  const [resultError, setResultError] = reactExports.useState("");
  const [resultViewCategory, setResultViewCategory] = reactExports.useState("pakistan_bond");
  const [resultSearchQuery, setResultSearchQuery] = reactExports.useState("");
  const [resultFormOpen, setResultFormOpen] = reactExports.useState(false);
  const [resultFormMode, setResultFormMode] = reactExports.useState("add");
  const [editingResultId, setEditingResultId] = reactExports.useState("");
  const [editingResultDrawId, setEditingResultDrawId] = reactExports.useState(void 0);
  const [resCategory, setResCategory] = reactExports.useState("pakistan_bond");
  const [resBondValue, setResBondValue] = reactExports.useState("Rs. 200");
  const [resDrawNoOnly, setResDrawNoOnly] = reactExports.useState("");
  const [resDrawNo, setResDrawNo] = reactExports.useState("");
  const [resDate, setResDate] = reactExports.useState("");
  const [resCity, setResCity] = reactExports.useState("");
  const [resFirstPrize, setResFirstPrize] = reactExports.useState("");
  const [resSecondPrizesStr, setResSecondPrizesStr] = reactExports.useState("");
  const [resLast2Digits, setResLast2Digits] = reactExports.useState("");
  const [resFront3Digits, setResFront3Digits] = reactExports.useState("");
  const [resBack3Digits, setResBack3Digits] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (resCategory === "pakistan_bond") {
      const val = resBondValue ? ` Rs. ${resBondValue.replace(/Rs\./i, "").trim()}` : "";
      if (resDrawNoOnly) {
        setResDrawNo(`ڈرا نمبر ${resDrawNoOnly} (بانڈ${val})`);
      }
    }
  }, [resBondValue, resDrawNoOnly, resCategory]);
  reactExports.useEffect(() => {
    if (resCategory === "thailand_lottery" && resFirstPrize) {
      const prize = resFirstPrize.trim();
      if (prize.length >= 6) {
        setResLast2Digits(prize.substring(4));
        setResFront3Digits(prize.substring(0, 3));
        setResBack3Digits(prize.substring(3));
      }
    }
  }, [resFirstPrize, resCategory]);
  const resetResultForm = () => {
    setResCategory(resultViewCategory);
    setResBondValue("Rs. 200");
    setResDrawNoOnly("");
    setResDrawNo("");
    setResDate("");
    setResCity(resultViewCategory === "thailand_lottery" ? "بنکاک" : "");
    setResFirstPrize("");
    setResSecondPrizesStr("");
    setResLast2Digits("");
    setResFront3Digits("");
    setResBack3Digits("");
    setEditingResultId("");
    setEditingResultDrawId(void 0);
  };
  const handleSaveResult = async (e) => {
    e.preventDefault();
    setResultSuccess("");
    setResultError("");
    if (resCategory === "pakistan_bond") {
      if (!resBondValue || !resDrawNoOnly || !resDate || !resCity || !resFirstPrize) {
        setResultError("براہ کرم تمام لازمی فیلڈز پُر کریں۔");
        return;
      }
      if (resFirstPrize.length < 5) {
        setResultError("پہلا انعام کم از کم 5 ہندسوں کا ہونا چاہیے۔");
        return;
      }
    } else {
      if (!resDrawNo || !resDate || !resCity || !resFirstPrize || !resLast2Digits || !resFront3Digits || !resBack3Digits) {
        setResultError("تھائی لاٹری کے لیے تمام فیلڈز لازمی ہیں۔");
        return;
      }
    }
    const secondsArray = resSecondPrizesStr.split(",").map((p) => p.trim()).filter((p) => p.length > 0);
    const generatedId = resultFormMode === "add" ? resCategory === "pakistan_bond" ? `pk-draw-${resBondValue.replace(/[\s,.]+/g, "").toLowerCase()}-${resDrawNoOnly}` : `thai-${Date.now()}` : editingResultId;
    const normalizeDrawValue = (v) => (v || "").replace(/[^0-9]/g, "");
    const matchedDeadline = deadlines.find((d) => {
      if (d.category !== resCategory) return false;
      if (resCategory === "pakistan_bond") {
        return normalizeDrawValue(d.nextPrizeBondValue) === normalizeDrawValue(resBondValue) && (!d.nextDrawNumber || normalizeDrawValue(d.nextDrawNumber) === normalizeDrawValue(resDrawNoOnly));
      }
      return !d.nextDrawNumber || normalizeDrawValue(d.nextDrawNumber) === normalizeDrawValue(resDrawNo);
    });
    const resultDrawId = resultFormMode === "edit" ? editingResultDrawId : (matchedDeadline == null ? void 0 : matchedDeadline.drawId) || (matchedDeadline == null ? void 0 : matchedDeadline.id);
    const finalDate = normalizeDateInput(resDate) || resDate.trim();
    let resultDoc;
    if (resCategory === "pakistan_bond") {
      const formattedBondVal = resBondValue.toLowerCase().startsWith("rs.") ? resBondValue : `Rs. ${resBondValue}`;
      resultDoc = {
        id: generatedId,
        category: "pakistan_bond",
        bondValue: formattedBondVal,
        drawNoOnly: resDrawNoOnly,
        drawNo: resDrawNo || `ڈرا نمبر ${resDrawNoOnly} (بانڈ ${formattedBondVal})`,
        date: finalDate,
        city: resCity,
        firstPrize: resFirstPrize,
        secondPrizes: secondsArray,
        ...resultDrawId ? { drawId: resultDrawId } : {}
      };
    } else {
      resultDoc = {
        id: generatedId,
        category: "thailand_lottery",
        drawNo: resDrawNo,
        date: finalDate,
        city: resCity,
        firstPrize: resFirstPrize,
        secondPrizes: secondsArray,
        last2Digits: resLast2Digits,
        front3Digits: resFront3Digits,
        back3Digits: resBack3Digits,
        ...resultDrawId ? { drawId: resultDrawId } : {}
      };
    }
    const response = resultFormMode === "add" ? await onAddResult(resultDoc) : await onEditResult(resultDoc);
    if (response.success) {
      setResultSuccess(resultFormMode === "add" ? "قرعہ اندازی کا نتیجہ کامیابی سے شامل کر دیا گیا ہے۔" : "قرعہ اندازی کا نتیجہ کامیابی سے اپ ڈیٹ کر دیا گیا ہے۔");
      setResultFormOpen(false);
      resetResultForm();
    } else {
      setResultError(response.error || "نتیجہ محفوظ کرنے میں خرابی پیش آئی۔");
    }
  };
  const handleEditClick = (draw) => {
    setResultSuccess("");
    setResultError("");
    setResultFormMode("edit");
    setEditingResultId(draw.id);
    setEditingResultDrawId(draw.drawId);
    setResCategory(draw.category);
    setResDate(draw.date);
    setResCity(draw.city);
    setResFirstPrize(draw.firstPrize);
    setResSecondPrizesStr(draw.secondPrizes.join(", "));
    if (draw.category === "pakistan_bond") {
      const pb = draw;
      setResBondValue(pb.bondValue);
      setResDrawNoOnly(pb.drawNoOnly);
      setResDrawNo(pb.drawNo);
    } else {
      const tl = draw;
      setResDrawNo(tl.drawNo);
      setResLast2Digits(tl.last2Digits);
      setResFront3Digits(tl.front3Digits);
      setResBack3Digits(tl.back3Digits);
    }
    setResultFormOpen(true);
  };
  const handleDeleteClick = async (id, category) => {
    if (!window.confirm("کیا آپ واقعی یہ قرعہ اندازی کا نتیجہ حذف کرنا چاہتے ہیں؟")) return;
    setResultSuccess("");
    setResultError("");
    const res = await onDeleteResult(id, category);
    if (res.success) {
      setResultSuccess("قرعہ اندازی کا نتیجہ کامیابی سے حذف کر دیا گیا ہے۔");
    } else {
      setResultError(res.error || "نتیجہ حذف کرنے میں خرابی پیش آئی۔");
    }
  };
  const handleSearchUser = () => {
    setUserPasswordError("");
    setUserPasswordSuccess("");
    setFoundUser(null);
    const queryClean = userSearchQuery.trim().toLowerCase();
    if (!queryClean) {
      setUserPasswordError("براہ کرم تلاش کرنے کے لئے ای میل یا موبائل نمبر درج کریں۔ (Please enter an email or mobile number to search.)");
      return;
    }
    const matched = users.find(
      (u) => (u.email || "").toLowerCase().trim() === queryClean || (u.phone || "").trim() === queryClean
    );
    if (matched) {
      setFoundUser(matched);
      setUserNewPassword("");
      setUserConfirmPassword("");
    } else {
      setUserPasswordError("صارف نہیں ملا۔ براہ کرم درج کردہ معلومات درست کریں۔ (User not found.)");
    }
  };
  const handleUserPasswordReset = async (e) => {
    e.preventDefault();
    setUserPasswordError("");
    setUserPasswordSuccess("");
    if (!foundUser) {
      setUserPasswordError("براہ کرم پہلے صارف تلاش کریں۔");
      return;
    }
    if (userNewPassword.length < 8) {
      setUserPasswordError("پاس ورڈ کم از کم 8 حروف کا ہونا چاہیے۔ (Password must be at least 8 characters.)");
      return;
    }
    if (userNewPassword !== userConfirmPassword) {
      setUserPasswordError("پاس ورڈز آپس میں میل نہیں کھاتے (Password confirmation does not match.)");
      return;
    }
    const success = await updateCustomerPassword(foundUser.email, userNewPassword);
    if (success) {
      setUserPasswordSuccess(`پاس ورڈ کامیابی سے تبدیل کر دیا گیا ہے۔ (Password updated successfully for ${foundUser.name})`);
      setUserNewPassword("");
      setUserConfirmPassword("");
      setFoundUser(null);
      setUserSearchQuery("");
    } else {
      setUserPasswordError("پاس ورڈ تبدیل کرنے میں خرابی پیش آئی۔ براہ کرم انٹرنیٹ چیک کریں۔ (Firestore update failed.)");
    }
  };
  reactExports.useEffect(() => {
    setWhatsappVal(getSupportWhatsAppNumber());
    setAdminEmailInput((currentUser == null ? void 0 : currentUser.email) || getAdminConfiguredEmail());
  }, [currentUser]);
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordSuccess("");
    setPasswordError("");
    if (!adminCurrentPasswordInput.trim()) {
      setPasswordError("برائے مہربانی موجودہ پاس ورڈ درج کریں۔ (Please enter current password.)");
      return;
    }
    if (!adminPasswordInput.trim() || adminPasswordInput.trim().length < 6) {
      setPasswordError("نیا پاس ورڈ کم از کم 6 ہندسوں کا ہونا ضروری ہے۔ (New password must be at least 6 characters.)");
      return;
    }
    if (adminPasswordInput !== adminConfirmPasswordInput) {
      setPasswordError("پاس ورڈ کی تصدیق مماثل نہیں ہے۔ (Confirm password does not match.)");
      return;
    }
    const res = await changeLoggedAdminPassword(adminCurrentPasswordInput.trim(), adminPasswordInput.trim());
    if (res.success) {
      setPasswordSuccess("کامیاب: پاس ورڈ کامیابی سے تبدیل کر دیا گیا ہے۔ (Success: Password updated successfully.)");
      setAdminCurrentPasswordInput("");
      setAdminPasswordInput("");
      setAdminConfirmPasswordInput("");
    } else {
      setPasswordError(res.error || "پاس ورڈ تبدیل کرنے میں خرابی پیش آئی۔");
    }
  };
  const handleCreateAdminSubmit = async (e) => {
    e.preventDefault();
    setAdminManageError("");
    setAdminManageSuccess("");
    if (!newAdminName.trim() || !newAdminPhone.trim() || !newAdminEmail.trim() || !newAdminPassword.trim()) {
      setAdminManageError("براہ کرم تمام فیلڈز پُر کریں۔ (Please fill in all fields.)");
      return;
    }
    if (newAdminPassword.length < 6) {
      setAdminManageError("پاس ورڈ کم از کم 6 ہندسوں کا ہونا ضروری ہے۔ (Password must be at least 6 characters.)");
      return;
    }
    const emailClean = newAdminEmail.toLowerCase().trim();
    try {
      const uid = await registerInAuthOnly(emailClean, newAdminPassword);
      if (!uid) {
        throw new Error("ایڈمن لاگ ان بنانے میں ناکامی (Failed to create auth user)");
      }
      const isDealerCreation = newAdminRole === "dealer";
      const newAdminDoc = {
        uid,
        email: emailClean,
        name: newAdminName.trim(),
        phone: newAdminPhone.trim(),
        city: isDealerCreation ? "Authorized Dealer" : "Enterprise HQ",
        balance: 0,
        isAdmin: !isDealerCreation,
        role: newAdminRole,
        active: true,
        lastLogin: null
      };
      await set(ref(db, `users/${uid}`), newAdminDoc);
      setAdminManageSuccess(
        isDealerCreation ? `کامیاب: نیا مجاز ڈیلر ${newAdminName} کامیابی سے بنا دیا گیا ہے اور لاگ ان کے لیے تیار ہے۔` : `کامیاب: نیا ایڈمن ${newAdminName} کامیابی سے بنا دیا گیا ہے اور لاگ ان کے لیے تیار ہے۔`
      );
      setNewAdminName("");
      setNewAdminPhone("");
      setNewAdminEmail("");
      setNewAdminPassword("");
    } catch (err) {
      console.error("Failed to create admin:", err);
      setAdminManageError((err == null ? void 0 : err.message) || "نیا ایڈمن بنانے میں خرابی پیش آئی۔");
    }
  };
  const handleDeleteAdmin = async (email) => {
    var _a;
    const emailClean = email.toLowerCase().trim();
    if (isSuperOwner(emailClean)) {
      setAdminManageError("سپر مالک (Super Owner) اکاؤنٹ کا ڈیٹا بیس ریکارڈ حذف نہیں کیا جا سکتا۔");
      return;
    }
    if (emailClean === ((_a = currentUser == null ? void 0 : currentUser.email) == null ? void 0 : _a.toLowerCase().trim())) {
      setAdminManageError("آپ ایڈمن پورٹل سے اپنا اکاؤنٹ خود حذف نہیں کر سکتے۔ ذاتی پروفائل اسکرین استعمال کریں۔");
      return;
    }
    if (!currentUser || !currentUser.isAdmin && currentUser.role !== "superAdmin") {
      setAdminManageError("صرف سپر ایڈمن کو صارفین کے ریکارڈز حذف کرنے کا اختیار حاصل ہے۔");
      return;
    }
    setAdminManageError("");
    setAdminManageSuccess("");
    try {
      const res = await adminDeleteUserRecord(emailClean, currentUser);
      if (res.success) {
        setAdminManageSuccess(res.message || `کامیاب: ایڈمن (${email}) کا ڈیٹا بیس پروفائل اور تمام رسائیاں حذف کر دی گئی ہیں۔`);
      } else {
        setAdminManageError(res.error || "ایڈمن ریکارڈ حذف کرنے میں خرابی پیش آئی۔");
      }
    } catch (err) {
      console.error("Delete admin error:", err);
      setAdminManageError((err == null ? void 0 : err.message) || "ایڈمن ریکارڈ حذف کرنے میں خرابی پیش آئی۔");
    }
  };
  const handleToggleActiveAdmin = async (email, currentActive) => {
    var _a;
    const emailClean = email.toLowerCase().trim();
    if (isSuperOwner(emailClean) || emailClean === ((_a = currentUser == null ? void 0 : currentUser.email) == null ? void 0 : _a.toLowerCase().trim())) {
      setAdminManageError("سپر مالک (Super Owner) یا ذاتی اکاؤنٹ کے سٹیٹس میں تبدیلی نہیں کی جا سکتی۔");
      return;
    }
    setAdminManageError("");
    setAdminManageSuccess("");
    try {
      const isDeactivating = currentActive !== false;
      const cached = users.find((u) => (u.email || "").toLowerCase() === emailClean);
      if (!cached || !cached.uid) {
        throw new Error("ایڈمن کا UID نہیں ملا۔ (Admin UID not found.)");
      }
      await update(ref(db, `users/${cached.uid}`), {
        active: !isDeactivating
      });
      setAdminManageSuccess(`ایڈمن اکاؤنٹ کامیابی سے ${!isDeactivating ? "فعال (Activate)" : "غیر فعال (Deactivate)"} کر دیا گیا ہے۔`);
    } catch (err) {
      console.error("Toggle active status error:", err);
      setAdminManageError((err == null ? void 0 : err.message) || "سٹیٹس تبدیل کرنے میں خرابی پیش آئی۔");
    }
  };
  const handleChangeAdminRole = async (email, roleToSet) => {
    var _a;
    const emailClean = email.toLowerCase().trim();
    if (isSuperOwner(emailClean) || emailClean === ((_a = currentUser == null ? void 0 : currentUser.email) == null ? void 0 : _a.toLowerCase().trim())) {
      setAdminManageError("سپر مالک (Super Owner) کا رول تبدیل نہیں کیا جا سکتا۔");
      return;
    }
    setAdminManageError("");
    setAdminManageSuccess("");
    try {
      const cached = users.find((u) => (u.email || "").toLowerCase() === emailClean);
      if (!cached || !cached.uid) {
        throw new Error("صارف کا UID نہیں ملا۔ (User UID not found.)");
      }
      const isDealer = roleToSet === "dealer";
      const isCustomer = roleToSet === "customer";
      await update(ref(db, `users/${cached.uid}`), {
        role: roleToSet,
        isAdmin: !isDealer && !isCustomer
      });
      const roleLabel = roleToSet === "superAdmin" ? "Super Admin" : roleToSet === "dataEntryAdmin" ? "Data Entry Admin" : roleToSet === "dealer" ? "Authorized Dealer" : "Customer";
      setAdminManageSuccess(`رول کامیابی سے تبدیل کر کے ${roleLabel} کر دیا گیا ہے۔`);
    } catch (err) {
      console.error("Change role error:", err);
      setAdminManageError((err == null ? void 0 : err.message) || "رول تبدیل کرنے میں خرابی پیش آئی۔");
    }
  };
  const handleWhatsappSubmit = (e) => {
    e.preventDefault();
    setWhatsappSuccess("");
    setWhatsappError("");
    if (!whatsappVal.trim()) {
      setWhatsappError("برائے مہربانی ایک درست واٹس ایپ نمبر درج کریں۔");
      return;
    }
    setSupportWhatsAppNumber(whatsappVal);
    const updated = getSupportWhatsAppNumber();
    setWhatsappVal(updated);
    setWhatsappSuccess(`کامیاب: واٹس ایپ سپورٹ نمبر تبدیل کر کے +${updated} کر دیا گیا ہے۔ تمام کسٹمرز کے رابطہ لنکس اپ ڈیٹ ہو چکے ہیں۔`);
  };
  const handleWalletAction = async (action) => {
    setRechargeError("");
    setRechargeSuccess("");
    if (!rechargeEmail.trim() || !rechargeAmount.trim()) {
      setRechargeError("ای میل اور رقم درج کرنا ضروری ہے۔");
      return;
    }
    const amt = parseInt(rechargeAmount, 10);
    if (isNaN(amt) || amt <= 0) {
      setRechargeError("برائے مہربانی ایک درست مثبت رقم درج کریں۔");
      return;
    }
    const finalAmount = action === "deduct" ? -amt : amt;
    const res = await onRecharge(rechargeEmail.trim(), finalAmount, rechargeReason.trim());
    if (res.success) {
      setRechargeSuccess(action === "deduct" ? `کامیاب: Rs. ${amt.toLocaleString()} اکاؤنٹ سے منہا کر دیے گئے ہیں۔` : `کامیاب: Rs. ${amt.toLocaleString()} اکاؤنٹ میں شامل کر دیے گئے ہیں۔`);
      setRechargeAmount("");
      setRechargeReason("");
    } else {
      setRechargeError(res.error || "والٹ ٹرانزیکشن میں خرابی پیش آئی۔");
    }
  };
  const handleLimitSubmit = async (e) => {
    e.preventDefault();
    setLimitError("");
    setLimitSuccess("");
    const cleanNum = limitNumber.trim();
    if (!cleanNum) {
      setLimitError("براہ کرم مخصوص نمبر درج کریں۔");
      return;
    }
    if (!firstPrizeLimit.trim() && !secondPrizeLimit.trim() && !limitAmount.trim()) {
      setLimitError("First Prize Amount Limit اور Second Prize Amount Limit دونوں درج کرنا لازمی ہیں۔ (0 کا مطلب لامحدود/اوپن ہے)");
      return;
    }
    const firstVal = firstPrizeLimit.trim() !== "" ? parseInt(firstPrizeLimit, 10) : limitAmount ? parseInt(limitAmount, 10) : 0;
    const secondVal = secondPrizeLimit.trim() !== "" ? parseInt(secondPrizeLimit, 10) : limitAmount ? parseInt(limitAmount, 10) : 0;
    if (isNaN(firstVal) || firstVal < 0) {
      setLimitError("First Prize Amount Limit درست مثبت رقم (یا 0) ہونی چاہیے۔");
      return;
    }
    if (isNaN(secondVal) || secondVal < 0) {
      setLimitError("Second Prize Amount Limit درست مثبت رقم (یا 0) ہونی چاہیے۔");
      return;
    }
    const res = await onSetLimit(limitCategory, cleanNum, firstVal, secondVal);
    if (res && res.error) {
      setLimitError(res.error);
    } else {
      setLimitSuccess(`کامیاب: نمبر #${cleanNum} کے لئے First Prize Limit: Rs. ${firstVal.toLocaleString()} اور Second Prize Limit: Rs. ${secondVal.toLocaleString()} کامیابی سے محفوظ ہو گئی ہے۔`);
      setLimitNumber("");
      setFirstPrizeLimit("");
      setSecondPrizeLimit("");
      setLimitAmount("");
    }
  };
  const handleDeadlineSubmit = (e) => {
    e.preventDefault();
    setDeadlineError("");
    setDeadlineSuccess("");
    if (!deadlineDateTime) {
      setDeadlineError("براہ کرم تاریخ اور وقت منتخب کریں۔");
      return;
    }
    const drawIdToSave = editingDrawId || (deadlineCategory === "pakistan_bond" ? `pk-bond-${nextPrizeBondValue ? nextPrizeBondValue.replace(/\D/g, "") : Date.now()}` : deadlineCategory);
    onSetDeadline(
      deadlineCategory,
      deadlineDateTime,
      deadlineTitle || "بکنگ فائنل کھل گئی ہے",
      deadlineStatus,
      nextPrizeBondValue,
      nextDrawCity,
      nextDrawNumber,
      nextDrawDate,
      drawIdToSave
    );
    setDeadlineSuccess(`کامیاب: ${deadlineCategory === "pakistan_bond" ? "پاکستان بانڈ ڈرا" : "تھائی لینڈ لاٹری"} کی سیٹنگز کامیابی سے محفوظ ہو گئی ہیں!`);
    resetDeadlineForm();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 font-sans text-right max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-500/10 border border-amber-500/35 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row shadow-sm gap-4 items-center sm:items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-amber-500/20 p-3 rounded-2xl text-amber-600 sm:order-last", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-10 h-10" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-amber-900 flex items-center justify-end gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ایڈمن کنٹرول پینل" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 text-xs mt-2 leading-relaxed max-w-lg", children: "قریشی صاحب! یہاں سے آپ موصولہ ڈیمانڈز قبول یا مسترد کر سکتے ہیں، کسی بھی رجسٹرڈ کسٹمر کے اکاؤنٹ میں رقم ریچارج کر سکتے ہیں، اور خاص نمبرز پر زیادہ سے زیادہ بکنگ کی لمٹ لگا سکتے ہیں۔" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-end gap-2 border-b border-slate-200 pb-3", children: [
      isSuper && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveAdminTab("admin_management"),
          className: `px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${activeAdminTab === "admin_management" ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/10 font-bold" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ایڈمنز کا انتظام (Admins)" })
          ]
        }
      ),
      isSuper && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveAdminTab("users_finance"),
          className: `px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${activeAdminTab === "users_finance" ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/10" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "صارفین اور فنانس (Users)" })
          ]
        }
      ),
      isSuper && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveAdminTab("limits_deadlines"),
          className: `px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${activeAdminTab === "limits_deadlines" ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/10" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "لمٹس اور ڈیڈ لائنز (Limits)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveAdminTab("results"),
          className: `px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${activeAdminTab === "results" ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/10" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نتائج کا انتظام (Results)" })
          ]
        }
      ),
      isSuper && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          id: "admin-tab-dealership-btn",
          onClick: () => setActiveAdminTab("dealership"),
          className: `px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${activeAdminTab === "dealership" ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/10" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ڈیلرشپ انتظام (Dealership)" })
          ]
        }
      ),
      isSuper && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveAdminTab("demands_bookings"),
          className: `px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${activeAdminTab === "demands_bookings" ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/10" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ڈیمانڈز اور بکنگز (Demands)" })
          ]
        }
      )
    ] }),
    activeAdminTab === "demands_bookings" && isSuper && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminDemandsBookingsTab,
      {
        users,
        demands,
        bookings,
        demandError,
        demandSuccess,
        cancelError,
        cancelSuccess,
        onApproveDemand,
        onRejectDemand,
        onCancelBookingByAdmin,
        safeGetTime,
        safeFormatDate
      }
    ),
    activeAdminTab === "dealership" && isSuper && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminDealershipTab,
      {
        dealers: users.filter((u) => u.role === "dealer"),
        allUsers: users,
        dealerBookings: dealerBookings || [],
        onAssignDealer: onAssignDealer || assignDealerRole,
        onCancelDealerBookingByAdmin: onCancelDealerBookingByAdmin || cancelDealerBookingByAdmin
      }
    ),
    activeAdminTab === "users_finance" && isSuper && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminUsersFinanceTab,
      {
        users,
        dealerBookings: dealerBookings || [],
        rechargeError,
        rechargeSuccess,
        rechargeEmail,
        setRechargeEmail,
        rechargeAmount,
        setRechargeAmount,
        rechargeReason,
        setRechargeReason,
        handleWalletAction,
        whatsappError,
        whatsappSuccess,
        whatsappVal,
        setWhatsappVal,
        handleWhatsappSubmit,
        passwordError,
        passwordSuccess,
        adminCurrentPasswordInput,
        setAdminCurrentPasswordInput,
        adminEmailInput,
        adminPasswordInput,
        setAdminPasswordInput,
        adminConfirmPasswordInput,
        setAdminConfirmPasswordInput,
        handlePasswordSubmit,
        userPasswordError,
        userPasswordSuccess,
        userSearchQuery,
        setUserSearchQuery,
        foundUser,
        setFoundUser,
        handleSearchUser,
        userNewPassword,
        setUserNewPassword,
        userConfirmPassword,
        setUserConfirmPassword,
        handleUserPasswordReset,
        onDeleteUserDatabaseRecord: handleDeleteAdmin
      }
    ),
    activeAdminTab === "limits_deadlines" && isSuper && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminLimitsDeadlinesTab,
      {
        limits,
        deadlines,
        hardFavoriteNumbers,
        onAddHardFavorite,
        onRemoveHardFavorite,
        limitError,
        limitSuccess,
        limitCategory,
        setLimitCategory,
        limitNumber,
        setLimitNumber,
        limitAmount,
        setLimitAmount,
        firstPrizeLimit,
        setFirstPrizeLimit,
        secondPrizeLimit,
        setSecondPrizeLimit,
        handleLimitSubmit,
        onDeleteLimit,
        deadlineError,
        deadlineSuccess,
        editingDrawId,
        resetDeadlineForm,
        deadlineCategory,
        setDeadlineCategory,
        deadlineTitle,
        setDeadlineTitle,
        deadlineDateTime,
        setDeadlineDateTime,
        deadlineStatus,
        setDeadlineStatus,
        nextPrizeBondValue,
        setNextPrizeBondValue,
        nextDrawCity,
        setNextDrawCity,
        nextDrawNumber,
        setNextDrawNumber,
        nextDrawDate,
        setNextDrawDate,
        handleDeadlineSubmit,
        onSetDeadline,
        onDeleteDeadline,
        setEditingDrawId,
        safeGetTime,
        safeFormatDate
      }
    ),
    activeAdminTab === "results" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminResultsTab,
      {
        pakistanBondResults,
        thaiLotteryResults,
        resultError,
        resultSuccess,
        resultFormOpen,
        setResultFormOpen,
        resultFormMode,
        setResultFormMode,
        resCategory,
        setResCategory,
        resDate,
        setResDate,
        resCity,
        setResCity,
        resBondValue,
        setResBondValue,
        resDrawNoOnly,
        setResDrawNoOnly,
        resDrawNo,
        setResDrawNo,
        resFirstPrize,
        setResFirstPrize,
        resLast2Digits,
        setResLast2Digits,
        resFront3Digits,
        setResFront3Digits,
        resBack3Digits,
        setResBack3Digits,
        resSecondPrizesStr,
        setResSecondPrizesStr,
        resetResultForm,
        handleSaveResult,
        resultSearchQuery,
        setResultSearchQuery,
        resultViewCategory,
        setResultViewCategory,
        handleEditClick,
        handleDeleteClick
      }
    ),
    activeAdminTab === "admin_management" && isSuper && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminManagementTab,
      {
        users,
        adminManageError,
        adminManageSuccess,
        newAdminName,
        setNewAdminName,
        newAdminPhone,
        setNewAdminPhone,
        newAdminEmail,
        setNewAdminEmail,
        newAdminPassword,
        setNewAdminPassword,
        newAdminRole,
        setNewAdminRole,
        handleCreateAdminSubmit,
        handleDeleteAdmin,
        handleToggleActiveAdmin,
        handleChangeAdminRole,
        safeFormatDate
      }
    )
  ] });
}
const AIGeneratorTab = ({
  genCategory,
  setGenCategory,
  genFormula,
  setGenFormula,
  genPkBondValue,
  setGenPkBondValue,
  genPkCity,
  setGenPkCity,
  genThaiDrawDate,
  setGenThaiDrawDate,
  genThaiMonth,
  setGenThaiMonth,
  genThaiYear,
  setGenThaiYear,
  availableThaiYears,
  sampleSize,
  isGenerating,
  generatedResult,
  generateError,
  sessionGeneratedNumbers,
  onResetSessionHistory,
  handleGenerate,
  quickFirstAmt,
  setQuickFirstAmt,
  quickSecondAmt,
  setQuickSecondAmt,
  bookingStatus,
  handleQuickBook
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-right", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-4 sm:p-6 rounded-2xl border border-slate-700/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 border-b border-slate-700/60 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] bg-slate-900 text-amber-400 font-mono px-2.5 py-1 rounded-lg border border-amber-500/20 flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "ریکارڈز نمونہ: ",
            sampleSize,
            " ڈراز"
          ] }) }),
          sessionGeneratedNumbers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: onResetSessionHistory,
              title: "سیشن ہسٹری ری سیٹ کریں",
              className: "text-[11px] bg-slate-900 hover:bg-slate-700 text-slate-300 hover:text-white px-2 py-1 rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3 h-3 text-amber-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "سیشن ری سیٹ (",
                  sessionGeneratedNumbers.length,
                  ")"
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-base sm:text-lg font-bold text-white flex items-center justify-end gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "اے آئی سمارٹ لکی نمبر کیلکولیٹر (حقیقی تاریخی تجزیہ)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "w-5 h-5 text-amber-400" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-2", children: "کیٹیگری منتخب کریں (Choose Draw):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setGenCategory("pakistan_bond"),
                  className: `py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${genCategory === "pakistan_bond" ? "bg-slate-900 border-amber-500 text-amber-400 shadow-sm" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80"}`,
                  children: "پاکستان پرائز بانڈ (6 ہندسے)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setGenCategory("thailand_lottery"),
                  className: `py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${genCategory === "thailand_lottery" ? "bg-slate-900 border-amber-500 text-amber-400 shadow-sm" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80"}`,
                  children: "تھائی لینڈ لاٹری (4 ہندسے)"
                }
              )
            ] })
          ] }),
          genCategory === "pakistan_bond" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/40 p-3.5 rounded-xl border border-slate-800 space-y-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1.5 text-xs font-bold text-amber-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پاکستان فلٹرز (Pakistan Analysis Filters)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-bold text-slate-400 mb-1", children: "بانڈ کی مالیت (Bond Value):" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    value: genPkBondValue,
                    onChange: (e) => setGenPkBondValue(e.target.value),
                    className: "w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-1.5 text-xs focus:border-amber-500 outline-none text-right cursor-pointer",
                    children: PK_BOND_CATEGORIES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b.value, className: "bg-slate-900", children: b.labelUrdu }, b.value))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-bold text-slate-400 mb-1", children: "شہر (Draw City):" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: genPkCity,
                    onChange: (e) => setGenPkCity(e.target.value),
                    className: "w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-1.5 text-xs focus:border-amber-500 outline-none text-right cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", className: "bg-slate-900", children: "تمام شہر (All Cities)" }),
                      PK_CITIES_LIST.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.nameUrdu, className: "bg-slate-900", children: c.nameUrdu }, c.nameUrdu))
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          genCategory === "thailand_lottery" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/40 p-3.5 rounded-xl border border-slate-800 space-y-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1.5 text-xs font-bold text-amber-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تھائی لاٹری تاریخ و مہینہ فلٹرز (Thailand Filters)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold text-slate-400 mb-1", children: "قرعہ اندازی تاریخ:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => setGenThaiDrawDate("all"),
                      className: `py-1 text-center rounded text-[10px] font-bold transition-all cursor-pointer ${genThaiDrawDate === "all" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"}`,
                      children: "تمام"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => setGenThaiDrawDate("1st"),
                      className: `py-1 text-center rounded text-[10px] font-bold transition-all cursor-pointer ${genThaiDrawDate === "1st" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"}`,
                      children: "1 تاریخ"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => setGenThaiDrawDate("16th"),
                      className: `py-1 text-center rounded text-[10px] font-bold transition-all cursor-pointer ${genThaiDrawDate === "16th" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"}`,
                      children: "16 تاریخ"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold text-slate-400 mb-1", children: "مہینہ (Month):" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    value: genThaiMonth,
                    onChange: (e) => setGenThaiMonth(e.target.value),
                    className: "w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-1.5 text-[11px] focus:border-amber-500 outline-none text-right cursor-pointer",
                    children: THAI_MONTHS_LIST.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m.value, className: "bg-slate-900", children: m.labelUrdu }, m.value))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold text-slate-400 mb-1", children: "سال (Year):" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: genThaiYear,
                    onChange: (e) => setGenThaiYear(e.target.value),
                    className: "w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-1.5 text-[11px] focus:border-amber-500 outline-none text-right cursor-pointer font-mono",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", className: "bg-slate-900 font-sans", children: "تمام سال (All)" }),
                      availableThaiYears.map((yr) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: yr, className: "bg-slate-900 font-mono", children: yr }, yr))
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-2", children: "اے آئی شماریاتی فارمولا (AI Statistical Logic):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-1.5 text-[11px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setGenFormula("frequency"),
                  className: `py-2 px-1 text-center font-bold rounded-xl border transition-all cursor-pointer ${genFormula === "frequency" ? "bg-slate-900 border-amber-500 text-amber-400 shadow-sm" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80"}`,
                  children: "ہندساتی کثافت (Frequency)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setGenFormula("odd_even"),
                  className: `py-2 px-1 text-center font-bold rounded-xl border transition-all cursor-pointer ${genFormula === "odd_even" ? "bg-slate-900 border-amber-500 text-amber-400 shadow-sm" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80"}`,
                  children: "طاق/جفت تسلسل (Parity)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setGenFormula("astrological"),
                  className: `py-2 px-1 text-center font-bold rounded-xl border transition-all cursor-pointer ${genFormula === "astrological" ? "bg-slate-900 border-amber-500 text-amber-400 shadow-sm" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80"}`,
                  children: "عددی مفرد (Harmonic Root)"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              id: "lucky-generate-submit-btn",
              onClick: handleGenerate,
              disabled: isGenerating || sampleSize === 0,
              className: "w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10 disabled:opacity-50",
              children: isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تاریخی ریکارڈز کا شماریاتی تجزیہ جاری ہے..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "خوش قسمت نمبر تیار کریں (Generate from Historical Analysis)" })
              ] })
            }
          ),
          generateError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-xl text-xs flex items-start justify-end gap-2 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: generateError }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-red-400 shrink-0 mt-0.5" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-5 bg-slate-900/80 p-5 rounded-2xl border border-slate-700/50 flex flex-col justify-center items-center text-center", children: generatedResult ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 w-full text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-amber-400/90 tracking-wider uppercase font-bold flex items-center justify-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3 text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تجزیاتی لکی نمبر (HISTORICAL CANDIDATE)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-mono font-black text-amber-400 bg-slate-950 py-3.5 px-6 rounded-2xl tracking-widest inline-block border border-slate-800 shadow-inner", children: generatedResult.number }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center items-center gap-1.5 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-emerald-500/10 text-emerald-400 font-bold font-mono px-2.5 py-0.5 rounded-md border border-emerald-500/20", children: [
                generatedResult.score,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-300 font-semibold", children: "شماریاتی تطابق اسکور (Historical Match Score)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-slate-400", children: [
              "یہ اسکور منتخب شدہ ",
              generatedResult.sampleSize,
              " تاریخی ڈراز کی ہندساتی فریکوئنسی اور پوزیشن پیٹرنز پر مبنی ہے۔"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1.5 text-[10px] bg-slate-950/60 p-2.5 rounded-xl border border-slate-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/90 p-1.5 rounded-lg border border-slate-800 flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-amber-400 font-bold", children: [
                generatedResult.statsBreakdown.openDigit,
                " (",
                generatedResult.statsBreakdown.openDigitPercentage,
                "%)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "اوپن کثافت:" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/90 p-1.5 rounded-lg border border-slate-800 flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-amber-400 font-bold", children: [
                generatedResult.statsBreakdown.closeDigit,
                " (",
                generatedResult.statsBreakdown.closeDigitPercentage,
                "%)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "کلوز کثافت:" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/90 p-1.5 rounded-lg border border-slate-800 flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-emerald-400 font-bold", children: generatedResult.statsBreakdown.topAkra }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "ابتدائی اکڑا:" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/90 p-1.5 rounded-lg border border-slate-800 flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-blue-400 font-bold", children: [
                generatedResult.statsBreakdown.oddCount,
                "ط / ",
                generatedResult.statsBreakdown.evenCount,
                "ج"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "طاق/جفت:" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/40 p-3 rounded-xl border border-slate-800/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold text-amber-400 mb-1 flex items-center justify-end gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "شماریاتی تجزیاتی خلاصہ (Dynamic Reason):" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3 h-3" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-300 leading-relaxed", children: generatedResult.reason })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-slate-800 pt-3 space-y-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-amber-400", children: "اسی نمبر کی فوری بکنگ / ڈیمانڈ بھیجیں:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] text-slate-400 mb-1", children: "فرسٹ رقم (Rs):" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "number",
                    value: quickFirstAmt,
                    onChange: (e) => setQuickFirstAmt(e.target.value),
                    className: "w-full bg-slate-950 text-white border border-slate-800 rounded-lg p-1.5 text-xs font-mono text-center outline-none focus:border-amber-500"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] text-slate-400 mb-1", children: "سیکنڈ رقم (Rs):" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "number",
                    value: quickSecondAmt,
                    onChange: (e) => setQuickSecondAmt(e.target.value),
                    className: "w-full bg-slate-950 text-white border border-slate-800 rounded-lg p-1.5 text-xs font-mono text-center outline-none focus:border-amber-500"
                  }
                )
              ] })
            ] }),
            bookingStatus && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-[11px] p-2 rounded-lg text-right ${bookingStatus.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25" : "bg-red-500/10 text-red-400 border border-red-500/25"}`, children: bookingStatus.message }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleQuickBook(false),
                  className: "bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 rounded-xl text-[11px] cursor-pointer border border-slate-700 transition-all",
                  children: "عام بکنگ کریں"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleQuickBook(true),
                  className: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold py-2 rounded-xl text-[11px] cursor-pointer shadow transition-all",
                  children: "ڈیمانڈ بھیجیں (500 سے زائد)"
                }
              )
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-300 font-bold max-w-xs leading-relaxed", children: "حقیقی ہسٹاریکل تجزیاتی نمبر جنریٹر" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 max-w-xs leading-relaxed", children: "بائیں جانب سے اپنی پسندیدہ کیٹیگری اور فلٹرز منتخب کر کے بٹن دبائیں۔ سسٹم پچھلے تمام تاریخی نتائج کو حقیقی طور پر سکین کر کے اعلیٰ ترین شماریاتی اسکور والا امیدوار نمبر تیار کرے گا۔" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ڈپلیکیٹ پروٹیکشن فعال ہے (ایک سیشن میں نمبر نہیں دہرایا جائے گا)" })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/30 p-4 rounded-2xl border border-slate-800 flex flex-row-reverse gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "w-4 h-4 text-amber-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-white text-xs", children: "ہندساتی کثافت ماڈل (Frequency)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mt-1 leading-relaxed", children: "منتخب شدہ فلٹرز کے تحت ہر پوزیشن (اوپن، کلوز، سینٹر، فورتھ) پر تاریخی اعتبار سے سب سے زیادہ بار آنے والے ہندسوں کو ترجیح دی جاتی ہے۔" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/30 p-4 rounded-2xl border border-slate-800 flex flex-row-reverse gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-blue-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-white text-xs", children: "طاق و جفت تسلسل (Parity Balance)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mt-1 leading-relaxed", children: "لاٹری نتائج میں طاق اور جفت کا تناسب تاریخی ریکارڈز کے مطابق متوازن رکھا جاتا ہے تاکہ ریاضیاتی توازن برقرار رہے۔" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/30 p-4 rounded-2xl border border-slate-800 flex flex-row-reverse gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-purple-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-white text-xs", children: "علم الہندسہ و عددی مفرد (Harmonic)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mt-1 leading-relaxed", children: "اعداد کے مجموعی مفرد اور تاریخی ہارمونک پیٹرنز کا موازنہ کر کے ایسے کمبینیشن بنائے جاتے ہیں جو تاریخی اعتبار سے خوش قسمت ثابت ہوئے ہیں۔" })
        ] })
      ] })
    ] })
  ] });
};
const AIChartsTab = ({
  analysisCategory,
  setAnalysisCategory,
  analysisType,
  setAnalysisType,
  analysisData,
  thaiDrawDateFilter = "all",
  setThaiDrawDateFilter,
  thaiMonthFilter = "all",
  setThaiMonthFilter,
  thaiYearFilter = "all",
  setThaiYearFilter,
  availableThaiYears = [],
  onResetThaiFilters
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-row-reverse gap-2 items-center w-full justify-between sm:justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-base sm:text-lg font-bold text-white flex items-center justify-end gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پرائز بانڈ اور لاٹری ریاضیاتی اینالائسس" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-amber-400" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mt-0.5", children: "prizebond.net کی طرز پر تیار کردہ تفصیلی ہندساتی اور آکڑا تجزیہ کار" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setAnalysisCategory("thailand_lottery"),
          className: `py-2 px-4 rounded-xl border font-bold text-xs cursor-pointer transition-all ${analysisCategory === "thailand_lottery" ? "bg-amber-500 border-amber-400 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80"}`,
          children: "تھائی لینڈ لاٹری (Thai Lottery)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setAnalysisCategory("pakistan_bond"),
          className: `py-2 px-4 rounded-xl border font-bold text-xs cursor-pointer transition-all ${analysisCategory === "pakistan_bond" ? "bg-amber-500 border-amber-400 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80"}`,
          children: "پاکستان پرائز بانڈ (Pakistan Bond)"
        }
      )
    ] }),
    analysisCategory === "thailand_lottery" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800/80 pb-2.5", children: [
        onResetThaiFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "reset-charts-thai-filters-btn",
            onClick: onResetThaiFilters,
            className: "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-bold py-1 px-2.5 rounded-lg border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3 h-3 text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فلٹرز ری سیٹ (Reset)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-bold text-amber-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تھائی لاٹری تاریخ و مہینہ فلٹر (Draw Date & Month Filter)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-right text-[10px] font-bold text-slate-300 flex items-center justify-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "قرعہ اندازی تاریخ (Draw Date):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 text-amber-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setThaiDrawDateFilter && setThaiDrawDateFilter("all"),
                className: `py-1.5 px-2 text-center rounded-lg text-[11px] font-bold cursor-pointer transition-all ${thaiDrawDateFilter === "all" ? "bg-amber-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"}`,
                children: "تمام"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setThaiDrawDateFilter && setThaiDrawDateFilter("1st"),
                className: `py-1.5 px-2 text-center rounded-lg text-[11px] font-bold cursor-pointer transition-all ${thaiDrawDateFilter === "1st" ? "bg-amber-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"}`,
                children: "1 تاریخ"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setThaiDrawDateFilter && setThaiDrawDateFilter("16th"),
                className: `py-1.5 px-2 text-center rounded-lg text-[11px] font-bold cursor-pointer transition-all ${thaiDrawDateFilter === "16th" ? "bg-amber-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"}`,
                children: "16 تاریخ"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-right text-[10px] font-bold text-slate-300", children: "مہینہ (Month):" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: thaiMonthFilter,
              onChange: (e) => setThaiMonthFilter && setThaiMonthFilter(e.target.value),
              className: "w-full bg-slate-900 border border-slate-800 text-slate-200 py-1.5 px-3 rounded-xl text-[11px] font-bold focus:border-amber-500/50 outline-none text-right cursor-pointer",
              children: THAI_MONTHS_LIST.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m.value, className: "bg-slate-900 text-white", children: m.labelUrdu }, m.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-right text-[10px] font-bold text-slate-300", children: "سال (Year):" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: thaiYearFilter,
              onChange: (e) => setThaiYearFilter && setThaiYearFilter(e.target.value),
              className: "w-full bg-slate-900 border border-slate-800 text-slate-200 py-1.5 px-3 rounded-xl text-[11px] font-bold focus:border-amber-500/50 outline-none text-right cursor-pointer font-mono",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", className: "bg-slate-900 text-white font-sans", children: "تمام سال (All)" }),
                availableThaiYears.map((yr) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: yr, className: "bg-slate-900 text-white font-mono", children: yr }, yr))
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-slate-400 flex justify-between items-center pt-1 border-t border-slate-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-400 font-mono font-bold", children: [
          "شامل ڈراز: ",
          analysisData.drawsCount
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "چارٹس نیچے دیئے گئے فلٹرز کے مطابق فوری اپ ڈیٹ ہو رہے ہیں" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row-reverse flex-wrap gap-1.5 mb-6 bg-slate-950/60 p-1.5 rounded-xl border border-slate-900", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setAnalysisType("open"),
          className: `flex-1 min-w-[80px] py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${analysisType === "open" ? "bg-slate-800 border border-slate-700 text-amber-400" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`,
          children: "اوپن فگر (Open)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setAnalysisType("close"),
          className: `flex-1 min-w-[80px] py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${analysisType === "close" ? "bg-slate-800 border border-slate-700 text-amber-400" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`,
          children: "کلوز فگر (Close)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setAnalysisType("center"),
          className: `flex-1 min-w-[80px] py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${analysisType === "center" ? "bg-slate-800 border border-slate-700 text-amber-400" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`,
          children: "سینٹر فگر (Center)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setAnalysisType("fourth"),
          className: `flex-1 min-w-[80px] py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${analysisType === "fourth" ? "bg-slate-800 border border-slate-700 text-amber-400" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`,
          children: "فورتھ فگر (4th)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setAnalysisType("akra"),
          className: `flex-1 min-w-[80px] py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${analysisType === "akra" ? "bg-slate-800 border border-slate-700 text-amber-400" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`,
          children: "آکڑا فارمولا (Akra)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setAnalysisType("oddeven"),
          className: `flex-1 min-w-[80px] py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${analysisType === "oddeven" ? "bg-slate-800 border border-slate-700 text-amber-400" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`,
          children: "طاق / جفت (Odd/Even)"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase", children: "کل ریکارڈز (Analyzed Draws)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg font-bold text-white block mt-0.5", children: [
          analysisData.drawsCount,
          " Draws"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase", children: "سب سے ہاٹ فگر (Hot Digit)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg font-bold text-emerald-400 block mt-0.5", children: (() => {
          const list = analysisType === "open" ? analysisData.open : analysisType === "close" ? analysisData.close : analysisType === "center" ? analysisData.center : analysisType === "fourth" ? analysisData.fourth : null;
          if (!list) return "7";
          const sorted = [...list].sort((a, b) => b.count - a.count);
          return sorted[0] ? `${sorted[0].value} (${sorted[0].count}x)` : "7";
        })() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase", children: "سب سے کولڈ فگر (Cold Digit)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg font-bold text-sky-400 block mt-0.5", children: (() => {
          const list = analysisType === "open" ? analysisData.open : analysisType === "close" ? analysisData.close : analysisType === "center" ? analysisData.center : analysisType === "fourth" ? analysisData.fourth : null;
          if (!list) return "2";
          const sorted = [...list].sort((a, b) => a.count - b.count);
          return sorted[0] ? `${sorted[0].value} (${sorted[0].count}x)` : "2";
        })() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase", children: "طاق بمقابلہ جفت (Odd vs Even)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg font-bold text-amber-400 block mt-0.5", children: [
          analysisData.digitOddsPercentage,
          "% / ",
          analysisData.digitEvensPercentage,
          "%"
        ] })
      ] })
    ] }),
    ["open", "close", "center", "fourth"].includes(analysisType) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/80 p-5 rounded-2xl border border-slate-900 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest text-right", children: "ہندساتی فریکوئنسی نقشہ (Visual Frequency Grid):" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 sm:grid-cols-10 gap-3", children: (() => {
          const list = analysisType === "open" ? analysisData.open : analysisType === "close" ? analysisData.close : analysisType === "center" ? analysisData.center : analysisType === "fourth" ? analysisData.fourth : [];
          const maxCount = Math.max(...list.map((i) => i.count), 1);
          return list.map((item) => {
            const relativeWeight = item.count / maxCount;
            const shadowColor = relativeWeight > 0.7 ? "shadow-[0_0_15px_rgba(245,158,11,0.25)] border-amber-500 text-amber-300" : relativeWeight < 0.35 ? "shadow-none border-slate-800 text-slate-500" : "shadow-none border-slate-700 text-slate-300";
            const bgColor = relativeWeight > 0.7 ? "bg-amber-500/10" : relativeWeight < 0.35 ? "bg-slate-900/40" : "bg-slate-800/40";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex flex-col items-center justify-center p-2 rounded-xl border ${bgColor} ${shadowColor}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold font-mono", children: item.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-slate-500 font-mono mt-0.5", children: [
                    item.count,
                    " بار"
                  ] })
                ]
              },
              item.value
            );
          });
        })() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-amber-400 uppercase tracking-widest text-right", children: "تفصیلی فریکوئنسی اور فیصد کا تناسب (Detailed Percentages & Frequencies):" }),
        (() => {
          const list = analysisType === "open" ? analysisData.open : analysisType === "close" ? analysisData.close : analysisType === "center" ? analysisData.center : analysisType === "fourth" ? analysisData.fourth : [];
          const maxCount = Math.max(...list.map((i) => i.count), 1);
          return [...list].sort((a, b) => b.count - a.count).map((item, idx) => {
            const pctOfMax = Math.round(item.count / maxCount * 100);
            const isHot = idx < 2;
            const isCold = idx >= 8;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/40 p-3 rounded-xl border border-slate-800/60 flex justify-between items-center text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 font-mono", children: [
                  "Count: ",
                  item.count,
                  " (",
                  item.percentage,
                  "%)"
                ] }),
                isHot && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-amber-500/15 text-amber-400 text-[9px] px-1.5 py-0.5 rounded font-bold", children: "ہاٹ" }),
                isCold && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-sky-500/15 text-sky-400 text-[9px] px-1.5 py-0.5 rounded font-bold", children: "کولڈ" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 mx-4 bg-slate-950 h-2.5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `h-full rounded-full transition-all duration-1000 ${isHot ? "bg-gradient-to-r from-amber-500 to-red-500" : isCold ? "bg-sky-500" : "bg-slate-700"}`,
                  style: { width: `${pctOfMax}%` }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500", children: "ہندسہ:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white font-mono text-sm", children: item.value })
              ] })
            ] }, item.value);
          });
        })()
      ] })
    ] }),
    analysisType === "akra" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-950/80 p-4 rounded-xl border border-slate-900 text-right text-xs text-slate-300 leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "آکڑا فارمولا:" }),
        " پہلے دو ہندسوں کے امتزاج کو ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "آکڑا (Akra)" }),
        " کہا جاتا ہے۔ پرائز بانڈز میں آکڑا سب سے زیادہ اہم روٹین مانی جاتی ہے۔ ذیل میں تاریخی ریکارڈ میں سب سے زیادہ کثرت سے آنے والے ٹاپ آکڑا درج ہیں۔"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-bold text-amber-400 uppercase tracking-widest text-right flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 font-mono text-[10px] lowercase", children: "Top 12 Akra Combinations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "سب سے مقبول آکڑا جوڑیاں (TOP AKRA PAIRS):" })
        ] }),
        analysisData.akras.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-slate-500 py-6", children: "ڈیٹا موجود نہیں ہے۔" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: analysisData.akras.slice(0, 12).map((item, idx) => {
          var _a;
          const firstAkraCount = ((_a = analysisData.akras[0]) == null ? void 0 : _a.count) || 1;
          const pctOfMax = Math.round(item.count / firstAkraCount * 100);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-slate-950 text-slate-400 px-2 py-0.5 rounded text-[10px] font-mono", children: [
                "Rank ",
                idx + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 font-mono", children: [
                "(",
                item.count,
                " بار)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 mx-3 bg-slate-950 h-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-amber-500 h-full rounded-full", style: { width: `${pctOfMax}%` } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white block font-mono text-base tracking-widest", children: item.akra }) })
          ] }, item.akra);
        }) })
      ] })
    ] }),
    analysisType === "oddeven" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-950/80 p-4 rounded-xl border border-slate-900 text-right text-xs text-slate-300 leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "طاق اور جفت کا توازن:" }),
        " ہندسوں کی فریکوئنسی کا حتمی ریاضیاتی توازن طاق (Odd) اور جفت (Even) نمبروں کا ریشو بتاتا ہے۔ زیادہ تر متوازن نتائج میں یہ تناسب 50 فیصد کے قریب ہوتا ہے۔"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-white mb-4 uppercase", children: "کل جیتنے والے ہندسوں کا طاق/جفت تناسب (Digit-Level Odd/Even)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-around items-center py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-red-400 block", children: [
                analysisData.digitOddsPercentage,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block", children: "طاق فگرز (Odd)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-24 h-24 relative flex items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-full h-full", viewBox: "0 0 36 36", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "18", cy: "18", r: "16", fill: "none", stroke: "#1e293b", strokeWidth: "3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "18",
                    cy: "18",
                    r: "16",
                    fill: "none",
                    stroke: "#f59e0b",
                    strokeWidth: "3.2",
                    strokeDasharray: `${analysisData.digitOddsPercentage} 100`,
                    transform: "rotate(-90 18 18)"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute font-mono text-xs font-bold text-white", children: [
                analysisData.digitOddsPercentage,
                ":",
                analysisData.digitEvensPercentage
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-sky-400 block", children: [
                analysisData.digitEvensPercentage,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block", children: "جفت فگرز (Even)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-white mb-4 uppercase", children: "پہلے انعام کا حتمی طاق/جفت تناسب (Draw-Level Odd/Even Winner)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-around items-center py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-amber-400 block", children: [
                analysisData.firstPrizeOdds,
                " Draws"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block", children: "طاق ونرز (Odd Draws)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-24 h-24 relative flex items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-full h-full", viewBox: "0 0 36 36", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "18", cy: "18", r: "16", fill: "none", stroke: "#1e293b", strokeWidth: "3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "18",
                    cy: "18",
                    r: "16",
                    fill: "none",
                    stroke: "#10b981",
                    strokeWidth: "3.2",
                    strokeDasharray: `${Math.round(analysisData.firstPrizeOdds / (analysisData.firstPrizeOdds + analysisData.firstPrizeEvens || 1) * 100)} 100`,
                    transform: "rotate(-90 18 18)"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute font-mono text-xs font-bold text-white", children: [
                analysisData.firstPrizeOdds,
                ":",
                analysisData.firstPrizeEvens
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-emerald-400 block", children: [
                analysisData.firstPrizeEvens,
                " Draws"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block", children: "جفت ونرز (Even Draws)" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
};
const AICityAnalysisTab = ({
  pkCities,
  selectedCity,
  setSelectedCity,
  cityAnalysisData,
  citySubTab,
  setCitySubTab,
  cityAnalysisType,
  setCityAnalysisType,
  allBondResults = [],
  selectedCityBond = "all",
  setSelectedCityBond
}) => {
  var _a, _b;
  const [viewMode, setViewMode] = reactExports.useState("singleCity");
  const [city2, setCity2] = reactExports.useState("لاہور");
  const [statusMsg, setStatusMsg] = reactExports.useState(null);
  const city1Stats = reactExports.useMemo(() => {
    if (!allBondResults || allBondResults.length === 0) return cityAnalysisData;
    const filtered = allBondResults.filter((d) => {
      const matchCity = d.city === selectedCity;
      const matchBond = selectedCityBond === "all" || isBondMatchForAnalysis(normalizeDrawBondValue(d), selectedCityBond);
      return matchCity && matchBond;
    });
    const computed = computeAnalysisStats(filtered);
    return {
      drawsCount: computed.totalDraws,
      drawsList: filtered,
      open: computed.openFreq,
      close: computed.closeFreq,
      center: computed.centerFreq,
      fourth: computed.fourthFreq,
      akras: computed.topAkras,
      digitOddsPercentage: computed.digitOddsPercentage,
      digitEvensPercentage: computed.digitEvensPercentage,
      firstPrizeOdds: computed.firstPrizeOdds,
      firstPrizeEvens: computed.firstPrizeEvens,
      luckyBond: cityAnalysisData.luckyBond
    };
  }, [allBondResults, selectedCity, selectedCityBond, cityAnalysisData]);
  const city2Stats = reactExports.useMemo(() => {
    var _a2;
    if (!allBondResults || allBondResults.length === 0) return null;
    const filtered = allBondResults.filter((d) => {
      const matchCity = d.city === city2;
      const matchBond = selectedCityBond === "all" || isBondMatchForAnalysis(normalizeDrawBondValue(d), selectedCityBond);
      return matchCity && matchBond;
    });
    const computed = computeAnalysisStats(filtered);
    return {
      drawsCount: computed.totalDraws,
      drawsList: filtered,
      open: computed.openFreq,
      close: computed.closeFreq,
      center: computed.centerFreq,
      fourth: computed.fourthFreq,
      akras: computed.topAkras,
      topOpen: computed.topOpenDigit,
      topAkra: ((_a2 = computed.topAkras[0]) == null ? void 0 : _a2.akra) || "--",
      digitOddsPercentage: computed.digitOddsPercentage,
      digitEvensPercentage: computed.digitEvensPercentage
    };
  }, [allBondResults, city2, selectedCityBond]);
  const handleDownload = async () => {
    const listToDownload = city1Stats.drawsList;
    if (!listToDownload || listToDownload.length === 0) {
      setStatusMsg({ text: "کوئی ریکارڈ موجود نہیں ہے۔", isError: true });
      setTimeout(() => setStatusMsg(null), 4e3);
      return;
    }
    const res = await generateDrawHistoryPDF(listToDownload, "pakistan_bond", {
      bondValue: selectedCityBond,
      city: selectedCity
    });
    if (res.success) {
      setStatusMsg({ text: `شہر ${selectedCity} کی پی ڈی ایف رپورٹ کامیابی سے محفوظ کر لی گئی ہے!`, isError: false });
      setTimeout(() => setStatusMsg(null), 4e3);
    } else {
      setStatusMsg({ text: res.error || "پی ڈی ایف بنانے میں خرابی پیش آئی۔", isError: true });
      setTimeout(() => setStatusMsg(null), 4e3);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 text-right", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800 pb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-row-reverse gap-2 items-center w-full justify-between sm:justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-base sm:text-lg font-bold text-white flex items-center justify-end gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "شہر ٹو شہر تفصیلی ریکارڈ اور تجزیہ کار" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-5 h-5 text-amber-400" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mt-0.5", children: "شہر کے لحاظ سے پرائز بانڈز کے فرسٹ انعامات کا مکمل ریکارڈ، بانڈ ویلیو فلٹر اور شہر بمقابلہ شہر تقابل" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 self-end sm:self-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleDownload,
          className: "bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-sm shadow-amber-500/10 cursor-pointer transition-all",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "شہر کا پی ڈی ایف رپورٹ ڈاؤن لوڈ کریں" })
          ]
        }
      ) })
    ] }),
    statusMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-3 mb-5 rounded-xl text-xs text-right border ${statusMsg.isError ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"}`, children: [
      statusMsg.isError ? "⚠️ " : "✓ ",
      " ",
      statusMsg.text
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row-reverse gap-2 mb-6 bg-slate-950/60 p-1.5 rounded-xl border border-slate-900", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setViewMode("singleCity"),
          className: `flex-1 py-2 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${viewMode === "singleCity" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "text-slate-400 hover:text-white"}`,
          children: "شہر کا تفصیلی اینالیسس (Single City Analysis)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setViewMode("cityComparison"),
          className: `flex-1 py-2 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 ${viewMode === "cityComparison" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "text-slate-400 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftRight, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "شہر بمقابلہ شہر تقابل (City vs City Comparison)" })
          ]
        }
      )
    ] }),
    setSelectedCityBond && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-slate-300 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-3.5 h-3.5 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "شہر کے لیے بانڈ ویلیو فلٹر منتخب کریں (Filter by Bond Value):" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-amber-400 font-mono font-bold", children: [
          "منتخب: ",
          selectedCityBond === "all" ? "تمام بانڈز" : selectedCityBond
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-row-reverse flex-wrap gap-1.5", children: PK_BOND_CATEGORIES.map((bond) => {
        const isSelected = selectedCityBond === bond.value;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSelectedCityBond(bond.value),
            className: `py-1 px-2.5 rounded-lg text-xs cursor-pointer transition-all ${isSelected ? "bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/10" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"}`,
            children: bond.labelUrdu
          },
          bond.value
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-right text-xs font-bold text-slate-400 mb-3", children: viewMode === "cityComparison" ? "پہلا شہر منتخب کریں (Select City 1):" : "شہر منتخب کریں (Select City for Records & Stats):" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-2", children: pkCities.map((city) => {
        const isSelected = selectedCity === city.nameUrdu;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setSelectedCity(city.nameUrdu),
            className: `py-2.5 px-4 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${isSelected ? "bg-amber-500 border-amber-400 text-slate-950 shadow-md shadow-amber-500/20 font-bold" : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: city.nameUrdu }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] mt-0.5 ${isSelected ? "text-slate-800" : "text-slate-500"}`, children: city.nameEng })
            ]
          },
          city.code
        );
      }) })
    ] }),
    viewMode === "cityComparison" && city2Stats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/60 p-4 rounded-xl border border-slate-900 text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-right text-xs font-bold text-slate-400 mb-3", children: "دوسرا تقابلی شہر منتخب کریں (Select City 2 to Compare):" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-2", children: pkCities.map((city) => {
          const isSelected = city2 === city.nameUrdu;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setCity2(city.nameUrdu),
              className: `py-2 px-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${isSelected ? "bg-sky-500 border-sky-400 text-slate-950 shadow-md font-bold" : "bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: city.nameUrdu }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] mt-0.5 ${isSelected ? "text-slate-900" : "text-slate-500"}`, children: city.nameEng })
              ]
            },
            `comp-${city.code}`
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/40 p-5 rounded-2xl border border-slate-800 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center border-b border-slate-800 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-sky-400 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "شہر 2: ",
              city2
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider", children: "موازنہ کارڈ (Comparative Analysis)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-amber-400 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "شہر 1: ",
              selectedCity
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm font-bold text-sky-400", children: [
              city2Stats.drawsCount,
              " ڈراز"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 font-bold", children: "کل قرعہ اندازیاں (Total Draws)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm font-bold text-amber-400", children: [
              city1Stats.drawsCount,
              " ڈراز"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-sky-400", children: city2Stats.topOpen }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 font-bold", children: "ہاٹ اوپن ہندسہ (Hot Open)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-amber-400", children: ((_a = [...city1Stats.open].sort((a, b) => b.count - a.count)[0]) == null ? void 0 : _a.value) || "7" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-sky-400", children: city2Stats.topAkra }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 font-bold", children: "ٹاپ آکڑا جوڑی (Top Akra)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-amber-400", children: ((_b = city1Stats.akras[0]) == null ? void 0 : _b.akra) || "--" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs font-bold text-sky-400", children: [
              city2Stats.digitOddsPercentage,
              "% / ",
              city2Stats.digitEvensPercentage,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 font-bold", children: "طاق بمقابلہ جفت (Odd vs Even)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs font-bold text-amber-400", children: [
              city1Stats.digitOddsPercentage,
              "% / ",
              city1Stats.digitEvensPercentage,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-right text-xs text-slate-300 leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "خلاصہ موازنہ:" }),
          " شہر ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selectedCity }),
          " میں کل ",
          city1Stats.drawsCount,
          " ڈراز ہوئے جبکہ شہر ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: city2 }),
          " میں ",
          city2Stats.drawsCount,
          " ڈراز ہوئے۔ دونوں شہروں کے مابین ہندساتی فلو اور آکڑا روٹینز کو دیکھ کر آپ اپنے اگلے لکی نمبر کا درست انتخاب کر سکتے ہیں۔"
        ] }) })
      ] })
    ] }),
    viewMode === "singleCity" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase font-bold text-center", children: "کل ریکارڈز (Analyzed Draws)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-base font-bold text-white block mt-1 text-center", children: [
            city1Stats.drawsCount,
            " Draws"
          ] }),
          selectedCityBond !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-amber-400 font-mono block mt-0.5", children: selectedCityBond })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase font-bold text-center", children: "لکیسٹ بانڈ (Hot Bond Category)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-emerald-400 block mt-1 text-center", children: city1Stats.luckyBond === "15000" ? "Rs. 15,000" : city1Stats.luckyBond === "7500" ? "Rs. 7,500" : city1Stats.luckyBond === "1500" ? "Rs. 1,500" : city1Stats.luckyBond === "750" ? "Rs. 750" : city1Stats.luckyBond === "200" ? "Rs. 200" : city1Stats.luckyBond === "40000" ? "Rs. 40,000" : "Rs. 15,000" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase font-bold text-center", children: "طاق بمقابلہ جفت (Odd vs Even)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-base font-bold text-amber-400 block mt-1 text-center", children: [
            city1Stats.digitOddsPercentage,
            "% / ",
            city1Stats.digitEvensPercentage,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase font-bold text-center", children: "مقبول ترین آکڑا (Top Akra)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-base font-bold text-sky-400 block mt-1 text-center", children: city1Stats.akras[0] ? `${city1Stats.akras[0].akra} (${city1Stats.akras[0].count}x)` : "78" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/40 p-5 rounded-2xl border border-slate-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row-reverse gap-2 mb-5 border-b border-slate-800 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setCitySubTab("digits"),
                className: `py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${citySubTab === "digits" ? "bg-slate-800 text-amber-400 border border-slate-700" : "text-slate-400 hover:text-white"}`,
                children: "ہندساتی فریکوئنسی (Position Freq)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setCitySubTab("akras"),
                className: `py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${citySubTab === "akras" ? "bg-slate-800 text-amber-400 border border-slate-700" : "text-slate-400 hover:text-white"}`,
                children: "آکڑا روٹین (Akra Routines)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setCitySubTab("oddeven"),
                className: `py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${citySubTab === "oddeven" ? "bg-slate-800 text-amber-400 border border-slate-700" : "text-slate-400 hover:text-white"}`,
                children: "طاق / جفت بیلنس (Odd/Even)"
              }
            )
          ] }),
          citySubTab === "digits" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-row-reverse justify-between items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-white uppercase tracking-wider", children: "مختلف پوزیشنز کے ہندسوں کا بہاؤ (Select Position Freq):" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row-reverse gap-1 bg-slate-950 p-1 rounded-xl border border-slate-900", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setCityAnalysisType("open"),
                  className: `flex-1 py-1 px-2 rounded-lg text-[11px] font-bold cursor-pointer ${cityAnalysisType === "open" ? "bg-slate-800 text-amber-400" : "text-slate-500 hover:text-slate-300"}`,
                  children: "اوپن (Open)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setCityAnalysisType("close"),
                  className: `flex-1 py-1 px-2 rounded-lg text-[11px] font-bold cursor-pointer ${cityAnalysisType === "close" ? "bg-slate-800 text-amber-400" : "text-slate-500 hover:text-slate-300"}`,
                  children: "کلوز (Close)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setCityAnalysisType("center"),
                  className: `flex-1 py-1 px-2 rounded-lg text-[11px] font-bold cursor-pointer ${cityAnalysisType === "center" ? "bg-slate-800 text-amber-400" : "text-slate-500 hover:text-slate-300"}`,
                  children: "سینٹر (Center)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setCityAnalysisType("fourth"),
                  className: `flex-1 py-1 px-2 rounded-lg text-[11px] font-bold cursor-pointer ${cityAnalysisType === "fourth" ? "bg-slate-800 text-amber-400" : "text-slate-500 hover:text-slate-300"}`,
                  children: "فورتھ (4th)"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 sm:grid-cols-10 gap-2 bg-slate-900/40 p-4 rounded-xl border border-slate-800/80", children: (() => {
              const list = cityAnalysisType === "open" ? city1Stats.open : cityAnalysisType === "close" ? city1Stats.close : cityAnalysisType === "center" ? city1Stats.center : cityAnalysisType === "fourth" ? city1Stats.fourth : [];
              const maxVal = Math.max(...list.map((i) => i.count), 1);
              return list.map((item) => {
                const relativeWeight = item.count / maxVal;
                const glowClass = relativeWeight > 0.7 ? "border-amber-500 bg-amber-500/10 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.15)]" : relativeWeight < 0.35 ? "border-slate-800 bg-slate-950/40 text-slate-500" : "border-slate-700 bg-slate-800/40 text-slate-300";
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col items-center justify-center p-1.5 rounded-xl border ${glowClass}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold font-mono", children: item.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[8px] text-slate-500 font-mono mt-0.5", children: [
                    item.count,
                    "x"
                  ] })
                ] }, item.value);
              });
            })() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: (() => {
              const list = cityAnalysisType === "open" ? city1Stats.open : cityAnalysisType === "close" ? city1Stats.close : cityAnalysisType === "center" ? city1Stats.center : cityAnalysisType === "fourth" ? city1Stats.fourth : [];
              const maxCount = Math.max(...list.map((i) => i.count), 1);
              return [...list].sort((a, b) => b.count - a.count).map((item, idx) => {
                const pctOfMax = Math.round(item.count / maxCount * 100);
                const isHot = idx < 2;
                const isCold = idx >= 8;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/40 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-400 font-mono", children: [
                      "Count: ",
                      item.count,
                      " (",
                      item.percentage,
                      "%)"
                    ] }),
                    isHot && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-amber-500/10 text-amber-400 text-[8px] px-1.5 py-0.5 rounded font-bold", children: "ہاٹ" }),
                    isCold && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-sky-500/10 text-sky-400 text-[8px] px-1.5 py-0.5 rounded font-bold", children: "کولڈ" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 mx-3 bg-slate-950 h-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `h-full rounded-full transition-all duration-700 ${isHot ? "bg-gradient-to-r from-amber-500 to-red-500" : isCold ? "bg-sky-500" : "bg-slate-700"}`,
                      style: { width: `${pctOfMax}%` }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500", children: "ہندسہ:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white font-mono text-xs", children: item.value })
                  ] })
                ] }, item.value);
              });
            })() })
          ] }),
          citySubTab === "akras" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-950/80 p-4 rounded-xl border border-slate-900 text-right text-xs text-slate-300 leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "شہر ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selectedCity }),
              " میں سب سے زیادہ قرعہ اندازی میں آنے والی ٹاپ آکڑا (Akra) جوڑیاں مندرجہ ذیل ہیں۔"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-bold text-amber-400 uppercase tracking-widest text-right", children: [
                "سب سے مقبول آکڑا جوڑیاں (Top Akra Pairs in ",
                selectedCity,
                "):"
              ] }),
              city1Stats.akras.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-slate-500 py-6", children: "ڈیٹا موجود نہیں ہے۔" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: city1Stats.akras.slice(0, 10).map((item, idx) => {
                var _a2;
                const firstAkraCount = ((_a2 = city1Stats.akras[0]) == null ? void 0 : _a2.count) || 1;
                const pctOfMax = Math.round(item.count / firstAkraCount * 100);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded text-[9px] font-mono", children: [
                      "Rank ",
                      idx + 1
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 font-mono", children: [
                      "(",
                      item.count,
                      " بار)"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 mx-3 bg-slate-950 h-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-amber-500 h-full rounded-full", style: { width: `${pctOfMax}%` } }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white block font-mono text-sm tracking-widest", children: item.akra }) })
                ] }, item.akra);
              }) })
            ] })
          ] }),
          citySubTab === "oddeven" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-950/80 p-4 rounded-xl border border-slate-900 text-right text-xs text-slate-300 leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "شہر ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selectedCity }),
              " کا طاق (Odd) اور جفت (Even) نمبروں کا توازن مندرجہ ذیل ہے۔"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-[11px] font-bold text-slate-400 mb-2", children: "طاق بمقابلہ جفت فگرز" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xl font-bold text-amber-400 block", children: [
                  city1Stats.digitOddsPercentage,
                  "% / ",
                  city1Stats.digitEvensPercentage,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-[11px] font-bold text-slate-400 mb-2", children: "طاق بمقابلہ جفت ڈراز" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xl font-bold text-emerald-400 block", children: [
                  city1Stats.firstPrizeOdds,
                  " / ",
                  city1Stats.firstPrizeEvens
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/40 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-bold text-white uppercase tracking-wider text-right flex justify-between items-center border-b border-slate-800 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-amber-400 font-bold", children: [
              city1Stats.drawsCount,
              " Record(s)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "شہر ",
              selectedCity,
              " کی قرعہ اندازی کا ریکارڈ:"
            ] })
          ] }),
          city1Stats.drawsList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-slate-500 py-8", children: [
            "شہر ",
            selectedCity,
            " کا کوئی ریکارڈ نہیں ملا۔"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[500px] overflow-y-auto pr-1", children: city1Stats.drawsList.map((draw) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 text-right space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center border-b border-slate-800/60 pb-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400 font-mono", children: draw.date }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-amber-400 font-mono", children: draw.bondValue || normalizeDrawBondValue(draw) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg font-black text-white tracking-widest bg-slate-950 px-3 py-1 rounded-lg border border-slate-800", children: draw.firstPrize }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400", children: draw.drawNo })
            ] })
          ] }, draw.id)) })
        ] }) })
      ] })
    ] })
  ] }) });
};
const AIBondAnalysisTab = ({
  allBondResults
}) => {
  const [selectedBond, setSelectedBond] = reactExports.useState("Rs. 1,500");
  const [selectedCity, setSelectedCity] = reactExports.useState("all");
  const [activeSubTab, setActiveSubTab] = reactExports.useState("digits");
  const [digitPosition, setDigitPosition] = reactExports.useState("open");
  const [historySearch, setHistorySearch] = reactExports.useState("");
  const [statusMsg, setStatusMsg] = reactExports.useState(null);
  const bondCounts = reactExports.useMemo(() => {
    const counts = {};
    PK_BOND_CATEGORIES.forEach((b) => {
      counts[b.value] = 0;
    });
    let total40k = 0;
    allBondResults.forEach((draw) => {
      const norm = normalizeDrawBondValue(draw);
      counts[norm] = (counts[norm] || 0) + 1;
      counts["all"] = (counts["all"] || 0) + 1;
      if (norm === "Rs. 40,000" || norm === "Rs. 40,000 Premium") {
        total40k++;
      }
    });
    counts["Rs. 40,000"] = total40k;
    counts["Rs. 40,000 Premium"] = total40k;
    return counts;
  }, [allBondResults]);
  const filteredDraws = reactExports.useMemo(() => {
    return allBondResults.filter((draw) => {
      const norm = normalizeDrawBondValue(draw);
      const matchesBond = isBondMatchForAnalysis(norm, selectedBond);
      const matchesCity = selectedCity === "all" || draw.city === selectedCity;
      return matchesBond && matchesCity;
    });
  }, [allBondResults, selectedBond, selectedCity]);
  const searchedDraws = reactExports.useMemo(() => {
    if (!historySearch.trim()) return filteredDraws;
    const q = historySearch.trim().toLowerCase();
    return filteredDraws.filter(
      (d) => d.firstPrize && d.firstPrize.toLowerCase().includes(q) || d.drawNo && d.drawNo.toLowerCase().includes(q) || d.city && d.city.toLowerCase().includes(q) || d.date && d.date.toLowerCase().includes(q) || d.secondPrizes && d.secondPrizes.some((sp) => sp.toLowerCase().includes(q))
    );
  }, [filteredDraws, historySearch]);
  const stats = reactExports.useMemo(() => {
    return computeAnalysisStats(filteredDraws);
  }, [filteredDraws]);
  const handleDownloadPDF = async () => {
    if (filteredDraws.length === 0) {
      setStatusMsg({ text: "ڈاؤن لوڈ کے لیے کوئی ریکارڈ موجود نہیں ہے۔", isError: true });
      setTimeout(() => setStatusMsg(null), 4e3);
      return;
    }
    const res = await generateDrawHistoryPDF(filteredDraws, "pakistan_bond", {
      bondValue: selectedBond,
      city: selectedCity
    });
    if (res.success) {
      setStatusMsg({ text: `بانڈ ${selectedBond} کی تجزیاتی پی ڈی ایف رپورٹ کامیابی سے محفوظ کر لی گئی ہے!`, isError: false });
      setTimeout(() => setStatusMsg(null), 4e3);
    } else {
      setStatusMsg({ text: res.error || "پی ڈی ایف بنانے میں خرابی پیش آئی۔", isError: true });
      setTimeout(() => setStatusMsg(null), 4e3);
    }
  };
  PK_BOND_CATEGORIES.find((b) => b.value === selectedBond) || PK_BOND_CATEGORIES[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800 pb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-row-reverse gap-2 items-center w-full justify-between sm:justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-base sm:text-lg font-bold text-white flex items-center justify-end gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "بانڈ ویلیو وائز تفصیلی اینالیسس سسٹم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-5 h-5 text-amber-400" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mt-0.5", children: "ہر بانڈ کی مالیت الگ الگ سلیکٹ کر کے فریکوئنسی، آکڑا، اور شہر وار تاریخی کارکردگی کا مکمل تجزیہ کریں" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleDownloadPDF,
          className: "bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-sm shadow-amber-500/10 cursor-pointer transition-all self-end sm:self-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "اس بانڈ کا پی ڈی ایف رپورٹ ڈاؤن لوڈ کریں" })
          ]
        }
      )
    ] }),
    statusMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-3 mb-5 rounded-xl text-xs text-right border ${statusMsg.isError ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"}`, children: [
      statusMsg.isError ? "⚠️ " : "✓ ",
      " ",
      statusMsg.text
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-right text-xs font-bold text-slate-400 mb-2.5", children: "بانڈ ویلیو منتخب کریں (Select Bond Value for Analysis):" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2", children: PK_BOND_CATEGORIES.map((bond) => {
        const isSelected = selectedBond === bond.value;
        const count = bondCounts[bond.value] || 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setSelectedBond(bond.value),
            className: `p-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all text-center ${isSelected ? "bg-amber-500 border-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 font-bold scale-[1.02]" : "bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", children: bond.labelUrdu }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] mt-0.5 font-mono ${isSelected ? "text-slate-900 font-bold" : "text-slate-400"}`, children: bond.labelEng }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${isSelected ? "bg-slate-950/20 text-slate-950" : "bg-slate-800 text-amber-400"}`, children: [
                count,
                " Draws"
              ] }) })
            ]
          },
          bond.value
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400 font-medium", children: "اس بانڈ کے لیے مخصوص شہر کا انتخاب کریں (اختیاری):" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-bold text-amber-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "موجودہ فلٹر: ",
            selectedCity === "all" ? "تمام شہر" : selectedCity
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row-reverse flex-wrap gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSelectedCity("all"),
            className: `py-1 px-2.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${selectedCity === "all" ? "bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"}`,
            children: "تمام شہر (All Cities)"
          }
        ),
        PK_CITIES_LIST.map((city) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSelectedCity(city.nameUrdu),
            className: `py-1 px-2.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${selectedCity === city.nameUrdu ? "bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"}`,
            children: city.nameUrdu
          },
          city.code
        ))
      ] })
    ] }),
    (selectedBond === "Rs. 40,000" || selectedBond === "Rs. 40,000 Premium") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-right flex flex-col sm:flex-row-reverse items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-amber-400 font-bold flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-4 h-4 text-amber-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مشترکہ 40,000 اینالیسس: نارمل 40,000 اور 40,000 پریمیم کے تمام ڈراز کا مشترکہ تجزیہ" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-amber-300 font-bold bg-amber-500/20 px-2.5 py-1 rounded-lg", children: "40,000 Analysis = Normal 40,000 + 40,000 Premium" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase font-bold", children: "کل ڈراز (Total Draws)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg font-bold text-white block mt-1", children: [
          stats.totalDraws,
          " Records"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-slate-400 block mt-0.5", children: selectedBond === "Rs. 40,000" || selectedBond === "Rs. 40,000 Premium" ? "روپے 40,000 (مشترکہ اینالیسس)" : selectedBond })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase font-bold", children: "سب سے فعال شہر (Top Host City)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm font-bold text-emerald-400 block mt-1", children: [
          stats.topCity,
          " (",
          stats.topCityCount,
          "x)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-slate-400 block mt-0.5", children: "سب سے زیادہ ڈراز" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase font-bold", children: "ہاٹ اوپن فگر (Hot Open)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg font-bold text-amber-400 block mt-1", children: [
          stats.topOpenDigit,
          " (",
          stats.topOpenCount,
          " بار)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-slate-400 block mt-0.5", children: "کامیاب اوپن ہندسہ" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase font-bold", children: "ٹاپ آکڑا (Top Akra)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg font-bold text-sky-400 block mt-1", children: stats.topAkras[0] ? `${stats.topAkras[0].akra} (${stats.topAkras[0].count}x)` : "دستیاب نہیں" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-slate-400 block mt-0.5", children: "سب سے مقبول جوڑی" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 text-center col-span-2 md:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase font-bold", children: "طاق بمقابلہ جفت (Odd vs Even)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg font-bold text-indigo-400 block mt-1", children: [
          stats.digitOddsPercentage,
          "% / ",
          stats.digitEvensPercentage,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-slate-400 block mt-0.5", children: "ہندساتی توازن" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row-reverse flex-wrap gap-2 mb-6 border-b border-slate-800 pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveSubTab("digits"),
          className: `py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${activeSubTab === "digits" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ہندساتی پوزیشنز (Digits Freq)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveSubTab("akras"),
          className: `py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${activeSubTab === "akras" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "آکڑا روٹین (Akra Routines)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveSubTab("cities"),
          className: `py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${activeSubTab === "cities" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "شہر وار تقسیم (City Breakdown)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveSubTab("history"),
          className: `py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${activeSubTab === "history" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "سابقہ نتائج لسٹ (",
              filteredDraws.length,
              ")"
            ] })
          ]
        }
      )
    ] }),
    activeSubTab === "digits" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/40 p-5 rounded-2xl border border-slate-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 border-b border-slate-900 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-white uppercase tracking-wider", children: "پوزیشن منتخب کریں (Select Position):" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row-reverse gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 w-full sm:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setDigitPosition("open"),
              className: `flex-1 sm:flex-initial py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${digitPosition === "open" ? "bg-slate-800 text-amber-400" : "text-slate-400 hover:text-slate-200"}`,
              children: "اوپن (Open)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setDigitPosition("close"),
              className: `flex-1 sm:flex-initial py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${digitPosition === "close" ? "bg-slate-800 text-amber-400" : "text-slate-400 hover:text-slate-200"}`,
              children: "کلوز (Close)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setDigitPosition("center"),
              className: `flex-1 sm:flex-initial py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${digitPosition === "center" ? "bg-slate-800 text-amber-400" : "text-slate-400 hover:text-slate-200"}`,
              children: "سینٹر (Center)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setDigitPosition("fourth"),
              className: `flex-1 sm:flex-initial py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${digitPosition === "fourth" ? "bg-slate-800 text-amber-400" : "text-slate-400 hover:text-slate-200"}`,
              children: "فورتھ (4th)"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 sm:grid-cols-10 gap-2 mb-6 bg-slate-900/60 p-4 rounded-xl border border-slate-800", children: (() => {
        const list = digitPosition === "open" ? stats.openFreq : digitPosition === "close" ? stats.closeFreq : digitPosition === "center" ? stats.centerFreq : stats.fourthFreq;
        const maxVal = Math.max(...list.map((i) => i.count), 1);
        return list.map((item) => {
          const relativeWeight = item.count / maxVal;
          const isHot = relativeWeight >= 0.7;
          const isCold = relativeWeight <= 0.3;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${isHot ? "bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-md shadow-amber-500/10" : isCold ? "bg-slate-950/60 border-slate-800/80 text-slate-500" : "bg-slate-800/60 border-slate-700/60 text-slate-300"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold font-mono", children: item.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-slate-400 font-mono mt-0.5", children: [
                  item.count,
                  " بار"
                ] })
              ]
            },
            item.value
          );
        });
      })() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (() => {
        const list = digitPosition === "open" ? stats.openFreq : digitPosition === "close" ? stats.closeFreq : digitPosition === "center" ? stats.centerFreq : stats.fourthFreq;
        const maxVal = Math.max(...list.map((i) => i.count), 1);
        return [...list].sort((a, b) => b.count - a.count).map((item, idx) => {
          const pctOfMax = Math.round(item.count / maxVal * 100);
          const isHot = idx < 2;
          const isCold = idx >= 8;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 font-mono text-[11px]", children: [
                item.count,
                " بار (",
                item.percentage,
                "%)"
              ] }),
              isHot && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-amber-500/15 text-amber-400 text-[9px] px-1.5 py-0.5 rounded font-bold", children: "ہاٹ" }),
              isCold && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-sky-500/15 text-sky-400 text-[9px] px-1.5 py-0.5 rounded font-bold", children: "کولڈ" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 mx-3 bg-slate-950 h-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-full rounded-full transition-all duration-700 ${isHot ? "bg-gradient-to-r from-amber-500 to-red-500" : isCold ? "bg-sky-500" : "bg-slate-700"}`,
                style: { width: `${pctOfMax}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500", children: "ہندسہ:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white font-mono text-sm", children: item.value })
            ] })
          ] }, item.value);
        });
      })() })
    ] }) }),
    activeSubTab === "akras" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-950/60 p-4 rounded-xl border border-slate-900 text-right text-xs text-slate-300 leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "بانڈ ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selectedBond }),
        " کے لیے تاریخ کے سب سے زیادہ دہرائے جانے والے ٹاپ آکڑا (Akra) جوڑے مندرجہ ذیل ہیں۔"
      ] }) }),
      stats.topAkras.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-slate-500 py-8", children: "کوئی آکڑا ریکارڈ موجود نہیں ہے۔" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5", children: stats.topAkras.slice(0, 15).map((item, idx) => {
        var _a;
        const maxCount = ((_a = stats.topAkras[0]) == null ? void 0 : _a.count) || 1;
        const pctOfMax = Math.round(item.count / maxCount * 100);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded text-[9px] font-mono", children: [
              "#",
              idx + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 font-mono text-[11px]", children: [
              "(",
              item.count,
              " بار)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 mx-3 bg-slate-950 h-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-amber-500 h-full rounded-full", style: { width: `${pctOfMax}%` } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white font-mono text-base tracking-widest", children: item.akra }) })
        ] }, item.akra);
      }) })
    ] }),
    activeSubTab === "cities" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-950/60 p-4 rounded-xl border border-slate-900 text-right text-xs text-slate-300 leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "بانڈ ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selectedBond }),
        " کی قرعہ اندازی پاکستان کے کن کن شہروں میں کتنی بار منعقد ہوئی:"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: stats.cityDistribution.map((item) => {
        var _a;
        const maxCount = ((_a = stats.cityDistribution[0]) == null ? void 0 : _a.count) || 1;
        const pctOfMax = Math.round(item.count / maxCount * 100);
        const isSelected = selectedCity === item.city;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: () => setSelectedCity(isSelected ? "all" : item.city),
            className: `p-3.5 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${isSelected ? "bg-amber-500/10 border-amber-500 text-white" : "bg-slate-900/60 border-slate-800 hover:bg-slate-800 text-slate-300"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold text-amber-400", children: [
                  item.count,
                  " ڈراز"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-500", children: [
                  "(",
                  item.percentage,
                  "%)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 mx-3 bg-slate-950 h-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-emerald-500 h-full rounded-full", style: { width: `${pctOfMax}%` } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white text-xs block", children: item.city }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-slate-500 block", children: item.cityEng })
              ] })
            ]
          },
          item.city
        );
      }) })
    ] }),
    activeSubTab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-slate-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "نمبر، تاریخ یا شہر تلاش کریں...",
              value: historySearch,
              onChange: (e) => setHistorySearch(e.target.value),
              className: "w-full bg-slate-950 text-xs text-white pl-9 pr-3.5 py-2 rounded-xl border border-slate-800 focus:border-amber-500/50 outline-none text-right"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-400 font-mono", children: [
          "کل نتائج: ",
          searchedDraws.length
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-right border-collapse text-xs sm:text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-slate-950 text-slate-400 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "تاریخ (Date)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "شہر (City)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "فرسٹ انعام (1st Prize)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "سیکنڈ انعامات (2nd Prizes)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right", children: "ڈرا نمبر / مالیت" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-800/60 bg-slate-900/40", children: searchedDraws.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "p-6 text-center text-slate-500", children: "مطلوبہ ریکارڈز موجود نہیں ہیں۔" }) }) : searchedDraws.map((draw) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-800/50 transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-mono text-slate-400 text-xs", children: draw.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-slate-300 font-semibold", children: draw.city }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-mono font-black text-amber-400 text-sm tracking-wider", children: draw.firstPrize }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-mono text-slate-400 text-xs max-w-xs truncate", children: Array.isArray(draw.secondPrizes) ? draw.secondPrizes.join(", ") : draw.secondPrizes }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 font-bold text-white text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs", children: draw.drawNo }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-amber-400/80 font-mono block", children: selectedBond })
          ] })
        ] }, draw.id)) })
      ] }) })
    ] })
  ] }) });
};
const AIThailandAnalysisTab = ({
  allThaiResults
}) => {
  const [drawDateFilter, setDrawDateFilter] = reactExports.useState("all");
  const [monthFilter, setMonthFilter] = reactExports.useState("all");
  const [yearFilter, setYearFilter] = reactExports.useState("all");
  const [activeAnalysisView, setActiveAnalysisView] = reactExports.useState("positions");
  const [selectedPosition, setSelectedPosition] = reactExports.useState(0);
  const [statusMsg, setStatusMsg] = reactExports.useState(null);
  const [isExporting, setIsExporting] = reactExports.useState(false);
  const availableYears = reactExports.useMemo(() => {
    return getAvailableThaiYears(allThaiResults);
  }, [allThaiResults]);
  const filteredDraws = reactExports.useMemo(() => {
    return filterThaiLotteryDraws(allThaiResults, drawDateFilter, monthFilter, yearFilter);
  }, [allThaiResults, drawDateFilter, monthFilter, yearFilter]);
  const stats = reactExports.useMemo(() => {
    return computeThaiAnalysisMetrics(filteredDraws);
  }, [filteredDraws]);
  const filterContext = reactExports.useMemo(() => ({
    drawDateFilter,
    monthFilter,
    yearFilter
  }), [drawDateFilter, monthFilter, yearFilter]);
  const handleResetFilters = () => {
    setDrawDateFilter("all");
    setMonthFilter("all");
    setYearFilter("all");
    setStatusMsg({ text: "فلٹرز کامیابی سے ری سیٹ کر دیے گئے ہیں۔", isError: false });
    setTimeout(() => setStatusMsg(null), 3e3);
  };
  const handleExportFullPDF = async () => {
    if (filteredDraws.length === 0) {
      setStatusMsg({ text: "ڈاؤن لوڈ کے لیے کوئی ریکارڈ موجود نہیں ہے۔", isError: true });
      setTimeout(() => setStatusMsg(null), 4e3);
      return;
    }
    setIsExporting(true);
    setStatusMsg({ text: "مکمل تھائی لینڈ تجزیہ پی ڈی ایف تیار ہو رہی ہے، براہ کرم انتظار کریں...", isError: false });
    try {
      const res = await generateThaiFullAnalysisPDF(filteredDraws, stats, filterContext);
      if (res.success) {
        setStatusMsg({ text: "تھائی لینڈ لاٹری مکمل اینالیسس رپورٹ پی ڈی ایف کامیابی سے تیار ہو گئی ہے!", isError: false });
      } else {
        setStatusMsg({ text: res.error || "پی ڈی ایف بنانے میں خرابی پیش آئی۔", isError: true });
      }
    } catch (e) {
      setStatusMsg({ text: (e == null ? void 0 : e.message) || "پی ڈی ایف ایکسپورٹ کے دوران خرابی پیش آئی۔", isError: true });
    } finally {
      setIsExporting(false);
      setTimeout(() => setStatusMsg(null), 5e3);
    }
  };
  const handleExportPositionsPDF = async () => {
    if (filteredDraws.length === 0) {
      setStatusMsg({ text: "ڈاؤن لوڈ کے لیے کوئی ریکارڈ موجود نہیں ہے۔", isError: true });
      setTimeout(() => setStatusMsg(null), 4e3);
      return;
    }
    setIsExporting(true);
    setStatusMsg({ text: "پوزیشن وار تجزیہ پی ڈی ایف تیار ہو رہی ہے...", isError: false });
    try {
      const res = await generateThaiPositionAnalysisPDF(filteredDraws, stats, selectedPosition, filterContext);
      if (res.success) {
        setStatusMsg({ text: "پوزیشن وار تجزیاتی پی ڈی ایف کامیابی سے ڈاؤن لوڈ ہو گئی ہے!", isError: false });
      } else {
        setStatusMsg({ text: res.error || "پی ڈی ایف بنانے میں خرابی پیش آئی۔", isError: true });
      }
    } catch (e) {
      setStatusMsg({ text: (e == null ? void 0 : e.message) || "خرابی پیش آئی۔", isError: true });
    } finally {
      setIsExporting(false);
      setTimeout(() => setStatusMsg(null), 5e3);
    }
  };
  const handleExportDigitFreqPDF = async () => {
    if (filteredDraws.length === 0) {
      setStatusMsg({ text: "ڈاؤن لوڈ کے لیے کوئی ریکارڈ موجود نہیں ہے۔", isError: true });
      setTimeout(() => setStatusMsg(null), 4e3);
      return;
    }
    setIsExporting(true);
    setStatusMsg({ text: "ہندساتی فریکوئنسی 0 تا 9 پی ڈی ایف تیار ہو رہی ہے...", isError: false });
    try {
      const res = await generateThaiDigitFrequencyPDF(filteredDraws, stats, filterContext);
      if (res.success) {
        setStatusMsg({ text: "ہندساتی فریکوئنسی پی ڈی ایف کامیابی سے ڈاؤن لوڈ ہو گئی ہے!", isError: false });
      } else {
        setStatusMsg({ text: res.error || "پی ڈی ایف بنانے میں خرابی پیش آئی۔", isError: true });
      }
    } catch (e) {
      setStatusMsg({ text: (e == null ? void 0 : e.message) || "خرابی پیش آئی۔", isError: true });
    } finally {
      setIsExporting(false);
      setTimeout(() => setStatusMsg(null), 5e3);
    }
  };
  const handleExportAkraL2PDF = async () => {
    if (filteredDraws.length === 0) {
      setStatusMsg({ text: "ڈاؤن لوڈ کے لیے کوئی ریکارڈ موجود نہیں ہے۔", isError: true });
      setTimeout(() => setStatusMsg(null), 4e3);
      return;
    }
    setIsExporting(true);
    setStatusMsg({ text: "آکڑا اور ایل 2 تجزیاتی پی ڈی ایف تیار ہو رہی ہے...", isError: false });
    try {
      const res = await generateThaiAkraL2PDF(filteredDraws, stats, filterContext);
      if (res.success) {
        setStatusMsg({ text: "آکڑا اور ایل 2 تجزیاتی پی ڈی ایف کامیابی سے ڈاؤن لوڈ ہو گئی ہے!", isError: false });
      } else {
        setStatusMsg({ text: res.error || "پی ڈی ایف بنانے میں خرابی پیش آئی۔", isError: true });
      }
    } catch (e) {
      setStatusMsg({ text: (e == null ? void 0 : e.message) || "خرابی پیش آئی۔", isError: true });
    } finally {
      setIsExporting(false);
      setTimeout(() => setStatusMsg(null), 5e3);
    }
  };
  const handleExportOddEvenPDF = async () => {
    if (filteredDraws.length === 0) {
      setStatusMsg({ text: "ڈاؤن لوڈ کے لیے کوئی ریکارڈ موجود نہیں ہے۔", isError: true });
      setTimeout(() => setStatusMsg(null), 4e3);
      return;
    }
    setIsExporting(true);
    setStatusMsg({ text: "طاق و جفت تجزیاتی پی ڈی ایف تیار ہو رہی ہے...", isError: false });
    try {
      const res = await generateThaiOddEvenPDF(filteredDraws, stats, filterContext);
      if (res.success) {
        setStatusMsg({ text: "طاق و جفت تجزیاتی پی ڈی ایف کامیابی سے ڈاؤن لوڈ ہو گئی ہے!", isError: false });
      } else {
        setStatusMsg({ text: res.error || "پی ڈی ایف بنانے میں خرابی پیش آئی۔", isError: true });
      }
    } catch (e) {
      setStatusMsg({ text: (e == null ? void 0 : e.message) || "خرابی پیش آئی۔", isError: true });
    } finally {
      setIsExporting(false);
      setTimeout(() => setStatusMsg(null), 5e3);
    }
  };
  const handleExportRecordsPDF = async () => {
    if (filteredDraws.length === 0) {
      setStatusMsg({ text: "ڈاؤن لوڈ کے لیے کوئی ریکارڈ موجود نہیں ہے۔", isError: true });
      setTimeout(() => setStatusMsg(null), 4e3);
      return;
    }
    setIsExporting(true);
    setStatusMsg({ text: "ڈرا ریکارڈز فہرست پی ڈی ایف تیار ہو رہی ہے...", isError: false });
    try {
      const res = await generateThaiDrawRecordsPDF(filteredDraws, filterContext);
      if (res.success) {
        setStatusMsg({ text: "ڈرا ریکارڈز پی ڈی ایف کامیابی سے ڈاؤن لوڈ ہو گئی ہے!", isError: false });
      } else {
        setStatusMsg({ text: res.error || "پی ڈی ایف بنانے میں خرابی پیش آئی۔", isError: true });
      }
    } catch (e) {
      setStatusMsg({ text: (e == null ? void 0 : e.message) || "خرابی پیش آئی۔", isError: true });
    } finally {
      setIsExporting(false);
      setTimeout(() => setStatusMsg(null), 5e3);
    }
  };
  const handleExportActiveSectionPDF = () => {
    if (activeAnalysisView === "positions") return handleExportPositionsPDF();
    if (activeAnalysisView === "singleDigits") return handleExportDigitFreqPDF();
    if (activeAnalysisView === "akras") return handleExportAkraL2PDF();
    if (activeAnalysisView === "oddeven") return handleExportOddEvenPDF();
    if (activeAnalysisView === "records") return handleExportRecordsPDF();
    return handleExportFullPDF();
  };
  const activeFilterSummary = reactExports.useMemo(() => {
    const parts = ["تھائی لاٹری"];
    if (drawDateFilter === "1st") parts.push("1 تاریخ (30 ➔ 1 ➔ 2)");
    else if (drawDateFilter === "16th") parts.push("16 تاریخ (15 ➔ 16 ➔ 17)");
    else parts.push("تمام تاریخیں (All Dates)");
    const mObj = THAI_MONTHS_LIST.find((m) => m.value === monthFilter);
    if (mObj && monthFilter !== "all") {
      parts.push(mObj.labelUrdu);
    } else {
      parts.push("تمام مہینے (All Months)");
    }
    if (yearFilter !== "all") {
      parts.push(`سال ${yearFilter}`);
    } else {
      parts.push("تمام سال (All Years)");
    }
    return parts.join(" ➔ ");
  }, [drawDateFilter, monthFilter, yearFilter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-4 sm:p-6 rounded-2xl border border-slate-700/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 border-b border-slate-800 pb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-row-reverse gap-2 items-center w-full justify-between lg:justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-500/30", children: "بنکاک، تھائی لینڈ (1st & 16th)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-base sm:text-lg font-bold text-white flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تھائی لاٹری تاریخ وار اور ماہانہ اینالیسس" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-amber-400" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mt-1", children: "تھائی لینڈ لاٹری کے ہر مہینے کی 1 اور 16 تاریخ کے ڈراز کا ماہانہ، سالانہ اور ہندساتی گہرا تجزیہ" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 self-end lg:self-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "export-active-section-pdf-btn",
            onClick: handleExportActiveSectionPDF,
            disabled: isExporting,
            className: "bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 border border-amber-500/40 shadow-sm cursor-pointer transition-all disabled:opacity-50",
            title: "موجودہ اینالیسس سیکشن کی پی ڈی ایف رپورٹ بنائیں",
            children: [
              isExporting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin text-amber-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Export PDF (موجودہ سیکشن)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "export-full-thai-pdf-btn",
            onClick: handleExportFullPDF,
            disabled: isExporting,
            className: "bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-amber-500/10 cursor-pointer transition-all disabled:opacity-50",
            title: "تمام اینالیسس سیکشنز اور ہسٹری کی مکمل پی ڈی ایف رپورٹ بنائیں",
            children: [
              isExporting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin text-slate-950" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Export Full Analysis PDF (مکمل رپورٹ)" })
            ]
          }
        )
      ] })
    ] }),
    statusMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-3 mb-5 rounded-xl text-xs text-right border ${statusMsg.isError ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"}`, children: [
      statusMsg.isError ? "⚠️ " : "✓ ",
      " ",
      statusMsg.text
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-slate-800 mb-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800/80 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "reset-thai-filters-btn",
            onClick: handleResetFilters,
            className: "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold py-1.5 px-3 rounded-lg border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all",
            title: "فلٹرز ری سیٹ کریں",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5 text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فلٹرز ری سیٹ (Reset)" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-bold text-slate-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تھائی لینڈ لاٹری اینالیسس فلٹرز (Thailand Filters)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-right text-[11px] font-bold text-amber-400 flex items-center justify-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "قرعہ اندازی کی تاریخ (Draw Date):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                id: "filter-date-all",
                onClick: () => setDrawDateFilter("all"),
                className: `py-2 px-2 text-center rounded-lg text-xs font-bold cursor-pointer transition-all ${drawDateFilter === "all" ? "bg-amber-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white hover:bg-slate-800/60"}`,
                children: "تمام (All)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                id: "filter-date-1st",
                onClick: () => setDrawDateFilter("1st"),
                className: `py-2 px-2 text-center rounded-lg text-xs font-bold cursor-pointer transition-all ${drawDateFilter === "1st" ? "bg-amber-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white hover:bg-slate-800/60"}`,
                children: "1 تاریخ (1st)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                id: "filter-date-16th",
                onClick: () => setDrawDateFilter("16th"),
                className: `py-2 px-2 text-center rounded-lg text-xs font-bold cursor-pointer transition-all ${drawDateFilter === "16th" ? "bg-amber-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white hover:bg-slate-800/60"}`,
                children: "16 تاریخ (16th)"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-right text-[11px] font-bold text-amber-400", children: "مہینہ منتخب کریں (Month):" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "filter-month-select",
              value: monthFilter,
              onChange: (e) => setMonthFilter(e.target.value),
              className: "w-full bg-slate-900 border border-slate-800 text-slate-200 py-2 px-3 rounded-xl text-xs font-bold focus:border-amber-500/50 outline-none text-right cursor-pointer",
              children: THAI_MONTHS_LIST.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m.value, className: "bg-slate-900 text-white", children: m.labelUrdu }, m.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-right text-[11px] font-bold text-amber-400", children: "سال منتخب کریں (Year):" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "filter-year-select",
              value: yearFilter,
              onChange: (e) => setYearFilter(e.target.value),
              className: "w-full bg-slate-900 border border-slate-800 text-slate-200 py-2 px-3 rounded-xl text-xs font-bold focus:border-amber-500/50 outline-none text-right cursor-pointer font-mono",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", className: "bg-slate-900 text-white font-sans", children: "تمام دستیاب سال (All Years)" }),
                availableYears.map((yr) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: yr, className: "bg-slate-900 text-white font-mono", children: yr }, yr))
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-2 pt-2 text-[11px] text-slate-400 border-t border-slate-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-amber-400 font-bold bg-amber-500/10 py-1 px-2.5 rounded-lg border border-amber-500/20", children: [
          "کل نتائج: ",
          filteredDraws.length,
          " Draws"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-right font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300 font-bold", children: "فعال اینالیسس کمبینیشن:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-300", children: activeFilterSummary })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-3 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase font-bold", children: "کل ڈراز (Total Draws)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lg font-bold text-white block mt-0.5", children: [
          stats.totalDraws,
          " Records"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-slate-400 block mt-0.5", children: "نمونہ سائز" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-3 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-500 block uppercase font-bold flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ہاٹ فگر (Hot Digit)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg font-bold text-amber-400 block mt-0.5", children: stats.highlights.topHotDigit }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-slate-400 block mt-0.5 font-mono", children: [
          stats.highlights.topHotDigitCount,
          "x ظاہر ہوا"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-3 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-500 block uppercase font-bold flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Snowflake, { className: "w-3 h-3 text-cyan-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "کولڈ فگر (Cold Digit)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg font-bold text-cyan-400 block mt-0.5", children: stats.highlights.topColdDigit }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-slate-400 block mt-0.5 font-mono", children: [
          stats.highlights.topColdDigitCount,
          "x کم ترین"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-3 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase font-bold", children: "اوپن ہندسہ (Hot Open)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg font-bold text-emerald-400 block mt-0.5", children: stats.highlights.topOpenDigit }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-slate-400 block mt-0.5 font-mono", children: [
          stats.highlights.topOpenDigitCount,
          "x پہلا فگر"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-3 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase font-bold", children: "ٹاپ آکڑا (Top Akra)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg font-bold text-sky-400 block mt-0.5", children: stats.highlights.topAkra }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-slate-400 block mt-0.5 font-mono", children: [
          stats.highlights.topAkraCount,
          "x فرسٹ جوڑی"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-3 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block uppercase font-bold", children: "ٹاپ L2 (Last 2)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg font-bold text-indigo-400 block mt-0.5", children: stats.highlights.topL2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-slate-400 block mt-0.5 font-mono", children: [
          stats.highlights.topL2Count,
          "x ڈاون 2"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row-reverse flex-wrap gap-2 mb-6 border-b border-slate-800 pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          id: "thai-subtab-positions",
          onClick: () => setActiveAnalysisView("positions"),
          className: `py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${activeAnalysisView === "positions" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پوزیشن وار تفصیلی تجزیہ (Position-wise 1 to 6)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          id: "thai-subtab-singledigits",
          onClick: () => setActiveAnalysisView("singleDigits"),
          className: `py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${activeAnalysisView === "singleDigits" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ہندساتی فریکوئنسی 0 تا 9 (Digit Frequency 0-9)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          id: "thai-subtab-akras",
          onClick: () => setActiveAnalysisView("akras"),
          className: `py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${activeAnalysisView === "akras" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "آکڑا اور L2 جوڑیاں (Akra & Last 2 Analysis)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          id: "thai-subtab-oddeven",
          onClick: () => setActiveAnalysisView("oddeven"),
          className: `py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${activeAnalysisView === "oddeven" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "طاق و جفت توازن (Odd vs Even Ratio)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          id: "thai-subtab-records",
          onClick: () => setActiveAnalysisView("records"),
          className: `py-2 px-3.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${activeAnalysisView === "records" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "فلٹر شدہ ڈرا ریکارڈز (",
              filteredDraws.length,
              ")"
            ] })
          ]
        }
      )
    ] }),
    activeAnalysisView === "positions" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "export-positions-pdf-btn",
            onClick: handleExportPositionsPDF,
            disabled: isExporting,
            className: "bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 text-xs font-bold py-1.5 px-3 rounded-lg border border-amber-500/30 flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50",
            title: "پوزیشن وار اینالیسس پی ڈی ایف رپورٹ ڈاؤن لوڈ کریں",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Export PDF (پوزیشن اینالیسس)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-400", children: "پوزیشن منتخب کریں (Select Digit Position):" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-amber-400 font-bold", children: "تھائی لینڈ لاٹری کے فرسٹ پرائز میں 6 ہندسے ہوتے ہیں" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4", children: stats.positions.map((pos) => {
        const isSelected = selectedPosition === pos.positionIndex;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setSelectedPosition(pos.positionIndex),
            className: `p-2.5 rounded-xl border text-center cursor-pointer transition-all ${isSelected ? "bg-amber-500 border-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20" : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold", children: pos.positionLabelUrdu }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[10px] font-mono mt-0.5 ${isSelected ? "text-slate-950 font-bold" : "text-slate-400"}`, children: pos.positionLabelEng }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-center gap-1 text-[10px] font-mono", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ٹاپ:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-bold px-1.5 py-0.2 rounded ${isSelected ? "bg-slate-950/20 text-slate-950" : "bg-slate-800 text-amber-400"}`, children: [
                  pos.topDigit,
                  " (",
                  pos.topCount,
                  "x)"
                ] })
              ] })
            ]
          },
          pos.positionIndex
        );
      }) }),
      (() => {
        const currentPos = stats.positions[selectedPosition] || stats.positions[0];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/50 rounded-xl border border-slate-800 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-slate-900/80 border-b border-slate-800 flex justify-between items-center text-xs font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-400 font-mono", children: [
              "نمونہ سائز: ",
              stats.totalDraws,
              " Draws"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white", children: [
              "تفصیل برائے: ",
              currentPos.positionLabelUrdu
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-900 text-slate-400 border-b border-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-center", children: "کیفیت (Status)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-center", children: "رینک (Rank)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3", children: "گراف تناسب" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-center", children: "فیصد (Percentage)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-center", children: "تعداد (Count)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-center font-bold", children: "ہندسہ (Digit)" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-800/60 font-mono", children: currentPos.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-900/40 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-center", children: [
                it.status === "hot" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center justify-center gap-1 w-fit mx-auto font-sans", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3 text-amber-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ہاٹ (Hot)" })
                ] }),
                it.status === "cold" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-cyan-500/20 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/30 flex items-center justify-center gap-1 w-fit mx-auto font-sans", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Snowflake, { className: "w-3 h-3 text-cyan-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "کولڈ (Cold)" })
                ] }),
                it.status === "neutral" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 text-[10px] font-sans", children: "نارمل" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-center text-slate-300 font-bold", children: [
                "#",
                it.rank
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 min-w-[120px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `h-full rounded-full ${it.status === "hot" ? "bg-amber-400" : it.status === "cold" ? "bg-cyan-500" : "bg-slate-500"}`,
                  style: { width: `${Math.max(it.percentage, 4)}%` }
                }
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-center text-amber-300 font-bold", children: [
                it.percentage,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-center text-white font-bold", children: it.count }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-center font-bold text-base text-amber-400", children: it.digit })
            ] }, it.digit)) })
          ] }) })
        ] });
      })()
    ] }),
    activeAnalysisView === "singleDigits" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "export-single-digits-pdf-btn",
            onClick: handleExportDigitFreqPDF,
            disabled: isExporting,
            className: "bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 text-xs font-bold py-1.5 px-3 rounded-lg border border-amber-500/30 flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50",
            title: "ہندساتی فریکوئنسی پی ڈی ایف رپورٹ ڈاؤن لوڈ کریں",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Export PDF (ہندساتی فریکوئنسی 0 تا 9)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 font-mono", children: [
            "کل ہندساتی نمونہ سائز: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-amber-400", children: stats.totalDigitsAnalyzed }),
            " ہندسے"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white", children: "تمام پوزیشنز پر 0 تا 9 ہندسوں کا مجموعی تجزیہ" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-950/50 rounded-xl border border-slate-800 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-900 text-slate-400 border-b border-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-center", children: "کیفیت (Status)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-center", children: "رینک (Rank)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3", children: "فریکوئنسی گراف" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-center", children: "فیصد (Percentage)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-center", children: "تعداد (Count)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-center font-bold", children: "ہندسہ (Digit 0-9)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-800/60 font-mono", children: stats.singleDigitStats0to9.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-900/40 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-center", children: [
            it.status === "hot" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center justify-center gap-1 w-fit mx-auto font-sans", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3 text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ہاٹ (Hot)" })
            ] }),
            it.status === "cold" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-cyan-500/20 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/30 flex items-center justify-center gap-1 w-fit mx-auto font-sans", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Snowflake, { className: "w-3 h-3 text-cyan-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "کولڈ (Cold)" })
            ] }),
            it.status === "neutral" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 text-[10px] font-sans", children: "نارمل" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-center text-slate-300 font-bold", children: [
            "#",
            it.rank
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 min-w-[140px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-full rounded-full ${it.status === "hot" ? "bg-amber-400" : it.status === "cold" ? "bg-cyan-500" : "bg-slate-400"}`,
              style: { width: `${Math.max(it.percentage * 5, 5)}%` }
            }
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-center text-amber-300 font-bold", children: [
            it.percentage,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-center text-white font-bold", children: it.count }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-center font-bold text-base text-amber-400", children: it.digit })
        ] }, it.digit)) })
      ] }) }) })
    ] }),
    activeAnalysisView === "akras" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "export-akra-l2-pdf-btn",
            onClick: handleExportAkraL2PDF,
            disabled: isExporting,
            className: "bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 text-xs font-bold py-1.5 px-3 rounded-lg border border-amber-500/30 flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50",
            title: "آکڑا اور ایل 2 پی ڈی ایف ڈاؤن لوڈ کریں",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Export PDF (آکڑا اور ایل 2 جوڑیاں)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-300", children: "فرسٹ 2 (آکڑا) اور لاسٹ 2 (ڈاؤن) جوڑیوں کا تجزیہ" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/50 p-4 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-3 pb-2 border-b border-slate-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-slate-400", children: [
              stats.topAkras.length,
              " Pairs"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-bold text-amber-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ٹاپ آکڑا جوڑیاں (Front 2 Digits)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-3.5 h-3.5" })
            ] })
          ] }),
          stats.topAkras.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-slate-500 text-xs", children: "کوئی آکڑا ریکارڈ نہیں ملا۔" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 font-mono text-xs", children: stats.topAkras.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center bg-slate-900/80 p-2 rounded-lg border border-slate-800/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-400 font-bold", children: [
                a.count,
                " بار"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-400", children: [
                "(",
                a.percentage,
                "%)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-white", children: a.pair }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-500 font-sans", children: [
                "#",
                a.rank
              ] })
            ] })
          ] }, a.pair)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/50 p-4 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-3 pb-2 border-b border-slate-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-slate-400", children: [
              stats.topL2.length,
              " Pairs"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-bold text-indigo-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ٹاپ ڈاؤن / ایل ٹو جوڑیاں (Last 2 Digits / L2)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" })
            ] })
          ] }),
          stats.topL2.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-slate-500 text-xs", children: "کوئی L2 ریکارڈ نہیں ملا۔" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 font-mono text-xs", children: stats.topL2.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center bg-slate-900/80 p-2 rounded-lg border border-slate-800/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-indigo-400 font-bold", children: [
                l.count,
                " بار"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-400", children: [
                "(",
                l.percentage,
                "%)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-white", children: l.pair }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-500 font-sans", children: [
                "#",
                l.rank
              ] })
            ] })
          ] }, l.pair)) })
        ] })
      ] })
    ] }),
    activeAnalysisView === "oddeven" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "export-oddeven-pdf-btn",
            onClick: handleExportOddEvenPDF,
            disabled: isExporting,
            className: "bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 text-xs font-bold py-1.5 px-3 rounded-lg border border-amber-500/30 flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50",
            title: "طاق و جفت پی ڈی ایف ڈاؤن لوڈ کریں",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Export PDF (طاق و جفت تجزیہ)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-300", children: "طاق بمقابلہ جفت کا مکمل ہندساتی و فرسٹ پرائز اختتام تجزیہ" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/50 p-5 rounded-xl border border-slate-800 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-white mb-2", children: "ہندساتی سطح پر طاق بمقابلہ جفت (All Digits Odd vs Even)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mb-4", children: "منتخب کردہ تمام تھائی لاٹری نمبرز کے کل ہندسوں کا تناسب" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-6 my-4 font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-amber-400 block font-bold", children: "طاق (Odd)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-white", children: [
                stats.oddVsEven.digitOddsPercentage,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-400 block", children: [
                stats.oddVsEven.totalOddDigits,
                " ہندسے"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-px bg-slate-800" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-indigo-400 block font-bold", children: "جفت (Even)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-white", children: [
                stats.oddVsEven.digitEvensPercentage,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-400 block", children: [
                stats.oddVsEven.totalEvenDigits,
                " ہندسے"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-slate-900 h-3 rounded-full overflow-hidden flex border border-slate-800 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-amber-500 h-full", style: { width: `${stats.oddVsEven.digitOddsPercentage}%` } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-indigo-500 h-full", style: { width: `${stats.oddVsEven.digitEvensPercentage}%` } })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/50 p-5 rounded-xl border border-slate-800 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-white mb-2", children: "فرسٹ پرائز آخری ہندسہ طاق بمقابلہ جفت (First Prize Ending)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mb-4", children: "فرسٹ پرائز کے آخری ہندسے کی بنیاد پر طاق اور جفت نتائج" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-6 my-4 font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-emerald-400 block font-bold", children: "طاق پر ختم (Odd)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-white", children: stats.oddVsEven.firstPrizeOddsCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block", children: "ڈراز" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-px bg-slate-800" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-sky-400 block font-bold", children: "جفت پر ختم (Even)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-white", children: stats.oddVsEven.firstPrizeEvensCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block", children: "ڈراز" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-slate-900 h-3 rounded-full overflow-hidden flex border border-slate-800 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-emerald-500 h-full",
                style: {
                  width: `${stats.totalDraws > 0 ? stats.oddVsEven.firstPrizeOddsCount / stats.totalDraws * 100 : 50}%`
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-sky-500 h-full",
                style: {
                  width: `${stats.totalDraws > 0 ? stats.oddVsEven.firstPrizeEvensCount / stats.totalDraws * 100 : 50}%`
                }
              }
            )
          ] })
        ] })
      ] })
    ] }),
    activeAnalysisView === "records" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-bold text-slate-400 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "export-records-pdf-btn",
            onClick: handleExportRecordsPDF,
            disabled: isExporting,
            className: "bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 text-xs font-bold py-1.5 px-3 rounded-lg border border-amber-500/30 flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50",
            title: "فلٹر شدہ ڈرا ریکارڈز پی ڈی ایف ڈاؤن لوڈ کریں",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Export PDF (ڈرا ریکارڈز فہرست)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-amber-400", children: [
            "ریکارڈز: ",
            filteredDraws.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فلٹر شدہ قرعہ اندازی کے نتائج کی فہرست" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-950/50 rounded-xl border border-slate-800 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto max-h-[420px] overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-900 text-slate-400 border-b border-slate-800 sticky top-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3", children: "سیکنڈ پرائزز" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-center", children: "F3 / B3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-center", children: "L2 (ڈاؤن)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 text-center", children: "فرسٹ پرائز" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3", children: "تاریخ (Date)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3", children: "ڈرا تفصیل" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-800/60 font-mono", children: filteredDraws.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "text-center py-8 text-slate-400 font-sans", children: "اس filter کے لیے Historical Records دستیاب نہیں ہیں۔" }) }) : filteredDraws.map((draw) => {
          var _a;
          const parsed = parseThaiDrawDate(draw.date);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-900/40 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-slate-400 text-[11px] truncate max-w-[150px]", title: (_a = draw.secondPrizes) == null ? void 0 : _a.join(", "), children: draw.secondPrizes && draw.secondPrizes.length > 0 ? draw.secondPrizes.join(", ") : "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-center text-slate-400 text-[11px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "F:",
                draw.front3Digits || "-"
              ] }),
              " | ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "B:",
                draw.back3Digits || "-"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-center font-bold text-indigo-400 text-sm", children: draw.last2Digits || "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-center font-bold text-base text-amber-400", children: draw.firstPrize }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 text-slate-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: draw.date }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-amber-400/80 font-sans", children: [
                parsed.is1st ? "یکم ڈرا" : parsed.is16th ? "16th ڈرا" : "",
                " (",
                parsed.monthNameUrdu,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-sans font-bold text-white text-xs", children: draw.drawNo })
          ] }, draw.id);
        }) })
      ] }) }) })
    ] })
  ] }) });
};
function extractFront3FromDraw(draw) {
  if (draw.front3Digits && typeof draw.front3Digits === "string") {
    const clean = draw.front3Digits.trim();
    if (/^\d{3}$/.test(clean)) {
      return clean;
    }
  }
  if (draw.firstPrize && typeof draw.firstPrize === "string") {
    const cleanFp = draw.firstPrize.trim().replace(/\D/g, "");
    if (cleanFp.length >= 3) {
      return cleanFp.slice(0, 3);
    }
  }
  return null;
}
function calculateRootSum(num) {
  let val = Math.abs(num);
  while (val >= 10) {
    val = val.toString().split("").reduce((acc, d) => acc + parseInt(d, 10), 0);
  }
  return val;
}
function buildFront3Records(draws) {
  const records = [];
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
    let patternType = "distinct";
    if (d1 === d2 && d2 === d3) {
      patternType = "triple";
    } else if (d1 === d2 || d2 === d3 || d1 === d3) {
      patternType = "double";
    }
    records.push({
      id: draw.id || `${draw.date}-${front3}`,
      drawNo: draw.drawNo || "تھائی ڈرا",
      date: draw.date,
      parsedDate,
      firstPrize: draw.firstPrize || "",
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
      patternType
    });
  });
  return records;
}
function filterFront3Records(records, dateFilter = "all", monthFilter = "all", yearFilter = "all") {
  if (!records || records.length === 0) return [];
  const seen = /* @__PURE__ */ new Set();
  const filtered = [];
  for (const r of records) {
    const parsed = r.parsedDate;
    if (!parsed || !parsed.isValid) continue;
    if (isThaiDrawMatchingFilters(parsed, dateFilter, monthFilter, yearFilter)) {
      const key = r.id || `${r.date}-${r.drawNo}`;
      if (!seen.has(key)) {
        seen.add(key);
        filtered.push(r);
      }
    }
  }
  return filtered;
}
function computeFront3Analysis(filteredRecords) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const totalRecords = filteredRecords.length;
  const recentSampleSize = Math.min(10, totalRecords);
  filteredRecords.slice(0, recentSampleSize);
  const posCounts = {
    1: { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 },
    2: { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 },
    3: { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 }
  };
  const posRecentCounts = {
    1: { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 },
    2: { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 },
    3: { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 }
  };
  const overallCounts = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0
  };
  const overallRecentCounts = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0
  };
  const comboMap = {};
  const pair12Counts = {};
  const pair23Counts = {};
  let triplesCount = 0;
  let doublesCount = 0;
  let distinctCount = 0;
  let totalOddDigits = 0;
  let totalEvenDigits = 0;
  let threeOddsCount = 0;
  let twoOddsOneEvenCount = 0;
  let oneOddTwoEvensCount = 0;
  let threeEvensCount = 0;
  const sumCounts = {};
  const rootCounts = {};
  filteredRecords.forEach((r, idx) => {
    const isRecent = idx < recentSampleSize;
    posCounts[1][r.d1] = (posCounts[1][r.d1] || 0) + 1;
    posCounts[2][r.d2] = (posCounts[2][r.d2] || 0) + 1;
    posCounts[3][r.d3] = (posCounts[3][r.d3] || 0) + 1;
    if (isRecent) {
      posRecentCounts[1][r.d1] = (posRecentCounts[1][r.d1] || 0) + 1;
      posRecentCounts[2][r.d2] = (posRecentCounts[2][r.d2] || 0) + 1;
      posRecentCounts[3][r.d3] = (posRecentCounts[3][r.d3] || 0) + 1;
    }
    [r.d1, r.d2, r.d3].forEach((d) => {
      overallCounts[d] = (overallCounts[d] || 0) + 1;
      if (isRecent) {
        overallRecentCounts[d] = (overallRecentCounts[d] || 0) + 1;
      }
    });
    if (!comboMap[r.front3]) {
      comboMap[r.front3] = { count: 0, dates: [] };
    }
    comboMap[r.front3].count++;
    comboMap[r.front3].dates.push(r.date);
    pair12Counts[r.pair12] = (pair12Counts[r.pair12] || 0) + 1;
    pair23Counts[r.pair23] = (pair23Counts[r.pair23] || 0) + 1;
    if (r.patternType === "triple") triplesCount++;
    else if (r.patternType === "double") doublesCount++;
    else distinctCount++;
    totalOddDigits += r.oddCount;
    totalEvenDigits += r.evenCount;
    if (r.oddCount === 3) threeOddsCount++;
    else if (r.oddCount === 2) twoOddsOneEvenCount++;
    else if (r.oddCount === 1) oneOddTwoEvensCount++;
    else threeEvensCount++;
    sumCounts[r.sum] = (sumCounts[r.sum] || 0) + 1;
    rootCounts[r.rootSum] = (rootCounts[r.rootSum] || 0) + 1;
  });
  const buildPosStats = (posIndex, labelUrdu, labelEng) => {
    const rawCounts = posCounts[posIndex];
    const rawRecent = posRecentCounts[posIndex];
    const sortedDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => {
      const count = rawCounts[digit] || 0;
      const percentage = totalRecords > 0 ? Math.round(count / totalRecords * 100) : 0;
      const recentCount = rawRecent[digit] || 0;
      const recentPercentage = recentSampleSize > 0 ? Math.round(recentCount / recentSampleSize * 100) : 0;
      return {
        digit,
        count,
        percentage,
        recentCount,
        recentPercentage,
        historicalCount: count,
        historicalPercentage: percentage
      };
    }).sort((a, b) => b.count - a.count);
    const digits0to9 = sortedDigits.map((it, idx) => {
      let status = "neutral";
      if (idx < 2 && it.count > 0) status = "hot";
      else if (idx >= 8) status = "cold";
      return {
        ...it,
        rank: idx + 1,
        status
      };
    });
    const hotDigits = digits0to9.filter((d) => d.status === "hot").map((d) => d.digit);
    const coldDigits = digits0to9.filter((d) => d.status === "cold").map((d) => d.digit);
    const topItem = digits0to9[0];
    return {
      positionIndex: posIndex,
      labelUrdu,
      labelEng,
      digits0to9,
      hotDigits,
      coldDigits,
      topDigit: topItem ? topItem.digit : "-",
      topDigitCount: topItem ? topItem.count : 0,
      topDigitPercentage: topItem ? topItem.percentage : 0
    };
  };
  const pos1 = buildPosStats(1, "فرنٹ پوزیشن 1 (اوپن ہندسہ)", "Front Position 1 (Open)");
  const pos2 = buildPosStats(2, "فرنٹ پوزیشن 2 (درمیانی ہندسہ)", "Front Position 2 (Center)");
  const pos3 = buildPosStats(3, "فرنٹ پوزیشن 3 (اختتامی ہندسہ)", "Front Position 3 (Close)");
  const totalDigitsInRecords = totalRecords * 3;
  const overallRecentTotalDigits = recentSampleSize * 3;
  const overallSorted = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => {
    const count = overallCounts[digit] || 0;
    const percentage = totalDigitsInRecords > 0 ? Math.round(count / totalDigitsInRecords * 100) : 0;
    const recentCount = overallRecentCounts[digit] || 0;
    const recentPercentage = overallRecentTotalDigits > 0 ? Math.round(recentCount / overallRecentTotalDigits * 100) : 0;
    return {
      digit,
      count,
      percentage,
      recentCount,
      recentPercentage,
      historicalCount: count,
      historicalPercentage: percentage
    };
  }).sort((a, b) => b.count - a.count);
  const overallDigitStats = overallSorted.map((it, idx) => ({
    ...it,
    rank: idx + 1,
    status: idx < 2 && it.count > 0 ? "hot" : idx >= 8 ? "cold" : "neutral"
  }));
  const allCombos = Object.keys(comboMap).map((comb) => ({
    combination: comb,
    count: comboMap[comb].count,
    percentage: totalRecords > 0 ? Math.round(comboMap[comb].count / totalRecords * 100) : 0,
    rank: 0,
    dates: comboMap[comb].dates,
    isRepeated: comboMap[comb].count > 1
  })).sort((a, b) => b.count - a.count);
  const topCombinations = allCombos.slice(0, 15).map((item, idx) => ({ ...item, rank: idx + 1 }));
  const leastCombinations = [...allCombos].reverse().slice(0, 15);
  const repeatedCombinations = allCombos.filter((c) => c.isRepeated);
  const pair12Stats = Object.keys(pair12Counts).map((pair) => ({
    pair,
    count: pair12Counts[pair],
    percentage: totalRecords > 0 ? Math.round(pair12Counts[pair] / totalRecords * 100) : 0,
    rank: 0
  })).sort((a, b) => b.count - a.count).slice(0, 15).map((p, idx) => ({ ...p, rank: idx + 1 }));
  const pair23Stats = Object.keys(pair23Counts).map((pair) => ({
    pair,
    count: pair23Counts[pair],
    percentage: totalRecords > 0 ? Math.round(pair23Counts[pair] / totalRecords * 100) : 0,
    rank: 0
  })).sort((a, b) => b.count - a.count).slice(0, 15).map((p, idx) => ({ ...p, rank: idx + 1 }));
  const patterns = {
    triplesCount,
    triplesPercentage: totalRecords > 0 ? Math.round(triplesCount / totalRecords * 100) : 0,
    doublesCount,
    doublesPercentage: totalRecords > 0 ? Math.round(doublesCount / totalRecords * 100) : 0,
    distinctCount,
    distinctPercentage: totalRecords > 0 ? Math.round(distinctCount / totalRecords * 100) : 0
  };
  const totalDigits = totalOddDigits + totalEvenDigits;
  const oddEven = {
    totalOddDigits,
    totalEvenDigits,
    oddDigitsPercentage: totalDigits > 0 ? Math.round(totalOddDigits / totalDigits * 100) : 50,
    evenDigitsPercentage: totalDigits > 0 ? Math.round(totalEvenDigits / totalDigits * 100) : 50,
    threeOddsCount,
    threeOddsPercentage: totalRecords > 0 ? Math.round(threeOddsCount / totalRecords * 100) : 0,
    twoOddsOneEvenCount,
    twoOddsOneEvenPercentage: totalRecords > 0 ? Math.round(twoOddsOneEvenCount / totalRecords * 100) : 0,
    oneOddTwoEvensCount,
    oneOddTwoEvensPercentage: totalRecords > 0 ? Math.round(oneOddTwoEvensCount / totalRecords * 100) : 0,
    threeEvensCount,
    threeEvensPercentage: totalRecords > 0 ? Math.round(threeEvensCount / totalRecords * 100) : 0
  };
  const sumStats = Object.keys(sumCounts).map((sStr) => {
    const sum = parseInt(sStr, 10);
    return {
      sum,
      count: sumCounts[sum],
      percentage: totalRecords > 0 ? Math.round(sumCounts[sum] / totalRecords * 100) : 0
    };
  }).sort((a, b) => b.count - a.count);
  const rootStats = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((root) => {
    const count = rootCounts[root] || 0;
    return {
      root,
      count,
      percentage: totalRecords > 0 ? Math.round(count / totalRecords * 100) : 0
    };
  }).sort((a, b) => b.count - a.count);
  const highlights = {
    topOverallHotDigit: ((_a = overallDigitStats[0]) == null ? void 0 : _a.digit) || "-",
    topOverallColdDigit: ((_b = overallDigitStats[overallDigitStats.length - 1]) == null ? void 0 : _b.digit) || "-",
    topCombo: ((_c = topCombinations[0]) == null ? void 0 : _c.combination) || "-",
    topComboCount: ((_d = topCombinations[0]) == null ? void 0 : _d.count) || 0,
    topPair12: ((_e = pair12Stats[0]) == null ? void 0 : _e.pair) || "-",
    topPair12Count: ((_f = pair12Stats[0]) == null ? void 0 : _f.count) || 0,
    topPair23: ((_g = pair23Stats[0]) == null ? void 0 : _g.pair) || "-",
    topPair23Count: ((_h = pair23Stats[0]) == null ? void 0 : _h.count) || 0,
    mostCommonSum: ((_i = sumStats[0]) == null ? void 0 : _i.sum) ?? 0,
    mostCommonSumCount: ((_j = sumStats[0]) == null ? void 0 : _j.count) ?? 0,
    mostCommonRoot: ((_k = rootStats[0]) == null ? void 0 : _k.root) ?? 0
  };
  return {
    totalRecords,
    recentSampleSize,
    positions: {
      pos1,
      pos2,
      pos3
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
    highlights
  };
}
const AIThaiFront3AnalysisTab = ({
  allThaiResults
}) => {
  const [drawDateFilter, setDrawDateFilter] = reactExports.useState("all");
  const [monthFilter, setMonthFilter] = reactExports.useState("all");
  const [yearFilter, setYearFilter] = reactExports.useState("all");
  const [activeSubView, setActiveSubView] = reactExports.useState("positions");
  const [selectedPos, setSelectedPos] = reactExports.useState(1);
  const [statusMsg, setStatusMsg] = reactExports.useState(null);
  const availableYears = reactExports.useMemo(() => {
    return getAvailableThaiYears(allThaiResults);
  }, [allThaiResults]);
  const allFront3Records = reactExports.useMemo(() => {
    return buildFront3Records(allThaiResults);
  }, [allThaiResults]);
  const filteredRecords = reactExports.useMemo(() => {
    return filterFront3Records(allFront3Records, drawDateFilter, monthFilter, yearFilter);
  }, [allFront3Records, drawDateFilter, monthFilter, yearFilter]);
  const metrics = reactExports.useMemo(() => {
    return computeFront3Analysis(filteredRecords);
  }, [filteredRecords]);
  const handleResetFilters = () => {
    setDrawDateFilter("all");
    setMonthFilter("all");
    setYearFilter("all");
    setStatusMsg({ text: "فرنٹ 3 کے تمام فلٹرز ری سیٹ کر دیے گئے ہیں۔", isError: false });
    setTimeout(() => setStatusMsg(null), 3e3);
  };
  const handleDownloadPDF = async () => {
    if (filteredRecords.length === 0) {
      setStatusMsg({ text: "ڈاؤن لوڈ کے لیے کوئی ریکارڈ موجود نہیں ہے۔", isError: true });
      setTimeout(() => setStatusMsg(null), 3e3);
      return;
    }
    const monthObj = THAI_MONTHS_LIST.find((m) => m.value === monthFilter);
    const dateLabel = drawDateFilter === "1st" ? "1st Date" : drawDateFilter === "16th" ? "16th Date" : "All Dates";
    const monthLabel = monthObj ? monthObj.labelEng : "All Months";
    const yearLabel = yearFilter === "all" ? "All Years" : yearFilter;
    const res = await generateThaiFront3PDF(
      filteredRecords,
      { dateLabel, monthLabel, yearLabel },
      metrics.highlights
    );
    if (res.success) {
      setStatusMsg({ text: "تھائی فرنٹ 3 پی ڈی ایف رپورٹ کامیابی سے ڈاؤن لوڈ ہو گئی ہے۔", isError: false });
    } else {
      setStatusMsg({ text: res.error || "پی ڈی ایف رپورٹ بنانے میں خرابی پیش آئی۔", isError: true });
    }
    setTimeout(() => setStatusMsg(null), 4e3);
  };
  const selectedPosData = selectedPos === 1 ? metrics.positions.pos1 : selectedPos === 2 ? metrics.positions.pos2 : metrics.positions.pos3;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-right", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/40 p-5 sm:p-6 rounded-3xl border border-slate-700/60 shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-700/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-amber-500/10 text-amber-400 font-mono font-bold px-3 py-1.5 rounded-xl border border-amber-500/25 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-3.5 h-3.5 text-amber-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "فرنٹ 3 ڈیٹا سیٹ: ",
              filteredRecords.length,
              " / ",
              allFront3Records.length,
              " ڈراز"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: handleDownloadPDF,
              className: "text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all shadow-sm",
              title: "پی ڈی ایف رپورٹ محفوظ کریں",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 text-amber-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پی ڈی ایف رپورٹ" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: handleResetFilters,
              className: "text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all",
              title: "فلٹرز ری سیٹ کریں",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5 text-amber-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ری سیٹ" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg sm:text-xl font-bold text-white flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تھائی لینڈ لاٹری — فرنٹ 3 ہندسے الگ تاریخی تجزیہ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-4 h-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1", children: "صرف First Prize کے ابتدائی 3 ہندسوں (Front 3) کا مکمل آزادانہ شماریاتی، پوزیشن وائز اور فریکوئنسی تجزیہ۔" })
        ] })
      ] }),
      statusMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-3 p-3 rounded-xl text-xs flex items-center justify-end gap-2 text-right ${statusMsg.isError ? "bg-red-500/10 border border-red-500/30 text-red-300" : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: statusMsg.text }),
        statusMsg.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-red-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-400" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold text-slate-300 mb-2 flex items-center justify-end gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "قرعہ اندازی تاریخ (Draw Date):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-amber-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setDrawDateFilter("all"),
                className: `py-1.5 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${drawDateFilter === "all" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"}`,
                children: "تمام (All)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setDrawDateFilter("1st"),
                className: `py-1.5 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${drawDateFilter === "1st" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"}`,
                children: "1 تاریخ"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setDrawDateFilter("16th"),
                className: `py-1.5 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${drawDateFilter === "16th" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"}`,
                children: "16 تاریخ"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold text-slate-300 mb-2 flex items-center justify-end gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مہینہ (Draw Month):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5 text-amber-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: monthFilter,
              onChange: (e) => setMonthFilter(e.target.value),
              className: "w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-500 outline-none text-right cursor-pointer",
              children: THAI_MONTHS_LIST.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m.value, className: "bg-slate-900", children: m.labelUrdu }, m.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold text-slate-300 mb-2 flex items-center justify-end gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "سال (Draw Year):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-amber-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: yearFilter,
              onChange: (e) => setYearFilter(e.target.value),
              className: "w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 text-xs font-mono font-semibold focus:border-amber-500 outline-none text-right cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", className: "bg-slate-900 font-sans", children: "تمام دستیاب سال (All Years)" }),
                availableYears.map((yr) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: yr, className: "bg-slate-900 font-mono", children: yr }, yr))
              ]
            }
          )
        ] })
      ] }),
      filteredRecords.length > 0 && filteredRecords.length < 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 bg-amber-500/10 border border-amber-500/30 text-amber-300 p-2.5 rounded-xl text-xs flex items-center justify-end gap-2 text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "توجہ فرمائیں: منتخب کردہ فلٹرز کے تحت صرف ",
          filteredRecords.length,
          " تاریخی ڈراز دستیاب ہیں۔ تجزیاتی تناسب کا انحصار انہی مخصوص ریکارڈز پر ہے۔"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-amber-400 shrink-0" })
      ] })
    ] }),
    filteredRecords.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/30 p-12 rounded-3xl border border-slate-800 text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-slate-800/80 text-amber-400 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-7 h-7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-bold text-white", children: "اس filter کے لیے Historical Records دستیاب نہیں ہیں" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 max-w-md mx-auto leading-relaxed", children: "براہ کرم اوپر موجود فلٹرز میں قرعہ اندازی کی تاریخ، مہینہ یا سال تبدیل کریں تاکہ مطلوبہ تاریخی ریکارڈز سامنے آ سکیں۔" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleResetFilters,
          className: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all cursor-pointer shadow inline-flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تمام فلٹرز ری سیٹ کریں" })
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-amber-400 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4 text-red-500 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-400", children: "ہاٹ ہندسہ (Hot)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black font-mono text-amber-400", children: metrics.highlights.topOverallHotDigit }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "فرنٹ 3 میں سب سے زیادہ" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-blue-400 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Snowflake, { className: "w-4 h-4 text-cyan-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-400", children: "کولڈ ہندسہ (Cold)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black font-mono text-cyan-400", children: metrics.highlights.topOverallColdDigit }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "سب سے کم فریکوئنسی" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-emerald-400 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-emerald-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-400", children: "ٹاپ Front 3" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black font-mono text-emerald-400", children: metrics.highlights.topCombo }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-slate-400 mt-0.5", children: [
            "آمد: ",
            metrics.highlights.topComboCount,
            " بار"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-purple-400 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4 text-purple-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-400", children: "جوڑی (Pos 1+2)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black font-mono text-purple-300", children: metrics.highlights.topPair12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-slate-400 mt-0.5", children: [
            "آمد: ",
            metrics.highlights.topPair12Count,
            " بار"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-pink-400 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4 text-pink-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-400", children: "جوڑی (Pos 2+3)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black font-mono text-pink-300", children: metrics.highlights.topPair23 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-slate-400 mt-0.5", children: [
            "آمد: ",
            metrics.highlights.topPair23Count,
            " بار"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-amber-400 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartPie, { className: "w-4 h-4 text-amber-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-400", children: "طاق بمقابلہ جفت" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-base font-bold font-mono text-white mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-400", children: [
              metrics.oddEven.oddDigitsPercentage,
              "%"
            ] }),
            " / ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-400", children: [
              metrics.oddEven.evenDigitsPercentage,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-slate-400 mt-0.5", children: [
            "طاق ",
            metrics.oddEven.totalOddDigits,
            " | جفت ",
            metrics.oddEven.totalEvenDigits
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row-reverse flex-wrap gap-2 border-b border-slate-800 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveSubView("positions"),
            className: `flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer ${activeSubView === "positions" ? "bg-amber-500 text-slate-950 shadow" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پوزیشن تجزیہ (Position 1, 2, 3)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveSubView("combinations"),
            className: `flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer ${activeSubView === "combinations" ? "bg-amber-500 text-slate-950 shadow" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ٹاپ و مکرر کمبینیشنز (Combinations)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveSubView("pairs"),
            className: `flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer ${activeSubView === "pairs" ? "bg-amber-500 text-slate-950 shadow" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "جوڑی تجزیہ (Digit Pairs 1+2 & 2+3)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveSubView("patterns"),
            className: `flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer ${activeSubView === "patterns" ? "bg-amber-500 text-slate-950 shadow" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پیٹرن، طاق/جفت و مفرد روٹ" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveSubView("records"),
            className: `flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer ${activeSubView === "records" ? "bg-amber-500 text-slate-950 shadow" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Table, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "تمام فلٹر شدہ ریکارڈز (",
                filteredRecords.length,
                ")"
              ] })
            ]
          }
        )
      ] }),
      activeSubView === "positions" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/40 p-3 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400", children: "حالیہ نمونہ (Recent Sample):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-slate-900 text-amber-400 font-mono px-2 py-0.5 rounded-md border border-slate-700", children: [
              "آخری ",
              metrics.recentSampleSize,
              " ڈراز"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 w-full sm:w-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setSelectedPos(1),
                className: `py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedPos === 1 ? "bg-amber-500 text-slate-950 shadow" : "bg-slate-900 text-slate-300 hover:bg-slate-750 border border-slate-700"}`,
                children: "پوزیشن 1 (اوپن)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setSelectedPos(2),
                className: `py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedPos === 2 ? "bg-amber-500 text-slate-950 shadow" : "bg-slate-900 text-slate-300 hover:bg-slate-750 border border-slate-700"}`,
                children: "پوزیشن 2 (درمیانی)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setSelectedPos(3),
                className: `py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedPos === 3 ? "bg-amber-500 text-slate-950 shadow" : "bg-slate-900 text-slate-300 hover:bg-slate-750 border border-slate-700"}`,
                children: "پوزیشن 3 (اختتامی)"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-5 sm:p-6 rounded-3xl border border-slate-700/60 shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-slate-700/50 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] bg-red-500/10 text-red-400 px-2.5 py-1 rounded-lg border border-red-500/20 font-bold flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3 text-red-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "ہاٹ: ",
                  selectedPosData.hotDigits.join(", ") || "کوئی نہیں"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-lg border border-cyan-500/20 font-bold flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Snowflake, { className: "w-3 h-3 text-cyan-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "کولڈ: ",
                  selectedPosData.coldDigits.join(", ") || "کوئی نہیں"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-white flex items-center justify-end gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedPosData.labelUrdu }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-400 font-normal", children: [
                  "(",
                  selectedPosData.labelEng,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-slate-400", children: [
                "فرنٹ 3 کے ہندسہ نمبر ",
                selectedPos,
                " کا تمام ",
                filteredRecords.length,
                " ڈراز میں تجزیہ"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6", children: selectedPosData.digits0to9.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `p-3.5 rounded-2xl border text-right transition-all ${item.status === "hot" ? "bg-gradient-to-b from-amber-500/15 to-red-500/10 border-amber-500/40 shadow-sm" : item.status === "cold" ? "bg-slate-900/90 border-cyan-500/20" : "bg-slate-900/60 border-slate-800"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono font-bold text-slate-400", children: [
                    "رینک #",
                    item.rank
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    item.status === "hot" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-2.5 h-2.5 text-red-400" }),
                      " ہاٹ"
                    ] }),
                    item.status === "cold" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Snowflake, { className: "w-2.5 h-2.5 text-cyan-400" }),
                      " کولڈ"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-black font-mono text-white", children: item.digit }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-bold font-mono text-amber-400", children: [
                    item.percentage,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `h-full rounded-full ${item.status === "hot" ? "bg-amber-500" : item.status === "cold" ? "bg-cyan-500" : "bg-slate-500"}`,
                    style: { width: `${Math.min(100, Math.max(5, item.percentage))}%` }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 text-[10px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-slate-300 font-mono", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white font-bold", children: [
                      item.count,
                      " بار"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 font-sans", children: "تاریخی آمد:" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-slate-400 font-mono", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-300 font-bold", children: [
                      item.recentCount,
                      " بار (",
                      item.recentPercentage,
                      "%)"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 font-sans", children: [
                      "حالیہ (",
                      metrics.recentSampleSize,
                      "):"
                    ] })
                  ] })
                ] })
              ]
            },
            item.digit
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-slate-700/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-900 text-slate-300 font-bold border-b border-slate-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2.5 text-center font-mono", children: "ہندسہ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2.5", children: "حیثیت (Status)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2.5 text-center font-mono", children: "رینک" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2.5 text-center font-mono", children: "تاریخی فریکوئنسی" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2.5 text-center font-mono", children: "تاریخی فیصد" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { className: "p-2.5 text-center font-mono", children: [
                "حالیہ فریکوئنسی (",
                metrics.recentSampleSize,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2.5 text-center font-mono", children: "حالیہ فیصد" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-800 bg-slate-950/40", children: selectedPosData.digits0to9.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-800/40 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2.5 text-center font-mono font-black text-amber-400 text-sm", children: d.digit }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2.5", children: d.status === "hot" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3" }),
                " ہاٹ ہندسہ"
              ] }) : d.status === "cold" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded font-bold inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Snowflake, { className: "w-3 h-3" }),
                " کولڈ ہندسہ"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "معتدل (Neutral)" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-2.5 text-center font-mono text-slate-300", children: [
                "#",
                d.rank
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-2.5 text-center font-mono font-bold text-white", children: [
                d.count,
                " بار"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-2.5 text-center font-mono text-amber-400 font-bold", children: [
                d.percentage,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-2.5 text-center font-mono text-slate-200", children: [
                d.recentCount,
                " بار"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-2.5 text-center font-mono text-emerald-400 font-bold", children: [
                d.recentPercentage,
                "%"
              ] })
            ] }, d.digit)) })
          ] }) })
        ] })
      ] }),
      activeSubView === "combinations" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-3 border-b border-slate-700/50 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-purple-500/10 text-purple-300 px-3 py-1 rounded-lg border border-purple-500/25 font-bold font-mono", children: [
              "تعداد: ",
              metrics.repeatedCombinations.length,
              " مکرر کمبینیشنز"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-white flex items-center justify-end gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "بار بار دہرائے جانے والے Front 3 (Repeated Combinations)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-purple-400" })
            ] })
          ] }),
          metrics.repeatedCombinations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 py-4 text-center", children: "منتخب کردہ فلٹرز کے تحت کوئی Front 3 ایک سے زائد بار نہیں آیا۔" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3", children: metrics.repeatedCombinations.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/80 p-3.5 rounded-2xl border border-purple-500/30 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] bg-purple-500/20 text-purple-300 font-bold font-mono px-2 py-0.5 rounded-md", children: [
                "آمد: ",
                c.count,
                " بار (",
                c.percentage,
                "%)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-black font-mono text-amber-400 tracking-wider", children: c.combination })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-slate-400 mt-2 border-t border-slate-800 pt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "تاریخیں: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300 font-mono", children: c.dates.join(" ، ") })
            ] })
          ] }, c.combination)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-bold text-white mb-3 pb-2 border-b border-slate-700/50 flex items-center justify-end gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "سب سے زیادہ آنے والے Front 3 (Top Frequent)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4 text-amber-400" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: metrics.topCombinations.slice(0, 10).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-amber-500/10 text-amber-400 font-mono font-bold px-2 py-0.5 rounded border border-amber-500/20", children: [
                item.count,
                " بار (",
                item.percentage,
                "%)"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black font-mono text-white tracking-widest", children: item.combination }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-slate-400", children: [
                  "#",
                  item.rank
                ] })
              ] })
            ] }, item.combination)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-bold text-white mb-3 pb-2 border-b border-slate-700/50 flex items-center justify-end gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "کم آنے والے Front 3 کمبینیشنز (Least Frequent / Rare)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Snowflake, { className: "w-4 h-4 text-cyan-400" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: metrics.leastCombinations.slice(0, 10).map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-cyan-500/10 text-cyan-400 font-mono font-bold px-2 py-0.5 rounded border border-cyan-500/20", children: [
                item.count,
                " بار (",
                item.percentage,
                "%)"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black font-mono text-slate-300 tracking-widest", children: item.combination }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-slate-500", children: [
                  "#",
                  idx + 1
                ] })
              ] })
            ] }, `${item.combination}-${idx}`)) })
          ] })
        ] })
      ] }),
      activeSubView === "pairs" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-3 border-b border-slate-700/50 mb-4 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-white flex items-center justify-end gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فرنٹ جوڑی (Position 1 + 2 Akra)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4 text-amber-400" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mt-0.5", children: "Front 3 کے پہلے دو ہندسوں کا باہمی ملاپ" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: metrics.pair12Stats.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-amber-500/10 text-amber-400 font-mono font-bold px-2 py-0.5 rounded border border-amber-500/20", children: [
              item.count,
              " بار (",
              item.percentage,
              "%)"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black font-mono text-white tracking-widest", children: item.pair }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-slate-400", children: [
                "#",
                item.rank
              ] })
            ] })
          ] }, item.pair)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-3 border-b border-slate-700/50 mb-4 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-white flex items-center justify-end gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پچھلی جوڑی (Position 2 + 3 Pair)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4 text-pink-400" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mt-0.5", children: "Front 3 کے دوسرے اور تیسرے ہندسے کا باہمی ملاپ" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: metrics.pair23Stats.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-pink-500/10 text-pink-400 font-mono font-bold px-2 py-0.5 rounded border border-pink-500/20", children: [
              item.count,
              " بار (",
              item.percentage,
              "%)"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black font-mono text-white tracking-widest", children: item.pair }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-slate-400", children: [
                "#",
                item.rank
              ] })
            ] })
          ] }, item.pair)) })
        ] })
      ] }),
      activeSubView === "patterns" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-white mb-4 pb-2 border-b border-slate-700/50 flex items-center justify-end gap-1.5 text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ہندساتی ساخت (Digit Repeat Patterns)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "w-4 h-4 text-amber-400" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-3 rounded-2xl border border-slate-800 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20", children: [
                  metrics.patterns.distinctCount,
                  " بار (",
                  metrics.patterns.distinctPercentage,
                  "%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-white block", children: "تینوں مختلف ہندسے (Distinct)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400", children: "مثال: 123 ، 789 ، 456" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-3 rounded-2xl border border-slate-800 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20", children: [
                  metrics.patterns.doublesCount,
                  " بار (",
                  metrics.patterns.doublesPercentage,
                  "%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-white block", children: "دو یکساں ہندسے (Doubles)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400", children: "مثال: 112 ، 212 ، 221" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-3 rounded-2xl border border-slate-800 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/20", children: [
                  metrics.patterns.triplesCount,
                  " بار (",
                  metrics.patterns.triplesPercentage,
                  "%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-white block", children: "تینوں یکساں (Triples)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400", children: "مثال: 777 ، 333 ، 000" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-base font-bold text-white mb-4 pb-2 border-b border-slate-700/50 flex items-center justify-end gap-1.5 text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "طاق بمقابلہ جفت ساخت (Odd / Even Breakdown)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartPie, { className: "w-4 h-4 text-blue-400" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-amber-400 font-bold", children: [
                  metrics.oddEven.threeOddsCount,
                  " بار (",
                  metrics.oddEven.threeOddsPercentage,
                  "%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300", children: "3 طاق ہندسے (All Odd)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-amber-300 font-bold", children: [
                  metrics.oddEven.twoOddsOneEvenCount,
                  " بار (",
                  metrics.oddEven.twoOddsOneEvenPercentage,
                  "%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300", children: "2 طاق + 1 جفت (2 Odd, 1 Even)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-blue-300 font-bold", children: [
                  metrics.oddEven.oneOddTwoEvensCount,
                  " بار (",
                  metrics.oddEven.oneOddTwoEvensPercentage,
                  "%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300", children: "1 طاق + 2 جفت (1 Odd, 2 Even)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-blue-400 font-bold", children: [
                  metrics.oddEven.threeEvensCount,
                  " بار (",
                  metrics.oddEven.threeEvensPercentage,
                  "%)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300", children: "3 جفت ہندسے (All Even)" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-bold text-white mb-3 pb-2 border-b border-slate-700/50 flex items-center justify-end gap-1.5 text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Front 3 ہندساتی مجموعہ (Digit Sum: 0 - 27)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-emerald-400" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: metrics.sumStats.slice(0, 9).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 p-2 rounded-xl border border-slate-800 flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-emerald-400", children: [
                s.count,
                "x (",
                s.percentage,
                "%)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-white text-sm", children: [
                "مجموعہ ",
                s.sum
              ] })
            ] }, s.sum)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-bold text-white mb-3 pb-2 border-b border-slate-700/50 flex items-center justify-end gap-1.5 text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "عددی مفرد روٹ (Harmonic Root: 1 - 9)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-purple-400" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: metrics.rootStats.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-mono font-black text-amber-400", children: r.root }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-mono text-slate-300 mt-0.5", children: [
                r.count,
                " بار (",
                r.percentage,
                "%)"
              ] })
            ] }, r.root)) })
          ] })
        ] })
      ] }),
      activeSubView === "records" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-5 rounded-3xl border border-slate-700/60 shadow-md space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-700/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-slate-900 text-slate-300 px-3 py-1 rounded-xl border border-slate-700 font-mono", children: [
            "کل ریکارڈز: ",
            filteredRecords.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-bold text-white flex items-center justify-end gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تھائی لاٹری فرنٹ 3 تاریخی ریکارڈز لاگ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table, { className: "w-4 h-4 text-amber-400" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-slate-700/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-900 text-slate-300 font-bold border-b border-slate-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-center font-mono", children: "نمبر شمار" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-center font-mono", children: "قرعہ اندازی تاریخ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "ڈرا کی تفصیل" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-center font-mono", children: "مکمل First Prize" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-center font-mono", children: "Front 3 (تجزیاتی)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-center font-mono", children: "Pos 1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-center font-mono", children: "Pos 2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-center font-mono", children: "Pos 3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-center font-mono", children: "مجموعہ / روٹ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-center", children: "پیٹرن" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-800 bg-slate-950/40", children: filteredRecords.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-800/40 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center font-mono text-slate-400", children: idx + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center font-mono text-slate-200", children: r.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-slate-300 font-semibold", children: r.drawNo }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center font-mono font-bold text-slate-400", children: r.firstPrize || "--" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center font-mono font-black text-amber-400 text-base bg-amber-500/10 rounded", children: r.front3 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center font-mono font-bold text-white", children: r.d1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center font-mono font-bold text-white", children: r.d2 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center font-mono font-bold text-white", children: r.d3 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 text-center font-mono text-emerald-400", children: [
              r.sum,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500 text-[10px]", children: [
                "(روٹ ",
                r.rootSum,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center", children: r.patternType === "triple" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded font-bold", children: "ٹرپل" }) : r.patternType === "double" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-purple-500/20 text-purple-400 text-[10px] px-2 py-0.5 rounded font-bold", children: "ڈبل" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-[10px]", children: "مختلف" }) })
          ] }, r.id)) })
        ] }) })
      ] })
    ] })
  ] });
};
const AIHistoryTab = ({
  historySearchQuery,
  setHistorySearchQuery,
  historyCategory,
  setHistoryCategory,
  historyBondValue,
  setHistoryBondValue,
  historyCity,
  setHistoryCity,
  filteredHistory,
  thaiDrawDateFilter = "all",
  setThaiDrawDateFilter,
  thaiMonthFilter = "all",
  setThaiMonthFilter,
  thaiYearFilter = "all",
  setThaiYearFilter,
  availableThaiYears = [],
  onResetThaiFilters
}) => {
  const [statusMsg, setStatusMsg] = React.useState(null);
  const quickStats = reactExports.useMemo(() => {
    return computeAnalysisStats(filteredHistory);
  }, [filteredHistory]);
  const handleDownload = async () => {
    if (!filteredHistory || filteredHistory.length === 0) {
      setStatusMsg({ text: "کوئی ریکارڈ موجود نہیں ہے۔", isError: true });
      setTimeout(() => setStatusMsg(null), 4e3);
      return;
    }
    const res = await generateDrawHistoryPDF(filteredHistory, historyCategory, {
      bondValue: historyBondValue,
      city: historyCity
    });
    if (res.success) {
      setStatusMsg({ text: "نتائج پی ڈی ایف رپورٹ کامیابی سے تیار کر دی گئی ہے!", isError: false });
      setTimeout(() => setStatusMsg(null), 4e3);
    } else {
      setStatusMsg({ text: res.error || "پی ڈی ایف بنانے میں خرابی پیش آئی۔", isError: true });
      setTimeout(() => setStatusMsg(null), 4e3);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-slate-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "نمبر، تاریخ، ڈرا یا شہر تلاش کریں...",
            value: historySearchQuery,
            onChange: (e) => setHistorySearchQuery(e.target.value),
            className: "w-full bg-slate-950 text-xs text-white pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-amber-500/50 outline-none text-right"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-1 sm:order-last", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-base sm:text-lg font-bold text-white flex items-center justify-end gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "سابقہ قرعہ اندازی کے نتائج (Historical Records)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-5 h-5 text-amber-400" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1", children: "ہر بانڈ کی الگ مالیت اور شہر منتخب کر کے فلٹر کریں اور اینالیسس دیکھیں" })
      ] })
    ] }),
    statusMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-3 mb-4 rounded-xl text-xs text-right border ${statusMsg.isError ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"}`, children: [
      statusMsg.isError ? "⚠️ " : "✓ ",
      " ",
      statusMsg.text
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          id: "download-history-pdf-btn",
          onClick: handleDownload,
          className: "w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-amber-500/10 transition-all text-xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نتائج پی ڈی ایف رپورٹ ڈاؤن لوڈ کریں" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row-reverse gap-2 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setHistoryCategory("all"),
            className: `py-1.5 px-3.5 rounded-xl border cursor-pointer font-bold text-xs transition-all ${historyCategory === "all" ? "bg-slate-900 border-amber-500 text-amber-400 shadow-sm" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80"}`,
            children: "تمام کیٹیگریز"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setHistoryCategory("pakistan_bond"),
            className: `py-1.5 px-3.5 rounded-xl border cursor-pointer font-bold text-xs transition-all ${historyCategory === "pakistan_bond" ? "bg-slate-900 border-amber-500 text-amber-400 shadow-sm" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80"}`,
            children: "پاکستان بانڈز"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setHistoryCategory("thailand_lottery"),
            className: `py-1.5 px-3.5 rounded-xl border cursor-pointer font-bold text-xs transition-all ${historyCategory === "thailand_lottery" ? "bg-slate-900 border-amber-500 text-amber-400 shadow-sm" : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700/80"}`,
            children: "تھائی لاٹری"
          }
        )
      ] })
    ] }),
    historyCategory === "thailand_lottery" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 bg-slate-950/40 p-4 rounded-xl border border-slate-800 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800/80 pb-2.5", children: [
        onResetThaiFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "reset-history-thai-filters-btn",
            onClick: onResetThaiFilters,
            className: "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-bold py-1 px-2.5 rounded-lg border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3 h-3 text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فلٹرز ری سیٹ (Reset)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-bold text-amber-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تھائی لاٹری تاریخ و مہینہ فلٹرز (Draw Date & Month Filter)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-right text-[10px] font-bold text-slate-300 flex items-center justify-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "قرعہ اندازی تاریخ (Draw Date):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 text-amber-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setThaiDrawDateFilter && setThaiDrawDateFilter("all"),
                className: `py-1.5 px-2 text-center rounded-lg text-[11px] font-bold cursor-pointer transition-all ${thaiDrawDateFilter === "all" ? "bg-amber-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"}`,
                children: "تمام"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setThaiDrawDateFilter && setThaiDrawDateFilter("1st"),
                className: `py-1.5 px-2 text-center rounded-lg text-[11px] font-bold cursor-pointer transition-all ${thaiDrawDateFilter === "1st" ? "bg-amber-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"}`,
                children: "1 تاریخ"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setThaiDrawDateFilter && setThaiDrawDateFilter("16th"),
                className: `py-1.5 px-2 text-center rounded-lg text-[11px] font-bold cursor-pointer transition-all ${thaiDrawDateFilter === "16th" ? "bg-amber-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"}`,
                children: "16 تاریخ"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-right text-[10px] font-bold text-slate-300", children: "مہینہ (Month):" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: thaiMonthFilter,
              onChange: (e) => setThaiMonthFilter && setThaiMonthFilter(e.target.value),
              className: "w-full bg-slate-900 border border-slate-800 text-slate-200 py-1.5 px-3 rounded-xl text-[11px] font-bold focus:border-amber-500/50 outline-none text-right cursor-pointer",
              children: THAI_MONTHS_LIST.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m.value, className: "bg-slate-900 text-white", children: m.labelUrdu }, m.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-right text-[10px] font-bold text-slate-300", children: "سال (Year):" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: thaiYearFilter,
              onChange: (e) => setThaiYearFilter && setThaiYearFilter(e.target.value),
              className: "w-full bg-slate-900 border border-slate-800 text-slate-200 py-1.5 px-3 rounded-xl text-[11px] font-bold focus:border-amber-500/50 outline-none text-right cursor-pointer font-mono",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", className: "bg-slate-900 text-white font-sans", children: "تمام سال (All)" }),
                availableThaiYears.map((yr) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: yr, className: "bg-slate-900 text-white font-mono", children: yr }, yr))
              ]
            }
          )
        ] })
      ] })
    ] }),
    historyCategory !== "thailand_lottery" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-slate-300 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-3.5 h-3.5 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "بانڈ ویلیو کے مطابق فلٹر کریں (Filter by Bond Value):" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-amber-400 font-mono font-bold", children: [
          "منتخب: ",
          historyBondValue === "all" ? "تمام بانڈز" : historyBondValue
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-row-reverse flex-wrap gap-1.5", children: PK_BOND_CATEGORIES.map((bond) => {
        const isSelected = historyBondValue === bond.value;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setHistoryBondValue(bond.value),
            className: `py-1 px-2.5 rounded-lg text-xs cursor-pointer transition-all ${isSelected ? "bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/10" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"}`,
            children: bond.labelUrdu
          },
          bond.value
        );
      }) })
    ] }),
    historyCategory !== "thailand_lottery" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-slate-300 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "شہر کے مطابق فلٹر کریں (Filter by City):" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-amber-400 font-mono font-bold", children: [
          "منتخب: ",
          historyCity === "all" ? "تمام شہر" : historyCity
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row-reverse flex-wrap gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setHistoryCity("all"),
            className: `py-1 px-2.5 rounded-lg text-xs cursor-pointer transition-all ${historyCity === "all" ? "bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/10" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"}`,
            children: "تمام شہر"
          }
        ),
        PK_CITIES_LIST.map((city) => {
          const isSelected = historyCity === city.nameUrdu;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setHistoryCity(city.nameUrdu),
              className: `py-1 px-2.5 rounded-lg text-xs cursor-pointer transition-all ${isSelected ? "bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/10" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"}`,
              children: city.nameUrdu
            },
            city.code
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block font-bold", children: "فلٹر شدہ ڈراز" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-base font-bold text-white block mt-0.5", children: [
          filteredHistory.length,
          " Records"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block font-bold", children: "ہاٹ اوپن ہندسہ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-base font-bold text-amber-400 block mt-0.5", children: [
          quickStats.topOpenDigit,
          " (",
          quickStats.topOpenCount,
          "x)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block font-bold", children: "ٹاپ آکڑا جوڑی" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-base font-bold text-sky-400 block mt-0.5", children: quickStats.topAkras[0] ? `${quickStats.topAkras[0].akra} (${quickStats.topAkras[0].count}x)` : "--" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block font-bold", children: "طاق / جفت تناسب" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-base font-bold text-emerald-400 block mt-0.5", children: [
          quickStats.digitOddsPercentage,
          "% / ",
          quickStats.digitEvensPercentage,
          "%"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-right border-collapse text-xs sm:text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-slate-950 text-slate-400 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "تاریخ (Date)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "شہر / ملک" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "سیکنڈ انعامات (Seconds)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "فرسٹ انعام (First)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right", children: "ڈرا نمبر / سکیم" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-800/60 bg-slate-900/40", children: filteredHistory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "p-6 text-center text-slate-500", children: "کوئی ریکارڈ نہیں ملا۔ فلٹر یا تلاش تبدیل کر کے دیکھیں۔" }) }) : filteredHistory.map((draw) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-850/50 transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-mono text-slate-400 text-xs", children: draw.date }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-slate-300 font-semibold", children: draw.city }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-slate-400 font-mono text-xs max-w-xs truncate", children: Array.isArray(draw.secondPrizes) ? draw.secondPrizes.join(", ") : draw.secondPrizes }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-mono font-black text-amber-400 text-sm", children: draw.firstPrize }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 font-bold text-white text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: draw.drawNo }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 block", children: draw.category === "pakistan_bond" ? "پاکستان بانڈ" : "تھائی لاٹری" })
        ] })
      ] }, draw.id)) })
    ] }) })
  ] }) });
};
const AIChatbotTab = ({
  suggestedQuestions,
  handleChatQuestionClick,
  chatMessages,
  chatInput,
  setChatInput,
  handleSendChatInput
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/50 p-4 sm:p-6 rounded-2xl border border-slate-700/50 flex flex-col h-[520px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-slate-700/60 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-emerald-500/20 text-emerald-400 text-[9px] font-bold py-1 px-2 rounded-full flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "آن لائن (AI Live Response)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs sm:text-sm font-bold text-white flex items-center justify-end gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "قریشی اے آئی لاٹری ایکسپرٹ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-amber-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400", children: "ریئل ٹائم تجزیاتی بوٹ برائے امکانی فارمولا جات" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block mb-2", children: "فوری مدد کے لیے سوال دبائیں (Quick Questions):" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-row-reverse flex-wrap gap-1.5", children: suggestedQuestions.map((q, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => handleChatQuestionClick(q),
          className: "bg-slate-900 hover:bg-slate-950 text-slate-300 hover:text-white border border-slate-800 py-1.5 px-3 rounded-lg text-[10px] transition-all cursor-pointer",
          children: q
        },
        idx
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto space-y-4 p-2 bg-slate-950/60 rounded-xl border border-slate-850 shadow-inner mb-4 flex flex-col-reverse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: chatMessages.map((msg, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex flex-col max-w-[85%] ${msg.sender === "user" ? "mr-auto items-start" : "ml-auto items-end"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `p-3 rounded-2xl text-xs leading-relaxed text-right ${msg.sender === "user" ? "bg-amber-500 text-slate-950 rounded-tl-none font-bold" : "bg-slate-800 text-slate-200 rounded-tr-none border border-slate-700/50"}`,
              children: msg.text
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-slate-500 mt-1 font-mono", children: msg.time })
        ]
      },
      idx
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendChatInput, className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          className: "bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 rounded-xl flex items-center justify-center cursor-pointer active:translate-y-0.5 transition-all",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: chatInput,
          onChange: (e) => setChatInput(e.target.value),
          placeholder: "اے آئی سے لاٹری لیمٹ یا فارمولا کے بارے میں سوال پوچھیں...",
          className: "flex-1 bg-slate-950 text-xs text-white border border-slate-800 rounded-xl p-3 text-right outline-none focus:border-amber-500/50"
        }
      )
    ] })
  ] }) });
};
function filterPakistanBondDraws(draws, bondValue = "all", city = "all") {
  return draws.filter((draw) => {
    if (bondValue !== "all") {
      const normalizedBond = normalizeDrawBondValue(draw);
      if (!isBondMatchForAnalysis(normalizedBond, bondValue)) return false;
    }
    if (city !== "all") {
      if (draw.city !== city) return false;
    }
    return true;
  });
}
function computePakistanHistoricalStats(draws) {
  const totalDraws = draws.length;
  const posCounts = Array.from({ length: 6 }, () => Array(10).fill(0));
  const digitCounts = Array(10).fill(0);
  const akraCounts = {};
  const recentAkraCounts = {};
  let totalOddDigits = 0;
  let totalEvenDigits = 0;
  let repeatedDigitDrawsCount = 0;
  const recentSlice = draws.slice(0, Math.min(15, Math.max(5, Math.floor(totalDraws * 0.25))));
  draws.forEach((draw, idx) => {
    const num = (draw.firstPrize || "").trim();
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
  const oddPercentage = Math.round(totalOddDigits / totalDigits * 100);
  const evenPercentage = Math.round(totalEvenDigits / totalDigits * 100);
  const posPercentages = posCounts.map((arr) => {
    const sum = arr.reduce((a, b) => a + b, 0) || 1;
    return arr.map((cnt) => cnt / sum * 100);
  });
  const digitRanked = digitCounts.map((cnt, d) => ({ digit: d.toString(), count: cnt })).sort((a, b) => b.count - a.count);
  const hotDigits = digitRanked.slice(0, 3).map((x) => x.digit);
  const coldDigits = digitRanked.slice(-3).map((x) => x.digit);
  const sortedAkras = Object.entries(akraCounts).map(([akra, count]) => ({ akra, count })).sort((a, b) => b.count - a.count);
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
    repeatedDigitRatio: totalDraws > 0 ? repeatedDigitDrawsCount / totalDraws : 0.3
  };
}
function computeThaiHistoricalStats(draws) {
  const totalDraws = draws.length;
  const posCounts = Array.from({ length: 4 }, () => Array(10).fill(0));
  const digitCounts = Array(10).fill(0);
  const akraCounts = {};
  const last2Counts = {};
  let totalOddDigits = 0;
  let totalEvenDigits = 0;
  let repeatedDigitDrawsCount = 0;
  draws.forEach((draw) => {
    const raw = (draw.firstPrize || "").trim();
    let fourDigit = "";
    if (raw.length >= 6) {
      fourDigit = raw.substring(raw.length - 4);
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
    if (draw.last2Digits && draw.last2Digits.length === 2) {
      last2Counts[draw.last2Digits] = (last2Counts[draw.last2Digits] || 0) + 2;
    }
  });
  const totalDigits = totalOddDigits + totalEvenDigits || 1;
  const oddPercentage = Math.round(totalOddDigits / totalDigits * 100);
  const evenPercentage = Math.round(totalEvenDigits / totalDigits * 100);
  const posPercentages = posCounts.map((arr) => {
    const sum = arr.reduce((a, b) => a + b, 0) || 1;
    return arr.map((cnt) => cnt / sum * 100);
  });
  const digitRanked = digitCounts.map((cnt, d) => ({ digit: d.toString(), count: cnt })).sort((a, b) => b.count - a.count);
  const hotDigits = digitRanked.slice(0, 3).map((x) => x.digit);
  const coldDigits = digitRanked.slice(-3).map((x) => x.digit);
  const sortedAkras = Object.entries(akraCounts).map(([akra, count]) => ({ akra, count })).sort((a, b) => b.count - a.count);
  const sortedL2 = Object.entries(last2Counts).map(([l2, count]) => ({ l2, count })).sort((a, b) => b.count - a.count);
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
    repeatedDigitRatio: totalDraws > 0 ? repeatedDigitDrawsCount / totalDraws : 0.25
  };
}
function scorePakistanCandidate(cand, stats, formula) {
  var _a, _b;
  if (cand.length !== 6) return 50;
  let posScoreSum = 0;
  for (let i = 0; i < 6; i++) {
    const d = parseInt(cand[i], 10);
    const pct = stats.posPercentages[i][d] || 0;
    posScoreSum += pct;
  }
  const posScore = Math.min(40, posScoreSum / 60 * 25);
  const akra = cand.substring(0, 2);
  const akraCount = ((_a = stats.sortedAkras.find((a) => a.akra === akra)) == null ? void 0 : _a.count) || 0;
  const maxAkraCount = ((_b = stats.sortedAkras[0]) == null ? void 0 : _b.count) || 1;
  const akraScore = Math.min(25, akraCount / maxAkraCount * 25);
  let oddCount = 0;
  for (let i = 0; i < 6; i++) {
    if (parseInt(cand[i], 10) % 2 !== 0) oddCount++;
  }
  const candOddRatio = oddCount / 6;
  const histOddRatio = (stats.oddPercentage || 50) / 100;
  const oddDiff = Math.abs(candOddRatio - histOddRatio);
  const oddScore = Math.max(0, 15 - oddDiff * 25);
  let hotCount = 0;
  let coldCount = 0;
  for (let i = 0; i < 6; i++) {
    if (stats.hotDigits.includes(cand[i])) hotCount++;
    if (stats.coldDigits.includes(cand[i])) coldCount++;
  }
  const hotScore = Math.min(10, Math.max(0, hotCount * 2.5 - coldCount * 1.5 + 4));
  let formulaScore = 7;
  if (formula === "odd_even") {
    formulaScore = oddCount === 3 ? 10 : oddCount === 2 || oddCount === 4 ? 8 : 5;
  } else if (formula === "frequency") {
    formulaScore = akraCount > 0 ? 10 : 6;
  } else if (formula === "astrological") {
    const sum = cand.split("").reduce((acc, ch) => acc + parseInt(ch, 10), 0);
    const digitalRoot = (sum - 1) % 9 + 1;
    formulaScore = [1, 3, 7, 9].includes(digitalRoot) ? 10 : 7;
  }
  const rawScore = posScore + akraScore + oddScore + hotScore + formulaScore;
  const finalScore = Math.min(96.5, Math.max(68, Math.round(rawScore * 10) / 10));
  return finalScore;
}
function scoreThaiCandidate(cand, stats, formula) {
  var _a, _b, _c, _d;
  if (cand.length !== 4) return 50;
  let posScoreSum = 0;
  for (let i = 0; i < 4; i++) {
    const d = parseInt(cand[i], 10);
    const pct = stats.posPercentages[i][d] || 0;
    posScoreSum += pct;
  }
  const posScore = Math.min(40, posScoreSum / 40 * 25);
  const akra = cand.substring(0, 2);
  const l2 = cand.substring(2, 4);
  const akraCount = ((_a = stats.sortedAkras.find((a) => a.akra === akra)) == null ? void 0 : _a.count) || 0;
  const l2Count = ((_b = stats.sortedL2.find((l) => l.l2 === l2)) == null ? void 0 : _b.count) || 0;
  const maxAkra = ((_c = stats.sortedAkras[0]) == null ? void 0 : _c.count) || 1;
  const maxL2 = ((_d = stats.sortedL2[0]) == null ? void 0 : _d.count) || 1;
  const pairScore = Math.min(25, akraCount / maxAkra * 15 + l2Count / maxL2 * 10);
  let oddCount = 0;
  for (let i = 0; i < 4; i++) {
    if (parseInt(cand[i], 10) % 2 !== 0) oddCount++;
  }
  const candOddRatio = oddCount / 4;
  const histOddRatio = (stats.oddPercentage || 50) / 100;
  const oddDiff = Math.abs(candOddRatio - histOddRatio);
  const oddScore = Math.max(0, 15 - oddDiff * 25);
  let hotCount = 0;
  let coldCount = 0;
  for (let i = 0; i < 4; i++) {
    if (stats.hotDigits.includes(cand[i])) hotCount++;
    if (stats.coldDigits.includes(cand[i])) coldCount++;
  }
  const hotScore = Math.min(10, Math.max(0, hotCount * 3 - coldCount * 2 + 3));
  let formulaScore = 7;
  if (formula === "odd_even") {
    formulaScore = oddCount === 2 ? 10 : 7;
  } else if (formula === "frequency") {
    formulaScore = akraCount > 0 || l2Count > 0 ? 10 : 6;
  } else if (formula === "astrological") {
    const sum = cand.split("").reduce((acc, ch) => acc + parseInt(ch, 10), 0);
    const root = (sum - 1) % 9 + 1;
    formulaScore = [1, 5, 7, 9].includes(root) ? 10 : 7;
  }
  const rawScore = posScore + pairScore + oddScore + hotScore + formulaScore;
  const finalScore = Math.min(95.5, Math.max(68.5, Math.round(rawScore * 10) / 10));
  return finalScore;
}
function generatePakistanCandidatePool(stats, formula, excludedNumbers) {
  const candidatesMap = /* @__PURE__ */ new Map();
  const topPosDigits = stats.posPercentages.map((arr) => {
    return arr.map((pct, digit) => ({ digit, pct })).sort((a, b) => b.pct - a.pct).slice(0, 4).map((x) => x.digit);
  });
  const topAkras = stats.sortedAkras.slice(0, 8).map((x) => x.akra);
  if (topAkras.length === 0) topAkras.push("78", "45", "12", "90", "34");
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
  if (formula === "odd_even") {
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
  return Array.from(candidatesMap.entries()).map(([number, score]) => ({ number, score })).sort((a, b) => b.score - a.score);
}
function generateThaiCandidatePool(stats, formula, excludedNumbers) {
  const candidatesMap = /* @__PURE__ */ new Map();
  const topPosDigits = stats.posPercentages.map((arr) => {
    return arr.map((pct, digit) => ({ digit, pct })).sort((a, b) => b.pct - a.pct).slice(0, 4).map((x) => x.digit);
  });
  const topAkras = stats.sortedAkras.slice(0, 6).map((x) => x.akra);
  const topL2 = stats.sortedL2.slice(0, 6).map((x) => x.l2);
  if (topAkras.length === 0) topAkras.push("56", "89", "23", "01", "74");
  if (topL2.length === 0) topL2.push("65", "98", "32", "10", "47");
  topAkras.forEach((akra) => {
    topL2.forEach((l2) => {
      const num = `${akra}${l2}`;
      if (!excludedNumbers.has(num) && !candidatesMap.has(num)) {
        candidatesMap.set(num, scoreThaiCandidate(num, stats, formula));
      }
    });
  });
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
  if (formula === "odd_even") {
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
  return Array.from(candidatesMap.entries()).map(([number, score]) => ({ number, score })).sort((a, b) => b.score - a.score);
}
function buildDynamicUrduReason(num, category, formula, stats) {
  const parts = [];
  parts.push(
    `یہ نمبر منتخب کردہ ${stats.filterDescUrdu} کے ${stats.sampleSize} تاریخی ڈراز کے تفصیلی شماریاتی تجزیے سے اخذ کیا گیا ہے۔`
  );
  const openD = num[0];
  const closeD = num[num.length - 1];
  parts.push(
    `اوپن پوزیشن پر ہندسہ "${openD}" پچھلے ریکارڈز میں ${stats.openPct}% کثافت کے ساتھ سرفہرست رہا، جبکہ اختتامی ہندسے پر "${closeD}" (${stats.closePct}%) تاریخی طور پر مستحکم ہے۔`
  );
  const akra = num.substring(0, 2);
  if (stats.topAkraCount > 0) {
    parts.push(
      `ابتدائی جوڑی (اکڑا) "${akra}" ریکارڈز میں ${stats.topAkraCount} بار بارہائے راست پایا گیا ہے۔`
    );
  }
  parts.push(
    `طاق و جفت کا تناسب (${stats.oddCount} طاق : ${stats.evenCount} جفت) تاریخی اوسط (${stats.histOddPct}% طاق / ${stats.histEvenPct}% جفت) کے عین مطابق ہے۔`
  );
  if (formula === "frequency") {
    parts.push(`فریکوئنسی ماڈل: ہاٹ ڈیجٹس (${stats.hotDigits.join("، ")}) کے پوزیشن وائز دباؤ کو ترجیح دی گئی ہے۔`);
  } else if (formula === "odd_even") {
    parts.push(`طاق/جفت ماڈل: باریابی اور توازن کے تسلسل کے ریاضیاتی اصول لاگو ہیں۔`);
  } else {
    parts.push(`علم الہندسہ ماڈل: عددی مفرد اور ہارمونک ہم آہنگی کے تاریخی پیٹرن سے حاصل شدہ۔`);
  }
  return parts.join(" ");
}
function generateLuckyNumberFromHistory(params) {
  var _a, _b, _c;
  const {
    category,
    formula,
    pakistanDraws,
    thaiDraws,
    sessionGeneratedNumbers,
    pkBondValue = "all",
    pkCity = "all",
    thaiDrawDate = "all",
    thaiMonth = "all",
    thaiYear = "all"
  } = params;
  const excludedSet = new Set(sessionGeneratedNumbers);
  if (category === "pakistan_bond") {
    const filteredDraws = filterPakistanBondDraws(pakistanDraws, pkBondValue, pkCity);
    const sampleSize = filteredDraws.length;
    if (sampleSize === 0) {
      return {
        success: false,
        error: `منتخب کردہ فلٹرز (${pkBondValue !== "all" ? pkBondValue : "تمام بانڈز"} - ${pkCity !== "all" ? pkCity : "تمام شہر"}) کے مطابق کوئی تاریخی ریکارڈ نہیں ملا۔ براہ کرم فلٹر تبدیل کریں۔`
      };
    }
    const stats = computePakistanHistoricalStats(filteredDraws);
    const candidates = generatePakistanCandidatePool(stats, formula, excludedSet);
    if (candidates.length === 0) {
      return {
        success: false,
        error: `اس سیشن میں موجودہ فلٹرز کے تمام دستیاب منفرد امیدوار نمبر تیار ہو چکے ہیں۔ مزید نمبرز کے لیے سیشن ہسٹری ری سیٹ کریں یا فلٹر تبدیل کریں۔`
      };
    }
    const topTier = candidates.slice(0, Math.min(3, candidates.length));
    const chosenIndex = Math.floor(Math.random() * topTier.length);
    const chosen = topTier[chosenIndex];
    const openD = chosen.number[0];
    const closeD = chosen.number[5];
    const openPct = Math.round(stats.posPercentages[0][parseInt(openD, 10)] || 0);
    const closePct = Math.round(stats.posPercentages[5][parseInt(closeD, 10)] || 0);
    const akra = chosen.number.substring(0, 2);
    const topAkraCount = ((_a = stats.sortedAkras.find((a) => a.akra === akra)) == null ? void 0 : _a.count) || 0;
    let oddCount = 0;
    let evenCount = 0;
    for (const ch of chosen.number) {
      if (parseInt(ch, 10) % 2 === 0) evenCount++;
      else oddCount++;
    }
    const bondLabel = ((_b = PK_BOND_CATEGORIES.find((b) => b.value === pkBondValue)) == null ? void 0 : _b.labelUrdu) || "تمام بانڈز";
    const filterDescUrdu = `${bondLabel}${pkCity !== "all" ? ` (${pkCity})` : ""}`;
    const reason = buildDynamicUrduReason(chosen.number, category, formula, {
      sampleSize,
      openPct,
      closePct,
      topAkraCount,
      oddCount,
      evenCount,
      histOddPct: stats.oddPercentage,
      histEvenPct: stats.evenPercentage,
      hotDigits: stats.hotDigits,
      filterDescUrdu
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
          filterDescriptionUrdu: filterDescUrdu
        }
      }
    };
  } else {
    const filteredDraws = filterThaiLotteryDraws(thaiDraws, thaiDrawDate, thaiMonth, thaiYear);
    const sampleSize = filteredDraws.length;
    if (sampleSize === 0) {
      return {
        success: false,
        error: `تھائی لاٹری کے منتخب فلٹرز (تاریخ: ${thaiDrawDate}، مہینہ: ${thaiMonth}، سال: ${thaiYear}) کے مطابق کوئی تاریخی ریکارڈ نہیں ملا۔ براہ کرم فلٹر وسیع کریں۔`
      };
    }
    const stats = computeThaiHistoricalStats(filteredDraws);
    const candidates = generateThaiCandidatePool(stats, formula, excludedSet);
    if (candidates.length === 0) {
      return {
        success: false,
        error: `اس سیشن میں تھائی لاٹری کے تمام منفرد امیدوار نمبرز تیار ہو چکے ہیں۔ مزید نمبرز کے لیے سیشن ہسٹری ری سیٹ کریں یا فلٹر تبدیل کریں۔`
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
    const topAkraCount = ((_c = stats.sortedAkras.find((a) => a.akra === akra)) == null ? void 0 : _c.count) || 0;
    let oddCount = 0;
    let evenCount = 0;
    for (const ch of chosen.number) {
      if (parseInt(ch, 10) % 2 === 0) evenCount++;
      else oddCount++;
    }
    const dateDesc = thaiDrawDate === "1st" ? "1 تاریخ" : thaiDrawDate === "16th" ? "16 تاریخ" : "تمام تاریخیں";
    const monthDesc = thaiMonth !== "all" ? `مہینہ ${thaiMonth}` : "تمام مہینے";
    const yearDesc = thaiYear !== "all" ? `سال ${thaiYear}` : "تمام سال";
    const filterDescUrdu = `تھائی لاٹری (${dateDesc}، ${monthDesc}، ${yearDesc})`;
    const reason = buildDynamicUrduReason(chosen.number, category, formula, {
      sampleSize,
      openPct,
      closePct,
      topAkraCount,
      oddCount,
      evenCount,
      histOddPct: stats.oddPercentage,
      histEvenPct: stats.evenPercentage,
      hotDigits: stats.hotDigits,
      filterDescUrdu
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
          filterDescriptionUrdu: filterDescUrdu
        }
      }
    };
  }
}
function AIAnalysisPortal({
  user,
  bookings,
  pakistanBondResults,
  thaiLotteryResults,
  onAddBooking,
  onAddDemand
}) {
  const [activeSubTab, setActiveSubTab] = reactExports.useState("bondAnalysis");
  const [thaiDrawDateFilter, setThaiDrawDateFilter] = reactExports.useState("all");
  const [thaiMonthFilter, setThaiMonthFilter] = reactExports.useState("all");
  const [thaiYearFilter, setThaiYearFilter] = reactExports.useState("all");
  const availableThaiYears = reactExports.useMemo(() => {
    return getAvailableThaiYears(thaiLotteryResults);
  }, [thaiLotteryResults]);
  const handleResetThaiFilters = () => {
    setThaiDrawDateFilter("all");
    setThaiMonthFilter("all");
    setThaiYearFilter("all");
  };
  const [genCategory, setGenCategory] = reactExports.useState("pakistan_bond");
  const [genFormula, setGenFormula] = reactExports.useState("frequency");
  const [genPkBondValue, setGenPkBondValue] = reactExports.useState("all");
  const [genPkCity, setGenPkCity] = reactExports.useState("all");
  const [genThaiDrawDate, setGenThaiDrawDate] = reactExports.useState("all");
  const [genThaiMonth, setGenThaiMonth] = reactExports.useState("all");
  const [genThaiYear, setGenThaiYear] = reactExports.useState("all");
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const [generatedResult, setGeneratedResult] = reactExports.useState(null);
  const [generateError, setGenerateError] = reactExports.useState(null);
  const [sessionGeneratedNumbers, setSessionGeneratedNumbers] = reactExports.useState([]);
  const currentGenSampleSize = reactExports.useMemo(() => {
    if (genCategory === "pakistan_bond") {
      return filterPakistanBondDraws(pakistanBondResults, genPkBondValue, genPkCity).length;
    } else {
      return filterThaiLotteryDraws(thaiLotteryResults, genThaiDrawDate, genThaiMonth, genThaiYear).length;
    }
  }, [genCategory, pakistanBondResults, thaiLotteryResults, genPkBondValue, genPkCity, genThaiDrawDate, genThaiMonth, genThaiYear]);
  const handleResetSessionHistory = () => {
    setSessionGeneratedNumbers([]);
    setGenerateError(null);
  };
  const [quickFirstAmt, setQuickFirstAmt] = reactExports.useState("100");
  const [quickSecondAmt, setQuickSecondAmt] = reactExports.useState("50");
  const [bookingStatus, setBookingStatus] = reactExports.useState(null);
  const [chatInput, setChatInput] = reactExports.useState("");
  const [chatMessages, setChatMessages] = reactExports.useState([
    {
      sender: "bot",
      text: "اسلام علیکم! میں ماسٹر مائنڈ قریشی اے آئی اسسٹنٹ ہوں۔ میں پاکستان پرائز بانڈ اور تھائی لینڈ لاٹری کے پرانے نتائج کا ریاضیاتی تجزیہ کر کے آپ کو بہترین مشورے دے سکتا ہوں۔ آپ کوئی بھی سوال پوچھ سکتے ہیں یا نیچے دیے گئے بٹنز دبا سکتے ہیں۔",
      time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [historySearchQuery, setHistorySearchQuery] = reactExports.useState("");
  const [historyCategory, setHistoryCategory] = reactExports.useState("all");
  const [historyBondValue, setHistoryBondValue] = reactExports.useState("all");
  const [historyCity, setHistoryCity] = reactExports.useState("all");
  const [selectedCityBond, setSelectedCityBond] = reactExports.useState("all");
  const historicalDraws = reactExports.useMemo(() => [
    ...pakistanBondResults,
    ...thaiLotteryResults
  ], [pakistanBondResults, thaiLotteryResults]);
  const [analysisCategory, setAnalysisCategory] = reactExports.useState("pakistan_bond");
  const [analysisType, setAnalysisType] = reactExports.useState("open");
  const analysisData = reactExports.useMemo(() => {
    let draws = historicalDraws.filter((d) => d.category === analysisCategory);
    if (analysisCategory === "thailand_lottery") {
      draws = filterThaiLotteryDraws(draws, thaiDrawDateFilter, thaiMonthFilter, thaiYearFilter);
    }
    const frequencies = {
      open: Array(10).fill(0),
      close: Array(10).fill(0),
      center: Array(10).fill(0),
      fourth: Array(10).fill(0)
    };
    const akraCounts = {};
    let digitOdd = 0;
    let digitEven = 0;
    let firstPrizeOdd = 0;
    let firstPrizeEven = 0;
    draws.forEach((draw) => {
      const numStr = draw.firstPrize;
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
        numStr.split("").forEach((char) => {
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
    const mapFreqList = (arr) => {
      const total = arr.reduce((a, b) => a + b, 0) || 1;
      return arr.map((count, val) => ({
        value: val.toString(),
        count,
        percentage: Math.round(count / total * 100)
      }));
    };
    const sortedAkras = Object.entries(akraCounts).map(([akra, count]) => ({ akra, count })).sort((a, b) => b.count - a.count || parseInt(a.akra) - parseInt(b.akra));
    const totalDigitsCount = digitOdd + digitEven || 1;
    return {
      drawsCount: draws.length,
      open: mapFreqList(frequencies.open),
      close: mapFreqList(frequencies.close),
      center: mapFreqList(frequencies.center),
      fourth: mapFreqList(frequencies.fourth),
      akras: sortedAkras,
      digitOddsPercentage: Math.round(digitOdd / totalDigitsCount * 100),
      digitEvensPercentage: Math.round(digitEven / totalDigitsCount * 100),
      firstPrizeOdds: firstPrizeOdd,
      firstPrizeEvens: firstPrizeEven
    };
  }, [analysisCategory, historicalDraws, thaiDrawDateFilter, thaiMonthFilter, thaiYearFilter]);
  const [selectedCity, setSelectedCity] = reactExports.useState("کراچی");
  const [citySubTab, setCitySubTab] = reactExports.useState("digits");
  const [cityAnalysisType, setCityAnalysisType] = reactExports.useState("open");
  const pkCities = PK_CITIES_LIST;
  const cityAnalysisData = reactExports.useMemo(() => {
    const draws = historicalDraws.filter((d) => d.category === "pakistan_bond" && d.city === selectedCity);
    const frequencies = {
      open: Array(10).fill(0),
      close: Array(10).fill(0),
      center: Array(10).fill(0),
      fourth: Array(10).fill(0)
    };
    const akraCounts = {};
    const bondCounts = {};
    let digitOdd = 0;
    let digitEven = 0;
    let firstPrizeOdd = 0;
    let firstPrizeEven = 0;
    draws.forEach((draw) => {
      const numStr = draw.firstPrize;
      const idParts = draw.id.split("-");
      const bondVal = idParts[3] || "15000";
      bondCounts[bondVal] = (bondCounts[bondVal] || 0) + 1;
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
        numStr.split("").forEach((char) => {
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
    const mapFreqList = (arr) => {
      const total = arr.reduce((a, b) => a + b, 0) || 1;
      return arr.map((count, val) => ({
        value: val.toString(),
        count,
        percentage: Math.round(count / total * 100)
      }));
    };
    const sortedAkras = Object.entries(akraCounts).map(([akra, count]) => ({ akra, count })).sort((a, b) => b.count - a.count || parseInt(a.akra) - parseInt(b.akra));
    const totalDigitsCount = digitOdd + digitEven || 1;
    let luckyBond = "15000";
    let maxBondCount = -1;
    Object.entries(bondCounts).forEach(([val, count]) => {
      if (count > maxBondCount) {
        maxBondCount = count;
        luckyBond = val;
      }
    });
    return {
      drawsCount: draws.length,
      drawsList: draws,
      open: mapFreqList(frequencies.open),
      close: mapFreqList(frequencies.close),
      center: mapFreqList(frequencies.center),
      fourth: mapFreqList(frequencies.fourth),
      akras: sortedAkras,
      digitOddsPercentage: Math.round(digitOdd / totalDigitsCount * 100),
      digitEvensPercentage: Math.round(digitEven / totalDigitsCount * 100),
      firstPrizeOdds: firstPrizeOdd,
      firstPrizeEvens: firstPrizeEven,
      luckyBond
    };
  }, [selectedCity, historicalDraws]);
  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerateError(null);
    setBookingStatus(null);
    setTimeout(() => {
      const res = generateLuckyNumberFromHistory({
        category: genCategory,
        formula: genFormula,
        pakistanDraws: pakistanBondResults,
        thaiDraws: thaiLotteryResults,
        sessionGeneratedNumbers,
        pkBondValue: genPkBondValue,
        pkCity: genPkCity,
        thaiDrawDate: genThaiDrawDate,
        thaiMonth: genThaiMonth,
        thaiYear: genThaiYear
      });
      if (res.success && res.result) {
        setGeneratedResult(res.result);
        setGenerateError(null);
        setSessionGeneratedNumbers((prev) => [...prev, res.result.number]);
      } else {
        setGenerateError(res.error || "نمبر تیار کرنے میں غلطی پیش آئی۔");
        setGeneratedResult(null);
      }
      setIsGenerating(false);
    }, 600);
  };
  const handleQuickBook = async (isDemand) => {
    const numToBook = generatedResult == null ? void 0 : generatedResult.number;
    if (!numToBook) return;
    setBookingStatus(null);
    const first = parseInt(quickFirstAmt || "0", 10);
    const second = parseInt(quickSecondAmt || "0", 10);
    const total = first + second;
    if (first <= 0 && second <= 0) {
      setBookingStatus({ type: "error", message: "براہ کرم فرسٹ یا سیکنڈ میں گیم کی رقم درج کریں۔" });
      return;
    }
    if (isDemand) {
      if (total <= 500) {
        setBookingStatus({ type: "error", message: "ڈیمانڈ کے لئے مجموعی رقم 500 روپے سے زائد ہونی چاہیے۔" });
        return;
      }
      const res = await onAddDemand(numToBook, first, second);
      if (res.success) {
        setBookingStatus({ type: "success", message: `کامیابی: نمبر ${numToBook} کی Rs. ${total.toLocaleString()} کی ڈیمانڈ ایڈمن کو بھیج دی گئی ہے۔` });
      } else {
        setBookingStatus({ type: "error", message: res.error || "غلطی پیش آئی۔" });
      }
    } else {
      const res = await onAddBooking(numToBook, first, second);
      if (res.success) {
        setBookingStatus({ type: "success", message: `کامیابی: نمبر ${numToBook} کامیابی سے بک کر لیا گیا ہے اور والٹ سے رقم منہا کر دی گئی ہے۔` });
      } else {
        setBookingStatus({ type: "error", message: res.error || "غلطی پیش آئی۔" });
      }
    }
  };
  const suggestedQuestions = [
    "آج کا سب سے زیادہ متوقع لکی نمبر کونسا ہے؟",
    "تھائی لاٹری جیتنے کا کیا فارمولا ہے؟",
    "پرائز بانڈ کے پیٹرن کی ریاضیاتی تحقیق کیا ہے؟",
    "ڈیمانڈ بھیجنے کا طریقہ اور حد کیا ہے؟"
  ];
  const handleChatQuestionClick = (question) => {
    setChatMessages((prev) => [
      ...prev,
      { sender: "user", text: question, time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
    ]);
    setTimeout(() => {
      let botResponse = "";
      if (question.includes("لکی نمبر")) {
        botResponse = 'پاکستان بانڈ کے لئے "786112" اور "007420" کی فریکوئنسی بہت مضبوط ہے، جبکہ تھائی لاٹری کے لئے "0095" اور "1359" سب سے بہترین آپشنز لگ رہے ہیں۔ آپ جنریٹر ٹیب میں جا کر اپنے حساب سے لکی نمبر حاصل کر سکتے ہیں۔';
      } else if (question.includes("تھائی لاٹری جیتنے")) {
        botResponse = "تھائی لاٹری کا ریاضیاتی فارمولا آخری دو ہندسوں کے طاق/جفت تسلسل پر انحصار کرتا ہے۔ اگر پچھلا ڈرا طاق پر ختم ہوا ہو تو اگلا ڈرا جفت (Even) پر ختم ہونے کا امکان 71 فیصد تک بڑھ جاتا ہے۔";
      } else if (question.includes("پاکستان بانڈ")) {
        botResponse = "پاکستان پرائز بانڈ کے پیٹرن میں پچھلے 10 سال کے ڈیٹا سے پتا چلتا ہے کہ بڑے شہروں (جیسے کراچی، لاہور) کے ڈراز میں نمبرز کی ریپیٹیشن بہت کم ہوتی ہے، لیکن سیریز 001-300 کے درمیان لکی نمبرز زیادہ بار سامنے آئے ہیں۔";
      } else if (question.includes("ڈیمانڈ بھیجنے")) {
        botResponse = 'جب آپ کی گیم کا کل حجم (فرسٹ + سیکنڈ ملا کر) 500 روپے سے تجاوز کر جائے، تو سافٹ ویئر آپ کو ایک خاص "ڈیمانڈ بھیجیں" کا بٹن پیش کرتا ہے۔ یہ ڈیمانڈ براہ راست ایڈمن قریشی صاحب کے پینل پر چلی جاتی ہے، وہ اسے دستی طور پر منظور کر سکتے ہیں۔';
      } else {
        botResponse = "بہت خوبصورت سوال ہے! لاٹری اور پرائز بانڈز کی ریاضی مکمل طور پر امکانیات (Probability) پر قائم ہے۔ اگر آپ متواتر فریکوئنسی گراف کو دیکھ کر بکنگ کریں تو جیتنے کا چانس کافی حد تک بہتر بنایا جا سکتا ہے۔";
      }
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse, time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
      ]);
    }, 1e3);
  };
  const handleSendChatInput = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const text = chatInput;
    setChatInput("");
    setChatMessages((prev) => [
      ...prev,
      { sender: "user", text, time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
    ]);
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = "قریشی صاحب اے آئی آپ کی بات سمجھ رہا ہے۔ ریاضیاتی قوانین کے تحت آپ کی پیش کردہ بکنگ کی لیمٹ اور ہندساتی گہرائی کا موازنہ کیا جا رہا ہے۔ بہترین نتائج کے لیے پرائز بانڈ کے لیے فریکوئنسی کیلکولیٹر استعمال کریں۔";
      if (lower.includes("786") || lower.includes("لکی")) {
        reply = 'پرائز بانڈ کے لیے عدد "786" پر مشتمل سیریز سب سے زیادہ فروخت ہوتی ہے۔ اسی لیے اس پر ایڈمن کی طرف سے لیمٹ بھی لگائی جاتی ہے۔ آپ "786" پر گیم لگانے کے لیے اس کا فرسٹ پلس سیکنڈ امکانی انڈیکس 82% پائیں گے۔';
      } else if (lower.includes("مدد") || lower.includes("help")) {
        reply = "جی! میں آپ کی مدد کے لیے حاضر ہوں۔ آپ جنریٹر ٹیب سے خوش قسمت نمبر حاصل کر سکتے ہیں، چارٹس ٹیب سے ہندسوں کا فلو دیکھ سکتے ہیں، یا ایڈمن کو ڈیمانڈ بھیجنے کا طریقہ سمجھ سکتے ہیں۔";
      } else if (lower.includes("تھائی") || lower.includes("thai")) {
        reply = "تھائی لینڈ لاٹری کا اگلا ڈرا انڈیکس کافی دلچسپ ہے! ہمارے اے آئی الگورتھم نے لکی پوزیشنز 09 اور 74 کو سب سے زیادہ فعال قرار دیا ہے۔";
      }
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: reply, time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
      ]);
    }, 1e3);
  };
  const filteredHistory = reactExports.useMemo(() => historicalDraws.filter((draw) => {
    const matchesCategory = historyCategory === "all" || draw.category === historyCategory;
    const matchesBond = historyCategory === "thailand_lottery" || historyBondValue === "all" || normalizeDrawBondValue(draw) === historyBondValue;
    const matchesCity = historyCategory === "thailand_lottery" || historyCity === "all" || draw.city === historyCity;
    let matchesThaiFilters = true;
    if (draw.category === "thailand_lottery" && (historyCategory === "thailand_lottery" || historyCategory === "all")) {
      if (thaiDrawDateFilter !== "all" || thaiMonthFilter !== "all" || thaiYearFilter !== "all") {
        const parsed = parseThaiDrawDate(draw.date);
        matchesThaiFilters = isThaiDrawMatchingFilters(parsed, thaiDrawDateFilter, thaiMonthFilter, thaiYearFilter);
      }
    }
    const matchesSearch = draw.drawNo.toLowerCase().includes(historySearchQuery.toLowerCase()) || draw.firstPrize.includes(historySearchQuery) || draw.city.includes(historySearchQuery) || draw.secondPrizes.some((p) => p.includes(historySearchQuery));
    return matchesCategory && matchesBond && matchesCity && matchesThaiFilters && matchesSearch;
  }), [historicalDraws, historyCategory, historyBondValue, historyCity, historySearchQuery, thaiDrawDateFilter, thaiMonthFilter, thaiYearFilter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-slate-100 rounded-3xl p-4 sm:p-8 shadow-xl border border-slate-800 font-sans max-w-4xl mx-auto text-right", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-slate-800 pb-5 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-500/10 border border-amber-500/20 py-1.5 px-3 rounded-xl flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4.5 h-4.5 text-amber-400 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest", children: "MASTERMIND QURESHI AI ENGINE" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl sm:text-2xl font-bold text-white flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "اے آئی لاٹری تجزیہ پورٹل" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6 text-amber-400" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1 leading-relaxed", children: "کیو ٹو لکی الگورتھم کی مدد سے تیار کردہ سمارٹ لاٹری نمبرز، ہندساتی چارٹس اور ڈرا ہسٹری کا لائیو سسٹم۔" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row-reverse flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveSubTab("bondAnalysis"),
          className: `flex items-center gap-1.5 text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${activeSubTab === "bondAnalysis" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "بانڈ ویلیو تجزیہ (Bond Value)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveSubTab("cityAnalysis"),
          className: `flex items-center gap-1.5 text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${activeSubTab === "cityAnalysis" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "شہر ٹو شہر تجزیہ (City Analysis)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          id: "portal-nav-thai-analysis",
          onClick: () => setActiveSubTab("thaiAnalysis"),
          className: `flex items-center gap-1.5 text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${activeSubTab === "thaiAnalysis" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تھائی لاٹری تجزیہ (Thai Analysis)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          id: "portal-nav-thai-front3-analysis",
          onClick: () => setActiveSubTab("thaiFront3Analysis"),
          className: `flex items-center gap-1.5 text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${activeSubTab === "thaiFront3Analysis" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تھائی فرنٹ 3 تجزیہ (Thai Front 3)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveSubTab("history"),
          className: `flex items-center gap-1.5 text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${activeSubTab === "history" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ڈرا ریکارڈز (History Database)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveSubTab("charts"),
          className: `flex items-center gap-1.5 text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${activeSubTab === "charts" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فریکوئنسی چارٹس (Charts)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveSubTab("generator"),
          className: `flex items-center gap-1.5 text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${activeSubTab === "generator" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "لکی جنریٹر (Generator)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveSubTab("chatbot"),
          className: `flex items-center gap-1.5 text-xs font-bold py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${activeSubTab === "chatbot" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10" : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "اے آئی اسسٹنٹ چیٹ (AI Chat)" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      activeSubTab === "bondAnalysis" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AIBondAnalysisTab,
        {
          allBondResults: pakistanBondResults
        }
      ),
      activeSubTab === "cityAnalysis" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AICityAnalysisTab,
        {
          pkCities,
          selectedCity,
          setSelectedCity,
          cityAnalysisData,
          citySubTab,
          setCitySubTab,
          cityAnalysisType,
          setCityAnalysisType,
          allBondResults: pakistanBondResults,
          selectedCityBond,
          setSelectedCityBond
        }
      ),
      activeSubTab === "thaiAnalysis" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AIThailandAnalysisTab,
        {
          allThaiResults: thaiLotteryResults
        }
      ),
      activeSubTab === "thaiFront3Analysis" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AIThaiFront3AnalysisTab,
        {
          allThaiResults: thaiLotteryResults
        }
      ),
      activeSubTab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AIHistoryTab,
        {
          historySearchQuery,
          setHistorySearchQuery,
          historyCategory,
          setHistoryCategory,
          historyBondValue,
          setHistoryBondValue,
          historyCity,
          setHistoryCity,
          filteredHistory,
          thaiDrawDateFilter,
          setThaiDrawDateFilter,
          thaiMonthFilter,
          setThaiMonthFilter,
          thaiYearFilter,
          setThaiYearFilter,
          availableThaiYears,
          onResetThaiFilters: handleResetThaiFilters
        }
      ),
      activeSubTab === "charts" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AIChartsTab,
        {
          analysisCategory,
          setAnalysisCategory,
          analysisType,
          setAnalysisType,
          analysisData,
          thaiDrawDateFilter,
          setThaiDrawDateFilter,
          thaiMonthFilter,
          setThaiMonthFilter,
          thaiYearFilter,
          setThaiYearFilter,
          availableThaiYears,
          onResetThaiFilters: handleResetThaiFilters
        }
      ),
      activeSubTab === "generator" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AIGeneratorTab,
        {
          genCategory,
          setGenCategory: (cat) => {
            setGenCategory(cat);
            setGeneratedResult(null);
            setGenerateError(null);
          },
          genFormula,
          setGenFormula,
          genPkBondValue,
          setGenPkBondValue,
          genPkCity,
          setGenPkCity,
          genThaiDrawDate,
          setGenThaiDrawDate,
          genThaiMonth,
          setGenThaiMonth,
          genThaiYear,
          setGenThaiYear,
          availableThaiYears,
          sampleSize: currentGenSampleSize,
          isGenerating,
          generatedResult,
          generateError,
          sessionGeneratedNumbers,
          onResetSessionHistory: handleResetSessionHistory,
          handleGenerate,
          quickFirstAmt,
          setQuickFirstAmt,
          quickSecondAmt,
          setQuickSecondAmt,
          bookingStatus,
          handleQuickBook
        }
      ),
      activeSubTab === "chatbot" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AIChatbotTab,
        {
          suggestedQuestions,
          handleChatQuestionClick,
          chatMessages,
          chatInput,
          setChatInput,
          handleSendChatInput
        }
      )
    ] })
  ] });
}
function App() {
  var _a, _b;
  const [currentUser, setCurrentUser] = reactExports.useState(null);
  const [authLoading, setAuthLoading] = reactExports.useState(true);
  const [activeTab, setActiveTab] = reactExports.useState("dashboard");
  const [users, setUsers] = reactExports.useState([]);
  const [bookings, setBookings] = reactExports.useState([]);
  const [dealerBookings, setDealerBookings] = reactExports.useState([]);
  const [limits, setLimits] = reactExports.useState([]);
  const [demands, setDemands] = reactExports.useState([]);
  const [deadlines, setDeadlines] = reactExports.useState([]);
  const [adminMode, setAdminMode] = reactExports.useState(false);
  const [adminConfiguredEmail, setAdminConfiguredEmailState] = reactExports.useState("mastermaind.qureshi110@gmail.com");
  const [pakistanBondResults, setPakistanBondResults] = reactExports.useState([]);
  const [thaiLotteryResults, setThaiLotteryResults] = reactExports.useState([]);
  const [hardFavoriteNumbers, setHardFavoriteNumbers] = reactExports.useState([]);
  const [isMandatorySetupOpen, setIsMandatorySetupOpen] = reactExports.useState(false);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = reactExports.useState(false);
  const [pendingAction, setPendingAction] = reactExports.useState(null);
  const [retryStatus, setRetryStatus] = reactExports.useState("idle");
  const verifyNetworkAndExecute = async (action) => {
    const online = await checkInternetConnection();
    if (!online) {
      setIsOfflineModalOpen(true);
      setRetryStatus("idle");
      return new Promise((resolve) => {
        setPendingAction({
          execute: action,
          resolve
        });
      });
    }
    return await action();
  };
  const handleRetryConnection = async () => {
    setRetryStatus("checking");
    const online = await checkInternetConnection();
    if (online) {
      setIsOfflineModalOpen(false);
      setRetryStatus("idle");
      if (pendingAction) {
        const result = await pendingAction.execute();
        pendingAction.resolve(result);
        setPendingAction(null);
      }
    } else {
      setRetryStatus("failed");
    }
  };
  const whatsappNumber = getSupportWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("السلام علیکم! مجھے ماسٹر مائینڈ قریشی انٹرپرائز پرائز بانڈ سسٹم کے بارے میں مدد چاہئے۔")}`;
  const [navigatedUid, setNavigatedUid] = reactExports.useState(null);
  reactExports.useEffect(() => {
    initializeStore();
    const unsubscribe = subscribeToStore(() => {
      setAdminConfiguredEmailState(getAdminConfiguredEmail());
      syncWithStore();
    });
    let resolved = false;
    const safetyTimer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        syncWithStore();
        setAuthLoading(false);
      }
    }, 1500);
    const unsubscribeAuth = onAuthStateChanged(auth, () => {
      syncWithStore();
      if (!resolved) {
        resolved = true;
        clearTimeout(safetyTimer);
        setAuthLoading(false);
      }
    });
    return () => {
      clearTimeout(safetyTimer);
      unsubscribe();
      unsubscribeAuth();
    };
  }, []);
  reactExports.useEffect(() => {
    if (currentUser && currentUser.uid) {
      const isAdmin = currentUser.isAdmin || currentUser.role === "superAdmin" || currentUser.role === "dataEntryAdmin" || currentUser.role === "admin";
      setAdminMode(isAdmin);
      if (navigatedUid !== currentUser.uid) {
        setNavigatedUid(currentUser.uid);
        if (isAdmin) {
          setActiveTab("admin");
        } else {
          setActiveTab("dashboard");
        }
      }
    } else if (!currentUser) {
      setNavigatedUid(null);
      setAdminMode(false);
    }
  }, [currentUser, navigatedUid]);
  const syncWithStore = () => {
    const loggedIn = getLoggedInUser();
    setCurrentUser(loggedIn);
    setUsers(getUsers());
    setBookings(getBookings());
    setDealerBookings(getDealerBookings());
    setLimits(getNumberLimits());
    setDemands(getDemands());
    setDeadlines(getDrawDeadlines());
    setPakistanBondResults(getPakistanBondResults());
    setThaiLotteryResults(getThaiLotteryResults());
    setHardFavoriteNumbers(getHardFavoriteNumbers());
    if (loggedIn) {
      if (loggedIn.isAdmin) {
        setAdminMode(true);
      } else {
        setAdminMode(false);
      }
    } else {
      setAdminMode(false);
    }
  };
  const handleSetDeadline = async (category, deadlineIso, titleUrdu, status, nextPrizeBondValue, nextDrawCity, nextDrawNumber, nextDrawDate, drawId) => {
    const action = async () => {
      await setDrawDeadline(
        category,
        deadlineIso,
        titleUrdu,
        status,
        nextPrizeBondValue,
        nextDrawCity,
        nextDrawNumber,
        nextDrawDate,
        drawId
      );
      syncWithStore();
      return true;
    };
    return await verifyNetworkAndExecute(action);
  };
  const handleDeleteDeadline = async (id) => {
    const action = async () => {
      await deleteDrawDeadline(id);
      syncWithStore();
      return true;
    };
    return await verifyNetworkAndExecute(action);
  };
  const handleAddHardFavorite = async (category, number, note) => {
    const action = async () => {
      const res2 = await addHardFavoriteNumber(category, number, note);
      if (res2 && res2.success) {
        syncWithStore();
      }
      return res2;
    };
    const res = await verifyNetworkAndExecute(action);
    if (res && "success" in res) {
      return res;
    }
    return { success: false, error: "نیٹ ورک کا مسئلہ ہے۔" };
  };
  const handleRemoveHardFavorite = async (id) => {
    const action = async () => {
      const res2 = await removeHardFavoriteNumber(id);
      if (res2 && res2.success) {
        syncWithStore();
      }
      return res2;
    };
    const res = await verifyNetworkAndExecute(action);
    if (res && "success" in res) {
      return res;
    }
    return { success: false, error: "نیٹ ورک کا مسئلہ ہے۔" };
  };
  const handleRegister = async (name, phone, city, email, password) => {
    const action = async () => {
      const usersList = getUsers();
      const emailLower = email.toLowerCase().trim();
      const existingEmail = usersList.find((u) => (u.email || "").toLowerCase() === emailLower);
      if (existingEmail) {
        return { success: false, error: "یہ ای میل پہلے سے رجسٹرڈ ہے۔ (This email is already registered.)" };
      }
      const existingPhone = usersList.find((u) => u.phone === phone.trim());
      if (existingPhone) {
        return { success: false, error: "یہ موبائل نمبر پہلے سے رجسٹرڈ ہے۔ (This mobile number is already registered.)" };
      }
      const newUser = await registerUser(name, phone, city, email, password);
      if (newUser) {
        setLoggedInUser(newUser.email);
        syncWithStore();
        setActiveTab("dashboard");
        return { success: true };
      }
      return { success: false, error: "رجسٹریشن ناکام رہی۔ (Registration failed.)" };
    };
    const res = await verifyNetworkAndExecute(action);
    if (res && "success" in res) {
      return res;
    }
    return { success: false, error: "نیٹ ورک کا مسئلہ ہے۔" };
  };
  const handleGoogleLogin = async () => {
    const action = async () => {
      const res2 = await signInWithGoogle();
      if (res2.success && res2.user) {
        setLoggedInUser(res2.user.email);
        syncWithStore();
        if (res2.isNewOrIncomplete) {
          setIsMandatorySetupOpen(true);
        }
        const userNow = getLoggedInUser();
        if (userNow && userNow.isAdmin) {
          setAdminMode(true);
          setActiveTab("admin");
        } else {
          setActiveTab("dashboard");
        }
        return { success: true };
      }
      return { success: false, error: res2.error || "گوگل سائن ان ناکام رہا۔" };
    };
    const res = await verifyNetworkAndExecute(action);
    if (res && "success" in res) {
      return res;
    }
    return { success: false, error: "نیٹ ورک کنکشن چیک کریں۔" };
  };
  const handleUpdateProfile = async (name, phone, city) => {
    if (!currentUser || !currentUser.uid) {
      return { success: false, message: "صارف کی معلومات دستیاب نہیں ہیں۔" };
    }
    const res = await updateUserProfile(currentUser.uid, { name, phone, city });
    if (res.success) {
      syncWithStore();
      setIsMandatorySetupOpen(false);
    }
    return res;
  };
  const handleLoginWithCredentials = async (identifier, passwordInput) => {
    const action = async () => {
      var _a2, _b2, _c, _d, _e, _f;
      const online = await checkInternetConnection();
      if (!online) {
        return { success: false, error: "No internet connection. Please turn on Wi-Fi or Mobile Data and try again." };
      }
      const idLower = identifier.toLowerCase().trim();
      let emailToAuth = "";
      if (idLower.includes("@")) {
        emailToAuth = idLower;
      } else {
        try {
          const usersSnap = await get(ref(db, "users"));
          if (usersSnap.exists()) {
            const allUsers = usersSnap.val();
            for (const key in allUsers) {
              if (((_b2 = (_a2 = allUsers[key]) == null ? void 0 : _a2.phone) == null ? void 0 : _b2.trim()) === identifier.trim()) {
                emailToAuth = (_c = allUsers[key]) == null ? void 0 : _c.email;
                break;
              }
            }
          }
        } catch (err) {
          console.error("Secure login phone query failed:", err);
        }
      }
      if (!emailToAuth) {
        return { success: false, error: "یہ اکاؤنٹ رجسٹرڈ نہیں ہے۔ (This account is not registered.)" };
      }
      let uid = "";
      try {
        const cred = await signInWithEmailAndPassword(auth, emailToAuth.toLowerCase().trim(), passwordInput);
        uid = cred.user.uid;
      } catch (err) {
        console.error("Firebase Auth sign in failed:", err);
        if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential" || err.code === "auth/user-not-found") {
          return { success: false, error: "ای میل/موبائل نمبر یا پاس ورڈ درست نہیں ہے۔ (Incorrect email/phone or password.)" };
        } else if (err.code === "auth/user-disabled") {
          return { success: false, error: "آپ کا اکاؤنٹ غیر فعال کر دیا گیا ہے۔ (Your account has been disabled.)" };
        }
        return { success: false, error: `لاگ ان ناکام رہا: ${err.message || "نامعلوم خامی"}` };
      }
      let matchedUser = null;
      try {
        const userSnap = await get(ref(db, `users/${uid}`));
        if (userSnap.exists()) {
          matchedUser = userSnap.val();
          console.log(`[UID-Migration] Found existing modern UID-based user record for: ${emailToAuth}`);
        } else {
          const cleanEmailKey = emailToAuth.toLowerCase().trim().replace(/[.#$\[\]]/g, "_");
          const legacySnap = await get(ref(db, `users/${cleanEmailKey}`));
          if (legacySnap.exists()) {
            const legacyData = legacySnap.val();
            matchedUser = {
              ...legacyData,
              uid
              // Attach modern auth UID securely
            };
            await set(ref(db, `users/${uid}`), matchedUser);
            await remove(ref(db, `users/${cleanEmailKey}`));
            console.log(`[UID-Migration] Successfully migrated legacy user profile for ${emailToAuth} to users/{uid}`);
          } else {
            const allUsersSnap = await get(ref(db, "users"));
            if (allUsersSnap.exists()) {
              const allUsersObj = allUsersSnap.val();
              const emailTarget = emailToAuth.toLowerCase().trim();
              const foundEntry = Object.entries(allUsersObj).find(
                ([k, u]) => (u == null ? void 0 : u.email) && u.email.toLowerCase().trim() === emailTarget || (u == null ? void 0 : u.uid) && u.uid === uid
              );
              if (foundEntry) {
                const [oldKey, oldData] = foundEntry;
                matchedUser = {
                  ...oldData,
                  uid
                };
                await set(ref(db, `users/${uid}`), matchedUser);
                if (oldKey !== uid) {
                  await remove(ref(db, `users/${oldKey}`));
                }
                console.log(`[UID-Migration] Successfully migrated user from key ${oldKey} to users/{uid}`);
              }
            }
            if (!matchedUser) {
              console.log(`[Firestore-Migration] Checking Firestore for user profile: ${emailToAuth} (UID: ${uid})`);
              const fsProfile = await migrateUserProfileFromFirestore(uid, emailToAuth);
              if (fsProfile) {
                matchedUser = fsProfile;
                console.log(`[Firestore-Migration] Successfully migrated profile from Firestore to RTDB for: ${emailToAuth}`);
              } else {
                const normEmail = emailToAuth.toLowerCase().trim();
                const isSuperAdminEmail = normEmail === "mastermaind.qureshi110@gmail.com";
                const isDataEntryEmail = normEmail === "fareed.ghulam@gmail.com";
                if (isSuperAdminEmail || isDataEntryEmail) {
                  matchedUser = {
                    uid,
                    email: normEmail,
                    name: isSuperAdminEmail ? "Super Admin" : "Data Entry Admin",
                    phone: "",
                    city: "Pakistan",
                    role: isSuperAdminEmail ? "superAdmin" : "dataEntryAdmin",
                    isAdmin: true,
                    status: "active",
                    active: true,
                    balance: 0,
                    profileCompleted: true
                  };
                  await set(ref(db, `users/${uid}`), matchedUser);
                  console.log(`[Admin-Bootstrap] Initialized admin user profile in RTDB for: ${normEmail}`);
                } else {
                  await signOut(auth);
                  return {
                    success: false,
                    error: "صارف کا پروفائل ڈیٹا بیس میں نہیں ملا۔ براہ کرم ایڈمن سے رابطہ کریں۔ (User profile not found in database. Please contact Admin.)"
                  };
                }
              }
            }
          }
        }
      } catch (err) {
        console.error("Failed to load/migrate user profile:", err);
        console.error("PROFILE RTDB ERROR CODE:", err == null ? void 0 : err.code);
        console.error("PROFILE RTDB ERROR MESSAGE:", err == null ? void 0 : err.message);
        return {
          success: false,
          error: `پروفائل لوڈ کرنے میں ناکامی۔ [${(err == null ? void 0 : err.code) || "unknown"}] ${(err == null ? void 0 : err.message) || ""}`
        };
      }
      const emailLowerMatched = (matchedUser.email || emailToAuth || "").toLowerCase().trim();
      const isSuper = emailLowerMatched === "mastermaind.qureshi110@gmail.com" || matchedUser.role === "superAdmin" || matchedUser.role === "admin";
      const isDataEntry = emailLowerMatched === "fareed.ghulam@gmail.com" || matchedUser.role === "dataEntryAdmin";
      if (isSuper) {
        matchedUser.role = "superAdmin";
        matchedUser.isAdmin = true;
      } else if (isDataEntry) {
        matchedUser.role = "dataEntryAdmin";
        matchedUser.isAdmin = true;
      } else {
        matchedUser.role = matchedUser.role || "customer";
        matchedUser.isAdmin = false;
      }
      try {
        await update(ref(db, `users/${uid}`), {
          role: matchedUser.role,
          isAdmin: matchedUser.isAdmin,
          email: emailLowerMatched,
          lastLogin: (/* @__PURE__ */ new Date()).toISOString()
        });
      } catch (updateErr) {
        console.error("Failed to sync admin profile role in RTDB:", updateErr);
      }
      if (matchedUser.isAdmin && matchedUser.active === false) {
        await signOut(auth);
        return { success: false, error: "آپ کا ایڈمن اکاؤنٹ غیر فعال کر دیا گیا ہے۔ برائے مہربانی سپر ایڈمن سے رابطہ کریں۔ (Your admin account is deactivated. Please contact Super Admin.)" };
      }
      const isProfileComplete = matchedUser.profileCompleted === true || Boolean((_d = matchedUser.name) == null ? void 0 : _d.trim()) && Boolean((_e = matchedUser.phone) == null ? void 0 : _e.trim()) && Boolean((_f = matchedUser.city) == null ? void 0 : _f.trim());
      matchedUser.profileCompleted = isProfileComplete;
      try {
        localStorage.setItem("mqe_cached_user_profile", JSON.stringify(matchedUser));
      } catch (e) {
      }
      setLoggedInUser(matchedUser.email || matchedUser.uid);
      syncWithStore();
      const isAdminUser = matchedUser.isAdmin || matchedUser.role === "superAdmin" || matchedUser.role === "admin" || matchedUser.role === "dataEntryAdmin";
      if (isAdminUser) {
        setIsMandatorySetupOpen(false);
        setAdminMode(true);
        setActiveTab("admin");
        migrateAllFirestoreUsersToRtdb().then((report) => {
          console.log("[FirestoreToRTDB] Background full migration result:", report);
        }).catch((err) => {
          console.error("[FirestoreToRTDB] Background full migration error:", err);
        });
      } else {
        if (!isProfileComplete) {
          setIsMandatorySetupOpen(true);
        } else {
          setIsMandatorySetupOpen(false);
        }
        setAdminMode(false);
        setActiveTab("dashboard");
      }
      return { success: true };
    };
    const res = await verifyNetworkAndExecute(action);
    if (res && "success" in res) {
      return res;
    }
    return { success: false, error: "نیٹ ورک کا مسئلہ ہے۔" };
  };
  const handleLogout = () => {
    logout();
    syncWithStore();
    setActiveTab("dashboard");
  };
  const handleRecharge = async (email, amount, note) => {
    const action = async () => {
      const res2 = await rechargeWallet(email, amount, note);
      if (res2.success) {
        syncWithStore();
      }
      return res2;
    };
    const res = await verifyNetworkAndExecute(action);
    if (res && typeof res === "object" && "success" in res) {
      return res;
    }
    return { success: false, error: "انٹرنیٹ کنکشن کا مسئلہ ہے یا نیٹ ورک کی خرابی ہے۔" };
  };
  const handleSetLimit = async (category, number, firstPrizeAmountLimit, secondPrizeAmountLimit, drawId) => {
    const action = async () => {
      const res = await setOrUpdateLimit(category, number, firstPrizeAmountLimit, secondPrizeAmountLimit, drawId);
      syncWithStore();
      return res;
    };
    return await verifyNetworkAndExecute(action);
  };
  const handleDeleteLimit = async (id) => {
    const action = async () => {
      await deleteLimit(id);
      syncWithStore();
      return true;
    };
    return await verifyNetworkAndExecute(action);
  };
  const handleAddBooking = async (category, number, firstAmt, secondAmt, bondValue, drawNumber, drawDate, drawCity, drawId) => {
    if (!currentUser) return { success: false, error: "براہ کرم پہلے لاگ ان کریں۔" };
    const deadlinesList = getDrawDeadlines();
    let catDeadline = drawId ? deadlinesList.find((d) => (d.id || d.category) === drawId) : deadlinesList.find((d) => d.category === category && (!bondValue || d.nextPrizeBondValue === bondValue));
    if (!catDeadline) {
      catDeadline = deadlinesList.find((d) => d.category === category);
    }
    if (catDeadline) {
      if (catDeadline.status === "closed" || catDeadline.status === "result_announced") {
        return { success: false, error: "معذرت! اس ڈرا کی بکنگ بند ہو چکی ہے۔" };
      }
      const deadlineTime = new Date(catDeadline.deadlineIso).getTime();
      if (deadlineTime > 0 && Date.now() >= deadlineTime) {
        return { success: false, error: "معذرت! اس ڈرا کی بکنگ کا وقت ختم ہو چکا ہے۔" };
      }
    }
    const isHardFavBlocked = await checkIsNumberHardFavorite(category, number, drawId);
    if (isHardFavBlocked) {
      return { success: false, error: "یہ نمبر اس وقت booking کے لیے دستیاب نہیں ہے۔" };
    }
    const limitsList = getNumberLimits();
    const limit = limitsList.find((l) => (drawId ? l.drawId === drawId : l.category === category) && normalizeBookingNumber(l.number) === normalizeBookingNumber(number));
    if (limit) {
      const firstLimit = typeof limit.firstPrizeAmountLimit === "number" ? limit.firstPrizeAmountLimit : limit.maxAmount;
      const secondLimit = typeof limit.secondPrizeAmountLimit === "number" ? limit.secondPrizeAmountLimit : limit.maxAmount;
      if (firstLimit > 0 && firstAmt > firstLimit) {
        return { success: false, error: "یہ نمبر اس وقت booking کے لیے دستیاب نہیں ہے۔" };
      }
      if (secondLimit > 0 && secondAmt > secondLimit) {
        return { success: false, error: "یہ نمبر اس وقت booking کے لیے دستیاب نہیں ہے۔" };
      }
    }
    const action = async () => {
      const res = await addBooking(currentUser.email, category, number, firstAmt, secondAmt, bondValue, drawNumber, drawDate, drawCity, drawId);
      if (res.success) {
        syncWithStore();
      }
      return res;
    };
    return await verifyNetworkAndExecute(action);
  };
  const handleCancelBooking = async (id) => {
    const action = async () => {
      const res = await cancelBooking(id);
      if (res.success) {
        syncWithStore();
      }
      return res;
    };
    return await verifyNetworkAndExecute(action);
  };
  const handleCancelBookingByAdmin = async (id) => {
    const action = async () => {
      const res = await cancelBookingByAdmin(id);
      if (res.success) {
        syncWithStore();
      }
      return res;
    };
    return await verifyNetworkAndExecute(action);
  };
  const handleAddDemand = async (category, number, firstAmt, secondAmt, bondValue, drawNumber, drawDate, drawCity, drawId) => {
    if (!currentUser) return { success: false, error: "براہ کرم پہلے لاگ ان کریں۔" };
    const deadlinesList = getDrawDeadlines();
    let catDeadline = drawId ? deadlinesList.find((d) => (d.id || d.category) === drawId) : deadlinesList.find((d) => d.category === category && (!bondValue || d.nextPrizeBondValue === bondValue));
    if (!catDeadline) {
      catDeadline = deadlinesList.find((d) => d.category === category);
    }
    if (catDeadline) {
      if (catDeadline.status === "closed" || catDeadline.status === "result_announced") {
        return { success: false, error: "معذرت! اس ڈرا کی بکنگ بند ہو چکی ہے۔" };
      }
      const deadlineTime = new Date(catDeadline.deadlineIso).getTime();
      if (deadlineTime > 0 && Date.now() >= deadlineTime) {
        return { success: false, error: "معذرت! اس ڈرا کی بکنگ کا وقت ختم ہو چکا ہے۔" };
      }
    }
    const isHardFavBlocked = await checkIsNumberHardFavorite(category, number, drawId);
    if (isHardFavBlocked) {
      return { success: false, error: "یہ نمبر اس وقت booking کے لیے دستیاب نہیں ہے۔" };
    }
    const action = async () => {
      const res = await addDemand(currentUser.email, category, number, firstAmt, secondAmt, bondValue, drawNumber, drawDate, drawCity, drawId);
      if (res.success) {
        syncWithStore();
      }
      return res;
    };
    return await verifyNetworkAndExecute(action);
  };
  const handleApproveDemand = async (id) => {
    const action = async () => {
      const res = await approveDemand(id);
      if (res.success) {
        syncWithStore();
      }
      return res;
    };
    return await verifyNetworkAndExecute(action);
  };
  const handleRejectDemand = async (id) => {
    const action = async () => {
      const res = await rejectDemand(id);
      if (res.success) {
        syncWithStore();
      }
      return res;
    };
    return await verifyNetworkAndExecute(action);
  };
  const toggleAdminView = () => {
    if (activeTab === "admin") {
      setActiveTab("dashboard");
    } else {
      setActiveTab("admin");
    }
  };
  if (authLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center max-w-sm text-center animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mb-6 w-28 h-28 rounded-full border-2 border-amber-500/40 overflow-hidden shadow-2xl shadow-black/80 ring-4 ring-amber-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/mastermind_logo.jpg",
          alt: "Master Mind Qureshi Enterprise Logo",
          className: "w-full h-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 font-bold text-sm tracking-widest uppercase mb-1", children: "Welcome" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-black text-white tracking-tight mb-2 font-sans", children: "Master Mind Qureshi Enterprise" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 font-urdu mb-6 tracking-wide", children: "ماسٹر مائینڈ قریشی انٹرپرائز" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-8 h-8 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-2 border-slate-800" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-2 border-t-amber-400 border-r-amber-400/50 animate-spin" })
      ] })
    ] }) });
  }
  if (!currentUser) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      RegistrationForm,
      {
        onRegister: handleRegister,
        onLoginWithCredentials: handleLoginWithCredentials,
        onGoogleLogin: handleGoogleLogin
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-50 flex flex-col justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DashboardHeader,
        {
          user: currentUser,
          onLogout: handleLogout,
          onTabChange: setActiveTab,
          activeTab,
          onToggleAdminView: toggleAdminView,
          adminMode: activeTab === "admin"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "bg-white border-b border-slate-200 sticky top-[60px] z-40 shadow-sm leading-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-1 flex items-center justify-between sm:justify-center overflow-x-auto gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "subnav-dashboard",
            onClick: () => setActiveTab("dashboard"),
            className: `flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${activeTab === "dashboard" ? "bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md shadow-amber-500/10" : "bg-slate-900 text-amber-400 font-semibold border-slate-950 hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: `w-3.5 h-3.5 ${activeTab === "dashboard" ? "text-slate-950" : "text-amber-400"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ڈیش بورڈ" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "subnav-aianalysis",
            onClick: () => setActiveTab("ai_analysis"),
            className: `flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${activeTab === "ai_analysis" ? "bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md shadow-amber-500/10" : "bg-slate-900 text-amber-400 font-semibold border-slate-950 hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: `w-3.5 h-3.5 ${activeTab === "ai_analysis" ? "text-slate-950" : "text-amber-400"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "اے آئی اینالیسس پورٹل (AI Portal)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "subnav-profile",
            onClick: () => setActiveTab("profile"),
            className: `flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${activeTab === "profile" ? "bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md shadow-amber-500/10" : "bg-slate-900 text-amber-400 font-semibold border-slate-950 hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: `w-3.5 h-3.5 ${activeTab === "profile" ? "text-slate-950" : "text-amber-400"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "کسٹمر پروفائل" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "subnav-pakistan",
            onClick: () => setActiveTab("pakistan_bond"),
            className: `flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${activeTab === "pakistan_bond" ? "bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md shadow-amber-500/10" : "bg-slate-900 text-amber-400 font-semibold border-slate-950 hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarRange, { className: `w-3.5 h-3.5 ${activeTab === "pakistan_bond" ? "text-slate-950" : "text-amber-400"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "پاکستان بانڈ" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "subnav-thailand",
            onClick: () => setActiveTab("thailand_lottery"),
            className: `flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${activeTab === "thailand_lottery" ? "bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md shadow-amber-500/10" : "bg-slate-900 text-amber-400 font-semibold border-slate-950 hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollText, { className: `w-3.5 h-3.5 ${activeTab === "thailand_lottery" ? "text-slate-950" : "text-amber-400"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تھائی لینڈ لاٹری" })
            ]
          }
        ),
        adminMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            id: "subnav-admin",
            onClick: () => setActiveTab("admin"),
            className: `flex items-center gap-1 text-xs py-2 px-3 rounded-xl transition-all border whitespace-nowrap cursor-pointer ${activeTab === "admin" ? "bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-md shadow-amber-500/10" : "bg-slate-900 text-amber-400 font-semibold border-slate-950 hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: `w-3.5 h-3.5 ${activeTab === "admin" ? "text-slate-950" : "text-amber-400"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ایڈمن پینل" })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-5xl mx-auto px-4 py-8", children: [
        activeTab === "dashboard" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          DashboardOverview,
          {
            user: currentUser,
            bookings,
            onTabChange: setActiveTab,
            adminMode,
            onUpdateProfile: handleUpdateProfile
          }
        ),
        (activeTab === "profile" || activeTab === "my_bookings") && /* @__PURE__ */ jsxRuntimeExports.jsx(
          UserProfilePage,
          {
            user: currentUser,
            totalBookingsCount: bookings.filter((b) => b.userEmail === currentUser.email).length
          }
        ),
        activeTab === "pakistan_bond" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          BookingPage,
          {
            user: currentUser,
            bookings,
            dealerBookings,
            demands,
            deadlines,
            category: "pakistan_bond",
            onAddBooking: (num, first, second, bv, dn, dd, dc, drawId) => handleAddBooking("pakistan_bond", num, first, second, bv, dn, dd, dc, drawId),
            onCancelBooking: handleCancelBooking,
            onAddDemand: (num, first, second, bv, dn, dd, dc, drawId) => handleAddDemand("pakistan_bond", num, first, second, bv, dn, dd, dc, drawId)
          }
        ),
        activeTab === "thailand_lottery" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          BookingPage,
          {
            user: currentUser,
            bookings,
            dealerBookings,
            demands,
            deadlines,
            category: "thailand_lottery",
            onAddBooking: (num, first, second, bv, dn, dd, dc, drawId) => handleAddBooking("thailand_lottery", num, first, second, bv, dn, dd, dc, drawId),
            onCancelBooking: handleCancelBooking,
            onAddDemand: (num, first, second, bv, dn, dd, dc, drawId) => handleAddDemand("thailand_lottery", num, first, second, bv, dn, dd, dc, drawId)
          }
        ),
        activeTab === "admin" && adminMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
          AdminPortal,
          {
            users,
            limits,
            demands,
            deadlines,
            bookings,
            dealerBookings,
            pakistanBondResults,
            thaiLotteryResults,
            currentUser,
            hardFavoriteNumbers,
            onAddHardFavorite: handleAddHardFavorite,
            onRemoveHardFavorite: handleRemoveHardFavorite,
            onCancelBookingByAdmin: handleCancelBookingByAdmin,
            onCancelDealerBookingByAdmin: cancelDealerBookingByAdmin,
            onAssignDealer: assignDealerRole,
            onRecharge: handleRecharge,
            onSetLimit: handleSetLimit,
            onDeleteLimit: handleDeleteLimit,
            onApproveDemand: handleApproveDemand,
            onRejectDemand: handleRejectDemand,
            onSetDeadline: handleSetDeadline,
            onDeleteDeadline: handleDeleteDeadline,
            onAddResult: addResult,
            onEditResult: editResult,
            onDeleteResult: deleteResult
          }
        ),
        activeTab === "ai_analysis" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          AIAnalysisPortal,
          {
            user: currentUser,
            bookings,
            pakistanBondResults,
            thaiLotteryResults,
            onAddBooking: (num, first, second) => handleAddBooking("pakistan_bond", num, first, second),
            onAddDemand: (num, first, second) => handleAddDemand("pakistan_bond", num, first, second)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-slate-900 text-slate-400 py-6 border-t border-slate-800 text-center text-xs font-sans mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " MasterMind Qureshi Enterprise. تمام حقوق محفوظ ہیں۔"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: whatsappUrl,
          target: "_blank",
          referrerPolicy: "no-referrer",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-full transition-all text-xs font-bold whitespace-nowrap cursor-pointer hover:scale-105 active:scale-100",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مدد اور واٹس ایپ رابطہ (WhatsApp Support)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3 text-[11px] font-sans", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: PRIVACY_POLICY_URL,
            onClick: (e) => {
              e.preventDefault();
              openExternalUrl(PRIVACY_POLICY_URL);
            },
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-slate-400 hover:text-amber-400 transition-colors underline cursor-pointer",
            children: "رازداری کی پالیسی (Privacy Policy)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: DELETE_ACCOUNT_URL,
            onClick: (e) => {
              e.preventDefault();
              openExternalUrl(DELETE_ACCOUNT_URL);
            },
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-slate-400 hover:text-red-400 transition-colors underline cursor-pointer",
            children: "اکاؤنٹ خاتمہ (Delete Account)"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-[11px] font-mono", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-500", children: "Fast Booking Systems" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Secure Wallet Node" })
      ] })
    ] }) }),
    currentUser && !currentUser.isAdmin && currentUser.role !== "superAdmin" && currentUser.role !== "dataEntryAdmin" && currentUser.role !== "admin" && (isMandatorySetupOpen || !currentUser.profileCompleted && (!((_a = currentUser.phone) == null ? void 0 : _a.trim()) || !((_b = currentUser.city) == null ? void 0 : _b.trim()))) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProfileSetupModal,
      {
        user: currentUser,
        isOpen: true,
        isMandatory: true,
        onClose: () => setIsMandatorySetupOpen(false),
        onSave: handleUpdateProfile
      }
    ),
    isOfflineModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white max-w-md w-full rounded-3xl border-2 border-red-500 shadow-2xl p-6 sm:p-8 text-right font-sans flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4 border border-red-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 text-3xl font-bold font-mono animate-pulse", children: "!" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-900 mb-2 font-sans", children: "انٹرنیٹ کنکشن موجود نہیں ہے" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-red-600 mb-4 font-sans uppercase tracking-wider", children: "No Internet Connection" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-600 text-sm leading-relaxed mb-6 text-center", children: [
        '"No internet connection. Please turn on Wi-Fi or Mobile Data and try again."',
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-500 block mt-2", children: "انٹرنیٹ کنکشن غائب ہے۔ براہ کرم اپنا وائی فائی یا موبائل ڈیٹا آن کریں اور دوبارہ کوشش کریں۔" })
      ] }),
      retryStatus === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-red-50 border border-red-200 rounded-2xl p-3 text-red-700 text-xs text-center mb-4", children: [
        "انٹرنیٹ ابھی بھی منقطع ہے۔ براہ کرم دوبارہ چیک کریں۔",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Connection still offline. Please check and retry."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleRetryConnection,
          disabled: retryStatus === "checking",
          className: "w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-amber-400 font-bold py-3.5 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md",
          children: retryStatus === "checking" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin rounded-full h-4 w-4 border-2 border-amber-400 border-t-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "رابطہ چیک کیا جا رہا ہے..." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "دوبارہ کوشش کریں (Retry)" })
        }
      )
    ] }) })
  ] });
}
clientExports.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
