import React, { useReducer } from 'react';
import styled from 'styled-components';

import Hiragana from './Hiragana';

import Quiz from '../services/quiz';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  justify-content: center;
`;

const ChoiceBox = styled.div`
  border: 1px solid pink;
`;

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const createQuiz = () => new Quiz();

const App = () => {
  const [quiz, dispatch] = useReducer(reducer, null, createQuiz);
  const [hiragana, choices] = quiz.next();

  return (
    <Container>
      <Hiragana char={hiragana} size="large" />
      <ChoiceBox>
        {choices.map(choice => (
          <button key={choice}>{choice}</button>
        ))}
      </ChoiceBox>
    </Container>
  );
};

export default App;
