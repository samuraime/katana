import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Yume from './Yume';
import store from '../../store';

describe('Page Yume', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Yume />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
