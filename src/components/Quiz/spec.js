import { useReducer } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { initialState, reducer, init } from './reducer';

describe('The Quiz reducer', () => {
  it('returns the initial state', () => {
    const { result } = renderHook(() => useReducer(reducer, initialState));
    const [state] = result.current;

    expect(state).toEqual({
      answers: [],
      completed: false,
      current: null,
      lastAnswer: null,
      questions: []
    });
  });

  describe('on init', () => {
    it('returns the initial state with questions', () => {
      const { result } = renderHook(() =>
        useReducer(reducer, initialState, init)
      );
      const [state] = result.current;

      expect(state).toHaveProperty('answers', []);
      expect(state).toHaveProperty('current', 0);
      expect(state.questions).toHaveLength(48);
    });
  });

  describe('on correct answer', () => {
    let result;

    beforeEach(() => {
      result = renderHook(() => useReducer(reducer, initialState, init)).result;
    });

    it('updates the answers', () => {
      const [{ questions }, dispatch] = result.current;

      const currentQuestion = questions[0];
      const correctAnswer = currentQuestion.answer;

      act(() => {
        dispatch({ type: 'answer', data: correctAnswer });
      });

      const [nextState] = result.current;
      expect(nextState).toHaveProperty('answers', [true]);
      expect(nextState).toHaveProperty('current', 0);
    });
  });

  describe('on timeout', () => {
    let result;

    beforeEach(() => {
      result = renderHook(() => useReducer(reducer, initialState, init)).result;
    });

    it('updates the answers', () => {
      // eslint-disable-next-line no-unused-vars
      const [_, dispatch] = result.current;

      act(() => {
        dispatch({ type: 'timeout' });
      });

      const [state] = result.current;
      expect(state).toHaveProperty('answers', [false]);
      expect(state).toHaveProperty('current', 0);
    });
  });
});
