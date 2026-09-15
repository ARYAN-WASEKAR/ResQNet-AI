import React from 'react';

const StatusBadge = ({ status, priority, type = 'status', className = '' }) => {
  const value = String(priority || status || '').toUpperCase();

  // Status mappings
  if (type === 'priority' || ['CRITICAL', 'HIGH', 'HIGH RISK', 'MEDIUM', 'WARNING', 'LOW', 'SAFE'].includes(value)) {
    switch (value) {
      case 'CRITICAL':
      case '1':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/40 shadow-sm ${className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            🔴 CRITICAL
          </span>
        );
      case 'HIGH':
      case 'HIGH RISK':
      case '2':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/40 ${className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
            🟠 HIGH RISK
          </span>
        );
      case 'MEDIUM':
      case 'WARNING':
      case '3':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/40 ${className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            🟡 WARNING
          </span>
        );
      case 'LOW':
      case 'SAFE':
      case '4':
      default:
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 ${className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            🟢 SAFE
          </span>
        );
    }
  }

  // Lifecycle status mappings (Waiting, Assigned, En Route, Rescued)
  switch (value) {
    case 'WAITING':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          Waiting for Rescue
        </span>
      );
    case 'ASSIGNED':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
          Team Assigned
        </span>
      );
    case 'EN ROUTE':
    case 'EN_ROUTE':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          En Route
        </span>
      );
    case 'RESCUED':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Rescued ✓
        </span>
      );
    case 'AVAILABLE':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Available
        </span>
      );
    case 'BUSY':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          Active Mission
        </span>
      );
    case 'OFFLINE':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-700/50 text-slate-400 border border-slate-600/40 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
          Offline
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 ${className}`}>
          {status}
        </span>
      );
  }
};

export default StatusBadge;
