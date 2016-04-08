module.exports = function(cf){

	return {

		id:'user_id',
		name: cf.prefix+'pub_users',
		fields: ['user_name','password','id_phone','add_time','last_ip','last_login','session_id']
	};

};