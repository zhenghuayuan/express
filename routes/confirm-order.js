const pool = require("../db/index")
const util = require("../common/util")
module.exports = (res, req, next)=>{
	let options = JSON.parse(res.body.options) // 订单列表
	let userid = res.userid // 用户ID
	let preiods = res.body.preiods // 期号
	let createTime = +new Date() // 创建时间
	let placeholder = []
	let allOrder = [] // [[userid,orderId,preiods,betOptions,betGrounp,betMizu,status,createTime,lotteryOptions],[],[]]
	let allBetMizu = 0  // 所有所有订单的投注额
	options.forEach((item,index)=>{
		let betMizu = util.calcuZu(item.length)*util.config.PRICE // 投入觅钻
		let options = JSON.stringify(item)
		let orderId = util.createMd5({ // 生成订单号
			preiods,
			options,
			createTime
		})
		allBetMizu += betMizu
		// placeholder.push('(?,?,?,?,?,?,?,?,?)')
 		// allOrder.push('('+userid+','+orderId+','+preiods+','+options+','+1+','+999+','+1+','+createTime+','+'[]'+')')
 		// allOrder('(userid,orderId,preiods,betOptions,betGrounp,betMizu,status,createTime,lotteryOptions)')
		// createOrder(res, req, next, JSON.stringify(item), betMizu, isLast)
	})
	let sql = 'insert into lotteryOrder(userid,orderId,preiods,betOptions,betGrounp,betMizu,status,createTime,lotteryOptions) values$values'
	sql = sql.replace(/\$values/g, allOrder.join(','))
	pool(sql, [])
	.then(data=>{
		console.log(data)
	})
	.catch(e=>{
		console.log(e)
	})

}
// 添加订单到数据库
// function createOrder(res, req, next, options, betMizu, isLast){
// 	let userid = res.userid // 用户ID
// 	let preiods = res.body.preiods // 期号
// 	let createTime = +new Date() // 创建时间
// 	let orderId = util.createMd5({ // 生成订单号
// 		preiods,
// 		options,
// 		createTime
// 	})
// 	let values = [userid, orderId, preiods, options, 1, betMizu, 1, createTime, '[]']
// 	pool('insert into lotteryOrder(userid,orderId,preiods,betOptions,betGrounp,betMizu,status,createTime,lotteryOptions) values(?,?,?,?,?,?,?,?,?)', values)
// 	.then((data)=>{
// 		if (isLast) {
// 			req.json({
// 				code: 0,
// 				body: "",
// 				msg: "下单成功",
// 			})
// 		}
// 	})
// 	.catch((e)=>{
// 		console.log(e)
// 	})
// }


