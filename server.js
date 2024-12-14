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

const { SensorLogs, Sensor, Admin } = require("./app/models");
const mailer = require("./app/email/email")
const redis = require("./app/redis/redis")
client.on("message", async (topic, msg) => { 
    msgObj = JSON.parse(msg)

    const connectionId = await redis.getConnection(msgObj.admin_id.toString());

    for (let i = 0; i < websockets.wsConn.length; i++) { 
        if (websockets.wsConn[i].connectionId == connectionId) { 
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

    try{ 
        const sensor = await Sensor.findByPk(msgObj.sensor_id, {
            include: {
                model: Admin,
                attributes: ['email', 'name'], 
            },
        });

        const adminEmail = sensor.Admin.email;
        const subject = "Critical Alert: Human Detected";
        const htmlContent = `
            <h1>Critical Alert</h1>
            <p>The sensor with ID <strong>${msgObj.sensor_id}</strong> has detected human activity.</p>
            <p>Location: ${sensor.location.coordinates.join(", ")}</p>
            <p>Please investigate immediately.</p>
        `;

        console.log("sending emails...")
        await mailer.sendEmail(adminEmail, subject, htmlContent);
        console.log(`Email notification sent to admin: ${adminEmail}`);
    } catch (err) { 
        console.log("error could not fetch sensor data or send email: ", err)
    }
})

server.listen("8080", () => { console.log("server listening on port 8080..." )})
