import SideNav from "./components/sideNav/SideNav";
import PageRoutes from "./routes/PageRoutes";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="container">
        <SideNav toggleSideNav={toggleSideNav} isOpen={isOpen} />
        <div className={`mainContent ${isOpen ? "openMain" : "closeMain"}`}>
          {!isOpen ? (
            <button className="menuToggleButton" onClick={toggleSideNav}>
              <MenuIcon className="menuButton" />
            </button>
          ) : (
            <div className="menuTogglePlaceholder"></div>
          )}
          <PageRoutes />
        </div>
      </div>
    </>
  );
}

export default App;
