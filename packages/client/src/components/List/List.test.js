import React from 'react';
import { render } from '@testing-library/react';
import List, { ListItem } from '.';

describe('List', () => {
  it('should render correctly when children is empty', () => {
    expect(() => render(<List />)).not.toThrowError();
  });

  it('should render children correctly', () => {
    const { getByText } = render(
      <List>
        <ListItem key={1}>hana</ListItem>
        <ListItem key={2}>arisu</ListItem>
      </List>
    );

    const firstElement = getByText('hana');
    expect(firstElement.nodeName).toBe('LI');

    const secondElement = getByText('arisu');
    expect(secondElement.textContent).toBe('arisu');
  });
});
