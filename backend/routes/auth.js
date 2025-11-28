const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// YOUR HARDCODED MONGO URI - replace these values:
const mongoURI = 'mongodb+srv://SharnithaDhandapani:SharnithaDhandapani@cluster0.tw9p5.mongodb.net/';

mongoose.connect(mongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const authRoutes = require('./routes/auth');
const workerRoutes = require('./routes/worker');
const attendanceRoutes = require('./routes/attendance');
const reportRoutes = require('./routes/report');
const errorHandler = require('./middleware/errorHandler');

app.use('/auth', authRoutes);
app.use('/worker', workerRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/report', reportRoutes);

app.use(errorHandler);

app.get('/', (req, res) => res.send('TapIn backend running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
