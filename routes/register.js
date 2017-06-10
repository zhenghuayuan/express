var pool = require("../db/index");
module.exports = function(res, req, next){
	var username = res.body.username;
	var password = res.body.password;
	var email = res.body.email;
	console.log(1)
	req.json({
		code: 0
	})
	return;
	pool("select * from userInfo where username=?", [username])
	.then(function(data){
		if (data.length>0) {
			req.json({
				code: 100,
				body: "",
				msg: "注册失败，用户名冲突",
			});
			throw new Error("注册失败，用户名冲突");
		}else{
			return data;
		}
	})
	// .then(function(data){
	// 	return pool("select * from userInfo order by userid DESC limit 1")
	// })
	.then(function(data){
		// var userid = data[0].userid+1;
		return pool("insert into userInfo(userid,username,password) values(?,?,?)", [userid, username, password])
	})
	.then(function(){
		req.json({
			code: 0,
			body: "",
			msg: "注册成功",
		})
	})
	.catch(function(e){
		console.log(e);
	})
}

