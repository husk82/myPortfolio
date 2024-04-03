import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Apps from "../pages/apps/Apps";
import Setting from "../pages/setting/Setting";
import ThreeDspace from "../pages/3dspace/3dspace";

function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apps/*" element={<Apps />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/3dspace" element={<ThreeDspace />} />
    </Routes>
  );
}

export default PageRoutes;
