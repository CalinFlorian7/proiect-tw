const documentController = require('../controllers/documentController.js')
const protectedRouter = require('express').Router()
protectedRouter.post('/insertDocument', documentController.insertDocument)
protectedRouter.post(
    '/getDocumentNameAndId',
    documentController.getDocumentNameAndId
)
protectedRouter.post('/deleteDocument', documentController.deleteDocument)
module.exports = protectedRouter
