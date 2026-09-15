import React, { useState } from 'react';
import StatusBadge from '../common/StatusBadge';
import { Users, Phone, MapPin, Search, ArrowUpDown, UserCheck, ShieldAlert } from 'lucide-react';
import Button from '../ui/Button';

const VictimTable = ({
  victims = [],
  onAssignTeam,
  onViewOnMap,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortByPriority, setSortByPriority] = useState(true);

  const filtered = victims
    .filter((v) => {
      const matchSearch =
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.locationName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || v.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortByPriority) {
        return (b.priorityScore || 0) - (a.priorityScore || 0);
      }
      return new Date(b.reportedAt) - new Date(a.reportedAt);
    });

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search victim ID, name, area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="Waiting">Waiting</option>
            <option value="Assigned">Assigned</option>
            <option value="En Route">En Route</option>
            <option value="Rescued">Rescued</option>
          </select>

          <button
            type="button"
            onClick={() => setSortByPriority(!sortByPriority)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              sortByPriority
                ? 'bg-rose-600/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>{sortByPriority ? 'Triage Priority (Max-Heap)' : 'Latest Reported'}</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4 font-mono">Victim ID</th>
                <th className="py-3 px-4">Name & Contact</th>
                <th className="py-3 px-4">Location Sector</th>
                <th className="py-3 px-4">Risk / Score</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned Team</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-500">
                    No victim records found.
                  </td>
                </tr>
              ) : (
                filtered.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-rose-400">{v.id}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-white block">{v.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{v.phone}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-200 block truncate max-w-[160px]">{v.locationName}</span>
                      <span className="text-[10px] text-slate-400">{v.peopleCount} persons</span>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <span className="text-slate-200">{v.priorityScore || 85}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge priority={v.priority} type="priority" />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={v.status} />
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {v.assignedTeam ? (
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-bold">
                          {v.assignedTeam}
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {v.status === 'Waiting' && onAssignTeam ? (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => onAssignTeam(v)}
                          icon={UserCheck}
                          className="text-xs px-2.5 py-1"
                        >
                          Assign
                        </Button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onViewOnMap && onViewOnMap(v)}
                          className="text-xs text-slate-400 hover:text-white px-2 py-1"
                        >
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VictimTable;
