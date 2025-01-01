const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./db'); // Banco de dados

// Importar rotas de API
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/orders');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Testar conexão com banco de dados
sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados bem-sucedida!'))
  .catch(err => console.error('Erro ao conectar ao banco:', err));

// Rotas de API
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Rotas para páginas HTML
app.get('/products.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'products.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});


app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/add-product.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'add-product.html'));
});

app.get('/edit-product.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'edit-product.html'));
});

app.get('/remove-product.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'remove-product.html'));
});

app.get('/order.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'order.html'));
});

app.get('/order-confirmation.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'order-confirmation.html'));
});

app.get('/users.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'users.html'));
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
