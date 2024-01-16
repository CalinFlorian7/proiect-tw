const db = require('../models/index.js')
const Membership = db.memberships
const Group = db.groups
const User = db.users
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

const insertMemberByEmail = async (req, res) => {
    const email = req.body.email
    const group_id = req.body.group_id

    try {
        const user = await User.findOne({
            where: {
                user_email: email,
            },
        })
        if (user === null) {
            res.status(404).send({
                message: 'User not found',
            })
        } else {
            const count = await Membership.count({
                where: {
                    user_id: user.user_id,
                    group_id: group_id,
                },
            })
            if (count === 0) {
                const user_id = user.user_id
                const membership_date = new Date()
                const membership = await Membership.create({
                    user_id: user_id,
                    group_id: group_id,
                    membership_date: membership_date,
                })
                res.status(200).send({
                    message: 'Membership created successfully',
                    membership: membership,
                })
            } else {
                res.status(200).send({
                    message: 'Membership already exists',
                })
            }
        }
    } catch (err) {
        res.status(500).send({
            message:
                err.message ||
                'Some error occurred while creating the membership',
        })
    }
}
const getMemberships = async (req, res) => {
    try {
        const user_id = req.body.user_id
        const memberships = await Membership.findAll({
            where: {
                user_id: user_id,
            },
            include: [
                {
                    model: Group,
                    as: 'Group',
                    attributes: ['group_name'],
                    include: [
                        {
                            model: User,
                            as: 'User',
                            attributes: ['user_image', 'user_name', 'user_id'],
                        },
                    ],
                },
            ],
        })

        // Convert user_image to string
        memberships.forEach((membership) => {
            membership.Group.User.user_image =
                membership.Group.User.user_image.toString()
        })

        res.status(200).send({
            message: 'Memberships retrieved successfully',
            memberships: memberships,
        })
    } catch (err) {
        res.status(500).send({
            message:
                err.message ||
                'Some error occurred while retrieving the memberships',
        })
    }
}

module.exports = { insertMember, getMemberships, insertMemberByEmail }
