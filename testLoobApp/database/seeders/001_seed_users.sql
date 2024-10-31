module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      email: null,
      phone: null,
      socialMedia: null,
      password: null
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};
