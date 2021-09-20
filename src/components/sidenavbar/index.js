import React from 'react';
import { Icon, Nav, Sidenav } from 'rsuite';

// eslint-disable-next-line arrow-body-style
const SidNavBar = ({ activeItem }) => {
  return (
    <>
      <Sidenav>
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey="1" active={activeItem === 'profile'}>
              <Icon icon="profile" /> Profile
            </Nav.Item>
            <Nav.Item eventKey="1" active={activeItem === 'home'}>
              <Icon icon="home" /> Home
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </>
  );
};

export default SidNavBar;
