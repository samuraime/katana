import React from 'react';
import { render } from '@testing-library/react';
import Playground from './Playground';

describe('Page Playground', () => {
  it('should be renderred correctly', () => {
    const { getByText } = render(<Playground />);

    expect(getByText('Playground')).toBeDefined();
  });
});
