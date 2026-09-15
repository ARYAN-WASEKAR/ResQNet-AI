import React from 'react';
import { CheckCircle2, Clock, Ambulance, ShieldCheck, ArrowRight, Radio } from 'lucide-react';
import Card from '../ui/Card';
import StatusBadge from '../common/StatusBadge';

const RescueStatusStepper = ({
  sosData,
  onAdvanceStatus,
  className = ''
}) => {
  if (!sosData) return null;

  const currentStatus = sosData.status || 'Waiting';

  const steps = [
    {
      id: 'Waiting',
      title: 'SOS Received',
      description: 'Dispatched to Command Grid & Triage Queue',
      icon: CheckCircle2,
      time: '00:00',
    },
    {
      id: 'Assigned',
      title: 'Rescue Team Assigned',
      description: sosData.assignedTeam ? `Assigned to Team ${sosData.assignedTeam}` : 'Dispatching nearest available unit...',
      icon: Ambulance,
      time: '+02 mins',
    },
    {
      id: 'En Route',
      title: 'Rescue Team En Route',
      description: 'Unit in transit with amphibious rescue gear. ETA: ~6 mins',
      icon: Radio,
      time: '+05 mins',
    },
    {
      id: 'Rescued',
      title: 'Victim Rescued',
      description: 'Safely evacuated and registered at Safe Center Alpha',
      icon: ShieldCheck,
      time: 'Completed',
    },
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'Rescued': return 3;
      case 'En Route': return 2;
      case 'Assigned': return 1;
      case 'Waiting':
      default: return 0;
    }
  };

  const activeIndex = getStepIndex(currentStatus);

  return (
    <Card variant="glass" className={`space-y-4 border-slate-700/80 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Live Rescue Progress</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">ID: {sosData.id}</span>
          <StatusBadge status={currentStatus} />
        </div>
      </div>

      {/* Stepper Timeline */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {steps.map((step, idx) => {
          const isDone = idx < activeIndex;
          const isCurrent = idx === activeIndex;
          const isUpcoming = idx > activeIndex;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative flex items-start gap-3">
              {/* Node Indicator */}
              <div
                className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all ${
                  isDone
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                    : isCurrent
                      ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/50 ring-4 ring-rose-500/20'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <span className="text-[10px] font-bold">{idx + 1}</span>
                )}
              </div>

              {/* Step Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-xs font-bold ${
                      isCurrent ? 'text-white text-sm' : isDone ? 'text-emerald-400' : 'text-slate-500'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">{step.time}</span>
                </div>
                <p
                  className={`text-[11px] mt-0.5 ${
                    isCurrent ? 'text-slate-300 font-medium' : isDone ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Demo Status Advance Trigger */}
      {onAdvanceStatus && currentStatus !== 'Rescued' && (
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Simulate Response Progress:</span>
          <button
            type="button"
            onClick={() => {
              const nextStatuses = ['Waiting', 'Assigned', 'En Route', 'Rescued'];
              const nextIdx = Math.min(activeIndex + 1, nextStatuses.length - 1);
              onAdvanceStatus(sosData.id, nextStatuses[nextIdx]);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
          >
            <span>Advance Next Stage</span>
            <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
          </button>
        </div>
      )}
    </Card>
  );
};

export default RescueStatusStepper;
