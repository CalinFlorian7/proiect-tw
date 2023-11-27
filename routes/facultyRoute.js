const facultyController = require('../controllers/facultyController.js')
const router = require('express').Router()
router.get('/allFaculties', facultyController.getAllFaculies)
module.exports = router
