const express = require('express');
const router = express.Router();
const Product = require('../models/product'); 

router.get('/', async (req, res) => {
  try {
      const product = await Product.findAll();
      res.json(product);
  } catch (error) {
      console.error('Erro ao buscar produtos:', error); 
      res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});


// POST /api/products - Adicionar um novo produto
router.post('/', async (req, res) => {
  try {
    const { productName, value, img, idCategory, reference, weight } = req.body;
    
    // Validação para garantir que os campos obrigatórios estão presentes
    if (!productName || isNaN(value) || !idCategory || !reference || isNaN(weight)) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    // Criação do produto
    const newProduct = await Product.create({
      productName,  
      value,
      img,
      idCategory,
      reference,
      weight
    });

    return res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return res.status(500).json({ message: 'Erro ao criar produto.' });
  }
});


// PATCH /api/products/:id - Atualizar um produto existente
router.patch('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { productName, value } = req.body;
      const product = await Product.findByPk(id);
      if (!product) {
          return res.status(404).json({ error: 'Produto não encontrado.' });
      }
      await product.update({ productName, value });
      res.json({ success: true, product });
  } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({ error: 'Erro ao atualizar produto.' });
  }
});

// DELETE /api/products/:id - Remover um produto
router.delete('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
          return res.status(404).json({ error: 'Produto não encontrado.' });
      }
      await product.destroy();
      res.json({ success: true });
  } catch (error) {
      console.error('Erro ao remover produto:', error);
      res.status(500).json({ error: 'Erro ao remover produto.' });
  }
});


module.exports = router;
