import Quiz from './QuizModel';

import data from '../data/katakana';

class Katakana extends Quiz {
  constructor(level) {
    super(data, level);
  }

  get limit() {
    switch (this.level) {
      case 'easy':
        return 74;
      case 'medium':
        return 218;
      default:
        return Object.keys(this.dictionary).length;
    }
  }
}

export default Katakana;
