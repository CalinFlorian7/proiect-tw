const teacherController = require('../controllers/teacherController.js')
const protectedRouter = require('express').Router()
protectedRouter.post(
    '/selectTeacherNameImage',
    teacherController.selectTeacherNameImage
)
protectedRouter.post(
    '/selectTeacherFaculty',
    teacherController.selectTeacherFaculty
)
protectedRouter.post(
    '/insertTeacherImage',
    teacherController.insertTeacherImage
)
module.exports = protectedRouter
