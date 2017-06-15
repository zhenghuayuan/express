let pool = require("../db/index");
let querystring = require("querystring");
let util = require("../common/util");
let jwt = require('jsonwebtoken');
module.exports = function(req, res, next){
	let username = req.body.username;
	let password = req.body.password;
	pool("select * from userInfo where username=? and password=?", [username, password]) //[username, password]
	.then(function(data){
		if (data.length>0) {
			userInfo = data[0];
			userInfo.token = util.createToken(userInfo["userid"]);
			return pool("update userInfo set token=? where username=?", [userInfo.token, username])
		}else{
			res.json({
				code: 103,
				body: "",
				msg: "密码错误",
			})
			return Promise.reject('密码错误')
		}
	})
	.then(function(data){
		res.cookie("token", userInfo.token, {maxAge: 1000*60*60*24*7, httpOnly: true}) //, 
		res.json({
			code: 0,
			body: userInfo,
			msg: "登录成功",
		})
	})
	.catch(function(e){
		console.log(e);
	})
}


