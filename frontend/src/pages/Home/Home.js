import React from 'react';
import Profile from './Profile';
import Timeline from './Timeline';
import samurai from '../../assets/images/samurai.png';
import s from './Home.module.scss';

const socialMedias = [{ name: 'GitHub', link: 'https://github.com/samuraime' }];

const timelineEvents = [
  { start: '2019-04', end: '       ', title: 'ThoughtWorks' },
  { start: '2017-10', end: '2018-11', title: 'Meitu' },
  { start: '2017-02', end: '2017-09', title: 'Weipaitang' },
  // { start: '2015-12', end: '2017-02', title: 'Chenju' },
  // { start: '2015-05', end: '2017-12', title: 'Pinuocao' },
  { start: '2010-09', end: '2014-06', title: 'Northwest A&F University' },
];

function Home() {
  return (
    <main className={s.root}>
      <Profile
        avatar={samurai}
        title="SamuraiMe"
        subheader={
          <ul className={s.socialMedias}>
            {socialMedias.map(({ name, link }) => (
              <li key={name}>
                <a href={link}>{name}</a>
              </li>
            ))}
          </ul>
        }
      />
      <Timeline events={timelineEvents} />
    </main>
  );
}

export default Home;
