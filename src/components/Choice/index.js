import React, { Fragment, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

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
  font-size: ${props => props.theme.fontSizeLarge};
  font-weight: bold;
  justify-content: center;
  margin: 0.5em 1em;
  padding: 1em 6px;
  position: relative;
  text-align: center;
  transform: scale(1);
  transition: background-color 100ms ease-in, color 100ms ease-in,
    border-color 100ms ease-in, opacity 500ms ease-in, transform 100ms ease-in-out;
  width: 100%;

  &:before {
    content: "${props => props.index}";
    font-size: ${props => props.theme.fontSizeBase};
    left: 20px;
    opacity: 0.5;
    position: absolute;
  }

  &:active {
    transform: scale(1.01);
  }

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: ${props => props.theme.colorWhite};
    color: ${props => props.theme.colorBlue};
  }

  @media (min-width: 981px) {
    margin: 10px 20px;
    padding: 12px 6px;
    width: 40%;
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

ChoiceButton.propTypes = {
  answered: PropTypes.bool,
  otherAnswered: PropTypes.bool,
  right: PropTypes.bool
};

const StyledGroup = styled.div`
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-wrap: wrap;
  margin: 40px 0;
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
  const onKeyDown = useCallback(
    e => {
      if (e.keyCode >= 49 && e.keyCode < 53) {
        const choice = Number(e.key) - 1;
        const choices = React.Children.toArray(children).map(
          child => child.props.value
        );

        onAnswer(choices[choice]);
      }
    },
    [id]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    document.activeElement.blur();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <Fragment>
      <StyledGroup role="radiogroup">
        {React.Children.map(children, (child, i) => {
          const buttonClicked = answer === child.props.value;
          const rightAnswer = right === child.props.value;

          return React.cloneElement(child, {
            index: i + 1,
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

ChoiceGroup.propTypes = {
  id: PropTypes.string.isRequired,
  answer: PropTypes.string,
  children: PropTypes.node,
  right: PropTypes.string.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onTimeout: PropTypes.func.isRequired
};
