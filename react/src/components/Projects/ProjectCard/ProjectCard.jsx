import React, { Component } from "react";
import { ProjectList } from "../../../data/ProjectData";
import {
  Card,
  CardLeft,
  CardRight,
  TechCardContainer,
  TechCard,
  BtnGroup,
} from "./ProjectCardElements";
import ScrollAnimation from "react-animate-on-scroll";


class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
      isOpen: false,
      showScrollDown: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/banner/posts")
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

  toggle() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    const { error, isLoaded, posts, isOpen, showScrollDown } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (!Array.isArray(posts)) {
      return <div>Error: Received data is not an array.</div>; // Error handling for unexpected data format
    } else {
      return (
        <>
          {posts.map((post) => (
            <ScrollAnimation animateIn="fadeInLeft">
              <Card>
                <CardLeft>
                  <img src={post.image} alt="Post"/>
                </CardLeft>
                <CardRight>
                  <h4>{post.title}</h4>
                  <p>{post.description}</p>
                  <BtnGroup>
                    {post.url.length > 0 && (
                      <a
                        className="btn PrimaryBtn btn-shadow"
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {post.url_name} ➜
                      </a>
                    )}
                  </BtnGroup>
                </CardRight>
              </Card>
            </ScrollAnimation>
          ))}
        </>
      );
    }
  }
}

export default ProjectCard;
