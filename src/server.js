import express from "express";

import cors from "cors";

class Server {
  constructor(port) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.send(
        "Welcome to the API! Visit /api-docs for Swagger documentation."
      );
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
    });
  }
}

export default Server;
