var cheerio = require('cheerio');
var http = require('http');
var https = require('https');
var iconv = require('iconv-lite');
var pool = require("../db/index");
var url = 'http://www.hoomic.com/';
function start(cb) {
	http.get(url, function(sres) {
		console.log("开始")
		var chunks = [];
		sres.on('data', function(chunk) {
			chunks.push(chunk);
		});
		sres.on('end', function() {
			// 看meta是否uft-8，不是的话得转码
			// var result = iconv.decode(buff, "utf8");
			//不需要转编码,直接tostring 
			var result = chunks.toString().replace(/(^\s*)|(\s*$)/g, "");
			var arr = [];
			// var titles = [];
			var $ = cheerio.load(result);
			$(".post_list li").each(function(index, item){
				var jqItem = $(item)
				var userpic = jqItem.find(".post_listIcon img").attr("src");
				var username = jqItem.find(".post_blog_nickname").text();
				var age = jqItem.find(".post_blog_info").find("i").text();
				var sex = jqItem.find(".post_blog_info").find("i").hasClass("user_info_gender1")?1:2;
				var contentText = jqItem.find(".post_list_content").text();
				var contentImg = jqItem.find(".post_list_picImg img").attr("src");
				arr.push({
					userpic: userpic,
					username: username,
					age: age,
					sex: sex,
					contentText: contentText,
					contentImg: contentImg,	
				})
			})
			insertUserInfo(arr);
			cb(arr);
			console.log("结束")
		});
	});
}
var insertUserInfo = function(arr){
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			return;
		};
		var sqlKeys = "(" +Object.keys(arr[0]).join(",") +")";
		var sqlValues = "";
		arr.forEach(function(item, index){
			var values = [];
			for(var i in item){
				values.push(item[i]?'\''+item[i]+'\'':"null");
			}
			console.log(values.length)
			sqlValues += "("+values.join(",")+"),";
		});
		sqlValues = sqlValues.slice(0, sqlValues.length-1);
		connection.query("INSERT INTO hoomic(userpic,username,age,sex,contentText,contentImg) VALUES"+sqlValues, function(err, fields){
			connection.release();
			if (err){
				console.log(`error:${err}`);
				return;
			};
			console.log("插入多条数据成功");
		});

	}) 
}

module.exports = function(req, res, next) {
	start(function(data) {
		res.json({
			code: 0,
			body: {
				message: data
			},
			msg: "",
		});
	})
};