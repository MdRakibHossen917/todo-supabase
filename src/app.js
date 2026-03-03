const express = require('express');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const { statusCodes } = require('./utils/statusCodes');

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
// Root Route
app.get('/', (req, res) => {
  res.status(statusCodes.OK).send('Server is running... You can use the auth routes for OTP verification.');
});

// 404 handler
app.use((req, res) => {
  res.status(statusCodes.NOT_FOUND).json({
    success: false,
    error: {
      code: 40400,
      message: `Cannot ${req.method} ${req.originalUrl}`
    }
  });
});

app.use(errorHandler);

module.exports = app;