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

const selectUserId = async (req, res) => {
    const email = req.body.user_email
    const password = req.body.user_password

    try {
        const user = await User.findOne({
            where: {
                user_email: email,
                user_password: password,
            },
            attributes: ['user_id'],
        })

        if (user) {
            res.status(200).json({ id: user.user_id })
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error selecting user ID' })
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
const updateUserImage = async (req, res) => {
    const sir =
        'dadmasnhyrgyuwinbvnz,lsdjsagd  as436748328r93r2ujdh27dy2njsdnsajndka'
    const bufferSir = Buffer.from(sir, 'base64')
    const sirFromBuffer = Buffer.from(bufferSir, 'base64').toString('base64')
    console.log('sir size:', Buffer.byteLength(sir, 'utf8'))
    console.log('buffer size:', Buffer.byteLength(bufferSir, 'utf8'))

    console.log('sir: ', sir)
    console.log('buffer sir: ', bufferSir)
    console.log('sir from buffer: ', sirFromBuffer)
    const id = req.body.id
    const image = req.body.image
    console.log('image: ', image)
    console.log('dimensiune imagine: ', Buffer.byteLength(image, 'utf8'))
    console.log(
        'dimensiune buffer imagine: ',
        Buffer.byteLength(Buffer.from(image, 'base64'), 'base64')
    )
    const isBase64 = (str) => {
        if (typeof str !== 'string') {
            return false
        }
        const regex = /^(data:image\/[a-z]+;base64,)/
        return regex.test(str)
    }
    console.log('is base 64?: ', isBase64(image))

    const imageBuffer = Buffer.from(req.body.image, 'base64')
    console.log('image', image)
    console.log('image buffer', imageBuffer)

    const string = Buffer.from(imageBuffer).toString('base64')
    console.log('image string--------:', string)

    try {
        const user = await User.update(
            {
                user_image: image,
            },
            {
                where: {
                    user_id: id,
                },
            }
        )

        if (user > 0) {
            console.log('succes updating image:', user)
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error updating user image' })
    }
}
const selectUserNameImage = async (req, res) => {
    const id = req.body.id

    try {
        const users = await User.findAll({
            where: {
                user_id: id,
            },
            attributes: ['user_name', 'user_image', 'user_email'],
        })

        if (users[0].user_image) console.log('user image is not null')
        else console.log('user image is null')
        res.status(200).json({
            user_name: users[0].user_name,
            user_image: users[0].user_image.toString(),
            email: users[0].user_email,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error selecting user name and image' })
    }
}

module.exports = {
    insertUser,
    selectAllUsers,
    selectUserId,
    selectUserNameImage,
    updateUserImage,
}
