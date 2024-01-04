async function doesValueExist(model, property, value) {
  try {
    const result = await model.findOne({
      where: {
        [property]: value,
      },
    });
    return result !== null;
  } catch (error) {
    console.error("Error checking if value exists:", error);
    return false;
  }
}

module.exports = { doesValueExist };
