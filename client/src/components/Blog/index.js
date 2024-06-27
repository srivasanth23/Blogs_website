import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoaderView from "../LoaderView";
import Header from "../Header";
import "./index.css";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlogs] = useState(null);

  useEffect(() => {
    const url = `https://blogs-website-3k62.onrender.com/blogs/${id}`;
    const options = {
      method: "GET",
    };

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setBlogs(data);
        console.log(data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {blog ? (
        <section>
          <Header />
          <div className="paddings-blog flexColStart">
            <h1 className="blog-h-elem">{blog.title}</h1>
            <p className="contet-elem">{blog.content}</p>
            <p className="contet-elem">
              <strong>Author:</strong> {blog.author}
            </p>
            <p className="date-elem">{blog.publicationDate}</p>
          </div>
        </section>
      ) : (
        <LoaderView />
      )}
    </div>
  );
};

export default Blog;
