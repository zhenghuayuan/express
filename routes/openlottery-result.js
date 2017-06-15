const pool = require('../db/index')
module.exports = function(req, res, next){
	let preiods = req.query.preiods
	pool('select * from historylottery where preiods = ?', [preiods])
	.then(data=>{
		res.json({
			code: 0,
			body: data[0] || [],
			msg: "",
		}) 
	})
	.catch(e=>{
		console.log(e)
	})

}
