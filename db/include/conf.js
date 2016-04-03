module.exports = function (db,server){
	var defaultConfig = require(ROOT_DIR+'/include/config.js');
	
	var dbConfig = {

		mysql:{
			local:{
				sysConfig:defaultConfig,

				host:'localhost',
				username:'amos',
				database:'Drink',
				password:'666666',
				prefix:'x_',
				debug:true
			},
			ali:{
				sysConfig:defaultConfig,
				
				host:'',
				username:'amos',
				database:'dao',
				password:'',
				prefix:'x_',
				debug:true
			}
		},

		
		
	};


	db =  db || defaultConfig.db;
	server = server || defaultConfig.server;

	return dbConfig[db][server];


};