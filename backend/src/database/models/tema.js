
module.exports = (sequelize, DataTypes) => {
  const Tema = sequelize.define('Tema', {
    tipo: DataTypes.STRING,
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    duracion: DataTypes.STRING,
    autor: DataTypes.STRING,
    obligatoriedad: DataTypes.STRING,
    linkDePresentacion: DataTypes.STRING,
    propuestas: DataTypes.JSON,
    temasParaRepasar: DataTypes.JSON,
    inicio: DataTypes.DATE,
    fin: DataTypes.DATE,
    cantidadDeMinutosDelTema: DataTypes.INTEGER,
    prioridad: DataTypes.INTEGER,
  }, {});
  Tema.associate = function (models) {
    Tema.Reunion = Tema.belongsTo(models.Reunion, {as: 'reunion'});
  };
  return Tema;
};
