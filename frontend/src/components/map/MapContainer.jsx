import React, { useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '../../utils/constants';
import { createUserLocationIcon } from '../../utils/mapHelpers';
import VictimMarker from './VictimMarker';
import RescueTeamMarker from './RescueTeamMarker';
import ShelterMarker from './ShelterMarker';
import DisasterZoneLayer from './DisasterZoneLayer';
import RoutePolyline from './RoutePolyline';
import MapLegend from './MapLegend';
import MapControls from './MapControls';

const MapContainer = ({
  center = DEFAULT_MAP_CENTER,
  zoom = DEFAULT_MAP_ZOOM,
  victims = [],
  rescueTeams = [],
  shelters = [],
  disaster,
  routes = null,
  userLocation = null,
  showUserLocation = true,
  showDisasterZones = true,
  showLegend = true,
  showControls = true,
  onAssignTeam,
  onSelectVictim,
  onSelectTeam,
  onSelectShelter,
  height = '100%',
  className = ''
}) => {
  const [layers, setLayers] = useState({
    victims: true,
    rescueTeams: true,
    shelters: true,
    disasterZones: true,
  });

  const toggleLayer = (layerName) => {
    setLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const userIcon = createUserLocationIcon();

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-slate-800 shadow-2xl bg-slate-950 ${className}`} style={{ height }}>
      <LeafletMap
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* CartoDB Dark Matter High-Contrast Emergency Base Map */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {/* Disaster Threat Zones & Radial Corridors */}
        {showDisasterZones && layers.disasterZones && disaster && (
          <DisasterZoneLayer zones={disaster.zones} />
        )}

        {/* Evacuation & Incident Route Lines */}
        {routes && <RoutePolyline routes={routes} />}

        {/* Shelters Layer */}
        {layers.shelters && shelters.map(shelter => (
          <ShelterMarker
            key={shelter.id}
            shelter={shelter}
            onSelect={onSelectShelter}
          />
        ))}

        {/* Rescue Teams Layer */}
        {layers.rescueTeams && rescueTeams.map(team => (
          <RescueTeamMarker
            key={team.id}
            team={team}
            onSelect={onSelectTeam}
          />
        ))}

        {/* Victims SOS Layer */}
        {layers.victims && victims.map(victim => (
          <VictimMarker
            key={victim.id}
            victim={victim}
            onAssignTeam={onAssignTeam}
            onSelect={onSelectVictim}
          />
        ))}

        {/* Current User Beacon */}
        {showUserLocation && userLocation && userLocation.lat && userLocation.lng && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup className="user-popup">
              <div className="p-1 text-slate-100 text-xs">
                <span className="font-bold text-blue-400 block mb-1">📍 Current GPS Location</span>
                <p className="text-slate-300 text-[11px]">{userLocation.name || 'Sector 21'}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">
                  {userLocation.lat.toFixed(4)}° N, {userLocation.lng.toFixed(4)}° E
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Map Controls */}
        {showControls && (
          <MapControls
            userLocation={userLocation}
            activeFilters={layers}
            onToggleFilter={toggleLayer}
          />
        )}
      </LeafletMap>

      {/* Map Legend */}
      {showLegend && <MapLegend />}
    </div>
  );
};

export default MapContainer;
