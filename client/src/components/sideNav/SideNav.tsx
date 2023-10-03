import { SideNavData } from "./SideNavData";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./SideNavStyle.css";

interface SideNavProps {
  isOpen: boolean;
  toggleSideNav: () => void;
}

function SideNav(props: SideNavProps) {
  const { isOpen, toggleSideNav } = props;

  return (
    <div className={`sideNav ${isOpen ? "open" : "close"}`}>
      <button className="backToggleButton" onClick={toggleSideNav}>
        <ArrowBackIcon className="backButton" />
      </button>
      <ul className="sideNavList">
        {SideNavData.map((val, key) => {
          return (
            <li key={key}>
              <NavLink to={val.link} className="row">
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideNav;
