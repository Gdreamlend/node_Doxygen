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

 //exports.selectpro = function(cb){
 //    var sql = "SELECT * FROM invoketable";
 //    var projectname;
 //    client.query(sql,function(err, rows, fields) {
 //        if(err) {
 //            cb(err, null);
 //        } else {
 //            projectname = rows[0].projectname;
 //            console.log('select projectname from db');
 //            console.log(rows[0].projectname);
 //            cb(null, rows[0].projectname);
 //        }
 //    });
 //};


exports.selectpro = client.query("SELECT DISTINCT projectname FROM invoketable", function(err, results) {
        if(err) {
            console.log(err);
           return err;
        }
        projectname = results[0].projectname;
        console.log('select projectname from db');
        console.log(results[0].projectname);
        var l = '{"status":"200","ok":"true","data":"'+results[0].projectname+'"}';
        console.log(l);
        var result = JSON.parse(l);
        //console.log(l);
        console.log(result);
        return result;
    });