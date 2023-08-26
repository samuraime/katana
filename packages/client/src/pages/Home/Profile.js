import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: #fff;
  margin-right: 1rem;
  flex: none;
`;

const AvatarImage = styled.img`
  width: 3rem;
  height: 3rem;
`;

const Content = styled.div`
  flex: 1 auto;
`;

function Profile({ avatar, title, subheader, ...otherProps }) {
  return (
    <Container {...otherProps}>
      <AvatarContainer>
        <AvatarImage src={avatar} alt="avatar" />
      </AvatarContainer>
      <Content>
        <h1>{title}</h1>
        <div>{subheader}</div>
      </Content>
    </Container>
  );
}

Profile.propTypes = {
  avatar: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  subheader: PropTypes.node.isRequired,
};

export default Profile;
