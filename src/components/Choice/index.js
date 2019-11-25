import React, { Fragment, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import Timer from './../Timer';

import {
  Button,
  FadeButton,
  RightAnswer,
  WrongAnswer,
  StyledGroup
} from './styled';

export const ChoiceButton = ({ answered, otherAnswered, right, ...props }) => {
  if (!answered && !otherAnswered) {
    return <Button {...props} />;
  } else if (otherAnswered && !right) {
    return <FadeButton fade={otherAnswered} disabled {...props} />;
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

        if (choices[choice]) {
          onAnswer(choices[choice]);
        }
      }
    },
    [id]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

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
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.node,
  right: PropTypes.string.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onTimeout: PropTypes.func.isRequired
};
