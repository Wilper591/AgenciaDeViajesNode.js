const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL, {
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 20000,
  },
  operatorAliases: false,
});

module.exports = db;
