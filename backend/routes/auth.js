const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');
const Worker = require('../models/Worker');

router.post('/owner-login', async (req, res) => {
const { email, password } = req.body;
const owner = await Owner.findOne({ email });
if (!owner || !bcrypt.compareSync(password, owner.passwordHash))
return res.status(400).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: owner._id, role: 'owner' }, process.env.JWT_SECRET);
res.json({ token, owner });
});

router.post('/worker-login', async (req, res) => {
const { login, password } = req.body;
const worker = await Worker.findOne({ login });
if (!worker || !bcrypt.compareSync(password, worker.passwordHash))
return res.status(400).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: worker._id, role: 'worker' }, process.env.JWT_SECRET);
res.json({ token, worker });
});

module.exports = router;
