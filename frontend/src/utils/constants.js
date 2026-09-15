export const RISK_LEVELS = {
  SAFE: {
    label: 'SAFE',
    color: 'emerald',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    dotClass: 'bg-emerald-400',
    icon: '🟢',
    scoreRange: [0, 25],
  },
  WARNING: {
    label: 'WARNING',
    color: 'amber',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    dotClass: 'bg-amber-400',
    icon: '🟡',
    scoreRange: [26, 50],
  },
  HIGH_RISK: {
    label: 'HIGH RISK',
    color: 'orange',
    badgeClass: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    dotClass: 'bg-orange-400',
    icon: '🟠',
    scoreRange: [51, 75],
  },
  CRITICAL: {
    label: 'CRITICAL',
    color: 'rose',
    badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/40 animate-pulse',
    dotClass: 'bg-rose-500 shadow-lg shadow-rose-500/50',
    icon: '🔴',
    scoreRange: [76, 100],
  },
};

export const SOS_STATUS = {
  WAITING: 'Waiting',
  ASSIGNED: 'Assigned',
  EN_ROUTE: 'En Route',
  RESCUED: 'Rescued',
  CANCELLED: 'Cancelled',
};

export const RESCUE_TEAM_STATUS = {
  AVAILABLE: 'AVAILABLE',
  BUSY: 'BUSY',
  EN_ROUTE: 'EN ROUTE',
  OFFLINE: 'OFFLINE',
};

export const DEFAULT_MAP_CENTER = [18.6275, 73.7512]; // Operational Sector (Zone A/Pimpri-Chinchwad)
export const DEFAULT_MAP_ZOOM = 13;

export const DISASTER_TYPES = {
  FLOOD: 'Heavy Urban Flood & Inundation',
  CYCLONE: 'Tropical Cyclone & Gale Winds',
  LANDSLIDE: 'Slope Collapse & Mudflow',
  EARTHQUAKE: 'Structural Seismic Incident',
};
