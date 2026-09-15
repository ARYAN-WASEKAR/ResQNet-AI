import React from 'react';
import { AlertTriangle, Droplets, Wind, ShieldAlert, Radio } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const DisasterBanner = ({ disaster, className = '' }) => {
  if (!disaster) return null;

  return (
    <div className={`p-4 rounded-2xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-900 border border-rose-500/40 shadow-xl ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Headline */}
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 shrink-0 mt-0.5">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-mono font-black text-rose-400 text-xs tracking-wider uppercase">
                {disaster.type} INCIDENT: {disaster.name}
              </span>
              <StatusBadge priority={disaster.riskLevel} type="priority" />
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              {disaster.headline}
            </p>
          </div>
        </div>

        {/* Right Telemetry Snapshot */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Threat Score</span>
            <span className="font-mono font-bold text-xs text-rose-400">{disaster.riskScore}%</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Affected Zone</span>
            <span className="font-mono font-bold text-xs text-amber-300">{disaster.affectedAreaKm2} km²</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">River Level</span>
            <span className="font-mono font-bold text-xs text-cyan-300">{disaster.weatherMetrics?.riverWaterLevelMeters} m</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Grid Status</span>
            <span className="font-mono font-bold text-[11px] text-rose-400">70% OFFLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterBanner;
