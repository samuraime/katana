import React from 'react';
import { Helmet } from 'react-helmet';
import Profile from './Profile';
import Timeline from './Timeline';
import Container from '../../components/Container';
import Surface from '../../components/Surface';
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
const description =
  '一个心心念念回到长安的秦人, 常自夸为赵二狗, 附会作秦王后裔. 初学耕田, 后以码为梦(或以梦为马), 凭一手 JavaScript 空手套白狼.';

function Home() {
  return (
    <Container className={s.root}>
      <Helmet>
        <meta name="description" content={`SamuraiMe, ${description}`} />
      </Helmet>
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
      <Surface className={s.intro}>
        <p>{description}</p>
      </Surface>
      <Timeline events={timelineEvents} />
    </Container>
  );
}

export default Home;
