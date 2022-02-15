import React, { useEffect, useState } from "react";
import "../App.css";

export const Book = (props) => {
  const [oldType, setOldType] = useState("");

  useEffect(() => {
    setOldType(props.oldType);
  }, [props.oldType]);

  // handling select onchange and sending the data to the bookhandler function to process it
  const onSelectHandler = (e) => {
    if (e.target.value === oldType) {
      return null;
    } else {
      props.bookHandler(oldType, e.target.value, props.book);
    }
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${props.book.imageLinks?.thumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select onChange={onSelectHandler} value={oldType}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book?.title}</div>
      <div className="book-authors">{props.book?.authors?.join()}</div>
    </div>
  );
};
