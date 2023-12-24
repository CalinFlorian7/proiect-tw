const db = require('../models/index.js')
const Subject = db.subjects
const insertSubject = async (req, res) => {
    const subject_name = req.body.subject_name

    const teacher_id = req.body.teacher_id

    try {
        const newSubject = await Subject.create(
            {
                subject_name: subject_name,

                faculty_id: teacher_id,
            },
            {
                fields: ['subject_name', 'teacher_id'],
            }
        )
        res.status(201).json(newSubject)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
}
module.exports = { insertSubject }
