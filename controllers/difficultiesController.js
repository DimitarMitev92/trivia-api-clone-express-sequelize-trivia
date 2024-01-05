const { db } = require("../db/index");

const getAllDifficulties = async (req, res) => {
  try {
    const difficulties = await db.difficulty.findAll({
      order: [["difficulty", "ASC"]],
    });
    res.json(difficulties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllDifficulties };
