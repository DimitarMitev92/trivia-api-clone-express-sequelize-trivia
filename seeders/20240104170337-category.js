"use strict";

const { transformJson } = require("../utils/transformJson");
const { db } = require("../db/index");
const data = require("../data.json");
const quizzesData = transformJson(data);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const categoriesMap = {};
    // Seed categories
    for (const quiz of quizzesData) {
      if (!categoriesMap[quiz.category]) {
        const existingCategory = await db.category.findAll({
          where: {
            category: quiz.category,
          },
        });
        if (existingCategory.length === 0) {
          await queryInterface.bulkInsert("categories", [
            {
              category: quiz.category,
              created: new Date(),
              updated: new Date(),
            },
          ]);
          categoriesMap[quiz.category] = true;
        }
      }
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
