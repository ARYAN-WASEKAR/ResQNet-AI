import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../ui/Button';
import StatusBadge from '../common/StatusBadge';
import { Ambulance, UserCheck, ShieldAlert, CheckCircle2, Battery, Users } from 'lucide-react';

const AssignTeamModal = ({
  isOpen,
  onClose,
  victim,
  rescueTeams = [],
  onAssign,
}) => {
  const [selectedTeamId, setSelectedTeamId] = useState(rescueTeams[0]?.id || 'RT001');
  const [loading, setLoading] = useState(false);

  if (!victim) return null;

  const handleAssign = async () => {
    setLoading(true);
    await onAssign(victim.id, selectedTeamId);
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🚑 Dispatch Rescue Team" maxWidth="max-w-lg">
      <div className="space-y-4">
        {/* Victim Summary Card */}
        <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/80 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-rose-400">{victim.id}</span>
              <strong className="text-white">{victim.name}</strong>
            </div>
            <StatusBadge priority={victim.priority} type="priority" />
          </div>
          <p className="text-slate-300">{victim.locationName}</p>
          <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-700/50">
            <span>Trapped: <strong className="text-white">{victim.peopleCount}</strong></span>
            <span>Contact: <strong className="text-slate-200">{victim.phone}</strong></span>
          </div>
          {victim.medicalEmergency && (
            <div className="p-1.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[10px]">
              ⚠️ {victim.medicalNotes}
            </div>
          )}
        </div>

        {/* Team Selection List */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Select Rescue Unit for Rapid Deployment:
          </label>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {rescueTeams.map((team) => {
              const isSelected = selectedTeamId === team.id;
              const isAvailable = team.status === 'AVAILABLE';

              return (
                <div
                  key={team.id}
                  onClick={() => setSelectedTeamId(team.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-lg shadow-cyan-950/50'
                      : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700 text-slate-300'}`}>
                      <Ambulance className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-cyan-300 text-xs">{team.id}</span>
                        <strong className="text-white text-xs">{team.name}</strong>
                      </div>
                      <span className="text-[11px] text-slate-400 block">{team.vehicleType}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <StatusBadge status={team.status} />
                    <span className="block text-[10px] font-mono text-emerald-400 mt-1">
                      {team.batteryFuelLevel} fuel
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button variant="outline" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAssign}
            loading={loading}
            icon={UserCheck}
          >
            Confirm Dispatch
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignTeamModal;
