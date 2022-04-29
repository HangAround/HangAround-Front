import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"

const app = express()
const server = createServer(app)
const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
		origin: '*'
	}
})

server.listen(5000, () => console.log("server is running on port 5000"))