global.Promise = require('bluebird');
Promise.longStackTraces();

var path = require('path');
global.ROOT_DIR = path.dirname(__dirname);

global._ = require('./underscore.ext.js');

require('./global.ext.js');

global.$ = function(){
	
	var $ = function(args){
		if(_.isFunction(args)){
			return new Promise(args);
		}else if(_.isArray(args)){
			return Promise.all(args.map(function(value) {
				if( _.isFunction(value) ){

					return new Promise(value);
				}else {
					if( !(value instanceof Promise) ){

						return Promise.resolve(value);
					}else{
						return value;
					}
				}

			}));
		}

		return Promise;


	};

	$.config = require('./config.js');
	$.lng = require('./language.js')($.config.language);
	$.des = require('./descript.js');
	$.router = require('./routes.js');


	return $;
}();




