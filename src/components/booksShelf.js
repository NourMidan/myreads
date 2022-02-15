import React from "react";
import "../App.css";
import { Book } from "./Book";

export const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book) => (
            <li key={book.id}>
              <Book
                oldType={props.oldType}
                bookHandler={props.bookHandler}
                book={book}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
