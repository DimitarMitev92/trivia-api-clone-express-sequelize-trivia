const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: "postgres",
    omitNull: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 1000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connected to DB."))
  .catch((err) => console.log(err));

const db = {
  sequelize: sequelize,
  category: require("../models/category")(sequelize),
  difficulty: require("../models/difficulty")(sequelize),
  questions: require("../models/questions")(sequelize),
};

db.difficulty.hasMany(db.questions, {
  foreignKey: "difficultyId",
  as: "difficulties",
});

db.category.hasMany(db.questions, {
  foreignKey: "categoryId",
  as: "categories",
});

module.exports = { db };
