import { useState } from 'react'
import './EditNote.scss'
import { Button, Modal, TextField } from '@mui/material'
import axios from 'axios'

const EditNote = ({ note, getNotes, setAlert }) => {
    const [open, setOpen] = useState(false)
    const [newNote, setNewNote] = useState({})

    const handleChange = (e) => {
        setNewNote({
            ...newNote,
            [e.target.name]: e.target.value
        })
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
