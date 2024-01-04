const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Server is running!!');
});

app.post('/api/download', async (req, res) => {
  try {
    const { youtubeUrl } = req.body;
    console.log("Executed");
    console.log(youtubeUrl);

    if (!ytdl.validateURL(youtubeUrl)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const info = await ytdl.getInfo(youtubeUrl);
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highest' });

    res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);
    ytdl(youtubeUrl, { format: videoFormat }).pipe(res);
  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});