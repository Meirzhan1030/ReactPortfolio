import React from "react";
import Hero from "../components/Hero/Hero.jsx";
import Projects from "../components/Projects/Projects.jsx";
import About from "../components/About/About.jsx";
import Contact from "../components/Contact/Contact.jsx";
import Footer from "../components/Footer/Footer.jsx";
import FixSocialIcon from "../components/SocialIcon/FixSocialIcon.jsx";
import ScrollToTop from "../components/SocialIcon/ScrollToTop.jsx";
import Skills from "../components/Skills/Skill.jsx";

function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Contact />
      <FixSocialIcon />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Home;
