// const { DATE } = require('sequelize')
const db = require('../models/index.js')
const Note = db.notes

const selectCountNotes = async (req, res) => {
    const user_id = req.body.user_id
    try {
        const count = await Note.count({
            where: {
                user_id: user_id,
            },
        })
        res.status(200).json(count)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
}
const insertNote = async (req, res) => {
    // BEGIN: be15d9bcejpp
    const note_title = req.body.note_title

    const note_date = new Date()
    const user_id = req.body.user_id
    const subject_id = req.body.subject_id
    const note_text = req.body.note_text

    try {
        const newNote = await Note.create(
            {
                note_title: note_title,
                note_date: note_date,
                user_id: user_id,
                subject_id: subject_id,
                note_text: note_text,
            },
            {
                fields: [
                    'note_title',
                    'note_date',
                    'user_id',
                    'subject_id',
                    'note_text',
                ],
            }
        )

        const note_id = newNote.note_id // Get the note_id from the newly created note

        res.status(201).json({
            message: 'Note created',
            note: newNote,
            note_id: note_id, // Include the note_id in the response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
    // END: ed8c6549bwf9
}

const updateNoteTitleText = async (req, res) => {
    const note_id = req.body.note_id
    const note_title = req.body.note_title
    const note_text = req.body.note_text

    try {
        const updatedNote = await Note.update(
            {
                note_title: note_title,
                note_text: note_text,
            },
            {
                where: {
                    note_id: note_id,
                },
            }
        )

        if (updatedNote[0] === 1) {
            res.status(200).json({ message: 'Note updated' })
        } else {
            res.status(404).json({ message: 'Note not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
}
const getNotesBySubjectAndUser = async (req, res) => {
    const subject_id = req.body.subject_id
    const user_id = req.body.user_id

    try {
        const notes = await Note.findAll({
            where: {
                subject_id: subject_id,
                user_id: user_id,
            },
        })

        res.status(200).json({ notes: notes })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
}
module.exports = {
    insertNote,
    updateNoteTitleText,
    getNotesBySubjectAndUser,
    selectCountNotes,
}
