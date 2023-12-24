// const e = require('express')
const dbConfig = require('../config/dbconfig.js')

const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        // operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
    }
)
sequelize
    .authenticate()
    .then(() => {
        console.log('Authentication successful with database')
    })
    .catch((err) => {
        console.log('Authentication failed with database', err)
    })
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.users = require('../models/user.js')(sequelize, DataTypes)
db.subjects = require('../models/subject.js')(sequelize, DataTypes) // Fix the casing of the file name
db.faculties = require('../models/faculty.js')(sequelize, DataTypes)
db.teachers = require('../models/teacher.js')(sequelize, DataTypes)
// db.sequelize.sync({ force: false }).then(() => {
//     console.log('Drop and re-sync db.')
// })

module.exports = db
