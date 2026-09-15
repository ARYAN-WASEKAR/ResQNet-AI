import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import MapContainer from '../components/map/MapContainer';
import RoutePolyline from '../components/map/RoutePolyline';
import ShelterMarker from '../components/map/ShelterMarker';
import DisasterZoneLayer from '../components/map/DisasterZoneLayer';
import MapLegend from '../components/map/MapLegend';
import MapControls from '../components/map/MapControls';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatusBadge from '../components/common/StatusBadge';
import { useEmergencyData } from '../context/EmergencyDataContext';
import { 
  Navigation, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Footprints, 
  Car, 
  Download, 
  Share2, 
  RefreshCw,
  Compass,
  CornerUpRight,
  Milestone
} from 'lucide-react';
import { formatDistance } from '../utils/formatters';

const RoutePage = () => {
  const { state } = useEmergencyData();
  const { shelters, routes, disasters, userLocation } = state;
  const location = useLocation();

  // Selected shelter from navigation state or default to first
  const queryParams = new URLSearchParams(location.search);
  const initialShelterId = queryParams.get('shelter') || (shelters[0]?.id || 'SH-01');

  const [selectedShelterId, setSelectedShelterId] = useState(initialShelterId);
  const [selectedRouteType, setSelectedRouteType] = useState('recommended'); // 'recommended', 'alternate', 'vehicle'
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const selectedShelter = shelters.find(s => s.id === selectedShelterId) || shelters[0];

  // Route details
  const activeRoute = routes[selectedRouteType] || routes.recommended;

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimStep(0);
  };

  useEffect(() => {
    let interval;
    if (isSimulating) {
      interval = setInterval(() => {
        setSimStep(prev => {
          if (prev >= (activeRoute?.steps?.length || 4) - 1) {
            setIsSimulating(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isSimulating, activeRoute]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Navigation className="w-3.5 h-3.5" /> AI Safe Route Engine
              </span>
              <span className="text-xs text-slate-500">Live Elevation & Water-Depth Grounded</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              Evacuation & Safe Routing
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Real-time obstacle avoidance calculating water levels, structural debris, and congestion.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={RefreshCw}
              onClick={() => alert('Recalculating optimal escape path with updated satellite telemetry...')}
            >
              Recalculate Path
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={() => alert('Offline Safe Route saved to device cache and encrypted SMS draft created.')}
            >
              Save Offline
            </Button>
          </div>
        </div>

        {/* Route Configuration & Target Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Destination & Mode Select */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Origin */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> Start Point (Your Beacon)
                </label>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-200 flex items-center justify-between">
                  <span>Sector 4, Riverbank St.</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                    {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </span>
                </div>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Milestone className="w-3.5 h-3.5 text-emerald-400" /> Target Safe Zone / Shelter
                </label>
                <select
                  value={selectedShelterId}
                  onChange={(e) => setSelectedShelterId(e.target.value)}
                  aria-label="Target Safe Zone or Shelter"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                  {shelters.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.occupancy}/{s.capacity} cap • {s.distance || '1.8 km'})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Route Type Pills */}
            <div className="mt-5 pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400">Route Profile:</span>
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setSelectedRouteType('recommended')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      selectedRouteType === 'recommended'
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Footprints className="w-3.5 h-3.5" /> Recommended Safe Path
                  </button>
                  <button
                    onClick={() => setSelectedRouteType('alternate')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      selectedRouteType === 'alternate'
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" /> High Ground Alternate
                  </button>
                  <button
                    onClick={() => setSelectedRouteType('vehicle')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      selectedRouteType === 'vehicle'
                        ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Car className="w-3.5 h-3.5" /> High-Clearance Rescue
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <strong>{activeRoute.duration || '18 min'}</strong>
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <strong>{activeRoute.distance || '2.4 km'}</strong>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 98% Safety Score
                </span>
              </div>
            </div>
          </div>

          {/* Destination Overview Card */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Destination Hub</span>
                <StatusBadge status={selectedShelter.status || 'Active'} type="shelter" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{selectedShelter.name}</h3>
              <p className="text-xs text-slate-400 mb-3">{selectedShelter.address || 'Safe elevation zone 34m above base flood'}</p>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Capacity Occupancy</span>
                    <span className="font-semibold text-slate-200">
                      {selectedShelter.occupancy} / {selectedShelter.capacity} ({Math.round((selectedShelter.occupancy / selectedShelter.capacity) * 100)}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        selectedShelter.occupancy / selectedShelter.capacity > 0.85
                          ? 'bg-rose-500'
                          : selectedShelter.occupancy / selectedShelter.capacity > 0.6
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${(selectedShelter.occupancy / selectedShelter.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedShelter.hasMedical && (
                    <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 font-medium">
                      + Medical Staff
                    </span>
                  )}
                  {selectedShelter.hasPower && (
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-medium">
                      ⚡ Gen Power
                    </span>
                  )}
                  {selectedShelter.hasFood && (
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                      🍞 Ration Supply
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <Link to="/shelters" className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1">
                Browse all shelters <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Button
                size="sm"
                variant={isSimulating ? 'danger' : 'primary'}
                onClick={handleSimulate}
              >
                {isSimulating ? 'Stop Simulation' : 'Simulate Run'}
              </Button>
            </div>
          </div>
        </div>

        {/* Map & Turn-by-Turn Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Route Map (2 cols) */}
          <div className="lg:col-span-2 h-[560px] bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden relative shadow-2xl">
            <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={14} className="h-full w-full">
              <DisasterZoneLayer zones={disasters?.zones || []} />
              <ShelterMarker shelter={selectedShelter} />
              
              {/* Primary Glowing Polyline */}
              <RoutePolyline
                positions={activeRoute.coordinates || []}
                color={selectedRouteType === 'recommended' ? '#10b981' : selectedRouteType === 'alternate' ? '#3b82f6' : '#f59e0b'}
                dashArray={selectedRouteType === 'alternate' ? '6, 8' : undefined}
                weight={6}
                opacity={0.9}
              />

              {/* Blocked hazard paths */}
              {routes.blocked && (
                <RoutePolyline
                  positions={routes.blocked.coordinates || []}
                  color="#ef4444"
                  dashArray="4, 8"
                  weight={4}
                  opacity={0.6}
                />
              )}

              <MapLegend />
              <MapControls />
            </MapContainer>

            {/* In-Map Active HUD Warning */}
            <div className="absolute top-4 left-4 z-[1000] max-w-sm bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-xl p-3.5 shadow-2xl pointer-events-auto">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Bridge St. Blocked Due to Flash Crest</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Safe routing automatically redirects via High Street bypass (+4 min, zero flood exposure).
                  </div>
                </div>
              </div>
            </div>

            {/* Simulation Progress HUD */}
            {isSimulating && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 rounded-full px-5 py-2.5 shadow-2xl flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-semibold text-white">
                  Navigating Step {simStep + 1} of {activeRoute.steps?.length || 4}: {activeRoute.steps?.[simStep]?.instruction || 'Proceeding safely'}
                </span>
              </div>
            )}
          </div>

          {/* Turn-by-Turn Navigation Instructions (1 col) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col h-[560px] shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CornerUpRight className="w-5 h-5 text-emerald-400" />
                <h2 className="font-bold text-white text-base">Evacuation Steps</h2>
              </div>
              <span className="text-xs font-medium text-slate-400">
                {(activeRoute.steps || []).length} Milestones
              </span>
            </div>

            {/* Steps Scrollable List */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1.5 custom-scrollbar">
              {(activeRoute.steps || [
                { id: 1, instruction: 'Head North on Riverbank Ave toward Highground Way', distance: '400 m', safe: true },
                { id: 2, instruction: 'Avoid Main Bridge — turn sharp right onto Elevated Ring Rd', distance: '850 m', warning: 'High water at underpass' },
                { id: 3, instruction: 'Continue straight through Sector 2 Community Plaza', distance: '600 m', safe: true },
                { id: 4, instruction: 'Arrive at Safe Haven Center (Elevated entry gate 2)', distance: '150 m', isDestination: true }
              ]).map((step, idx) => {
                const isActive = isSimulating && simStep === idx;
                return (
                  <div
                    key={step.id || idx}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-emerald-500/15 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                        : step.warning
                        ? 'bg-amber-500/5 border-amber-500/30'
                        : step.isDestination
                        ? 'bg-blue-500/5 border-blue-500/30'
                        : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : step.warning
                          ? 'bg-amber-500/20 text-amber-400'
                          : step.isDestination
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold leading-relaxed ${isActive ? 'text-emerald-200' : 'text-slate-200'}`}>
                          {step.instruction}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 text-[11px]">
                          <span className="text-slate-400 font-mono">{step.distance}</span>
                          {step.warning && (
                            <span className="text-amber-400 font-medium flex items-center gap-1 bg-amber-400/10 px-1.5 py-0.5 rounded">
                              <AlertTriangle className="w-3 h-3" /> {step.warning}
                            </span>
                          )}
                          {step.safe && (
                            <span className="text-emerald-400 font-medium">Safe Clear Path</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Safety Protocol Banner */}
            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Stay on marked high-elevation pathways. Do not cross water above ankle height.</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoutePage;
