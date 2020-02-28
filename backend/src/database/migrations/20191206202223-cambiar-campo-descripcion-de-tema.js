
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn(
    'Temas',
    'descripcion',
    {
      type: Sequelize.TEXT,
    },
  ),

  down: (queryInterface, Sequelize) => queryInterface.changeColumn(
    'Temas',
    'descripcion',
    {
      type: Sequelize.STRING,
    },
  ),
};
