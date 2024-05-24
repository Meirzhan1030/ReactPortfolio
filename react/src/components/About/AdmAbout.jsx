import React from "react";
import { Link } from "react-router-dom";

class AdmAbout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: []
    };
  }

  delPost(id) {
    console.log(id);
    fetch(`http://127.0.0.1:8000/api/about/post/` + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          // Optionally, refresh the posts list after deletion
          this.componentDidMount();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/about/posts")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result); // Log the result to check its structure
          if (result && result.posts && Array.isArray(result.posts)) {
            this.setState({
              isLoaded: true,
              posts: result.posts // Access the correct property
            });
          } else {
            this.setState({
              isLoaded: true,
              error: new Error("Unexpected data format")
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, posts } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (!Array.isArray(posts)) {
      return <div>Unexpected data format</div>;
    } else {
      return (
        <div>
          <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
            <h3 className="welcom">About</h3>
            <Link className="btn-add" to="/create/about">Add new</Link>
          </div>
          <div className="card animated fadeInDown">
            <table>
              <thead>
              <tr>
                <th>Image</th>
                <th>Description 1</th>
                <th>Description 2</th>
                <th>Description 3</th>
                <th>Create Date</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <img src={post.image} alt="Post" width={100} onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/100";
                  }}/>
                  <td>{post.description_1.length > 30 ? post.description_1.slice(0, 30) + '...' : post.description_1}</td>
                  <td>{post.description_2.length > 30 ? post.description_2.slice(0, 30) + '...' : post.description_2}</td>
                  <td>{post.description_3.length > 30 ? post.description_3.slice(0, 30) + '...' : post.description_3}</td>
                  <td>{post.created_at}</td>
                  <td>
                    <Link className="btn-edit" to={{pathname: "/about/edit/" + post.id}}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={() => this.delPost(post.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default AdmAbout;
