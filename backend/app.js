const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const competitionRoutes = require('./routes/competitionRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/v1/competitions', competitionRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

module.exports = app;