import express from "express";

export function setupServer() {
  const app = express();
  const port = 3000;

  app.listen(port, () => {
    console.log(`Server executing on port ${port}`);
  });
}
