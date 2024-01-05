const questionsService = require("../services/questionsService");

const getAllQuestionsByCategoryAndDifficulty = async (req, res) => {
  try {
    const shuffledArray =
      await questionsService.shuffledQuestionsByCategoryAndDifficulty(req, res);
    res.json(shuffledArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllQuestionsByCategoryAndDifficulty };
