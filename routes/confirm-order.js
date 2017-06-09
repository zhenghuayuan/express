const pool = require("../db/index")
const util = require("../common/util")
module.exports = (res, req, next)=>{
	let options = JSON.parse(res.body.options) // 订单列表
	options.forEach(item=>{
		let betMizu = util.calcuZu(item.length)*util.config.PRICE // 投入觅钻
		createOrder(res, req, next, JSON.stringify(item), betMizu)
	})
}
// 添加订单到数据库
function createOrder(res, req, next, options, betMizu){
	let userid = res.userid // 用户ID
	let preiods = res.body.preiods // 期号
	let createTime = +new Date() // 创建时间
	let orderId = util.createMd5({ // 生成订单号
		preiods,
		options,
		createTime
	})
	let values = [userid, orderId, preiods, options, 1, betMizu, 1, createTime]
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


