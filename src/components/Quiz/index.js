import React, { useReducer } from 'react';
import styled from 'styled-components';

import Hiragana from '../Hiragana';
import { ChoiceGroup, ChoiceButton } from '../ChoiceButton';

import { reducer, initialState, init } from './reducer';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  padding: 20px;
`;

const Quiz = () => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const { question, choices, answer } = state.questions[state.current];

  const onAnswer = choice => {
    return dispatch({ type: 'answer', data: choice });
  };

  return (
    <Container>
      <Hiragana char={question} size="large" />
      <ChoiceGroup
        id={question}
        right={answer}
        onAnswer={onAnswer}
        onTimeout={() => dispatch({ type: 'timeout' })}
      >
        {choices.map(choice => (
          <ChoiceButton key={choice} value={choice}>
            {choice}
          </ChoiceButton>
        ))}
      </ChoiceGroup>
    </Container>
  );
};

export default Quiz;
