const express = require('express')
const router = express.Router()
const Note = require('../models/note')
const { Op } = require('sequelize')

router.post('/note', async (req, res) => {
    const { note } = req.body
    console.log('note', note)

    const noteExists = await Note.findOne({
        where: {
            [Op.and]: [{ title: note.title }, { description: note.description }]
        }
    })

    if (noteExists) {
        return res.status(200).json({
            success: false,
            message: "Note already exists"
        })
    } else {
        Note.create({
            title: note.title,
            description: note.description,
            user_id: note.user_id
        }).then((note) => {
            return res.status(200).json({
                success: true,
                message: "Note created",
                note: note
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

module.exports = router