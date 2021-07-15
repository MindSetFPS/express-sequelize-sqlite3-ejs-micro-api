const { DataTypes } = require('sequelize')
const { Pedido } = require('../Pedido/PedidoModel.js')

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

Customer.hasMany(Pedido)
Pedido.belongsTo(Customer)

Customer.sync().then(()=> console.log('Customer created')).catch( (e) => console.error(e) )

module.exports = Customer