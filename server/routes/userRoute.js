const userController = require('../controllers/userController.js')
const router = require('express').Router()

router.post('/insertUser', userController.insertUser)
router.get('/selectAllUsers', userController.selectAllUsers)
router.post('/selectUserId', userController.selectUserId)
router.get('/selectUserNameImage', userController.selectUserNameImage)
module.exports = router
