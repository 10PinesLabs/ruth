
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Usuarios', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    usuario: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Usuarios'),
};
