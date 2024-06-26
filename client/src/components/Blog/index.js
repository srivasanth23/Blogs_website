// BlogPost.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogByID } from "../../utils/mockAPI";

const Blog = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchedPost = fetchBlogByID(parseInt(id, 10));
    setPost(fetchedPost);
  }, [id]);

  return (
    <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>
            <strong>Author:</strong> {post.author}
          </p>
          <p>{post.content}</p>
          <p>
            <strong>Publication Date:</strong> {post.publicationDate}
          </p>
        </>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default Blog;
