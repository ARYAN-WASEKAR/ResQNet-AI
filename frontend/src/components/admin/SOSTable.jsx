import React, { useState } from 'react';
import StatusBadge from '../common/StatusBadge';
import { formatRelativeTime } from '../../utils/formatters';
import { ShieldAlert, Users, AlertCircle, MapPin, Navigation, UserCheck, Eye, Filter } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const SOSTable = ({
  sosRequests = [],
  onAssignTeam,
  onViewOnMap,
  className = ''
}) => {
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const navigate = useNavigate();

  const filtered = sosRequests.filter((item) => {
    if (priorityFilter === 'ALL') return true;
    return String(item.priority).toUpperCase() === priorityFilter;
  });

  const priorityCounts = {
    ALL: sosRequests.length,
    CRITICAL: sosRequests.filter(s => s.priority === 'CRITICAL').length,
    HIGH: sosRequests.filter(s => s.priority === 'HIGH').length,
    MEDIUM: sosRequests.filter(s => s.priority === 'MEDIUM').length,
    LOW: sosRequests.filter(s => s.priority === 'LOW').length,
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Priority Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto text-xs">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((p) => {
            const isSelected = priorityFilter === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPriorityFilter(p)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? p === 'CRITICAL'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'bg-slate-700 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>{p === 'ALL' ? 'All Incidents' : p}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30 font-mono">
                  {priorityCounts[p] || 0}
                </span>
              </button>
            );
          })}
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Showing {filtered.length} of {sosRequests.length} Active SOS Signals
        </span>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="py-3.5 px-4 font-mono">Incident ID</th>
              <th className="py-3.5 px-4">Priority</th>
              <th className="py-3.5 px-4">Victim & Phone</th>
              <th className="py-3.5 px-4">Location Sector</th>
              <th className="py-3.5 px-4">Trapped</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Emergency Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-slate-500">
                  No active SOS requests match the selected priority filter.
                </td>
              </tr>
            ) : (
              filtered.map((sos) => {
                const isCritical = sos.priority === 'CRITICAL';

                return (
                  <tr
                    key={sos.id}
                    className={`hover:bg-slate-800/50 transition-colors ${
                      isCritical && sos.status === 'Waiting' ? 'bg-rose-950/20' : ''
                    }`}
                  >
                    {/* ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-rose-400">
                      {sos.id}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {formatRelativeTime(sos.reportedAt)}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="py-3.5 px-4">
                      <StatusBadge priority={sos.priority} type="priority" />
                    </td>

                    {/* Victim Name & Contact */}
                    <td className="py-3.5 px-4">
                      <strong className="text-white block font-medium">{sos.name}</strong>
                      <span className="text-[11px] text-slate-400 font-mono">{sos.phone}</span>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4">
                      <span className="text-slate-200 block truncate max-w-[180px]">{sos.locationName}</span>
                      {sos.medicalEmergency && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-rose-400 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" /> Med Alert
                        </span>
                      )}
                    </td>

                    {/* Headcount */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-white flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" /> {sos.peopleCount}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={sos.status} />
                      {sos.assignedTeam && (
                        <span className="block text-[10px] font-mono text-cyan-300 mt-0.5">
                          via {sos.assignedTeam}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {onViewOnMap && (
                          <button
                            type="button"
                            onClick={() => onViewOnMap(sos)}
                            title="Focus on live map"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => navigate(`/route?origin=${sos.id}`)}
                          title="Calculate safe evacuation path"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Navigation className="w-4 h-4" />
                        </button>

                        {sos.status === 'Waiting' && onAssignTeam && (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => onAssignTeam(sos)}
                            icon={UserCheck}
                            className="text-xs px-2.5 py-1"
                          >
                            Assign Team
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {filtered.map((sos) => (
          <div
            key={sos.id}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-rose-400">{sos.id}</span>
                <span className="font-bold text-white text-xs">{sos.name}</span>
              </div>
              <StatusBadge priority={sos.priority} type="priority" />
            </div>

            <div className="space-y-1 text-xs text-slate-300">
              <p className="text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{sos.locationName}</span>
              </p>
              <div className="flex items-center justify-between pt-1">
                <span>Trapped: <strong className="text-white">{sos.peopleCount}</strong></span>
                <StatusBadge status={sos.status} />
              </div>
              {sos.medicalEmergency && (
                <p className="text-rose-300 bg-rose-500/10 p-2 rounded-lg text-[11px] mt-1 border border-rose-500/20">
                  ⚠️ {sos.medicalNotes}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-[10px] text-slate-400">{formatRelativeTime(sos.reportedAt)}</span>
              <div className="flex items-center gap-2">
                {sos.status === 'Waiting' && onAssignTeam && (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => onAssignTeam(sos)}
                    className="text-xs py-1"
                  >
                    Assign Team
                  </Button>
                )}
                <button
                  type="button"
                  onClick={() => navigate(`/route?origin=${sos.id}`)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs"
                >
                  Route
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SOSTable;
