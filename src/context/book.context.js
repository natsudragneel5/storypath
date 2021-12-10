import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import firebase from 'firebase/app';
import { auth, database } from '../misc/firebase';
import { transformToArrWithId } from '../misc/helpers';
import { Alert } from 'rsuite';
const bookRef = database.ref(`/books`);
const bookReducer = books => {
  return (state, action) => {
    const bookList = books;
    switch (action.type) {
      case 'Add Book':
        try {
          console.log('owner', action.payload.uid);
          const data = {
            cover: action.payload.cover,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            depth: 0,
            description: action.payload.desc,
            name: action.payload.name,
            owner: action.payload.uid,
            writeAccess: action.payload.wa,
          };
          bookRef.push(data);
          Alert.info(`New Book Addes ${action.payload.name} created`, 4000);
        } catch (err) {
          Alert.error(err.message, 4000);
        }
        return state;
      case 'Remove Book':
        try {
          const newBookRef = database
            .ref('/books')
            .child(`/${action.payload.id}`);
          newBookRef.on('value', snap);
          const { owner } = snap.val();
          if (auth.id === owner) {
            newBookRef.remove();
          }
        } catch (err) {
          Alert.error(err.message, 4000);
        }
        return state;
    }
  };
};
const BookContext = createContext();
export const BookProvider = ({ children }) => {
  const [bookSnap, setBookSnap] = useState(null);
  useEffect(() => {
    bookRef.on('value', snap => {
      setBookSnap(transformToArrWithId(snap.val()));
    });
    return () => {
      bookRef.off();
    };
  }, []);
  const [books, booksDispatch] = useReducer(bookReducer(bookSnap), []);
  return (
    <BookContext.Provider value={{ bookSnap, booksDispatch }}>
      {children}
    </BookContext.Provider>
  );
};
export const useBooks = () => useContext(BookContext);
