$.config.dubug && console.log('model.js');
var cf = require('../../../include/conf.js')('mysql');//配置
$.config.dubug && console.log('start model');
function Model(tableName){
	if( !(this instanceof Model) ){
		return new Model(tableName);
	}


	if(!tableName){
		return require('./db.js')();
	}

	$.config.dubug && console.log('start model ./db.js');


	this.table = require('./tables.js')(tableName);
	this.db = require('./db.js')();

	//sel,add,upd,del;
	$.config.dubug && console.log('model this.q before;');
	this.q = this.db.query;

	this.get = (fields, where) => {
		var fields = fields.filter((value)=>{
			$.config.debug && console.log(this.table.fields.indexOf(value));
			return this.table.fields.indexOf(value)>-1;
		});

		if(!fields)return Promise.reject(new Error('field no found'));

		if(!where)return Promise.reject(new Error('no where'));

		var sql = 'SELECT ?? FROM ?? ' + where;
		var values = [fields, this.table.name];

		return this.db.query(sql, values);
	}

	this.add = (data) => {
		data = this.filter(data);
		$.config.debug && console.log('********* ADD ********');
		$.config.debug && console.log(data);

		if (_.isArray(data)) {
			var keys;
			var vals = [];
			for (var i = 0; i < data.length; i++) {
				 !i ? (keys =_(data[i]).keys) : '';
				if(keys!=_(data[i]).keys){
					return Promise.reject(new Error('not the same key'));
				}else{
					keys = _.keys(data[i]);
				}
				vals.push(_.values(data[i]));
			};

			keys = [keys];

			var sql = 'INSERT INTO ?? ?? values ?';
			var values = [this.table.name, keys, vals];
		}else{

			var sql = 'INSERT INTO ?? SET ?';
			var values = [this.table.name, data];
			
		}

		return this.db.query( sql, values);
	}

	this.upd =  (data, where, isAll) => {
		data = this.filter(data);
		$.config.debug && console.log('*********upd********');
		$.config.debug && console.log(data);
		if(where){
			if(isAll){
				var sql = `UPDATE ${this.table.name} SET ? ${where}`;
			}else{
				var sql = `UPDATE ${this.table.name} SET ? ${where} limit 1`;
			}
		}else{
			return Promise.reject(new error('did not '))
		}
		var values = data;
		return this.db.query(sql, values);
	}

	this.del = (where, isAll) => {

		if(where){
			if(isAll){
				var sql = `DELETE FROM ?? ${where}`;
			}else{
				var sql = `DELETE FROM ?? ${where} limit 1`;
			}
		}else{
			return Promise.reject(new error('did not where'))
		}
		return this.db.query(sql, this.table.name);
	}

	this.filter = (data) => {
		if(_.isArray(data)){
			for (var i = 0; i < data.length; i++) {
				for (var k in data[i]) {
					this.table.fields.indexOf(k) == -1? (delete data[i][k]) : '';
				}
			};
		}else{
			for (var k in data[i]) {
				this.table.fields.indexOf(k) == -1? (delete data[i][k]) : '';
			}
		}

		return data;
	}

};


module.exports = Model