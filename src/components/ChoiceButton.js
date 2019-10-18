import React from 'react';
import styled from 'styled-components';

export const ChoiceButton = styled.button`
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
  transition: background-color 100ms ease-in, color 100ms ease-in;
  width: 40%;

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: ${props => props.theme.colorRedLighter};
    color: ${props => props.theme.colorWhite};
  }
`;

export const ChoiceGroup = styled.div.attrs({
  role: 'radiogroup'
})`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  max-width: 900px;
  width: 100%;
`;
