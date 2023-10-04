import AboutMe from "./aboutMe/AboutMe";
import Project1 from "./projects/Project1";
import Project2 from "./projects/Project2";
import Carousel from "../../components/carousel/Carousel";

import "./Home.css";

function Home() {
  const CarouselSections = [<AboutMe />, <Project1 />, <Project2 />];
  return (
    <div className="home">
      <header className="header">
        <h1>Welcome to My Portfolio</h1>
        <p>
          Web Developer | Fullstack Developer | Application Developer | Data
          Analyst Enthusiast
        </p>
      </header>
      <Carousel items={CarouselSections} />
      <br />
      <section className="contact">
        <h2>Contact Me</h2>
        <p>
          Feel free to get in touch with me. You can reach me at
          takoaashish01@gmail.com.
        </p>
      </section>
    </div>
  );
}

export default Home;
