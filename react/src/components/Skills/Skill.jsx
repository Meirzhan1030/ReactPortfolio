import React, {Component} from 'react';
import {
  Image,
  Technologies,
  Tech,
  TechImg,
  TechName,
  ContactWrapper,
} from './SkillElements.jsx';
import ScrollAnimation from 'react-animate-on-scroll';




class Skills extends Component {
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
    fetch("http://127.0.0.1:8000/api/skill/posts")
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
          <ContactWrapper id="about">
            <div className="Container">
              <div className="SectionTitle">My Skills</div>
              <div className="BigCard">
                <ScrollAnimation animateIn="fadeInLeft">
                  {/*<Image src={post.image} alt="Post" />*/}
                </ScrollAnimation>
                <div className="AboutBio">
                  {/*<ScrollAnimation animateIn="fadeInLeft">*/}
                  {/*  {post.title}*/}
                  {/*</ScrollAnimation>*/}
                  {/*<br />*/}
                  {/*<br />*/}
                  {/*<ScrollAnimation animateIn="fadeInLeft">*/}
                  {/*  <ProgressBar variant="info" now={60} />*/}

                  {/*</ScrollAnimation>*/}
                  {/*<div className="AboutBio">*/}
                  {/*  {post.title}*/}
                  {/*  <br/>*/}
                  {/*  <br/>*/}
                  {/*  <ProgressBar width="50%" />*/}
                  {/*</div>*/}


                  <Technologies>
                    {posts.map((post, index) => (
                      <ScrollAnimation animateIn="fadeInLeft" key={index}>
                        <Tech className="tech">
                          <TechImg src={post.image} alt="Post"/>
                          <TechName>{post.title}</TechName>
                          <progress value={post.progress} max={100}/>

                        </Tech>
                      </ScrollAnimation>
                    ))}
                  </Technologies>

                </div>
              </div>
            </div>
          </ContactWrapper>

      );
    }
  }
}

export default Skills;

