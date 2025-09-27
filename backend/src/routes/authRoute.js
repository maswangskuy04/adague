const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/authMiddleware')
const { login, register } = require('../controllers/authController')

router.post('/login', login)
router.post('/register', register)

module.exports = router