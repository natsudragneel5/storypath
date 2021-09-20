import React from 'react';
import { Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';

// eslint-disable-next-line arrow-body-style
const PublicRoute = ({ children, ...routeProps }) => {
  const { profile, isLoading } = useProfile();
  if (isLoading && !profile) {
    return (
      <Container>
        <Loader center vertical size="md" conten="Loading" speed="slow" />
      </Container>
    );
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
