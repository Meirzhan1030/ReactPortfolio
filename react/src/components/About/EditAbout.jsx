import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditAbout = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({
    description_1: "",
    description_2: "",
    image: "",
    description_3: "",
  });

  useEffect(() => {
    getPost();
  }, []);

  const getPost = () => {
    fetch(`http://127.0.0.1:8000/api/about/post/` + id)
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
    fetch(`http://127.0.0.1:8000/api/about/post/` + id, {
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
    navigate("/about_me");
  };
  return (
    <form onSubmit={handleSubmit}>
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
        <h3 className="welcom">Description 1:</h3>
        <input
          type="text"
          name="description_1"
          value={post.description_1 || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        <h3 className="welcom">Description 2:</h3>
        <input
          type="text"
          name="description_2"
          value={post.description_2 || ""}
          onChange={handleChange}/>
      </label>
      <label>
        <h3 className="welcom">Description 3:</h3>
        <input
          type="text"
          name="description_3"
          value={post.description_3 || ""}
          onChange={handleChange}/>
      </label>
      <input type="submit" value="Submit"/>
    </form>
  );
};
export default EditAbout;

