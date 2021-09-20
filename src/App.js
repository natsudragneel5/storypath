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
import DashboardButton from './components/sidenavbar/DashboardButton';

function App() {
  return (
    <div>
      <DashboardButton />
      <ProfileProvider>
        <Switch className="App">
          <PublicRoute path="/signin">
            <SignIn />
          </PublicRoute>
          <PrivateRoute path="/profile">
            <ProfilePage />
          </PrivateRoute>
          <PublicRoute path="/">
            <Home />
          </PublicRoute>
        </Switch>
      </ProfileProvider>
    </div>
  );
}

export default App;
