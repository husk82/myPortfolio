import Snake from "../../components/snakeApp/Snake";
import { Route, Routes } from "react-router-dom";
import "./Apps.css";

function Apps() {
  return (
    <Routes>
      <Route path="/snake" element={<Snake/>} />
    </Routes>
  );
}

export default Apps;
