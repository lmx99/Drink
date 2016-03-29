module.exports = function(db){
	var cf = require('./include/conf.js');
	var db = db || cf.sysConfig.db;
	return require('./dbs/'+db+'/sql.js');

}