const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');
const bcrypt = require('bcryptjs');

// Owner registers a new worker
router.post('/register', async (req, res) => {
  const { shop, name, login, password, fingerprints, salaryShifts } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  const worker = new Worker({
    shop,
    name,
    login,
    passwordHash,
    dateOfJoining: new Date(),
    fingerprints,
    salaryShifts
  });
  await worker.save();
  res.json(worker);
});

// Get workers list
router.get('/list/:shop', async (req, res) => {
  const { shop } = req.params;
  const workers = await Worker.find({ shop, removed: false });
  res.json(workers);
});

// Remove worker
router.post('/remove/:workerId', async (req, res) => {
  await Worker.findByIdAndUpdate(req.params.workerId, { removed: true, dateOfRemoval: new Date() });
  res.json({ success: true });
});

// Past workers
router.get('/past/:shop', async (req, res) => {
  const { shop } = req.params;
  const past = await Worker.find({ shop, removed: true });
  res.json(past);
});

// Change worker password
router.post('/change-password/:workerId', async (req, res) => {
  const { password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  await Worker.findByIdAndUpdate(req.params.workerId, { passwordHash });
  res.json({ success: true });
});

module.exports = router;
