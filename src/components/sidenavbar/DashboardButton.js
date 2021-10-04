import React, { useCallback } from 'react';
import { useLocation } from 'react-router';
import { Alert, Button, Drawer, Icon } from 'rsuite';
import SideNavBar from '.';
import { useProfile } from '../../context/profile.context';
import { useModalState } from '../../misc/custom-hooks';

import { auth, database } from '../../misc/firebase';

// eslint-disable-next-line arrow-body-style
const DashboardButton = () => {
  const location = useLocation();
  const { profile, isLoading } = useProfile();
  const { isOpen, open, close } = useModalState();

  const onSignOut = useCallback(() => {
    auth.signOut();
    Alert.info('Signed out', 4000);
    close();
  });
  if (profile && !isLoading) {
    return (
      <div className="pt-1 dashboard-button">
        <Button color="blue" onClick={open}>
          <Icon icon="dashboard" />
        </Button>

        <Drawer show={isOpen} onHide={close} placement="left">
          <SideNavBar
            close={close}
            onSignOut={onSignOut}
            location={location}
            profile={profile}
          />
        </Drawer>
      </div>
    );
  }
  return <></>;
};

export default DashboardButton;
