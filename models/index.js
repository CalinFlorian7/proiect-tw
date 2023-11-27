const dbConfig = require('../config/db.config.js')
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
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
