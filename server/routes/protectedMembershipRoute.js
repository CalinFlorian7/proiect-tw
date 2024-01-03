const MembershipController = require('../controllers/membershipController')
const protectedRouter = require('express').Router()
protectedRouter.post('/insertMember', MembershipController.insertMember)
protectedRouter.post('/getMemberships', MembershipController.getMEmberships)
module.exports = protectedRouter
