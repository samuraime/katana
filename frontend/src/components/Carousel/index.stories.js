import React, { useState } from 'react';
import Carousel from '.';

export default { title: 'Carousel' };

export const defaultCarousel = () => {
  const elements = Array.from({ length: 5 });
  const theta = 360 / elements.length;

  return (
    <Carousel>
      {elements.map((_, i) => (
        <div style={{ background: `hsla(${theta * i}deg, 60%, 60%, .8)` }} />
      ))}
    </Carousel>
  );
};

defaultCarousel.story = {
  name: 'default',
};

export const withControl = () => {
  const [index, setIndex] = useState(0);
  const [vertical, setVerticle] = useState(false);
  const elements = Array.from({ length: 5 });
  const theta = 360 / elements.length;

  return (
    <div>
      <Carousel
        index={index}
        width={200}
        height={200 * 0.618}
        vertical={vertical}
      >
        {elements.map((_, i) => (
          <div style={{ background: `hsla(${theta * i}deg, 60%, 60%, .8)` }} />
        ))}
      </Carousel>
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <button
          type="button"
          onClick={() => {
            setIndex(index - 1);
          }}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => {
            setIndex(index + 1);
          }}
        >
          Next
        </button>
        <label htmlFor="verticle">
          Vertical
          <input
            id="verticle"
            type="checkbox"
            value={vertical}
            onChange={e => {
              setVerticle(e.target.checked);
            }}
          />
        </label>
      </div>
    </div>
  );
};
