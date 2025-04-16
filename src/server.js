import express from "express";

import cors from "cors";

import routers from "./routes/index.routes.js";

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
    this.app.get("/", (_, res) => {
      res.send("Visit /api-docs for Swagger documentation.");
    });

    this.app.use("/api/v1", routers);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
    });
  }
}

export default Server;
