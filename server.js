require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const speciesRoutes = require('./routes/speciesRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

const PORT = process.env.PORT || 3000;

// DB connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/species', speciesRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
