import React from 'react';
import { Radio } from 'lucide-react';

const LoadingSpinner = ({ label = 'Acquiring satellite telemetry & emergency network...', fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-rose-500/20 animate-ping"></div>
        <div className="absolute inset-2 rounded-full border-2 border-t-rose-500 border-r-rose-400 border-b-transparent border-l-transparent animate-spin"></div>
        <Radio className="w-6 h-6 text-rose-500 animate-pulse" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-200">{label}</p>
        <p className="text-xs text-slate-400 mt-1">ResQNet AI Command Grid Active</p>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
