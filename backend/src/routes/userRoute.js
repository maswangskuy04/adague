const expres = require('express')
const router = expres.Router()
const { verifyToken } = require('../middlewares/authMiddleware')
const { getUser } = require('../controllers/userController')

router.get('/me', verifyToken, getUser)

module.exports = router