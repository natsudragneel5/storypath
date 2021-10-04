import React from 'react';
import '../src/App.css';
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
import BookBoard from './pages/BookBoard';

function App() {
  return (
    <div>
      <ProfileProvider>
        <DashboardButton />
        <Switch className="App">
          <PrivateRoute path="/profile/:uid">
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute path="/book/:book_uid/:page_uid">
            <BookBoard />
          </PrivateRoute>
          <PublicRoute path="/signin">
            <SignIn />
          </PublicRoute>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </ProfileProvider>
    </div>
  );
}

export default App;
