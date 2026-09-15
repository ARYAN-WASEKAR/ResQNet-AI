import React from 'react';
import {
  LayoutDashboard,
  Map as MapIcon,
  ShieldAlert,
  Users,
  Ambulance,
  Home,
  Activity,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({
  activeSection = 'overview',
  onSelectSection,
  collapsed = false,
  onToggleCollapse,
  badgeCounts = {},
  className = ''
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Live Map', icon: MapIcon },
    { id: 'sos', label: 'SOS Requests', icon: ShieldAlert, count: badgeCounts.sos },
    { id: 'victims', label: 'Victims', icon: Users, count: badgeCounts.victims },
    { id: 'teams', label: 'Rescue Teams', icon: Ambulance, count: badgeCounts.teams },
    { id: 'shelters', label: 'Shelters', icon: Home, count: badgeCounts.shelters },
    { id: 'zones', label: 'Disaster Zones', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`h-full bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between transition-all duration-300 z-30 ${
        collapsed ? 'w-16' : 'w-60'
      } ${className}`}
    >
      {/* Top Header */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
          {!collapsed ? (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="leading-none">
                <span className="font-bold text-sm text-white font-mono block">ResQNet</span>
                <span className="text-[10px] text-rose-400 font-bold tracking-wider uppercase">Command Center</span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white mx-auto shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
          )}

          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden md:flex cursor-pointer"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Live Grid Indicator */}
        {!collapsed && (
          <div className="mx-3 my-2.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-[11px] text-emerald-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span className="font-mono truncate">PCMC SECTOR 21 GRID ACTIVE</span>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSection(item.id)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center ${
                  collapsed ? 'justify-center px-2' : 'justify-between px-3'
                } py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && item.count !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.id === 'sos'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
                          : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Logout */}
      <div className="p-3 border-t border-slate-800">
        {!collapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-200">
                ADM
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-white block truncate">{user?.name || 'Commander Rajiv'}</span>
                <span className="text-[10px] text-slate-400 font-mono">SECTOR LEAD</span>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex justify-center p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
