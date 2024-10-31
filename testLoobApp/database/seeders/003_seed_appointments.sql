module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('appointments', [
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('appointments', null, {})
};
