import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Stash from './Stash';

describe('Stash Page', () => {
  it('should render without crashing', () => {
    const store = {
      subscribe() {},
      dispatch() {},
      getState() {
        return {
          stash: {
            archives: [
              {
                id: '5e2eefbe2b0ddaad36f9b686',
                name: '1_YOqTvbWSOKvHW3sg-yfgPA.png',
                size: 387776,
                type: 'image/png',
                key: 'TEST/3RXFKKGDV0C',
                hash: 'FukVE6cK9fOs4O8tNzqd6OjAxZBe',
                updatedAt: '2020-01-27T14:12:14.243Z',
                createdAt: '2020-01-27T14:12:14.243Z',
                link: 'http://katana-storage.samuraime.com/TEST/3RXFKKGDV0C',
              },
              {
                id: '5e2ee58e2b0ddaad36f9b685',
                name: '9o1s0001256p47987943.jpg',
                size: 29538,
                type: 'image/jpeg',
                key: 'TEST/43SW7593RP1',
                hash: 'FqB0ug3Xgyp1PaXEFHh7sTgqAd7J',
                updatedAt: '2020-01-27T13:28:46.759Z',
                createdAt: '2020-01-27T13:28:46.759Z',
                link: 'http://katana-storage.samuraime.com/TEST/43SW7593RP1',
              },
            ],
          },
          user: {
            id: '5d3855de978cd85940a8b982',
            avatar: 'https://avatars1.githubusercontent.com/u/2203205?v=4',
            email: 'samurai7@foxmail.com',
            name: 'SamuraiMe',
            signedIn: true,
            superUser: true,
          },
        };
      },
    };
    render(
      <Provider store={store}>
        <Stash />
      </Provider>
    );
  });
});
