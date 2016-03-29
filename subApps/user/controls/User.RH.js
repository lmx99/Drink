var UserRH = function(){
	

	var _resourceHandler = function (args) {
		if(args!='func'){
			if(! (this instanceof _resourceHandler) ) return new _resourceHandler(args);
		}

		this.users =  [
	        {
	        	a: 'register',
	            m: 'put',
	            p: /^\/users\/?$/,
	            h: (req, res, next) => {
	                console.log(req.baseUrl);
	                res.json({
	                	regiser: this.a
	                });
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