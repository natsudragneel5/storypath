import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyDHcG14U_fDLbWu2aTpLC0w9R1p0RXY-XA',
  authDomain: 'storypath-69c2a.firebaseapp.com',
  projectId: 'storypath-69c2a',
  storageBucket: 'storypath-69c2a.appspot.com',
  messagingSenderId: '712907853305',
  appId: '1:712907853305:web:e6483de1cd60e5a3f5c128',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
