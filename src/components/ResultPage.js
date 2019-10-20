import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Button } from './Choice';
import CountUp from 'react-countup';

const Text = styled.h1`
  font-size: 60px;
  margin-bottom: 30px;
`;

const Percentage = styled.h2`
  font-size: ${props => props.theme.fontSizeHuge}px;
  margin-top: 0;

  &:after {
    content: '%';
  }
`;

const RestartButton = styled(Button)`
  min-width: 200px;
`;

const count = answers =>
  answers.reduce((sum, answer) => {
    if (answer) {
      return sum + 1;
    }

    return sum;
  }, 0);

const getMessage = percentage => {
  if (percentage === 100) {
    return `Excellent!`;
  } else if (percentage > 80) {
    return 'Great job!';
  } else if (percentage > 50) {
    return 'Keep working';
  }

  return 'Oops..';
};

const ResultPage = ({ results, onRestart }) => {
  const correctAnswers = count(results);
  const percentage = (correctAnswers * 100) / results.length;

  return (
    <Fragment>
      <Text>{getMessage(percentage)}</Text>
      <CountUp start={0} end={percentage} delay={0}>
        {({ countUpRef }) => <Percentage ref={countUpRef} />}
      </CountUp>
      <div>
        <RestartButton onClick={onRestart}>Try again</RestartButton>
      </div>
    </Fragment>
  );
};

export default ResultPage;
