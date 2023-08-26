import React from 'react';
import { render } from '@testing-library/react';
import CalendarGraph from './CalendarGraph';

const colorFn = () => '#000';

describe('CalendarGraph', () => {
  it('should render days correctly', () => {
    render(
      <CalendarGraph start="2018-01-01" end="2019-01-01" color={colorFn} />
    );
  });
});
