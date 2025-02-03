// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const Administrator = require('../models/administrator'); // Importa o modelo de administrador
const bcrypt = require('bcrypt'); // Usando bcrypt para comparar a senha de forma segura

router.post('/login', async (req, res) => {
  const { name, pass } = req.body;

  try {
    
    const admin = await Administrator.findOne({ where: { name } });

    if (admin && await bcrypt.compare(password, admin.pass)) {
      
      req.session.user = {
        id: admin.id,
        name: admin.name
      };


      if (admin.role === 'admin') {
        return res.redirect('/admin');
      } else {
        return res.redirect('/home.html'); 
      }
    } else {
      return res.status(401).send('Credenciais inválidas');
    }
  } catch (error) {
    return res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
