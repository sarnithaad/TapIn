const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// DB setup
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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
