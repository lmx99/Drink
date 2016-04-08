console.log('roleRH start');
//var roleLG = require('../logics/Role.LG.js')();
console.log('roleLG end');
var RoleRH = function(){

	var _resourceHandler = function (args) {

		if(args!='func'){
			if(! (this instanceof _resourceHandler) ) return new _resourceHandler(args);
		}

	};
	
	
	return _resourceHandler;
}();

module.exports = RoleRH;