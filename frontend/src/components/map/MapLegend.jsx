import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, User, Ambulance, Home, AlertTriangle, Navigation } from 'lucide-react';

const MapLegend = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`absolute bottom-4 left-4 z-[1000] ${className}`}>
      <div className="rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800/90 shadow-2xl overflow-hidden transition-all duration-200">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-rose-500" />
            <span>Map Legend & Symbols</span>
          </div>
          {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
        </button>

        {isOpen && (
          <div className="p-3.5 pt-1 space-y-3 text-xs border-t border-slate-800 text-slate-300 min-w-[240px]">
            {/* Markers */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Markers</span>
              <div className="grid grid-cols-1 gap-1.5 pl-1">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-600 border border-rose-400 shrink-0"></div>
                  <span>🔴 Critical Victim (Triage 1)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-orange-500 border border-orange-300 shrink-0"></div>
                  <span>🟠 High Risk Victim (Triage 2)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-emerald-600 border border-emerald-300 shrink-0 flex items-center justify-center text-[8px] text-white">🚑</div>
                  <span>Rescue Team (Available / En Route)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-indigo-600 border border-indigo-300 shrink-0 flex items-center justify-center text-[8px] text-white">🏠</div>
                  <span>Emergency Safe Shelter</span>
                </div>
              </div>
            </div>

            {/* Danger Zones */}
            <div className="space-y-1.5 pt-1 border-t border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Disaster Perimeter</span>
              <div className="grid grid-cols-1 gap-1 pl-1">
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="w-3 h-3 rounded-full bg-rose-500/40 border border-rose-500 shrink-0"></span>
                  <span>Flash Flood Red Zone (&gt;4 ft)</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="w-3 h-3 rounded-full bg-orange-500/30 border border-orange-500 shrink-0"></span>
                  <span>High Inundation Basin</span>
                </div>
              </div>
            </div>

            {/* Evacuation Routing */}
            <div className="space-y-1.5 pt-1 border-t border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Routes</span>
              <div className="grid grid-cols-1 gap-1 pl-1 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-1 bg-emerald-500 rounded shrink-0"></span>
                  <span>Recommended Safe Path</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-1 bg-rose-500 border-dashed rounded shrink-0"></span>
                  <span>Blocked / Submerged Road</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapLegend;
