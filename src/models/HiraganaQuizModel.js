import Quiz from './QuizModel';

import data from '../data/hiragana';

class HiraganaModel extends Quiz {
  constructor(level) {
    super(data, level);
  }

  get limit() {
    switch (this.level) {
      case 'easy':
        return 46;

      case 'medium':
        return 72;
      default:
        return Object.keys(this.dictionary).length;
    }
  }
}

export default HiraganaModel;
