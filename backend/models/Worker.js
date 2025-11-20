const mongoose = require('mongoose');
const WorkerSchema = new mongoose.Schema({
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
  name: String,
  login: String,
  passwordHash: String,
  dateOfJoining: Date,
  fingerprints: [String], // fingerprint stubs (simulate IDs/stored hashes)
  salaryShifts: [{
    shiftStart: String, // "HH:mm"
    shiftEnd: String,   // "HH:mm"
    salaryPerSecond: Number
  }],
  removed: { type: Boolean, default: false },
  dateOfRemoval: Date
});
module.exports = mongoose.model('Worker', WorkerSchema);
