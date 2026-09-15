import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { AlertTriangle, MapPin, Users, HeartPulse, ShieldAlert, Check } from 'lucide-react';
import { formatCoordinates } from '../../utils/formatters';

const SOSConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  userLocation,
  userName = 'Aryan Wasekar'
}) => {
  const [peopleCount, setPeopleCount] = useState(1);
  const [medicalEmergency, setMedicalEmergency] = useState(true);
  const [medicalNotes, setMedicalNotes] = useState('Elderly person with insulin need, water level 4ft');
  const [priority, setPriority] = useState('CRITICAL');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await onConfirm({
      name: userName,
      peopleCount: Number(peopleCount),
      medicalEmergency,
      medicalNotes: medicalEmergency ? medicalNotes : 'Standard evacuation request',
      priority,
      priorityScore: priority === 'CRITICAL' ? 95 : priority === 'HIGH' ? 80 : 55
    });
    setSubmitting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="⚠️ Emergency SOS Confirmation">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Warning Banner */}
        <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-rose-300">Live Distress Signal Broadcast</p>
            <p className="text-[11px] text-rose-200/90 mt-0.5">
              Your GPS coordinates and emergency triage profile will be immediately dispatched to the NDRF/SDRF Command Grid.
            </p>
          </div>
        </div>

        {/* Location Confirmation Pill */}
        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <span className="font-semibold block text-slate-200">{userLocation?.name || 'Sector 21, Pavana Basin'}</span>
              <span className="font-mono text-[10px] text-slate-400">
                {formatCoordinates(userLocation?.lat, userLocation?.lng)}
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
            GPS Locked
          </span>
        </div>

        {/* Headcount */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide">
            How many people are trapped / need evacuation?
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5, '6+'].map((count) => {
              const numVal = count === '6+' ? 6 : count;
              const isSelected = peopleCount === numVal;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => setPeopleCount(numVal)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-rose-600 border-rose-400 text-white shadow-md shadow-rose-600/30'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {count}
                </button>
              );
            })}
          </div>
        </div>

        {/* Medical Emergency Toggle */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold text-slate-200">Medical Attention / Severe Injury?</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={medicalEmergency}
                onChange={(e) => setMedicalEmergency(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
            </label>
          </div>

          {medicalEmergency && (
            <Input
              label="Describe Medical Condition / Hazard Details"
              value={medicalNotes}
              onChange={(e) => setMedicalNotes(e.target.value)}
              placeholder="e.g. Broken limb, oxygen cylinder needed, rising floodwater..."
            />
          )}
        </div>

        {/* Priority Triage Option */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide">
            Urgency / Hazard Severity
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'CRITICAL', label: '🔴 CRITICAL', desc: 'Water rising > 4ft / Injury' },
              { id: 'HIGH', label: '🟠 HIGH', desc: 'Trapped on upper floor' },
              { id: 'MEDIUM', label: '🟡 MEDIUM', desc: 'Power out / Safe refuge' }
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPriority(p.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  priority === p.id
                    ? 'bg-rose-950/80 border-rose-500 text-white shadow-lg'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="text-xs font-black block">{p.label}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{p.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button variant="outline" size="md" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="emergency"
            size="md"
            type="submit"
            loading={submitting}
            icon={ShieldAlert}
          >
            CONFIRM & SEND SOS
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SOSConfirmModal;
