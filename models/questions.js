"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      questions.belongsTo(models.category, {
        foreignKey: "categoryId",
        as: "categories",
      });
      questions.belongsTo(models.difficulty, {
        foreignKey: "difficultyId",
        as: "difficulties",
      });
    }
  }
  questions.init(
    {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      question: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      correct_answer: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      all_answers: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      },
      difficultyId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "questions",
      createdAt: "created",
      updatedAt: "updated",
      deletedAt: "deleted",
      paranoid: true,
      freezeTableName: true,
      timestamps: true,
    }
  );
  return questions;
};
