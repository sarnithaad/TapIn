const Attendance = require('../models/Attendance');
const Worker = require('../models/Worker');
const { matchFingerprint } = require('../utils/fingerprint');
const { parseShiftTime, secondsBetween } = require('../utils/time');

// Mark attendance logic
exports.markAttendance = async (req, res) => {
  const { workerId, shop, fingerprint, manual, type } = req.body;
  try {
    const worker = await Worker.findById(workerId);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    // Check fingerprint match
    let validFingerprint = fingerprint && matchFingerprint(fingerprint, worker.fingerprints);

    if (!validFingerprint && !manual) {
      return res.status(400).json({ message: "Invalid fingerprint and manual flag not set" });
    }

    // Record attendance
    let update = {};
    if (type === 'checkin') update.checkIn = new Date();
    if (type === 'checkout') update.checkOut = new Date();

    update.markedManually = manual && !validFingerprint;
    update.shop = shop;
    update.worker = workerId;
    update.date = new Date();

    const attendance = new Attendance(update);
    await attendance.save();

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Summary for date
exports.getAttendanceSummary = async (req, res) => {
  const { shop, date } = req.params;
  try {
    const dt = new Date(date);
    const attendance = await Attendance.find({ shop, date: dt }).populate('worker');
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
