const express = require('express')
const cors = require('cors')
const app = express()
// const appfront = express()
const FacultyRouter = require('./routes/facultyRoute.js')
const UserRouter = require('./routes/userRoute.js')
const TeacherRouter = require('./routes/teacherRoute.js')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/faculties', FacultyRouter)
app.use(bodyParser.json())
app.use('/api/teachers', TeacherRouter)
app.use('/api/users', UserRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})
// s
