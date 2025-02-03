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

    const orders = await Order.create({
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

// Rota para atualizar o status de uma encomenda existente
router.put('/:orderId', async (req, res) => {
  try {
    const { ordersId } = req.params;
    const { status } = req.body;

    // Verifique se o status foi fornecido
    if (!status) {
      return res.status(400).json({ error: 'O status é obrigatório para atualizar.' });
    }

    // Procura a encomenda pelo ID
    const orders = await Order.findById(ordersId);
    
    // Verifica se a encomenda existe
    if (!orders) {
      return res.status(404).json({ error: 'Encomenda não encontrada.' });
    }

    // Atualiza o status
    orders.status = status;
    const updatedOrder = await order.save();  // Salva a encomenda com o novo status

    return res.status(200).json({
      success: true,
      orders: updatedOrder  // Retorna a encomenda atualizada
    });
  } catch (error) {
    console.error('Erro ao atualizar o status da encomenda:', error);
    res.status(500).json({ error: 'Erro ao atualizar o status da encomenda. Tente novamente mais tarde.' });
  }
});

module.exports = router;
