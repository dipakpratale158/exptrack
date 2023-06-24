const Sequelize = require('sequelize')
///
const sequelize = new Sequelize('expense-trackersql','root','Dipak@12345',{
    dialect: 'mysql',
    logging: true,     //to end query logging in console
    host:'localhost'
});      

module.exports = sequelize;