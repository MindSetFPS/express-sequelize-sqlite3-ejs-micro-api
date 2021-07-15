const { DataTypes, Sequelize } = require('sequelize')
const db = require('../../db')

const Food = require('../Food/FoodModel')

const Pedido = db.define('pedido',{
    id: {
      type: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4

    }, 
    delivered: {
        type: DataTypes.BOOLEAN,
        allow: false
    },
    total: {
        type: DataTypes.FLOAT
    },
    paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.TEXT
    }
})

const PedidoItems = db.define('pedidoItems', {
    pedidoId: {
        type: DataTypes.UUIDV4,
        references: {
            model: Pedido,
            key: 'id'
        }
    },
    foodId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Food',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.FLOAT
    }
})

const Location = db.define('location', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})



Location.hasMany(Pedido)
Pedido.belongsTo(Location)

Pedido.belongsToMany(Food, {through: PedidoItems})
Food.belongsToMany(Pedido, {through: PedidoItems})

Pedido.sync().then(() => console.log('Pedido created')).catch((e) => console.log(e))
PedidoItems.sync().then(() => console.log('PedidoItems created')).catch((e) => console.log(e))
Location.sync().then(() => console.log('Location created')).catch((e) => console.log(e))


module.exports = { Pedido, PedidoItems, Location }
