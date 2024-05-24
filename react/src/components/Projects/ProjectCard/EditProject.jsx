import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProject = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: "",
    url_name: "",
    url: "",
  });

  useEffect(() => {
    getPost();
  }, []);

  const getPost = () => {
    fetch(`http://127.0.0.1:8000/api/banner/post/` + id)
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
    fetch(`http://127.0.0.1:8000/api/banner/post/` + id, {
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
    navigate("/projects");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h3 className="welcom">Title:</h3>
        <input
          type="text"
          name="title"
          value={post.title || ""}
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
          onChange={handleChange}/>
      </label>
      <label>
        <h3 className="welcom">Url name:</h3>
        <input
          type="text"
          name="url_name"
          value={post.url_name || ""}
          onChange={handleChange}/>
      </label>
      <label>
        <h3 className="welcom">Url:</h3>
        <input
          type="text"
          name="url"
          value={post.url || ""}
          onChange={handleChange}/>
      </label>
      <input type="submit" value="Submit"/>
    </form>
  );
};
export default EditProject;

