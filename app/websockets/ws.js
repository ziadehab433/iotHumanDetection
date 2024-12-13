const jwt = require("jsonwebtoken")

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
            socket.write("invalid token")
            socket.destroy();
            return
        }   
        wsConn.push({ user_id: decoded.user_id, ws });
    })
}
