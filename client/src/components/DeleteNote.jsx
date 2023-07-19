import { useState } from 'react'
import axios from "axios";
import { Button, Modal } from "@mui/material";

const DeleteNote = ({ note, getNotes, setAlert }) => {
    const [open, setOpen] = useState(false)
    
    const handleDelete = async () => {
        await axios.delete('/note/' + note.id)
            .then(res => {
                setAlert({
                    message: `Note ${note.title} deleted successfully`,
                    success: res.data.success
                })
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
                color='error'
                onClick={() => { setOpen(true) }}
                variant='contained'
            >
                Delete
            </Button>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                className='modalEditNoteContainer'
            >
                <div className='editNoteMainContainer'>
                    <form className='editNoteForm' onSubmit={handleDelete}>
                        <p>Are you sure you want to delete this note?</p>
                        <p>{note.title}</p>
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
                                Delete
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default DeleteNote