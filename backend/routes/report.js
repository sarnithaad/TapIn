const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const Attendance = require('../models/Attendance');

// Export attendance report as PDF
router.get('/pdf/:shop/:from/:to', async (req, res) => {
  const { shop, from, to } = req.params;
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const attendance = await Attendance.find({
    shop,
    date: { $gte: fromDate, $lte: toDate }
  }).populate('worker');

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);

  doc.text('TapIn Attendance Report');
  attendance.forEach(record => {
    doc.text(`Worker: ${record.worker.name}, Date: ${record.date}, CheckIn: ${record.checkIn}, CheckOut: ${record.checkOut}`);
  });
  doc.end();
});

module.exports = router;
