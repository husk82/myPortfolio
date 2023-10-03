import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Apps from "../pages/app/Apps";
import Setting from "../pages/setting/Setting";

function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apps" element={<Apps />} />
      <Route path="/setting" element={<Setting />} />
    </Routes>
  );
}

export default PageRoutes;
