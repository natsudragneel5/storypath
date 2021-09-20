import React from 'react';
import { Button, Drawer, Icon } from 'rsuite';
import SideNavBar from '.';
import { useModalState } from '../../misc/custom-hooks';

// eslint-disable-next-line arrow-body-style
const DashboardToggle = ({ activeItem }) => {
  const { isOpen, open, close } = useModalState();
  return (
    <>
      <Button color="blue" onClick={open}>
        <Icon icon="dashboard" />
      </Button>
      <Drawer show={isOpen} onHide={close} placement="left">
        <SideNavBar activeItem={activeItem} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
