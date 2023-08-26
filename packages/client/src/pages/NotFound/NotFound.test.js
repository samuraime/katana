import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFound from './NotFound';

describe('Page NotFound', () => {
  it('renders without crashing', () => {
    const renderComponent = () =>
      render(
        <Router>
          <NotFound />
        </Router>
      );

    expect(renderComponent).not.toThrowError();
  });
});
