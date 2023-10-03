import "./Home.css";

function Home() {
  return (
    <div className="home">
      <header className="header">
        <h1>Welcome to My Portfolio</h1>
        <p>Web Developer | Fullstack Developer | Application Developer </p>
      </header>
      <section className="about">
        <h2>About Me</h2>
        <p>
          Hello! I'm [Your Name], a passionate web developer with expertise in
          building modern and responsive web applications.
        </p>
        <p>
          My goal is to create user-friendly and visually appealing websites
          that make a positive impact on users. I'm proficient in HTML, CSS,
          JavaScript, and various frontend frameworks like React.
        </p>
      </section>
      <section className="projects">
        <h2>Projects</h2>
        <div className="project">
          <h3>Project 1</h3>
          <p>
            Description of your project goes here. Highlight key features and
            technologies used.
          </p>
        </div>
        <div className="project">
          <h3>Project 2</h3>
          <p>
            Description of your project goes here. Highlight key features and
            technologies used.
          </p>
        </div>
        {/* Add more project sections as needed */}
      </section>
      <section className="contact">
        <h2>Contact Me</h2>
        <p>
          Feel free to get in touch with me. You can reach me at
          [your_email@example.com].
        </p>
      </section>
    </div>
  );
}

export default Home;
