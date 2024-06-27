import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./index.css";
import LoaderView from "../LoaderView";
import { FaPlusCircle } from "react-icons/fa";
import AddBlog from "../AddBlog/index";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modelOpened, setmodelOpened] = useState(false);

  //fetches blogs from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = "https://blogs-website-3k62.onrender.com/blogs/";
    const options = {
      method: "GET",
    };
    try {
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      setLoading(false);
      const formattedData = data.map((each) => ({
        id: each._id,
        title: each.title,
        author: each.author,
        content: each.content,
        publicationDate: each.publicationDate,
        summary: each.summary,
      }));
      console.log(formattedData);
      setBlogs(formattedData);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const summaryShortner = (summary) => {
    if (summary.length > 150) {
      return summary.substring(0, 150) + "...";
    }
    return summary;
  };

  console.log(blogs);

  const handleOpen = () => {
    setmodelOpened(true);
  };

  const onBlogAdded = () => {
    fetchData();
  };

  return (
    <section className="flex">
      <Header />
      {/* Added Just for good visual look, we can add more like Profile menu to header etc */}
      <div className="paddings innerWidth ">
        <div className="flexColEnd" style={{ paddingRight: "5rem" }}>
          <button className="flexRowStart btnElem" onClick={() => handleOpen()}>
            <FaPlusCircle />
            <span style={{ paddingLeft: "5px" }}>Add new Blog</span>
          </button>
        </div>
        <AddBlog
          opened={modelOpened}
          setOpened={setmodelOpened}
          onBlogAdded={onBlogAdded}
        />
        {loading ? (
          <LoaderView />
        ) : (
          <ul className="ul-container flexRowStart">
            {blogs.map((b) => (
              <Link to={`/blog/${b.id}`} className="l-elem">
                <li key={b.id}>
                  <h2>{b.title}</h2>
                  <p>
                    <strong>Author:</strong> {b.author}
                  </p>
                  <p className="summary-elem">
                    <strong>Summary:</strong> {summaryShortner(b.summary)}
                  </p>
                  <p className="pb-elem">
                    <strong>Published On:</strong> {b.publicationDate}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default BlogsList;
