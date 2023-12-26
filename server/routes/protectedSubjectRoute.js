const subjectController = require('../controllers/subjectController.js')
const protectedRouter = require('express').Router()
protectedRouter.post('/insertSubject', subjectController.insertSubject)
protectedRouter.post(
    '/selectSubjectIdName',
    subjectController.selectSubjectIdName
)
protectedRouter.post(
    '/selectCountSubjects',
    subjectController.selectCountSubjects
)
protectedRouter.get('/selectAllSubjects', subjectController.selectAllSubjects)
module.exports = protectedRouter
