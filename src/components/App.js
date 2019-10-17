import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  justify-content: center;
`;

const Text = styled.h1`
  font-size: ${props => (props.romanji ? '32' : '128')}px;
  font-family: ${props =>
    props.romanji ? props.theme.fontFamilyRomanji : props.theme.fontFamily};
  color: ${props => props.theme.colorRedLight};
`;

const App = () => {
  return (
    <Container>
      <Text>こにちわ！</Text>
      <Text romanji>konichiwa!</Text>
    </Container>
  );
};

export default App;
