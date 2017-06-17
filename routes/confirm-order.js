const pool = require("../db/index")
const util = require("../common/util")
module.exports = (req, res, next)=>{
	let options = JSON.parse(req.body.options) // 订单列表
	let userid = req.userid // 用户ID
	let preiods = req.body.preiods // 期号
	let createTime = +new Date() // 创建时间
	let allOrder = [] // [[userid,orderId,preiods,],[],[]]
	let allBetMizu = 0  // 所有所有订单的投注额
	options.forEach((item,index)=>{
		let betMizu = util.calcuZu(item.length)*util.config.PRICE // 投入觅钻
		let opts = JSON.stringify(item)
		let orderId = util.createMd5({ // 生成订单号
			preiods,
			opts,
			createTime
		})
		allBetMizu += betMizu
		let arr = [userid, orderId, preiods, opts, 1, betMizu, 1, createTime, '[]']
 		allOrder.push(arr)
	})
	// 查询用户觅钻
	let sql1 = 'select mizu from userinfo where userid = ?' 
	// 更新用户觅钻
	let sql2 = 'update userinfo set mizu = ? where userid = ?' 
	// 批量插入订单
	let sql3 = 'insert into lotteryOrder(userid,orderId,preiods,betOptions,betGrounp,betMizu,status,createTime,lotteryOptions) values ?'

	pool(sql1, [userid])
	.then(data=>{
		if (data.length == 0 ) {
			return Promise.reject('未找到用户')
		}
		let usermizu = data[0].mizu
		if (usermizu < allBetMizu) {
			res.json({
				code: 106,
				body: "",
				msg: "觅钻余额不足",
			})
			return Promise.reject('觅钻余额不足')
		}
		return usermizu = usermizu - allBetMizu
	})
	.then(usermizu=>{
		return Promise.all([
			pool(sql2, [usermizu, userid]),
			pool(sql3, [allOrder])
		])
	})
	.then(data=>{
		res.json({
			code: 0,
			body: "",
			msg: "下单成功",
		})
	})
	.catch(e=>{
		console.log(e)
	})
}



