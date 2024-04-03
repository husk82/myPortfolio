import { useNavigate } from "react-router-dom";
import AboutMe from "./aboutMe/AboutMe";
import Project1 from "./projects/Project1";
import Project2 from "./projects/Project2";
import Carousel from "../../components/carousel/Carousel";

import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const CarouselSections = [<AboutMe />, <Project1 />, <Project2 />];
  return (
    <div className="home">
      <header className="header">
        <h1>Welcome to My Portfolio</h1>
        <p>
          Web Developer | Fullstack Developer | Application Developer | Data
          Analyst Enthusiast
        </p><br/>
        {/* TODO: Re-enable this button once the 3D space is ready
        <button onClick={() => navigate('/3dspace')}>GO TO MY 3D SPACE</button>
        */}
      </header>
      <Carousel items={CarouselSections} />
      <br />
      <section className="contact">
        <h2>Contact Me</h2>
        <p>
          Feel free to get in touch with me. You can reach me at: <br />
          Email:<a href="mailto:takoaashish01@gmail.com">takoaashish01@gmail.com</a><br />
          GitHub: <a href="https://github.com/husk82"> https://github.com/husk82 </a><br />
        </p>
      </section>
    </div>
  );
}

export default Home;
