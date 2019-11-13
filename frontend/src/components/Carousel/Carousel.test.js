import React from 'react';
import { render } from '@testing-library/react';
import Carousel from './Carousel';

describe('Carousel', () => {
  it('should render correctly when children is empty', () => {
    expect(() => render(<Carousel />)).not.toThrowError();
  });

  it('should render children correctly', () => {
    const images = [
      'fake1.png',
      'fake2.png',
      'fake3.png',
      'fake4.png',
      'fake5.png',
    ];
    const { getAllByTitle } = render(
      <Carousel>
        {images.map(image => (
          <img
            key={image}
            title="image title"
            className="image"
            src={image}
            alt={image}
          />
        ))}
      </Carousel>
    );
    const imageElements = getAllByTitle('image title');
    expect(imageElements.length).toBe(5);

    imageElements.forEach(image => {
      expect(image.classList.contains('image')).toBe(true);
    });
  });
});
