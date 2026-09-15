import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import { AlertTriangle, Droplets } from 'lucide-react';

const DisasterZoneLayer = ({ zones = [] }) => {
  if (!zones || zones.length === 0) return null;

  return (
    <>
      {zones.map((zone) => {
        const isCritical = zone.risk === 'CRITICAL';
        const isHigh = zone.risk === 'HIGH';

        const color = isCritical ? '#ef4444' : isHigh ? '#f97316' : '#eab308';
        const fillColor = isCritical ? '#ef4444' : isHigh ? '#f97316' : '#eab308';

        return (
          <Circle
            key={zone.id}
            center={zone.center}
            radius={zone.radiusMeters}
            pathOptions={{
              color,
              fillColor,
              fillOpacity: isCritical ? 0.25 : 0.18,
              weight: isCritical ? 2.5 : 1.8,
              dashArray: isCritical ? '6, 6' : undefined,
            }}
          >
            <Popup className="zone-popup">
              <div className="w-56 p-1 text-slate-100 font-sans">
                <div className="flex items-center gap-2 pb-1.5 border-b border-slate-700 mb-2">
                  <AlertTriangle className={`w-4 h-4 ${isCritical ? 'text-rose-500' : 'text-orange-500'}`} />
                  <div>
                    <h4 className="font-bold text-xs text-white leading-tight">{zone.name}</h4>
                    <span className="text-[10px] font-mono text-rose-400 font-bold">{zone.status}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <p className="text-[11px] text-slate-400">{zone.description}</p>
                  
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px]">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Droplets className="w-3 h-3 text-cyan-400" /> Flood Depth:
                    </span>
                    <span className="font-mono font-bold text-cyan-300">{zone.floodDepthMeters} m</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Risk Severity:</span>
                    <span className="font-mono font-bold text-rose-400">{zone.riskScore}%</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Circle>
        );
      })}
    </>
  );
};

export default DisasterZoneLayer;
