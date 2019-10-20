import data from '../data/hiragana';
import shuffle from '../utils/shuffle';

const DIACRITICS_INDEX = 48;
const DIGRAPHS_INDEX = 72;

function getLimitForLevel(level) {
  if (level === 'easy') {
    return DIACRITICS_INDEX;
  } else if (level === 'medium') {
    return DIGRAPHS_INDEX;
  }

  return Object.keys(data).length;
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

export const createQuiz = (level = 'easy') => {
  const limit = getLimitForLevel(level);
  const dictionary = Object.keys(data).slice(0, limit);

  const questions = shuffle([...dictionary]);

  return questions.map(hiragana => {
    const correctAnswer = getAnswer(hiragana);
    const choices = [correctAnswer];

    while (choices.length < 4) {
      const choiceIndex = getRandomIndex(questions);
      const key = questions[choiceIndex];
      const value = data[key];

      if (!choices.includes(value)) {
        choices.push(value);
      }
    }

    return {
      question: hiragana,
      answer: correctAnswer,
      choices: shuffle(choices)
    };
  });
};

export const getAnswer = char => {
  return data[char];
};
