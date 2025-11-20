const mongoose = require('mongoose');
const OwnerSchema = new mongoose.Schema({
  shopName: String,
  ownerName: String,
  email: { type: String, unique: true },
  passwordHash: String
});
module.exports = mongoose.model('Owner', OwnerSchema);
