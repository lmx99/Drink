module.exports = function(){

	return {
		Finance: require('./sqls/finance.js'),
		User: require('./sqls/user.js')
	}
	
}();