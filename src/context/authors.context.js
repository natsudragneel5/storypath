import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth, database } from '../misc/firebase';
import { transformToArrWithId } from '../misc/helpers';

const AuthorsContext = createContext();
export const AuthorProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);
  const authorRef = database.ref('/profiles');
  useEffect(() => {
    authorRef.on('value', snap => {
      setAuthors(transformToArrWithId(snap.val()));
    });
    return () => {
      authorRef.off();
    };
  }, []);
  return (
    <AuthorsContext.Provider value={{ authors }}>
      {children}
    </AuthorsContext.Provider>
  );
};

export const useAuthors = () => useContext(AuthorsContext);
