const db = require('../models/index.js')
const Note = db.notes

const insertNote = async (req, res) => {
    // BEGIN: be15d9bcejpp
    const note_title = req.body.note_title
    const note_date = new Date(Date.now())
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
module.exports = { insertNote }
