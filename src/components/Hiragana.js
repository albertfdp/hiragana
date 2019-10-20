import React from 'react';
import styled from 'styled-components';

const Character = styled.span`
  transition: color 300ms ease-in-out;
  font-size: ${props =>
    props.size === 'large'
      ? props.theme.fontSizeHuge
      : props.theme.fontSizeLarge}px;
`;

const Hiragana = ({ char, size }) => {
  return <Character size={size}>{char}</Character>;
};

export default Hiragana;
