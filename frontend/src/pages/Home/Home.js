import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import Profile from './Profile';
import Timeline from './Timeline';
import Container from '../../components/Container';
import Surface from '../../components/Surface';
import samurai from '../../assets/images/samurai.png';
import profile from './personalProfile';
import s from './Home.module.scss';

function Home() {
  const { formatMessage } = useIntl();
  const nickname = formatMessage({ id: 'home.profile.name' });
  const intro = formatMessage({ id: 'home.profile.intro' });

  return (
    <Container className={s.root}>
      <Helmet>
        <meta name="description" content={`${nickname}, ${intro}`} />
      </Helmet>
      <Profile
        avatar={samurai}
        title={nickname}
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
        <p>{intro}</p>
      </Surface>
      <Timeline events={profile.timelines} />
    </Container>
  );
}

export default Home;
