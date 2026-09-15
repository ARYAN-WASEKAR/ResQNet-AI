export const initialMockRoutes = {
  recommended: {
    id: 'ROUTE-SAFE-01',
    name: 'Elevated High-Ridge Evacuation Path',
    risk: 'LOW',
    riskLabel: 'SAFE (AI Recommended)',
    color: '#10b981', // Emerald
    distanceKm: 3.4,
    estimatedMinutes: 14,
    safetyScore: 96,
    waypoints: [
      { lat: 18.6275, lng: 73.7512, name: 'Current Location (Sector 21)', elevation: 580, hazard: 'None' },
      { lat: 18.6310, lng: 73.7540, name: 'Waypoint A: Link Road Flyover Ramp', elevation: 588, hazard: 'Elevated Bridge' },
      { lat: 18.6390, lng: 73.7580, name: 'Waypoint B: Spine Road Arterial', elevation: 590, hazard: 'Clear High Ground' },
      { lat: 18.6470, lng: 73.7610, name: 'Waypoint C: Pradhikaran Green Belt', elevation: 594, hazard: 'Dry Corridor' },
      { lat: 18.6540, lng: 73.7650, name: 'Destination: Safe Center Alpha (Nigdi)', elevation: 592, hazard: 'Designated Shelter' }
    ],
    coordinates: [
      [18.6275, 73.7512],
      [18.6310, 73.7540],
      [18.6355, 73.7565],
      [18.6390, 73.7580],
      [18.6430, 73.7595],
      [18.6470, 73.7610],
      [18.6510, 73.7630],
      [18.6540, 73.7650]
    ],
    instructions: [
      { step: 1, text: 'Head northeast on Sector 21 toward Flyover Ramp', dist: '400 m', safe: true },
      { step: 2, text: 'Ascend onto elevated Spine Road Arterial (Bypass floodwaters)', dist: '1.2 km', safe: true },
      { step: 3, text: 'Continue along Pradhikaran Ridge Road past Sector 24', dist: '1.1 km', safe: true },
      { step: 4, text: 'Turn right at City Pride Junction toward Safe Center Alpha', dist: '700 m', safe: true }
    ]
  },
  blocked: {
    id: 'ROUTE-BLOCKED-01',
    name: 'Direct Underpass Corridor (BLOCKED)',
    risk: 'CRITICAL',
    riskLabel: 'IMPASSABLE - SUBMERGED',
    color: '#ef4444', // Red
    distanceKm: 2.1,
    estimatedMinutes: 0,
    safetyScore: 12,
    blockageReason: '4.5 ft torrential floodwater and structural debris under railway bridge',
    coordinates: [
      [18.6275, 73.7512],
      [18.6320, 73.7525],
      [18.6360, 73.7540],
      [18.6400, 73.7580],
      [18.6540, 73.7650]
    ]
  },
  highRisk: {
    id: 'ROUTE-RISK-01',
    name: 'Riverbank Secondary Road (HIGH RISK)',
    risk: 'HIGH',
    riskLabel: 'HIGH RISK - FAST CURRENT',
    color: '#f97316', // Orange
    distanceKm: 2.7,
    estimatedMinutes: 22,
    safetyScore: 42,
    hazardWarning: 'Water level 1.8 ft and rising. Unstable shoulder ground.',
    coordinates: [
      [18.6275, 73.7512],
      [18.6240, 73.7580],
      [18.6310, 73.7660],
      [18.6420, 73.7680],
      [18.6540, 73.7650]
    ]
  }
};
