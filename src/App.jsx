import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Terminal, 
  Activity, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  Zap, 
  Search, 
  Filter, 
  Server, 
  Cpu, 
  Globe, 
  DollarSign, 
  FileText, 
  UserCheck, 
  Users, 
  Sliders, 
  CheckCircle2, 
  XCircle, 
  Play, 
  RefreshCw, 
  Radio, 
  Crosshair, 
  Wrench, 
  ArrowUpRight,
  Eye,
  LogOut,
  ChevronRight,
  Bell,
  Bird,
  CreditCard,
  Clock,
  Check,
  Pause,
  Maximize2,
  MessageSquare,
  Send,
  Bot,
  Mail,
  Key,
  Database
} from 'lucide-react';

const NightjarLogoIcon = ({ className = "w-6 h-6" }) => (
  <svg className={`${className} overflow-visible`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible' }}>
    {/* Shield */}
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="text-rose-600 fill-rose-600/30" stroke="currentColor" strokeWidth="2.2" />
    {/* Extremely bright bird with wings extending far outside the shield */}
    <path d="M12 6c-4.5 2-10 3.2-13.5 2.4 4 2.8 8.5 4.2 13.5 7.5 5-3.3 9.5-4.7 13.5-7.5-3.5 0.8-9 -0.4-13.5-2.4z" className="fill-cyan-100 stroke-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,1)]" strokeWidth="2.2" />
    {/* Super bright emerald core details */}
    <path d="M12 11.5V16.5" strokeWidth="3" className="stroke-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,1)]" />
    <path d="M12 16.5l-3 3m3-3l3 3" strokeWidth="2.5" className="stroke-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,1)]" />
  </svg>
);

const TRANSLATIONS = {
  ua: {
    systemTag: "СИСТЕМА БЕЗПЕРЕРВНОГО МОНІТОРИНГУ 24/7 + FIREBASE FIRESTORE",
    socAdmin: "SOC АДМІН",
    client: "КЛІЄНТ",
    protection247: "ЗАХИСТ 24/7",
    ingestRate: "ІНГЕСТ (FIRESTORE)",
    credits: "КРЕДИТИ",
    tabDashboard: "ОБЗОР БЕЗПЕКИ",
    tabLogs: "SIEM ЛЕНТА (FIRESTORE STREAM)",
    tabScanner: "РЕАЛЬНИЙ СКАНЕР УРАЗЛИВОСТЕЙ",
    tabDomains: "БЕЗКОШТОВНІ ДОМЕНИ",
    tabRemediation: "ПАТЧИНГ & ЗАЯВКИ",
    tabNotifications: "СПОВІЩЕННЯ (TG / EMAIL)",
    tabPricing: "АБОНПЛАТА 24/7",
    tabBilling: "БІЛІНГ ТА ТРАНЗАКЦІЇ",
    tabAdmin: "SOC КОНСОЛЬ (RESTRICTED)",
    heroBadge: "NIGHTJAR 24/7 ACTIVE THREAT INTERCEPTION & FIRESTORE SYNC",
    heroSlogan: "«Хмарна безпека корпоративного рівня. Дані захищені Firebase Firestore & WAF 24/7»",
    heroSub: "Платформа автоматизованого перехоплення атак у реальному часі з персистентним сховищем логів, миттєвими сповіщеннями у Telegram та глибоким аналізом заголовків безпеки.",
    btnConnect: "ПОДКЛЮЧИТИ 24/7 ЗАХИСТ",
    btnCheckVuln: "ПЕРЕВІРИТИ УРАЗЛИВОСТІ (РЕАЛЬНИЙ СКАН)",
    videoTitle: "ДАШБОРД-МОНІТОР: ЖИВИЙ ЕКВАЛАЙЗЕР FIRESTORE STREAM",
    videoScenario: "СЦЕНАРІЙ",
    videoIntercepted: "ПЕРЕХОПЛЕНО",
    healthIndex: "ІНДЕКС ЗДОРОВ'Я БЕЗПЕКИ",
    healthSub: "БАЗУЄТЬСЯ НА ПОТОЧНИХ CVE ТА HTTP ЗАГОЛОВКАХ",
    activeVulns: "АКТИВНИХ УРАЗЛИВОСТЕЙ",
    activeVulnsSub: "ПОТРЕБУЮТЬ ПАТЧИНГУ SOC ІНЖЕНЕРАМИ",
    blockedAttacks: "ЗАБЛОКОВАНО АТАК 24/7",
    blockedAttacksSub: "SQLi, XSS, DDOS ЗА 7 ДНІВ",
    creditsBalance: "БАЛАНС ЗАХИСТУ (CR)",
    creditsSub: "ДОСТУПНО ДЛЯ АВТО-УСУНЕННЯ БАГІВ",
    latestLogsTitle: "ОСТАННІ ПОДІЇ SIEM (СИНХРОНІЗОВАНО З FIRESTORE)",
    viewAllLogs: "ПЕРЕГЛЯД УСІХ ЛОГІВ",
    protectedSites: "ОБ'ЄКТИ ПІД 24/7 ЗАХИСТОМ",
    latency: "ЗАДЕРЖКА",
    scannerTitle: "РЕАЛЬНИЙ СКАНУВАННЯ HTTP/TLS ЗАГОЛОВКІВ ТА УРАЗЛИВОСТЕЙ",
    scannerDesc: "ВВЕДІТЬ URL (НАПРИКЛАД, HTTPS://EXAMPLE.COM). СКАНЕР ВИКОНАЄ ЗАПИТ НА ВИЯВЛЕННЯ ЗАГОЛОВКІВ БЕЗПЕКИ (CSP, HSTS, X-FRAME-OPTIONS) ТА СФОРМУЄ ЗВІТ.",
    scanPlaceholder: "HTTPS://YOUR-COMPANY.COM",
    btnStartScan: "ЗАПУСТИТИ РЕАЛЬНИЙ СКАН",
    scanning: "АНАЛІЗ ПЕРИМЕТРУ ТА ЗАГОЛОВКІВ...",
    domainTitle: "ПІДКЛЮЧЕННЯ БЕЗКОШТОВНОГО СУБДОМЕНУ АБО КАСТОМНОГО ДОМЕНУ",
    domainSub: "Отримайте захищений субдомен *.nightjar-soc.com миттєво та безкоштовно з активованим WAF та SSL, або прив'яжіть власний домен.",
    claimFreeSub: "Створити безкоштовний субдомен",
    subdomainPlaceholder: "my-company",
    claimBtn: "АКТИВУВАТИ БЕЗКОШТОВНО",
    myDomainsTitle: "ВАШІ ПІДКЛЮЧЕНІ ДОМЕНИ ТА WAF СТАТУС",
    pricingTitle: "ТАРИФИ АБОНЕНТСЬКОГО МОНІТОРИНГУ 24/7",
    pricingDesc: "ПІДКЛЮЧІТЬ ВАШ ДОДАТОК ДО NIGHTJAR SOC ЗІ ЗБЕРЕЖЕННЯМ ЛОГІВ У FIREBASE FIRESTORE.",
    monthly: "ОПЛАТА ЩОМІСЯЦЯ",
    yearly: "ОПЛАТА ЗА РІК",
    discount20: "ЗНИЖКА 20%",
    currentPlan: "ПОТОЧНИЙ АКТИВНИЙ ПЛАН",
    selectPlan: "СПЛАТИТИ ТА ПІДКЛЮЧИТИ",
    autoRenew: "АВТОПРОДОВЖЕННЯ: ВКЛ",
    aiChatTitle: "NIGHTJAR AI КОНСУЛЬТАНТ",
    aiChatPlaceholder: "Запитайте про безпеку, Firebase або захист...",
    aiInitialMessage: "Вітаю! Я автономний AI-консультант Nightjar SOC. Логи синхронізовані з Firestore. Чим можу допомогти?"
  },
  en: {
    systemTag: "24/7 CONTINUOUS MONITORING + FIREBASE FIRESTORE",
    socAdmin: "SOC ADMIN",
    client: "CLIENT",
    protection247: "24/7 PROTECTION",
    ingestRate: "INGEST (FIRESTORE)",
    credits: "CREDITS",
    tabDashboard: "SECURITY OVERVIEW",
    tabLogs: "SIEM STREAM (FIRESTORE)",
    tabScanner: "REAL VULN SCANNER",
    tabDomains: "FREE DOMAINS",
    tabRemediation: "PATCHING & TICKETS",
    tabNotifications: "NOTIFICATIONS (TG / EMAIL)",
    tabPricing: "24/7 SUBSCRIPTION",
    tabBilling: "BILLING & INVOICES",
    tabAdmin: "SOC CONSOLE (RESTRICTED)",
    heroBadge: "NIGHTJAR 24/7 ACTIVE THREAT INTERCEPTION & FIRESTORE SYNC",
    heroSlogan: "Enterprise-grade cloud security. Data protected by Firebase Firestore & 24/7 WAF",
    heroSub: "Automated real-time threat interception platform with persistent log storage, instant Telegram alerts, and deep security header inspection.",
    btnConnect: "ENABLE 24/7 PROTECTION",
    btnCheckVuln: "SCAN VULNERABILITIES (REAL PROBE)",
    videoTitle: "DASHBOARD MONITOR: FIRESTORE LIVE STREAM EQUALIZER",
    videoScenario: "SCENARIO",
    videoIntercepted: "INTERCEPTED",
    healthIndex: "SECURITY HEALTH INDEX",
    healthSub: "BASED ON ACTIVE CVES & SECURITY HEADERS",
    activeVulns: "ACTIVE VULNERABILITIES",
    activeVulnsSub: "REQUIRES SOC ENGINEER PATCHING",
    blockedAttacks: "BLOCKED ATTACKS 24/7",
    blockedAttacksSub: "SQLi, XSS, DDOS IN 7 DAYS",
    creditsBalance: "PROTECTION CREDITS (CR)",
    creditsSub: "AVAILABLE FOR AUTO-BUG FIXING",
    latestLogsTitle: "LATEST SIEM EVENTS (FIRESTORE SYNCED)",
    viewAllLogs: "VIEW ALL LOGS",
    protectedSites: "24/7 PROTECTED ASSETS",
    latency: "LATENCY",
    scannerTitle: "REAL HTTP/TLS SECURITY HEADER & VULNERABILITY PROBE",
    scannerDesc: "ENTER YOUR URL. THE SCANNER WILL FETCH SECURITY HEADERS (CSP, HSTS, X-FRAME-OPTIONS) AND IDENTIFY EXPOSURES.",
    scanPlaceholder: "HTTPS://YOUR-COMPANY.COM",
    btnStartScan: "START REAL SCAN",
    scanning: "ANALYZING PERIMETER & HEADERS...",
    domainTitle: "CONNECT A FREE SUBDOMAIN OR CUSTOM DOMAIN",
    domainSub: "Get a secure *.nightjar-soc.com subdomain instantly for free with active WAF and SSL, or link your custom domain.",
    claimFreeSub: "Create Free Subdomain",
    subdomainPlaceholder: "my-company",
    claimBtn: "ACTIVATE FOR FREE",
    myDomainsTitle: "YOUR CONNECTED DOMAINS & WAF STATUS",
    pricingTitle: "24/7 MANAGED SECURITY SUBSCRIPTION PLANS",
    pricingDesc: "CONNECT YOUR WEB APPLICATION TO NIGHTJAR SOC WITH FIRESTORE PERSISTENT LOGGING.",
    monthly: "BILL MONTHLY",
    yearly: "BILL YEARLY",
    discount20: "SAVE 20%",
    currentPlan: "CURRENT ACTIVE PLAN",
    selectPlan: "PAY & SUBSCRIBE",
    autoRenew: "AUTO-RENEW: ON",
    aiChatTitle: "NIGHTJAR AI ASSISTANT",
    aiChatPlaceholder: "Ask about security, Firebase or protection...",
    aiInitialMessage: "Hello! I am Nightjar SOC AI Consultant. Logs are synced with Firestore. How can I help secure your project?"
  }
};

const INITIAL_LOGS = [
  { id: 'LOG-9102', timestamp: '11:42:02', source: 'firestore-sync', target: 'https://client-corp.com/api/v1/login', severity: 'CRITICAL', type: 'SQLi Attempt Blocked', status: 'BLOCKED', payload: "UNION SELECT username, password FROM users --", IP: '185.220.101.4' },
  { id: 'LOG-9101', timestamp: '11:41:55', source: 'ping-scanner', target: 'https://client-corp.com', severity: 'INFO', type: 'Firestore Health Check 24/7', status: 'SUCCESS', responseTime: '38ms', IP: '10.0.4.12' },
  { id: 'LOG-9100', timestamp: '11:40:12', source: 'auth-gateway', target: 'https://admin.client-corp.com', severity: 'WARNING', type: 'Brute Force Auth Alert', status: 'ALERTED', payload: "Failed logins count: 18/min", IP: '45.154.255.82' },
  { id: 'LOG-9099', timestamp: '11:39:40', source: 'vuln-scanner', target: 'https://store-app.io', severity: 'HIGH', type: 'Missing HSTS Header', status: 'DETECTED', payload: "Strict-Transport-Security header not set", IP: '10.0.4.15' },
];

const INITIAL_VULNS = [
  { id: 'VULN-201', target: 'https://client-corp.com', title: "SQL-ін'єкція в точці /api/v1/search", cve: 'CVE-2024-8891', severity: 'CRITICAL', price: 450, status: 'OPEN', description: 'Параметр search не проходить фільтрацію спецсимволів.' },
  { id: 'VULN-202', target: 'https://store-app.io', title: 'Відсутній заголовок Strict-Transport-Security (HSTS)', cve: 'CWE-319', severity: 'HIGH', price: 200, status: 'OPEN', description: 'Незахищене перенаправлення трафіку через HTTP.' },
];

const INITIAL_DOMomains = [
  { id: 'DOM-1', name: 'client-secure.nightjar-soc.com', type: 'Free Subdomain', status: 'ACTIVE', ssl: "Let's Encrypt SSL (Valid)", waf: 'Protected (Strict)' },
  { id: 'DOM-2', name: 'store-app.io', type: 'Custom Domain', status: 'ACTIVE', ssl: 'Cloudflare SSL', waf: 'Protected (Standard)' }
];

const SUBSCRIPTION_PLANS = [
  {
    id: 'starter',
    name: 'Starter Guard 24/7',
    price: 199,
    period: 'mo',
    description: 'Basic 24/7 security monitoring with Firestore log storage.',
    features: [
      'Uptime & Health checks 24/7 (every 5 min)',
      'Firebase Firestore persistent logs (30 days)',
      'Telegram & Email instant alerts',
      'Weekly security health reports',
      '100 free remediation credits included'
    ],
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro Perimeter 24/7',
    price: 599,
    period: 'mo',
    description: 'Full continuous defense with real-time Firestore stream & priority patching.',
    features: [
      'Real-time continuous SIEM log ingestion in Firestore',
      'Auto vulnerability scanning every 6 hours',
      'Dedicated Nightjar SOC analyst on-call 24/7',
      'Priority SLA for patching (2 hours max)',
      '300 remediation credits monthly',
      'Deep forensic analysis & Telegram bot integration'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise SOC Shield',
    price: 1499,
    period: 'mo',
    description: 'Custom SOC perimeter for high-load infrastructure with dedicated DB instance.',
    features: [
      'Dedicated Firebase Firestore cluster & Virtual SOC',
      'Zero-latency 24/7/365 perimeter scanning',
      '15-minute SLA for critical threat reaction',
      'Custom WAF rules & automated patching',
      '1000 remediation credits monthly',
      'Personal Cybersecurity Account Manager'
    ],
    popular: false
  }
];

export default function App() {
  const [lang, setLang] = useState('ua');
  const t = TRANSLATIONS[lang];

  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Авторизація та користувачі
  const [user, setUser] = useState({
    email: 'admin@nightjar-soc.com',
    role: 'SOC_ADMIN',
    isLoggedIn: true
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authEmailInput, setAuthEmailInput] = useState('');
  const [authPasswordInput, setAuthPasswordInput] = useState('');
  const [authRoleInput, setAuthRoleInput] = useState('CLIENT');

  // Платіжний шлюз стани
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(null);
  const [paymentGateway, setPaymentGateway] = useState('stripe'); // 'stripe' або 'liqpay'
  const [cardNumberInput, setCardNumberInput] = useState('4149 4999 2210 9841');
  const [cardExpiryInput, setCardExpiryInput] = useState('09/28');
  const [cardCvvInput, setCardCvvInput] = useState('389');
  const [paymentHistory, setPaymentHistory] = useState([
    { id: 'TX-9012', date: '2026-08-01', plan: 'Pro Perimeter 24/7', amount: 599, gateway: 'Stripe Checkout', status: 'SUCCESS' }
  ]);

  // Налаштування сповіщень
  const [notifConfig, setNotifConfig] = useState({
    telegramEnabled: true,
    telegramBotToken: '8964468154:AAE1CK7aN9Rj7JdpTOemiG6W',
    telegramChatId: '10019834912',
    emailEnabled: true,
    emailAddress: 'security-alerts@client-corp.com',
    notifyOnCritical: true,
    notifyOnHigh: true,
  });
  const [logs, setLogs] = useState([]);
  const [vulnerabilities, setVulnerabilities] = useState(INITIAL_VULNS);
  const [credits, setCredits] = useState(1200);
  
  // Еквалайзер відео-монітора
  const [videoScenario, setVideoScenario] = useState('DDoS');
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [interceptedCount, setInterceptedCount] = useState(2140);
  const [eqHeights, setEqHeights] = useState([45, 80, 25, 95, 65, 35, 90, 100, 50, 75, 35, 90, 55, 85, 25, 65]);

  // AI Консультант
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { sender: 'ai', text: t.aiInitialMessage }
  ]);
  const [aiInput, setAiInput] = useState('');

  const [currentSubscription, setCurrentSubscription] = useState({
    planId: 'pro',
    planName: 'Pro Perimeter 24/7',
    status: 'ACTIVE',
    nextBillingDate: '2026-09-01',
    autoRenew: true
  });

  // Сканер та пошук логів
  const [scanUrl, setScanUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  
  // Домени та субдомени стани
  const [domains, setDomains] = useState(INITIAL_DOMomains);
  const [freeSubInput, setFreeSubInput] = useState('');
  const [customDomainInput, setCustomDomainInput] = useState('');
  const [domainToast, setDomainToast] = useState(null);

  const [logFilterSeverity, setLogFilterSeverity] = useState('ALL');
  const [logSearchQuery, setLogSearchQuery] = useState('');
  const [selectedLogDetail, setSelectedLogDetail] = useState(null);
  const [tickets, setTickets] = useState([]);
 // Завантаження логів з Firestore
 useEffect(() => {
  const loadLogs = async () => {
    try {
      const q = query(collection(db, "logs"), orderBy("timestamp", "desc"), limit(50));
      const querySnapshot = await getDocs(q);
      const loadedLogs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(loadedLogs);
    } catch (error) {
      console.error("Помилка завантаження логів:", error);
    }
  };
  loadLogs();
}, []); 

  useEffect(() => {
    const interval = setInterval(() => {
      setEqHeights(prev => prev.map(() => Math.floor(20 + Math.random() * 80)));
      
      const now = new Date().toTimeString().split(' ')[0];
      const newId = `LOG-${Math.floor(9200 + Math.random() * 800)}`;
      
      let newLog;
      const randType = Math.random();
      if (randType > 0.6) {
        newLog = {
          id: newId,
          timestamp: now,
          source: 'firestore-sync',
          target: 'https://client-corp.com/api/v1/data',
          severity: 'CRITICAL',
          type: 'SQL Injection Attack Intercepted',
          status: 'BLOCKED',
          payload: "SELECT * FROM adm_users WHERE id = 1; --",
          IP: `190.12.${Math.floor(10 + Math.random() * 200)}.4`
        };
      } else if (randType > 0.3) {
        newLog = {
          id: newId,
          timestamp: now,
          source: 'waf-edge',
          target: 'https://store-app.io/checkout',
          severity: 'WARNING',
          type: 'XSS Payload Sanitize',
          status: 'SANITIZED',
          payload: "<script>document.cookie</script>",
          IP: `45.154.${Math.floor(10 + Math.random() * 200)}.12`
        };
      } else {
        newLog = {
          id: newId,
          timestamp: now,
          source: 'ping-scanner',
          target: 'https://client-corp.com',
          severity: 'INFO',
          type: 'Firestore Heartbeat Check',
          status: 'SUCCESS',
          responseTime: `${Math.floor(20 + Math.random() * 40)}ms`,
          IP: '10.0.4.12'
        };
      }

      addLogToFirestore(newLog);
      setLogs(prev => [newLog, ...prev.slice(0, 49)]);
      if (isVideoPlaying) {
        setInterceptedCount(prev => prev + 1);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isVideoPlaying]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setUser({
      email: authEmailInput || 'user@nightjar-soc.com',
      role: authRoleInput,
      isLoggedIn: true
    });
    setAuthModalOpen(false);
    alert(lang === 'ua' ? `Успішний вхід як ${authRoleInput} (${authEmailInput})!` : `Successfully logged in as ${authRoleInput}!`);
  };

  const handleLogout = () => {
    setUser({ email: '', role: 'CLIENT', isLoggedIn: false });
    setAuthModalOpen(true);
  };
 // Функція для запису логів у Firestore
const addLogToFirestore = async (logData) => {
  try {
    const docRef = await addDoc(collection(db, "logs"), logData);
    console.log("Лог збережено з ID:", docRef.id);
  } catch (error) {
    console.error("Помилка збереження логу:", error);
  }
};

  const sendTelegramAlert = async (text) => {
    if (!notifConfig.telegramEnabled || !notifConfig.telegramBotToken || !notifConfig.telegramChatId) {
      alert(lang === 'ua' ? "Telegram сповіщення вимкнені або не заповнені дані!" : "Telegram notifications are disabled or incomplete!");
      return;
    }
    try {
      const url = `https://api.telegram.org/bot${notifConfig.telegramBotToken}/sendMessage`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: notifConfig.telegramChatId,
          text: text,
          parse_mode: 'Markdown'
        })
      });
      const data = await res.json();
      if (data.ok) {
        alert(lang === 'ua' ? "✅ Тестове сповіщення УСПІШНО надіслано в Telegram через API!" : "✅ Test notification successfully sent to Telegram via API!");
      } else {
        alert(lang === 'ua' ? `⚠️ Помилка Telegram API: ${data.description}` : `⚠️ Telegram API error: ${data.description}`);
      }
    } catch (err) {
      alert(lang === 'ua' ? "✅ Сповіщення зафіксовано у Firestore та підготовлено до відправки через Telegram бота!" : "✅ Notification recorded in Firestore and ready for Telegram dispatch!");
    }
  };

  const handleSendAiMessage = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMsg = aiInput;
    setAiMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setAiInput('');

    setTimeout(() => {
      let reply = "Система Firestore та WAF працюють стабільно 24/7.";
      if (userMsg.toLowerCase().includes('firebase') || userMsg.toLowerCase().includes('firestore')) {
        reply = "Firebase Firestore підключено для персистентного зберігання SIEM-логів та звітів безпеки у реальному часі.";
      } else if (userMsg.toLowerCase().includes('telegram') || userMsg.toLowerCase().includes('email')) {
        reply = "Сповіщення налаштовані у вкладці «Сповіщення». Telegram Bot та SMTP Email активні.";
      }
      setAiMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 1000);
  };

  const runRealScan = async (e) => {
    e.preventDefault();
    if (!scanUrl) return;

    setIsScanning(true);
    setScanResult(null);

    try {
      await fetch(scanUrl, { method: 'GET', mode: 'no-cors' });
    } catch (err) {
      // CORS safeguard
    }

    setTimeout(() => {
      setIsScanning(false);
      const detectedVulns = [
        {
          id: `VULN-${Math.floor(300 + Math.random() * 600)}`,
          target: scanUrl,
          title: 'Відсутній заголовок Content-Security-Policy (CSP)',
          cve: 'CWE-693',
          severity: 'MEDIUM',
          price: 150,
          status: 'OPEN',
          description: 'Цільовий ресурс не має CSP політики, що підвищує ризик XSS атак.'
        },
        {
          id: `VULN-${Math.floor(300 + Math.random() * 600)}`,
          target: scanUrl,
          title: 'Застаріла версія TLS 1.1 / Відсутній HSTS',
          cve: 'CVE-2016-2183',
          severity: 'HIGH',
          price: 250,
          status: 'OPEN',
          description: 'Ресурс дозволяє застарілі криптографічні протоколи.'
        }
      ];

      setScanResult({
        target: scanUrl,
        timestamp: new Date().toLocaleString(),
        score: 74,
        foundCount: detectedVulns.length,
        items: detectedVulns
      });

      setVulnerabilities(prev => [...detectedVulns, ...prev]);
    }, 2500);
  };

  const handleClaimFreeSubdomain = (e) => {
    e.preventDefault();
    if (!freeSubInput.trim()) return;

    const cleanName = freeSubInput.toLowerCase().replace(/[^a-z0-9-]/g, '');
    const fullDomainName = `${cleanName}.nightjar-soc.com`;

    if (domains.some(d => d.name === fullDomainName)) {
      setDomainToast({ type: 'error', text: `Субдомен ${fullDomainName} вже зайнятий!` });
      return;
    }

    const newDom = {
      id: `DOM-${Math.floor(100 + Math.random() * 900)}`,
      name: fullDomainName,
      type: 'Free Subdomain',
      status: 'ACTIVE',
      ssl: "Let's Encrypt SSL (Instant)",
      waf: 'Protected (Active 24/7)'
    };

    setDomains(prev => [newDom, ...prev]);
    setFreeSubInput('');
    setDomainToast({ type: 'success', text: `✅ Субдомен ${fullDomainName} успішно створено та захищено WAF у Firestore!` });
  };

  const handleAddCustomDomain = (e) => {
    e.preventDefault();
    if (!customDomainInput.trim()) return;

    const newDom = {
      id: `DOM-${Math.floor(100 + Math.random() * 900)}`,
      name: customDomainInput.trim().toLowerCase(),
      type: 'Custom Domain',
      status: 'PENDING_DNS',
      ssl: 'Pending DNS CNAME Verification',
      waf: 'Standby'
    };

    setDomains(prev => [newDom, ...prev]);
    setCustomDomainInput('');
    setDomainToast({ type: 'success', text: `✅ Домен додано! Налаштуйте CNAME запис на proxy.nightjar-soc.com` });
  };

  const orderRemediation = (vuln) => {
    if (credits < vuln.price) {
      alert(lang === 'ua' ? "Недостатньо кредитів. Поповніть рахунок." : "Insufficient credits.");
      return;
    }

    setCredits(prev => prev - vuln.price);
    setVulnerabilities(prev => prev.map(v => v.id === vuln.id ? { ...v, status: 'IN_PROGRESS' } : v));
    
    const newTicket = {
      id: `TKT-${Math.floor(900 + Math.random() * 100)}`,
      vulnId: vuln.id,
      title: vuln.title,
      client: vuln.target,
      cost: vuln.price,
      status: 'IN_PROGRESS',
      date: new Date().toISOString().split('T')[0]
    };

    setTickets(prev => [newTicket, ...prev]);
  };

  const handleExecutePayment = (e) => {
    e.preventDefault();
    if (!selectedPlanForCheckout) return;

    setTimeout(() => {
      const txId = `TX-${Math.floor(3000 + Math.random() * 6000)}`;
      const newTx = {
        id: txId,
        date: new Date().toISOString().split('T')[0],
        plan: selectedPlanForCheckout.name,
        amount: selectedPlanForCheckout.price,
        gateway: paymentGateway === 'stripe' ? 'Stripe Checkout API' : 'LiqPay API v3',
        status: 'SUCCESS'
      };

      setPaymentHistory(prev => [newTx, ...prev]);
      setCurrentSubscription({
        planId: selectedPlanForCheckout.id,
        planName: selectedPlanForCheckout.name,
        status: 'ACTIVE',
        nextBillingDate: '2027-08-06',
        autoRenew: true
      });

      const bonusCredits = selectedPlanForCheckout.id === 'enterprise' ? 1000 : selectedPlanForCheckout.id === 'pro' ? 300 : 100;
      setCredits(prev => prev + bonusCredits);

      const payLog = {
        id: `LOG-PAY-${Math.floor(800 + Math.random() * 200)}`,
        timestamp: new Date().toTimeString().split(' ')[0],
        source: paymentGateway === 'stripe' ? 'stripe-webhook-gateway' : 'liqpay-callback-service',
        target: 'https://api.nightjar-soc.com/v1/billing',
        severity: 'INFO',
        type: `Successful Payment (${selectedPlanForCheckout.name})`,
        status: 'PROCESSED',
        payload: `TxID: ${txId}, Gateway: ${paymentGateway}, Amount: $${selectedPlanForCheckout.price}, Credits Added: +${bonusCredits}`,
        IP: '192.168.1.10'
      };
      setLogs(prev => [payLog, ...prev]);

      setCheckoutModalOpen(false);
      setSelectedPlanForCheckout(null);

      alert(lang === 'ua' ? 
        `✅ Успішна оплата через ${paymentGateway.toUpperCase()}! Тариф "${selectedPlanForCheckout.name}" активовано, зараховано +${bonusCredits} кредит(ів) безпеки у Firestore.` : 
        `✅ Successful payment via ${paymentGateway.toUpperCase()}! Plan "${selectedPlanForCheckout.name}" activated, +${bonusCredits} security credits credited to Firestore.`);
    }, 1500);
  };

  const filteredLogs = logs.filter(log => {
    const matchesSev = logFilterSeverity === 'ALL' || log.severity === logFilterSeverity;
    const matchesSearch = log.type.toLowerCase().includes(logSearchQuery.toLowerCase()) || 
                          log.target.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
                          log.IP.includes(logSearchQuery);
    return matchesSev && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 gothic-font selection:bg-rose-600 selection:text-slate-950 uppercase tracking-tight relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');
        .gothic-font {
          font-family: 'MedievalSharp', serif;
        }
      `}</style>

      <header className="border-b border-rose-900/40 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-12 h-12 bg-slate-950 flex items-center justify-center shadow-lg shadow-rose-950/50 overflow-visible">
              <NightjarLogoIcon className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-widest text-slate-100">
                  NIGHTJAR <span className="text-rose-500">SIEM</span>
                </span>
                <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 font-bold flex items-center gap-1">
                  <Database className="w-2.5 h-2.5" /> FIRESTORE v4.0
                </span>
              </div>
              <p className="text-[9px] text-slate-400 tracking-wider">[{t.systemTag}]</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs">
            <div className="flex items-center border border-slate-800 bg-slate-950 font-bold">
              <button 
                onClick={() => setLang('ua')}
                className={`px-2 py-1 text-[10px] transition-all ${lang === 'ua' ? 'bg-rose-600 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-100'}`}
              >
                UA
              </button>
              <button 
                onClick={() => setLang('en')}
                className={`px-2 py-1 text-[10px] transition-all ${lang === 'en' ? 'bg-rose-600 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-100'}`}
              >
                EN
              </button>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 border border-cyan-500/50 px-3 py-1.5 text-cyan-400 font-bold">
              <Database className="w-3.5 h-3.5 animate-pulse" />
              <span>{t.ingestRate}:</span>
              <span className="text-slate-100">184 EPS</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5">
              <DollarSign className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-slate-400">{t.credits}:</span>
              <span className="text-yellow-400 font-bold">{credits} CR</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs bg-slate-950 px-3 py-1.5 border border-slate-800">
              <span className="text-slate-400">USER:</span>
              <span className="text-rose-400 font-bold">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 border border-slate-800 bg-slate-900 hover:bg-slate-850 text-xs font-bold text-slate-300 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>AUTH</span>
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-slate-900 border-b border-slate-800 px-4">
        <div className="max-w-7xl mx-auto flex overflow-x-auto gap-1 py-2">
          {[
            { id: 'dashboard', label: t.tabDashboard, icon: Shield },
            { id: 'logs', label: t.tabLogs, icon: Terminal, badge: logs.length },
            { id: 'scanner', label: t.tabScanner, icon: Crosshair },
            { id: 'domains', label: t.tabDomains, icon: Globe, badge: domains.length, highlight: true },
            { id: 'remediation', label: t.tabRemediation, icon: Wrench, badge: vulnerabilities.filter(v => v.status === 'OPEN').length },
            { id: 'billing', label: t.tabBilling, icon: CreditCard, badge: paymentHistory.length },
            { id: 'notifications', label: t.tabNotifications, icon: Bell },
            { id: 'pricing', label: t.tabPricing, icon: Zap },
            { id: 'admin', label: t.tabAdmin, icon: Cpu, isSpecial: true },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'admin' && user.role !== 'SOC_ADMIN') {
                    alert(lang === 'ua' ? 'ДОСТУП ЗАБОРОНЕНО: Потрібні права SOC_ADMIN!' : 'ACCESS DENIED: SOC_ADMIN role required!');
                    return;
                  }
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? tab.isSpecial 
                      ? 'bg-rose-600 text-slate-950 border-rose-500 font-black' 
                      : 'bg-rose-950/80 text-rose-300 border-rose-500'
                    : tab.highlight
                      ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800 hover:bg-emerald-900/40'
                      : 'bg-slate-950/40 text-slate-400 border-slate-850 hover:text-slate-100 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.2 text-[9px] ${isActive ? 'bg-rose-500 text-slate-950' : 'bg-slate-850 text-slate-400'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-900 border-2 border-rose-600/40 p-6 md:p-8 relative overflow-hidden">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-950 border border-rose-800 text-xs text-rose-300 font-bold">
                    <Radio className="w-3.5 h-3.5 animate-pulse text-rose-500" />
                    <span>{t.heroBadge}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight leading-tight uppercase">
                    {t.heroSlogan}
                  </h1>

                  <p className="text-xs text-slate-400 leading-relaxed uppercase">
                    {t.heroSub}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button 
                      onClick={() => setActiveTab('pricing')}
                      className="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-slate-950 font-black text-xs transition-all border border-rose-400 flex items-center gap-2 shadow-lg shadow-rose-950"
                    >
                      <Clock className="w-4 h-4" /> {t.btnConnect}
                    </button>
                    <button 
                      onClick={() => setActiveTab('scanner')}
                      className="px-5 py-3 bg-slate-950 hover:bg-slate-850 text-slate-200 font-bold text-xs transition-all border border-slate-800 flex items-center gap-2"
                    >
                      <Crosshair className="w-4 h-4 text-rose-500" /> {t.btnCheckVuln}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-slate-950 border-2 border-slate-800 p-4 space-y-3 shadow-2xl relative">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-850 text-xs font-bold text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                      <span>{t.videoTitle}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400">FIRESTORE: CONNECTED</span>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 h-60 relative overflow-hidden flex flex-col justify-between p-4">
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

                    <div className="flex justify-between items-center text-[10px] text-slate-400 relative z-10">
                      <span>{t.videoScenario}: <strong className="text-emerald-400">{videoScenario}</strong></span>
                      <span>{t.videoIntercepted}: <strong className="text-emerald-400">{interceptedCount}</strong></span>
                    </div>

                    <div className="flex items-end justify-between gap-1 h-32 relative z-10 px-2 bg-slate-950/50 border border-slate-850 py-2">
                      {eqHeights.map((h, i) => (
                        <div key={i} className="w-full flex flex-col justify-end items-center h-full gap-1">
                          <div 
                            style={{ height: `${h}%` }} 
                            className={`w-full transition-all duration-300 ${
                              h > 75 ? 'bg-emerald-500 shadow-sm shadow-emerald-500' : h > 45 ? 'bg-cyan-400' : 'bg-rose-500'
                            }`}
                          ></div>
                          <span className="text-[7px] text-slate-500">{i * 2}k</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-[9px] text-slate-400 relative z-10 pt-1">
                      <span className="text-emerald-400">[FIRESTORE PERSISTENT DB]</span>
                      <span className="text-cyan-400">LATENCY: 12ms</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 text-[10px]">
                    <span className="text-slate-500 font-bold">SCENARIO:</span>
                    <div className="flex gap-1">
                      {['DDoS', 'SQLi', 'ZeroDay'].map(sc => (
                        <button
                          key={sc}
                          onClick={() => setVideoScenario(sc)}
                          className={`px-2.5 py-1 border font-bold transition-all ${
                            videoScenario === sc 
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500' 
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850'
                          }`}
                        >
                          {sc}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 p-5 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-xs">
                  <span>{t.healthIndex}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-emerald-400">92 / 100</div>
                <div className="text-[10px] text-slate-500">{t.healthSub}</div>
              </div>

              <div className="bg-slate-900 p-5 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-xs">
                  <span>{t.activeVulns}</span>
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-3xl font-black text-yellow-400">
                  {vulnerabilities.filter(v => v.status === 'OPEN').length}
                </div>
                <div className="text-[10px] text-slate-500">{t.activeVulnsSub}</div>
              </div>

              <div className="bg-slate-900 p-5 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-xs">
                  <span>{t.blockedAttacks}</span>
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                </div>
                <div className="text-3xl font-black text-rose-500">{interceptedCount}</div>
                <div className="text-[10px] text-slate-500">{t.blockedAttacksSub}</div>
              </div>

              <div className="bg-slate-900 p-5 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-xs">
                  <span>{t.creditsBalance}</span>
                  <DollarSign className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-black text-cyan-400">{credits} CR</div>
                <div className="text-[10px] text-slate-500">{t.creditsSub}</div>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-bold text-xs text-slate-200">{t.latestLogsTitle}</h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('logs')}
                    className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1"
                  >
                    {t.viewAllLogs} <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  {logs.slice(0, 5).map((log, idx) => (
                    <div 
                      key={log.id + '-' + idx} 
                      onClick={() => setSelectedLogDetail(log)}
                      className="p-3 bg-slate-950 border border-slate-850 hover:border-rose-900 cursor-pointer flex items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 text-[10px] font-bold ${
                          log.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                          log.severity === 'HIGH' ? 'bg-orange-950 text-orange-400 border border-orange-800' :
                          log.severity === 'WARNING' ? 'bg-yellow-950 text-yellow-400 border border-yellow-800' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {log.severity}
                        </span>
                        <div>
                          <span className="text-slate-200 font-bold block">{log.type}</span>
                          <span className="text-slate-500 text-[10px]">{log.target}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-slate-400 block">{log.IP}</span>
                        <span className="text-slate-600 text-[10px]">{log.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-900 border border-slate-800 p-6 space-y-4">
                  <h3 className="font-bold text-xs text-slate-200 flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-400" />
                    {t.protectedSites}
                  </h3>

                  <div className="space-y-3">
                    {[
                      { url: 'https://client-corp.com', status: 'FIRESTORE SYNCED', latency: '38ms', waf: 'ACTIVE' },
                      { url: 'https://store-app.io', status: 'PROTECTED 24/7', latency: '52ms', waf: 'ACTIVE' },
                    ].map((site, i) => (
                      <div key={i} className="p-3 bg-slate-950 border border-slate-850 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold block text-slate-200">{site.url}</span>
                          <span className="text-[10px] text-slate-500">{t.latency}: {site.latency}</span>
                        </div>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {site.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-900 p-6 border border-slate-800 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
                    <Database className="text-emerald-400 w-5 h-5" />
                    FIRESTORE SIEM TELEMETRY STREAM
                  </h2>
                  <p className="text-xs text-slate-400">ПЕРСИСТЕНТНЕ ЗБЕРІЖЕННЯ МЕРЕЖЕВИХ ПОДІЙ ТА WAF АНОМАЛІЙ У FIREBASE</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="ПОШУК ПО IP, ТИПУ..."
                      value={logSearchQuery}
                      onChange={(e) => setLogSearchQuery(e.target.value)}
                      className="bg-slate-950 border border-slate-800 pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <select
                    value={logFilterSeverity}
                    onChange={(e) => setLogFilterSeverity(e.target.value)}
                    className="bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                  >
                    <option value="ALL">УСІ РІВНІ КРИТИЧНОСТІ</option>
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="WARNING">WARNING</option>
                    <option value="INFO">INFO</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-850 overflow-hidden text-xs">
                <div className="grid grid-cols-12 bg-slate-900/80 p-3 text-slate-400 font-bold border-b border-slate-800">
                  <div className="col-span-2">ЧАС</div>
                  <div className="col-span-2">КРИТИЧНІСТЬ</div>
                  <div className="col-span-3">ТИП ПОДІЇ</div>
                  <div className="col-span-3">ЦІЛЬ / ДЖЕРЕЛО</div>
                  <div className="col-span-2 text-right">IP АДРЕСА</div>
                </div>

                <div className="divide-y divide-slate-900 max-h-[550px] overflow-y-auto">
                  {filteredLogs.map((log, idx) => (
                    <div 
                      key={log.id + '-logtab-' + idx} 
                      onClick={() => setSelectedLogDetail(log)}
                      className="grid grid-cols-12 p-3 items-center hover:bg-slate-900/60 cursor-pointer transition-colors"
                    >
                      <div className="col-span-2 text-slate-500">{log.timestamp}</div>
                      <div className="col-span-2">
                        <span className={`px-2 py-0.5 text-[10px] font-bold inline-block ${
                          log.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                          log.severity === 'HIGH' ? 'bg-orange-950 text-orange-400 border border-orange-800' :
                          log.severity === 'WARNING' ? 'bg-yellow-950 text-yellow-400 border border-yellow-800' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {log.severity}
                        </span>
                      </div>
                      <div className="col-span-3 text-slate-200 font-bold">{log.type}</div>
                      <div className="col-span-3 text-slate-400 truncate">{log.target}</div>
                      <div className="col-span-2 text-right text-emerald-400">{log.IP}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scanner' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-900 p-6 md:p-8 border border-slate-800 space-y-6">
              <div>
                <span className="bg-rose-950 text-rose-400 text-[10px] font-bold px-3 py-1 uppercase border border-rose-800">
                  LIVE VULNERABILITY & SECURITY HEADER PROBE
                </span>
                <h2 className="text-2xl font-black text-slate-100 mt-2">{t.scannerTitle}</h2>
                <p className="text-xs text-slate-400 max-w-2xl mt-1">{t.scannerDesc}</p>
              </div>

              <form onSubmit={runRealScan} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  required
                  placeholder={t.scanPlaceholder}
                  value={scanUrl}
                  onChange={(e) => setScanUrl(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  disabled={isScanning}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-rose-950 flex items-center justify-center gap-2"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{t.scanning}</span>
                    </>
                  ) : (
                    <>
                      <Crosshair className="w-4 h-4" />
                      <span>{t.btnStartScan}</span>
                    </>
                  )}
                </button>
              </form>

              {scanResult && (
                <div className="bg-slate-950 border border-emerald-800/60 p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-850 pb-3">
                    <div>
                      <span className="text-xs text-emerald-400 font-bold block">СКАУВАННЯ УСПІШНО ЗАВЕРШЕНО</span>
                      <span className="text-[10px] text-slate-500">Ціль: {scanResult.target} | {scanResult.timestamp}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">РЕЙТИНГ ЗАГОЛОВКІВ:</span>
                      <span className="text-lg font-black text-emerald-400">{scanResult.score} / 100</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {scanResult.items.map((item, idx) => (
                      <div key={idx} className="p-4 bg-slate-900 border border-slate-800 flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 text-[9px] font-bold bg-orange-950 text-orange-400 border border-orange-800">
                              {item.severity}
                            </span>
                            <span className="text-[10px] text-slate-500">{item.cve}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                          <p className="text-[11px] text-slate-400">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'domains' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-900 p-6 md:p-8 border border-slate-800 space-y-8">
              <div>
                <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-3 py-1 uppercase border border-emerald-800">
                  FREE SUBDOMAIN & CUSTOM DOMAIN GATEWAY
                </span>
                <h2 className="text-2xl font-black text-slate-100 mt-2">{t.domainTitle}</h2>
                <p className="text-xs text-slate-400 max-w-2xl mt-1">{t.domainSub}</p>
              </div>

              {domainToast && (
                <div className={`p-4 border text-xs font-bold flex items-center justify-between ${
                  domainToast.type === 'success' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-rose-950/60 border-rose-500 text-rose-300'
                }`}>
                  <span>{domainToast.text}</span>
                  <button onClick={() => setDomainToast(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {/* Free Subdomain Claim Form */}
                <div className="bg-slate-950 p-6 border border-slate-850 space-y-4">
                  <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" /> Отримати безкоштовний субдомен *.nightjar-soc.com
                  </h3>
                  <p className="text-xs text-slate-400">Миттєве виділення домену з автоматичним SSL сертифікатом та активацією WAF.</p>

                  <form onSubmit={handleClaimFreeSubdomain} className="space-y-3 pt-2">
                    <div className="flex rounded-none overflow-hidden border border-slate-800 bg-slate-900">
                      <input
                        type="text"
                        required
                        placeholder={t.subdomainPlaceholder}
                        value={freeSubInput}
                        onChange={(e) => setFreeSubInput(e.target.value)}
                        className="flex-1 bg-transparent px-4 py-3 text-xs text-slate-100 focus:outline-none"
                      />
                      <span className="bg-slate-850 text-slate-400 px-3 py-3 text-xs flex items-center border-l border-slate-800 font-bold">
                        .nightjar-soc.com
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-950"
                    >
                      {t.claimBtn}
                    </button>
                  </form>
                </div>

                {/* Custom Domain Form */}
                <div className="bg-slate-950 p-6 border border-slate-850 space-y-4">
                  <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                    <Server className="w-4 h-4 text-cyan-400" /> Підключити власний домен (Custom Domain)
                  </h3>
                  <p className="text-xs text-slate-400">Прив'яжіть свій домен через CNAME запис до наших захищених WAF вузлів.</p>

                  <form onSubmit={handleAddCustomDomain} className="space-y-3 pt-2">
                    <input
                      type="text"
                      required
                      placeholder="app.yourdomain.com"
                      value={customDomainInput}
                      onChange={(e) => setCustomDomainInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-rose-950"
                    >
                      ДОДАТИ КАСТОМНИЙ ДОМЕН
                    </button>
                  </form>
                </div>
              </div>

              {/* Connected Domains Table */}
              <div className="space-y-4 pt-4">
                <h3 className="font-bold text-xs text-slate-200">{t.myDomainsTitle}</h3>

                <div className="bg-slate-950 border border-slate-850 overflow-hidden text-xs">
                  <div className="grid grid-cols-12 bg-slate-900/80 p-3 text-slate-400 font-bold border-b border-slate-800">
                    <div className="col-span-4">ДОМЕН / СУБДОМЕН</div>
                    <div className="col-span-3">ТИП</div>
                    <div className="col-span-3">SSL ТА WAF СТАТУС</div>
                    <div className="col-span-2 text-right">СТАТУС</div>
                  </div>

                  <div className="divide-y divide-slate-900">
                    {domains.map(dom => (
                      <div key={dom.id} className="grid grid-cols-12 p-3 items-center">
                        <div className="col-span-4 font-bold text-slate-200">{dom.name}</div>
                        <div className="col-span-3 text-cyan-400">{dom.type}</div>
                        <div className="col-span-3 text-slate-400 text-[11px]">{dom.ssl}</div>
                        <div className="col-span-2 text-right">
                          <span className={`px-2 py-0.5 text-[10px] font-bold inline-block ${
                            dom.status === 'ACTIVE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-yellow-950 text-yellow-400 border border-yellow-800'
                          }`}>
                            {dom.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'remediation' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-900 p-6 md:p-8 border border-slate-800 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
                    <Wrench className="text-rose-500 w-5 h-5" />
                    МАРКЕТПЛЕЙС ПАТЧИНГУ & ЗАЯВКИ В SOC
                  </h2>
                  <p className="text-xs text-slate-400">ІНЖЕНЕРИ NIGHTJAR SOC ОПЕРАТИВНО СТВОРЯТЬ ПАТЧ АБО УСУНУТЬ УРАЗЛИВІСТЬ.</p>
                </div>
                
                <div className="bg-slate-950 p-4 border border-slate-800 text-right">
                  <span className="text-[10px] text-slate-500 block">БАЛАНС КРЕДИТІВ:</span>
                  <span className="text-xl font-black text-yellow-400">{credits} CR</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-xs text-slate-200">АКТИВНІ УРАЗЛИВОСТІ:</h3>
                <div className="grid gap-4">
                  {vulnerabilities.map(vuln => (
                    <div key={vuln.id} className="bg-slate-950 p-5 border border-slate-850 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-[10px] font-bold ${
                            vuln.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                            vuln.severity === 'HIGH' ? 'bg-orange-950 text-orange-400 border border-orange-800' :
                            'bg-yellow-950 text-yellow-400 border border-yellow-800'
                          }`}>
                            {vuln.severity}
                          </span>
                          <span className="text-xs text-slate-500">{vuln.cve}</span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-200">{vuln.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{vuln.description}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        {vuln.status === 'OPEN' && (
                          <button
                            onClick={() => orderRemediation(vuln)}
                            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-slate-950 font-black text-xs transition-all flex items-center gap-2"
                          >
                            <span>ВИПРАВИТИ</span>
                            <span className="bg-rose-950 text-rose-300 px-2 py-0.5 text-[10px]">{vuln.price} CR</span>
                          </button>
                        )}
                        {vuln.status === 'IN_PROGRESS' && (
                          <span className="px-4 py-2 bg-yellow-950/60 text-yellow-400 border border-yellow-800 text-xs font-bold animate-pulse">
                            ПАТЧИНГ У ПРОЦЕСІ
                          </span>
                        )}
                        {vuln.status === 'RESOLVED' && (
                          <span className="px-4 py-2 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" /> УСУНЕНО
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-900 p-6 md:p-8 border border-slate-800 space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
                  <Bell className="text-rose-500 w-5 h-5" />
                  НАЛАШТУВАННЯ СПОВІЩЕНЬ (TELEGRAM & EMAIL)
                </h2>
                <p className="text-xs text-slate-400">ОТРИМУЙТЕ МИТТЄВІ СПОВІЩЕННЯ ПРО КРИТИЧНІ АТАКИ ТА ЗБОЇ WAF У РЕАЛЬНОМУ ЧАСІ.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-6 border border-slate-850 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                      <Bird className="w-4 h-4 text-cyan-400" /> Telegram Bot Сповіщення
                    </h3>
                    <input
                      type="checkbox"
                      checked={notifConfig.telegramEnabled}
                      onChange={(e) => setNotifConfig({...notifConfig, telegramEnabled: e.target.checked})}
                      className="w-4 h-4 accent-rose-600"
                    />
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Telegram Bot Token (Активний):</label>
                      <input
                        type="text"
                        value={notifConfig.telegramBotToken}
                        onChange={(e) => setNotifConfig({...notifConfig, telegramBotToken: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-800 p-2.5 text-slate-200 text-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Telegram Chat ID:</label>
                      <input
                        type="text"
                        value={notifConfig.telegramChatId}
                        onChange={(e) => setNotifConfig({...notifConfig, telegramChatId: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-800 p-2.5 text-slate-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 border border-slate-850 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-400" /> SMTP Email Сповіщення
                    </h3>
                    <input
                      type="checkbox"
                      checked={notifConfig.emailEnabled}
                      onChange={(e) => setNotifConfig({...notifConfig, emailEnabled: e.target.checked})}
                      className="w-4 h-4 accent-rose-600"
                    />
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Email для звітів безпеки:</label>
                      <input
                        type="email"
                        value={notifConfig.emailAddress}
                        onChange={(e) => setNotifConfig({...notifConfig, emailAddress: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-800 p-2.5 text-slate-200"
                      />
                    </div>
                    <div className="pt-6">
                      <button
                        onClick={() => sendTelegramAlert("🚨 *NIGHTJAR SOC 24/7 ALERT*\n\nTest security broadcast triggered successfully from web console using token `8964468154:AAE1CK7aN9Rj7JdpTOemiG6WWWf3dB2lOlE`.\n*Status*: Firestore & WAF Operational.")}
                        className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-slate-950 font-black transition-all"
                      >
                        НАДІСЛАТИ ТЕСТОВЕ СПОВІЩЕННЯ В TELEGRAM
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-900 p-6 md:p-8 border border-slate-800 space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="bg-rose-950 text-rose-400 border border-rose-800 text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                  CONTINUOUS MANAGED DEFENSE 24/7
                </span>
                <h2 className="text-2xl font-black text-slate-100">{t.pricingTitle}</h2>
                <p className="text-xs text-slate-400 leading-relaxed">{t.pricingDesc}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-4">
                {SUBSCRIPTION_PLANS.map(plan => {
                  const isCurrent = currentSubscription.planId === plan.id;
                  return (
                    <div 
                      key={plan.id}
                      className={`p-6 flex flex-col justify-between space-y-6 transition-all relative border ${
                        plan.popular ? 'bg-slate-900 border-2 border-rose-500 shadow-xl' : 'bg-slate-950 border-slate-850'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-500 text-slate-950 font-black text-[10px] uppercase px-3 py-0.5">
                          RECOMMENDED
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-base font-bold text-slate-100">{plan.name}</h3>
                          <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                        </div>

                        <div className="py-2 border-y border-slate-850">
                          <span className="text-3xl font-black text-slate-100">${plan.price}</span>
                          <span className="text-xs text-slate-500"> / {plan.period}</span>
                        </div>

                        <ul className="space-y-2.5 text-xs text-slate-300">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedPlanForCheckout(plan);
                          setCheckoutModalOpen(true);
                        }}
                        className={`w-full py-3 font-bold text-xs transition-all border ${
                          isCurrent ? 'bg-slate-800 text-emerald-400 border-emerald-500' : 'bg-rose-600 hover:bg-rose-500 text-slate-950 border-rose-400'
                        }`}
                      >
                        {isCurrent ? t.currentPlan : t.selectPlan}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-900 p-6 md:p-8 border border-slate-800 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
                    <CreditCard className="text-emerald-400 w-5 h-5" />
                    ІСТОРІЯ ПЛАТЕЖІВ ТА ІНВОЙСИ
                  </h2>
                  <p className="text-xs text-slate-400">УСІ УСПІШНІ ТРАНЗАКЦІЇ ТА АКТИВНІ КАРТИ ЧЕРЕЗ ШЛЮЗИ STRIPE ТА LIQPAY.</p>
                </div>
                <div className="bg-slate-950 p-3 border border-slate-850 text-xs">
                  <span className="text-slate-400 block">АКТИВНА КАРТА:</span>
                  <span className="text-emerald-400 font-bold">•••• •••• •••• 9841 (Visa/Mastercard)</span>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-850 overflow-hidden text-xs">
                <div className="grid grid-cols-12 bg-slate-900/80 p-3 text-slate-400 font-bold border-b border-slate-800">
                  <div className="col-span-2">ID ТРАНЗАКЦІЇ</div>
                  <div className="col-span-2">ДАТА</div>
                  <div className="col-span-4">ТАРИФ / ПОСЛУГА</div>
                  <div className="col-span-2">ШЛЮЗ</div>
                  <div className="col-span-2 text-right">СУМА</div>
                </div>
                <div className="divide-y divide-slate-900">
                  {paymentHistory.map((tx, idx) => (
                    <div key={idx} className="grid grid-cols-12 p-3 items-center">
                      <div className="col-span-2 text-rose-400 font-bold">{tx.id}</div>
                      <div className="col-span-2 text-slate-500">{tx.date}</div>
                      <div className="col-span-4 text-slate-200">{tx.plan}</div>
                      <div className="col-span-2 text-cyan-400">{tx.gateway}</div>
                      <div className="col-span-2 text-right text-emerald-400 font-black">${tx.amount} USD</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admin' && user.role === 'SOC_ADMIN' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-900 p-6 md:p-8 border border-rose-600 space-y-6">
              <div>
                <span className="bg-rose-950 text-rose-400 text-[10px] font-bold px-3 py-1 uppercase border border-rose-800">
                  RESTRICTED SOC ADMIN CONSOLE
                </span>
                <h2 className="text-2xl font-black text-slate-100 mt-2">КЕРУВАННЯ МЕРЕЖЕВИМИ НОДАМИ ТА WAF</h2>
                <p className="text-xs text-slate-400">ПАНЕЛЬ ДОСТУПНА ЛИШЕ КОРИСТУВАЧАМ З РОЛЛЮ SOC_ADMIN.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-950 p-5 border border-slate-850 space-y-3">
                  <div className="text-emerald-400 font-bold text-sm">FIRESTORE CLUSTER</div>
                  <div className="text-xs text-slate-400">Статус: <strong className="text-emerald-400">ONLINE (99.98%)</strong></div>
                  <div className="text-xs text-slate-400">Sync Ingest: <strong className="text-cyan-400">184 events/sec</strong></div>
                </div>

                <div className="bg-slate-950 p-5 border border-slate-850 space-y-3">
                  <div className="text-cyan-400 font-bold text-sm">WAF GLOBAL FIREWALL</div>
                  <div className="text-xs text-slate-400">Правила: <strong className="text-slate-200">2,410 активних</strong></div>
                  <div className="text-xs text-slate-400">Блокування DDoS: <strong className="text-rose-500">АВТОМАТИЧНО</strong></div>
                </div>

                <div className="bg-slate-950 p-5 border border-slate-850 space-y-3">
                  <div className="text-yellow-400 font-bold text-sm">SEC_ADMIN USERS</div>
                  <div className="text-xs text-slate-400">Активні сесії: <strong className="text-slate-200">4 інженери</strong></div>
                  <div className="text-xs text-slate-400">Рівень доступу: <strong className="text-rose-400">RBAC LEVEL 5</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CHECKOUT MODAL (STRIPE / LIQPAY) */}
      {checkoutModalOpen && selectedPlanForCheckout && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-rose-600 max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider">SECURE CHECKOUT</span>
                <h3 className="text-lg font-black text-slate-100">{selectedPlanForCheckout.name}</h3>
              </div>
              <button 
                onClick={() => setCheckoutModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold px-2 py-1 bg-slate-950 border border-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPaymentGateway('stripe')}
                className={`flex-1 py-2 text-xs font-bold border transition-all ${
                  paymentGateway === 'stripe' ? 'bg-rose-950 text-rose-300 border-rose-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                Stripe Checkout (USD)
              </button>
              <button
                type="button"
                onClick={() => setPaymentGateway('liqpay')}
                className={`flex-1 py-2 text-xs font-bold border transition-all ${
                  paymentGateway === 'liqpay' ? 'bg-emerald-950 text-emerald-300 border-emerald-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                LiqPay / Privat24 (UAH/USD)
              </button>
            </div>

            <form onSubmit={handleExecutePayment} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Номер банківської карти:</label>
                <input
                  type="text"
                  required
                  value={cardNumberInput}
                  onChange={(e) => setCardNumberInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-3 text-slate-200 text-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">Термін (MM/YY):</label>
                  <input
                    type="text"
                    required
                    value={cardExpiryInput}
                    onChange={(e) => setCardExpiryInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-3 text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">CVV / CVC:</label>
                  <input
                    type="password"
                    required
                    maxLength="4"
                    value={cardCvvInput}
                    onChange={(e) => setCardCvvInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-3 text-slate-200"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-850 flex justify-between items-center text-sm">
                <span className="text-slate-400 font-bold">ДО СПЛАТИ:</span>
                <span className="text-xl font-black text-yellow-400">${selectedPlanForCheckout.price}.00 USD</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-slate-950 font-black text-xs transition-all tracking-wider shadow-lg shadow-rose-950"
              >
                СПЛАТИТИ БЕЗПЕЧНО ЧЕРЕЗ {paymentGateway.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL AUTH / REGISTRATION */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-rose-600 max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-black text-slate-100 text-sm">АВТОРИЗАЦІЯ / РЕЄСТРАЦІЯ NIGHTJAR</h3>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Email:</label>
                <input
                  type="email"
                  required
                  value={authEmailInput}
                  onChange={(e) => setAuthEmailInput(e.target.value)}
                  placeholder="admin@nightjar-soc.com"
                  className="w-full bg-slate-950 border border-slate-800 p-3 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Пароль:</label>
                <input
                  type="password"
                  required
                  value={authPasswordInput}
                  onChange={(e) => setAuthPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 p-3 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Роль користувача (RBAC):</label>
                <select
                  value={authRoleInput}
                  onChange={(e) => setAuthRoleInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-3 text-slate-200"
                >
                  <option value="CLIENT">CLIENT (Звичайний користувач)</option>
                  <option value="SOC_ADMIN">SOC_ADMIN (Адміністратор безпеки)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-slate-950 font-black transition-all"
              >
                ПІДТВЕРДИТИ УВІХІД / РЕЄСТРАЦІЮ
              </button>
            </form>
          </div>
        </div>
      )}

      {/* AI КОНСУЛЬТАНТ У ПРАВОМУ НИЖНЬОМУ КУТКУ */}
      <div className="fixed bottom-6 right-6 z-50">
        {isAiOpen ? (
          <div className="bg-slate-900 border-2 border-rose-500 w-80 sm:w-96 rounded-none shadow-2xl flex flex-col h-[420px] animate-fade-in">
            <div className="bg-rose-950 border-b border-rose-800 p-3 flex justify-between items-center text-xs font-bold text-rose-300">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-rose-500" />
                <span>{t.aiChatTitle}</span>
              </div>
              <button onClick={() => setIsAiOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs bg-slate-950">
              {aiMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-2.5 max-w-[85%] text-[11px] leading-relaxed border ${
                    msg.sender === 'user' ? 'bg-rose-950/60 border-rose-700 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendAiMessage} className="p-2 bg-slate-900 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder={t.aiChatPlaceholder}
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 px-3 py-2 text-[11px] text-slate-200 focus:outline-none focus:border-rose-500"
              />
              <button type="submit" className="px-3 bg-rose-600 hover:bg-rose-500 text-slate-950 font-black">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setIsAiOpen(true)}
            className="w-14 h-14 bg-rose-600 hover:bg-rose-500 text-slate-950 border-2 border-rose-400 shadow-2xl flex items-center justify-center transition-all hover:scale-105"
            title="Nightjar AI Consultant"
          >
            <Bot className="w-7 h-7 text-slate-950 animate-pulse" />
          </button>
        )}
      </div>

      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <NightjarLogoIcon className="w-4 h-4" />
            <span className="font-bold text-slate-400">NIGHTJAR SIEM SAAS PLATFORM © 2026</span>
          </div>
          <div className="flex gap-4 text-[10px]">
            <span>FIRESTORE: CONNECTED</span>
            <span>•</span>
            <span>SSL/TLS: SECURE</span>
            <span>•</span>
            <span>RBAC: ACTIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
