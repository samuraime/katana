import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilePicker from './FilePicker';

describe('FilePicker', () => {
  it('should render children correctly', () => {
    const contentMaker = () => <p>click here</p>;
    const { getByText } = render(<FilePicker contentMaker={contentMaker} />);

    expect(getByText('click here')).toBeDefined();
  });

  it.skip('should handle change event', () => {});

  it('should handle hover event', () => {
    const contentMaker = () => <p>click here</p>;
    const { getByText } = render(<FilePicker contentMaker={contentMaker} />);

    const picker = getByText('click here');

    fireEvent.dragOver(picker);
  });
});
