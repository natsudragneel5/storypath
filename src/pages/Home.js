import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import DashboardToggle from '../components/sidenavbar/DashboardToggle';

// eslint-disable-next-line arrow-body-style
const Home = () => {
  return (
    <Grid fluid className="h-100 pt-2">
      <Row>
        <Col xs={24} md={8}>
          <DashboardToggle activeItem="home" />
        </Col>
      </Row>
    </Grid>
  );
};

export default Home;
