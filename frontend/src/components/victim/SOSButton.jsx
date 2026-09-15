import React from 'react';
import { ShieldAlert, AlertTriangle, Radio } from 'lucide-react';

const SOSButton = ({ onClick, isPending = false, hasActiveSOS = false }) => {
  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      {/* Outer Pulse Rings */}
      <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-rose-600/20 animate-beacon pointer-events-none"></div>
      <div className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-rose-600/30 animate-ping pointer-events-none"></div>

      {/* Main SOS Circular Button */}
      <button
        type="button"
        onClick={onClick}
        aria-label="Send Emergency SOS Signal"
        className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 active:scale-95 text-white shadow-2xl shadow-rose-600/60 border-4 border-white/30 flex flex-col items-center justify-center p-4 transition-all duration-300 cursor-pointer animate-pulse-emergency group focus:outline-none focus:ring-4 focus:ring-rose-400 focus:ring-offset-4 focus:ring-offset-slate-950"
      >
        <div className="p-3 rounded-full bg-black/20 mb-1 group-hover:scale-110 transition-transform">
          <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <span className="text-2xl sm:text-3xl font-black tracking-wider uppercase font-mono drop-shadow-md">
          {hasActiveSOS ? 'SOS ACTIVE' : 'SEND SOS'}
        </span>
        <span className="text-[10px] sm:text-xs font-bold text-rose-100/90 tracking-wide uppercase mt-0.5">
          {hasActiveSOS ? 'Tap to Manage Signal' : '1-Tap Emergency Broadcast'}
        </span>
      </button>

      {/* Under Button Status Hint */}
      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900/90 px-4 py-1.5 rounded-full border border-slate-800">
        <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
        <span>Shares real-time GPS & triage priority directly with NDRF/SDRF</span>
      </div>
    </div>
  );
};

export default SOSButton;
