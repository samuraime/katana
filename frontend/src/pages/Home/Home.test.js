import React from 'react';
import TestWrapper from '../TestWrapper';
import Home from './Home';

describe('Home', () => {
  it('should render correctly', () => {
    expect(() => (
      <TestWrapper>
        <Home />
      </TestWrapper>
    )).not.toThrowError();
  });
});
