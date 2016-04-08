module.exports = (function () {
	console.log('user.js1');
	var utils =  require('./utils.js');
	console.log(utils);
	console.log('user.js2');
	function _user(args){
		
		if(args!='func'){
			if(!(this instanceof _user )) return new _user(args);
		}
		console.log('_user1');
		console.log(this);
		utils.call(this,'func');
		console.log('_user2');
		this.addUser = (data)=>{
			return this.m('users').add(data);
		}

		this.delUser = (username)=>{
			return this.m('users').del(`where username=${username}`);

		}

		this.updUser = (data, username)=>{
			return this.m('users').upd(data, `where username=${username}`);
		}

		this.getUsers = ()=>{
			return this.m('users').q('SELECT * FROM');
		}

		this.getUserCounts = (username)=>{
			return this.m('users').q('SELECT count(*) FROM $_pub_users where user_name=?',username);
		}

		this.getPhoneCounts = (IDphone)=>{
			return this.m('users').q('SELECT count(*) FROM $_pub_users where id_phone=?',IDphone);
		}

		this.getUserInfos = (fields, username)=>{
			return this.m('users').get(fields, `where user_name=${username}`);
		}

		this.updateUserInfos = (data, username)=>{
			return this.m('users').upd(data, `where user_name=${username}` );
		}

		this.pubLog = (data)=>{
			return this.m('users').add(data);
		}

	};

	//_user.prototype = new utils();
	//_.inheritPrototype(_user, utils);

	return _user;

})();
