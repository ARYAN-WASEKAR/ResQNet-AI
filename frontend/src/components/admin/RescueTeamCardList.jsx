import React from 'react';
import StatusBadge from '../common/StatusBadge';
import { Ambulance, Battery, Users, Radio, Wrench, Phone, CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card';

const RescueTeamCardList = ({
  teams = [],
  onSelectTeam,
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {teams.map((team) => {
        const isAvailable = team.status === 'AVAILABLE';
        const isEnRoute = team.status === 'EN ROUTE';

        return (
          <Card
            key={team.id}
            variant="glass"
            className="p-4 space-y-3 border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
            onClick={() => onSelectTeam && onSelectTeam(team)}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${
                  isAvailable ? 'bg-emerald-500/20 text-emerald-400' : isEnRoute ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  <Ambulance className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono font-bold text-cyan-400 text-xs">{team.id}</span>
                  <h4 className="font-bold text-white text-xs leading-tight">{team.name}</h4>
                </div>
              </div>
              <StatusBadge status={team.status} />
            </div>

            {/* Details */}
            <div className="space-y-2 text-xs">
              <div className="text-slate-300">
                <span className="text-slate-400 block text-[11px]">Commanding Officer:</span>
                <span className="font-semibold text-slate-100">{team.leader}</span>
              </div>

              <div className="text-slate-300">
                <span className="text-slate-400 block text-[11px]">Vehicle / Unit Type:</span>
                <span className="text-slate-200">{team.vehicleType}</span>
              </div>

              {/* Assignment Pill */}
              {team.currentAssignment ? (
                <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-200 text-[11px] flex items-center justify-between font-mono">
                  <span>Target: {team.currentAssignment}</span>
                  <span className="text-[10px] text-cyan-400 uppercase font-bold animate-pulse">En Route</span>
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Standby Ready
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">0 ACTIVE QUEUE</span>
                </div>
              )}

              {/* Bottom Specs */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1 text-slate-300">
                  <Users className="w-3.5 h-3.5 text-slate-400" /> {team.personnelCount} Personnel
                </span>
                <span className="flex items-center gap-1 font-mono text-emerald-400">
                  <Battery className="w-3.5 h-3.5" /> {team.batteryFuelLevel}
                </span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default RescueTeamCardList;
