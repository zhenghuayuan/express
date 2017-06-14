let pool = require("../db/index")
module.exports = function(req, res, next){
	let username = req.body.username;
	let password = req.body.password;
	let email = req.body.email
	if (username == '' || 
		password == '' ||
		email == ''){
		return res.json({
			code: 105,
			body: "",
			msg: "注册失败，信息不完整",
		})
	}
	pool("select * from userInfo where username=?", [username])
	.then(data=>{
		if (data.length>0) {
			res.json({
				code: 104,
				body: "",
				msg: "注册失败，用户名冲突",
			});
			return Promise.reject("注册失败，用户名冲突")
		}
		return data
	})
	.then(data=>{
		return pool("insert into userInfo(username,password) values(?,?)", [username, password])
	})
	.then(data=>{
		res.json({
			code: 0,
			body: "",
			msg: "注册成功",
		})
	})
	.catch(e=>{
		console.log(e);
	})
}

