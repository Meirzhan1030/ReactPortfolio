import React, {Component} from 'react';
import {
  Image,
  ContactWrapper,
} from './AboutElements';
import ScrollAnimation from 'react-animate-on-scroll';
import {BtnGroup, Card, CardLeft, CardRight} from "../Projects/ProjectCard/ProjectCardElements.js";


class About extends Component {
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
        posts.map((post) => (
          <ContactWrapper id="about">
            <div className="Container">
              <div className="SectionTitle">About Me</div>
                <ScrollAnimation animateIn="fadeInLeft">
                  <Card>
                    <CardLeft>
                      <Image src={post.image} alt="Post" />
                    </CardLeft>
                    <CardRight>
                      {post.description_1}
                      <br/><br/>
                      {post.description_2}
                      <br/><br/>
                      {post.description_3}
                    </CardRight>
                  </Card>
                </ScrollAnimation>
            </div>
          </ContactWrapper>
        ))
      );
    }
  }
}

export default About;

