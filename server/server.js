const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./routes/facultyRoute.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/faculties', router)
app.get('/api', (req, res) => {
    res.json({ success: 1, message: 'This is REST API' })
})
app.listen(5000, () => {
    console.log('Server is running at port 5000')
})
