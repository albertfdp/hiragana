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

const Character = styled.span`
  animation-duration: ${props => animationDurationMapper[props.status]}s;
  animation-fill-mode: both;
  animation-name: ${props => animationMapper[props.status]};
  transition: color 300ms ease-in-out;
  font-size: ${props =>
    props.size === 'large'
      ? props.theme.fontSizeHuge
      : props.theme.fontSizeLarge};
`;

export default Character;
