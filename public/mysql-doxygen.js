var mysql = require('mysql');

var database = 'mysql_doxygen';
var table1 = 'invoketable';
var table2 = 'paramenttable';

var client = mysql.createConnection({
	host:'127.0.0.1',
	user:'gjj',
	password:'123'
});
client.connect(function(error, results) {
if(error) {
console.log('Connection Error: ' + error.message);
return;
}
console.log('Connected to MySQL');
});
//创建数据库
client.query('create database '+ database, function(err){
	if(err && err.number != mysql.ERROR_DB_CREATE_EXISTS){
		throw err;
	}
});

//使用数据库
client.query('USE '+ database);

//创建表
client.query(
	'CREATE TABLE '+table1+
	'(id int (11) AUTO_INCREMENT, '+
	'projectname VARCHAR(255), '+//项目名称
	'portname VARCHAR(255), '+//接口名称
	'urladdress VARCHAR(255), '+//请求地址
	'portway VARCHAR(255), '+//调用方法
	'portreturns TEXT, '+//返回值
	'PRIMARY KEY (id))'
	);

client.query(
	'CREATE TABLE '+table2+
	'(paremetername VARCHAR(255), '+//参数名称
	'parametervalue VARCHAR(255), '+//参数值
	'portname VARCHAR(255))'//接口名称
	);

client.end();//关闭连接