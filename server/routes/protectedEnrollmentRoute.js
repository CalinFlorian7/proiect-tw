const enrollmentController = require('../controllers/enrollmentController')
const protectedRouter = require('express').Router()
protectedRouter.post(
    '/getAllEnrollments',
    enrollmentController.getAllEnrollments
)
module.exports = protectedRouter
