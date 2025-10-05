require('dotenv').config()
const app = require('./src/app')
const sequelize = require('./src/config/database')

async function StartServer() {
    try {
        await sequelize.authenticate()
        console.log('Koneksi ke database berhasil')

        if(process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: true })
            console.log('Model telah disinkron')
        } else {
            console.log('Melanjutkan sinkron di production')
        }

        const httpServer = app

        httpServer.listen(process.env.PORT, () => {
            console.log(`Server berjalan di http://localhost:${process.env.PORT}`)
        })
    } catch (err) {
        console.log('Koneksi ke database gagal', err)
        process.exit(1)
    }
}

StartServer()