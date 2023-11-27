const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./routes/facultyRoute.js')
var corOptions = {
    origin: 'http://localhost:8081',
}
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/faculties', router)

// app.get('/api', (req, res) => {
//     res.json({ success: 1, message: 'This is REST API' })
// })
// app.get('/', (req, res) => {
//     res.json({ message: 'hellow world API' })
// })
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})
