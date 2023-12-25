const subjectController = require('../controllers/subjectController.js')
const protectedRouter = require('express').Router()
protectedRouter.post('/insertSubject', subjectController.insertSubject)
protectedRouter.post(
    '/selectSubjectIdName',
    subjectController.selectSubjectIdName
)
module.exports = protectedRouter
