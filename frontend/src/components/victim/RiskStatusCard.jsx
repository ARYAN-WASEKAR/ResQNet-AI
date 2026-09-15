import React from 'react';
import Card from '../ui/Card';
import StatusBadge from '../common/StatusBadge';
import { AlertTriangle, Droplets, Wind, Zap, Gauge } from 'lucide-react';

const RiskStatusCard = ({ disaster, className = '' }) => {
  const riskScore = disaster?.riskScore || 78;
  const riskLevel = disaster?.riskLevel || 'HIGH_RISK';
  const weather = disaster?.weatherMetrics || {
    rainfallMmHour: 142,
    riverWaterLevelMeters: 8.4,
    dangerMarkMeters: 7.0,
    windSpeedKmh: 48,
    powerGridStatus: '70% OFFLINE',
  };

  return (
    <Card variant="danger" className={`space-y-4 border-rose-500/40 bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950 ${className}`}>
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-rose-500/30">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 animate-pulse">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider font-mono">CURRENT AREA RISK</h3>
            <span className="text-[11px] text-slate-400">AI Sensor-Fused Danger Model</span>
          </div>
        </div>
        <StatusBadge priority={riskLevel} type="priority" />
      </div>

      {/* Risk Score Meter */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
            {riskScore}%
          </span>
          <p className="text-xs font-semibold text-rose-300 mt-0.5">
            Heavy rainfall & rapid inundation detected
          </p>
        </div>

        {/* Circular Severity Gauge Pill */}
        <div className="text-right">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white uppercase shadow-lg shadow-rose-600/40 animate-pulse">
            ⚠️ HIGH RISK
          </span>
          <span className="block text-[10px] text-slate-400 mt-1 font-mono">Pavana River Basin</span>
        </div>
      </div>

      {/* Telemetry Grid */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-rose-500/20">
        <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <div className="flex items-center justify-center gap-1 text-cyan-400 text-xs mb-0.5">
            <Droplets className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold text-slate-400">Rainfall</span>
          </div>
          <span className="font-mono font-bold text-xs text-white">{weather.rainfallMmHour} mm/h</span>
        </div>

        <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <div className="flex items-center justify-center gap-1 text-amber-400 text-xs mb-0.5">
            <Gauge className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold text-slate-400">River Stage</span>
          </div>
          <span className="font-mono font-bold text-xs text-white">{weather.riverWaterLevelMeters} m</span>
        </div>

        <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <div className="flex items-center justify-center gap-1 text-rose-400 text-xs mb-0.5">
            <Zap className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold text-slate-400">Grid</span>
          </div>
          <span className="font-mono font-bold text-[11px] text-rose-300">{weather.powerGridStatus}</span>
        </div>
      </div>
    </Card>
  );
};

export default RiskStatusCard;
