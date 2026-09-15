import L from 'leaflet';

// Fix standard default icon assets issue in Leaflet + Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Victim DivIcon
export const createVictimIcon = (priority = 'CRITICAL', isWaiting = true) => {
  const isCritical = String(priority).toUpperCase() === 'CRITICAL' || String(priority) === '1';
  const isHigh = String(priority).toUpperCase() === 'HIGH' || String(priority) === '2';
  
  const bgClass = isCritical 
    ? 'bg-rose-600 border-rose-400' 
    : isHigh 
      ? 'bg-orange-500 border-orange-300' 
      : 'bg-amber-500 border-amber-300';

  const pulseRing = isCritical && isWaiting 
    ? `<div class="absolute -inset-2 rounded-full bg-rose-500/40 animate-ping"></div>
       <div class="absolute -inset-3 rounded-full bg-rose-500/20 animate-pulse"></div>` 
    : '';

  const html = `
    <div class="relative flex items-center justify-center w-8 h-8">
      ${pulseRing}
      <div class="relative z-10 w-8 h-8 rounded-full ${bgClass} border-2 shadow-lg flex items-center justify-center text-white font-bold text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
      <div class="absolute -bottom-1 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-white/40"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-victim-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Custom Rescue Team DivIcon
export const createRescueTeamIcon = (status = 'AVAILABLE') => {
  const isAvailable = status === 'AVAILABLE';
  const isEnRoute = status === 'EN ROUTE';

  const bgClass = isAvailable 
    ? 'bg-emerald-600 border-emerald-300' 
    : isEnRoute 
      ? 'bg-cyan-600 border-cyan-300 animate-pulse' 
      : 'bg-slate-600 border-slate-400';

  const html = `
    <div class="relative flex items-center justify-center w-9 h-9">
      <div class="w-9 h-9 rounded-xl ${bgClass} border-2 shadow-xl flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 17h4V5H10z"/>
          <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h6z"/>
          <path d="M14 17H9"/>
          <circle cx="7.5" cy="17.5" r="2.5"/>
          <circle cx="17.5" cy="17.5" r="2.5"/>
        </svg>
      </div>
      <div class="absolute -bottom-1 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-white/40"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-team-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

// Custom Shelter DivIcon
export const createShelterIcon = (isSafe = true) => {
  const bgClass = isSafe ? 'bg-indigo-600 border-indigo-300' : 'bg-rose-700 border-rose-400';

  const html = `
    <div class="relative flex items-center justify-center w-8 h-8">
      <div class="w-8 h-8 rounded-lg ${bgClass} border-2 shadow-lg flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </div>
      <div class="absolute -bottom-1 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-white/40"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-shelter-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Current User Marker
export const createUserLocationIcon = () => {
  const html = `
    <div class="relative flex items-center justify-center w-7 h-7">
      <div class="absolute -inset-2 rounded-full bg-blue-500/40 animate-ping"></div>
      <div class="w-5 h-5 rounded-full bg-blue-500 border-2 border-white shadow-xl flex items-center justify-center">
        <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-user-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};
