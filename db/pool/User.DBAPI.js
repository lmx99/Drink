var bridge = require('../bridge.js')();
module.exports = function(){
	console.log('user.dbapi.js');
	function UserDBAPI(args){
		if(args!='func'){
			if(!(this instanceof UserDBAPI )) return new UserDBAPI(args);
		}

		bridge.User.call(this,'func');

	}

	return UserDBAPI;

}();