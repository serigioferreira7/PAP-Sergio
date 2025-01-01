const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

router.get('/', async (req, res) => {
  try {
      const product = await Product.findAll();
      res.json(product);
  } catch (error) {
      console.error('Erro ao buscar produtos:', error); 
      res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});

module.exports = router;
