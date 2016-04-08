var cfg = require(ROOT_DIR+'/db/include/conf.js')();
module.exports = function(){

	var mysql = require('promise-mysql');
	var _instance = null;
	/**
	host: The hostname of the database you are connecting to. (Default: localhost)
	port: The port number to connect to. (Default: 3306)
	localAddress: The source IP address to use for TCP connection. (Optional)
	socketPath: The path to a unix domain socket to connect to. When used host and port are ignored.
	user: The MySQL user to authenticate as.
	password: The password of that MySQL user.
	database: Name of the database to use for this connection (Optional).
	charset: The charset for the connection. This is called "collation" in the SQL-level of MySQL (like utf8_general_ci). If a SQL-level charset is specified (like utf8mb4) then the default collation for that charset is used. (Default: 'UTF8_GENERAL_CI')
	timezone: The timezone used to store local dates. (Default: 'local')
	connectTimeout: The milliseconds before a timeout occurs during the initial connection to the MySQL server. (Default: 10000)
	stringifyObjects: Stringify objects instead of converting to values. See issue #501. (Default: 'false')
	insecureAuth: Allow connecting to MySQL instances that ask for the old (insecure) authentication method. (Default: false)
	typeCast: Determines if column values should be converted to native JavaScript types. (Default: true)
	queryFormat: A custom query format function. See Custom format.
	supportBigNumbers: When dealing with big numbers (BIGINT and DECIMAL columns) in the database, you should enable this option (Default: false).
	bigNumberStrings: Enabling both supportBigNumbers and bigNumberStrings forces big numbers (BIGINT and DECIMAL columns) to be always returned as JavaScript String objects (Default: false). Enabling supportBigNumbers but leaving bigNumberStrings disabled will return big numbers as String objects only when they cannot be accurately represented with JavaScript Number objects (which happens when they exceed the [-2^53, +2^53] range), otherwise they will be returned as Number objects. This option is ignored if supportBigNumbers is disabled.
	dateStrings: Force date types (TIMESTAMP, DATETIME, DATE) to be returned as strings rather then inflated into JavaScript Date objects. (Default: false)
	debug: Prints protocol details to stdout. (Default: false)
	trace: Generates stack traces on Error to include call site of library entrance ("long stack traces"). Slight performance penalty for most calls. (Default: true)
	multipleStatements: Allow multiple mysql statements per query. Be careful with this, it could increase the scope of SQL injection attacks. (Default: false)
	flags: List of connection flags to use other than the default ones. It is also possible to blacklist default ones. For more information, check Connection Flags.
	ssl: object with ssl parameters or a string containing name of ssl profile. See SSL options.
	*/
	var pool = mysql.createPool({

		host: cfg.host,
		port: 3306,
		debug: cfg.debug,
		user: cfg.username,
		password: cfg.password,
		database: cfg.database,
		connectionLimit: 20
	});

	function _db () {
		var selfFormat = function(query, values){

			if (!values) return query;

			query = query.replace(/\s\$_(?=[a-z])/g,' '+cfg.prefix);
			query = mysql.format(query, values);
			return query;

		};
		/*
		Numbers are left untouched
		Booleans are converted to true / false
		Date objects are converted to 'YYYY-mm-dd HH:ii:ss' strings
		Buffers are converted to hex strings, e.g. X'0fa5'
		Strings are safely escaped
		Arrays are turned into list, e.g. ['a', 'b'] turns into 'a', 'b'
		Nested arrays are turned into grouped lists (for bulk inserts), e.g. [['a', 'b'], ['c', 'd']] turns into ('a', 'b'), ('c', 'd')
		Objects are turned into key = 'val' pairs for each enumerable property on the object. If the property's value is a function, it is skipped; if the property's value is an object, toString() is called on it and the returned value is used.
		undefined / null are converted to NULL
		NaN / Infinity are left as-is. MySQL does not support these, and trying to insert them as values will trigger MySQL errors until they implement support.
		*/
		this.query =  (sql,values) => {
			console.log(sql);
			console.log(values);
			var conn;
			return pool.getConnection().then( (connection)=>{
				conn = connection;

				return conn.query({

					sql: selfFormat(sql, values),
					timeout: 10000 // 40s

				}).then((rows)=>{
					$.config.debug && console.log('---db.js ---')
					$.config.debug && console.log(rows);
					console.log('---db.js ---')
					conn.release();
					return rows;

				});

			});
		}

		this.transaction = (sqlArr)=>{
			var conn;

			return pool.getConnection().then( (connection)=>{
				conn = connection;

				return conn.beginTransaction();

			}).then(() => {
					
			  return Promise.all(sqlArr.map((sqlObj) => {

			  	return conn.query( selfFormat(sqlObj.sql, sqlObj.values) );

			  }));

			}).then((results)=>{

				return conn.commit();
				
				console.log('Transaction-success');

			}).then(()=>{
				conn.release();
				return true;

			}).catch((err)=>{
				console.log(err);
				return conn.rollback();

			}).then(()=>{
				return false;
			});

			
		}


	}

	return function(){
		if (!_instance) {
			_instance = new _db();
		}

		return _instance;
	};
}()

