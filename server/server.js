const express = require('express')
const app = express()
app.get('/api', (req, res) => {
    res.json({ success: 1, message: 'This is REST API' })
})
app.listen(5000, () => {
    console.log('Server is running at port 5000')
})
