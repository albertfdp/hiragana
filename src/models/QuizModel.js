import Question from './QuestionModel';
import shuffle from '../utils/shuffle';

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

class QuizModel {
  constructor(dictionary, level, { choiceCount = 4 } = {}) {
    this.dictionary = dictionary;
    this.level = level;
    this.choiceCount = choiceCount;

    this.questions = this.generateQuestions();
  }

  get limit() {
    return Object.keys(this.dictionary).length;
  }

  get size() {
    return this.questions.length;
  }

  get(index) {
    return this.questions[index];
  }

  generateQuestions() {
    const entries = Object.keys(this.dictionary).slice(0, this.limit);
    const poolOfQuestions = shuffle([...entries]);

    return poolOfQuestions.map(char => {
      const correctAnswer = this.dictionary[char];
      const choices = [correctAnswer];

      while (choices.length < this.choiceCount) {
        const choiceIndex = getRandomIndex(poolOfQuestions);
        const key = poolOfQuestions[choiceIndex];
        const value = this.dictionary[key];

        if (!choices.includes(value)) {
          choices.push(value);
        }
      }

      return new Question({
        question: char,
        solution: correctAnswer,
        choices: shuffle(choices)
      });
    });
  }

  shuffle() {
    this.questions = shuffle(this.questions);
  }
}

export default QuizModel;
