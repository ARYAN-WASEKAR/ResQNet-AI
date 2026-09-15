import React from 'react';
import { Search, Radio, Bell, RefreshCw, PlusCircle, ShieldAlert, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

const AdminHeader = ({
  searchQuery = '',
  onSearchChange,
  onOpenAssignModal,
  onResetDemo,
  className = ''
}) => {
  return (
    <header className={`h-16 px-4 sm:px-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-4 ${className}`}>
      {/* Left Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search victim ID, team callsign, hazard zone..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 transition-all"
          />
        </div>
      </div>

      {/* Center/Right Status Badges & Quick Action */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Grid Sync Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>SATELLITE SYNC: ACTIVE</span>
        </div>

        {/* Quick Demo Reset */}
        {onResetDemo && (
          <button
            type="button"
            onClick={onResetDemo}
            title="Reset simulated live data"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 text-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}

        {/* Priority Dispatch CTA */}
        {onOpenAssignModal && (
          <Button
            size="sm"
            variant="primary"
            onClick={onOpenAssignModal}
            icon={PlusCircle}
            className="text-xs"
          >
            Dispatch Unit
          </Button>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
