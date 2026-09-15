import React from 'react';
import { PhoneCall, ShieldCheck, HeartPulse, Radio, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 mt-auto">
      {/* Emergency Helpline Strip */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-200">
            <PhoneCall className="w-5 h-5 text-rose-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">Emergency Hotlines:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">National Emergency:</span>
              <a href="tel:112" className="text-rose-400 font-bold hover:underline">112</a>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Ambulance / Medical:</span>
              <a href="tel:108" className="text-rose-400 font-bold hover:underline">108</a>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Disaster Control:</span>
              <a href="tel:1077" className="text-amber-400 font-bold hover:underline">1077</a>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">NDRF Control:</span>
              <a href="tel:01124363260" className="text-cyan-400 font-bold hover:underline">011-24363260</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-rose-500" />
              <span className="text-base font-bold text-white font-mono">ResQNet AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-Powered Disaster Rescue & Evacuation Network. Uniting machine learning danger prediction with priority queue rescue triage and graph-based safe pathfinding.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">System Architecture</h4>
            <ul className="text-xs space-y-1.5 text-slate-400 font-mono">
              <li>• <span className="text-slate-300 font-semibold">AI Risk Engine:</span> Multimodal Flood & Cyclone Threat Scoring</li>
              <li>• <span className="text-slate-300 font-semibold">Routing:</span> Dijkstra & BFS Safe Hazard Avoidance</li>
              <li>• <span className="text-slate-300 font-semibold">Triage:</span> Max-Heap Priority Queue Rescue Dispatch</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Operational Sector</h4>
            <p className="text-xs text-slate-400">
              Sector 21 / Pimpri-Chinchwad Flood Control & Disaster Response Command.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 font-mono">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              All GIS Nodes & Telemetry Operational
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 ResQNet AI — AI-Powered Disaster Rescue & Evacuation Network. Built for emergency response.</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-slate-300">
              Frontend Client v1.0.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
