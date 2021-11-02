import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth, database } from '../misc/firebase';
import { transformToArrWithId } from '../misc/helpers';

const AuthorContext = createContext();
export const AuthorProvider = ({ children }) => {
  const [authors, setAuthors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const authorRef = database.ref('/profiles');
  useEffect(() => {
    setIsLoading(true);
    authorRef.on('value', snap => {
      console.log('authors', snap.val());
      setAuthors(transformToArrWithId(snap.val()));
    });
    setIsLoading(false);
    return () => {
      authorRef.off();
    };
  }, []);
  return (
    <AuthorContext.Provider value={{ isLoading, authors }}>
      {children}
    </AuthorContext.Provider>
  );
};

export const useAuthor = () => useContext(AuthorContext);
