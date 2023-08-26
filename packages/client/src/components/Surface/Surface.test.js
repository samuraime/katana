import React from 'react';
import { render } from '@testing-library/react';
import Surface from './Surface';

describe('Surface', () => {
  it('should render correctly when children is empty', () => {
    expect(() => render(<Surface />)).not.toThrowError();
  });

  it('should render children correctly', () => {
    const { getByTitle } = render(
      <Surface title="hana">
        <div>arisu</div>
      </Surface>
    );
    const rootElement = getByTitle('hana');
    expect(rootElement.textContent).toBe('arisu');
  });
});
