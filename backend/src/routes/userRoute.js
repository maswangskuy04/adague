const expres = require('express')
const router = expres.Router()
const { verifyToken } = require('../middlewares/authMiddleware')
const { getUser, getInterest, updateUser, uploadAvatar, deleteAvatar, updateAnonim, getAnonim, getLoginHistory } = require('../controllers/userController')
const upload = require('../middlewares/uploadMiddleware')

router.get('/me', verifyToken, getUser)
router.put('/me', verifyToken, updateUser)
router.get('/interests', getInterest)
router.post('/avatar', verifyToken, upload.single('avatar'), uploadAvatar)
router.delete('/avatar', verifyToken, deleteAvatar)
router.patch('/anonim', verifyToken, updateAnonim)
router.get('/anonim', verifyToken, getAnonim)
router.get('/login-history', verifyToken, getLoginHistory)

module.exports = router