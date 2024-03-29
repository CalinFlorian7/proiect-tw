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
db.documents = require('../models/document.js')(sequelize, DataTypes)
db.memberships = require('../models/membership.js')(sequelize, DataTypes)
db.messages = require('../models/message.js')(sequelize, DataTypes)
db.enrollments = require('../models/enrollment.js')(sequelize, DataTypes)
db.notes = require('../models/note.js')(sequelize, DataTypes)
db.groups = require('../models/group.js')(sequelize, DataTypes)
db.faculties.hasMany(db.teachers, { foreignKey: 'faculty_id', as: 'Teacher' }) //
db.teachers.belongsTo(db.faculties, { foreignKey: 'faculty_id', as: 'Faculty' })
db.teachers.hasMany(db.subjects, { foreignKey: 'teacher_id', as: 'Subject' }) //
db.subjects.belongsTo(db.teachers, { foreignKey: 'teacher_id', as: 'Teacher' })
db.users.hasMany(db.enrollments, { foreignKey: 'user_id', as: 'Enrollment' }) //
db.enrollments.belongsTo(db.users, { foreignKey: 'user_id', as: 'User' })
db.subjects.hasMany(db.enrollments, {
    foreignKey: 'subject_id',
    as: 'Enrollment',
}) //
db.enrollments.belongsTo(db.subjects, {
    foreignKey: 'subject_id',
    as: 'Subject',
})
db.users.hasMany(db.memberships, { foreignKey: 'user_id', as: 'Membership' }) //
db.memberships.belongsTo(db.users, { foreignKey: 'user_id', as: 'User' })
db.groups.hasMany(db.memberships, { foreignKey: 'group_id', as: 'Membership' }) //
db.memberships.belongsTo(db.groups, { foreignKey: 'group_id', as: 'Group' })
db.users.hasMany(db.groups, { foreignKey: 'user_id', as: 'User' }) //
db.groups.belongsTo(db.users, { foreignKey: 'user_id', as: 'User' })
db.notes.hasMany(db.documents, { foreignKey: 'note_id', as: 'Document' }) //
db.documents.belongsTo(db.notes, { foreignKey: 'note_id', as: 'Note' })
db.memberships.hasMany(db.messages, {
    foreignKey: 'membership_id',
    as: 'Message',
}) //
db.messages.belongsTo(db.memberships, {
    foreignKey: 'membership_id',
    as: 'Membership',
})
db.notes.hasMany(db.messages, { foreignKey: 'note_id', as: 'Message' }) //
db.messages.belongsTo(db.notes, { foreignKey: 'note_id', as: 'Note' })

// db.sequelize.sync({ force: false }).then(() => {
//     console.log('Drop and re-sync db.')
// })

module.exports = db
