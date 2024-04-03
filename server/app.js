import express from "express";
import ytdl from "ytdl-core";
import cors from "cors";
import fs from "fs";
import { spawn } from "child_process";
import ffmpegPath from "@ffmpeg-installer/ffmpeg"; // Ensure you've installed @ffmpeg-installer/ffmpeg
import path from "path";
import { fileURLToPath } from 'url';
import os from 'os';

const app = express();
const port = 3000;

// Setup to handle paths correctly in ES module format
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

// Temporary directory for storing processed videos
const tempDir = path.join(os.tmpdir(), 'youtube-downloads');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

app.post("/api/download", async (req, res) => {
  const { youtubeUrl } = req.body;

  if (!youtubeUrl || !ytdl.validateURL(youtubeUrl)) {
    return res.status(400).json({ error: "Invalid or missing URL" });
  }

  try {
    const info = await ytdl.getInfo(youtubeUrl);
    const safeTitle = info.videoDetails.title.replace(/[\/\\?%*:|"<>]/g, "-");
    const tempFilePath = path.join(tempDir, `${safeTitle}.mp4`);

    const video = ytdl(youtubeUrl, {
      quality: "highestvideo",
      filter: "videoonly",
    });
    const audio = ytdl(youtubeUrl, {
      quality: "highestaudio",
      filter: "audioonly",
    });

    const ffmpegProcess = spawn(
      ffmpegPath.path,
      [
        "-i", "pipe:3",
        "-i", "pipe:4",
        "-map", "0:v",
        "-map", "1:a",
        "-c:v", "copy",
        "-c:a", "aac",
        "-strict", "experimental",
        "-f", "mp4",
        tempFilePath,
      ],
      { stdio: ["ignore", "pipe", "pipe", "pipe", "pipe"] }
    );

    video.pipe(ffmpegProcess.stdio[3]);
    audio.pipe(ffmpegProcess.stdio[4]);

    ffmpegProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(`FFmpeg error with exit code ${code}`);
        res.status(500).send("Error processing video");
        return;
      }

      res.download(tempFilePath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
        }
        // Clean up: Delete the temporary file after sending
        fs.unlink(tempFilePath, (err) => {
          if (err) console.error('Error deleting temporary file:', err);
        });
      });
    });
  } catch (error) {
    console.error(`Failed to process video: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});