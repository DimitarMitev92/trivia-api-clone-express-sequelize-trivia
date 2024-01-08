"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  //class must be Upper case
  class difficulty extends Model {
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
        validate: {
          isUUID: 4,
        },
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
