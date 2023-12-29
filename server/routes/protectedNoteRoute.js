const noteController = require('../controllers/noteController')
const protectedRouter = require('express').Router()
protectedRouter.post('/insertNote', noteController.insertNote)
module.exports = protectedRouter
