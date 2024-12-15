const jwt = require("jsonwebtoken")
const redis = require("../redis/redis")
const { v4: uuid } = require("uuid")
const dotenv = require("dotenv")
dotenv.config()

let wsConn = [];

exports.wsConn = wsConn

exports.OnConnection = (ws, req) => { 
    if (req.url.split("?").length == 1) { 
        ws.send("unauthorized access: JWT not found")
        ws.close();
        return
    }

    const token = req.url.split("?")[1].split("=")[1]
    jwt.verify(token, "bruh", (err, decoded) => { 
        if (err) { 
            ws.send("{ message: 'invalid token' }")
            ws.close();
            return
        }   

        const connectionId = uuid()
        redis.setConnection(decoded.admin_id.toString(), connectionId)
        wsConn.push({ connectionId, ws });
    })
}
