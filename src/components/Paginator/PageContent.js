import React, { useEffect, useState } from 'react';
import { getSlice } from '../../misc/helpers';
import Book from '../Book';

const PageContent = ({ currPage, author, inArr }) => {
  const [slice, setSlice] = useState(null);
  useEffect(() => {
    setSlice(getSlice(currPage, inArr));
    return () => {};
  }, [currPage]);
  if (!slice) {
    return <>Loading Data</>;
  }
  return (
    <>
      {slice.map((el, index) => (
        <Book key={slice[index].id} book={slice[index]} authorName={author} />
      ))}
    </>
  );
};

export default PageContent;
