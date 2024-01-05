const categoryAndDifficultyService = async (table, tableProperty, orderBy) => {
  const data = await table.findAll({
    order: [[tableProperty, orderBy]],
  });

  return data;
};

module.exports = { categoryAndDifficultyService };
