const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  bubble: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 300,
  },
  style: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://pic.qqtn.com/up/2015-9/2015091622370398072.jpg"
  }
})

module.exports = Product
