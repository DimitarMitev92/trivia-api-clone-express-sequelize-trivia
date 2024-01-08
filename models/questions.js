"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
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
        validate: {
          isUUID: 4,
        },
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
      //CHANGE categoryId to correct_id
      categoryId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        validate: {
          isUUID: 4,
        },
      },
      //CHANGE difficultyId to difficulty_id
      difficultyId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        validate: {
          isUUID: 4,
        },
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
