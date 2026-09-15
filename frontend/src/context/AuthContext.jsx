import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('resqnet_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return {
      role: 'victim',
      name: 'Aryan Wasekar',
      email: 'aryan@example.com',
      phone: '+91 98234 56789',
      id: 'V001',
      location: { lat: 18.6275, lng: 73.7512, name: 'Sector 21, Pavana Flood Zone' }
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('resqnet_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('resqnet_auth_user');
    }
  }, [user]);

  const loginAsVictim = (data = {}) => {
    const victimUser = {
      role: 'victim',
      id: data.id || 'V001',
      name: data.name || 'Aryan Wasekar',
      email: data.email || 'victim@resqnet.ai',
      phone: data.phone || '+91 98234 56789',
      location: data.location || { lat: 18.6275, lng: 73.7512, name: 'Sector 21, Pavana Flood Zone' }
    };
    setUser(victimUser);
    return victimUser;
  };

  const loginAsAdmin = (data = {}) => {
    const adminUser = {
      role: 'admin',
      id: 'ADM-01',
      name: data.name || 'Commander Rajiv Nair',
      email: data.email || 'commander@resqnet.gov.in',
      callsign: 'RESCUE-LEAD-1',
      sector: 'Pimpri-Chinchwad Disaster Sector'
    };
    setUser(adminUser);
    return adminUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginAsVictim, loginAsAdmin, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
