const enrollmentController = require('../controllers/enrollmentController')
const protectedRouter = require('express').Router()
protectedRouter.post(
    '/getAllEnrollments',
    enrollmentController.getAllEnrollments
)
protectedRouter.post('/enrollStudent', enrollmentController.enrollStudent)
module.exports = protectedRouter
