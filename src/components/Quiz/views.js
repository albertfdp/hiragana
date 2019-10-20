import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-around;
  padding: 20px;
  color: ${props =>
    props.status === 'right'
      ? props.theme.colorRight
      : props.status === 'wrong'
      ? props.theme.colorWrong
      : props.theme.colorText};

  @media (min-width: 981px) {
    justify-content: center;
  }
`;

export const Question = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: center;
  width: 100%;
`;

export const Answers = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
  width: 100%;

  @media (max-width: 990px) {
    flex-grow: 0;
  }
`;
