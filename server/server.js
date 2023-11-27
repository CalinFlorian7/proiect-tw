const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/api', (req, res) => {
    res.json({ success: 1, message: 'This is REST API' })
})
app.listen(5000, () => {
    console.log('Server is running at port 5000')
})
