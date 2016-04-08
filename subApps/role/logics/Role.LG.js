var RoleLG = function(){

	var dbi = require(ROOT_DIR+'/db/pool/Role.DBAPI.js')();

	var _logic = function(args){

		if(args!='func'){
			if(!(this instanceof _logic)) return new _logic(args);
		}
	};

	return _logic;
}();

module.exports = roleLG;