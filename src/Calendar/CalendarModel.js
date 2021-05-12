const { DataTypes, Sequelize, ForeignKeyConstraintError } = require('sequelize')
const db = require('../../db')

const Calendar = db.define('calendar', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,

    },

})


module.exports = Calendar 