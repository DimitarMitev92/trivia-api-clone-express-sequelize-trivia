const { sequelize } = require("../database");

const getAllDifficulties = async (req, res) => {
  try {
    const query = "SELECT * FROM difficulties ORDER BY difficulty ASC";
    const difficulties = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.json(difficulties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllDifficulties,
};
