"use strict";

const { QueryTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { transformJson } = require("../utils/transformJson");

const data = require("../data.json");
const quizzesData = transformJson(data);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categoriesMap = {};
    const difficultiesMap = {};

    // Seed categories
    for (const quiz of quizzesData) {
      if (!categoriesMap[quiz.category]) {
        const existingCategory = await queryInterface.sequelize.query(
          `SELECT * FROM categories WHERE category = '${quiz.category}'`,
          {
            type: QueryTypes.SELECT,
          }
        );

        if (existingCategory.length === 0) {
          await queryInterface.bulkInsert("categories", [
            {
              id: uuidv4(),
              category: quiz.category,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]);
          categoriesMap[quiz.category] = true;
        }
      }
    }

    // Seed difficulties
    for (const quiz of quizzesData) {
      if (!difficultiesMap[quiz.difficulty]) {
        const existingDifficulty = await queryInterface.sequelize.query(
          `SELECT * FROM difficulties WHERE difficulty = '${quiz.difficulty}'`,
          {
            type: QueryTypes.SELECT,
          }
        );
        if (existingDifficulty.length === 0) {
          await queryInterface.bulkInsert("difficulties", [
            {
              id: uuidv4(),
              difficulty: quiz.difficulty,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]);
          difficultiesMap[quiz.difficulty] = true;
        }
      }
    }

    // Seed Questions
    const questions = quizzesData.map(async (quiz) => {
      const existingQuestion = await queryInterface.sequelize.query(
        `SELECT * FROM questions WHERE question = '${quiz.question}'`,
        {
          type: QueryTypes.SELECT,
        }
      );

      if (existingQuestion.length === 0) {
        const categoryIdQuery = `SELECT id FROM "categories" WHERE category = '${quiz.category}'`;
        const difficultyIdQuery = `SELECT id FROM "difficulties" WHERE difficulty = '${quiz.difficulty}'`;

        const categoryId = await queryInterface.sequelize.query(
          categoryIdQuery,
          {
            type: QueryTypes.SELECT,
          }
        );

        const difficultyId = await queryInterface.sequelize.query(
          difficultyIdQuery,
          {
            type: QueryTypes.SELECT,
          }
        );

        return {
          id: uuidv4(),
          question: quiz.question,
          correct_answer: quiz.correct_answer,
          all_answers: quiz.all_answers,
          categoryId: categoryId[0].id, // Use the first result
          difficultyId: difficultyId[0].id, // Use the first result
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
    });

    const resolvedQuestions = await Promise.all(questions);

    const newQuestions = resolvedQuestions.filter(Boolean);
    if (newQuestions.length !== 0) {
      await queryInterface.bulkInsert("questions", newQuestions);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("questions", null, {});
    await queryInterface.bulkDelete("difficulties", null, {});
    await queryInterface.bulkDelete("categories", null, {});
  },
};
