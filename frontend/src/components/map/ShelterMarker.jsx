import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { createShelterIcon } from '../../utils/mapHelpers';
import { Home, Users, CheckCircle2, Navigation, HeartHandshake } from 'lucide-react';
import { formatDistance } from '../../utils/formatters';

const ShelterMarker = ({ shelter, onSelect }) => {
  const navigate = useNavigate();
  if (!shelter || !shelter.lat || !shelter.lng) return null;

  const icon = createShelterIcon(shelter.status === 'SAFE');
  const occupancyPercent = Math.round((shelter.occupied / shelter.capacity) * 100);

  return (
    <Marker
      position={[shelter.lat, shelter.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onSelect && onSelect(shelter),
      }}
    >
      <Popup className="shelter-popup">
        <div className="w-64 p-1 text-slate-100 font-sans">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-700/80 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-black text-indigo-400 text-sm">{shelter.id}</span>
              <span className="font-bold text-white text-xs truncate max-w-[130px]">{shelter.name}</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                shelter.status === 'SAFE'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              {shelter.status}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-2 text-xs">
            <p className="text-[11px] text-slate-400 leading-tight">{shelter.address}</p>

            {/* Capacity Meter */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-slate-300 text-[11px]">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-slate-400" /> Occupancy:
                </span>
                <span className="font-mono font-bold">
                  {shelter.occupied} / {shelter.capacity} ({occupancyPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    occupancyPercent > 85 ? 'bg-rose-500' : occupancyPercent > 60 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(occupancyPercent, 100)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
              <span>Available Beds: <strong className="text-emerald-400">{shelter.available}</strong></span>
              <span>Distance: <strong className="text-slate-200">{formatDistance(shelter.distanceKm)}</strong></span>
            </div>

            {/* Quick Route Action */}
            <button
              type="button"
              onClick={() => navigate(`/route?destination=${shelter.id}`)}
              className="w-full mt-2 py-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/30"
            >
              <Navigation className="w-3.5 h-3.5" />
              Navigate Safe Route
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default ShelterMarker;
