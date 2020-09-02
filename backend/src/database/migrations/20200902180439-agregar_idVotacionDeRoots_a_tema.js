
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Temas',
    'votacionDeRootsId',
    {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Temas', 'votacionDeRootsId'),

};
