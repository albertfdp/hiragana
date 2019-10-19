import { createQuiz } from '../../services/quiz';

export const initialState = {
  questions: [],
  current: null,
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
        current: getNext(state.questions, state.current),
        answers: state.answers.concat(correctAnswer)
      };
    }

    case 'timeout': {
      return {
        ...state,
        current: getNext(state.questions, state.current),
        answers: state.answers.concat(false)
      };
    }
    default:
      return state;
  }
};

export const init = () => ({
  questions: createQuiz(),
  current: 0,
  answers: []
});
