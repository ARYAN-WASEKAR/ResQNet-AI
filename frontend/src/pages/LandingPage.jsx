import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  Activity,
  Navigation,
  Home,
  Radio,
  ArrowRight,
  Zap,
  MapPin,
  Ambulance,
  PhoneCall,
  CheckCircle2,
  Cpu,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useEmergencyData } from '../context/EmergencyDataContext';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { disaster, victims, rescueTeams, shelters } = useEmergencyData();
  const { loginAsVictim, loginAsAdmin } = useAuth();

  const handleEnterVictim = () => {
    loginAsVictim();
    navigate('/victim');
  };

  const handleEnterAdmin = () => {
    loginAsAdmin();
    navigate('/admin');
  };

  const features = [
    {
      icon: Cpu,
      title: 'AI Disaster Risk Prediction',
      desc: 'Multimodal sensor fusion analyzes flood gauges, precipitation velocity, and topographic elevation to predict flash inundation hotspots before disaster strikes.',
      badge: 'Machine Learning',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
    },
    {
      icon: Navigation,
      title: 'Intelligent Evacuation',
      desc: 'Graph-based pathfinding calculates hazard-free escape routes in real time, avoiding submerged underpasses, debris zones, and fast-flowing torrents.',
      badge: 'Dijkstra / BFS',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      icon: ShieldAlert,
      title: 'Priority-Based Rescue',
      desc: 'Automated Max-Heap triage algorithm prioritizes medical emergencies, infants, elderly citizens, and rapidly rising water depths for immediate rescue dispatch.',
      badge: 'Max-Heap Triage',
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/30'
    },
    {
      icon: Activity,
      title: 'Real-Time Disaster Map',
      desc: 'Interactive GIS visualization with live telemetry tracking of distress signals, dispatched rescue boats, ALS ambulances, and hazard radius perimeters.',
      badge: 'Live GIS Grid',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    },
    {
      icon: Home,
      title: 'Smart Shelter Discovery',
      desc: 'Real-time capacity tracking monitors available beds, medical supplies, backup generators, and provides turn-by-turn routing to the nearest safe sanctuary.',
      badge: 'Resource Optimizer',
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
    }
  ];

  const workflowSteps = [
    { step: '01', title: 'Detect', desc: 'IoT river gauges & rainfall radar record anomaly telemetry.', icon: Radio },
    { step: '02', title: 'Predict', desc: 'AI risk model estimates flood surge boundaries and depth.', icon: Cpu },
    { step: '03', title: 'Locate', desc: 'Victims broadcast GPS distress coordinates via 1-tap SOS.', icon: MapPin },
    { step: '04', title: 'Route', desc: 'Graph algorithm identifies safest unobstructed ridge paths.', icon: Navigation },
    { step: '05', title: 'Rescue', desc: 'NDRF/SDRF units dispatched via prioritized triage queue.', icon: Ambulance },
    { step: '06', title: 'Shelter', desc: 'Evacuees safely received at designated high-ground refuges.', icon: Home }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800">
        {/* Radar Background Visual Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-rose-300 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span className="font-mono uppercase tracking-wider">CRITICAL INCIDENT SYSTEM ACTIVE</span>
            </div>

            {/* Main Titles */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-mono tracking-tight leading-none">
              ResQNet <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-red-500 to-amber-500">AI</span>
            </h1>

            <p className="text-lg sm:text-2xl font-bold text-slate-200 tracking-tight">
              AI-Powered Disaster Rescue & Evacuation Network
            </p>

            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Predict danger. Find safer routes. Prioritize rescue. Protect lives.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                variant="emergency"
                size="lg"
                onClick={handleEnterVictim}
                icon={ShieldAlert}
                className="w-full sm:w-auto text-base px-8 py-4 shadow-2xl shadow-rose-600/50"
              >
                Enter Emergency System
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={handleEnterAdmin}
                icon={ShieldCheck}
                className="w-full sm:w-auto text-base px-8 py-4 border-slate-700 hover:bg-slate-800"
              >
                Rescue Command Center
              </Button>
            </div>

            {/* Key Quick Stats Bar */}
            <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Active SOS</span>
                <span className="font-mono font-black text-2xl text-rose-400">{victims.length}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Rescue Units</span>
                <span className="font-mono font-black text-2xl text-cyan-400">{rescueTeams.length} Active</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Safe Shelters</span>
                <span className="font-mono font-black text-2xl text-indigo-400">{shelters.length} Verified</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Threat Level</span>
                <span className="font-mono font-black text-2xl text-amber-400">{disaster?.riskScore || 87}% Critical</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Pipeline */}
      <section className="py-16 bg-slate-900/40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-rose-400 uppercase tracking-widest font-mono">
              Algorithmic Disaster Lifecycle
            </h2>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              How ResQNet AI Operates in Emergencies
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="relative p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-center flex flex-col items-center justify-between"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono font-black text-rose-400 flex items-center justify-center mb-3">
                    {step.step}
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 mb-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">{step.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-rose-400 uppercase tracking-widest font-mono">
            Key Capabilities
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Built for Real Emergency Command & Citizen Protection
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Card
                key={idx}
                variant="glass"
                className="p-6 space-y-4 border-slate-800 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl border ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {feat.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-bold text-white">{feat.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Emergency Action Banner */}
      <section className="py-12 bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-rose-500/20 text-rose-300 text-xs font-bold">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Are you in immediate danger or cut off by rising waters?</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-white font-mono">
            Do not wait. Broadcast your coordinates now.
          </h3>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="emergency"
              size="lg"
              onClick={handleEnterVictim}
              icon={ShieldAlert}
              className="text-base px-8 py-4"
            >
              SEND EMERGENCY SOS
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
