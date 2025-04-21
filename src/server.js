import cors from "cors";
import http from "http";
import express from "express";
import { Server as SocketIOServer } from "socket.io";

import { setSocketServerInstance } from "./socket/design-patterns/socketInstance.js";
import { registerSocketEvents } from "./socket/index.js";

import routers from "./routes/index.routes.js";

class Server {
  constructor(port) {
    this.app = express();
    this.port = port;

    this.server = http.createServer(this.app);

    this.setupSocket();

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

  setupSocket() {
    this.io = new SocketIOServer(this.server, {
      cors: { origin: "*" },
    });

    setSocketServerInstance(this.io);
    registerSocketEvents(this.io);
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`🚀 Server with WebSocket on port ${this.port}`);
    });
  }
}

export default Server;
