function pascalCase(string) {
  return string
    .split("")
    .map((word, index) => {
      if (index === 0) return word.toUpperCase();
      else return word.toLowerCase();
    })
    .join("");
}

module.exports = { pascalCase };
