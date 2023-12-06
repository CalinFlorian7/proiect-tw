const db = require('../models/index.js')
const User = db.users

const insertUser = async (req, res) => {
    const name = req.body.user_name
    const email = req.body.user_email
    const password = req.body.user_password
    console.log(req.body)
    const currentDate = new Date()

    console.log('name: ', name)

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

        res.status(500).json({ error: error.name })
    }
}
const selectAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'eroare selectare all users' })
    }
}
module.exports = { insertUser, selectAllUsers }
