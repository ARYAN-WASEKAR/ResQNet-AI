import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { createVictimIcon } from '../../utils/mapHelpers';
import StatusBadge from '../common/StatusBadge';
import { formatRelativeTime } from '../../utils/formatters';
import { Users, AlertCircle, Phone, Clock } from 'lucide-react';

const VictimMarker = ({ victim, onAssignTeam, onSelect }) => {
  if (!victim || !victim.lat || !victim.lng) return null;

  const icon = createVictimIcon(victim.priority, victim.status === 'Waiting');

  return (
    <Marker
      position={[victim.lat, victim.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onSelect && onSelect(victim),
      }}
    >
      <Popup className="victim-popup">
        <div className="w-64 p-1 text-slate-100 font-sans">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-700/80 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-black text-rose-400 text-sm">{victim.id}</span>
              <span className="font-bold text-white text-xs">{victim.name}</span>
            </div>
            <StatusBadge priority={victim.priority} type="priority" />
          </div>

          {/* Details */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Status:</span>
              <StatusBadge status={victim.status} />
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" /> People:
              </span>
              <span className="font-bold text-white">{victim.peopleCount} trapped</span>
            </div>

            {victim.medicalEmergency && (
              <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-200 text-[11px] flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>{victim.medicalNotes || 'Medical assistance required'}</span>
              </div>
            )}

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {formatRelativeTime(victim.reportedAt)}
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <Phone className="w-3 h-3 text-emerald-400" /> {victim.phone}
              </span>
            </div>

            {/* Quick Action in Popup */}
            {victim.status === 'Waiting' && onAssignTeam && (
              <button
                type="button"
                onClick={() => onAssignTeam(victim)}
                className="w-full mt-2 py-1.5 px-3 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-colors text-center cursor-pointer shadow-md shadow-rose-600/30"
              >
                🚨 Assign Rescue Team
              </button>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default VictimMarker;
