module.exports = function (req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
      return next(); 
    } else {
      return res.status(403).send('Acesso negado. Você não tem permissão para acessar esta página.');
    }
  };