import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Yume from './Yume';

describe('Yume Page', () => {
  it('should render without crashing', () => {
    const store = {
      subscribe() {},
      dispatch() {},
      getState() {
        return {
          yume: {
            yumes: [
              {
                text: '小楼昨夜又东风',
                interpretation: '',
                images: [],
                type: 'normal',
                tags: [],
                public: true,
                id: '5e2faecd2b0ddaad36f9b688',
                dreamer: {
                  id: '5d3855de978cd85940a8b982',
                  avatar:
                    'https://avatars1.githubusercontent.com/u/2203205?v=4',
                  email: 'samurai7@foxmail.com',
                  login: 'samuraime',
                  name: 'SamuraiMe',
                  superUser: true,
                  createdAt: '2019-07-24T12:58:06.012Z',
                  updatedAt: '2019-07-24T12:58:06.012Z',
                  githubID: 2203205,
                },
                createdAt: '2020-01-28T03:47:25.352Z',
              },
              {
                text: '花非花, 雾非雾, 夜半来, 天明去',
                interpretation: '',
                images: [],
                type: 'normal',
                tags: [],
                public: true,
                id: '5e2fae532b0ddaad36f9b687',
                dreamer: {
                  id: '5d3855de978cd85940a8b982',
                  avatar:
                    'https://avatars1.githubusercontent.com/u/2203205?v=4',
                  email: 'samurai7@foxmail.com',
                  login: 'samuraime',
                  name: 'SamuraiMe',
                  superUser: true,
                  createdAt: '2019-07-24T12:58:06.012Z',
                  updatedAt: '2019-07-24T12:58:06.012Z',
                  githubID: 2203205,
                },
                createdAt: '2020-01-28T03:45:23.151Z',
              },
            ],
            calendarRecords: [
              {
                type: 'normal',
                id: '5e2faecd2b0ddaad36f9b688',
                createdAt: '2020-01-28T03:47:25.352Z',
              },
              {
                type: 'normal',
                id: '5e2fae532b0ddaad36f9b687',
                createdAt: '2020-01-28T03:45:23.151Z',
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
        <Yume />
      </Provider>
    );
  });
});
