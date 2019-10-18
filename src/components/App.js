import React, { useReducer, useState, useEffect } from 'react';
import styled from 'styled-components';

import Hiragana from './Hiragana';
import { ChoiceGroup, ChoiceButton } from './ChoiceButton';
import Timer from './Timer';

import { createQuiz, checkAnswer } from '../services/quiz';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  padding: 20px;
`;

const initialState = {
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

const reducer = (state, action) => {
  switch (action.type) {
    case 'answer': {
      const correctAnswer = checkAnswer(
        state.questions[state.current],
        action.data
      );

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

const init = () => ({
  questions: createQuiz(),
  current: 0,
  answers: []
});

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const [hiragana, choices] = state.questions[state.current];

  return (
    <Container>
      <Hiragana char={hiragana} size="large" />
      <ChoiceGroup>
        {choices.map(choice => (
          <ChoiceButton
            key={choice}
            onClick={() => dispatch({ type: 'answer', data: choice })}
          >
            {choice}
          </ChoiceButton>
        ))}
      </ChoiceGroup>
      <Timer
        id={hiragana}
        onTimeout={() => dispatch({ type: 'timeout' })}
        duration={10000}
      />
    </Container>
  );
};

export default App;
