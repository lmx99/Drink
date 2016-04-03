var bridge = require('../bridge.js')();
module.exports = function(){
	return function FinanceDBAPI(args){
		if(args!='func'){
			if(!(this instanceof FinanceDBAPI )) return new FinanceDBAPI(args);
		}

		bridge.Finance.call(this);
		

	}
	_(FinanceDBAPI).inheritPrototype(bridge.Finance);

}()