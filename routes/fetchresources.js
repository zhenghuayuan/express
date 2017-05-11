var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var http = require('http');
var https = require('https');

var iconv = require('iconv-lite');
// var url = 'https://ee331.com/';
var url = 'http://www.hoomic.com/';


router.get('/', function(req, res, next) {

	start(function(data) {
		res.json({
			code: 0,
			body: {
				message: data
			},
			msg: "",
		});
	})
});


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
					index: index,
					userpic: userpic,
					username: username,
					age: age,
					sex: sex,
					contentText: contentText,
					contentImg: contentImg,	
				})
			})
			cb(arr);
			console.log("结束")
		});
	});
}


module.exports = router;