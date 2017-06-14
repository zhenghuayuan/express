let Sequelize = require('sequelize')
let seque = new Sequelize('lottery', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
})

module.exports = seque
