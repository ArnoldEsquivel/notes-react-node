import { useState, useEffect } from 'react'
import './Notes.scss'
import AddNote from '../components/AddNote'
import EditNote from '../components/EditNote'
import DeleteNote from '../components/DeleteNote'
import axios from 'axios'
import { Button, Alert, CircularProgress } from '@mui/material'

const Notes = () => {
    const [loading, setLoading] = useState(false)
    const [notes, setNotes] = useState([])
    const [alert, setAlert] = useState({
        message: '',
        success: false
    })
    const session = JSON.parse(localStorage.getItem('session'))

    useEffect(() => {
        getNotes()
    }, [])

    useEffect(() => {
        resetAlert()
    }, [alert])

    const getNotes = async () => {
        setLoading(true)
        await axios.get('/notes/' + session.user.id)
            .then(res => {
                setNotes(res.data.notes)
                setLoading(false)
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
        }, 5000)
    }

    return (
        <div>
            <Alert
                severity={alert.success ? 'success' : 'error'}
                sx={{ display: alert.message ? 'flex' : 'none' }}
                className='modalAlertAddNote'
            >
                {alert.message}
            </Alert>
            <h1>Notes Page</h1>
            <div className='addNotesSpanButCont'>
                <span>Here you can add your notes</span>
                <AddNote getNotes={getNotes}/>
            </div>
            <div className='noteCardsMainContainer'>
                <h2>My Notes</h2>
                <div className='noteCardsContainer'>
                    {
                        loading
                            ? <div className='loadingContainer'>
                                <CircularProgress />
                            </div>
                            : notes.length === 0
                                ? <div className='noNotesContainer'>
                                    <p>You don't have any notes yet</p>
                                    <AddNote getNotes={getNotes} />
                                </div>
                                : notes.map((note, index) => (
                                    <div className='noteCard' key={index}>
                                        <h3>{note.title}</h3>
                                        <span>{note.description}</span>
                                        <div className='noteCardButtons'>
                                            <EditNote note={note} getNotes={getNotes} setAlert={setAlert} />
                                            <DeleteNote note={note} getNotes={getNotes} setAlert={setAlert} />
                                        </div>
                                    </div>
                                ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Notes