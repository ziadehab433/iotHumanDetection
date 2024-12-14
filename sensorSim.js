const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://localhost:1882")

client.on("connect", () => { 
    console.log("connected to the mosquitto broker")

    for (let i = 0; i < 3; i++) { 
        client.publish('sensor', JSON.stringify({ sensor_id: 2, user_id: 1, detected: true }))
    }
})
