const db = require('../models/index.js')
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
module.exports = { insertTeacher, selectTeacherId, selectAllTeachers }
