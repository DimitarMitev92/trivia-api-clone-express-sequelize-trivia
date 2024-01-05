"use strict";

const { transformJson } = require("../utils/transformJson");
const { db } = require("../db/index");
const data = require("../data.json");
const quizzesData = transformJson(data);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const difficultiesMap = {};

    //Seed difficulties
    for (const quiz of quizzesData) {
      if (!difficultiesMap[quiz.difficulty]) {
        const existingDifficulty = await db.difficulty.findAll({
          where: {
            difficulty: quiz.difficulty,
          },
        });

        if (existingDifficulty.length === 0) {
          await queryInterface.bulkInsert("difficulties", [
            {
              difficulty: quiz.difficulty,
              created: new Date(),
              updated: new Date(),
            },
          ]);
          difficultiesMap[quiz.difficulty] = true;
        }
      }
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("difficulties", null, {});
  },
};
