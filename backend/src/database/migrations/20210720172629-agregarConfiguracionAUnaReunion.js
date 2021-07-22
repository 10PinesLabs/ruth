
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Reunions',
    'configuracion',
    {
      type: Sequelize.JSON,
    },

  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Reunions', 'configuracion'),
};
