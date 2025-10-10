const sequelize = require('../config/database')
const Interest = require('../models/Interest')

async function seedInterests() {
    try {
        await sequelize.sync()

        const interests = [
            'Music',
            'Sports',
            'Movies',
            'Technology',
            'Travelling',
            'Food',
            'Books',
            'Games',
            'Photography',
            'Health',
            'Art & Design',
            'Business',
            'Education',
            'Environment'
        ]

        for (const name of interests) {
            await Interest.findOrCreate({ where: { name } })
        }

        process.exit()
    } catch (err) {
        console.error('Error seed Interests: ', err)
        process.exit(1)
    }
}

seedInterests()