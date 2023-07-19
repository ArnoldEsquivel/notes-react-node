const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

router.post('/register', async (req, res) => {
    const { user } = req.body

    const userExists = await User.findOne({
        where: {
            email: user.email
        }
    })

    if (userExists) {
        return res.status(200).json({
            success: false,
            message: "Email already registered"
        })
    }

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Invalid password"
            })
        } else {
            User.create({
                name: user.name,
                email: user.email,
                password: hash
            }).then((user) => {
                const secret = "SingForJWTtesting "
                const token = jwt.sign({ email: user.email, userId: user.id }, secret, { expiresIn: '3h' });
                
                return res.status(200).json({
                    success: true,
                    message: "User created and logged in",
                    token: token,
                    user: {
                        id: user.id,
                        name: user.name
                    }
                })
            }).catch((err) => {
                console.log('err', err)
                return res.status(500).json({
                    success: false,
                    message: "Server error ocurred"
                })
            })
        }
    })
})

module.exports = router