import React from 'react';
import '../src/App.css';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import { Switch } from 'react-router';
import { Suspense, lazy } from 'react';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { BookProvider } from './context/book.context';
import { ProfileProvider } from './context/profile.context';

const Home = lazy(() => import('./pages/Home'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SignIn = lazy(() => import('./pages/SignIn'));
import DashboardButton from './components/sidenavbar/DashboardButton';
import { AuthorProvider } from './context/authors.context';
const BookBoard = lazy(() => import('./pages/BookBoard'));

function App() {
  return (
    <div style={{ backgroundColor: 'rgba(0, 0, 0, .8)' }}>
      <ProfileProvider>
        <BookProvider>
          <AuthorProvider>
            <DashboardButton />
            <Switch className="App">
              <PrivateRoute path="/profile/:profile_uid">
                <Suspense fallback={<div>Loading ...</div>}>
                  <ProfilePage />
                </Suspense>
              </PrivateRoute>
              <PrivateRoute path="/book/:book_uid/:page_uid">
                <Suspense fallback={<div>Loading ...</div>}>
                  <BookBoard />
                </Suspense>
              </PrivateRoute>
              <PublicRoute path="/signin">
                <Suspense fallback={<div>Loading ...</div>}>
                  <SignIn />
                </Suspense>
              </PublicRoute>
              <PrivateRoute path="/">
                <Suspense fallback={<div>Loading ...</div>}>
                  <Home />
                </Suspense>
              </PrivateRoute>
            </Switch>
          </AuthorProvider>
        </BookProvider>
      </ProfileProvider>
    </div>
  );
}

export default App;
