const groupController = require('../controllers/groupController.js')
const protectedRouter = require('express').Router()
protectedRouter.post('/insertGroup', groupController.insertGroup)

module.exports = protectedRouter
