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

router.get('/notes/:id', async (req, res) => {
    const { id } = req.params

    await Note.findAll({
        where: {
            user_id: id
        }
    }).then((notes) => {
        return res.status(200).json({
            success: true,
            message: "Notes found",
            notes: notes
        })
    }).catch((err) => {
        console.log('err', err)
        return res.status(500).json({
            success: false,
            message: "Server error ocurred"
        })
    })
})

router.put('/note/:id', async (req, res) => {
    const { id } = req.params
    const { newNote } = req.body

    await Note.update(newNote, {
        where: { id: id }
    }).then((note) => {
        return res.status(200).json({
            success: true,
            message: "Note updated"
        })
    }).catch((err) => {
        console.log('err', err)
        return res.status(500).json({
            success: false,
            message: "Server error ocurred"
        })
    })
})

router.delete('/note/:id', async (req, res) => {
    const { id } = req.params

    await Note.destroy({
        where: { id: id }
    }).then((note) => {
        return res.status(200).json({
            success: true,
            message: "Note deleted"
        })
    }).catch((err) => {
        console.log('err', err)
        return res.status(500).json({
            success: false,
            message: "Server error ocurred"
        })
    })
})

module.exports = router