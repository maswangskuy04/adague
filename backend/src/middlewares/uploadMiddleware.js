const multer = require('multer')
const path = require('path')
const fs = require('fs')

// buat folder untuk simpan foto
const uploadDir = path.join(__dirname, '..', 'uploads', 'avatar')

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

// setup penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
})

// validasi hanya file gambar yang bisa di upload
const fileFilter = (req, file, cb) => {
    const allowedType = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml']

    if (allowedType.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Hanya file gambar yang diperbolehkan'))
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter
})

module.exports = upload