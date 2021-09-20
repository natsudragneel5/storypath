import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon, Nav, Sidenav } from 'rsuite';

// eslint-disable-next-line arrow-body-style
const SidNavBar = ({ close }) => {
  const location = useLocation();
  return (
    <>
      <Sidenav>
        <Nav
          appearance="subtle"
          vertical
          reversed
          activeKey={location.pathname}
        >
          <Nav.Item
            componentClass={Link}
            to="/profile"
            eventKey={'/profile'}
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
      </Sidenav>
    </>
  );
};

export default SidNavBar;
