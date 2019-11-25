class QuestionModel {
  constructor({ question, solution, choices }) {
    this.question = question;
    this.solution = solution;
    this.choices = choices;
  }

  checkAnswer(answer) {
    return this.solution === answer;
  }
}

export default QuestionModel;
