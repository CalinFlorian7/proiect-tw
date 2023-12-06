const db = require('../models/index.js')
const User = db.users

const insertUser = async (req, res) => {
    const { name, email, password } = req.body
    console.log(req.body)
    const currentDate = new Date()

    try {
        const newUser = await User.create(
            {
                user_name: name,
                user_email: email,
                user_password: password,
                user_date: currentDate,
            },
            {
                fields: [
                    'user_name',
                    'user_email',
                    'user_password',
                    'user_date',
                ],
            }
        )

        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)

        res.status(500).json({ error: 'Failed to insert user' })
    }
}
module.exports = { insertUser }
