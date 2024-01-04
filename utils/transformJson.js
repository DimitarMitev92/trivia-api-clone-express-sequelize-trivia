function transformJson(inputJson) {
  const outputJson = [];

  inputJson.forEach((question) => {
    const correctAnswer = question.correct_answer;
    const incorrectAnswers = question.incorrect_answers;
    const allAnswers = incorrectAnswers.concat(correctAnswer);

    const transformedQuestion = {
      type: question.type,
      difficulty: question.difficulty,
      category: question.category,
      question: question.question,
      correct_answer: correctAnswer,
      all_answers: allAnswers,
    };

    outputJson.push(transformedQuestion);
  });

  return outputJson;
}

module.exports = { transformJson };
