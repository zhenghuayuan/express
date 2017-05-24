var pool = require("../db/index");
var querystring = require("querystring");
module.exports = function(res, req, next){
	var username = res.body.username;
	var password = res.body.password;

	pool.getConnection(function(err, connection){
		if(err){
			console.log(`err:${err}`);
			return;
		}
		connection.query("select * from userInfo where username=? and password=?", [username, password], function(err, data, fields){
			connection.release();
			if (err){
				console.log(`error:${err}`);
				return;
			};
			
			if (data.length>0) {
				req.json({
					code: 0,
					body: data[0],
					msg: "登录成功",
				})	
			}else{
				req.json({
					code: 1,
					body: "",
					msg: "密码错误",
				})
			}
			
		});
	})
	
}