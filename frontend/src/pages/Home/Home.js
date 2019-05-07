import React from 'react';
import samurai from '../../assets/images/samurai.png';
import s from './Home.module.scss';

function Home() {
  return (
    <div className={s.root}>
      <p className={s.main}>
        <img className={s.samurai} src={samurai} alt="samurai" />
        <span className={s.motto}>In the name of a samurai</span>
      </p>
    </div>
  );
}

export default Home;
