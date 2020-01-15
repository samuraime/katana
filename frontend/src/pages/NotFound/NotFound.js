import React from 'react';
import RouterLink from '../../components/RouterLink';
import s from './NotFound.module.scss';

export default function NotFound() {
  return (
    <div className={s.root}>
      <h3 className={s.title}>Not Found</h3>
      <RouterLink to="/" color="inherit">
        homepage
      </RouterLink>
    </div>
  );
}
