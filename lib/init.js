var express = require('express'),
    fs      = require('fs'),
    _       = require('underscore'),
    ;

module.exports = function(parent, args, options) {
    
    var verbose = options.verbose;

    var appendSpace = function(str, n) {
        var tmp = str;
        
        for (var i = 0; i < n; i++) {
            tmp += " ";
        }

        return tmp;
    }

    verbose && console.log('----- Boot Up!');
    fs.access(__dirname + '/../subApps', fs.F_OK, (err) => {
        if(!err){
            fs.readdirSync(__dirname + '/../subApps').forEach(function(directoryName) {
                verbose && console.log('\n  %s:', directoryName);

                fs.readdirSync('../subApps/' + directoryName+'/controls').forEach(function(filename){

                    var controller = require('../subApps/' + directoryName + '/controls/' + filename)(args);
                    var app = express();

                    for (var resource in controller) {
                        
                        if (_.isArray(controller[resource])) {
                            for (var i = 0; i < controller[resource].length; i++) {

                                var actionObject = controller[resource][i];
                                app[actionObject.m](actionObject.p, actionObject.h);
                                
                                verbose && console.log('    %s %s -> %s', appendSpace(actionObject.method.toUpperCase(), 5 - actionObject.method.length), action.h);
                            }
                        }

                    }
                    parent.use(app);

                });
                
                

            });

        }

    });

    verbose && console.log();
    verbose && console.log('----- End of Boot Up.');
    verbose && console.log();
};