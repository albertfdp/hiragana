import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Timer from './Timer';

const StyledButton = styled.button`
  align-items: center;
  background-color: transparent;
  border-radius: 3px;
  border: 2px solid ${props => props.theme.colorRedLight};
  color: ${props => props.theme.colorRedLight};
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
    border-color 100ms ease-in;
  width: 40%;

  &:disabled {
    opacity: 0.5;
  }

  &:disabled:hover,
  &:disabled:focus {
    cursor: initial;
    background-color: transparent;
    color: ${props => props.theme.colorRedLight};
  }

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: ${props => props.theme.colorRedLighter};
    color: ${props => props.theme.colorWhite};
  }
`;

const colorMapper = ({ right, theme }) => {
  if (right) {
    return {
      backgroundColor: theme.colorGreen,
      color: theme.colorWhite,
      borderColor: theme.colorBlack
    };
  }

  return {
    backgroundColor: theme.colorBlack,
    color: theme.colorWhite,
    borderColor: theme.colorBlack
  };
};

const Answered = styled(StyledButton)`
  background-color: ${props => colorMapper(props).backgroundColor};
  color: ${props => colorMapper(props).color};
  border-color: ${props => colorMapper(props).borderColor};

  &:disabled {
    opacity: 1;
  }

  &:hover,
  &:focus,
  &:disabled:hover,
  &:disabled:focus {
    background-color: ${props => colorMapper(props).backgroundColor};
    color: ${props => colorMapper(props).color};
  }
`;

export const ChoiceButton = ({ answered, ...props }) => {
  if (answered) {
    return <Answered {...props} />;
  }

  return <StyledButton {...props} />;
};

const StyledGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  max-width: 900px;
  width: 100%;
`;

export const ChoiceGroup = ({ id, right, children, onAnswer, onTimeout }) => {
  const [isAnswered, setAnswered] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    clearTimeout(timer.current);
    setAnswered(false);
  }, [id]);

  const onClick = value => {
    setAnswered(value);

    timer.current = setTimeout(() => {
      onAnswer(value);
    }, 1500);
  };

  return (
    <Fragment>
      <StyledGroup role="radiogroup">
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            disabled: !!isAnswered,
            answered: child.props.value === isAnswered,
            right: child.props.value === right,
            onClick: () => onClick(child.props.value)
          });
        })}
      </StyledGroup>
      {!isAnswered && <Timer id={id} onTimeout={onTimeout} />}
    </Fragment>
  );
};
