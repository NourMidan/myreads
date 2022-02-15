import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import BooksApp from "./pages/home.js.js";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<BooksApp />} />
        <Route path="search" element={<BooksApp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
