let jwt = require('jsonwebtoken');
let pool = require("../db/index");
module.exports = function(req, res, next){
	let token = req.cookies['token']
	if (token) {
		new Promise(function(resolve, reject){
			return jwt.verify(token, "zheng", function(err, decoded){
				if (err) {
					reject(err);
				}else{
					resolve(decoded);
				}
			})
		})
		.then(function(decoded){
			let userid = decoded.userid;
			console.log('userid:'+userid)
			pool("select token from userInfo where userid=?", [userid]) //[username, password]
			.then(function(data){
				if (data[0]['token'] == token) {
					console.log(`通过:${JSON.stringify(decoded)}`)
					req.userid = decoded.userid; 
					next();
				}else{
					res.json({
						code: 102,
						msg: 'token已过期',
					})
				}
			})
		})
		.catch(function(e){
			console.log(e)
		})
		return;
	};
	console.log('未登录');
	res.json({
		code: 101,
		msg: "未登录",
	})
}