const express = require('express')
const cors = require('cors')
const app = express()
// const appfront = express()
const FacultyRouter = require('./routes/facultyRoute.js')
const UserRouter = require('./routes/userRoute.js')
// var corOptions = {
//     origin: 'http://localhost:8080',
// }
// // var corOptionsFront = { origin: 'http://localhost:5000' }
// appfront.use(express.json())
// appfront.use(cors())
// // appfront.use(cors(corOptionsFront))
// app.use(cors(corOptions))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/faculties', FacultyRouter)

app.use('/api/users', UserRouter)

// appfront.get('/api', (req, res) => {
//     res.json({ success: 1, message: 'This is REST API' })
// })

// // app.get('/', (req, res) => {
// //     res.json({ message: 'hellow world API' })
// // })
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})
// s
