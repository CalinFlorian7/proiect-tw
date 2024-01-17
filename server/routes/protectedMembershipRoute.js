const MembershipController = require('../controllers/membershipController')
const protectedRouter = require('express').Router()
protectedRouter.post('/insertMember', MembershipController.insertMember)
protectedRouter.post('/getMemberships', MembershipController.getMemberships)
protectedRouter.post(
    '/insertMemberByEmail',
    MembershipController.insertMemberByEmail
)
protectedRouter.post(
    '/getGroupsByMemberships',
    MembershipController.getGroupsByMemberships
)
module.exports = protectedRouter
