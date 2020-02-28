
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Eventos', 'reunionId', {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Reunions',
      key: 'id',
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Eventos', 'reunionId'),
};
