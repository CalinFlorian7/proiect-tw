const documentController = require('../controllers/documentController.js')
const protectedRouter = require('express').Router()
protectedRouter.post('/insertDocument', documentController.insertDocument)
module.exports = protectedRouter
