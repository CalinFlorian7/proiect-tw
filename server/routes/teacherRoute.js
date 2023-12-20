const teacherController = require('../controllers/teacherController.js')
const router = require('express').Router()
router.post('/insertTeacher', teacherController.insertTeacher)
module.exports = router
