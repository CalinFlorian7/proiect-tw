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
        // Get memberships where group_id
        const memberships = await Membership.findAll({
            where: {
                group_id: group_id,
            },
        })

        // Get messages where membership_id
        const messages = await Message.findAll({
            where: {
                membership_id: memberships.map((membership) => membership.id),
            },
        })

        // Get notes where message_id
        const notes = await Note.findAll({
            where: {
                message_id: messages.map((message) => message.id),
            },
        })

        res.status(200).json({
            memberships,
            messages,
            notes,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
}

module.exports = { insertMessage, getMessagesForGroup }
