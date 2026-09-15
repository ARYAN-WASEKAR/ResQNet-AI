import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, MapPin, Navigation, Home, CheckCircle2, PhoneCall, RefreshCw, AlertTriangle } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SOSButton from '../components/victim/SOSButton';
import SOSConfirmModal from '../components/victim/SOSConfirmModal';
import RescueStatusStepper from '../components/victim/RescueStatusStepper';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useEmergencyData } from '../context/EmergencyDataContext';
import { useAuth } from '../context/AuthContext';
import { formatCoordinates } from '../utils/formatters';

const SOSPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { userLocation, activeSOS, createSOS, updateSOSStatus } = useEmergencyData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleConfirm = async (formData) => {
    createSOS({
      ...formData,
      name: user?.name || formData.name,
      lat: userLocation.lat,
      lng: userLocation.lng
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-mono font-bold border border-rose-500/40">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            LIVE EMERGENCY SOS BROADCAST
          </div>
          <h1 className="text-3xl font-black text-white font-mono">Emergency Rescue Signal</h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Broadcasting directly connects you with NDRF disaster control and local first responders.
          </p>
        </div>

        {/* SOS Button Display */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md">
          <SOSButton
            hasActiveSOS={!!activeSOS}
            onClick={() => setModalOpen(true)}
          />
        </div>

        {/* Live Stepper if active */}
        {activeSOS && (
          <RescueStatusStepper
            sosData={activeSOS}
            onAdvanceStatus={updateSOSStatus}
          />
        )}

        {/* GPS Broadcast Pill */}
        <Card variant="glass" className="p-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">{userLocation?.name || 'Sector 21, Pavana Flood Zone'}</span>
              <span className="text-[10px] text-slate-400 font-mono">
                {formatCoordinates(userLocation?.lat, userLocation?.lng)}
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px] border border-emerald-500/30">
            GPS Transmitting
          </span>
        </Card>

        {/* Alternative Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/route')}
            icon={Navigation}
            className="text-xs py-3"
          >
            Find Safe Route
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/shelters')}
            icon={Home}
            className="text-xs py-3"
          >
            Nearby Shelters
          </Button>
        </div>
      </main>

      <SOSConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        userLocation={userLocation}
        userName={user?.name || 'Aryan Wasekar'}
      />

      <Footer />
    </div>
  );
};

export default SOSPage;
