import React from 'react';
import Modal from '../common/Modal';
import { BookOpen, ShieldAlert, ZapOff, LifeBuoy, Flashlight, PhoneCall, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';

const EmergencyGuideModal = ({ isOpen, onClose }) => {
  const protocols = [
    {
      icon: LifeBuoy,
      title: '1. Move to Elevated High Ground',
      desc: 'Evacuate ground floors and basements immediately. Ascend to 2nd floor terraces or high-ridge evacuation points. Never walk into flowing water deeper than 6 inches.',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    },
    {
      icon: ZapOff,
      title: '2. Cut Electrical & Gas Mains',
      desc: 'If water approaches switchboards, shut down the main power breaker to prevent electrocution. Disconnect LPG cylinders and keep valves firmly shut.',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      icon: Flashlight,
      title: '3. Signal Recon Drones & Rescue Boats',
      desc: 'Use phone flashlights (3 short, 3 long flashes = S-O-S), bright red/yellow cloths, or whistle payloads to signal NDRF/SDRF drones overhead.',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      icon: ShieldAlert,
      title: '4. Keep Important Documents & Medications',
      desc: 'Seal prescriptions, ID cards, and emergency rations inside waterproof plastic bags. Keep battery power strictly reserved for emergency dispatch.',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📋 Disaster Emergency Protocols & Instructions" maxWidth="max-w-xl">
      <div className="space-y-4 text-xs text-slate-300">
        <p className="text-slate-300 leading-relaxed">
          Standard Operating Procedures (SOP) approved by National & State Disaster Management Authorities (NDMA/SDMA) for urban flood and cyclone emergencies.
        </p>

        <div className="space-y-3">
          {protocols.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className={`p-3.5 rounded-xl border ${p.color} flex items-start gap-3`}>
                <div className="p-2 rounded-lg bg-black/20 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs mb-1">{p.title}</h4>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Helpline Box */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-rose-400" />
            <span className="font-semibold text-slate-200">National Emergency Help: <strong>112 / 108</strong></span>
          </div>
          <span className="font-mono text-emerald-400 font-bold">24x7 Active</span>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <Button variant="primary" size="sm" onClick={onClose}>
            Understood
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EmergencyGuideModal;
