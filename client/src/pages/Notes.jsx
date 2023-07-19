import { useState, useEffect } from 'react'
import './Notes.scss'
import AddNote from '../components/AddNote'
import axios from 'axios'
import { Button } from '@mui/material'

const Notes = () => {

    return (
        <div>
            <AddNote />

        </div>
    )
}

export default Notes