import React from 'react'
import { Button, Card } from 'react-bootstrap'
import styles from '../styles/Book.module.scss';
import BookType from '../types/book';

interface PropsType {
  book: BookType;
  handleBorrowReturn: Function
}

const limitShortDescription = (desc: string) => {
  if(desc.length > 150) desc = `${desc.slice(0, 150)}...`;
  return desc;
};

export default function Book(props: Readonly<PropsType>) {

  const { book, handleBorrowReturn } = props;

  return (
    <Card className={styles.bookWidth} data-testid="book">
      <Card.Img variant="top" src={book.thumbnailUrl} />
      <Card.Body>
        <Card.Title className='text-primary'>{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
        <Card.Text>{limitShortDescription(book.shortDescription)}</Card.Text>
        <Button data-testid="borrow-button" variant="primary" onClick={() => handleBorrowReturn(book.id)}>{book.status === 'Available' ? 'Borrow' : 'Return'}</Button>
      </Card.Body>
    </Card>
  )
}
