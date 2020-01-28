import React from 'react';
import { Helmet } from 'react-helmet';
import Profile from './Profile';
import Timeline from './Timeline';
import Container from '../../components/Container';
import Surface from '../../components/Surface';
import samurai from '../../assets/images/samurai.png';
import profile from './personalProfile';
import s from './Home.module.scss';

function Home() {
  return (
    <Container className={s.root}>
      <Helmet>
        <meta
          name="description"
          content={`SamuraiMe, ${profile.introduction}`}
        />
      </Helmet>
      <Profile
        avatar={samurai}
        title="SamuraiMe"
        subheader={
          <ul className={s.socialMedia}>
            {profile.socialMedia.map(({ name, link }) => (
              <li key={name} className={s.socialMediaItem}>
                <a href={link}>{name}</a>
              </li>
            ))}
          </ul>
        }
      />
      <Surface className={s.intro}>
        <p>{profile.introduction}</p>
      </Surface>
      <Timeline events={profile.timelines} />
    </Container>
  );
}

export default Home;
