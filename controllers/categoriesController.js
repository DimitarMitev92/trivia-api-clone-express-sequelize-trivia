const { sequelize } = require("../database");

const getAllCategories = async (req, res) => {
  try {
    const query = "SELECT * FROM categories ORDER BY category ASC";
    const categories = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllCategories,
};
