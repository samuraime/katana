import React from 'react';
import { shallow } from 'enzyme';
import Playground from './Playground';

it('Playground should be renderred correctly', () => {
  const home = shallow(<Playground />);

  expect(home.text()).toEqual('Playground');
});
