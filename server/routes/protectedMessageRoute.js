const messageController = require('./controllers/messageController')
const protectedRouter = require('express').Router()
protectedRouter.post('/insertMessage', messageController.insertMessage)

module.exports = protectedRouter
