module.exports = (sequelize, DataTypes) => {
  const Evento = sequelize.define('Evento', {
    evento: DataTypes.JSON,
  }, {});

  Evento.associate = (models) => {
    Evento.Tema = Evento.belongsTo(models.Tema, { foreignKey: 'temaId' });
    Evento.Reunion = Evento.belongsTo(models.Reunion, { foreignKey: 'reunionId' });
  };

  return Evento;
};
