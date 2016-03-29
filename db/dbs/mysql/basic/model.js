
module.exports = (function () {
	var cf = require('../../../include/conf.js')('mysql');//配置

	return function model(tableName){
		if(!(this instanceof model) ){
			return new model(tableName);
		}
		var $this = this;


		this.table = require('./tables.js')(tableName);
		this.db = require('./db.js');

		//select,add,update,delete;
		this.select = function(data){

		}

		this.add = function(data){
			this.db.query();
		}

		this.update = function (data) {
			// body...
		}

		this.delete = function(data){

		}

	}

})()