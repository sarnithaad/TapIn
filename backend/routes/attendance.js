const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Worker = require('../models/Worker');

// Mark attendance (fingerprint or manual)
router.post('/mark', async (req, res) => {
  const { workerId, shop, fingerprint, manual, type } = req.body;
  const worker = await Worker.findById(workerId);

  if (!worker) return res.status(404).json({ message: 'Worker not found' });

  // Simulated fingerprint match
  let isFingerprintValid = fingerprint && worker.fingerprints.includes(fingerprint);

  const attendance = new Attendance({
    worker: workerId,
    shop,
    date: new Date(),
    checkIn: type === 'checkin' ? new Date() : undefined,
    checkOut: type === 'checkout' ? new Date() : undefined,
    markedManually: manual && !isFingerprintValid
  });
  await attendance.save();
  res.json(attendance);
});

// Get attendance summary for a date
router.get('/summary/:shop/:date', async (req, res) => {
  const { shop, date } = req.params;
  const dt = new Date(date);
  const attendance = await Attendance.find({ shop, date: { $eq: dt } }).populate('worker');
  res.json(attendance);
});

module.exports = router;
