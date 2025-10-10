const expres = require('express')
const router = expres.Router()
const { verifyToken } = require('../middlewares/authMiddleware')
const { getUser, getInterest } = require('../controllers/userController')

router.get('/me', verifyToken, getUser)
router.get('/interests', getInterest)

module.exports = router