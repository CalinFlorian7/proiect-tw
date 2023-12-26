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
module.exports = { getAllEnrollments }
