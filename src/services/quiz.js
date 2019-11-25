import HiraganaQuiz from '../models/HiraganaQuizModel';
import KatakanaQuiz from '../models/KatakanaQuizModel';

const quizFactory = (kana, level) => {
  switch (kana) {
    case 'katakana':
      return new KatakanaQuiz(level);
    default:
      return new HiraganaQuiz(level);
  }
};

export const createQuiz = (kana, level = 'easy') => {
  return quizFactory(kana, level);
};
