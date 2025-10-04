const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Auto Spares Solution Backend is LIVE!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '✅ Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Test payment endpoint (simple version)
app.post('/api/payments/create-order', (req, res) => {
  res.json({
    success: true,
    order: {
      id: 'test_order_' + Date.now(),
      amount: req.body.amount * 100,
      currency: 'INR'
    }
  });
});

// Test payment verification
app.post('/api/payments/verify', (req, res) => {
  res.json({
    success: true,
    message: 'Payment verified',
    paymentId: req.body.razorpay_payment_id
  });
});

// Test order creation
app.post('/api/orders', (req, res) => {
  res.json({
    success: true,
    order: {
      orderId: 'ASS' + Date.now().toString().slice(-6)
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎉 Server running on port ${PORT}`);
});
