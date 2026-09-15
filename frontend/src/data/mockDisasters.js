export const initialMockDisaster = {
  id: 'DIS-2026-FL09',
  name: 'Pavana Basin Flash Inundation & Cloudburst',
  type: 'FLOOD',
  riskLevel: 'CRITICAL',
  riskScore: 87,
  affectedAreaKm2: 4.8,
  estimatedAffectedPopulation: 14200,
  activeHotspotsCount: 6,
  lastUpdated: new Date().toISOString(),
  headline: 'Severe flood surge detected along Pavana River Corridor. Inundation depth exceeding 4.2 feet in Zone A.',
  weatherMetrics: {
    rainfallMmHour: 142,
    rainfallTrend: 'RISING',
    riverWaterLevelMeters: 8.4,
    dangerMarkMeters: 7.0,
    waterVelocityKmh: 18.5,
    windSpeedKmh: 48,
    temperatureCelsius: 24,
    powerGridStatus: '70% OFFLINE',
  },
  evacuationAdvisory: 'Immediate high-ground evacuation mandatory for Sector 21, Old Sangvi, and low-lying riverfront corridors.',
  zones: [
    {
      id: 'ZONE-A',
      name: 'Sector 21 / Pavana Riverbank Flash Corridor',
      risk: 'CRITICAL',
      riskScore: 94,
      center: [18.6250, 73.7550],
      radiusMeters: 1400,
      floodDepthMeters: 1.4,
      color: '#ef4444',
      status: 'RED ALERT - SUBMERGED',
      description: 'Severe waterlogging, bridge access cut off.'
    },
    {
      id: 'ZONE-B',
      name: 'Old Sangvi Lowland Inundation Basin',
      risk: 'HIGH',
      riskScore: 78,
      center: [18.6180, 73.7450],
      radiusMeters: 1100,
      floodDepthMeters: 0.9,
      color: '#f97316',
      status: 'ORANGE ALERT - RAPID RISING',
      description: 'Ground floors inundated, high debris flow.'
    },
    {
      id: 'ZONE-C',
      name: 'Chinchwad Station Road Hazard Perimeter',
      risk: 'WARNING',
      riskScore: 48,
      center: [18.6420, 73.7800],
      radiusMeters: 900,
      floodDepthMeters: 0.3,
      color: '#eab308',
      status: 'YELLOW ALERT - CAUTION',
      description: 'Localized flash puddles, traffic diversion active.'
    }
  ]
};
