const { Model, Sequelize } = require('sequelize');
const sequelize = new Sequelize('testLoobApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Payment extends Model {
  static init(sequelize) {
    super.init({
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      invoiceAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    }, { 
      sequelize, 
      modelName: 'Payment',
      tableName: 'payments',
      timestamps: false
    });
  }
}

Payment.init(sequelize);

module.exports = Payment;
