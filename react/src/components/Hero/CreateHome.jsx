import React from "react";
import { useNavigate } from "react-router-dom";

class CreateHome extends React.Component {  constructor(props) {
  super(props);
  this.state = {name: '', description: '', image: null,};
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}
  handleChange(event) {
    if (event.target.name === "image") {
      this.setState({ image: event.target.files[0] });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }  }
  handleSubmit(event) {
    event.preventDefault();
    const { name, description, image } = this.state;
    // Client-side validation
    if (!name || !description) {
    this.setState({ error: "Title and description are required." });
    return;
  }
  const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
  fetch("http://127.0.0.1:8000/api/post/", {
  method: "POST",
    body: formData,
})      .then((res) => res.json())
  .then(
    (result) => {
    console.log(result);
    this.setState({
      image: null,
      description: "",
      name: "",
      error: null,
    });
    this.props.navigate("/homepage");
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
        <h3 className="welcom">Name:</h3>
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
      </label>
      <label>
        <h3 className="welcom">Description:</h3>
        <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
      </label>
      <input type="submit" value="Submit"/>
    </form>    )
    ;  }
}
function WithNavigate(props) {
  let navigate = useNavigate();
  return <CreateHome {...props} navigate={navigate}/>}

export default WithNavigate;
