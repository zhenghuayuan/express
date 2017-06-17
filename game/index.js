const pool = require('../db/index')
const util = require('../common/util')
console.log("游戏运行中...")

function statistics(){
	let preiods =  util.createPreiods() // 创建本期期数
	let lotteryOptions = createLotteryOptions() // 本期随机开奖结果
	let lotteryPool = 999 // 本期奖池
	let allBetGrounp = 50 // 本期组数
	let luckyOrderArr = [] // 本期中奖订单

	// 查找订单
	pool('select * from lotteryorder where preiods=?', [preiods])
	.then(data=>{
		if (data.length == 0) {
			// return Promise.reject("本期暂无订单")
			console.log('本期暂无订单')
		}
		// 查找中奖者
		luckyOrderArr = findLucky(lotteryOptions, data)
		// 本期订单状态置为 2(未中奖)
		return pool('update lotteryorder set status = ?, lotteryOptions = ?  where preiods=?', [2, lotteryOptions, preiods])
	})
	// 中奖者状态修改
	.then(data=>{
		if (luckyOrderArr.length == 0) {
			console.log("本期无人中奖")
			return pool('insert into historylottery(preiods, lotteryOptions, lotteryPool, allBetGrounp, lotteryUser) values(?,?,?,?,?)', [preiods, lotteryOptions, lotteryPool, allBetGrounp, '[]'])
			.then(data=>{
				return Promise.reject('本期开奖完成')
			})
		}
		return
	})
	.then(data=>{
		let lotteryUser = []
		let orderIdArr = []
		let luckyOrder = []
		let userCi = {} // 存储数次
		luckyOrderArr.forEach(item=>{
			orderIdArr.push(item.orderId) // values 如果是字符串类型 必须手动加上 \' (引号) 或者 JSON.stringify()
			luckyOrder.push([item.preiods, lotteryOptions, item.userid, item.orderId, item.betOptions])
			lotteryUser.push(item.userid)
			if (userCi[item.userid]) {
				userCi[item.userid] ++
			}else{
				userCi[item.userid] = 1
			}
		})
		console.log(userCi)
		pool('select mizu,userid from userinfo where userid in (?)', [lotteryUser])
		.then((data)=>{
			// let mizuArr = [] // 用户中奖后的觅钻 已经计算
			// let useridArr = [] // 用户id 已经去重
			for(let key in userCi){
				data.forEach(item=>{
					if (item.userid == key) {
						// mizuArr.push(userCi[key]*util.config.BONUS+item.mizu)
						// useridArr.push(key)
						pool('update userinfo set mizu = ? where userid = ?', [userCi[key]*util.config.BONUS+item.mizu, key])
						.then(data=>{
							console.log(`用户奖金发放:${key}`)
						})
						.catch(e=>{
							console.log(e)
						})
					}
				})
			}
			
		})
		.catch(e=>{
			console.log(e)
		})
		return Promise.all([
			// 中奖人订单置为 3(已中奖)
			pool('update lotteryorder set status = 3 where orderId in (?)', [orderIdArr]),
			// 中奖订单添加到中奖列表
			pool('insert into luckyuser(preiods, lotteryOptions, userid, orderId, betOptions) values ?', [luckyOrder]),
			// 增加一条历史开奖记录
			pool('insert into historylottery(preiods, lotteryOptions, lotteryPool, allBetGrounp, lotteryUser) values(?,?,?,?,?)', [preiods, lotteryOptions, lotteryPool, allBetGrounp, JSON.stringify(lotteryUser)]),

		])
	})
	.then(data=>{
		console.log('本期开奖完成')
	})
	.catch(e=>{
		console.log(e)
	})
}

// 随机开奖
function createLotteryOptions(){
	let arr = util.randomNoRepeat(3, 0, 15)
	let res = arr.map(item=>{
		return util.config.foodItems[item]['classname']
	})
	return JSON.stringify(res)
}
// 查找吧本期中奖者
function findLucky(lotteryOptions, allOrder){
	let luckyArr = [] // 中奖订单号
	lotteryOptions = JSON.parse(lotteryOptions) // lotteryOptions:开奖列表  allOrder:所有订单
	allOrder.forEach(item=>{
		let userOption = JSON.parse(item['betOptions']) // 每条订单
		let i = 0;
		lotteryOptions.forEach(luckyItem=>{
			userOption.indexOf(luckyItem) > -1 && i++
		})
		if (i >= 3) luckyArr.push(item)
	})
	return luckyArr
}
// 节流控制
let isStatistics = true
setInterval(()=>{
	let d = new Date()
	let hours = d.getHours()
	let minutes = d.getMinutes()
	// 在59分55秒后 执行统计开奖
 	if (minutes == 59) {
 		let seconds = d.getSeconds()
 		if (seconds >= 50 && isStatistics) {
 			isStatistics = false
 			setTimeout(()=>{
 				isStatistics = true
 			}, 1000*10)
 			console.log('开奖中...')
 			statistics()
 		}
 	}
}, 1000)
module.exports = {}

