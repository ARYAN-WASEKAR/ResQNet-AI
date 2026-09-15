import React from 'react';
import { Home, Users, CheckCircle2, AlertTriangle, Navigation, HeartPulse, Zap } from 'lucide-react';
import Card from '../ui/Card';
import { formatDistance } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

const ShelterCapacityList = ({
  shelters = [],
  onSelectShelter,
  className = ''
}) => {
  const navigate = useNavigate();

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {shelters.map((shelter) => {
        const occupancyPercent = Math.round((shelter.occupied / shelter.capacity) * 100);
        const isNearFull = occupancyPercent >= 85;

        return (
          <Card
            key={shelter.id}
            variant="glass"
            className="p-4 space-y-3 border-slate-800 hover:border-slate-700 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-indigo-400 text-xs">{shelter.id}</span>
                    <h4 className="font-bold text-white text-xs leading-tight">{shelter.name}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{shelter.address}</p>
                </div>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                  shelter.status === 'SAFE'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                {shelter.status}
              </span>
            </div>

            {/* Capacity Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> Occupancy:
                </span>
                <span className="font-mono font-bold text-slate-200">
                  {shelter.occupied} / {shelter.capacity} ({occupancyPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    occupancyPercent >= 90 ? 'bg-rose-500' : occupancyPercent >= 75 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(occupancyPercent, 100)}%` }}
                />
              </div>
            </div>

            {/* Facilities Tags & Availability */}
            <div className="flex items-center justify-between flex-wrap gap-2 text-[11px] pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-slate-400">
                {shelter.hasMedical && (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <HeartPulse className="w-3 h-3" /> Medical Aid
                  </span>
                )}
                {shelter.hasPowerGenerator && (
                  <span className="flex items-center gap-1 text-amber-400">
                    <Zap className="w-3 h-3" /> Power Gen
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="font-semibold text-emerald-400">
                  {shelter.available} Beds Free
                </span>
                <button
                  type="button"
                  onClick={() => navigate(`/route?destination=${shelter.id}`)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Navigation className="w-3 h-3" />
                  Route
                </button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ShelterCapacityList;
