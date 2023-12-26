const db = require('../models/index.js')
const Enrollment = db.enrollments
const getAllEnrollments = async (req, res) => {
    const user_id = req.body.user_id
    try {
        const enrollments = await Enrollment.findAll({ where: { user_id } })
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
module.exports = { getAllEnrollments, enrollStudent }
