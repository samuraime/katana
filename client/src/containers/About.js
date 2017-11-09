import React from 'react';
import s from './About.scss';

const About = () => (
  <div>
    <h1 className={s.title}>About</h1>
    <p><span className="icon">&#xf09b;</span> <a href="https://github.com/samuraime/katana">Katana</a></p>
  </div>
);

export default About;
