import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Drawer, Icon, Nav } from 'rsuite';
import ProviderBlock from './ProviderBlock';

// eslint-disable-next-line arrow-body-style
const SidNavBar = ({ profile, location, onSignOut, close }) => {
  const { name, avatar, uid } = profile;
  return (
    <>
      <Drawer.Header>
        <ProviderBlock />
        <Button block color="red" onClick={onSignOut}>
          Sign out
        </Button>
      </Drawer.Header>
      <Drawer.Body>
        <Nav
          appearance="subtle"
          vertical
          reversed
          activeKey={location.pathname}
        >
          <Nav.Item
            componentClass={Link}
            to={`/profile/:${uid}`}
            eventKey={`/profile/:${uid}`}
            onSelect={close}
          >
            <Icon icon="profile" />
            Profile
          </Nav.Item>
          <Nav.Item
            componentClass={Link}
            to="/"
            eventKey={'/'}
            onSelect={close}
          >
            <Icon icon="home" />
            Home
          </Nav.Item>
        </Nav>
      </Drawer.Body>
    </>
  );
};

export default SidNavBar;
