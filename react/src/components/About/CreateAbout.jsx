import React from "react";
import { useNavigate } from "react-router-dom";

class CreateAbout extends React.Component {
  constructor(props) {
  super(props);
  this.state = {description_1: '', description_2: '', image: null, description_3:'',};
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
    const { description_1, description_2, image, description_3,} = this.state;
    // Client-side validation
    if (!description_1 || !description_2 || !description_3) {
    this.setState({ error: "Title and description are required." });
    return;
  }

  const formData = new FormData();
    formData.append("image", image);
    formData.append("description_1", description_1);
    formData.append("description_2", description_2);
    formData.append("description_3", description_3);
  fetch("http://127.0.0.1:8000/api/about/post/", {
  method: "POST",
    body: formData,
})
    .then((res) => res.json())
  .then(
    (result) => {
    console.log(result);
    this.setState({
      image: null,
      description_1: "",
      description_2: "",
      description_3: "",
      error: null,
    });
    this.props.navigate("/about_me");
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
        <h3 className="welcom">Description 1:</h3>
        <input type="text" name="description_1" value={this.state.description_1} onChange={this.handleChange}/>
      </label>
      <label>
        <h3 className="welcom">Description 2:</h3>
        <input type="text" name="description_2" value={this.state.description_2} onChange={this.handleChange}/>
      </label>
      <label>
        <h3 className="welcom">Description 3:</h3>
        <input type="text" name="description_3" value={this.state.description_3} onChange={this.handleChange}/>
      </label>
      <input type="submit" value="Submit"/>
    </form>
  )
    ;
}
}
function WithNavigate(props) {
  let navigate = useNavigate();
  return <CreateAbout {...props} navigate={navigate}/>}

export default WithNavigate;
