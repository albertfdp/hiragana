import Quiz from './quiz';

describe('Quiz', () => {
  describe('when starting a new quiz', () => {
    let quiz;

    beforeEach(() => {
      quiz = new Quiz('easy');
    });

    it('has 48 questions left', () => {
      const quiz = new Quiz('easy');

      expect(quiz.getQuestionsLeft()).toEqual(48);
    });

    it('has 0 questions asked', () => {
      expect(quiz.progress).toEqual(0);
    });

    it('returns the first question', () => {
      const question = quiz.next();

      expect(question).toHaveLength(2);
      expect(question[1]).toHaveLength(4);

      expect(question[1]).toContain(quiz.getRomaji(question[0]));
    });

    describe('when answering', () => {
      describe('with the correct answer', () => {
        let correctAnswer;

        beforeEach(() => {
          const question = quiz.next();

          correctAnswer = quiz.answer(quiz.getRomaji(question[0]));
        });

        it('increases the number of questions asked', () => {
          expect(quiz.progress).toEqual(1);
          expect(correctAnswer).toBe(true);
        });
      });
    });

    describe('with level medium', () => {
      it('has 72 questions left', () => {
        const quiz = new Quiz('medium');

        expect(quiz.getQuestionsLeft()).toEqual(72);
      });
    });

    describe('with level difficult', () => {
      it('has 104 questions left', () => {
        const quiz = new Quiz('difficult');

        expect(quiz.getQuestionsLeft()).toEqual(104);
      });
    });
  });
});
