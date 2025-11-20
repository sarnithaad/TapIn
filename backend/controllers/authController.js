const Owner = require('../models/Owner');
const Worker = require('../models/Worker');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.ownerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const owner = await Owner.findOne({ email });
    if (!owner) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = bcrypt.compareSync(password, owner.passwordHash);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: owner._id, role: 'owner' }, process.env.JWT_SECRET);
    res.json({ token, owner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.workerLogin = async (req, res) => {
  const { login, password } = req.body;
  try {
    const worker = await Worker.findOne({ login });
    if (!worker) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = bcrypt.compareSync(password, worker.passwordHash);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: worker._id, role: 'worker' }, process.env.JWT_SECRET);
    res.json({ token, worker });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
