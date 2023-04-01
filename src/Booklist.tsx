import React, { useState } from 'react';

interface Book {
  title: string;
  cover: string;
  genre: string;
}
const KEY_BOOK_TITLE = 'Book Title';

const BookList: React.FC = () => {
  const [book] = useState<Book[]>([
    { title: 'Book 1', cover: 'cover1.jpg', genre: 'Fiction' },
    { title: 'Book 2', cover: 'cover2.jpg', genre: 'Non-Fiction' },
    { title: 'Book 3', cover: 'cover3.jpg', genre: 'Science Fiction' },
  ]);
  //conenctToDatabase();
  // read the book list
  return (
    <div>
      {books.map((book, index) => (
        <div key={index}>
          <h2>{book.title}</h2>
          <img src={book.cover} alt={book.title} />
          <p>Genre: {book.genre}</p>
        </div>
      ))}
    </div>
  );
};


async function  getBookList(): Promise<Book> {
  
  const uri ="neo4j+s://a3a2e25e.databases.neo4j.io"
  const user= "neo4j";
  const password= "SQdDBTSpA21jgS2k774Yqf7LRhH5TOnb6wvTLFYRiPI"
  const neo4j = require('neo4j-driver')
  
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
  const session = driver.session()
  const personName = '';
  
  try {
    const result = await session.run(
      'match (m:Book) return m'
    )
    
    // console.log('resutl', result);
  
    const singleRecord = result.records[0]
    const node = singleRecord.get(0)
  
    console.log(node.properties[KEY_BOOK_TITLE]);

    return result;
  } finally {
    await session.close()
  }
  
  // on application exit:
  await driver.close();
  }

export default BookList;
