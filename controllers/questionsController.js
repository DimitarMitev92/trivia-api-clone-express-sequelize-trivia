const { db } = require("../db/index");
const { shuffledArray } = require("../utils/shuffleArray");

const getAllQuestionsByCategoryAndDifficulty = async (req, res) => {
  try {
    const categoryId = req.query.category;
    const difficultyId = req.query.difficulty;

    const categoryExist = await db.category.findAll({
      where: {
        id: categoryId,
      },
    });

    if (categoryExist.length === 0) {
      throw new Error("No such category exists");
    }

    const difficultyExist = await db.difficulty.findAll({
      where: {
        id: difficultyId,
      },
    });

    if (difficultyExist.length === 0) {
      throw new Error("No such difficulty exists");
    }

    const questionsForCategory = await db.questions.findAll({
      where: {
        categoryId: categoryId,
        difficultyId: difficultyId,
      },
    });
    res.json(shuffledArray(questionsForCategory));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllQuestionsByCategoryAndDifficulty };
