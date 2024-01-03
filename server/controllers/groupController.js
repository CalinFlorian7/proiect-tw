const db = require('../models/index.js')
const Group = db.groups
const insertGroup = async (req, res) => {
    const group_name = req.body.group_name
    const user_id = req.body.user_id
    const group_date = new Date()
    try {
        const newGroup = await Group.create(
            {
                group_name: group_name,
                user_id: user_id,
                group_date: group_date,
            },
            {
                fields: ['group_name', 'user_id', 'group_date'],
            }
        )
        res.status(201).json({
            message: 'Group created',
            group: newGroup,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
}
module.exports = { insertGroup }
