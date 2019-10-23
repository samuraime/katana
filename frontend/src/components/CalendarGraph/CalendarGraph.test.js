import React from 'react';
import { shallow } from 'enzyme';
import CalendarGraph from './CalendarGraph';

const colorFn = () => '#000';

describe('CalendarGraph', () => {
  it('should render days correctly', () => {
    const wrapper = shallow(
      <CalendarGraph start="2018-01-01" end="2019-01-01" color={colorFn} />
    );
    expect(wrapper.find('rect').length).toBe(365);
  });
});
