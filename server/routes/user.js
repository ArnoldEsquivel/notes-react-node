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
                // I know this is not the best practice, but I'm doing it for the sake of simplicity
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

router.put('/verify_token', (req, res) => {
    const { token, user } = req.body
    // I know this is not the best practice, but I'm doing it for the sake of simplicity
    const secret = "SingForJWTtesting "

    try {
        const decoded = jwt.verify(token, secret)
        res.send({
            status: 200,
            message: 'Token is valid',
            user: user,
            token: token
        })
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            const newToken = jwt.sign({ email: user.email, userId: user.id }, secret, { expiresIn: '3h' });
            res.send({
                status: 200,
                message: 'Token is refreshed',
                user: user,
                token: newToken
            })
        } else {
            res.send({
                status: 400,
                message: 'Token is invalid'
            })
        }
    }
})

module.exports = router