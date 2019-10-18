import React from 'react';
import styled from 'styled-components';

const Character = styled.span`
  color: ${props => props.theme.colorRedLight};
  font-size: ${props =>
    props.size === 'large'
      ? props.theme.fontSizeLarge
      : props.theme.fontSizeBase}px;
`;

const Hiragana = ({ char, size }) => {
  return <Character size={size}>{char}</Character>;
};

export default Hiragana;
