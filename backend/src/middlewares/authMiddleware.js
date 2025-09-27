const jwt = require('jsonwebtoken')

exports.verifyToken = async (req, res, next) => {
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]

    if(!token) return res.status(401).json({ success: false, message: 'Tidak ada token / Token expired' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ success: false, message: 'Token tidak valid' })
    }
}