const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check - ALWAYS works
app.get('/api/health', (req, res) => {
  console.log('✅ Health check called');
  res.json({ 
    status: 'OK', 
    message: 'Auto Spares Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Test payment endpoint
app.post('/api/payments/create-order', (req, res) => {
  console.log('💰 Payment order requested:', req.body);
  
  // Simulate Razorpay order creation
  const orderData = {
    id: 'order_' + Date.now(),
    amount: req.body.amount * 100,
    currency: req.body.currency || 'INR',
    status: 'created'
  };
  
  res.json({
    success: true,
    order: orderData,
    message: 'Test mode - working!'
  });
});

// Test order creation
app.post('/api/orders', (req, res) => {
  console.log('📦 Order received:', req.body.customer?.name);
  
  res.json({
    success: true,
    order: {
      orderId: 'ASS' + Date.now().toString().slice(-6),
      status: 'confirmed',
      message: 'Order received in test mode'
    }
  });
});

// Payment verification
app.post('/api/payments/verify', (req, res) => {
  console.log('🔒 Payment verification:', req.body.razorpay_payment_id);
  
  res.json({
    success: true,
    message: 'Payment verified (test mode)',
    paymentId: req.body.razorpay_payment_id
  });
});

// Handle all routes
app.use('*', (req, res) => {
  res.json({ 
    message: 'Auto Spares Backend - All systems operational',
    endpoint: req.originalUrl
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📍 Health: http://0.0.0.0:${PORT}/api/health`);
});
