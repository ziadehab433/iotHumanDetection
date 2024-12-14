const express = require('express');
const router = express.Router();
const { Admin } = require("../models")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

router.post('/', async (req, res) => { 
    const { email, password } = req.body;
    try { 
        const admin = await Admin.findOne({ where: { email, password }})
        if (!admin) { 
            return res.status(401).json({ success: false, message: 'Invalid credentials' })
        }
        const token = jwt.sign({ admin_id: admin.id, super: admin.super }, process.env.SECRET_KEY, { expiresIn: '72h' })
        res.json({ success: true, payload: {token} })
    } catch (error) { 
        res.status(500).json({ success: false, message: 'Internal server error ', error })
    }
})

module.exports = router
