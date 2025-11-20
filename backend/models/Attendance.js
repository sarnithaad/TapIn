const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
  checkIn: Date,
  checkOut: Date,
  secondsLate: Number,
  secondsOvertime: Number,
  markedManually: Boolean,
  date: Date
});
module.exports = mongoose.model('Attendance', AttendanceSchema);
