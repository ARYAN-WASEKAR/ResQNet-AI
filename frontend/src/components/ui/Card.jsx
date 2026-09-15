import React from 'react';

const Card = ({
  children,
  className = '',
  variant = 'default',
  hover = false,
  onClick,
  ...props
}) => {
  const variants = {
    default: 'bg-slate-900/90 border-slate-800 text-slate-100',
    glass: 'glass-panel text-slate-100',
    danger: 'glass-panel-danger text-slate-100 border-rose-500/30',
    safe: 'bg-emerald-950/20 border-emerald-500/30 text-emerald-100',
    command: 'bg-slate-900 border-slate-700/80 shadow-2xl text-slate-100',
  };

  const hoverStyle = hover ? 'hover:border-slate-700 hover:shadow-xl transition-all duration-200 cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border p-5 transition-colors ${variants[variant] || variants.default} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
