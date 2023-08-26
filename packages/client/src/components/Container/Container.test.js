import React from 'react';
import { render } from '@testing-library/react';
import Container from './Container';

describe('Container', () => {
  it('should render correctly when children is empty', () => {
    const { getByText } = render(<Container>hana</Container>);
    expect(getByText('hana')).toBeDefined();
  });
});
