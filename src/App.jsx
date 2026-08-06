import React, { useState, useEffect } from 'react';
import { 
  Shield, ShieldAlert, ShieldCheck, Terminal, Activity, AlertTriangle, 
  Lock, Unlock, Zap, Search, Filter, Server, Cpu, Globe, DollarSign, 
  FileText, UserCheck, Users, Sliders, CheckCircle2, XCircle, Play, 
  RefreshCw, Radio, Crosshair, Wrench, ArrowUpRight, Eye, LogOut,
  ChevronRight, Bell, Bird, CreditCard, Clock, Check, Pause, Maximize2,
  MessageSquare, Send, Bot
} from 'lucide-react';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// ========== ПЕРЕКЛАДИ ==========
const TRANSLATIONS = {
  ua: {
    systemTag: "СИСТЕМА БЕЗПЕРЕРВНОГО МОНІТОРИНГУ 24/7",
    socAdmin: "SOC АДМІН",
    client: "КЛІЄНТ",
    tabDashboard: "ОБЗОР БЕЗПЕРЕКИ",
    tabLogs: "SIEM ЛЕНТА",
    tabScanner: "СКАНЕР",
    tabRemediation: "ПАТЧИНГ",
    tabPricing: "ТАРИФИ",
    tabAdmin: "КОНСОЛЬ",
    heroSlogan: "«Ваш спокій -- це наша турбота. Бережіть свої сили та нерви. Ми ніколи не спимо»",
    btnConnect: "ПІДКЛЮЧИТИ ЗАХИСТ",
    btnCheckVuln: "ПЕРЕВІРИТИ УРАЗЛИВОСТІ",
  },
  en: {
    systemTag: "24/7 MONITORING",
    socAdmin: "SOC ADMIN",
    client: "CLIENT",
    tabDashboard: "SECURITY OVERVIEW",
    tabLogs: "SIEM STREAM",
    tabScanner: "SCANNER",
    tabRemediation: "PATCHING",
    tabPricing: "PRICING",
    tabAdmin: "CONSOLE",
    heroSlogan: "Your peace of mind is our priority. We never sleep",
    btnConnect: "ENABLE PROTECTION",
    btnCheckVuln: "SCAN VULNERABILITIES",
  }
};

export default function App() {
  const [lang, setLang] = useState('ua');
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState('SOC_ADMIN');
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // ===== ДАНІ ДЛЯ ДАШБОРДА =====
  const [logs, setLogs] = useState([
    { id: 'LOG-001', timestamp: '10:14:02', type: 'SQLi Attempt', target: 'https://client-corp.com', severity: 'CRITICAL', IP: '185.220.101.4' },
    { id: 'LOG-002', timestamp: '10:13:55', type: 'Health Check', target: 'https://client-corp.com', severity: 'INFO', IP: '10.0.4.12' },
    { id: 'LOG-003', timestamp: '10:13:12', type: 'Brute Force', target: 'https://admin.client-corp.com', severity: 'WARNING', IP: '45.154.255.82' },
  ]);
  const [vulnerabilities, setVulnerabilities] = useState([
    { id: 'VULN-101', title: 'SQL Injection', severity: 'CRITICAL', status: 'OPEN', price: 450 },
    { id: 'VULN-102', title: 'Outdated SSL/TLS', severity: 'HIGH', status: 'OPEN', price: 280 },
  ]);
  const [credits, setCredits] = useState(1200);
  const [interceptedCount, setInterceptedCount] = useState(1482);

  // ===== АВТЕНТИФІКАЦІЯ =====
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const loggedUser = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", loggedUser.uid));
      const userData = userDoc.data();
      if (userData && userData.role === 'admin') {
        setUser({ ...loggedUser, role: 'admin' });
        setViewMode('SOC_ADMIN');
        alert('Вітаємо, Адміністраторе!');
      } else {
        setUser({ ...loggedUser, role: 'client' });
        setViewMode('CLIENT');
        alert('Ви увійшли як клієнт.');
      }
      setIsLoginOpen(false);
    } catch (error) {
      alert('Помилка входу: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setViewMode('SOC_ADMIN');
    alert('Ви вийшли з системи.');
  };

  // ===== СИМУЛЯЦІЯ НОВИХ ЛОГІВ =====
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
        timestamp: new Date().toTimeString().split(' ')[0],
        type: ['SQLi Attempt', 'XSS Attack', 'DDoS', 'Brute Force'][Math.floor(Math.random() * 4)],
        target: 'https://client-corp.com',
        severity: ['CRITICAL', 'HIGH', 'WARNING', 'INFO'][Math.floor(Math.random() * 4)],
        IP: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      };
      setLogs(prev => [newLog, ...prev.slice(0, 49)]);
      setInterceptedCount(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ===== ВІЗУАЛЬНА ЧАСТИНА =====
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono">
      {/* ХЕДЕР */}
      <header className="border-b border-rose-900/40 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <Shield className="w-6 h-6 text-rose-500" />
            <span className="font-black text-lg">NIGHTJAR <span className="text-rose-500">SIEM</span></span>
            <span className="text-[9px] text-slate-400">[{t.systemTag}]</span>
          </div>
          <div className="flex items-center gap-3">
            {!user ? (
              <button onClick={() => setIsLoginOpen(true)} className="px-3 py-1.5 border border-slate-700 text-xs font-bold text-cyan-300 hover:bg-slate-900">
                УВІЙТИ
              </button>
            ) : (
              <button onClick={handleLogout} className="px-3 py-1.5 border border-rose-700 text-xs font-bold text-rose-300 hover:bg-rose-950">
                ВИЙТИ
              </button>
            )}
            <button
              onClick={() => setViewMode(prev => prev === 'SOC_ADMIN' ? 'CLIENT' : 'SOC_ADMIN')}
              className={`px-3 py-1.5 border text-xs font-bold flex items-center gap-2 ${
                viewMode === 'SOC_ADMIN' ? 'bg-rose-950 border-rose-600 text-rose-300' : 'bg-slate-900 border-slate-700 text-cyan-300'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{viewMode === 'SOC_ADMIN' ? t.socAdmin : t.client}</span>
            </button>
          </div>
        </div>
      </header>

      {/* МОДАЛЬНЕ ВІКНО ВХОДУ */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-slate-800 p-8 max-w-md w-full space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-100">ВХІД ДО SOC</h3>
              <button onClick={() => setIsLoginOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-rose-500"
                required
              />
              <input
                type="password"
                placeholder="Пароль"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-rose-500"
                required
              />
              <button type="submit" className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-slate-950 font-black text-sm">
                УВІЙТИ
              </button>
            </form>
          </div>
        </div>
      )}

      {/* НАВІГАЦІЯ */}
      <nav className="bg-slate-900 border-b border-slate-800 px-4">
        <div className="max-w-7xl mx-auto flex overflow-x-auto gap-1 py-2">
          {[
            { id: 'dashboard', label: t.tabDashboard, icon: Shield },
            { id: 'logs', label: t.tabLogs, icon: Terminal, badge: logs.length },
            { id: 'scanner', label: t.tabScanner, icon: Crosshair },
            { id: 'remediation', label: t.tabRemediation, icon: Wrench, badge: vulnerabilities.filter(v => v.status === 'OPEN').length },
            { id: 'pricing', label: t.tabPricing, icon: CreditCard },
            { id: 'admin', label: t.tabAdmin, icon: Cpu },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border ${
                  activeTab === tab.id ? 'bg-rose-950/80 text-rose-300 border-rose-500' : 'bg-slate-950/40 text-slate-400 border-slate-850 hover:text-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.2 text-[9px] ${activeTab === tab.id ? 'bg-rose-500 text-slate-950' : 'bg-slate-850 text-slate-400'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ОСНОВНИЙ КОНТЕНТ */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border-2 border-rose-600/40 p-6 md:p-8">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-100">{t.heroSlogan}</h1>
              <p className="text-xs text-slate-400 mt-4">Круглосуточний комплекс WAF & SIEM.</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <button onClick={() => setActiveTab('pricing')} className="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-slate-950 font-black text-xs">
                  {t.btnConnect}
                </button>
                <button onClick={() => setActiveTab('scanner')} className="px-5 py-3 bg-slate-950 hover:bg-slate-850 text-slate-200 font-bold text-xs border border-slate-800">
                  {t.btnCheckVuln}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 p-4 border border-slate-800">
                <div className="text-2xl font-black text-emerald-400">88/100</div>
                <div className="text-xs text-slate-400">Індекс здоров'я</div>
              </div>
              <div className="bg-slate-900 p-4 border border-slate-800">
                <div className="text-2xl font-black text-yellow-400">{vulnerabilities.filter(v => v.status === 'OPEN').length}</div>
                <div className="text-xs text-slate-400">Активних вразливостей</div>
              </div>
              <div className="bg-slate-900 p-4 border border-slate-800">
                <div className="text-2xl font-black text-rose-500">{interceptedCount}</div>
                <div className="text-xs text-slate-400">Заблоковано атак</div>
              </div>
              <div className="bg-slate-900 p-4 border border-slate-800">
                <div className="text-2xl font-black text-cyan-400">{credits} CR</div>
                <div className="text-xs text-slate-400">Баланс захисту</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-slate-900 p-6 border border-slate-800">
            <h2 className="text-lg font-black flex items-center gap-2"><Terminal className="text-rose-500" /> SIEM ЛЕНТА</h2>
            <div className="mt-4 space-y-2 max-h-[500px] overflow-y-auto">
              {logs.map(log => (
                <div key={log.id} className="p-3 bg-slate-950 border border-slate-850 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 font-bold ${log.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-400' : 'bg-slate-800 text-slate-400'}`}>
                      {log.severity}
                    </span>
                    <span className="text-slate-200">{log.type}</span>
                    <span className="text-slate-500">{log.target}</span>
                  </div>
                  <span className="text-rose-400">{log.IP}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'scanner' && (
          <div className="bg-slate-900 p-6 border border-slate-800">
            <h2 className="text-lg font-black flex items-center gap-2"><Crosshair className="text-rose-500" /> СКАНЕР УРАЗЛИВОСТЕЙ</h2>
            <p className="text-xs text-slate-400 mt-2">Введіть URL для сканування:</p>
            <div className="mt-4 flex gap-2">
              <input type="url" placeholder="https://example.com" className="flex-1 bg-slate-950 border border-slate-800 px-4 py-2 text-sm text-slate-200" />
              <button className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-slate-950 font-bold text-xs">СКАНУВАТИ</button>
            </div>
          </div>
        )}

        {activeTab === 'remediation' && (
          <div className="bg-slate-900 p-6 border border-slate-800">
            <h2 className="text-lg font-black flex items-center gap-2"><Wrench className="text-rose-500" /> СИСТЕМА ПАТЧИНГУ</h2>
            <div className="mt-4 space-y-2">
              {vulnerabilities.filter(v => v.status === 'OPEN').map(v => (
                <div key={v.id} className="p-3 bg-slate-950 border border-slate-850 flex justify-between items-center">
                  <div>
                    <span className="font-bold">{v.title}</span>
                    <span className={`ml-2 px-2 py-0.5 text-xs ${v.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-400' : 'bg-yellow-950 text-yellow-400'}`}>
                      {v.severity}
                    </span>
                  </div>
                  <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs">
                    ВИПРАВИТИ ЗА {v.price} CR
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="bg-slate-900 p-6 border border-slate-800">
            <h2 className="text-lg font-black flex items-center gap-2"><CreditCard className="text-rose-500" /> ТАРИФИ 24/7</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Starter', price: '$199/міс', features: ['WAF', 'Базові логи', 'Повідомлення'] },
                { name: 'Pro', price: '$599/міс', features: ['SIEM', 'Сканер', 'Пріоритетний патчинг'], popular: true },
                { name: 'Enterprise', price: '$1499/міс', features: ['SOC команда', '15 хв SLA', 'Персональний менеджер'] },
              ].map(plan => (
                <div key={plan.name} className={`p-4 border ${plan.popular ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800'}`}>
                  <h3 className="font-bold">{plan.name}</h3>
                  <p className="text-xl font-black text-rose-400">{plan.price}</p>
                  <ul className="mt-2 text-xs space-y-1 text-slate-400">
                    {plan.features.map(f => <li key={f}>✓ {f}</li>)}
                  </ul>
                  <button className="mt-4 w-full py-2 bg-rose-600 hover:bg-rose-500 text-slate-950 font-bold text-xs">
                    ПІДКЛЮЧИТИ
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="bg-slate-900 p-6 border-2 border-rose-600/40">
            <h2 className="text-lg font-black flex items-center gap-2"><Cpu className="text-rose-500" /> SOC КОНСОЛЬ</h2>
            <p className="text-xs text-slate-400 mt-2">Панель управління оператора безпеки.</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 border border-slate-800">
                <h4 className="font-bold text-xs text-rose-400">БЛОКУВАННЯ IP</h4>
                <div className="mt-2 flex gap-2">
                  <input type="text" placeholder="IP адреса" className="flex-1 bg-slate-900 border border-slate-800 px-2 py-1 text-xs" />
                  <button className="px-2 py-1 bg-rose-600 text-slate-950 font-bold text-xs">БЛОК</button>
                </div>
                <div className="mt-2 text-xs text-slate-400">Заблоковані: 185.220.101.4, 45.154.255.82</div>
              </div>
              <div className="bg-slate-950 p-4 border border-slate-800">
                <h4 className="font-bold text-xs text-emerald-400">СТАТУС</h4>
                <div className="mt-2 text-xs text-slate-400">🟢 SOC активний</div>
                <div className="text-xs text-slate-400">🟢 WAF працює</div>
                <div className="text-xs text-slate-400">🟢 Сканер у режимі очікування</div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex justify-between">
          <span>NIGHTJAR SIEM SaaS © 2026</span>
          <span>CONTINUOUS PROTECTION 24/7</span>
        </div>
      </footer>
    </div>
  );
}
