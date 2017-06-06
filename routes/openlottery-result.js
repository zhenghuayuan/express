module.exports = function(res, req, next){
	req.json({
		code: 0,
		body: {
			openlotteryResult: '00011100000',
			preiods: 1956233235
		},
		msg: "",
	}) 
}
