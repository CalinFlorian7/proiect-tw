const userController = require('../controllers/userController.js')
const protectedRouter = require('express').Router()
protectedRouter.post('/updateUserImage', userController.updateUserImage)

module.exports = protectedRouter
