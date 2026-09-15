import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EmergencyDataProvider } from './context/EmergencyDataContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import VictimDashboard from './pages/VictimDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SOSPage from './pages/SOSPage';
import RoutePage from './pages/RoutePage';
import ShelterPage from './pages/ShelterPage';
import DisasterStatusPage from './pages/DisasterStatusPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <EmergencyDataProvider>
        <Router>
          <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
            <Routes>
              {/* Public Landing & Authentication */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Citizen / Victim Endpoints */}
              <Route path="/victim" element={<VictimDashboard />} />
              <Route path="/sos" element={<SOSPage />} />
              <Route path="/route" element={<RoutePage />} />
              <Route path="/shelters" element={<ShelterPage />} />
              <Route path="/disaster" element={<DisasterStatusPage />} />

              {/* Admin / First Responder Command Center */}
              <Route path="/admin" element={<AdminDashboard />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </EmergencyDataProvider>
    </AuthProvider>
  );
}

export default App;
