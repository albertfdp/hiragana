import React from 'react';

import { ChoiceGroup, ChoiceButton } from '.';

const choices = [
  { id: 'a', label: 'A' },
  { id: 'b', label: 'B' },
  { id: 'c', label: 'C' },
  { id: 'd', label: 'D' }
];

const withWrapper = storyFn => (
  <div style={{ height: 300, width: '100%' }}>{storyFn()}</div>
);

export const renders = () => (
  <ChoiceGroup
    id="vowels"
    right="a"
    onAnswer={choice => console.log('onAnswer', choice)}
    onTimeout={() => console.log('onTimeout')}
  >
    {choices.map(choice => (
      <ChoiceButton key={choice.id} value={choice.id}>
        {choice.label}
      </ChoiceButton>
    ))}
  </ChoiceGroup>
);

export const answered = () => <ChoiceButton answered>A</ChoiceButton>;
export const right = () => (
  <ChoiceButton answered right>
    A
  </ChoiceButton>
);

export default {
  title: 'Choice',
  decorators: [withWrapper]
};
