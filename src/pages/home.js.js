import React, { useEffect, useState } from "react";
// import * as BooksAPI from './BooksAPI'
import "../App.css";

import { BookShelf } from "../components/booksShelf";
import { Search } from "./search";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getAll, update } from "../BooksAPI";

const BooksApp = (props) => {
  const [allBooks, setAllBooks] = useState([]);
  const [defaultBooks, setDefaultBooks] = useState([]);

  const [wantToRead, setWantToRead] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [read, setRead] = useState([]);
  let location = useLocation();

  // getting the default books for new users
  useEffect(() => {
    Promise.resolve(getAll()).then((res) => setDefaultBooks(res));
  }, []);

  // checking the local storage if  it contains stored books and if not display the default books
  useEffect(() => {
    let local = (item) => JSON.parse(localStorage.getItem(item));

    if (
      local("wantToRead")?.length > 0 ||
      local("currentlyReading")?.length > 0 ||
      local("read")?.length > 0
    ) {
      setWantToRead(local("wantToRead"));
      setCurrentlyReading(local("currentlyReading"));
      setRead(local("read"));
    } else {
      setWantToRead(defaultBooks.filter((book) => book.shelf === "wantToRead"));
      setCurrentlyReading(
        defaultBooks.filter((book) => book.shelf === "currentlyReading")
      );
      setRead(defaultBooks.filter((book) => book.shelf === "read"));
    }
  }, [defaultBooks]);
  // updating the local sotrage with new states
  useEffect(() => {
    localStorage.setItem("wantToRead", JSON.stringify(wantToRead));
    localStorage.setItem("currentlyReading", JSON.stringify(currentlyReading));
    localStorage.setItem("read", JSON.stringify(read));

    setAllBooks([...wantToRead, ...currentlyReading, ...read]);
  }, [wantToRead, currentlyReading, read]);

  // handling adding , moving , and deleting books from bookshelfs and updating the data in the backend
  const bookHandler = (oldType, newType, book) => {
    book.type = newType;

    // adding new book
    if (newType === "currentlyReading") {
      setCurrentlyReading((prev) => [...prev, book]);
      update(book, "currentlyReading");
    } else if (newType === "wantToRead") {
      setWantToRead((prev) => [...prev, book]);
      update(book, "wantToRead");
    } else if (newType === "read") {
      setRead((prev) => [...prev, book]);
      update(book, "read");
    } else {
      update(book, "none");
    }

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
