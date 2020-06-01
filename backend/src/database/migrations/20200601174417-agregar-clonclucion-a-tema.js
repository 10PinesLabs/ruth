module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Temas',
    'conclusion',
    {
      type: Sequelize.TEXT,
    },
  ),

  down: (queryInterface) => queryInterface.removeColumn('Temas', 'prioridad'),
};
