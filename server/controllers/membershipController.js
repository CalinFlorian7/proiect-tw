const db = require('../models/index.js')
const Membership = db.memberships

const insertMember = async (req, res) => {
    try {
        const user_id = req.body.user_id
        const group_id = req.body.group_id
        const membership_date = new Date()

        // Insert the variables into the membership table
        const membership = await Membership.create({
            user_id: user_id,
            group_id: group_id,
            membership_date: membership_date,
        })

        res.status(200).send({
            message: 'Membership created successfully',
            membership: membership,
        })
    } catch (err) {
        res.status(500).send({
            message:
                err.message ||
                'Some error occurred while creating the membership',
        })
    }
}
module.exports = { insertMember }
