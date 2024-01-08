const { shuffledArray } = require("../utils/shuffleArray");
const { db } = require("../db/index");
const { Op, Sequelize } = require("sequelize");

const shuffledQuestionsByCategoryAndDifficulty = async (req, res) => {
  const categoryId = req.query.category;
  const difficultyId = req.query.difficulty;

  const categoryExist = await db.category.findByPk(categoryId);

  if (categoryExist === null) {
    //RETURN res.json and status
    throw new Error("No such category exists");
  }

  const difficultyExist = await db.difficulty.findByPk(difficultyId);

  if (difficultyExist === null) {
    //RETURN res.json and status
    throw new Error("No such difficulty exists");
  }

  // CREATE ASSIGNMENT FOR UUID ERROR THROW

  const questionsForCategory = await db.questions.findAll({
    where: {
      categoryId: categoryId,
      difficultyId: difficultyId,
    },
  });

  const shuffledData = shuffledArray(questionsForCategory);

  return shuffledData;
};

module.exports = { shuffledQuestionsByCategoryAndDifficulty };
