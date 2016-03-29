var bridge = require('../bridge.js')();
module.exports = function(){

	return function UserDBAPI(args){
		if(args!='func'){
			if(!(this instanceof UserDBAPI )) return new UserDBAPI(args);
		}

		bridge.User.call(this);
		

	}
	
	_(UserDBAPI).inheritPrototype(bridge.User);

}()