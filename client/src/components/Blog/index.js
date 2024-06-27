import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoaderView from "../LoaderView";
import Header from "../Header";
import "./index.css";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import BlogEdit from "../BlogEdit";
import DeleteBlog from "../DeleteBlog/index";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlogs] = useState(null);
  const [modelOpened, setmodelOpened] = useState(false);
  const [deleteopened, setdeleteopened] = useState(false);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    const url = `https://blogs-website-3k62.onrender.com/blogs/${id}`;
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setBlogs(data);
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleOpen = () => {
    setmodelOpened(true);
  };

  const deletehandleOpen = () => {
    setdeleteopened(true);
  };

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
          <div className="f-elem blog-btn-edit-delete-con">
            <div className="flexColEnd" style={{ padding: "2rem 20rem" }}>
              <button
                className="flexRowStart btnElem"
                onClick={() => handleOpen()}
              >
                <FaPencil />
                <span style={{ paddingLeft: "5px" }}>Edit Blog</span>
              </button>
              <BlogEdit opened={modelOpened} setOpened={setmodelOpened} />
            </div>
            <div className="flexColEnd" style={{ padding: "2rem 20rem" }}>
              <button
                className="flexRowStart btnElem"
                onClick={() => deletehandleOpen()}
              >
                <MdDelete />
                <span style={{ paddingLeft: "5px" }}>Delete Blog</span>
              </button>
              <DeleteBlog opened={deleteopened} setOpened={setdeleteopened} />
            </div>
          </div>
        </section>
      ) : (
        <LoaderView />
      )}
    </div>
  );
};

export default Blog;
