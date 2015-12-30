var fs = require('co-fs');
var path = require('path');
var ejs = require('ejs');
var Router = require('koa-router');
var parse = require('co-body');

var mysqlinsertp = require('./public/mysqloperate.js');

var route = new Router();

var idx = 0;
	var tasks = [];

route.get('/',function *(next){
	var session = this.session;
	var count = this.session.count || 0;
	var name = 'gjj';
	count ++;
	this.session.count = count;
	this.session.name = name;
	yield this.render('index.html',{
		tasks:tasks,
		count:this.session.count,
		name:this.session.name
	});
});


route.get('/read',function *(next){
	yield this.render('read.html',{
		tasks:tasks,
		count:this.session.count,
		name:this.session.name
	});
});

route.post('/readproject',function *(){
	var dataprodect;

	// this.body = mysqlinsertp.selectpro(function(err, res){
	//     if (err) throw err;
	//     dataprodect = res;
	//     console.log(res);
	//     var body = {status:200,ok:true,data:dataprodect};
	//     console.log(body);
	//     //return body;
	// });
//{ status: 200, ok: true, data: 'projectname1' };//
	console.log("121212121");
	this.body = mysqlinsertp.selectpro();
	
	console.log(mysqlinsertp.selectpro());
	console.log(this.body);
	console.log("dataprodect");
	console.log(dataprodect);
});


//存参数列表
route.post('/insert1', function *(){
	var post = yield parse(this);
	//将接收到的json数据放到一个二维数组中
	var mothodname = post["portmethod"];
	console.log(post);
	delete post.portmethod
	var array_1 = [];
	for (var item in post){
		array_1.push([item,post[item],mothodname]);
	}
	//将数据放到数据库中
	yield mysqlinsertp.insert(array_1);
	this.body = {status:200,ok:true,data:[]};
});

//存接口信息
route.post('/insert2', function *(){
	var post = yield parse(this);
	var array1=[];
	var array_1 = [];
	array_1.push(post["projectname"]);
	array_1.push(post["portname"]);
	array_1.push(post["portway"]);
	array_1.push(post["porturl"]);
	array_1.push(post["portreturn"]);
	array1.push(array_1);
	//将数据放到数据库中
	console.log("insert2");
	yield mysqlinsertp.save(array1);
	this.body = {status:200,ok:true,data:[]};
});

route.get('/test',function*(){
	this.body='test';
});



module.exports = route;

