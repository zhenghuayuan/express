let pool = require("../db/index");
let util = require("../common/util");
module.exports = function(req, res, next){
	let userid = req.userid
	pool("update userinfo set token = ? where userid = ?", ['', userid]) //[username, password]
	.then(function(data){
		res.cookie("token", '', {maxAge: 0, httpOnly: true})
		res.json({
			code: 0,
			body: '',
			msg: "退出完成",
		})
	})
	.catch(function(e){
		console.log(e);
	})
}


