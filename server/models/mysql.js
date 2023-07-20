const Sequelize = require('sequelize');

let sequelize = new Sequelize(
    "notes_app",
    "root",
    "HERE GOES YOUR PASSWORD",
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
    }
)
console.log("Conectado a la base de datos");

module.exports = sequelize;