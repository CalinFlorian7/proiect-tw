const noteController = require('../controllers/noteController')
const protectedRouter = require('express').Router()
protectedRouter.post('/insertNote', noteController.insertNote)
protectedRouter.post('/update', noteController.updateNoteTitleText)
protectedRouter.post(
    '/getNotesBySubjectAndUser',
    noteController.getNotesBySubjectAndUser
)
protectedRouter.post('/selectCountNotes', noteController.selectCountNotes)
module.exports = protectedRouter
