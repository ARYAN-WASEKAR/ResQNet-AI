import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, User, Lock, Mail, ArrowRight, Shield, Zap } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Tabs from '../components/ui/Tabs';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [mode, setMode] = useState('victim'); // 'victim' or 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAsVictim, loginAsAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (mode === 'victim') {
        loginAsVictim({ email: email || 'aryan@example.com' });
        navigate('/victim');
      } else {
        loginAsAdmin({ email: email || 'commander@resqnet.gov.in' });
        navigate('/admin');
      }
      setLoading(false);
    }, 400);
  };

  const handleQuickDemo = (role) => {
    if (role === 'victim') {
      loginAsVictim({ name: 'Aryan Wasekar (Demo Victim)', email: 'victim@resqnet.ai' });
      navigate('/victim');
    } else {
      loginAsAdmin({ name: 'Commander Rajiv Nair (NDRF Lead)', email: 'commander@resqnet.gov.in' });
      navigate('/admin');
    }
  };

  const tabs = [
    { id: 'victim', label: 'Victim Portal', icon: User },
    { id: 'admin', label: 'Rescue / Command', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
        {/* Ambient background glow */}
        <div className="absolute w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center mx-auto shadow-xl shadow-rose-600/30 border border-rose-400/40">
              <ShieldAlert className="w-7 h-7 text-white animate-pulse" />
            </div>
            <h1 className="text-2xl font-black text-white font-mono tracking-tight">
              Emergency Access Portal
            </h1>
            <p className="text-xs text-slate-400">
              Select your role to enter the ResQNet AI disaster coordination network
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <Tabs tabs={tabs} activeTab={mode} onChange={setMode} />

          {/* Form Card */}
          <Card variant="glass" className="p-6 space-y-5 border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <span className="font-bold text-slate-300">
                {mode === 'victim' ? '👤 Citizen / Victim Mode' : '🛡️ Disaster Command Mode'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-rose-400 border border-slate-700">
                Mock Auth Layer
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Email / Incident Identifier"
                type="email"
                icon={Mail}
                placeholder={mode === 'victim' ? 'victim@resqnet.ai' : 'commander@resqnet.gov.in'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password / Security PIN"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                variant={mode === 'victim' ? 'emergency' : 'primary'}
                size="lg"
                loading={loading}
                className="w-full text-sm font-bold mt-2"
                icon={ArrowRight}
              >
                {mode === 'victim' ? 'Enter Victim Dashboard' : 'Enter Command Center'}
              </Button>
            </form>

            {/* Quick Demo Bypass Buttons */}
            <div className="pt-4 border-t border-slate-800 space-y-2 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                ⚡ 1-Click Demo Quick Access
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('victim')}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700 cursor-pointer"
                >
                  👤 Victim Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('admin')}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700 cursor-pointer"
                >
                  🛡️ Admin Demo
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
