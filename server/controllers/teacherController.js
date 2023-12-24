const db = require('../models/index.js')
// const teacher = require('../models/teacher.js')
const Teacher = db.teachers
const insertTeacher = async (req, res) => {
    const teacher_name = req.body.teacher_name
    const email = req.body.teacher_email
    const teacher_password = req.body.teacher_password
    const faculty_id = req.body.faculty_id
    console.log(req.body)

    console.log('name: ', teacher_name)

    try {
        const newTeacher = await Teacher.create(
            {
                teacher_name: teacher_name,
                email: email,
                teacher_password: teacher_password,

                faculty_id: faculty_id,
            },
            {
                fields: [
                    'teacher_name',
                    'email',
                    'teacher_password',
                    'faculty_id',
                ],
            }
        )

        res.status(201).json(newTeacher)
    } catch (error) {
        console.log(error)

        res.status(500).json({ error: error.name })
    }
}
const selectAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll()
        res.status(200).json(teachers)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error selecting all teachers' })
    }
}
const selectTeacherId = async (req, res) => {
    const email = req.body.teacher_email
    const password = req.body.teacher_password
    try {
        const teacher = await Teacher.findOne({
            where: {
                email: email,
                teacher_password: password,
            },
            attributes: ['teacher_id'],
        })
        if (teacher) {
            res.status(200).json({ id: teacher.teacher_id })
        } else {
            res.status(404).json({ error: 'Teacher not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error selecting teacher ID' })
    }
}
const selectTeacherNameImage = async (req, res) => {
    const id = req.body.id

    try {
        const users = await Teacher.findAll({
            where: {
                teacher_id: id,
            },
            attributes: ['teacher_name', 'teacher_image'],
        })

        // users.forEach((user) => {
        //     if (user.user_image) {
        //         user.user_image = user.user_image.toString()
        //     }
        // })

        // res.status(200).json(users)

        if (users[0].teacher_image) console.log('user image is not null')
        else console.log('teacher image is null')
        if (users[0].teacher_name) console.log('user name is not null')
        else console.log('teacher name is null')

        res.status(200).json({
            user_name: users[0].teacher_name,

            user_image: users[0].teacher_image
                ? users[0].teacher_image.toString('base64')
                : null,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error selecting user name and image' })
    }
}
module.exports = {
    insertTeacher,
    selectTeacherId,
    selectAllTeachers,
    selectTeacherNameImage,
}
