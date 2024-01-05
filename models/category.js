"use strict";

const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      category.hasMany(models.questions, {
        foreignKey: "categoryId",
        as: "questions",
      });
    }
  }
  category.init(
    {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      category: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "categories",
      createdAt: "created",
      updatedAt: "updated",
      deletedAt: "deleted",
      paranoid: true,
      freezeTableName: true,
      timestamps: true,
    }
  );
  return category;
};
