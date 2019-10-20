import React, { useReducer, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import Hiragana from '../Hiragana';
import { ChoiceGroup, ChoiceButton } from '../Choice';

import { reducer, initialState, init } from './reducer';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  padding: 20px;
  color: ${props =>
    props.status === 'right'
      ? props.theme.colorRight
      : props.status === 'wrong'
      ? props.theme.colorWrong
      : props.theme.colorText};
`;

const getStatusForType = (lastAnswer, correctAnswer) => {
  if (lastAnswer === null) {
    return;
  }

  if (lastAnswer !== correctAnswer) {
    return 'wrong';
  }

  return 'right';
};

const Quiz = () => {
  const timer = useRef(null);
  const [{ current, questions, lastAnswer }, dispatch] = useReducer(
    reducer,
    initialState,
    init
  );

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  const onAnswer = choice => {
    clearTimeout(timer.current);

    if (choice) {
      dispatch({ type: 'answer', data: choice });
    } else {
      dispatch({ type: 'timeout' });
    }

    timer.current = setTimeout(() => {
      dispatch({ type: 'next' });
    }, 2000);
  };

  const { question, choices, answer: correctAnswer } = questions[current];
  const status = getStatusForType(lastAnswer, correctAnswer);

  return (
    <Container status={status}>
      <Hiragana size="large" status={status}>
        {question}
      </Hiragana>
      <ChoiceGroup
        id={question}
        right={correctAnswer}
        answer={lastAnswer}
        onAnswer={onAnswer}
        onTimeout={() => onAnswer(null)}
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
