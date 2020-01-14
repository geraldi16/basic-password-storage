import Sequelize from 'sequelize'
import fs from 'fs'
import path from 'path'

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require('../database')[env]
const db = {}

const sequelize = new Sequelize(
    config.url,
    {
        logging: false,
        dialect: 'postgres',
        benchmark: true
    }
)

fs.readdirSync(__dirname)
    .filter(
        file =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            !file.includes('.fsm')
    )
    .forEach(file => {
        var model = sequelize.import(file, require(`./${file}`))
        db[model.name] = model
    })

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
