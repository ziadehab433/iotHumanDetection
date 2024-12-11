const http = require("http")
const ws = require("ws")

const authenticateJWT = require("./app/middleware/authenticateJWT")
const websockets = require("./app/websockets/ws")

const server = http.createServer();
const app = require("./app")

const wss = new ws.Server({ server })

server.on("request", app)

wss.on('connection', websockets.OnConnection)

server.listen("8080", () => { console.log("server listening on port 8080..." )})
