import { createQuiz } from './quiz';

describe('Quiz', () => {
  describe('when starting a new quiz', () => {
    it('returns 48 questions', () => {
      const quiz = createQuiz('easy');

      expect(quiz).toHaveLength(48);
    });

    describe('with level medium', () => {
      it('has 72 questions left', () => {
        const quiz = createQuiz('medium');

        expect(quiz).toHaveLength(72);
      });
    });

    describe('with level difficult', () => {
      it('has 104 questions left', () => {
        const quiz = createQuiz('difficult');

        expect(quiz).toHaveLength(104);
      });
    });
  });
});
