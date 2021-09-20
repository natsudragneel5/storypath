import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import { Switch } from 'react-router';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import SignIn from './pages/SignIn';
import { ProfileProvider } from './context/profile.context';

function App() {
  return (
    <ProfileProvider>
      <Switch className="App">
        <PrivateRoute path="/profile">
          <ProfilePage />
        </PrivateRoute>
        <PublicRoute path="/signin">
          <SignIn />
        </PublicRoute>
        <PublicRoute path="/">
          <Home />
        </PublicRoute>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
