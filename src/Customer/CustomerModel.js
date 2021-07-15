const { DataTypes } = require('sequelize')

const db = require('../../db')

const Customer = db.define('customer', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,

    }
})




module.exports = Customer