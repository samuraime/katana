import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

test('<Home /> should render correctly', () => {
  const home = shallow(<Home />);

  expect(home.text()).toContain('samurai');
});
