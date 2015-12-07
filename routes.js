var fs = require('co-fs');
var path = require('path');
var ejs = require('ejs');
var Router = require('koa-router');
var parse = require('co-body');

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

route.post('/insert1', function *(){
	var post = yield parse(this);
	// var message=post.message;
	// console.log(message);
	//this.body=post;
	this.body = {ok:true};
});

route.get('/test',function*(){
	this.body='test';
});

// route.get('/name',function *(next){
// 	// var filepath = path.join(__dirname, 'views/index.html');
// 	// var tpl = yield fs.readFile(filepath,'utf8');

// 	var session = this.session;
// 	var count = this.session.count || 0;
// 	var name = '';
// 	count ++;
// 	this.session.count = count;
// 	this.session.name = name;

// 	// var html = ejs.render(tpl,{tasks:tasks});
// 	// this.body = html;
// });


// route.post('/tasks', function *(){
// 	var post = yield parse(this);
// 	var task =
// 	{
// 		id :++idx,
// 		message:post.message,
// 		done:false
// 	};
// 	tasks.push(task);
// 	this.body ={ok:true, data:task};

// });

// route.post('/tasks/:id', function *(){

// 	tasks = tasks.filter(function(item) {
// 		return item.id == id;
// 	});
// 	task.done = true;

// 	this.body = {ok:true};

// });

// route.delete('/tasks/:id',function *(){
// 	var id = Number(this.params.id);
// 	if(!id){
// 		this.status = 404;
// 		return;
// 	}
// 	tasks = tasks.filter(function (item){
// 		return item.id !== id;
// 	});
// 	this.body = {ok:true};
// });

module.exports = route;

