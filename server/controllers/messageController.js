const db = require('../models/index.js')
const Message = db.messages
const Membership = db.memberships
const Note = db.notes
const insertMessage = async (req, res) => {
    const membership_id = req.body.membership_id
    const note_id = req.body.note_id
    const message_date = Date(Date.now())

    try {
        const newMessage = await Message.create(
            {
                membership_id: membership_id,
                note_id: note_id,
                message_date: message_date,
            },
            {
                fields: ['membership_id', 'note_id', 'message_date'],
            }
        )

        res.status(201).json({
            message: 'Message created',
            newMessage,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
}

const getMessagesForGroup = async (req, res) => {
    const group_id = req.body.group_id

    try {
        const messages = await Message.findAll({
            include: [
                {
                    model: Membership,
                    as: 'Membership',
                    where: {
                        group_id: group_id,
                    },
                },
                {
                    model: Note,
                    as: 'Note',
                    attributes: ['note_id'], // Selecting the note_id
                },
            ],
        })

        const noteIds = messages.map((message) => message.Note.note_id) // Extracting the note_ids

        const notes = await Note.findAll({
            where: {
                note_id: noteIds, // Filtering by note_ids
            },
        })

        res.status(200).json({
            notes,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
}

module.exports = { insertMessage, getMessagesForGroup }
