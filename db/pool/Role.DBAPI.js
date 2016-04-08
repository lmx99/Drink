var bridge = require('../bridge.js')();
module.exports = function(){
	console.log('role.dbapi.js');
	function RoleDBAPI(args){
		if(args!='func'){
			if(!(this instanceof RoleDBAPI )) return new RoleDBAPI(args);
		}

		bridge.Role.call(this,'func');
		
	}

	return RoleDBAPI;

}();