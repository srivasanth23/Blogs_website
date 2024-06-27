import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Modal,
  Container,
  Typography,
  TextField,
} from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";

const BlogEdit = ({ opened, setOpened }) => {
  const { id } = useParams();
  const [count, setCount] = useState(0);
  const [blog, setBlogDetails] = useState({
    title: "",
    author: "",
    summary: "",
    content: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `https://blogs-website-3k62.onrender.com/blogs/${id}`
      );
      const data = await response.json();
      setBlogDetails({
        title: data.title,
        author: data.author,
        summary: data.summary,
        content: data.content,
      });
    };
    fetchPost();
  }, [id]);

  console.log(count);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`https://blogs-website-3k62.onrender.com/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    setOpened(false);
    setCount(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal
      open={opened}
      onClose={() => setOpened(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle} container>
        <div
          className="modalHeader"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            padding: "0px 50px",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Edit Blog Post
          </Typography>
          <Button onClick={() => setOpened(false)}>
            <IoCloseSharp size={25} />
          </Button>
        </div>

        <Stepper>
          <Step>
            <StepContent>
              <Container maxWidth="sm">
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Title"
                    name="title"
                    value={blog.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Author"
                    name="author"
                    value={blog.author}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Summary"
                    name="summary"
                    value={blog.summary}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    required
                  />
                  <TextField
                    label="Content"
                    name="content"
                    value={blog.content}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => setCount((prev) => prev + 1)}
                  >
                    Edit Post
                  </Button>
                  {count === 1 ? (
                    <p style={{ padding: "5px", color: "#1f3e72" }}>
                      It takes some time
                    </p>
                  ) : (
                    <span></span>
                  )}
                </form>
              </Container>
            </StepContent>
          </Step>
        </Stepper>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  width: "90vw",
  maxWidth: "800px",
  overflowY: "auto",
  maxHeight: "80vh",
};

export default BlogEdit;
