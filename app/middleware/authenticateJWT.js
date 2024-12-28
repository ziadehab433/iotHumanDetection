const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

module.exports = (req, res, next) => { 
    if (req.path === '/api/login') { 
        return next();
    }

    if (req.header('Authorization') == undefined) { 
        return res.status(401).json({ message: "unauthorized access: no token provided"})
    }

    const token = req.header('Authorization').split(" ")[1]
    jwt.verify(token, "bruh", (err, decoded) => { 
        if (err) { 
            return res.status(401).json( { message: "invalid token" })
        }   
        return next();
    })
}
