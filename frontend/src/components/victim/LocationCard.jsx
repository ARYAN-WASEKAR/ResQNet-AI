import React, { useState } from 'react';
import Card from '../ui/Card';
import Modal from '../common/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { MapPin, Navigation, RefreshCw, Crosshair, Check } from 'lucide-react';
import { formatCoordinates } from '../../utils/formatters';

const LocationCard = ({ userLocation, onUpdateLocation, className = '' }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [lat, setLat] = useState(userLocation?.lat || 18.6275);
  const [lng, setLng] = useState(userLocation?.lng || 73.7512);
  const [name, setName] = useState(userLocation?.name || 'Sector 21, Waterlogged Near Bridge');

  const presets = [
    { name: 'Sector 21 (Flash Flood Zone)', lat: 18.6275, lng: 73.7512 },
    { name: 'Old Sangvi Lowlands', lat: 18.6342, lng: 73.7621 },
    { name: 'Pimple Gurav Main Road', lat: 18.6189, lng: 73.7432 },
    { name: 'Chinchwad Station Road', lat: 18.6410, lng: 73.7820 },
    { name: 'Nigdi High Ground (Safe Ridge)', lat: 18.6590, lng: 73.7610 },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateLocation(lat, lng, name);
    setModalOpen(false);
  };

  const handleApplyPreset = (preset) => {
    setLat(preset.lat);
    setLng(preset.lng);
    setName(preset.name);
  };

  return (
    <>
      <Card variant="glass" className={`space-y-3 ${className}`}>
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
              <MapPin className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Current GPS Location</h3>
          </div>
          <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Live Telemetry
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-bold text-white leading-tight">{userLocation?.name || 'Sector 21, Pavana Flood Zone'}</p>
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1">
            <span>Lat: <strong className="text-slate-200">{Number(userLocation?.lat || 18.6275).toFixed(4)}°</strong></span>
            <span>Lng: <strong className="text-slate-200">{Number(userLocation?.lng || 73.7512).toFixed(4)}°</strong></span>
            <span className="text-[10px] text-blue-300">±12m accuracy</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/80">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setModalOpen(true)}
            icon={Crosshair}
            className="w-full text-xs text-blue-300 border-blue-500/30 hover:bg-blue-500/10"
          >
            Update / Calibrate Location
          </Button>
        </div>
      </Card>

      {/* Update Location Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="📍 Calibrate Emergency GPS Location">
        <form onSubmit={handleSave} className="space-y-4">
          <p className="text-xs text-slate-300">
            Select a simulated disaster hotspot preset or enter precise coordinates to test dynamic routing and risk calculation.
          </p>

          {/* Hotspot Presets */}
          <div className="space-y-1.5">
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Disaster Zone Presets:
            </span>
            <div className="grid grid-cols-1 gap-1.5 max-h-40 overflow-y-auto pr-1">
              {presets.map((p) => {
                const isSelected = lat === p.lat && lng === p.lng;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className={`w-full p-2 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer border ${
                      isSelected
                        ? 'bg-blue-600/30 border-blue-400 text-white'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>{p.name}</span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {p.lat}, {p.lng}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            <Input
              label="Latitude"
              type="number"
              step="0.0001"
              value={lat}
              onChange={(e) => setLat(parseFloat(e.target.value))}
              required
            />
            <Input
              label="Longitude"
              type="number"
              step="0.0001"
              value={lng}
              onChange={(e) => setLng(parseFloat(e.target.value))}
              required
            />
          </div>

          <Input
            label="Location / Landmark Description"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Near Community Center, 2nd floor"
            required
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)} type="button">
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={Check}>
              Apply & Update GPS
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default LocationCard;
