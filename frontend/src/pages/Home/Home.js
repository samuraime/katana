import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import Profile from './Profile';
import Timeline from './Timeline';
import Container from '../../components/Container';
import Surface from '../../components/Surface';
import samurai from '../../assets/images/samurai.png';
import profile from './personalProfile';

const HomePage = styled(Container)`
  min-height: 100vh;
  padding-bottom: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Intro = styled(Surface)`
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  white-space: break-spaces;
`;

const SocialMedia = styled.ul`
  display: flex;
`;

const SocialMediaItem = styled.li`
  margin-right: 0.5rem;
`;

function Home() {
  const { formatMessage } = useIntl();
  const nickname = formatMessage({ id: 'home.profile.name' });
  const intro = formatMessage({ id: 'home.profile.intro' });

  return (
    <HomePage>
      <Helmet>
        <meta name="description" content={`${nickname}, ${intro}`} />
      </Helmet>
      <Profile
        avatar={samurai}
        title={nickname}
        subheader={
          <SocialMedia>
            {profile.socialMedia.map(({ name, link }) => (
              <SocialMediaItem key={name}>
                <a href={link}>{name}</a>
              </SocialMediaItem>
            ))}
          </SocialMedia>
        }
      />
      <Intro>{intro}</Intro>
      <Timeline events={profile.timelines} />
    </HomePage>
  );
}

export default Home;
