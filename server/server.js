require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
// const appfront = express()
const FacultyRouter = require('./routes/facultyRoute.js')
const UserRouter = require('./routes/userRoute.js')
const TeacherRouter = require('./routes/teacherRoute.js')
const bodyParser = require('body-parser')
const ProtectedUserRouter = require('./routes/protectedUserRoute.js')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/faculties', FacultyRouter)
app.use(bodyParser.json())
app.use('/api/teachers', TeacherRouter)
app.use('/api/users', UserRouter)

app.use('/api/users', authenticateToken, ProtectedUserRouter)

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
