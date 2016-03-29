module.exports = function(tableName){
	var cf = require('../../../include/conf.js')('mysql');//配置

	return require('../tables/'+tableName+'.js')(cf);

}