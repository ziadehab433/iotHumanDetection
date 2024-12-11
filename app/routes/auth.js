const express = require('express');
const router = express.Router();
const { Admin } = require("../models")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config({ path: "../../.env" })

router.post('/', async (req, res) => { 
    const { email, password } = req.body;
    try { 
        const admin = await Admin.findOne({ where: { email, password }})
        if (!admin) { 
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign({ user_id: admin.id }, "bruh", { expiresIn: '72h' })
        res.json({ token })
    } catch (error) { 
        res.status(500).json({ message: 'Internal server error ', error })
    }
})

module.exports = router
