import React from 'react';

import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

import { ChoiceGroup, ChoiceButton } from '.';

jest.useFakeTimers();

describe('<Choice />', () => {
  let onAnswer;
  let onTimeout;

  beforeEach(() => {
    onAnswer = jest.fn();
    onTimeout = jest.fn();
  });

  describe('<ChoiceGroup />', () => {
    let rendered;

    beforeEach(() => {
      rendered = render(
        <ChoiceGroup
          id="shi"
          right="し"
          onAnswer={onAnswer}
          onTimeout={onTimeout}
        >
          <ChoiceButton key="a" value="shi">
            し
          </ChoiceButton>
          <ChoiceButton key="b" value="su">
            す
          </ChoiceButton>
        </ChoiceGroup>
      );
    });

    it('renders two choices', () => {
      const { queryAllByRole } = rendered;

      expect(queryAllByRole('button')).toHaveLength(2);
    });

    describe('with event keydown', () => {
      describe('when pressing 1', () => {
        it('fires the onAnswer when keydown', () => {
          fireEvent.keyDown(document, {
            key: '1',
            keyCode: 49
          });

          expect(onAnswer).toHaveBeenCalledWith('shi');
        });
      });

      describe('when pressing 2', () => {
        it('fires the onAnswer when keydown', () => {
          fireEvent.keyDown(document, {
            key: '2',
            keyCode: 50
          });

          expect(onAnswer).toHaveBeenCalledWith('su');
        });
      });

      describe('when pressing 3', () => {
        it('ignores it', () => {
          fireEvent.keyDown(document, {
            key: '3',
            keyCode: 51
          });

          expect(onAnswer).not.toHaveBeenCalled();
        });
      });
    });

    it('fires the onAnswer when clicking a choice', () => {
      const { queryByText } = rendered;

      fireEvent.click(queryByText('し'));
      expect(onAnswer).toHaveBeenNthCalledWith(1, 'shi');

      fireEvent.click(queryByText('す'));
      expect(onAnswer).toHaveBeenNthCalledWith(2, 'su');
    });

    describe('when not answering before timeout', () => {
      it('fires the onTimeout', () => {
        act(() => {
          jest.runAllTimers();
        });

        expect(onTimeout).toHaveBeenCalled();
      });
    });
  });
});
