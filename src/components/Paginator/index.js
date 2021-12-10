import React, {
  memo,
  useEffect,
  useState,
  Suspense,
  lazy,
  useReducer,
  createContext,
} from 'react';
import { Button, Nav } from 'rsuite';
import { getPages } from '../../misc/helpers';
import Book from '../Book';
const PageContent = lazy(() => import('./PageContent'));
const PageLink = lazy(() => import('./PageLink'));
const Paginator = ({ inArr, method, author }) => {
  const [currPage, setCurrPage] = useState(1);
  const changePage = pageNo => {
    setCurrPage(pageNo);
  };
  const [pages, setPages] = useState([1]);
  const [isLoading, setIsLoading] = useState(false);
  const onlyOnePage = inArr.length < 11 ? true : false;
  const remainder = onlyOnePage ? 0 : inArr.length % 10;
  let maxSlices;
  if (remainder === 0) {
    if (onlyOnePage) {
      maxSlices = 1;
    } else {
      maxSlices = inArr.length / 10;
    }
  } else {
    maxSlices = (inArr.length - remainder) / 10 + 1;
  }
  useEffect(() => {
    setIsLoading(true);
    setPages(getPages(maxSlices));
    setIsLoading(false);
  }, [maxSlices]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (!onlyOnePage) {
    return (
      <div>
        {method === 'books' && (
          <>
            {pages && (
              <>
                <Suspense fallback={<div>Loading ...</div>}>
                  <PageLink
                    currPage={currPage}
                    pages={pages}
                    changePage={changePage}
                    inArr={inArr}
                  />
                </Suspense>
                <Suspense fallback={<div>Loading ...</div>}>
                  <PageContent
                    currPage={currPage}
                    author={author}
                    inArr={inArr}
                  />
                </Suspense>
                <Suspense fallback={<div>Loading ...</div>}>
                  <PageLink
                    currPage={currPage}
                    pages={pages}
                    changePage={changePage}
                    inArr={inArr}
                  />
                </Suspense>
              </>
            )}
          </>
        )}
      </div>
    );
  }
  if (onlyOnePage) {
    return (
      <>
        {method === 'books' &&
          inArr &&
          inArr.map((el, index) => (
            <Book
              key={inArr[index].id}
              book={inArr[index]}
              authorName={author}
            />
          ))}
      </>
    );
  }
};

export default Paginator;
