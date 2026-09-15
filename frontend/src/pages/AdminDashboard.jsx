import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import StatCard from '../components/dashboard/StatCard';
import DisasterBanner from '../components/dashboard/DisasterBanner';
import MapContainer from '../components/map/MapContainer';
import SOSTable from '../components/admin/SOSTable';
import VictimTable from '../components/admin/VictimTable';
import RescueTeamCardList from '../components/admin/RescueTeamCardList';
import ShelterCapacityList from '../components/admin/ShelterCapacityList';
import AssignTeamModal from '../components/admin/AssignTeamModal';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useEmergencyData } from '../context/EmergencyDataContext';
import {
  ShieldAlert,
  Users,
  Ambulance,
  Home,
  Activity,
  Maximize2,
  Minimize2,
  TrendingUp,
  AlertTriangle,
  Radio,
  Layers,
  Sparkles
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedVictimForAssign, setSelectedVictimForAssign] = useState(null);
  const [selectedMapItem, setSelectedMapItem] = useState(null);
  const [fullMapMode, setFullMapMode] = useState(false);

  const {
    victims,
    rescueTeams,
    shelters,
    disaster,
    routes,
    userLocation,
    assignTeamToVictim,
    resetToDefaultMockData
  } = useEmergencyData();

  // Metric Computations
  const activeSOSCount = victims.filter(v => v.status !== 'Rescued').length;
  const criticalVictimsCount = victims.filter(v => v.priority === 'CRITICAL' && v.status !== 'Rescued').length;
  const availableTeamsCount = rescueTeams.filter(t => t.status === 'AVAILABLE').length;
  const availableSheltersCount = shelters.filter(s => s.status === 'SAFE').length;

  const handleOpenAssignModal = (victim = null) => {
    // If no victim passed, select the first unassigned critical victim
    const target = victim || victims.find(v => v.status === 'Waiting') || victims[0];
    setSelectedVictimForAssign(target);
    setAssignModalOpen(true);
  };

  const handleDispatchConfirm = async (victimId, teamId) => {
    assignTeamToVictim(victimId, teamId);
  };

  const handleViewOnMap = (item) => {
    setSelectedMapItem(item);
    setActiveSection('map');
  };

  return (
    <div className="h-screen flex bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Collapsible Command Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        badgeCounts={{
          sos: activeSOSCount,
          victims: victims.length,
          teams: rescueTeams.length,
          shelters: shelters.length,
        }}
      />

      {/* Main Command Console */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <AdminHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenAssignModal={() => handleOpenAssignModal()}
          onResetDemo={resetToDefaultMockData}
        />

        {/* Scrollable Dashboard View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Top Disaster Alert Banner */}
          <DisasterBanner disaster={disaster} />

          {/* Section: OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              {/* 4 Core Metric Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Active SOS Signals"
                  value={activeSOSCount}
                  subtext="Real-time distress signals"
                  icon={ShieldAlert}
                  variant="danger"
                  trend="+2 in last 10m"
                  onClick={() => setActiveSection('sos')}
                />
                <StatCard
                  title="Critical Victims"
                  value={criticalVictimsCount}
                  subtext="Triage Priority 1 (Immediate)"
                  icon={Users}
                  variant="warning"
                  trend="Requires dispatch"
                  onClick={() => setActiveSection('victims')}
                />
                <StatCard
                  title="Available Teams"
                  value={`${availableTeamsCount} / ${rescueTeams.length}`}
                  subtext="Rapid response units ready"
                  icon={Ambulance}
                  variant="success"
                  trend="NDRF & SDRF active"
                  onClick={() => setActiveSection('teams')}
                />
                <StatCard
                  title="Verified Shelters"
                  value={`${availableSheltersCount} / ${shelters.length}`}
                  subtext="Safe high-ground refuges"
                  icon={Home}
                  variant="info"
                  trend="780 total beds free"
                  onClick={() => setActiveSection('shelters')}
                />
              </div>

              {/* Split View: Live Map & Incident Priority Stream */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Live Interactive Map Column */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                        Live GIS Command Map
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveSection('map')}
                      className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      Expand Fullscreen Map
                    </button>
                  </div>

                  <div className="h-[420px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                    <MapContainer
                      victims={victims}
                      rescueTeams={rescueTeams}
                      shelters={shelters}
                      disaster={disaster}
                      routes={routes}
                      userLocation={userLocation}
                      onAssignTeam={handleOpenAssignModal}
                      height="100%"
                    />
                  </div>
                </div>

                {/* Priority SOS Stream Column */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Priority SOS Triage Queue
                    </h3>
                    <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30 font-bold">
                      Max-Heap Sorted
                    </span>
                  </div>

                  <Card variant="glass" className="p-0 overflow-hidden border-slate-800 max-h-[420px] overflow-y-auto">
                    <div className="divide-y divide-slate-800/80 text-xs">
                      {victims.slice(0, 5).map((v) => {
                        const isCritical = v.priority === 'CRITICAL';
                        return (
                          <div
                            key={v.id}
                            className={`p-3.5 hover:bg-slate-800/50 transition-colors space-y-2 ${
                              isCritical && v.status === 'Waiting' ? 'bg-rose-950/20' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-rose-400">{v.id}</span>
                                <strong className="text-white">{v.name}</strong>
                              </div>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                isCritical ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-orange-500/20 text-orange-300'
                              }`}>
                                {v.priority}
                              </span>
                            </div>

                            <p className="text-slate-300 text-[11px] truncate">{v.locationName}</p>

                            <div className="flex items-center justify-between text-[11px] pt-1">
                              <span className="text-slate-400">{v.peopleCount} trapped • {v.status}</span>
                              {v.status === 'Waiting' ? (
                                <Button
                                  size="sm"
                                  variant="primary"
                                  onClick={() => handleOpenAssignModal(v)}
                                  className="text-[10px] px-2 py-0.5"
                                >
                                  Dispatch Unit
                                </Button>
                              ) : (
                                <span className="font-mono text-cyan-400 text-[10px]">
                                  {v.assignedTeam || 'En Route'}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                </div>
              </div>

              {/* Full SOS Incident Table Below */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Full Emergency SOS Queue
                </h3>
                <SOSTable
                  sosRequests={victims}
                  onAssignTeam={handleOpenAssignModal}
                  onViewOnMap={handleViewOnMap}
                />
              </div>
            </div>
          )}

          {/* Section: FULL LIVE MAP */}
          {activeSection === 'map' && (
            <div className="space-y-3 h-[calc(100vh-180px)] flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Sector 21 Tactical Live GIS Map
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">
                    {victims.length} Victims • {rescueTeams.length} Teams • {shelters.length} Shelters
                  </span>
                </div>
              </div>

              <div className="flex-1 w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <MapContainer
                  victims={victims}
                  rescueTeams={rescueTeams}
                  shelters={shelters}
                  disaster={disaster}
                  routes={routes}
                  userLocation={userLocation}
                  onAssignTeam={handleOpenAssignModal}
                  height="100%"
                />
              </div>
            </div>
          )}

          {/* Section: SOS REQUESTS */}
          {activeSection === 'sos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-white font-mono">Emergency SOS Requests</h2>
                  <p className="text-xs text-slate-400">Incoming distress transmissions from victims and reconnaissance nodes</p>
                </div>
                <Button size="sm" variant="primary" onClick={() => handleOpenAssignModal()}>
                  Manual Dispatch
                </Button>
              </div>
              <SOSTable
                sosRequests={victims}
                onAssignTeam={handleOpenAssignModal}
                onViewOnMap={handleViewOnMap}
              />
            </div>
          )}

          {/* Section: VICTIMS MANAGEMENT */}
          {activeSection === 'victims' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-black text-white font-mono">Victim Triage & Registry</h2>
                <p className="text-xs text-slate-400">Prioritized victim casualty triage directory with medical alert flags</p>
              </div>
              <VictimTable
                victims={victims}
                onAssignTeam={handleOpenAssignModal}
                onViewOnMap={handleViewOnMap}
              />
            </div>
          )}

          {/* Section: RESCUE TEAMS */}
          {activeSection === 'teams' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-black text-white font-mono">Rescue Team Fleet Operations</h2>
                <p className="text-xs text-slate-400">Status, equipment inventory, and mission assignment of deployed field units</p>
              </div>
              <RescueTeamCardList
                teams={rescueTeams}
                onSelectTeam={handleViewOnMap}
              />
            </div>
          )}

          {/* Section: SHELTERS */}
          {activeSection === 'shelters' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-black text-white font-mono">Emergency Shelter Capacity Grid</h2>
                <p className="text-xs text-slate-400">High-ground refuges with real-time bed availability and medical support</p>
              </div>
              <ShelterCapacityList
                shelters={shelters}
                onSelectShelter={handleViewOnMap}
              />
            </div>
          )}

          {/* Section: DISASTER ZONES & TELEMETRY */}
          {activeSection === 'zones' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-black text-white font-mono">Active Hazard Zones & Telemetry</h2>
                <p className="text-xs text-slate-400">Inundation depth, river velocity, and flood perimeter analysis</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {disaster?.zones?.map((zone) => (
                  <Card key={zone.id} variant="danger" className="p-5 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-rose-500/30">
                      <span className="font-mono font-bold text-rose-400 text-xs">{zone.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300">
                        {zone.status}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{zone.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{zone.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-mono">
                      <span>Water Depth: <strong className="text-cyan-300">{zone.floodDepthMeters} m</strong></span>
                      <span>Radius: <strong className="text-amber-300">{zone.radiusMeters} m</strong></span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Section: ANALYTICS */}
          {activeSection === 'analytics' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-black text-white font-mono">Disaster Analytics & Rescue Trends</h2>
                <p className="text-xs text-slate-400">Historical intake rate, response velocity, and evacuation metrics</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card variant="glass" className="p-5 text-center space-y-1">
                  <span className="text-xs text-slate-400 uppercase font-bold">Avg Rescue Dispatch Time</span>
                  <div className="font-mono font-black text-3xl text-emerald-400">3.8 mins</div>
                  <p className="text-[11px] text-slate-400">62% faster with AI triage prioritization</p>
                </Card>
                <Card variant="glass" className="p-5 text-center space-y-1">
                  <span className="text-xs text-slate-400 uppercase font-bold">Total Citizens Evacuated</span>
                  <div className="font-mono font-black text-3xl text-cyan-400">142</div>
                  <p className="text-[11px] text-slate-400">Across 8 verified safe shelters</p>
                </Card>
                <Card variant="glass" className="p-5 text-center space-y-1">
                  <span className="text-xs text-slate-400 uppercase font-bold">Graph Evacuation Success</span>
                  <div className="font-mono font-black text-3xl text-rose-400">99.4%</div>
                  <p className="text-[11px] text-slate-400">0 route hazard entrapments reported</p>
                </Card>
              </div>
            </div>
          )}

          {/* Section: SETTINGS */}
          {activeSection === 'settings' && (
            <div className="space-y-4 max-w-xl">
              <div>
                <h2 className="text-lg font-black text-white font-mono">System Settings & Data Controls</h2>
                <p className="text-xs text-slate-400">Configure simulated thresholds and backend API endpoint connection</p>
              </div>
              <Card variant="glass" className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase">Backend API URL</label>
                  <input
                    type="text"
                    defaultValue="http://localhost:5000/api"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200"
                  />
                  <p className="text-[11px] text-slate-400">Connected to Member 2's Express/MongoDB backend service</p>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Reset all mock state to clean initial dataset:</span>
                  <Button size="sm" variant="outline" onClick={resetToDefaultMockData}>
                    Reset Demo State
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Assign Rescue Team Modal */}
      <AssignTeamModal
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        victim={selectedVictimForAssign}
        rescueTeams={rescueTeams}
        onAssign={handleDispatchConfirm}
      />
    </div>
  );
};

export default AdminDashboard;
