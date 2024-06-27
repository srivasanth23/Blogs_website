import React from "react";
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

const AddBlog = ({ opened, setOpened, onBlogAdded }) => {
  const [blogDetails, setBlogDetails] = React.useState({
    title: "",
    author: "",
    summary: "",
    content: "",
  });

  console.log(blogDetails);

  const handleReset = () => {
    setBlogDetails({
      title: "",
      author: "",
      summary: "",
      content: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://blogs-website-3k62.onrender.com/blogs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogDetails),
    });
    setOpened(false);
    handleReset();
    onBlogAdded();
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
            Add New Blog Post
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
                    value={blogDetails.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Author"
                    name="author"
                    value={blogDetails.author}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Summary"
                    name="summary"
                    value={blogDetails.summary}
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
                    value={blogDetails.content}
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
                  >
                    Add Post
                  </Button>
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

export default AddBlog;
