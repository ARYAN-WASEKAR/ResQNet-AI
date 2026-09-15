import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/ui/Button';
import { RadioTower, AlertTriangle, ArrowLeft, Shield, LifeBuoy } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full bg-slate-900/90 border-2 border-slate-800 flex items-center justify-center shadow-2xl relative">
            <RadioTower className="w-14 h-14 text-rose-400 animate-pulse" />
            <div className="absolute inset-0 rounded-full border border-rose-500/20 animate-ping" />
          </div>
          <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-slate-950">
            404
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
          Sector Coordinates Not Found
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
          The requested emergency channel or URL does not exist or has been relocated due to flood hazard rerouting.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" icon={ArrowLeft}>
              Back to Safe Home
            </Button>
          </Link>
          <Link to="/victim">
            <Button variant="secondary" icon={Shield}>
              Citizen Portal
            </Button>
          </Link>
          <Link to="/sos">
            <Button variant="danger" icon={LifeBuoy}>
              Broadcast SOS
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
