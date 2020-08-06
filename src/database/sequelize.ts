const Sequelize = require('sequelize');

const sequelize = new Sequelize('user', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});
export default sequelize;