import React from 'react';
import { useLocation } from 'react-router';
import { Button, Drawer, Icon } from 'rsuite';
import SideNavBar from '.';
import { useModalState } from '../../misc/custom-hooks';

// eslint-disable-next-line arrow-body-style
const DashboardButton = () => {
  const location = useLocation();
  const canDisplay = location.pathname !== '/signin';
  const { isOpen, open, close } = useModalState();
  return (
    <div className="pt-1">
      {canDisplay && (
        <Button color="blue" onClick={open}>
          <Icon icon="dashboard" />
        </Button>
      )}
      <Drawer show={isOpen} onHide={close} placement="left">
        <Button onClick={close}>
          <Icon icon="window-close" />
        </Button>
        <SideNavBar close={close} />
      </Drawer>
    </div>
  );
};

export default DashboardButton;
