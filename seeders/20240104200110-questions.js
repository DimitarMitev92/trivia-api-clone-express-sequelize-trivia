"use strict";

const { transformJson } = require("../utils/transformJson");
const { db } = require("../db/index");
const data = require("../data.json");
const quizzesData = transformJson(data);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Seed questions
    const questions = quizzesData.map(async (quiz) => {
      const existingQuestion = await db.questions.findAll({
        where: {
          question: quiz.question,
        },
      });

      if (existingQuestion.length === 0) {
        const categoryId = await db.category.findAll({
          where: {
            category: quiz.category,
          },
        });

        const difficultyId = await db.difficulty.findAll({
          where: {
            difficulty: quiz.difficulty,
          },
        });

        return {
          question: quiz.question,
          correct_answer: quiz.correct_answer,
          all_answers: quiz.all_answers,
          categoryId: categoryId[0].id,
          difficultyId: difficultyId[0].id,
          created: new Date(),
          updated: new Date(),
        };
      }
    });

    const resolvedQuestions = await Promise.all(questions);

    const newQuestions = resolvedQuestions.filter(Boolean);
    if (newQuestions.length !== 0) {
      await queryInterface.bulkInsert("questions", newQuestions);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("questions", null, {});
  },
};
