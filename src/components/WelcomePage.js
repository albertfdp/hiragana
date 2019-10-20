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

const Footer = styled.footer`
  bottom: 10px;
  opacity: 0.4;
  position: absolute;
  right: 20px;
`;

const Link = styled.a`
  text-decoration: underline;
  color: ${props => props.theme.colorWhite};
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
      <Footer>
        <span>
          Made by{' '}
          <Link
            href="https://nandez.cat?utm_source=hiragana"
            rel="noopener noreferrer"
            target="_blank"
          >
            nandez.cat
          </Link>
        </span>
      </Footer>
    </Container>
  );
};

Welcome.propTypes = {
  onStart: PropTypes.func.isRequired
};

export default Welcome;
