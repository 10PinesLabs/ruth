
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    usuario: DataTypes.STRING,
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
  }, { timestamps: false });
  Usuario.associate = function () {
    // associations can be defined here
  };
  return Usuario;
};
