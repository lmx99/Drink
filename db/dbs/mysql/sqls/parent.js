module.exports = (function () {
	//modules

	function parent(){
		var $t = this;

		this.m = require('../basic/model.js');

		this.getUsers = function(){
			$t.m('users').select();

		}

		this.getInfos = function(){

		}

		this.addUser = function(data){

			$t.m('users').add(data);

		}

		this.updateInfo = function(){

		}

	};


	return parent;


})()
