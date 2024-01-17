const messageController = require('../controllers/messageController.js')
const protectedRouter = require('express').Router()
protectedRouter.post('/insertMessage', messageController.insertMessage)

module.exports = protectedRouter
