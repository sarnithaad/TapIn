const PDFDocument = require('pdfkit');
const Attendance = require('../models/Attendance');

exports.exportAttendancePdf = async (req, res) => {
  try {
    const { shop, from, to } = req.params;
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const attendances = await Attendance.find({
      shop,
      date: { $gte: fromDate, $lte: toDate },
    }).populate('worker');

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=attendance_${from}_${to}.pdf`);

    doc.pipe(res);

    doc.fontSize(18).text('TapIn Attendance Report', { align: 'center' });
    doc.moveDown();

    attendances.forEach((record, index) => {
      doc.fontSize(12)
        .text(`${index + 1}. Worker: ${record.worker.name} | Date: ${record.date.toDateString()}`
          + ` | CheckIn: ${record.checkIn ? record.checkIn.toLocaleTimeString() : 'N/A'}`
          + ` | CheckOut: ${record.checkOut ? record.checkOut.toLocaleTimeString() : 'N/A'}`
          + ` | Manual: ${record.markedManually ? 'Yes' : 'No'}`);
      doc.moveDown(0.3);
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
