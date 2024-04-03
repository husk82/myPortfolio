import SideNav from "./components/sideNav/SideNav";
import PageRoutes from "./routes/PageRoutes";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";

function App() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="container">
      {location.pathname !== "/3dspace" && <SideNav toggleSideNav={toggleSideNav} isOpen={isOpen} />}
      <div className={`mainContent ${isOpen ? "openMain" : "closeMain"}`}>
        {!isOpen && location.pathname !== "/3dspace" ? (
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
