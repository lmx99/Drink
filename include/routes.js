var express = require('express'),
    fs      = require('fs'),
    _       = require('underscore'),
    Promise = require('promise')
    ;

module.exports = function(options) {
    
    var verbose = options.verbose || false;

    var router = express.Router();

    verbose && console.log('----- Boot Up!');

    new Promise((resolve, reject) => {
    	verbose && console.log('-----1');
    	fs.access(__dirname + '/../subApps/', fs.F_OK, (err) => {
    		err? reject(err) : resolve();
    	})
    })
    .then(()=>{
    	verbose && console.log('-----2');
    	return Promise.all( 
			fs.readdirSync(__dirname + '/../subApps/')
			.map(function(directoryName) {
				return new Promise(function(resolve, reject){
	                resolve(directoryName);
				})
    		})
    	)
    })
    .then((directoryNames)=>{
    	verbose && console.log('-----3');
    	console.log(directoryNames);
    	return Promise.all(

		    	directoryNames
		    	.filter(function(directoryName) {
		    		verbose && console.log('\n  %s:', directoryName);
	                verbose && console.log(
	                	fs.statSync(__dirname + '/../subApps/'+directoryName).isDirectory() 
	                	&& fs.existsSync(__dirname + '/../subApps/' + directoryName+'/controls/')
	                	&& ['.','..'].indexOf(directoryName)==-1
	                );
	                return ( 
	                	fs.statSync(__dirname + '/../subApps/'+directoryName).isDirectory() 
	                	&& fs.existsSync(__dirname + '/../subApps/' + directoryName+'/controls/')
	                	&& ['.','..'].indexOf(directoryName)==-1
	                )
		    	})
		    	.map(function(directoryName) {

    				return new Promise(function(resolve, reject){
    					var o = {};
    					o[directoryName] = fs.readdirSync(__dirname + '/../subApps/' + directoryName+'/controls');
    					resolve(o);
    				});
		    	})
    		);
    })
    .then((os)=>{
    	verbose && console.log('-----4');
    	verbose && console.log(os);
    	os.forEach(function(o){
	    	for(var directoryName in o){
	    		
	    		o[directoryName]
	    		.filter(function(filename) {
	    			verbose && console.log('\n %s',filename);
	            	verbose && console.log(!!filename.match(/.*.js/));
	            	verbose && console.log(fs.statSync(__dirname + '/../subApps/' + directoryName+'/controls/' + filename).isFile());

	            	return ( 
	            		!!filename.match(/.*.js$/)
	                	&& fs.statSync(__dirname + '/../subApps/' + directoryName+'/controls/' + filename).isFile()
	            	);
	    		})
	    		.forEach(function(filename) {
	    			var controller = require('../subApps/' + directoryName + '/controls/' + filename)();
	    			verbose && console.log('require => '+filename +"\n\n METHODS:\n");
	                for (var resource in controller) {
	                    
	                    if (_.isArray(controller[resource])) {
	                        for (var i = 0; i < controller[resource].length; i++) {

	                            var actionObject = controller[resource][i];
	                            router[actionObject.m](actionObject.p, actionObject.h);
	                            verbose && console.log('   %s => %s ==> %s \n   %s \n\n', actionObject.a, actionObject.p, actionObject.m.toUpperCase(), actionObject.h);
	                        }
	                    }

	                }
	                verbose && console.log(`----- End of ${directoryName} Boot Up.`);
	    		});
	    	}
    	})
    })
    .catch((err)=>{
    	console.log(err);
    });

    return router;

    verbose && console.log();
    verbose && console.log('----- End of Boot Up.');
    verbose && console.log();
};