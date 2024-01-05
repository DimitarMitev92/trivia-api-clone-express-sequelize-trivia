const { db } = require("../db/index");

const getAllCategories = async (req, res) => {
  try {
    const categories = await db.category.findAll({
      order: [["category", "ASC"]],
    });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllCategories };
