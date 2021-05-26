const { DataTypes, Sequelize, ForeignKeyConstraintError } = require('sequelize')
const db = require('../../db')

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true, 
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    }
})

User.sync().then( () => console.log('User Table Created')).catch( e => console.error(e))

module.exports = User