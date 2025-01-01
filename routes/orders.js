const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('gestor_encomendas', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});


const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idClient: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    orderDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    closed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    totalValue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: 'orders',
    timestamps: false,
});

router.post('/orders', async (req, res) => {
    try {
        const { idClient, totalValue } = req.body;
        if (!idClient || !totalValue) {
            return res.status(400).json({ error: 'idClient e totalValue são obrigatórios.' });
        }
        const newOrder = await Order.create({ idClient, totalValue });
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o pedido.' });
    }
});


router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar os pedidos.' });
    }
});


router.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Pedido não encontrado.' });
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter o pedido.' });
    }
});


router.put('/orders/:id', async (req, res) => {
    try {
        const { closed } = req.body;
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Pedido não encontrado.' });
        }
        order.closed = closed;
        await order.save();
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o pedido.' });
    }
});

module.exports = router;
