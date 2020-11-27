
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Eventos',
      'idTema',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Temas',
          key: 'id',
        },
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Eventos',
      'idTema',
      { },
    );
  },
};
