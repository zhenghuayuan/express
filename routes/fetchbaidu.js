var express = require('express');
var router = express.Router();
var http = require('http');

// var request = require('request');
router.get('/', function(req, res, next) {
	console.log("start11...")
    http.request(options, function(res){
    	console.log("start22...")
    	var arr = [];
    	res.on("data", function(chunk){
    		console.log("chunk:"+1)
			arr.push(chunk);
    	});
    	res.on("end", function(e){
    		console.log("end...")
    		if(e){
    			console.log(e);
    			return;
    		}
    		var result = arr.toString().replace(/(^\s*)|(\s*$)/g, "");
    		req.send(result);
    	})
    });
});
var options = {
	hostname: "https://ee331.com/",
	port: "80",
	path: "",
	method: "GET",
	headers: {
		'Accept':"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding":"gzip, deflate, sdch, br",
		"Accept-Language":"zh-CN,zh;q=0.8,en;q=0.6",
		"Cache-Control":"max-age=0",
		"Connection":"keep-alive",
		"Cookie": "__cfduid=d5c802d837aa7c2a68766515816e197341495036664; UM_distinctid=15c172121c0711-0e22395930b5be-30627509-1fa400-15c172121c1b38; CNZZDATA1260967185=1101291586-1495033216-%7C1495033216; Hm_lvt_0baa1b0a65d82c0fefdf58ccc42f3775=1495036666; Hm_lpvt_0baa1b0a65d82c0fefdf58ccc42f3775=1495038568",
		"Host":"ee331.com",
		"Upgrade-Insecure-Requests":"1",
		"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
	}
}


module.exports = router;

