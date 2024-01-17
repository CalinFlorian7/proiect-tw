const db = require('../models/index.js')
const Enrollment = db.enrollments
const Subject = db.subjects
const Teacher = db.teachers
const User = db.users
const Document = db.documents
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
    let user_id = null

    try {
        const user = await User.findOne({ where: { user_email } })
        const note = await Note.findOne({ where: { note_id } })
        if (user) {
            user_id = user.user_id
            console.log('student found', user_id)
            // res.status(200).json({ message: 'student found' })
            console.log('student found', user)
            if (user_id) {
                const count = await Enrollment.count({
                    where: { user_id, subject_id },
                })
                if (count > 0) {
                    // res.status(200).json({ message: 'he is enrolled' })
                    if (note) {
                        // const newNote = await Note.create({})

                        const newNote = await Note.create({
                            user_id: user_id,
                            subject_id: subject_id,
                            note_title: note.note_title,
                            note_text: note.note_text,
                            note_date: Date(Date.now()),
                        })
                        if (newNote) {
                            if (newNote.note_id && note.note_id) {
                                const documents = await Document.findAll({
                                    where: { note_id: note.note_id },
                                })

                                if (documents.length > 0) {
                                    documents.forEach(async (document) => {
                                        await Document.create({
                                            note_id: newNote.note_id,
                                            document_name:
                                                document.document_name,
                                            document_path:
                                                document.document_path,
                                        })
                                    })
                                }
                            }

                            res.status(200).json({ message: 'note created' })
                        } else {
                            res.status(500).json({
                                message: 'note not created',
                            })
                        }
                    } else res.status(404).json({ message: 'note not found' })
                } else {
                    res.status(201).json({ message: 'he is not enrolled' })
                }
            }
        } else {
            res.status(404).json({ message: 'student not found' })
            console.log('student not found')
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error retrieving enrollments' })
    }

    // console.log(user_email, note_id, subject_id)
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
