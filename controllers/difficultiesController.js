const { db } = require("../db/index");

const {
  categoryAndDifficultyService,
} = require("../services/categoryAndDifficultyService");

const getAllDifficulties = async (req, res) => {
  try {

    const difficulties = await categoryAndDifficultyService(
      db.difficulty,
      "difficulty",
      "ASC"
    );

    res.json(difficulties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllDifficulties };
