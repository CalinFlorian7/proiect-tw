const subjectController = require('../controllers/subjectController.js')
const protectedRouter = require('express').Router()
protectedRouter.post('/insertSubject', subjectController.insertSubject)
protectedRouter.post('/selectSubjectIdName', subjectController.selectSubject)
module.exports = protectedRouter
