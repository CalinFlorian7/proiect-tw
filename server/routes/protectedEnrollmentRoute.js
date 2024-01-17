const enrollmentController = require('../controllers/enrollmentController')
const protectedRouter = require('express').Router()
protectedRouter.post(
    '/getAllEnrollments',
    enrollmentController.getAllEnrollments
)
protectedRouter.post(
    '/getStudentEnrollments',
    enrollmentController.getStudentEnrollments
)
protectedRouter.post('/enrollStudent', enrollmentController.enrollStudent)
protectedRouter.post(
    '/inserNoteToStudentEmail',
    enrollmentController.insertNoteToStudentEmail
)
module.exports = protectedRouter
