const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Remove dotenv require if not using env files
// require('dotenv').config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Replace with your own MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://sharnithadhandapani:sharnithadhandapani@cluster0.tw9p5.mongodb.net/';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit on DB connection failure
  });

const authRoutes = require('./routes/auth');
const workerRoutes = require('./routes/worker');
const attendanceRoutes = require('./routes/attendance');
const reportRoutes = require('./routes/report');
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

app.use('/auth', authRoutes);
app.use('/worker', workerRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/report', reportRoutes);

app.get('/', (req, res) => res.send('TapIn backend running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
