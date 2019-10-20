import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { Button } from './Choice';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizeHuge}px;
  text-align: center;
`;

const StartButton = styled(Button)`
  min-width: 200px;
`;

const Welcome = ({ onStart }) => {
  return (
    <Container>
      <Title>ひらがな</Title>
      <div>
        <StartButton autoFocus onClick={onStart}>
          Start Quiz
        </StartButton>
      </div>
    </Container>
  );
};

Welcome.propTypes = {
  onStart: PropTypes.func.isRequired
};

export default Welcome;
