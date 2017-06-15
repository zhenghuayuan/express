const pool = require("../db/index");
module.exports = function(req, res, next) {
	let userid = req.userid;
	pool('SELECT * FROM userinfo WHERE userid = ?', [userid])
	.then(data=>{
		res.json({
			code: 0,
			body: data[0],
			msg: "",
		})
	})
	.catch(e=>{
		console.log(e)
	})
};
