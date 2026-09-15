import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import MapContainer from '../components/map/MapContainer';
import ShelterMarker from '../components/map/ShelterMarker';
import DisasterZoneLayer from '../components/map/DisasterZoneLayer';
import MapLegend from '../components/map/MapLegend';
import MapControls from '../components/map/MapControls';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import { useEmergencyData } from '../context/EmergencyDataContext';
import { 
  Building2, 
  Search, 
  Filter, 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  Zap, 
  HeartPulse, 
  Utensils, 
  Phone, 
  UserCheck, 
  Users, 
  Compass, 
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { formatDistance } from '../utils/formatters';

const ShelterPage = () => {
  const navigate = useNavigate();
  const { state, updateShelterCheckin } = useEmergencyData();
  const { shelters, disasters, userLocation } = state;

  // Search, Filter & Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMedical, setFilterMedical] = useState(false);
  const [filterPower, setFilterPower] = useState(false);
  const [filterFood, setFilterFood] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'available', 'full'
  const [sortBy, setSortBy] = useState('distance'); // 'distance', 'capacity', 'occupancy'
  const [viewMode, setViewMode] = useState('split'); // 'split', 'grid', 'map'

  // Selected Shelter Modal for Check-in
  const [selectedShelterModal, setSelectedShelterModal] = useState(null);
  const [checkinSuccess, setCheckinSuccess] = useState(false);

  // Filtered & Sorted Shelters
  const filteredShelters = useMemo(() => {
    return shelters
      .filter(s => {
        const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.address && s.address.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesMedical = filterMedical ? s.hasMedical : true;
        const matchesPower = filterPower ? s.hasPower : true;
        const matchesFood = filterFood ? s.hasFood : true;

        let matchesStatus = true;
        if (statusFilter === 'available') {
          matchesStatus = (s.occupancy < s.capacity);
        } else if (statusFilter === 'full') {
          matchesStatus = (s.occupancy >= s.capacity);
        }

        return matchesQuery && matchesMedical && matchesPower && matchesFood && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'distance') {
          // If numeric distance exists or fallback
          const distA = parseFloat(a.distance) || 2;
          const distB = parseFloat(b.distance) || 2;
          return distA - distB;
        }
        if (sortBy === 'capacity') {
          return (b.capacity - b.occupancy) - (a.capacity - a.occupancy);
        }
        if (sortBy === 'occupancy') {
          return (a.occupancy / a.capacity) - (b.occupancy / b.capacity);
        }
        return 0;
      });
  }, [shelters, searchQuery, filterMedical, filterPower, filterFood, statusFilter, sortBy]);

  // Aggregate Metrics
  const totalCapacity = shelters.reduce((acc, s) => acc + s.capacity, 0);
  const totalOccupancy = shelters.reduce((acc, s) => acc + s.occupancy, 0);
  const totalAvailableSpots = totalCapacity - totalOccupancy;
  const occupancyPercentage = totalCapacity ? Math.round((totalOccupancy / totalCapacity) * 100) : 0;

  const handleCheckin = (shelter) => {
    updateShelterCheckin(shelter.id, 1);
    setCheckinSuccess(true);
    setTimeout(() => {
      setCheckinSuccess(false);
      setSelectedShelterModal(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Title & Metric Highlights */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Building2 className="w-3.5 h-3.5" /> Designated Emergency Shelters
              </span>
              <span className="text-xs text-slate-400 font-mono">Live Occupancy Feed</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Safe Havens & Shelter Directory
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Locate government-approved high-elevation relief camps with real-time medical, ration, and power capabilities.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
              <span className="text-[11px] text-slate-400 font-medium block">Total Shelters</span>
              <span className="text-xl font-bold text-white">{shelters.length}</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
              <span className="text-[11px] text-slate-400 font-medium block">Vacant Beds</span>
              <span className="text-xl font-bold text-emerald-400">{totalAvailableSpots}</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
              <span className="text-[11px] text-slate-400 font-medium block">Occupancy Rate</span>
              <span className="text-xl font-bold text-cyan-400">{occupancyPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Search, Filter and View Mode Toolbar */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md shadow-xl mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search shelter by name, school, stadium or landmark..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by availability status"
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Availability</option>
              <option value="available">Has Vacancies</option>
              <option value="full">At Maximum Capacity</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort shelters by criteria"
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="distance">Sort by: Closest Distance</option>
              <option value="capacity">Sort by: Most Available Beds</option>
              <option value="occupancy">Sort by: Lowest Occupancy %</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'split' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Split View
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cards Only
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'map' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Map Only
              </button>
            </div>
          </div>

          {/* Facility Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Required Facilities:
            </span>
            <button
              onClick={() => setFilterMedical(!filterMedical)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
                filterMedical
                  ? 'bg-red-500/20 text-red-300 border-red-500/50 font-semibold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5 text-red-400" /> Medical Ward
            </button>
            <button
              onClick={() => setFilterPower(!filterPower)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
                filterPower
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-semibold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Backup Power
            </button>
            <button
              onClick={() => setFilterFood(!filterFood)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
                filterFood
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-semibold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-emerald-400" /> Hot Meals / Water
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className={`grid gap-6 ${
          viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'
        }`}>
          {/* Shelters Cards List */}
          {(viewMode === 'split' || viewMode === 'grid') && (
            <div className={`${
              viewMode === 'split' ? 'lg:col-span-6 xl:col-span-5' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            } space-y-4 max-h-[750px] overflow-y-auto pr-1.5 custom-scrollbar`}>
              {filteredShelters.length === 0 ? (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center">
                  <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-300">No shelters match your filter criteria.</p>
                  <p className="text-xs text-slate-500 mt-1">Try relaxing some facility requirements or clearing your search.</p>
                </div>
              ) : (
                filteredShelters.map((shelter) => {
                  const percent = Math.round((shelter.occupancy / shelter.capacity) * 100);
                  const isFull = percent >= 100;
                  const isHigh = percent >= 80;

                  return (
                    <div
                      key={shelter.id}
                      className="bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 rounded-2xl p-4.5 backdrop-blur-md transition-all shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-white text-base">{shelter.name}</h3>
                          </div>
                          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                            {shelter.address || 'Safe Elevation Zone, Highground'}
                          </p>
                        </div>
                        <StatusBadge
                          status={isFull ? 'Full' : isHigh ? 'Crowded' : 'Operational'}
                          type="shelter"
                        />
                      </div>

                      {/* Capacity Bar */}
                      <div className="my-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Occupancy</span>
                          <span className="font-mono font-semibold text-slate-200">
                            {shelter.occupancy} / {shelter.capacity} ({percent}%)
                          </span>
                        </div>
                        <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isFull ? 'bg-rose-500' : isHigh ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, percent)}%` }}
                          />
                        </div>
                      </div>

                      {/* Facilities Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {shelter.hasMedical && (
                          <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 font-medium flex items-center gap-1">
                            <HeartPulse className="w-3 h-3" /> Medical Aid
                          </span>
                        )}
                        {shelter.hasPower && (
                          <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-medium flex items-center gap-1">
                            <Zap className="w-3 h-3" /> Gen Power
                          </span>
                        )}
                        {shelter.hasFood && (
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-medium flex items-center gap-1">
                            <Utensils className="w-3 h-3" /> Food & Water
                          </span>
                        )}
                      </div>

                      {/* Card Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 gap-2">
                        <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                          <Compass className="w-3.5 h-3.5 text-cyan-400" />
                          {shelter.distance || '1.8 km away'}
                        </span>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedShelterModal(shelter)}
                          >
                            Details & Check-in
                          </Button>
                          <Button
                            size="sm"
                            variant="primary"
                            icon={Navigation}
                            onClick={() => navigate(`/route?shelter=${shelter.id}`)}
                          >
                            Safe Path
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Interactive Leaflet Map View */}
          {(viewMode === 'split' || viewMode === 'map') && (
            <div className={`${
              viewMode === 'split' ? 'lg:col-span-6 xl:col-span-7' : 'w-full'
            } h-[750px] bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden relative shadow-2xl`}>
              <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} className="h-full w-full">
                <DisasterZoneLayer zones={disasters?.zones || []} />
                {filteredShelters.map(shelter => (
                  <ShelterMarker
                    key={shelter.id}
                    shelter={shelter}
                    onClick={() => setSelectedShelterModal(shelter)}
                  />
                ))}
                <MapLegend />
                <MapControls />
              </MapContainer>
            </div>
          )}
        </div>
      </main>

      {/* Shelter Details & Check-in Modal */}
      {selectedShelterModal && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedShelterModal(null)}
          title={selectedShelterModal.name}
          subtitle={selectedShelterModal.address || 'Safe Evacuation Center'}
        >
          <div className="space-y-4">
            {checkinSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <CheckCircle className="w-5 h-5" />
                Successfully recorded your arrival check-in!
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 block mb-1">Capacity Status</span>
                <span className="text-base font-bold text-white">
                  {selectedShelterModal.occupancy} / {selectedShelterModal.capacity}
                </span>
                <span className="text-xs text-emerald-400 block mt-0.5 font-medium">
                  {selectedShelterModal.capacity - selectedShelterModal.occupancy} beds available
                </span>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 block mb-1">Elevation Safety</span>
                <span className="text-base font-bold text-emerald-400">+38 meters</span>
                <span className="text-xs text-slate-400 block mt-0.5">Above flood crest</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Available Provisions & Support
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-red-400" />
                  <span>{selectedShelterModal.hasMedical ? '24/7 Paramedic Ward' : 'First-Aid Kit Only'}</span>
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>{selectedShelterModal.hasPower ? 'Solar & Diesel Genset' : 'Grid Dependent'}</span>
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-emerald-400" />
                  <span>{selectedShelterModal.hasFood ? 'Ration & Clean Water' : 'Limited Water'}</span>
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>Helpline: +91 9820-SAFE-01</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setSelectedShelterModal(null)}
              >
                Close
              </Button>
              <Button
                variant="secondary"
                icon={UserCheck}
                onClick={() => handleCheckin(selectedShelterModal)}
              >
                Self Check-In Here
              </Button>
              <Button
                variant="primary"
                icon={Navigation}
                onClick={() => {
                  const id = selectedShelterModal.id;
                  setSelectedShelterModal(null);
                  navigate(`/route?shelter=${id}`);
                }}
              >
                Compute Safe Path
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
};

export default ShelterPage;
