import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Navigation,
  Home,
  BookOpen,
  MapPin,
  Radio,
  HeartPulse,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SOSButton from '../components/victim/SOSButton';
import SOSConfirmModal from '../components/victim/SOSConfirmModal';
import RescueStatusStepper from '../components/victim/RescueStatusStepper';
import LocationCard from '../components/victim/LocationCard';
import RiskStatusCard from '../components/victim/RiskStatusCard';
import EmergencyGuideModal from '../components/victim/EmergencyGuideModal';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useEmergencyData } from '../context/EmergencyDataContext';
import { useAuth } from '../context/AuthContext';
import { sendSOS } from '../services/sosService';

const VictimDashboard = () => {
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [sosSentSuccess, setSosSentSuccess] = useState(false);
  const { user } = useAuth();
  const {
    disaster,
    userLocation,
    activeSOS,
    createSOS,
    updateSOSStatus,
    updateLocation
  } = useEmergencyData();
  const navigate = useNavigate();

  const handleSOSConfirm = async (formData) => {
    // 1. Create local and context state
    const created = createSOS({
      ...formData,
      name: user?.name || formData.name,
      lat: userLocation.lat,
      lng: userLocation.lng
    });

    // 2. Call service layer
    await sendSOS({
      victimId: created.id,
      name: created.name,
      location: { lat: userLocation.lat, lng: userLocation.lng, name: userLocation.name },
      priority: formData.priority,
      peopleCount: formData.peopleCount,
      medicalEmergency: formData.medicalEmergency,
      medicalNotes: formData.medicalNotes
    });

    setSosSentSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Top Emergency Status Banner */}
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-800">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white font-mono flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-500 animate-pulse" />
              Emergency Victim Portal
            </h1>
            <p className="text-xs text-slate-400">
              Logged in as <strong className="text-slate-200">{user?.name || 'Aryan Wasekar'}</strong> • Operational Sector 21
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40">
              🔴 RED ALERT ZONE
            </span>
          </div>
        </div>

        {/* Success Alert Banner when SOS Triggered */}
        {sosSentSuccess && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/50 text-emerald-100 space-y-2 animate-in fade-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm text-emerald-300">🚨 SOS SENT SUCCESSFULLY</h3>
              </div>
              <span className="text-[11px] font-mono bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
                PRIORITY: CRITICAL
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Your emergency request has been received at the central command grid. Rescue teams in Sector 21 have been alerted with your coordinates.
            </p>
          </div>
        )}

        {/* PRIMARY PROMINENT SOS BUTTON */}
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 shadow-2xl backdrop-blur-md">
          <SOSButton
            hasActiveSOS={!!activeSOS}
            onClick={() => setSosModalOpen(true)}
          />
        </div>

        {/* Active Rescue Status Stepper */}
        {activeSOS && (
          <RescueStatusStepper
            sosData={activeSOS}
            onAdvanceStatus={updateSOSStatus}
          />
        )}

        {/* Two Column Grid: Risk Status & GPS Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RiskStatusCard disaster={disaster} />
          <LocationCard userLocation={userLocation} onUpdateLocation={updateLocation} />
        </div>

        {/* Main Action Shortcuts Grid */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            Emergency Action Hub
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Safe Route */}
            <Card
              hover
              onClick={() => navigate('/route')}
              className="p-4 border-slate-800 bg-slate-900/80 hover:border-emerald-500/50 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-105 transition-transform">
                  <Navigation className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">AI ROUTE</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Find Safe Route</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Calculate high-ground evacuation path avoiding flooded underpasses
                </p>
              </div>
            </Card>

            {/* Find Shelter */}
            <Card
              hover
              onClick={() => navigate('/shelters')}
              className="p-4 border-slate-800 bg-slate-900/80 hover:border-indigo-500/50 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:scale-105 transition-transform">
                  <Home className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-indigo-400 font-bold">8 SHELTERS</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Find Nearest Shelter</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Locate verified safe centers with available beds, food, and medical units
                </p>
              </div>
            </Card>

            {/* Emergency Guide */}
            <Card
              hover
              onClick={() => setGuideModalOpen(true)}
              className="p-4 border-slate-800 bg-slate-900/80 hover:border-amber-500/50 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold">SOP GUIDE</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Emergency Protocols</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Standard flood survival guidelines, electrical safety, and drone signaling
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Emergency Numbers Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-rose-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-200">24/7 National Emergency Hotline:</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <a href="tel:112" className="px-3 py-1 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30 font-bold hover:bg-rose-600/30">
              Dial 112 (Disaster)
            </a>
            <a href="tel:108" className="px-3 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-bold hover:bg-emerald-600/30">
              Dial 108 (Ambulance)
            </a>
          </div>
        </div>
      </main>

      {/* SOS Confirmation Modal */}
      <SOSConfirmModal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
        onConfirm={handleSOSConfirm}
        userLocation={userLocation}
        userName={user?.name || 'Aryan Wasekar'}
      />

      {/* Emergency Guide Modal */}
      <EmergencyGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default VictimDashboard;
