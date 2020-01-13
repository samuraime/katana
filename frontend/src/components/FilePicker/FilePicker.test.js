import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilePicker from './FilePicker';

describe('FilePicker', () => {
  it('should render children correctly', () => {
    const { getByText } = render(<FilePicker>click here</FilePicker>);

    expect(getByText('click here')).toBeDefined();
  });

  it.skip('should handle change event', () => {});

  it('should handle hover event', () => {
    const { getByText } = render(
      <FilePicker className="file-picker" hoverClassName="file-picker-hover">
        click here
      </FilePicker>
    );

    const picker = getByText('click here');

    expect(picker.classList.contains('file-picker')).toBe(true);
    expect(picker.classList.contains('file-picker-hover')).toBe(false);

    fireEvent.dragOver(picker);

    expect(picker.classList.contains('file-picker')).toBe(true);
    expect(picker.classList.contains('file-picker-hover')).toBe(true);
  });
});
