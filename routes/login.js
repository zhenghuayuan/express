let pool = require("../db/index");
let querystring = require("querystring");
let createToken = require("../common/createToken");
let jwt = require('jsonwebtoken');
module.exports = function(res, req, next){
	let username = res.body.username;
	let password = res.body.password;
	pool("select * from userInfo where username=? and password=?", [username, password]) //[username, password]
	.then(function(data){
		if (data.length>0) {
			userInfo = data[0];
			userInfo.token = createToken(userInfo["userid"]);
			return pool("update userInfo set token=? where username=?", [userInfo.token, username])
		}else{
			req.json({
				code: 103,
				body: "",
				msg: "密码错误",
			})
		}
	})
	.then(function(data){
		req.cookie("token", userInfo.token, {maxAge: 1000*60*60*24*7, httpOnly: true}) //, 
		req.json({
			code: 0,
			body: userInfo,
			msg: "登录成功",
		})
	})
	.catch(function(e){
		console.log(e);
	})
}


