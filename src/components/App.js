import React, { useReducer } from 'react';
import styled from 'styled-components';

import Hiragana from './Hiragana';
import { ChoiceGroup, ChoiceButton } from './ChoiceButton';
import Timer from './Timer';

import Quiz from '../services/quiz';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  padding: 20px;
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

  const onTimeout = () => {
    console.log('Timeout!');
  };

  return (
    <Container>
      <Hiragana char={hiragana} size="large" />
      <ChoiceGroup>
        {choices.map(choice => (
          <ChoiceButton key={choice}>{choice}</ChoiceButton>
        ))}
      </ChoiceGroup>
      <Timer id={hiragana} onTimeout={onTimeout} />
    </Container>
  );
};

export default App;
