import React, { useEffect, useState } from "react";
import "../App.css";
import { search } from "../BooksAPI";
import { Book } from "../components/Book";
import { DebounceInput } from "react-debounce-input";
import { Link } from "react-router-dom";

export const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  // requesting results once the searchterm state changes
  useEffect(() => {
    searchTerm &&
      Promise.resolve(search(searchTerm)).then((res) => setResults(res));
  }, [searchTerm]);

  // updating the state with the input value once it is changed and making sure if the input is empty there are no results
  const handleChange = (e) => {
    e.length === 0 && setResults([]);
    setSearchTerm(e);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={"/"}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <DebounceInput
            type="text"
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
            debounceTimeout={300}
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {results.length > 0 ? (
            results?.map((book) => {
              // checking if the search results contained any books from the bookshelf if not it carries value "none"
              let checkIfSelected = props.allBooks.findIndex(function (
                element
              ) {
                return element.id === book.id;
              });
              let bookType = props.allBooks[checkIfSelected]?.type;
              return (
                <li key={book.id}>
                  <Book
                    oldType={bookType || "none"}
                    bookHandler={props.bookHandler}
                    book={book}
                  />
                </li>
              );
            })
          ) : (
            <h1>No results found</h1>
          )}
        </ol>
      </div>
    </div>
  );
};
