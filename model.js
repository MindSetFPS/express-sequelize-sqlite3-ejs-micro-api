const { DataTypes } = require('sequelize')
const db = require('./db')

const Food = db.define('food', {
    id: {
        type: DataTypes.INTEGER,
        unique: true, 
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    link: {
        type: DataTypes.STRING
    }
})

Food.sync().then(() => console.log('table created'))

module.exports = Food;