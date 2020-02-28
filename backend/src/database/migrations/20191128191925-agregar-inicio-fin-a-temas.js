
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([queryInterface.addColumn(
    'Temas',
    'inicio',
    {
      type: Sequelize.DATE,
    },
  ),
  queryInterface.addColumn(
    'Temas',
    'fin',
    {
      type: Sequelize.DATE,
    },
  )]),

  down: (queryInterface, Sequelize) => Promise.all([queryInterface.removeColumn('Temas', 'inicio'),
    queryInterface.removeColumn('Temas', 'fin')]),
};
