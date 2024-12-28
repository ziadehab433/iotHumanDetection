const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://localhost:1882")

const URL = "http://localhost:8080/api/sensor";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwic3VwZXIiOnRydWUsImlhdCI6MTczNDI2MDIxMCwiZXhwIjoxNzM0NTE5NDEwfQ.2-6d3hnDUuHTyRbDJ3KHoIwG5UrVWP0bZal-zCPVwHM"

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
    if (data.success == true) { 
        return data.payload
    } else { 
        console.log("eror: ", data)
    }
}

function sendMessage(client, sensor) { 
    const detect = Math.floor(Math.random() * 2) == 1 ? true : false
    const needMaintenance = Math.floor(Math.random() * 10) == 6 ? true : false

    console.log(sensor)

    client.publish('sensor', JSON.stringify({ 
        sensor_id: sensor.id,
        admin_id: sensor.admin_id,
        detected: detect,
        needMaintenance: needMaintenance
    }))
}
