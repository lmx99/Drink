module.exports = function(db) {

	console.log('bridge.js;');
	var cf = require('./include/conf.js')();
	console.log(cf);
	db = db || cf.sysConfig.db;
	console.log(db);
	return require('./dbs/'+db+'/sql.js');

};