import { createQuiz } from './quiz';

describe('Quiz', () => {
  describe('when starting a new katakana quiz', () => {
    it('returns 48 questions', () => {
      const quiz = createQuiz('katakana', 'easy');

      expect(quiz.size).toEqual(74);
    });

    describe('with level medium', () => {
      it('has 72 questions left', () => {
        const quiz = createQuiz('katakana', 'medium');

        expect(quiz.size).toEqual(218);
      });
    });

    describe('with level difficult', () => {
      it('has 104 questions left', () => {
        const quiz = createQuiz('katakana', 'difficult');

        expect(quiz.size).toEqual(250);
      });
    });
  });

  describe('when starting a new hiragana quiz', () => {
    it('returns 48 questions', () => {
      const quiz = createQuiz('hiragana', 'easy');

      expect(quiz.size).toEqual(46);
    });

    describe('with level medium', () => {
      it('has 72 questions left', () => {
        const quiz = createQuiz('hiragana', 'medium');

        expect(quiz.size).toEqual(72);
      });
    });

    describe('with level difficult', () => {
      it('has 104 questions left', () => {
        const quiz = createQuiz('hiragana', 'difficult');

        expect(quiz.size).toEqual(104);
      });
    });
  });
});
