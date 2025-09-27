const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoute')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' })
})

module.exports = app