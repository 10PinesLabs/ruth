'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
      'Reunions',
      'nombre',
      {
        type: Sequelize.TEXT,
      },
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Reunions', 'nombre')

};
