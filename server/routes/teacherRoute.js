const teacherController = require('../controllers/teacherController.js')
const router = require('express').Router()
router.post('/insertTeacher', teacherController.insertTeacher)
router.post('/selectTeacherId', teacherController.selectTeacherId)

module.exports = router
