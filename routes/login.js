var pool = require("../db/index");
var querystring = require("querystring");
var createToken = require("../common/createToken");

var jwt = require('jsonwebtoken');
module.exports = function(res, req, next){
	var username = res.body.username;
	var password = res.body.password;
	pool("select * from userInfo where username=? and password=?", [username, password])
	.then(function(data){
		if (data.length>0) {
			var userInfo = data[0];
			userInfo.token = createToken(userInfo["userid"]);
			return pool("update userInfo set token=? where username=?", [userInfo.token, username])
		}else{
			req.json({
				code: 1,
				body: "",
				msg: "密码错误",
			})
		}
	})
	.then(function(data){
		req.json({
			code: 0,
			body: data,
			msg: "登录成功",
		})
	})
	.catch(function(e){
		console.log(e);
	})
}
