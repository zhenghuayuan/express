let jwt = require('jsonwebtoken');
let pool = require("../db/index");
module.exports = function(res, req, next){
	let token = res.cookies['token']
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
			pool("select token from userInfo where userid=?", [userid]) //[username, password]
			.then(function(data){
				if (data[0]['token'] == token) {
					console.log(`通过:${JSON.stringify(decoded)}`)
					next();
				}else{
					throw new Error('token比对失败');
				}
			})
		})
		.catch(function(e){
			req.json({
				code: 102,
				msg: "token已过期",
			})
		})
		return;
	};
	req.json({
		code: 101,
		msg: "未登录",
	})
}