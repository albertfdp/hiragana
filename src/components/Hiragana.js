import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { bounceIn, shake } from '../style/keyframes';

const animationMapper = {
  right: bounceIn,
  wrong: shake
};

const animationDurationMapper = {
  right: 1,
  wrong: 0.7
};

const StyledCharacter = styled.span`
  animation-duration: ${props => animationDurationMapper[props.status]}s;
  animation-fill-mode: both;
  animation-name: ${props => animationMapper[props.status]};
  transition: color 300ms ease-in-out;
  line-height: 1;
  font-size: ${props =>
    props.size === 'large'
      ? props.theme.fontSizeHuge
      : props.theme.fontSizeLarge};
`;

const Character = ({ children, ...props }) => {
  useEffect(() => {
    if (window.speechSynthesis) {
      const message = new SpeechSynthesisUtterance();
      message.voiceURI = 'native';
      message.text = children;
      message.volume = 1;
      message.rate = 0.5;
      message.pitch = 1;
      message.lang = 'ja';

      window.speechSynthesis.speak(message);
    }
  }, [children]);

  return <StyledCharacter {...props}>{children}</StyledCharacter>;
};

Character.propTypes = {
  children: PropTypes.node
};

export default Character;
