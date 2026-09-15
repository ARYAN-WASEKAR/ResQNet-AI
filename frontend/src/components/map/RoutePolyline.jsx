import React from 'react';
import { Polyline, Popup } from 'react-leaflet';
import { Navigation, AlertOctagon, AlertTriangle } from 'lucide-react';

const RoutePolyline = ({ routes, showAlternatives = true }) => {
  if (!routes) return null;

  const { recommended, blocked, highRisk } = routes;

  return (
    <>
      {/* Recommended Safe Route */}
      {recommended && recommended.coordinates && (
        <Polyline
          positions={recommended.coordinates}
          pathOptions={{
            color: '#10b981',
            weight: 5,
            opacity: 0.9,
            lineCap: 'round',
            lineJoin: 'round',
          }}
        >
          <Popup className="route-popup">
            <div className="w-52 p-1 text-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                <Navigation className="w-4 h-4" />
                <span>🟢 Safe Evacuation Corridor</span>
              </div>
              <p className="text-slate-300 text-[11px] mb-1.5">{recommended.name}</p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-1">
                <span>Distance: <strong>{recommended.distanceKm} km</strong></span>
                <span>ETA: <strong className="text-emerald-300">{recommended.estimatedMinutes} mins</strong></span>
              </div>
            </div>
          </Popup>
        </Polyline>
      )}

      {/* Blocked Hazardous Road */}
      {showAlternatives && blocked && blocked.coordinates && (
        <Polyline
          positions={blocked.coordinates}
          pathOptions={{
            color: '#ef4444',
            weight: 4,
            opacity: 0.75,
            dashArray: '8, 8',
          }}
        >
          <Popup className="route-popup">
            <div className="w-52 p-1 text-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold mb-1">
                <AlertOctagon className="w-4 h-4" />
                <span>🔴 Road Blocked / Impassable</span>
              </div>
              <p className="text-rose-200 text-[11px]">{blocked.blockageReason || 'Submerged and structural risk'}</p>
            </div>
          </Popup>
        </Polyline>
      )}

      {/* High-Risk Secondary Path */}
      {showAlternatives && highRisk && highRisk.coordinates && (
        <Polyline
          positions={highRisk.coordinates}
          pathOptions={{
            color: '#f97316',
            weight: 3.5,
            opacity: 0.7,
            dashArray: '6, 6',
          }}
        >
          <Popup className="route-popup">
            <div className="w-52 p-1 text-slate-100 text-xs">
              <div className="flex items-center gap-1.5 text-orange-400 font-bold mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>🟠 High-Risk Secondary Route</span>
              </div>
              <p className="text-orange-200 text-[11px]">{highRisk.hazardWarning || 'High current & rising water'}</p>
            </div>
          </Popup>
        </Polyline>
      )}
    </>
  );
};

export default RoutePolyline;
