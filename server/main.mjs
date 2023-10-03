import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Define your API routes and logic here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});