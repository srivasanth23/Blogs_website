import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const BlogsList = () => {
  const [blogs, setBlogs] = React.useState([]);

  useEffect(() => {
    const url = "https://blogs-website-3k62.onrender.com/";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // setBlogs(fetchData());
  }, []);

  const summaryShortner = (summary) => {
    if (summary.length > 150) {
      return summary.substring(0, 150) + "...";
    }
    return summary;
  };

  return (
    <section className="flex">
      <Header />
      {/* Added Just for good visual look, we can add more like Profile menu to header etc */}
      <div className="paddings innerWidth ">
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
      </div>
    </section>
  );
};

export default BlogsList;
