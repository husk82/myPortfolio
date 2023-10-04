import "./Projects.css";

const Project1 = () => {
  return (
    <section className="projects">
      <h2>Project 1</h2>
      <div className="project">
        <h3>
          Senior System Development Project | University of Winnipeg: Sep 2022 -
          Apr 2023
        </h3>
        <ul>
          <li>
            Architected and implemented a comprehensive inventory management
            system tailored to streamline resource tracking within the Computer
            Science department.
          </li>
          <li>
            Leveraged Node.js for the backend, coupled with elegantly crafted
            vanilla HTML and CSS, powered by Handlebars template engine, for an
            efficient and user-friendly frontend.
          </li>
          <li>
            Built automation to report the status of products and devices.
          </li>
          <li>
            Collaborated with stakeholders to define and clarify user
            requirements.
          </li>
          <li>
            Documented software development methodologies in technical manuals
            to be used by IT personnel in future projects.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Project1;
