module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('providers', [
    {
      name: '',
      specialty: '',
      location: '',
      availability: null
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('providers', null, {})
};
