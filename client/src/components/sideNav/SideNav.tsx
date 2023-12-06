import { useState } from "react";
import { SideNavData } from "./SideNavData";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./SideNavStyle.css";

interface SubMenuItem {
  title: string;
  link: string;
}

interface MenuItem {
  tilte: string;
  icon: React.ReactNode;
  link?: string;
  subMenu?: SubMenuItem[];
}

interface SideNavProps {
  isOpen: boolean;
  toggleSideNav: () => void;
}

function SideNav(props: SideNavProps) {
  const { isOpen, toggleSideNav } = props;
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title);
  };

  return (
    <div className={`sideNav ${isOpen ? "open" : "close"}`}>
      <button className="backToggleButton" onClick={toggleSideNav}>
        <ArrowBackIcon className="backButton" />
      </button>
      <ul className="sideNavList">
        {SideNavData.map((menuItem, key) => {
          return (
            <li key={key}>
              {menuItem.subMenu ? (
                <div
                  className="row"
                  onClick={() => toggleSubMenu(menuItem.title)}
                >
                  <div id="icon">{menuItem.icon}</div>
                  <div id="title">{menuItem.title}</div>
                  {openSubMenu === menuItem.title ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </div>
              ) : (
                <NavLink to={menuItem.link || "/"} className="row">
                  <div id="icon">{menuItem.icon}</div>
                  <div id="title">{menuItem.title}</div>
                </NavLink>
              )}
              {menuItem.subMenu && openSubMenu === menuItem.title && (
                <ul className="subMenuList">
                  {menuItem.subMenu.map((subMenuItem, subKey) => (
                    <li key={subKey}>
                      <NavLink
                        to={subMenuItem.link}
                        className="row subMenuItem"
                      >
                        <div id="icon">#</div>
                        <div id="title">{subMenuItem.title}</div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideNav;
