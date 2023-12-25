const db = require('../models/index.js')
const Subject = db.subjects
const insertSubject = async (req, res) => {
    const subject_name = req.body.subject_name
    console.log('Subject to be inserted: ' + subject_name)
    const teacher_id = req.body.teacher_id

    try {
        const newSubject = await Subject.create(
            {
                subject_name: subject_name,

                teacher_id: teacher_id,
            },
            {
                fields: ['subject_name', 'teacher_id'],
            }
        )
        res.status(201).json({
            message: 'Subject created',
            subject: newSubject,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
}
const selectSubjectIdName = async (req, res) => {
    const teacher_id = req.body.teacher_id

    try {
        const subject = await Subject.findAll({
            where: {
                teacher_id: teacher_id,
            },
            attributes: ['subject_id', 'subject_name'],
        })
        res.status(200).json(subject)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
}
const selectCountSubjects = async (req, res) => {
    const teacher_id = req.body.teacher_id

    try {
        const subject = await Subject.count({
            where: {
                teacher_id: teacher_id,
            },
        })
        res.status(200).json(subject)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
}
module.exports = { insertSubject, selectSubjectIdName, selectCountSubjects }
