module.exports = function(){
	console.log('sql.js;');
	return {
		User: require('./sqls/user.js')
	};
	
}();