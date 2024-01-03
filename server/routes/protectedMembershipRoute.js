const MembershipController = require('../controllers/membershipController')
const protectedRouter = require('express').Router()
protectedRouter.post('/insertMember', MembershipController.insertMember)
module.exports = protectedRouter
