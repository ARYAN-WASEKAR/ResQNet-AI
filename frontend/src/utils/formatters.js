export const formatDistance = (km) => {
  if (km === undefined || km === null) return 'N/A';
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${Number(km).toFixed(1)} km`;
};

export const formatCoordinates = (lat, lng) => {
  if (lat === undefined || lng === undefined) return 'Unavailable';
  return `${Number(lat).toFixed(4)}° N, ${Number(lng).toFixed(4)}° E`;
};

export const formatRelativeTime = (timestamp) => {
  if (!timestamp) return 'Just now';
  const now = new Date();
  const date = new Date(timestamp);
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes === 1) return '1 min ago';
  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours === 1) return '1 hr ago';
  return `${diffInHours} hrs ago`;
};

export const getPriorityClass = (priority) => {
  switch (String(priority).toUpperCase()) {
    case '1':
    case 'CRITICAL':
      return 'text-rose-400 bg-rose-500/15 border-rose-500/40';
    case '2':
    case 'HIGH':
      return 'text-orange-400 bg-orange-500/15 border-orange-500/40';
    case '3':
    case 'MEDIUM':
      return 'text-amber-400 bg-amber-500/15 border-amber-500/40';
    case '4':
    case 'LOW':
    default:
      return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/40';
  }
};
