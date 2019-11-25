import { createQuiz } from '../../services/quiz';

export const initialState = {
  answers: [],
  completed: false,
  current: null,
  lastAnswer: null,
  quiz: null
};

function getNext(quiz, index) {
  if (index < quiz.size - 1) {
    return index + 1;
  }

  return index;
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'answer': {
      const question = state.quiz.get(state.current);
      const correctAnswer = question.checkAnswer(action.data);

      return {
        ...state,
        lastAnswer: action.data,
        answers: state.answers.concat(correctAnswer)
      };
    }

    case 'next': {
      return {
        ...state,
        completed: state.quiz.size === state.answers.length,
        current: getNext(state.quiz, state.current),
        lastAnswer: null
      };
    }

    case 'timeout': {
      return {
        ...state,
        answers: state.answers.concat(false),
        lastAnswer: false
      };
    }
    default:
      return state;
  }
};

export const createInit = kana => () => ({
  answers: [],
  completed: false,
  current: 0,
  lastAnswer: null,
  quiz: createQuiz(kana)
});
