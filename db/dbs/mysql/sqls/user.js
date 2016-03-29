module.exports = (function () {
	
	var share = require('./share.js');

	function fn(){
		share.call(this);

		this.getUsers = function(){

		}

		this.getInfos = function(){

		}

	};

	function inheritProto(childClass,parentClass){
		function F () {};

		F.prototype = parentClass.prototype;

		F.constructor = childClass.constructor;

		childClass.prototype = new F();
	}

	inheritProto(fn,share);

	return fn;

})()
