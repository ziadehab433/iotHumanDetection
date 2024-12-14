const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://localhost:1882")

const URL = "http://localhost:8080/api/sensor";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3MzQxMTEzNzUsImV4cCI6MTczNDM3MDU3NX0.RMjmM2t345bv8uNWwqsRXJbjppSqyGuuqUIGyIxIn48"

client.on("connect", async () => { 
    console.log("connected to the mosquitto broker")

    try { 
        const sensors = await getSensors();

        sensors.forEach((sensor) => { 
            setInterval(() => sendMessage(client, sensor), 3000)
        })

    } catch (err) { 
        console.log("error fetching sensors from db: ", err);
    }

})

async function getSensors() { 
    const res = await fetch(URL, { 
        headers: { 
            Authorization: `Bearer ${TOKEN}`
        }
    })

    const data = await res.json()
    return data.payload
}

function sendMessage(client, sensor) { 
    const detect = Math.floor(Math.random() * 2) == 1 ? true : false

    client.publish('sensor', JSON.stringify({ 
        sensor_id: sensor.id,
        admin_id: sensor.admin_id,
        detected: detect
    }))
}
