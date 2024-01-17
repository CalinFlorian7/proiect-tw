require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const bodyParser = require('body-parser')

// Use the json() method instead of raw()

app.use(bodyParser.json({ limit: '50mb' }))
const FacultyRouter = require('./routes/facultyRoute.js')
const UserRouter = require('./routes/userRoute.js')
const TeacherRouter = require('./routes/teacherRoute.js')
const ProtectedSubjectRouter = require('./routes/protectedSubjectRoute.js')
const ProtectedUserRouter = require('./routes/protectedUserRoute.js')
const ProtectedTeacherRouter = require('./routes/protectedTeacherRoute.js')
const ProtectedGroupRouter = require('./routes/protectedGroupRoute.js')
const ProtectedEnrollmentRouter = require('./routes/protectedEnrollmentRoute.js')
const ProtectedMembershipRouter = require('./routes/protectedMembershipRoute.js')
const ProtectedNoteRouter = require('./routes/protectedNoteRoute.js')
const ProtectedDocumentRouter = require('./routes/protectedDocumentRoute.js')
const ProtectedMessageRouter = require('./routes/protectedMessageRoute.js')
const jwt = require('jsonwebtoken')

app.use(cors())

app.use(express.json({ limit: '50mb' }))
// app.use(express.json({ limit: '10mb' }))
// app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use('/api/faculties', FacultyRouter)
app.use(bodyParser.json())
app.use('/api/teachers', TeacherRouter)
app.use('/api/users', UserRouter)
app.use('/api/subjects', authenticateToken, ProtectedSubjectRouter)
app.use('/api/enrollments', authenticateToken, ProtectedEnrollmentRouter)
app.use('/api/users', authenticateToken, ProtectedUserRouter)
app.use('/api/teachers', authenticateToken, ProtectedTeacherRouter)
app.use('/api/notes', authenticateToken, ProtectedNoteRouter)
app.use('/api/groups', authenticateToken, ProtectedGroupRouter)
app.use('/api/memberships', authenticateToken, ProtectedMembershipRouter)
app.use('/api/documents', authenticateToken, ProtectedDocumentRouter)
app.use('/api/messages', authenticateToken, ProtectedMessageRouter)
app.post('/api/login', (req, res) => {
    const username = req.params.username
    const id = req.params.id
    const user_type = req.params.user_type
    const user = { username: username, id: id, user_type: user_type }
    const access_token = jwt.sign(user, process.env.ACCESS_TOKEN)
    res.json({ access_token: access_token })
})

console.log('token server: ', process.env.ACCESS_TOKEN)
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        console.log('verify token: ', token)
        if (err) return res.sendStatus(403)
        req.user = user

        next()
    })
}
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})
// s
