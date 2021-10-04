import React from 'react';
import { useParams } from 'react-router';
import { Container, Grid } from 'rsuite';

const BookBoard = () => {
  const { book_uid, page_uid } = useParams();

  console.log('book_uid', book_uid.split(':')[1]);
  console.log('page_uid', page_uid.split(':')[1]);
  return (
    <Container>
      <Grid>
        <h3>read books her</h3>
      </Grid>
    </Container>
  );
};

export default BookBoard;
