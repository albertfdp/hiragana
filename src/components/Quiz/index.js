import React, { useReducer, useRef } from 'react';
import PropTypes from 'prop-types';

import Hiragana from '../Hiragana';
import { ChoiceGroup, ChoiceButton } from '../Choice';
import ResultPage from '../ResultPage';

import { Container, Question, Answers } from './views';
import CancelButton from '../CancelButton';

import { reducer, initialState, createInit } from './reducer';

const getStatusForType = (lastAnswer, correctAnswer) => {
  if (lastAnswer === null) {
    return;
  }

  if (lastAnswer !== correctAnswer) {
    return 'wrong';
  }

  return 'right';
};

const Quiz = ({ kana, onRestart }) => {
  const timer = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState, createInit(kana));

  const onAnswer = choice => {
    clearTimeout(timer.current);

    if (choice) {
      dispatch({ type: 'answer', data: choice });
    } else {
      dispatch({ type: 'timeout' });
    }

    timer.current = setTimeout(() => {
      dispatch({ type: 'next' });
    }, 1000);
  };

  const { current, quiz, lastAnswer, answers, completed } = state;
  const question = quiz.get(current);

  const status = getStatusForType(lastAnswer, question.solution);

  if (completed) {
    return (
      <Container>
        <ResultPage onRestart={onRestart} results={answers} />
      </Container>
    );
  }

  return (
    <Container status={status}>
      <CancelButton onClick={onRestart} />
      <Question>
        <Hiragana size="large" status={status}>
          {question.question}
        </Hiragana>
      </Question>
      <Answers>
        <ChoiceGroup
          id={question.question}
          right={question.solution}
          answer={lastAnswer}
          onAnswer={onAnswer}
          onTimeout={() => onAnswer(null)}
        >
          {question.choices.map(choice => (
            <ChoiceButton key={choice} value={choice}>
              {choice}
            </ChoiceButton>
          ))}
        </ChoiceGroup>
      </Answers>
    </Container>
  );
};

Quiz.propTypes = {
  kana: PropTypes.oneOf(['hiragana', 'katakana']),
  onRestart: PropTypes.func
};

export default Quiz;
