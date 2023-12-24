const subjectController = require('../controllers/subjectController.js')
const protectedRouter = require('express').Router()
protectedRouter.post('/insertSubject', subjectController.insertSubject)
module.exports = protectedRouter
