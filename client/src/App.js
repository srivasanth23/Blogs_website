import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import BlogsList from "./components/BlogsList";
import Blog from "./components/Blog";
import BlogEdit from "./components/BlogEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<BlogsList />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
