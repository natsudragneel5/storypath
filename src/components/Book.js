import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'rsuite';

const Book = ({ book }) => {
  const { cover, name, id, owner, writeAccess, createdAt, depth, description } =
    book;
  const { authors, isLoading } = useAuthor();
  console.log(authors);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '5vh',
      }}
    >
      <div>image</div>
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '4vw' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <label>name:</label>
            {name}
          </div>
          <div>
            <label>owner:</label>
            {owner}
          </div>
          <div>
            <label>depth:</label>
            {depth}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '4vw',
          }}
        >
          <div>createdAt</div>
          <Link
            style={{
              font: 'bold 11px Arial',
              textDecoration: 'none',
              backgroundColor: 'aquamarine',
              color: '#333333',
              padding: '2px 6px 2px 6px',
              borderRadius: '25px',
            }}
            to={`/book/:${id}`}
          >
            Read
          </Link>
        </div>
      </div>
      <p>Description:{description}</p>
    </div>
  );
};

export default memo(Book);
