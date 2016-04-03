module.exports = function(language){
	return require('../lib/language/'+language+'.js');
};