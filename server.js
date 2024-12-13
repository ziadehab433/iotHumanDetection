const http = require("http")
const ws = require("ws")

const authenticateJWT = require("./app/middleware/authenticateJWT")
const websockets = require("./app/websockets/ws")

const server = http.createServer();
const app = require("./app")

const wss = new ws.Server({ server })

server.on("request", app)

wss.on('connection', websockets.OnConnection)

const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://localhost:1882")

client.on("connect", () => { 
    console.log("connected to the mosquitto broker")

    client.subscribe("sensor", (error) => {
        if (error) { 
            console.log("error subscribing to topic 'sensor': ", error)
            return;
        }
    })
})

const { SensorLogs } = require("./app/models");
client.on("message", async (topic, msg) => { 
    msgObj = JSON.parse(msg)

    for (let i = 0; i < websockets.wsConn.length; i++) { 
        if (websockets.wsConn[i].user_id == msgObj.user_id) { 
            websockets.wsConn[i].ws.send(msg)
        }
    }

    try { 
        await SensorLogs.create({ 
            sensor_id: msgObj.sensor_id,
            detected: msgObj.detected,
        });
    } catch (err) { 
        console.log("error could not update sensor logs: ", err)
    }
})

server.listen("8080", () => { console.log("server listening on port 8080..." )})
