const express = require('express');
const router = express.Router();
const Admin = require('../models/administrator');  

// Altera a rota para procurar pelo nome
router.post('/api/admin/login', (req, res) => {
  const { name, pass } = req.body;  // Pega o nome e a pass do corpo da requisição

  // Verifica se o administrador existe pelo nome
  Admin.findOneByName(name, (err, admin) => {
    if (err) {
      console.error('Erro ao acessar o banco de dados:', err);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }

    if (!admin) {
      return res.status(404).json({ error: 'Administrador não encontrado' });
    }

    // Compara a pass armazenada (se estiver usando bcrypt)
    bcrypt.compare(pass, admin.pass, (err, isMatch) => {
      if (err) {
        console.error('Erro ao comparar senha:', err);
        return res.status(500).json({ error: 'Erro ao processar a senha' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      return res.json({ message: 'Login bem-sucedido' });  // Retorna sucesso se a senha for válida
    });
  });
});

module.exports = router;
