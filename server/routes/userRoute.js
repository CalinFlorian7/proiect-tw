const userController = require('../controllers/userController.js')
const router = require('express').Router()
router.post('/insertUser', userController.insertUser)
module.exports = router
