import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';
import store from './store';

describe('App', () => {
  it('should render Stash page', () => {
    const div = document.createElement('div');
    const { getByText } = render(
      <MemoryRouter initialEntries={['/stash']}>
        <App store={store} />
      </MemoryRouter>,
      div
    );

    expect(getByText('Stash')).toBeDefined();
  });

  it('should render YumeHub page', () => {
    const div = document.createElement('div');
    const { getByText } = render(
      <MemoryRouter initialEntries={['/yume']}>
        <App store={store} />
      </MemoryRouter>,
      div
    );

    expect(getByText('YumeHub')).toBeDefined();
  });

  // it('should render NotFound page', () => {
  //   const div = document.createElement('div');
  //   const { getByText } = render((
  //     <MemoryRouter initialEntries={['/nonexistent']}>
  //       <App store={store} />
  //     </MemoryRouter>
  //   ), div);

  //   expect(getByText('Not Found')).toBeDefined();
  // });
});
