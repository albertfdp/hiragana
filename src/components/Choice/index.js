import React, { Fragment } from 'react';
import styled from 'styled-components';

import Timer from './../Timer';
import { bounceIn } from '../../style/keyframes';

export const Button = styled.button`
  align-items: center;
  background-color: transparent;
  border-radius: 3px;
  border: 2px solid ${props => props.theme.colorWhite};
  color: ${props => props.theme.colorWhite};
  display: flex;
  flex-grow: 1;
  font-family: ${props => props.theme.fontFamilyRomanji};
  font-size: ${props => props.theme.fontSizeLarge}px;
  font-weight: bold;
  justify-content: center;
  margin: 10px 20px;
  padding: 12px 6px;
  text-align: center;
  transition: background-color 100ms ease-in, color 100ms ease-in,
    border-color 100ms ease-in, opacity 500ms ease-in;
  width: 40%;

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: ${props => props.theme.colorWhite};
    color: ${props => props.theme.colorBlue};
  }
`;

const FadeButton = styled(Button)`
  opacity: 0.5;
  color: ${props => props.theme.colorGray};
  border-color: ${props => props.theme.colorGray};

  &:hover,
  &:focus {
    cursor: initial;
    background-color: transparent;
    color: ${props => props.theme.colorGray};
  }
`;

const RightAnswer = styled(Button)`
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-name: ${bounceIn};
  background-color: ${props => props.theme.colorRight};
  border-color: ${props => props.theme.colorRight};
  color: ${props => props.theme.colorBlack};

  &:disabled {
    opacity: 1;
  }

  &:hover,
  &:focus,
  &:disabled:hover,
  &:disabled:focus {
    background-color: ${props => props.theme.colorRight};
    color: ${props => props.theme.colorBlack};
  }
`;

const WrongAnswer = styled(Button)`
  background-color: ${props => props.theme.colorWrong};
  border-color: ${props => props.theme.colorWrong};
  color: ${props => props.theme.colorWhite};

  &:disabled {
    opacity: 0.8;
  }

  &:hover,
  &:focus,
  &:disabled:hover,
  &:disabled:focus {
    background-color: ${props => props.theme.colorWrong};
    color: ${props => props.theme.colorWhite};
  }
`;

export const ChoiceButton = ({ answered, otherAnswered, right, ...props }) => {
  if (!answered && !otherAnswered) {
    return <Button {...props} />;
  } else if (otherAnswered && !right) {
    return <FadeButton fade={otherAnswered} {...props} />;
  }

  return right ? (
    <RightAnswer disabled {...props} />
  ) : (
    <WrongAnswer disabled {...props} />
  );
};

const StyledGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  max-width: 900px;
  width: 100%;
`;

export const ChoiceGroup = ({
  id,
  answer,
  children,
  right,
  onAnswer,
  onTimeout
}) => {
  return (
    <Fragment>
      <StyledGroup role="radiogroup">
        {React.Children.map(children, child => {
          const buttonClicked = answer === child.props.value;
          const rightAnswer = right === child.props.value;

          return React.cloneElement(child, {
            answered: buttonClicked,
            otherAnswered: answer !== null && !buttonClicked,
            right: rightAnswer,
            onClick: () => onAnswer(child.props.value)
          });
        })}
      </StyledGroup>
      {!answer && <Timer id={id} onTimeout={onTimeout} />}
    </Fragment>
  );
};
