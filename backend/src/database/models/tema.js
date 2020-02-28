
module.exports = (sequelize, DataTypes) => {
  const Tema = sequelize.define('Tema', {
    tipo: DataTypes.STRING,
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    duracion: DataTypes.STRING,
    autor: DataTypes.STRING,
    obligatoriedad: DataTypes.STRING,
    linkDePresentacion: DataTypes.STRING,
    propuestas: DataTypes.JSON,
    temasParaRepasar: DataTypes.JSON,
    cantidadDeMinutosDelTema: DataTypes.INTEGER,
    prioridad: DataTypes.INTEGER,
    mailDelAutor: DataTypes.STRING,
  }, {});
  Tema.associate = function (models) {
    Tema.Reunion = Tema.belongsTo(models.Reunion, { foreignKey: 'reunionId' });
  };
  return Tema;
};
