const db = require('../models')
const Faculty = db.faculty

const getAllFaculies = async (req, res) => {
    let faculties = await Faculty.findAll({
        attributes: ['faculty_name'],
    })
    res.status(200).send(faculties)
}
module.exports = getAllFaculies
