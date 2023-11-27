const db = require('../models/index.js')
const Faculty = db.faculties

const getAllFaculties = async (req, res) => {
    let faculties = await Faculty.findAll({
        attributes: ['faculty_id', 'faculty_name', 'university_id'],
    })
    res.status(200).send(faculties)
    // console.log('this are the faculties------------------: ', faculties)
}
module.exports = { getAllFaculties }
