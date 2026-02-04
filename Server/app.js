const express = require('express');
require('dotenv').config();
const cors = require('cors');

const connectDB = require('./config/db');
const app = express();
const PORT = 4000;

connectDB();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', require('./Auth/auth.routes'));
app.use('/api/req', require('./Req&Res/route'));
app.use('/api/inventory', require('./inventory/routes'));
app.use('/api/pref', require('./Preference/routes'));
app.use('/api/chat', require('./Chats/routes'));
app.use('/api/payment', require('./Payments/route'));
app.use('/api/ratings', require('./Ratings/route'));
app.use('/api/location', require('./Location/route'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);