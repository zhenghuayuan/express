let pool = require("../db/index")
module.exports = function(req, res, next){
	let username = req.body.username;
	let password = req.body.password;
	let email = req.body.email
	let userpic = 'https://pub.froup.net/hoomic/publicJs/test.png'
	let mizu = 3000
	if (username == '' || 
		password == '' ||
		email == ''){
		return res.json({
			code: 105,
			body: "",
			msg: "注册失败，信息不完整",
		})
	}
	pool("select * from userinfo where username=?", [username])
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
		
		return pool("insert into userinfo(username,password,role,userpic,sex,age,city,mobile,email,mizu,token) values(?)", [[username, password,1,userpic,0,0,'',0,email,mizu,'']])
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
