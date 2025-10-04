const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Auto Spares Solution Backend is LIVE!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      createPayment: '/api/payments/create-order',
      verifyPayment: '/api/payments/verify',
      createOrder: '/api/orders'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '✅ Auto Spares Backend is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Payment order creation
app.post('/api/payments/create-order', (req, res) => {
  console.log('💰 Payment request:', req.body);
  
  res.json({
    success: true,
    order: {
      id: 'order_test_' + Date.now(),
      amount: req.body.amount * 100,
      currency: req.body.currency || 'INR'
    },
    message: 'Payment order created successfully'
  });
});

// Payment verification
app.post('/api/payments/verify', (req, res) => {
  console.log('🔒 Payment verification:', req.body);
  
  res.json({
    success: true,
    message: 'Payment verified successfully',
    paymentId: req.body.razorpay_payment_id
  });
});

// Order creation
app.post('/api/orders', (req, res) => {
  console.log('📦 Order received:', req.body.customer?.name);
  
  res.json({
    success: true,
    order: {
      orderId: 'ASS' + Date.now().toString().slice(-6),
      status: 'confirmed'
    },
    message: 'Order created successfully'
  });
});

// Handle all other routes
app.use('*', (req, res) => {
  res.json({ 
    message: 'Auto Spares Solution API',
    error: 'Endpoint not found',
    availableEndpoints: ['/', '/api/health', '/api/payments/create-order', '/api/payments/verify', '/api/orders']
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎉 Backend server successfully running on port ${PORT}`);
  console.log(`📍 Root: http://0.0.0.0:${PORT}/`);
  console.log(`🏥 Health: http://0.0.0.0:${PORT}/api/health`);
});
