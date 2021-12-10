import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

const Book = ({ book, authorName }) => {
  const { cover, name, id, owner, writeAccess, createdAt, depth, description } =
    book;
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
            <label>name: </label>
            {name}
          </div>
          <div>
            <label>owner: </label>
            <Link to={`/profile/:${owner}`}>{authorName}</Link>
          </div>
          <div>
            <label>depth: </label>
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
          <div>
            <label>createdAt: </label>
            <TimeAgo date={new Date(createdAt)} />
          </div>
          <Link
            style={{
              font: 'bold 11px Arial',
              textDecoration: 'none',
              backgroundColor: 'aquamarine',
              color: '#333333',
              width: '50px',
              padding: '2px 6px 2px 6px',
              borderRadius: '25px',
            }}
            to={`/book/:${id}`}
          >
            Read
          </Link>
        </div>
      </div>
      <p>Description: {description}</p>
    </div>
  );
};

export default Book;
