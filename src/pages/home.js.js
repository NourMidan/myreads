import React, { useEffect, useState } from "react";
// import * as BooksAPI from './BooksAPI'
import "../App.css";

import { BookShelf } from "../components/booksShelf";
import { Search } from "./search";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const BooksApp = (props) => {
  const [allBooks, setAllBooks] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [read, setRead] = useState([]);
  let location = useLocation();

  // getting stored books from local storage
  useEffect(() => {
    localStorage.getItem("wantToRead") &&
      setWantToRead(JSON.parse(localStorage.getItem("wantToRead")));
    localStorage.getItem("currentlyReading") &&
      setCurrentlyReading(JSON.parse(localStorage.getItem("currentlyReading")));
    localStorage.getItem("read") &&
      setRead(JSON.parse(localStorage.getItem("read")));
  }, []);
  // updating the local sotrage with new states
  useEffect(() => {
    localStorage.setItem("wantToRead", JSON.stringify(wantToRead));
    localStorage.setItem("currentlyReading", JSON.stringify(currentlyReading));
    localStorage.setItem("read", JSON.stringify(read));

    setAllBooks([...wantToRead, ...currentlyReading, ...read]);
  }, [wantToRead, currentlyReading, read]);

  // handling adding , moving , and deleting books from bookshelfs
  const bookHandler = (oldType, newType, book) => {
    book.type = newType;

    // adding new book
    newType === "currentlyReading" &&
      setCurrentlyReading((prev) => [...prev, book]);
    newType === "wantToRead" && setWantToRead((prev) => [...prev, book]);
    newType === "read" && setRead((prev) => [...prev, book]);

    // deleting the book from old bookshelf if exists
    if (oldType === "currentlyReading") {
      let index = currentlyReading.findIndex((element) => {
        return element.id === book.id;
      });
      let array = [...currentlyReading];
      if (index !== -1) array.splice(index, 1);
      setCurrentlyReading(array);
    } else if (oldType === "wantToRead") {
      let index = wantToRead.findIndex(function (element) {
        return element.id === book.id;
      });
      let array = [...wantToRead];
      if (index !== -1) array.splice(index, 1);
      setWantToRead(array);
    } else if (oldType === "read") {
      let index = read.findIndex(function (element) {
        return element.id === book.id;
      });
      let array = [...read];
      if (index !== -1) array.splice(index, 1);
      setRead(array);
    }
  };

  return (
    <div className="app">
      {location.pathname === "/search" ? (
        <Search allBooks={allBooks} bookHandler={bookHandler} />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf
                bookHandler={bookHandler}
                books={currentlyReading}
                title={"Currently Reading"}
                oldType={"currentlyReading"}
              />
              <BookShelf
                bookHandler={bookHandler}
                books={wantToRead}
                title={"Want to Read"}
                oldType={"wantToRead"}
              />
              <BookShelf
                bookHandler={bookHandler}
                books={read}
                title={"Read"}
                oldType={"read"}
              />
            </div>
          </div>
          <div className="open-search">
            <Link to={"/search"}>Add a book</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksApp;
