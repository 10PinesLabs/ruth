
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

function testSequelizeConecction(sequelize) {
  sequelize.authenticate().then(() => {
    console.log('Se logro establecer conexion a la base de datos');
  }).catch((err) => {
    console.error('No se logro conectar a la base de datos!!!!!', err);
  });
}

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  testSequelizeConecction(sequelize);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  testSequelizeConecction(sequelize);
}

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;

export default db;
