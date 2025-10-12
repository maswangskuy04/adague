const fs = require('fs')
const path = require('path')

function getAvatarPath(filename) {
    return path.join(__dirname, '..', 'uploads', 'avatar', filename)
}

async function deleteAvatarFile(filePath) {
    if (!filePath) return

    const filename = path.basename(filePath)
    const fullPath = path.join(__dirname, '..', 'uploads', 'avatar', filename)

    try {
        await fs.promises.unlink(fullPath)
    } catch (err) {
        console.warn('Gagal menghapus file avatar lama: ', err.message)
    }
}

module.exports = { getAvatarPath, deleteAvatarFile }