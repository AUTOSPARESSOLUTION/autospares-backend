const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create new order
router.post('/', async (req, res) => {
  try {
    const { customer, items, payment, summary } = req.body;

    const order = new Order({
      customer,
      items,
      payment,
      summary
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        id: order._id,
        orderId: order.orderId,
        total: order.summary.total,
        status: order.status
      }
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
});

// Get order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ 
      $or: [
        { orderId: req.params.orderId },
        { _id: req.params.orderId }
      ]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({ success: true, order });

  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order'
    });
  }
});

module.exports = router;
