var express = require('express');





var router = express.Router();


router.use('/:c',function(req, res){
	console.log(req.baseUrl);
	console.log(req.params);
	console.log(req.params[0]);
	console.log('sdfdsfdsf');

	res.json({ex:'00dfd'});
});


module.exports = router;