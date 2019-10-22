import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Stash from './Stash';
import store from '../../store';

describe('Page Stash', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Stash />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
