module.exports = (function () {
	
	//modules
	var share = require('./share.js');

	function fn(){
		
		if(!(this instanceof fn) ){
			return new fn();
		}

		share.call(this);

		this.getUsers = function(){

		}

		this.getInfos = function(){

		}

	};

	return fn;

})()
