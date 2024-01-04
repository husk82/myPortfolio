import Snake from "../../components/snakeApp/Snake";
import YoutubeDownloader from "../../components/youtubeDownloader/youtubeDownloader";
import { Route, Routes } from "react-router-dom";
import "./Apps.css";

function Apps() {
  return (
    <Routes>
      <Route path="/snake" element={<Snake/>} />
      <Route path="/youtubeDownloader" element={<YoutubeDownloader/>} />
    </Routes>
  );
}

export default Apps;
