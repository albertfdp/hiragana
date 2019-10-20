import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { darken } from 'polished';

import Octicon, { Megaphone } from '@primer/octicons-react';

import { bounceIn, shake } from '../style/keyframes';
import textToSpeech from '../utils/textToSpeech';

const animationMapper = {
  right: bounceIn,
  wrong: shake
};

const animationDurationMapper = {
  right: 1,
  wrong: 0.7
};

const Wrapper = styled.div`
  animation-duration: ${props => animationDurationMapper[props.status]}s;
  animation-fill-mode: both;
  animation-name: ${props => animationMapper[props.status]};
  background-color: ${props => darken(0.1, props.theme.colorBackground)};
  border-radius: 4px;
  box-shadow: 0 0 2px 2px ${props => darken(0.3, props.theme.colorBackground)};
  cursor: pointer;
  padding: 20px;
  position: relative;
  transition: transform 100ms ease-in;

  & > svg {
    bottom: 10px;
    fill: ${props => props.theme.colorGray} !important;
    font-size: 20px;
    position: absolute;
    right: 10px;
  }

  &:active {
    transform: scale(1.1);
  }
`;

const StyledCharacter = styled.span`
  transition: color 300ms ease-in-out;
  line-height: 1;
  font-size: ${props =>
    props.size === 'large'
      ? props.theme.fontSizeHuge
      : props.theme.fontSizeLarge};
`;

const Character = ({ children, status, ...props }) => {
  useEffect(() => {
    textToSpeech(children);
  }, [children]);

  return (
    <Wrapper
      role="button"
      onClick={() => textToSpeech(children)}
      status={status}
    >
      <StyledCharacter {...props}>{children}</StyledCharacter>
      <Octicon icon={Megaphone} size="medium" />
    </Wrapper>
  );
};

Character.propTypes = {
  children: PropTypes.node,
  status: PropTypes.string
};

export default Character;
