var Promise = require('bluebird');
Promise.longStackTraces();
var _  = require(`${ROOT_DIR}/lib/underscore.ext.js`);
var UserLG = function(){

	var dbi = require(ROOT_DIR+'/db/pool/User.DBAPI.js')();

	var _logic = function(args){

		if(args!='func'){
			if(!(this instanceof _logic)) return new _logic();
		}

		this.sendPIN = (IDPhone) => {
			if(/\d{11}/.test(IDPhone)){

				var PIN = '0123456789'.repeat(6).shuffle().substr(0,6);
			}else{

				return Promise.reject($.lng.PHONE_NUMBER_ERR);
			}

			//interplete third PIN server;

			//test
			return Promise.resolve(PIN);
		}

		this.checkPIN = (localPIN, sendPIN) => {
			return $((resolve, reject)=>{
				localPIN==sendPIN? resolve(sendPIN) : reject($.lng.PIN_ERR);
			});
		}

		/*
			args.username
			args.password
		*/
		this.register = (data)=>{

			var accessConditions = {
				usernameFormat : (resolve, reject) => {
					if(/^[a-z][a-z 0-9]{5,19}$/.test(data.username)){
						resolve(true);
					}else{
						reject( $.lng.LOW_CASE_LETTER_AND_NUMBER_REQUIRED_AND_FIRST_TO_BE_LETTER );
					}
				},

				usernameUnique : (resolve, reject) => {
					dbi.getUserCounts( data.username ).then((num)=>{
						
						parseInt(num)? reject( $.lng.USERNAME_HAVE_BEEN_REGISTER ) : resolve( true );
					})
				},

				passwordFormat : (resolve, reject) => {
					/^\w{32}$/.test(data.password)? resolve( true ) : reject( $.lng.PASSWORD_ERR );
				},

				phoneNumberCheck : (resolve, reject) => {
					data.IDPhone == data.localIDPhone ? resolve( true ) : reject( $.lng.VERIFIED_AND_SENDPHONE_NOT_THE_SAME );
				},

				phoneNumberUnique : ((resolve, reject) => {
					dbi.getPhoneCounts( data.IDPhone ).then((num)=>{

						parseInt(num)? reject( $.lng.PHONE_NUMBER_HAVE_BEEN_REGISTER ) : resolve( true );
					})
				}),

				PINCheck : (resolve, reject) => {
					(data.PIN == data.localPIN) ? resolve( true )	: reject( $.lng.PIN_ERR );
				}

			}

			var promiseAccessConditions = _.values( accessConditions ).map(function(func) {
				return new Promise(func);
			});



			return Promise.all( promiseAccessConditions ).then((arr)=>{

				dbi.addUser({
					user_name : data.username,
					password  : _.md5(data.password),
					id_phone  : data.IDPhone
				}).then((results)=>{
					console.log('-------');
					console.log(results);
					console.log('-------');
					return results;
				});
			});
			
		}



	}

	return _logic;
}();

module.exports = UserLG;