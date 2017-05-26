var jwt = require('jsonwebtoken');
module.exports = function(res, req, next){
	var path = res.path;
	console.log(path.indexOf("/login"))
	if (path.indexOf("/login") != -1 ||
		path.indexOf("/register") != -1 ||
		path.indexOf("/ws") != -1 ||
		path.indexOf("/fetch-resources") != -1) {
		return next();
	}
	var token = res.body.token;
	jwt.verify(token, "zheng", function(err, decoded){
		if (err) {
			req.json({
				code: 100,
				msg: "token已过期，或不存在",
			})
			return;
		};
		next();
	});
}