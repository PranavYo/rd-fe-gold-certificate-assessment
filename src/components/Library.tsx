import React, { useContext, useEffect, useState } from 'react'
import mockBooksData from '../constants/books';
import { Form } from 'react-bootstrap';
import BookType from '../types/book';
import Book from './Book';
import Alert from '../types/alert';
import AlertContext from '../context/Alerts/AlertContext';
import initialAlert from '../constants/initialAlertState';

export default function Library() {

  const alertContext = useContext(AlertContext);

  const [books, setBooks] = useState(mockBooksData);
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>(books);

  // Just to mock the usage of Error boundry!
  useEffect(() => {
    if(!books) throw new Error('Could not get the books from server!');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBorrowReturn = (id: number) => {
    const booksDeepCopy: BookType[] = JSON.parse(JSON.stringify(books));
    const filteredBooksDeepCopy: BookType[] = JSON.parse(JSON.stringify(filteredBooks));

    const bookIndex = booksDeepCopy.findIndex(book => book.id === id);
    const filteredBookIndex = filteredBooksDeepCopy.findIndex(book => book.id === id);

    if(bookIndex === -1 || filteredBookIndex === -1) return;
    
    booksDeepCopy[bookIndex].status = booksDeepCopy[bookIndex].status === 'Available' ? 'Borrowed' : 'Available';
    setBooks(booksDeepCopy);

    filteredBooksDeepCopy[filteredBookIndex].status = filteredBooksDeepCopy[filteredBookIndex].status === 'Available' ? 'Borrowed' : 'Available';
    setFilteredBooks(filteredBooksDeepCopy);

    const alertState: Alert = {...initialAlert, show: true, title: 'Success'};
    alertState.message = filteredBooks[filteredBookIndex].status === 'Available'
      ? `${filteredBooks[filteredBookIndex].title} is borrowed successfully!`
      : `${filteredBooks[filteredBookIndex].title} is returned successfully!`

    alertContext?.setAlertState(alertState);
  };

  const filterBooksBySearch = (searchedQuery: string) => {
    let booksDeepCopy: BookType[] = JSON.parse(JSON.stringify(books));
    booksDeepCopy = booksDeepCopy.filter(
      book => 
        book.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchedQuery.toLowerCase())
    );
    setFilteredBooks(booksDeepCopy);
  };
  
  let searchTimeout: number | undefined;
  const debouncedInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchedQuery = (e.target.value).trim();
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      filterBooksBySearch(searchedQuery);
    }, 500) as any;
  };

  return (
    <div className='p-3 d-flex flex-column gap-3'>
      <div className='d-flex align-items-center'>
        <Form.Label htmlFor="search-book" className='m-0 me-2 fw-semibold fs-4 text-primary'>Search:</Form.Label>
        <Form.Control id='search-book' type="text" onChange={debouncedInputChange} placeholder='Enter the book name' />
      </div>
      <div className='d-flex flex-wrap gap-3 justify-content-center'>
        { filteredBooks?.length === 0 && <span className='fw-semibold fs-4 text-primary'>No results</span> }
        {
          filteredBooks?.map(book => (
            <Book 
              key={book.id}
              book={book}
              handleBorrowReturn={handleBorrowReturn}
            />
          ))
        }
      </div>
    </div>
  )
}
