import { useState, ChangeEvent } from 'react';
import "./youtubeDownloader.css";

function YoutubeDownloader() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('');

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const handleDownloadClick = async () => {
    try {
      // Make an API call to the backend with the YouTube URL
      const response = await fetch('http://localhost:3000/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtubeUrl }),
      });

      // Check if the API call was successful
      if (response.ok) {
        setDownloadStatus('Download initiated successfully.');
      } else {
        setDownloadStatus('Failed to initiate download.');
      }
    } catch (error) {
      console.error('Error making API call:', error);
      setDownloadStatus('An error occurred while making the API call.');
    }
  };

  return (
    <div className='youtube-downloader-container '>
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
      {downloadStatus && <p>{downloadStatus}</p>}
    </div>
  );
}

export default YoutubeDownloader;