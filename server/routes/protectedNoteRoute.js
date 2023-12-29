const noteController = require('../controllers/noteController')
const protectedRouter = require('express').Router()
protectedRouter.post('/insertNote', noteController.insertNote)
protectedRouter.post('/update', noteController.updateNoteTitleText)
module.exports = protectedRouter
