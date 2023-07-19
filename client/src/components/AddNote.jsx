import { useState } from 'react'
import './AddNote.scss'
import { Button, Modal, TextField, Alert } from '@mui/material'
import axios from 'axios'

const AddNote = () => {
    const session = JSON.parse(localStorage.getItem('session'))
    const [open, setOpen] = useState(false)
    const [alert, setAlert] = useState({
        message: '',
        success: false
    })
    const [note, setNote] = useState({
        title: '',
        description: '',
        user_id: session.user.id
    })

    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post('/note', { note })
            .then(res => {
                setAlert({
                    message: res.data.message,
                    success: res.data.success
                })
                resetAlert()
                setNote({
                    title: '',
                    description: '',
                    user_id: session.user.id
                })
                setOpen(false)
            })
            .catch(err => {
                console.log(err)
            })

    }

    const resetAlert = () => {
        setTimeout(() => {
            setAlert({
                message: '',
                success: false
            })
        }, 3000)
    }

    return (
        <>
            <Button
                color={'success'}
                onClick={() => { setOpen(true) }}
                variant='contained'
            >
                Add Note
            </Button>
            <Alert
                severity={alert.success ? 'success' : 'error'}
                sx={{ display: alert.message ? 'flex' : 'none' }}
                className='modalAlertAddNote'
            >
                {alert.message}
            </Alert>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                className='modalAddNoteContainer'
            >
                <div className='addNoteMainContainer'>
                    <form className='addNoteForm' onSubmit={handleSubmit}>
                        <p>Title</p>
                        <TextField
                            id="title"
                            name="title"
                            placeholder="A note for you"
                            type="text"
                            value={note.title}
                            onChange={handleChange}
                            fullWidth
                        />
                        <p>Content</p>
                        <TextField
                            id="description"
                            name="description"
                            placeholder="Here you can write everything"
                            type="text"
                            value={note.description}
                            onChange={handleChange}
                            fullWidth
                        />
                        <div className='addNoteButtonsContainer'>
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

export default AddNote