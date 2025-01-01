module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      deliveryDate: { type: DataTypes.DATE, allowNull: false },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });
  
    Order.associate = (models) => {
      Order.hasMany(models.OrderItem, { as: 'products' });
    };
  
    return Order;
  };
  