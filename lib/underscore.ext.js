var _ = require('underscore');
_.mixin({
	inheritPrototype : function(childClass,parentClass){

		function F () {};
		F.prototype = parentClass.prototype;

		var f = new F();
		f.constructor = childClass;

		childClass.prototype = f;

		return childClass;
	}
});

module.exports = _;