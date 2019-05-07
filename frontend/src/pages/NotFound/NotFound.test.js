import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

it('NotFound should be renderred correctly', () => {
  const home = shallow(<NotFound />);

  expect(home.text()).toEqual('NotFound');
});
