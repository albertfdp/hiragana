import React from 'react';

import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

import { ChoiceGroup, ChoiceButton } from '.';

jest.useFakeTimers();

describe('<Choice />', () => {
  let rendered;

  describe('<ChoiceGroup />', () => {
    let onAnswer;
    let onTimeout;

    beforeEach(() => {
      onAnswer = jest.fn();
      onTimeout = jest.fn();

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
      expect(rendered.container.firstChild).toMatchSnapshot();
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

  describe('<ChoiceButton />', () => {
    let onClick;

    beforeEach(() => {
      onClick = jest.fn();
    });

    describe('when other button was answered', () => {
      beforeEach(() => {
        rendered = render(
          <ChoiceButton
            index={0}
            answered={false}
            otherAnswered
            right={false}
            onClick={onClick}
          >
            し
          </ChoiceButton>
        );
      });

      it('renders a disabled button', () => {
        expect(rendered.container.firstChild).toMatchSnapshot();
      });
    });

    describe('when not answered', () => {
      beforeEach(() => {
        rendered = render(
          <ChoiceButton
            index={0}
            answered={false}
            otherAnswered={false}
            rightAnswer
            onClick={onClick}
          >
            し
          </ChoiceButton>
        );
      });

      it('renders a button', () => {
        const button = rendered.getByRole('button');

        expect(button).toHaveTextContent('し');
        expect(button).not.toBeDisabled();

        expect(rendered.container.firstChild).toMatchSnapshot();
      });
    });
  });
});
