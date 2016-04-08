module.exports = function(cf){

	return {

		id:'log_id',
		name: cf.prefix+'pub_log',
		fields: ['user_name','event_id','add_time']
	};

};