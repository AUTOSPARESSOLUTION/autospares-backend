const express = require('express');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      products: [],
      message: 'Products endpoint ready'
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

module.exports = router;
