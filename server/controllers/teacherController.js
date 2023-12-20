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
