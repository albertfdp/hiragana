import { createQuiz } from '../../services/quiz';

export const initialState = {
  answers: [],
  completed: false,
  current: null,
  lastAnswer: null,
  questions: []
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
        completed: state.questions.length === state.answers.length,
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
  answers: [],
  completed: false,
  current: 0,
  lastAnswer: null,
  questions: createQuiz()
});
