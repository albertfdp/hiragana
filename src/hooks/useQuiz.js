import { useContext } from 'react';
import QuizContext from '../context/QuizContext';

const useQuiz = () => {
  const { answer, onAnswer } = useContext(QuizContext);

  return {
    answer,
    onAnswer
  };
};

export default useQuiz;
