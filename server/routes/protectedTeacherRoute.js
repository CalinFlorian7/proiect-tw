const teacherController = require('../controllers/teacherController.js')
const protectedRouter = require('express').Router()
protectedRouter.post(
    '/selectTeacherNameImage',
    teacherController.selectTeacherNameImage
)

module.exports = protectedRouter
