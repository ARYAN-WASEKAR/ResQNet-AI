import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialMockVictims } from '../data/mockVictims';
import { initialMockShelters } from '../data/mockShelters';
import { initialMockRescueTeams } from '../data/mockRescueTeams';
import { initialMockDisaster } from '../data/mockDisasters';
import { initialMockRoutes } from '../data/mockRoutes';

const EmergencyDataContext = createContext(null);

export const EmergencyDataProvider = ({ children }) => {
  // Victims state
  const [victims, setVictims] = useState(() => {
    const saved = localStorage.getItem('resqnet_victims');
    return saved ? JSON.parse(saved) : initialMockVictims;
  });

  // Shelters state
  const [shelters, setShelters] = useState(() => {
    const saved = localStorage.getItem('resqnet_shelters');
    return saved ? JSON.parse(saved) : initialMockShelters;
  });

  // Rescue Teams state
  const [rescueTeams, setRescueTeams] = useState(() => {
    const saved = localStorage.getItem('resqnet_rescue_teams');
    return saved ? JSON.parse(saved) : initialMockRescueTeams;
  });

  // Disaster Telemetry state
  const [disaster, setDisaster] = useState(() => {
    const saved = localStorage.getItem('resqnet_disaster');
    return saved ? JSON.parse(saved) : initialMockDisaster;
  });

  // Routes state
  const [routes, setRoutes] = useState(initialMockRoutes);

  // User current location (simulated or real)
  const [userLocation, setUserLocation] = useState({
    lat: 18.6275,
    lng: 73.7512,
    accuracy: 12,
    name: 'Sector 21, Waterlogged Near Bridge'
  });

  // Active Victim SOS State
  const [activeSOS, setActiveSOS] = useState(() => {
    const saved = localStorage.getItem('resqnet_active_sos');
    if (saved) return JSON.parse(saved);
    // Find if V001 is active in mock list
    const found = initialMockVictims.find(v => v.id === 'V001');
    return found || null;
  });

  // Persist to localStorage for demo persistence
  useEffect(() => {
    localStorage.setItem('resqnet_victims', JSON.stringify(victims));
  }, [victims]);

  useEffect(() => {
    localStorage.setItem('resqnet_shelters', JSON.stringify(shelters));
  }, [shelters]);

  useEffect(() => {
    localStorage.setItem('resqnet_rescue_teams', JSON.stringify(rescueTeams));
  }, [rescueTeams]);

  useEffect(() => {
    localStorage.setItem('resqnet_disaster', JSON.stringify(disaster));
  }, [disaster]);

  useEffect(() => {
    if (activeSOS) {
      localStorage.setItem('resqnet_active_sos', JSON.stringify(activeSOS));
    } else {
      localStorage.removeItem('resqnet_active_sos');
    }
  }, [activeSOS]);

  // Send / Create SOS Request
  const createSOS = (sosDetails = {}) => {
    const newSOS = {
      id: `V${String(victims.length + 1).padStart(3, '0')}`,
      name: sosDetails.name || 'Current User',
      phone: sosDetails.phone || '+91 98234 56789',
      locationName: userLocation.name || 'Sector 21, Pavana Basin',
      lat: userLocation.lat,
      lng: userLocation.lng,
      priority: sosDetails.priority || 'CRITICAL',
      priorityScore: sosDetails.priorityScore || 95,
      status: 'Waiting',
      assignedTeam: null,
      peopleCount: Number(sosDetails.peopleCount) || 1,
      medicalEmergency: Boolean(sosDetails.medicalEmergency),
      medicalNotes: sosDetails.medicalNotes || 'Critical distress signal sent via app',
      reportedAt: new Date().toISOString(),
      zone: 'Zone A - Flash Flood Sector'
    };

    setVictims(prev => [newSOS, ...prev]);
    setActiveSOS(newSOS);
    return newSOS;
  };

  // Assign Rescue Team to Victim
  const assignTeamToVictim = (victimId, teamId) => {
    setVictims(prev => prev.map(v => {
      if (v.id === victimId) {
        return { ...v, status: 'Assigned', assignedTeam: teamId };
      }
      return v;
    }));

    setRescueTeams(prev => prev.map(t => {
      if (t.id === teamId) {
        return { ...t, status: 'EN ROUTE', currentAssignment: victimId };
      }
      return t;
    }));

    if (activeSOS && activeSOS.id === victimId) {
      setActiveSOS(prev => ({ ...prev, status: 'Assigned', assignedTeam: teamId }));
    }
  };

  // Advance SOS Status (e.g. Waiting -> Assigned -> En Route -> Rescued)
  const updateSOSStatus = (victimId, newStatus) => {
    setVictims(prev => prev.map(v => {
      if (v.id === victimId) {
        return { ...v, status: newStatus };
      }
      return v;
    }));

    if (activeSOS && activeSOS.id === victimId) {
      setActiveSOS(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Update User Location
  const updateLocation = (newLat, newLng, name) => {
    setUserLocation(prev => ({
      ...prev,
      lat: Number(newLat),
      lng: Number(newLng),
      name: name || `Lat: ${Number(newLat).toFixed(4)}, Lng: ${Number(newLng).toFixed(4)}`
    }));
  };

  // Reset to default mock data (handy for demo restart)
  const resetToDefaultMockData = () => {
    setVictims(initialMockVictims);
    setShelters(initialMockShelters);
    setRescueTeams(initialMockRescueTeams);
    setDisaster(initialMockDisaster);
    setRoutes(initialMockRoutes);
    const v1 = initialMockVictims.find(v => v.id === 'V001');
    setActiveSOS(v1 || null);
    localStorage.clear();
  };

  return (
    <EmergencyDataContext.Provider
      value={{
        victims,
        shelters,
        rescueTeams,
        disaster,
        routes,
        userLocation,
        activeSOS,
        createSOS,
        assignTeamToVictim,
        updateSOSStatus,
        updateLocation,
        resetToDefaultMockData,
      }}
    >
      {children}
    </EmergencyDataContext.Provider>
  );
};

export const useEmergencyData = () => {
  const context = useContext(EmergencyDataContext);
  if (!context) {
    throw new Error('useEmergencyData must be used within an EmergencyDataProvider');
  }
  return context;
};
