import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { createRescueTeamIcon } from '../../utils/mapHelpers';
import StatusBadge from '../common/StatusBadge';
import { Shield, Battery, Phone, Wrench } from 'lucide-react';

const RescueTeamMarker = ({ team, onSelect }) => {
  if (!team || !team.lat || !team.lng) return null;

  const icon = createRescueTeamIcon(team.status);

  return (
    <Marker
      position={[team.lat, team.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onSelect && onSelect(team),
      }}
    >
      <Popup className="team-popup">
        <div className="w-64 p-1 text-slate-100 font-sans">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-700/80 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-black text-cyan-400 text-sm">{team.id}</span>
              <span className="font-bold text-white text-xs">{team.name}</span>
            </div>
            <StatusBadge status={team.status} />
          </div>

          {/* Details */}
          <div className="space-y-2 text-xs">
            <div className="text-slate-300">
              <span className="text-slate-400">Leader:</span> <strong className="text-white">{team.leader}</strong>
            </div>

            <div className="text-slate-300">
              <span className="text-slate-400">Vehicle:</span> <span className="text-slate-200">{team.vehicleType}</span>
            </div>

            <div className="flex items-center justify-between text-slate-300 pt-1">
              <span className="text-slate-400 flex items-center gap-1">
                <Battery className="w-3.5 h-3.5 text-emerald-400" /> Readiness:
              </span>
              <span className="font-mono font-bold text-emerald-400">{team.batteryFuelLevel}</span>
            </div>

            {team.currentAssignment ? (
              <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-[11px]">
                🎯 Active Mission: <strong>Assigned to {team.currentAssignment}</strong>
              </div>
            ) : (
              <div className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] text-center">
                ✓ Ready for immediate dispatch
              </div>
            )}

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
              <span>{team.personnelCount} Personnel</span>
              <span className="flex items-center gap-1 text-slate-300">
                <Phone className="w-3 h-3 text-cyan-400" /> {team.contact}
              </span>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default RescueTeamMarker;
