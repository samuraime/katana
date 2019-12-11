import React from 'react';
import PropTypes from 'prop-types';
import s from './Profile.module.scss';

function Profile({ avatar, title, subheader, ...otherProps }) {
  return (
    <div className={s.root} {...otherProps}>
      <div className={s.avatar}>
        <img className={s.avatarImage} src={avatar} alt="avatar" />
      </div>
      <div className={s.content}>
        <h1 className={s.title}>{title}</h1>
        <div className={s.subheader}>{subheader}</div>
      </div>
    </div>
  );
}

Profile.propTypes = {
  avatar: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  subheader: PropTypes.node.isRequired,
};

export default Profile;
