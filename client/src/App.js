import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useState } from "react";
import LoaderView from "./components/LoaderView";
import BlogsList from "./components/BlogsList";
import Blog from "./components/Blog";
import BlogEdit from "./components/BlogEdit";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoaderView />} />
      <Routes>
        <Route exact path="/" element={<BlogsList />} />
        <Route path="/blog/:blogId" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
