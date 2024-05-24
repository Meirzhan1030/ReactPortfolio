import React from "react";
import { useNavigate } from "react-router-dom";

class CreateSkill extends React.Component {
  constructor(props) {
  super(props);
  this.state = {title: '', progress: '', image: null, };
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
    const { title, progress, image,} = this.state;
    // Client-side validation
    if (!title || !progress ) {
    this.setState({ error: "Title and description are required." });
    return;
  }

  const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("progress", progress);
  fetch("http://127.0.0.1:8000/api/skill/post/", {
  method: "POST",
    body: formData,
})
    .then((res) => res.json())
  .then(
    (result) => {
    console.log(result);
    this.setState({
      image: null,
      title: "",
      progress: "",
      error: null,
    });
    this.props.navigate("/skills");
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
        <h3 className="welcom">Progress:</h3>
        <input type="text" name="progress" value={this.state.progress} onChange={this.handleChange}/>
      </label>
      <input type="submit" value="Submit"/>
    </form>
  )
    ;
}
}
function WithNavigate(props) {
  let navigate = useNavigate();
  return <CreateSkill {...props} navigate={navigate}/>}

export default WithNavigate;
