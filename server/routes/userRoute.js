const userController = require('../controllers/userController.js')
const router = require('express').Router()
router.post('/insertUser', userController.insertUser)
router.get('/selectAllUsers', userController.selectAllUsers)
module.exports = router
