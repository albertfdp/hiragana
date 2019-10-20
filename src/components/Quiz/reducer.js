import { createQuiz } from '../../services/quiz';

export const initialState = {
  questions: [],
  current: null,
  lastAnswer: null,
  answers: []
};

function getNext(questions, index) {
  if (index < questions.length - 1) {
    return index + 1;
  }

  return index;
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'answer': {
      const { answer } = state.questions[state.current];
      const correctAnswer = answer === action.data;

      return {
        ...state,
        lastAnswer: action.data,
        answers: state.answers.concat(correctAnswer)
      };
    }

    case 'next': {
      return {
        ...state,
        current: getNext(state.questions, state.current),
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

export const init = () => ({
  questions: createQuiz(),
  current: 0,
  lastAnswer: null,
  answers: []
});
