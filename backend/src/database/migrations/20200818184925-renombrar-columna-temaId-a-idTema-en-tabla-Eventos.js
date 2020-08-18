
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Eventos', 'temaId', 'idTema');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Eventos', 'idTema', 'temaId');
  },
};
