import React from 'react';
import Card from '../ui/Card';

const StatCard = ({
  title,
  value,
  subtext,
  icon: Icon,
  variant = 'default',
  trend,
  className = '',
  onClick
}) => {
  const variantStyles = {
    danger: {
      card: 'border-rose-500/40 bg-gradient-to-br from-rose-950/30 to-slate-900',
      iconBg: 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse',
      valueColor: 'text-rose-400',
    },
    warning: {
      card: 'border-orange-500/40 bg-gradient-to-br from-orange-950/30 to-slate-900',
      iconBg: 'bg-orange-500/20 text-orange-400 border border-orange-500/40',
      valueColor: 'text-orange-400',
    },
    success: {
      card: 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 to-slate-900',
      iconBg: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40',
      valueColor: 'text-emerald-400',
    },
    info: {
      card: 'border-indigo-500/40 bg-gradient-to-br from-indigo-950/30 to-slate-900',
      iconBg: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40',
      valueColor: 'text-indigo-400',
    },
    default: {
      card: 'border-slate-800 bg-slate-900',
      iconBg: 'bg-slate-800 text-slate-300 border border-slate-700',
      valueColor: 'text-white',
    },
  };

  const style = variantStyles[variant] || variantStyles.default;

  return (
    <Card
      onClick={onClick}
      hover={!!onClick}
      className={`p-4 sm:p-5 transition-all duration-200 ${style.card} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${style.valueColor}`}>
              {value}
            </span>
            {trend && (
              <span className="text-[11px] font-semibold text-slate-400 font-mono">
                {trend}
              </span>
            )}
          </div>
          {subtext && <p className="text-[11px] text-slate-400 mt-1">{subtext}</p>}
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-xl ${style.iconBg} shrink-0`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
