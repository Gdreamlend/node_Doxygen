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
	client.query(sql, [values], function(err) {
	    if (err) throw err;
	    console.log('Inserted  to paramenttable');
	});
	return [];
}

exports.save=function(value){
	var values = value;
	var sql = "INSERT INTO mysql_doxygen.invoketable(`projectname`,`portname`,`portway`,`urladdress`,`portreturns`) VALUES ?";
	client.query(sql, [values], function(err) {
	    if (err) throw err;
	    console.log('Inserted to invoketable');
	});
	return [];
}

// exports.selectpro = function (){
// 	var sql = "SELECT DISTINCT projectname FROM invoketable";
// 	var projectname;
// 	yield client.query(sql,function(err,result){
// 		if(err) throw err;
// 		projectname = result;
// 		console.log('select projectname from db');
// 	});
// 	return projectname;
// }

// exports.selectpro = function(cb){
//     var sql = "SELECT * FROM invoketable";
//     var projectname;
//     client.query(sql,function(err, rows, fields) {
//         if(err) {
//             cb(err, null);
//         } else {
//             projectname = rows[0].projectname;
//             console.log('select projectname from db');
//             console.log(rows[0].projectname);
//             cb(null, rows[0].projectname);
//         }
//     });
// };


exports.selectpro = function(){
    var sql = "SELECT * FROM invoketable";
    var projectname;
    client.query(sql,function(err, rows, fields) {
        if(err) {
           return err;
        } else {
            projectname = rows[0].projectname;
            console.log('select projectname from db');
            console.log(rows[0].projectname);
            var result = JSON.parse('{status:200,ok:true,data:rows[0].projectname}');
            console.log(result);
            return result;
        }
    });
};