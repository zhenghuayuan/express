const pool = require("../db/index");
module.exports = (res, req, next)=>{
	let userid = res.userid;
	let preiods = res.body.preiods;
	let options = res.body.options;
	let values = [userid, 1, preiods, options, 1,200,1,+new Date()]
	pool('insert into lotteryOrder(userid,orderId,preiods,betOptions,betGrounp,betMizu,status,createTime) values(?,?,?,?,?,?,?,?)', values)
	.then((data)=>{
		req.json({
			code: 0,
			body: "",
			msg: "下单成功",
		})
	})
	.catch((e)=>{
		console.log(e)
	})
	
}


