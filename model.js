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
        unique: true
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
            model: Food,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.FLOAT
    }
})

/*
------- ORDER ITEM --------
id      date            menu1  menu2
INT     DATE            INT     INT
2       2020-04-25      4       23
*/

const DayMenu = db.define('dayMenu', {
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



//TodaysMenu.belongsTo(Food, {foreignKey: 'menu1'})
//TodaysMenu.belongsTo(Food, {foreignKey: 'menu2'})


//Food.hasMany(DayMenu)
//DayMenu.belongsTo(Food, {foreignKey: 'comida1', as: 'alias1'})
//DayMenu.belongsTo(Food, {foreignKey: 'comida2',    as: 'alias2'})

///////////////////////////////

Food.hasOne(DayMenu, {foreignKey: 'comida1', as: 'Comida1'})
Food.hasOne(DayMenu, {foreignKey: 'comida2', as: 'Comida2'});

DayMenu.belongsTo(Food, {foreignKey: 'comida1', as:  'Comida1'});
DayMenu.belongsTo(Food, {foreignKey: 'comida2', as: 'Comida2'});







//-----MANY TO MANY 
Pedido.belongsToMany(Food, {through: PedidoItems})
Food.belongsToMany(Pedido, {through: PedidoItems})

Food.sync().then(() => console.log('Food created')).catch((e) => console.log(e))
Pedido.sync().then(() => console.log('Pedido created')).catch((e) => console.log(e))
PedidoItems.sync().then(() => console.log('PedidoItems created')).catch((e) => console.log(e))
DayMenu.sync().then(() => console.log('DayMenu created')).catch((e) => console.log(e))




module.exports = {
    Food,
    Pedido,
    PedidoItems,
    DayMenu
};