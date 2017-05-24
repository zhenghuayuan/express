var pool = require("../db/index");
module.exports = function(req, res, next) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			return;
		};
		connection.query('SELECT * FROM userInfo WHERE userid = ?', 2, function(err, data, fields){
			connection.release();
			if (err){
				console.log(`error:${err}`);
				return;
			};
			res.json(data[0]);
		});
	})
};
