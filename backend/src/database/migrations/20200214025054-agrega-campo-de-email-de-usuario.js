
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Temas', 'mailDelAutor', { type: Sequelize.STRING }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Temas', 'mailDelAutor'),
};
