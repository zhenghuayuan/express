const pool = require('../db/index')
module.exports = function(res, req, next){
	let page = res.query.page
	let size = res.query.size
	let userid = res.userid
	let jsonBody = []
	// 查询最近10条开奖记录
	let sql1 = 'select * from historylottery order by preiods DESC limit 10' // order by createTime DESC 正序查找 ASC 倒序查找 DESC
	// 查询最近10条开奖中奖用户
	let sql2 = 'select * from userinfo where userid in ($userid)' // order by createTime DESC 正序查找 ASC 倒序查找 DESC
	pool(sql1, [])
	.then(data=>{
		if (data.length == 0) {
			return Promise.reject('暂无开奖记录')
		}
		jsonBody = data;
		// 取出所有的中奖者userid
		let useridArr = []
		jsonBody.forEach(record=>{
			let lotteryUser = JSON.parse(record['lotteryUser'] || '[]')
			lotteryUser.forEach(item=>{
				!(useridArr.indexOf(item) != -1) && useridArr.push(item)
			})
		})

		sql2 = sql2.replace(/\$userid/g, useridArr.join(','))
		return pool(sql2, [])
	})
	.then(data=>{
		// 再把用户映射到对应的开奖记录里
		jsonBody.forEach(record=>{
			record['lotteryOptions'] = JSON.parse(record['lotteryOptions'])
			record['lotteryUserList'] = []
			record['lotteryUser'] = JSON.parse(record['lotteryUser'] || '[]')
			let lotteryUserArr = []
			record['lotteryUser'].forEach(lotteryUser=>{
				!(lotteryUserArr.indexOf(lotteryUser) != -1) && lotteryUserArr.push(lotteryUser)
			})
			lotteryUserArr.forEach(lotteryUser=>{
				data.forEach(user=>{
					if (lotteryUser == user['userid']) {
						record['lotteryUserList'].push(user)
					}
				})
			})
		})
		req.json({
			code: 0,
			body: jsonBody,
			msg: "",
		}) 
	})
	.catch(e=>{
		console.log(e)
	})
}



