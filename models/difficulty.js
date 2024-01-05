"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class difficulty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      difficulty.hasMany(models.questions, {
        foreignKey: "difficultyId",
        as: "questions",
      });
    }
  }
  difficulty.init(
    {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      difficulty: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "difficulties",
      createdAt: "created",
      updatedAt: "updated",
      deletedAt: "deleted",
      paranoid: true,
      freezeTableName: true,
      timestamps: true,
    }
  );
  return difficulty;
};
