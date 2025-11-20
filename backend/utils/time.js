/**
 * Parse HH:mm string into Date object for today.
 */
function parseShiftTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  const now = new Date();
  now.setHours(h, m, 0, 0);
  return now;
}

/**
 * Calculate number of seconds between two Date objects.
 */
function secondsBetween(d1, d2) {
  return Math.floor((d2 - d1) / 1000);
}

module.exports = { parseShiftTime, secondsBetween };
