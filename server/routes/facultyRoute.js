const facultyController = require('../controllers/facultyController.js')
const router = require('express').Router()
// console.log('faculties:------', facultyController.getAllFaculties)
// const rez = facultyController.getAllFaculties
// console.log('rez:------', rez, typeof rez)
router.get('/getAllFaculties', facultyController.getAllFaculties)
module.exports = router
