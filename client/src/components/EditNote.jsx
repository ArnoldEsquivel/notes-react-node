import { useState } from 'react'
import './EditNote.scss'
import { Button, Modal, TextField } from '@mui/material'
import axios from 'axios'

const EditNote = ({ note, getNotes, setAlert }) => {
    const [open, setOpen] = useState(false)
    const [newNote, setNewNote] = useState({})
    const [confirmLenght, setConfirmLenght] = useState(true)

    const handleChange = (e) => {
        setNewNote({
            ...newNote,
            [e.target.name]: e.target.value
        })
        countLenght(e)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.put('/note/' + note.id, { newNote })
            .then(res => {
                setAlert({
                    message: `Note ${newNote.title} updated successfully`,
                    success: res.data.success
                })
                setNewNote({
                    title: '',
                    description: ''
                })
                setOpen(false)
                setTimeout(() => {
                    getNotes()
                }, 2000)
            })
            .catch(err => {
                console.log(err)
            })

    }

    const countLenght = (e) => {
        if (e.target.name == 'title' && newNote.title.length > 100) {
            setAlert({
                message: 'The title must be less than 100 characters',
                success: false
            })
            setConfirmLenght(false)
        } else if (e.target.name == 'description' && newNote.description.length > 1000) {
            setAlert({
                message: 'The description must be less than 1000 characters',
                success: false
            })
            setConfirmLenght(false)
        } else {
            setConfirmLenght(true)
        }
    }

    return (
        <>
            <Button
                color='primary'
                onClick={() => { setOpen(true) }}
                variant='contained'
            >
                Edit
            </Button>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                className='modalEditNoteContainer'
            >
                <div className='editNoteMainContainer'>
                    <form className='editNoteForm' onSubmit={handleSubmit}>
                        <p>Title</p>
                        <TextField
                            id="title"
                            name="title"
                            placeholder="A note for you"
                            type="text"
                            defaultValue={note.title}
                            onChange={handleChange}
                            fullWidth
                            error={!confirmLenght}
                        />
                        <p>Content</p>
                        <TextField
                            id="description"
                            name="description"
                            placeholder="Here you can write everything"
                            type="text"
                            defaultValue={note.description}
                            onChange={handleChange}
                            fullWidth
                            error={!confirmLenght}
                        />
                        <div className='editNoteButtonsContainer'>
                            <Button
                                color='error'
                                className='addNoteButton'
                                variant='contained'
                                onClick={() => { setOpen(false) }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant='contained'
                                color='success'
                                type="submit"
                                disabled={!confirmLenght}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default EditNote
