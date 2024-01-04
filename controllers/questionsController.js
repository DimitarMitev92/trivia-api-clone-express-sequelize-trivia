const { sequelize } = require("../database");
const { shuffleArray } = require("../utils/shuffleArray");
const { pascalCase } = require("../utils/pascalCase");
const { lowerCase } = require("../utils/lowerCase");

const getAllQuestions = async (req, res) => {
  try {
    const category = pascalCase(req.query.category);
    const difficulty = lowerCase(req.query.difficulty);

    const checkIfCategoryExistQuery = `SELECT category 
      FROM categories 
      INNER JOIN questions 
        ON questions."categoryId" = categories."id"
      WHERE categories.category = '${category}'`;

    const checkIfCategoryExistArray = await sequelize.query(
      checkIfCategoryExistQuery,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (checkIfCategoryExistArray.length === 0)
      throw new Error("No such category exists in the database.");

    const checkIfDifficultyExistQuery = `SELECT difficulty
      FROM difficulties
      INNER JOIN questions
        ON questions."difficultyId" = difficulties."id"
      WHERE difficulties.difficulty = '${difficulty}'`;

    const checkIfDifficultyExistArray = await sequelize.query(
      checkIfDifficultyExistQuery,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (checkIfDifficultyExistArray.length === 0)
      throw new Error("No such difficulty exist in the database.");

    const query = `
    SELECT questions."id" AS questionId,questions."question",questions."correct_answer",questions."all_answers",categories."category",difficulties."difficulty" 
    FROM questions
    INNER JOIN categories
      ON questions."categoryId" = categories."id"
    INNER JOIN difficulties
      ON questions."difficultyId" = difficulties."id"
    WHERE categories."category" = '${category}' AND difficulties."difficulty" = '${difficulty}'`;
    const questions = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    const shuffleQuestions = await shuffleArray(questions);
    res.json(shuffleQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllQuestions,
};
