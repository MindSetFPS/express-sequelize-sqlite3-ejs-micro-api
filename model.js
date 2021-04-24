const { DataTypes, Sequelize, ForeignKeyConstraintError } = require('sequelize')
const db = require('./db')

/*
------- COMIDA -------
id      Name        description     link
INT     STRING      STRING          STRING
1       awa         joder q sed     awa.com
*/

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

/*
------  Pedido -------
idPedido!       comprador!      entregado!      total!      pagado!     fecha!      ubicacion?    
INT             STRING          BOOLEAN         FLOAT       BOOLEAN     DATE        STRING
3123123                         
*/

const Pedido = db.define('pedido',{
    id: {
      type: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4

    },
    customer: {
        type: DataTypes.STRING,
        allowNull: false
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
    location: {
        type: DataTypes.STRING
    }
})

/*
------- ORDER ITEM --------
idPedidoFK  idComidaFK      cantidad
INT         INT             INT
5           12-takitos-     3
*/

const PedidoItem = db.define('pedidoItem', {
    pedidoId: {
        type: DataTypes.UUIDV4,
        references: {
            model: Pedido,
            key: 'id'
        },
    FoodId: {
        type: DataTypes.INTEGER,
        references: {
            model: Food,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.FLOAT
    }
    }
})

/*
------- ORDER ITEM --------
id      date            menu1  menu2
INT     DATE            INT     INT
2       2020-04-25      4       23
*/

const TodaysMenu = db.define('todaysMenu', {
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
    menu1: {
        type: DataTypes.INTEGER,
        references: {
            model: Food,
            key: 'id'
        }, 
    },
    menu2: {
        type: DataTypes.INTEGER,
        references: {
            model: Food,
            key: 'id'
        }
    }
})


/*

------- MENU DEL DIA --------

*/

Food.sync().then(() => console.log('Food created'))
Pedido.sync().then(() => console.log('Pedido created'))
PedidoItem.sync().then(() => console.log('PedidoItem created'))
TodaysMenu.sync().then(() => console.log('TodaysMenu created'))




module.exports = {
    Food,
    Pedido,
    PedidoItem,
    TodaysMenu
};