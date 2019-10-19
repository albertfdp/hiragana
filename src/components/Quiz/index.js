import React, { useReducer } from 'react';
import styled from 'styled-components';

import Hiragana from '../Hiragana';
import { ChoiceGroup, ChoiceButton } from '../ChoiceButton';
import Timer from '../Timer';

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

export default Quiz;
