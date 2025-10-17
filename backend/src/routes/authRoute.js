const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/authMiddleware')
const { requestOtp, verifyOtp, logout } = require('../controllers/authController')

router.post('/request-otp', requestOtp)
router.post('/verify-otp', verifyOtp)
router.post('/logout', verifyToken, logout)

module.exports = router