const { DataTypes, Sequelize, ForeignKeyConstraintError } = require('sequelize')
const db = require('../../db')
const Calendar  = require('../Calendar/CalendarModel')

const Food = db.define('food', {
    id: {
        type: DataTypes.INTEGER,
        unique: true, 
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
    },
    link: {
        type: DataTypes.STRING
    }
})

Food.hasOne(Calendar, { as: 'Comida1'})
Food.hasOne(Calendar, { as: 'Comida2'});

Calendar.belongsTo(Food, {as:  'Comida1'});
Calendar.belongsTo(Food, {as: 'Comida2'});


Food.sync().then(() => console.log('Food created')).catch((e) => console.log(e))
Calendar.sync().then(() => console.log('Calendar created')).catch((e) => console.log(e))


module.exports  = Food 