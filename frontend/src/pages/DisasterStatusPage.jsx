import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import MapContainer from '../components/map/MapContainer';
import DisasterZoneLayer from '../components/map/DisasterZoneLayer';
import MapLegend from '../components/map/MapLegend';
import MapControls from '../components/map/MapControls';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatusBadge from '../components/common/StatusBadge';
import { useEmergencyData } from '../context/EmergencyDataContext';
import { 
  AlertOctagon, 
  Waves, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Activity, 
  TrendingUp, 
  ShieldAlert, 
  Radio, 
  PhoneCall, 
  Clock, 
  ArrowRight,
  Droplets,
  AlertTriangle,
  FileText,
  Share2
} from 'lucide-react';

const DisasterStatusPage = () => {
  const { state } = useEmergencyData();
  const { disasters, userLocation } = state;

  const [activeTab, setActiveTab] = useState('telemetry'); // 'telemetry', 'bulletins', 'hotlines'

  const riverStage = disasters?.riverStage || { current: 14.8, danger: 12.0, warning: 10.5 };
  const rainfall = disasters?.rainfall || { rate: 76, unit: 'mm/h', status: 'Torrential' };
  const damDischarge = disasters?.damDischarge || { current: 48500, unit: 'cusecs', gatesOpen: 8 };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500/30 selection:text-rose-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Disaster Alert Banner */}
        <div className="bg-gradient-to-r from-rose-900/40 via-red-900/30 to-amber-900/20 border-2 border-rose-500/50 rounded-2xl p-5 mb-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 opacity-10">
            <AlertOctagon className="w-64 h-64 text-rose-400" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-400 animate-pulse">
                <AlertOctagon className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-slate-950 uppercase tracking-wider">
                    CRITICAL SEVERITY LEVEL 4
                  </span>
                  <span className="text-xs text-rose-300 font-mono">CODE RED ACTIVATED</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Mula-Mutha River Basin Flood Crest Warning
                </h1>
                <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                  Discharge from Khadakwasla reservoir increased to 48,500 cusecs. Sectors 4, 5, and Lowland riverside zones under mandatory evacuation.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
              <Link to="/sos">
                <Button variant="danger" size="md" className="w-full">
                  Broadcast Distress SOS
                </Button>
              </Link>
              <Link to="/route">
                <Button variant="secondary" size="md" className="w-full">
                  View Safe Route Out
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Real-time Telemetry Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Water Stage Gauge */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">River Stage Level</span>
              <Waves className="w-4 h-4 text-rose-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-rose-400 font-mono">{riverStage.current}m</span>
              <span className="text-xs text-slate-400">/ {riverStage.danger}m danger mark</span>
            </div>
            <div className="mt-3">
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{ width: `${Math.min(100, (riverStage.current / (riverStage.danger * 1.3)) * 100)}%` }}
                />
              </div>
              <span className="text-[11px] text-rose-400 font-semibold mt-1.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +2.8m above danger crest threshold
              </span>
            </div>
          </div>

          {/* Rainfall Intensity */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Precipitation Rate</span>
              <CloudRain className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-cyan-400 font-mono">{rainfall.rate}</span>
              <span className="text-xs text-slate-400">{rainfall.unit} (Extreme)</span>
            </div>
            <div className="mt-3 text-[11px] text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Rain Gauge Status:</span>
                <span className="text-cyan-300 font-semibold">Active Inflow</span>
              </div>
              <div className="flex justify-between">
                <span>24h Cumulative:</span>
                <span className="text-white font-mono font-medium">214.5 mm</span>
              </div>
            </div>
          </div>

          {/* Dam Spillway Discharge */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dam Outflow</span>
              <Activity className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-400 font-mono">{(damDischarge.current / 1000).toFixed(1)}k</span>
              <span className="text-xs text-slate-400">{damDischarge.unit}</span>
            </div>
            <div className="mt-3 text-[11px] text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Spillway Gates Open:</span>
                <span className="text-amber-300 font-semibold">{damDischarge.gatesOpen} / 12 Gates</span>
              </div>
              <div className="flex justify-between">
                <span>Reservoir Capacity:</span>
                <span className="text-rose-400 font-mono font-medium">98.4% Full</span>
              </div>
            </div>
          </div>

          {/* Evacuation Progress */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Evacuation Status</span>
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-400 font-mono">6,850</span>
              <span className="text-xs text-slate-400">/ 14,200 evacuees</span>
            </div>
            <div className="mt-3">
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '48%' }} />
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold mt-1.5 flex items-center justify-between">
                <span>48.2% Safely Reached Shelters</span>
                <span className="text-slate-400 font-mono">7,350 pending</span>
              </span>
            </div>
          </div>
        </div>

        {/* Split Section: Hazard Risk Map & Zone Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Map (7 cols) */}
          <div className="lg:col-span-7 h-[520px] bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden relative shadow-2xl">
            <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} className="h-full w-full">
              <DisasterZoneLayer zones={disasters?.zones || []} />
              <MapLegend />
              <MapControls />
            </MapContainer>
          </div>

          {/* Risk Zones Breakdown Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white text-base mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                  Active Inundation Zones
                </h3>

                <div className="space-y-3">
                  {(disasters?.zones || [
                    { id: 'zone-1', name: 'Sector 4 Lowland Riverfront', severity: 'Critical', radius: '1.2 km', depth: '1.8m', action: 'Immediate Roof/Highground Evacuation' },
                    { id: 'zone-2', name: 'Sector 5 Riverside Bypass', severity: 'High', radius: '2.0 km', depth: '0.9m', action: 'Avoid all vehicle travel' },
                    { id: 'zone-3', name: 'Sector 2 Plateau Buffer', severity: 'Moderate', radius: '3.5 km', depth: '0.2m', action: 'Standby for shelter reception' }
                  ]).map((zone, idx) => (
                    <div
                      key={zone.id || idx}
                      className={`p-3.5 rounded-xl border ${
                        zone.severity === 'Critical'
                          ? 'bg-rose-500/10 border-rose-500/40 text-rose-200'
                          : zone.severity === 'High'
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                          : 'bg-yellow-500/5 border-yellow-500/30 text-yellow-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-xs">{zone.name}</span>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                          zone.severity === 'Critical' ? 'bg-rose-500 text-slate-950' : 'bg-amber-500 text-slate-950'
                        }`}>
                          {zone.severity}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300 flex items-center justify-between mt-1">
                        <span>Est. Water Depth: <strong>{zone.depth || '1.2m'}</strong></span>
                        <span>Corridor: {zone.radius || '1.5km'}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                        Advisory: {zone.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Next Doppler Radar sweep in 4m 30s</span>
                <Link to="/route" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
                  Plan Evacuation <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Live Broadcast Bulletins & Official Hotlines */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Official Feed (2 cols) */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-rose-400 animate-pulse" />
                <h3 className="font-bold text-white text-base">District Disaster Management Bulletins</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Source: Pune DDMA & IMD</span>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 1,
                  time: '10 mins ago',
                  title: 'Emergency Siren Sounded in Lowland Basins',
                  body: 'All residents in within 500 meters of the river perimeter are ordered to proceed immediately to Highground Public School Shelter.',
                  author: 'State Emergency Operations Center (SEOC)',
                  priority: 'HIGH'
                },
                {
                  id: 2,
                  time: '35 mins ago',
                  title: 'NDRF 5th Battalion Deployed with 12 Inflatable Zodiacs',
                  body: 'Water rescue teams have mobilized along Ring Road underpass. Citizens stranded on rooftops should wave white/bright cloths.',
                  author: 'NDRF Task Force 4',
                  priority: 'INFO'
                },
                {
                  id: 3,
                  time: '1 hr ago',
                  title: 'Electricity Substation 4 De-energized for Public Safety',
                  body: 'Power intentionally cut to prevent electrocution hazards in submerged street grids. Emergency cellular towers running on battery backup.',
                  author: 'MSEDCL Grid Dispatch',
                  priority: 'ALERT'
                }
              ].map((bulletin) => (
                <div key={bulletin.id} className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{bulletin.title}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" /> {bulletin.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">{bulletin.body}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
                    <span>Issued by: <strong className="text-slate-400">{bulletin.author}</strong></span>
                    <span className="text-rose-400 font-semibold">{bulletin.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Hotlines Directory (1 col) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
                <PhoneCall className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">24/7 Emergency Helplines</h3>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'National Emergency SOS', number: '112', desc: 'Police, Fire, Medical Universal' },
                  { name: 'NDRF Disaster Helpline', number: '1078', desc: 'Flood Rescue & Evacuation Command' },
                  { name: 'District Emergency Desk', number: '020-26123371', desc: 'Pune Collectorate Control Room' },
                  { name: 'Ambulance & Trauma Care', number: '108', desc: 'Critical Paramedic Dispatch' },
                  { name: 'ResQNet Satellite Dispatch', number: '1800-RESQ-NET', desc: 'Triage & Drone Tracking Desk' }
                ].map((hl, idx) => (
                  <a
                    key={idx}
                    href={`tel:${hl.number}`}
                    className="block p-3 bg-slate-950/80 hover:bg-slate-800/60 border border-slate-800 hover:border-emerald-500/40 rounded-xl transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                        {hl.name}
                      </span>
                      <span className="text-xs font-black font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {hl.number}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{hl.desc}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center">
              Toll-free emergency lines operate even without cellular balance.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DisasterStatusPage;
