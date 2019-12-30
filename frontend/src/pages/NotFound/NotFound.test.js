import React from 'react';
import { render } from '@testing-library/react';
import NotFound from './NotFound';

it('NotFound should be renderred correctly', () => {
  const { getByText } = render(<NotFound />);

  expect(getByText('Not Found')).toBeDefined();
});
