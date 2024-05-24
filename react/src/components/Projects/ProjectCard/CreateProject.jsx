import React from "react";
import { useNavigate } from "react-router-dom";

class CreateProject extends React.Component {  constructor(props) {
  super(props);
  this.state = {title: '', description: '', image: null, url_name:'',url:'',};
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}
  handleChange(event) {
    if (event.target.name === "image") {
      this.setState({ image: event.target.files[0] });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
}

  handleSubmit(event) {
    event.preventDefault();
    const { title, description, image, url_name, url } = this.state;
    // Client-side validation
    if (!title || !description || !url_name|| !url) {
    this.setState({ error: "Title and description are required." });
    return;
  }

  const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("url_name", url_name);
    formData.append("url", url);
  fetch("http://127.0.0.1:8000/api/banner/post/", {
  method: "POST",
    body: formData,
})
    .then((res) => res.json())
  .then(
    (result) => {
    console.log(result);
    this.setState({
      image: null,
      description: "",
      title: "",
      url_name: "",
      url: "",
      error: null,
    });
    this.props.navigate("/projects");
  },
    (error) => {
    console.error("Error:", error);
    this.setState({ error: "An error occurred while submitting the form." });
  }
  );
}

render() {
  const { error } = this.state;
  return (
    <form onSubmit={this.handleSubmit}>
      <div>{error && <p style={{color: "red"}}>{error}</p>}</div>
      <label>
        <h3 className="welcom">Image:</h3>
        <input type="file" name="image" onChange={this.handleChange}/>
      </label>
      {this.state.image && <p>Selected file: {this.state.image.name}</p>}
      <label>
        <h3 className="welcom">Title:</h3>
        <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
      </label>
      <label>
        <h3 className="welcom">Description:</h3>
        <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
      </label>
      <label>
        <h3 className="welcom">Url name:</h3>
        <input type="text" name="url_name" value={this.state.url_name} onChange={this.handleChange}/>
      </label>
      <label>
        <h3 className="welcom">Url:</h3>
        <input type="text" name="url" value={this.state.url} onChange={this.handleChange}/>
      </label>
      <input type="submit" value="Submit"/>
    </form>
  )
    ;
}
}
function WithNavigate(props) {
  let navigate = useNavigate();
  return <CreateProject {...props} navigate={navigate}/>}

export default WithNavigate;
