var mysql = require('mysql'),
    settings = require('./settings.js');

var client = mysql.createConnection(settings.mysql);


// exports.conn =function(){

// 	client.connect(function(error, results) {
// 		if(error) {
// 		console.log('Connection Error: ' + error.message);
// 		return;
// 		}
// 		console.log('Connected to MySQL');
// 	});
// 	return [];
// };

exports.insert=function(value){
	var values = value;

	var sql = "INSERT INTO mysql_doxygen.paramenttable(paremetername,parametervalue,portname) VALUES ?";
	console.log(values);
	client.query(sql, [values], function(err) {
	    if (err) throw err;
	    console.log('Inserted to MySQL');
	});
	return [];
}