import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';

const ErrorAlert = ({
  title = 'Connection Error',
  message = 'Unable to reach the live command service. Operating in offline resilient mode.',
  onRetry,
  className = ''
}) => {
  return (
    <div className={`p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-100 flex items-start justify-between gap-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-rose-300">{title}</h4>
          <p className="text-xs text-rose-200/80 mt-0.5">{message}</p>
        </div>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          icon={RefreshCw}
          className="border-rose-500/40 text-rose-300 hover:bg-rose-500/20 shrink-0"
        >
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorAlert;
