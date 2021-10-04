import React, { useState } from 'react';
import firebase from 'firebase/app';
import {
  Container,
  Grid,
  Row,
  Col,
  Panel,
  Button,
  Icon,
  Alert,
  Loader,
} from 'rsuite';
import { auth, database } from '../misc/firebase';
import { Link } from 'react-router-dom';

// eslint-disable-next-line arrow-body-style
const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const signInWithProvider = async provider => {
    try {
      setIsLoading(true);
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      Alert.success('Signed in', 4000);
      setIsLoading(false);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          accountType: 'basic',
          topBanner: 'default',
          leftBanner: 'default',
          rightBanner: 'default',
        });
      }
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };
  const onFacebookSignIn = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const onGoogleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };
  if (isLoading) {
    return (
      <Container>
        <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
    );
  }
  if (!isLoading && auth.currentUser) {
    return (
      <Container>
        <Grid>
          <h3>Already Logged in</h3>
          <h6>
            Click <Link to="/">here</Link> to go to Home Page
          </h6>
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Story Path</h2>
                <p>
                  Creat your own story, or select a path to follow from someone
                  else&apos;s
                </p>
              </div>
              <div className="mt-3">
                <Button block color="blue" onClick={onFacebookSignIn}>
                  <Icon icon="facebook" /> Continue with Facebook
                </Button>
                <Button block color="green" onClick={onGoogleSignIn}>
                  <Icon icon="google" /> Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
