// import User from './User.js'
var User = require('./User.js')
const user = new User('John', '@212', 'parola')
user.email = 'john@212'
user.id = '123'
console.log(user.toString())
console.log(user.id)
