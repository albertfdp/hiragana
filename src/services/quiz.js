import data from '../data/hiragana';
import shuffle from '../utils/shuffle';

const DIACRITICS_INDEX = 48;
const DIGRAPHS_INDEX = 72;

class Quiz {
  constructor(level = 'easy') {
    this.level = level;

    this.dictionary = Object.keys(data).slice(0, this.getMaxForLevel(level));
    this.questions = this.generateQuestions();
    this.answers = [];
  }

  getMaxForLevel(level) {
    if (level === 'easy') {
      return DIACRITICS_INDEX;
    } else if (level === 'medium') {
      return DIGRAPHS_INDEX;
    }

    return Object.keys(data).length;
  }

  get total() {
    return this.dictionary.length;
  }

  get progress() {
    return this.answers.length;
  }

  getQuestionsLeft() {
    return this.total - this.progress;
  }

  getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  getRomaji(char) {
    return data[char];
  }

  generateQuestions() {
    const questionsWithChoices = [];
    const questions = shuffle([...this.dictionary]);

    for (const question of questions) {
      // the question to be asked
      const choices = [data[question]];

      while (choices.length < 4) {
        const choiceIndex = this.getRandomIndex(questions);
        const key = questions[choiceIndex];
        const value = data[key];

        if (!choices.includes(value)) {
          choices.push(value);
        }
      }

      questionsWithChoices.push([question, shuffle(choices)]);
    }

    return questionsWithChoices;
  }

  isCorrectAnswer(question, choice) {
    const solution = this.getRomaji(question[0]);

    return solution === choice;
  }

  answer(choice) {
    const question = this.next();
    const correctAnswer = this.isCorrectAnswer(question, choice);

    this.answers.push(correctAnswer);

    return correctAnswer;
  }

  next() {
    const currentIndex = this.answers.length;
    return this.questions[currentIndex];
  }
}

export default Quiz;
