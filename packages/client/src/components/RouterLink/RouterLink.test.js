import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import RouterLink from './RouterLink';

describe('List', () => {
  it('should render children correctly', () => {
    const { getByText } = render(
      <Router>
        <RouterLink to="/">go</RouterLink>
      </Router>
    );

    expect(getByText('go').getAttribute('href')).toBe('/');
  });
});
