const db = require('../models/index.js')
const Message = db.messages
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
module.exports = { insertMessage }
