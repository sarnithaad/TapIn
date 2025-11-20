const Worker = require('../models/Worker');
const bcrypt = require('bcryptjs');

exports.registerWorker = async (req, res) => {
  try {
    const { shop, name, login, password, fingerprints, salaryShifts } = req.body;
    const existing = await Worker.findOne({ login });
    if (existing) return res.status(409).json({ message: 'Login already exists' });

    const passwordHash = bcrypt.hashSync(password, 10);
    const worker = new Worker({
      shop,
      name,
      login,
      passwordHash,
      dateOfJoining: new Date(),
      fingerprints,
      salaryShifts,
    });
    await worker.save();
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWorkersList = async (req, res) => {
  const { shop } = req.params;
  try {
    const workers = await Worker.find({ shop, removed: false });
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPastWorkersList = async (req, res) => {
  const { shop } = req.params;
  try {
    const past = await Worker.find({ shop, removed: true });
    res.json(past);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeWorker = async (req, res) => {
  try {
    const { workerId } = req.params;
    await Worker.findByIdAndUpdate(workerId, { removed: true, dateOfRemoval: new Date() });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.changeWorkerPassword = async (req, res) => {
  try {
    const { workerId } = req.params;
    const { password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    await Worker.findByIdAndUpdate(workerId, { passwordHash });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
