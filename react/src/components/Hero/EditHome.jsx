import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditHome = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({
    name: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    getPost();
  }, []);

  const getPost = () => {
    fetch(`http://127.0.0.1:8000/api/post/` + id)
    .then((res) => res.json())
      .then((data) => {
      setPost(data);
      });
  };

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    console.log(post);
    fetch(`http://127.0.0.1:8000/api/post/` + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          },
        (error) => {
          setPost({
          isLoaded: true,
            error
        });        }
      );
    event.preventDefault();
    navigate("/homepage");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
      <h3 className="welcom">Name:</h3>
        <input
          type="text"
          name="name"
          value={post.name || ""}
          onChange={handleChange}

    />
      </label>

      <label>
        <h3 className="welcom">Image:</h3>
        <input
        type="text"
        name="image"
        value={post.image || ""}
        onChange={handleChange}
      />
      </label>

      <label>
        <h3 className="welcom">Description:</h3>
        <input
          type="text"
          name="description"
          value={post.description || ""}
          onChange={handleChange}        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};
export default EditHome;

