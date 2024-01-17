const db = require('../models/index.js')
const Enrollment = db.enrollments
const Subject = db.subjects
const Teacher = db.teachers
const User = db.users
const Note = db.notes
const getAllEnrollments = async (req, res) => {
    const user_id = req.body.user_id
    try {
        const enrollments = await Enrollment.findAll({ where: { user_id } })
        res.status(200).json(enrollments)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving enrollments', error })
    }
}
const insertNoteToStudentEmail = async (req, res) => {
    const user_email = req.body.user_email
    const note_id = req.body.note_id
    const subject_id = req.body.subject_id

    try {
        const note = await Enrollment.findOne({ where: { note_id } })
        const user = await User.findOne({ where: { user_email } })
        if (user.user_id === undefined) {
            res.status(500).json({ message: 'Error retrieving user' })
        } else if (user.user_id === null) {
            res.status(500).json({ message: 'Error retrieving user' })
        } else {
            const count = await Enrollment.count({
                where: {
                    user_id: user.user_id,
                    subject_id: subject_id,
                },
            })
            if (count > 0) {
                const newNote = await Note.create({
                    user_id: user.user_id,
                    subject_id: subject_id,
                    note_text: note.text,
                    note_date: new Date(Date.now()),
                    note_title: note.title,
                })
                if (newNote) {
                    res.status(200).json(newNote)
                } else {
                    res.status(500).json({ message: 'Error inserting note' })
                }
            } else {
                const enrollment = await Enrollment.create({
                    user_id: user.user_id,
                    subject_id: subject_id,
                    enrollment_date: new Date(Date.now()),
                })
                if (enrollment && note) {
                    const newNote = await Note.create({
                        user_id: user.user_id,
                        subject_id: subject_id,
                        note_text: note.text,
                        note_date: new Date(Date.now()),
                        note_title: note.title,
                    })
                    if (newNote) {
                        res.status(200).json(newNote)
                    } else {
                        res.status(500).json({
                            message: 'Error inserting note',
                        })
                    }
                }
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error })
    }
}
const getStudentEnrollments = async (req, res) => {
    const user_id = req.body.user_id
    try {
        const enrollments = await Enrollment.findAll({
            where: { user_id },
            include: [
                {
                    model: Subject,
                    as: 'Subject',
                    include: [
                        {
                            model: Teacher,
                            as: 'Teacher',
                        },
                    ],
                },
            ],
        })
        res.status(200).json(enrollments)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving enrollments', error })
    }
}
const enrollStudent = async (req, res) => {
    const subject_id = req.body.subject_id
    const user_id = req.body.user_id
    const enrollment_date = new Date(Date.now())

    try {
        // Insert the enrollment into the database
        const enrollment = await Enrollment.create({
            subject_id,
            user_id,
            enrollment_date,
        })
        res.status(200).json(enrollment)
    } catch (error) {
        res.status(500).json({ message: 'Error enrolling student', error })
    }
}
module.exports = {
    getAllEnrollments,
    enrollStudent,
    getStudentEnrollments,
    insertNoteToStudentEmail,
}
