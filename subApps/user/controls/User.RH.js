console.log('userRH start');
var userLG = require('../logics/User.LG.js')();
console.log('userLG end');
var UserRH = function(){

	var _resourceHandler = function (args) {
		if(args!='func'){
			if(! (this instanceof _resourceHandler) ) return new _resourceHandler(args);
		}

		this.PIN = [
			{
				a: 'get PIN',
				m: 'get',
				p: /^\/PIN\/?$/,
				h: (req, res, next) => {
					$.config.debug && console.log(req.query);
					$.config.debug && console.log(req.body);
					userLG.sendPIN( req.query.IDPhone ).then((PIN)=>{

						req.session.PIN = PIN;
						req.session.IDPhone = req.query.IDPhone;

						console.log(PIN);
						res.json({
							status : '0',
							msg : $.lng.SUCCESS
						});

					}).catch((err)=>{
						$.config.debug && console.log(err);
			    		$.config.debug && console.log(err.stack);
						res.json({
							status : '1',
							msg : err
						});
					});
				}
			},
			{
				a: 'Check PIN',
				m: 'get',
				p: /^\/PIN\/@PIN\/?$/,
				h: (req, res, next) => {

					$.config.debug && console.log(req.session);
					$.config.debug && console.log(req.body);

					userLG.checkPIN( req.session.PIN, req.query.PIN ).then((PIN)=>{
						res.json({
							status : '0',
							msg : $.lng.SUCCESS
						})
					}).catch((err)=>{

						$.config.debug && console.log(err);
			    		$.config.debug && console.log(err.stack);

						res.json({
							status : '1',
							msg : err
						})
					})
				}
			}
		];

		this.users =  [
			{
				a: 'register',
			    m: 'put',
			    p: /^\/users\/?$/,
			    h: (req, res, next) => {
			    	console.log(req.body);
			    	console.log(req.session);
			    	var data = {
			    		username : req.body.username,
			    		password : req.body.password,
			    		IDPhone	 : req.body.IDPhone,
			    		PIN 	 : req.body.PIN,
			    		localPIN : req.session.PIN,
			    		localIDPhone: req.session.IDPhone
			    	}
			    	userLG.register(data).then((result)=>{
			    		console.log(result);
				        res.json({
				        	status : "0",
				        	msg : $.lng.SUCCESS
				        });
			    	}).catch((err)=>{
			    		$.config.debug && console.log(err)  

			    		$.config.debug && console.log(err.stack);
			    		
			    		res.json({
			    			status:'1',
				        	msg:err
				        });
			    	})
			    }
			},
			{
				a: 'update user infomation',
				m: 'post',
				p: /^\/users\/@id\/?$/,
				h: (req, res, next) => {

				}

			},
			{
				a: 'get user list',
			    m: 'get',
			    p: /^\/users\/?$/,
			    h: (req, res, next) => {
					res.json({
			        	regiser: 'sdfdsf'
			        })
			    }
			},
	        {
	        	a: 'get one user',
	            m: 'get',
	            p: /^\/users\/@id\/?$/,
	            h: (req, res, next) => {
	            	var id = req.query;
	            	console.log(req.query);
	            	console.log(req.path);
	                res.json({
	                	regiser: 'sdfsdfdddd'
	                })
	            }
	        }
	    ];

	    this.logID = [
	    	{
	    		a: "login", 
	    		m: "put", 
	    		p: /^\/users\/@id\/logID\/?$/, 
	    		h: (req, res, next) => {

	    		}
	    	},
	    	{
	    		a: "logout", 
	    		m: "delete",
	    		p: /^\/users\/@id\/logID\/?$/, 
	    		h: (req, res, next) => {

	    		}

	    	}
	    ]



	}
	
	
	return _resourceHandler;
}();

module.exports = UserRH;