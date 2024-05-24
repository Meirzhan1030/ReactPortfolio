import React, { Component } from "react";
import Dropdown from "../Dropdown/Dropdown.jsx";
import Header from "../Header/Header.jsx";
import {
  HeroContainer,
  HeroWrapper,
  HeroLeft,
  HeroRight,
  Image,
  ScrollDown,
  ScrollLink,
} from "./HeroElements.jsx";
import { TypeAnimation } from "react-type-animation";
import ScrollAnimation from "react-animate-on-scroll";

class Hero extends Component {
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
    fetch("http://127.0.0.1:8000/api/posts")
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
        <div>
          <main>
            <Dropdown isOpen={isOpen} toggle={this.toggle} />
            <Header toggle={this.toggle} />
            {posts.length > 0 ? (
              posts.map((post) => (
                <HeroContainer key={post.id}>
                  <HeroWrapper>
                    <HeroLeft>
                      <ScrollAnimation animateIn="fadeIn">
                        <TypeAnimation
                          cursor={false}
                          sequence={[
                            `Hi, I'm ${post.name}`,
                            1500,
                            () => this.setState({ showSubtitle: true }),
                          ]}
                          speed={50}
                          wrapper="h1"
                          repeat={0}
                        />
                        <p>{post.description}</p> {/* Display post description or other content */}
                      </ScrollAnimation>
                    </HeroLeft>
                    <HeroRight>
                      <ScrollAnimation animateIn="fadeIn">
                        <Image
                          src={post.image} alt="Post"
                        />
                      </ScrollAnimation>
                    </HeroRight>
                  </HeroWrapper>
                  {showScrollDown && (
                    <ScrollAnimation animateIn="flipInX" offset={0}>
                      <ScrollDown to="projects" id="scrollDown">
                        <ScrollLink>
                          Scroll down
                          <img
                            src="/scroll-down.svg"
                            alt="scroll-down"
                          />
                        </ScrollLink>
                      </ScrollDown>
                    </ScrollAnimation>
                  )}
                </HeroContainer>
              ))
            ) : (
              <div>No posts available</div>
            )}
          </main>
        </div>
      );
    }
  }
}

export default Hero;
