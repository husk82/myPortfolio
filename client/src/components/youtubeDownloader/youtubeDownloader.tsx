import { useState, ChangeEvent } from "react";
import "./youtubeDownloader.css";

function YoutubeDownloader() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [downloadStatus, setDownloadStatus] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const handleDownloadClick = async () => {
    setDownloadStatus("Ma");
    try {
      setLoading(true);
      // Make an API call to the backend with the YouTube URL
      const response = await fetch("http://localhost:3000/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ youtubeUrl }),
      });

      // Check if the API call was successful
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        // Use the filename from the Content-Disposition header or a default name
        const contentDisposition = response.headers.get("Content-Disposition");
        let filename = "download.mp4";
        if (contentDisposition) {
          const matches = /filename="([^"]+)"/.exec(contentDisposition);
          if (matches && matches.length > 1) filename = matches[1];
        }
        a.download = filename;

        document.body.appendChild(a);
        a.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setDownloadStatus("Download initiated successfully.");
      } else {
        setDownloadStatus("Failed to initiate download.");
      }
    } catch (error) {
      console.error("Error making API call:", error);
      setDownloadStatus("An error occurred while making the API call.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="youtube-downloader-container ">
      <h1>Youtube Downloader</h1>
      <label htmlFor="youtubeUrl">Enter YouTube URL:</label>
      <input
        type="text"
        id="youtubeUrl"
        value={youtubeUrl}
        onChange={handleUrlChange}
        placeholder="https://www.youtube.com/watch?v=your-video-id"
      />
      <button onClick={handleDownloadClick}>Download</button>
      {isLoading && <div className="spinner"> </div>}
      {downloadStatus && <p>{downloadStatus}</p>}
    </div>
  );
}

export default YoutubeDownloader;
