import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Menu,
  X,
  Radio,
  MapPin,
  Home,
  Navigation,
  Activity,
  AlertTriangle,
  User,
  Shield,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEmergencyData } from '../../context/EmergencyDataContext';
import Button from '../ui/Button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, loginAsVictim, loginAsAdmin } = useAuth();
  const { disaster, resetToDefaultMockData } = useEmergencyData();

  const isVictimActive = location.pathname.startsWith('/victim') || location.pathname.startsWith('/sos');
  const isAdminActive = location.pathname.startsWith('/admin');

  const navLinks = [
    { name: 'Victim Portal', path: '/victim', icon: ShieldAlert, active: isVictimActive },
    { name: 'Rescue Command', path: '/admin', icon: Shield, active: isAdminActive },
    { name: 'Safe Routes', path: '/route', icon: Navigation, active: location.pathname === '/route' },
    { name: 'Shelter Finder', path: '/shelters', icon: Home, active: location.pathname === '/shelters' },
    { name: 'Disaster Hub', path: '/disaster', icon: Activity, active: location.pathname === '/disaster' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Emergency Ticker */}
      <div className="bg-rose-950/80 border-b border-rose-900/50 py-1.5 px-4 text-xs font-semibold text-rose-200 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="font-bold text-rose-400 tracking-wider uppercase">EMERGENCY ALERT:</span>
        </div>
        <div className="truncate px-3 text-rose-300/90 text-xs">
          {disaster?.headline || 'Critical flood stage warning in Sector 21. Water level 8.4m (Above Danger Mark). Evacuate immediately.'}
        </div>
        <div className="hidden sm:flex items-center gap-2 shrink-0 text-slate-400 text-[11px]">
          <span className="text-emerald-400 font-bold">24/7 HELPLINE: 112 / 108</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center shadow-lg shadow-rose-600/30 border border-rose-400/40 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white font-mono">ResQNet</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-500/20 text-rose-400 border border-rose-500/40">AI</span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 tracking-wide uppercase">Rescue & Evacuation Network</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    link.active
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25 border border-rose-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions & Role Quick Switch */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Demo Reset */}
            <button
              onClick={resetToDefaultMockData}
              title="Reset simulated data for fresh demo"
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-xl border border-slate-800 transition-colors text-xs flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="text-[11px]">Reset Demo</span>
            </button>

            {/* User Session Info & Switch */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-200">{user.name}</span>
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                    {user.role === 'admin' ? '🛡️ Rescue Command' : '👤 Victim Portal'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (user.role === 'victim') {
                      loginAsAdmin();
                      navigate('/admin');
                    } else {
                      loginAsVictim();
                      navigate('/victim');
                    }
                  }}
                  className="px-2 py-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                  title="Toggle between Victim and Admin view"
                >
                  Switch to {user.role === 'victim' ? 'Admin' : 'Victim'}
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" variant="primary">
                  Emergency Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/victim" className="sm:hidden">
              <Button size="sm" variant="emergency" className="text-xs px-2.5 py-1.5">
                SOS
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top duration-150">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold ${
                  link.active
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-300 py-1">
              <span>Active User: <strong>{user?.name || 'Guest'}</strong></span>
              <span className="text-rose-400 uppercase font-bold">{user?.role || 'Guest'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  loginAsVictim();
                  setMobileMenuOpen(false);
                  navigate('/victim');
                }}
                className="py-2 px-3 text-xs font-bold rounded-xl bg-slate-800 text-slate-200 border border-slate-700 text-center"
              >
                👤 Victim Mode
              </button>
              <button
                onClick={() => {
                  loginAsAdmin();
                  setMobileMenuOpen(false);
                  navigate('/admin');
                }}
                className="py-2 px-3 text-xs font-bold rounded-xl bg-slate-800 text-slate-200 border border-slate-700 text-center"
              >
                🛡️ Admin Mode
              </button>
            </div>
            <button
              onClick={() => {
                resetToDefaultMockData();
                setMobileMenuOpen(false);
              }}
              className="py-2 text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
