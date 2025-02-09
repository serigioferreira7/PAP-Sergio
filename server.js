const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./db'); 
const cors = require('cors');
const bcrypt = require('bcryptjs');

// Modelo Administrator
const { Administrator } = require('./models/administrator'); 

// Importar rotas de API
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/administrator');
const Order = require('./models/orders'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Testar conexão com banco de dados
sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados bem-sucedida!'))
  .catch(err => console.error('Erro ao conectar ao banco:', err));

// Rotas de API
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);


// Rotas para páginas HTML
app.get('/products.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'products.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/order.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'order.html'));
});

app.get('/order-confirmation.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'order-confirmation.html'));
});

app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

app.get('/admin-login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin-login.html'));
});

app.post('/api/products', async (req, res) => {
  console.log("Dados recebidos no backend:", req.body); 

  try {
      const { productName, value, img, idCategory, active, reference, weight } = req.body;

      if (!productName || !value || !idCategory || !reference || weight === undefined) {
          return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
      }

      const newProduct = await Product.create({
          productName,
          value,
          img,
          idCategory,
          active,
          reference,
          weight
      });

      res.json({ success: true, product: newProduct });
  } catch (error) {
      console.error("Erro ao criar produto:", error);
      res.status(500).json({ error: 'Erro ao criar produto' });
  }
});


app.post('/api/admin/login', async (req, res) => {
  try {
    const { name, pass } = req.body;

    // Validação dos dados
    if (!name || !pass) {
      return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios' });
    }


    const admin = await Administrator.findOne({ where: { "name": name } });

    if (!admin || admin.pass !== pass) {
      return res.status(401).json({ error: 'Credenciais inválidas '});
    } 

    res.json({ message: 'Login bem-sucedido' });

  } catch (error) {
    console.error('Erro interno no servidor:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }

});


// Rota para criar uma encomenda
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, products, totalPrice } = req.body;

    if (!customerName || !products || !totalPrice) {
      return res.status(400).json({ error: 'Nome do cliente, produtos e valor total são obrigatórios.' });
    }


    const Order = require('./models/order'); 

    const order = await Order.create({
      customerName,
      products,     // Produtos no formato de string ou JSON
      totalPrice,
      status: 'Pendente', // Estado default 'Pendente'
      orderDate: new Date()         // A data de criação é gerada automaticamente
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

// Rota para obter todas as encomendas
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.findAll(); // Método que vai buscar todas as encomendas
    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: 'Nenhuma encomenda encontrada' });
    }
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao obter encomendas' });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const orderId = req.params.id;
    const newStatus = req.body.status;

    console.log(`A receber pedido para alterar ordem ${orderId} para status ${newStatus}`);

    // Busca a ordem com o Sequelize
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: "Encomenda não encontrada" });
    }

    // Atualiza o status e salva
    order.status = newStatus;
    await order.save();

    res.json({ message: "Estado atualizado com sucesso!", order });
  } catch (error) {
    console.error("Erro ao atualizar estado:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});



sequelize.authenticate()
  .then(() => {
    console.log('Conexão com a base de dados bem-sucedida!');
    
    sequelize.sync({ force: false }) 
      .then(() => {
        console.log('Tabela sincronizada!');
      })
      .catch(err => console.error('Erro ao sincronizar as tabelas:', err));
  })
  .catch(err => {
    console.error('Erro ao conectar a base de dados:', err);
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor a rodar na porta ${PORT}`);
});
