/**
 * Pretend to match given fingerprint input against stored (simulated) hashes.
 * Returns true if found, false otherwise.
 */
function matchFingerprint(inputFingerprint, storedFingerprints) {
  return storedFingerprints.includes(inputFingerprint); // Real implementation may involve biometric SDK/DB
}

module.exports = { matchFingerprint };
