import React, { memo } from 'react';
import { Button } from 'rsuite';

const PageLink = props => {
  const pages = props.pages;
  const handleChange = event => {
    props.changePage(event.target.id);
  };
  return (
    <>
      {pages.map((el, index) => (
        <Button
          key={pages[index]}
          id={pages[index]}
          active={props.currPage == pages[index] ? true : false}
          onClick={handleChange}
        >
          {pages[index]}
        </Button>
      ))}
    </>
  );
};

export default memo(PageLink);
