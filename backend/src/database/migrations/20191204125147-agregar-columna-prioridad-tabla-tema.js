
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Temas',
    'prioridad',
    {
      type: Sequelize.INTEGER,
    },
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Temas', 'prioridad'),
};
