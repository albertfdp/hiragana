import React from 'react';

import styled from 'styled-components';

import { Link } from '@reach/router';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizeHuge};
  text-align: center;
`;

const StartButton = styled(Link)`
  flex-grow: 0;
  font-size: ${props => props.theme.fontSizeBase};
  min-width: 200px;
  text-transform: uppercase;
  width: 80%;

  @media (min-width: 981px) {
    width: initial;
  }
`;

const Footer = styled.footer`
  bottom: 10px;
  opacity: 0.4;
  position: absolute;
  right: 20px;
`;

const ExternalLink = styled.a`
  text-decoration: underline;
  color: ${props => props.theme.colorWhite};
`;

const Welcome = () => {
  return (
    <Container>
      <Title>ひらがな</Title>
      <StartButton to="/quiz">Start Quiz</StartButton>
      <Footer>
        <span>
          Made by{' '}
          <ExternalLink
            href="https://nandez.cat?utm_source=hiragana"
            rel="noopener noreferrer"
            target="_blank"
          >
            nandez.cat
          </ExternalLink>
        </span>
      </Footer>
    </Container>
  );
};

export default Welcome;
