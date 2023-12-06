import HomeIcon from "@mui/icons-material/Home";
import AppsIcon from "@mui/icons-material/Apps";
import SettingsIcon from "@mui/icons-material/Settings";

export const SideNavData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/",
  },
  {
    title: "Apps",
    icon: <AppsIcon />,
    subMenu: [
      {
        title: "Snake",
        link: "/apps/snake",
      },
      {
        title: "Video Downloader",
        link: "/apps/videodownloader",
      },
    ],
  },
  {
    title: "Setting",
    icon: <SettingsIcon />,
    link: "/setting",
  },
];
