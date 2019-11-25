import React from 'react';

import styled from 'styled-components';
import { darken } from 'polished';

import { Link } from '@reach/router';
import { WrongAnswer } from './Choice/styled';

const Container = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colorWhite};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  padding: 10%;

  @media (min-width: 981px) {
    flex-direction: row;
  }
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  margin-bottom: 30px;

  @media (min-width: 981px) {
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colorRedLight};
  font-size: ${props => props.theme.fontSizeHuge};
  margin: 0;
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colorBlue};
  font-size: ${props => props.theme.fontSizeLarge};
  text-transform: uppercase;
  margin: 0;
`;

const Content = styled.div`
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
  width: 100%;

  @media (min-width: 981px) {
    width: 30%;
  }
`;

const StartButton = styled(WrongAnswer)`
  background-color: ${props => props.theme.colorWrong};
  flex-grow: 0;
  font-size: ${props => props.theme.fontSizeBase};
  text-transform: uppercase;
  width: 100%;

  &:hover,
  &:focus,
  &:disabled:hover,
  &:disabled:focus {
    background-color: ${props => darken(0.2, props.theme.colorWrong)};
  }

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
  color: ${props => props.theme.colorBlack};
`;

const Welcome = () => {
  return (
    <Container>
      <Header>
        <Title>にほんご</Title>
        <Subtitle>Kana Quiz</Subtitle>
      </Header>
      <Content>
        <StartButton tabIndex="0" as={Link} to="/quiz/hiragana">
          ひらがな
        </StartButton>
        <StartButton tabIndex="0" as={Link} to="/quiz/katakana">
          カタカナ
        </StartButton>
      </Content>
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
