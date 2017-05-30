const pool = require("../db/index");
module.exports = function(req, res, next) {
	let token = req.cookies.token;
	pool('SELECT * FROM userInfo WHERE token = ?', [token])
	.then(function(data){
		res.json({
			code: 0,
			body: data[0],
			msg: "",
		})
	})
	.catch(function(){
		console.log(e)
	})
};
