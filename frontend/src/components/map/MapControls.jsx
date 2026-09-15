import React from 'react';
import { Crosshair, ShieldAlert, Home, Ambulance, Radio } from 'lucide-react';
import { useMap } from 'react-leaflet';
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '../../utils/constants';

const MapControls = ({
  userLocation,
  activeFilters,
  onToggleFilter,
  className = ''
}) => {
  const map = useMap();

  const handleCenterUser = () => {
    if (userLocation && userLocation.lat && userLocation.lng) {
      map.flyTo([userLocation.lat, userLocation.lng], 15, { animate: true, duration: 1.2 });
    }
  };

  const handleResetSector = () => {
    map.flyTo(DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, { animate: true, duration: 1.2 });
  };

  return (
    <div className={`absolute top-4 right-4 z-[1000] flex flex-col gap-2 ${className}`}>
      {/* Recenter / Focus Controls */}
      <div className="flex flex-col rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 shadow-xl overflow-hidden">
        <button
          type="button"
          onClick={handleCenterUser}
          title="Center on My Location"
          className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border-b border-slate-800 cursor-pointer flex items-center justify-center"
        >
          <Crosshair className="w-4 h-4 text-blue-400" />
        </button>
        <button
          type="button"
          onClick={handleResetSector}
          title="Reset to Full Operational Sector"
          className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center"
        >
          <Radio className="w-4 h-4 text-rose-500" />
        </button>
      </div>

      {/* Layer Toggles */}
      {activeFilters && onToggleFilter && (
        <div className="flex flex-col rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 shadow-xl overflow-hidden text-xs">
          <button
            type="button"
            onClick={() => onToggleFilter('victims')}
            title="Toggle Victims Layer"
            className={`p-2.5 flex items-center justify-center transition-colors border-b border-slate-800 cursor-pointer ${
              activeFilters.victims ? 'text-rose-400 bg-rose-500/10' : 'text-slate-500 hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onToggleFilter('rescueTeams')}
            title="Toggle Rescue Teams Layer"
            className={`p-2.5 flex items-center justify-center transition-colors border-b border-slate-800 cursor-pointer ${
              activeFilters.rescueTeams ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 hover:bg-slate-800'
            }`}
          >
            <Ambulance className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onToggleFilter('shelters')}
            title="Toggle Shelters Layer"
            className={`p-2.5 flex items-center justify-center transition-colors cursor-pointer ${
              activeFilters.shelters ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-500 hover:bg-slate-800'
            }`}
          >
            <Home className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MapControls;
