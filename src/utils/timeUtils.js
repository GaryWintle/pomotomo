export function formatReadableTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join('');
}

export function formatTime(countdown) {
  let hours = Math.floor(countdown / 3600);
  let minutes = Math.floor((countdown % 3600) / 60);
  let seconds = Math.floor(countdown % 60);
  const pad = (num) => String(num).padStart(2, '0');

  if (countdown <= 60) {
    return `${seconds}s`;
  }

  if (hours === 0) {
    return `${minutes}m`;
  }

  return `${hours}:${pad(minutes)}h`;
}
