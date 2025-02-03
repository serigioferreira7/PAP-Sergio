const express = require('express');
const router = express.Router();
const Order = require('../models/orders'); // Certifique-se de que o caminho do modelo está correto

// Rota para criação de uma nova encomenda
router.post('/', async (req, res) => {
  try {
    const { customerName, products, totalPrice, status } = req.body;

    if (!customerName || !products || !totalPrice) {
      return res.status(400).json({ error: 'Nome do cliente, produtos e valor total são obrigatórios.' });
    }

    const order = await Order.create({
      customerName,
      products,
      totalPrice,
      status: status || 'Pendente', // Default status
      orderDate: new Date()          // Data da encomenda
    });

    return res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Erro ao criar a encomenda:', error);
    res.status(500).json({ error: 'Erro ao criar a encomenda. Tente novamente mais tarde.' });
  }
});

module.exports = router;
