# node_Doxygen
##功能点一：请求接口
点击“调用接口测试”按钮触发getResult函数，进行相应get/post的ajax请求。
##功能点二：存储数据库

**存储参数对，数据库表paramenttable**
点击“存入数据库”按钮触发ajax请求，请求到后台操作数据库表的插入操作。
 -前台发一个POST请求过来，nodejs怎么接收呢？
 	通过路由获取POST请求，通过`var post = yield parse(this);`获得POST传过来的值
 -对得到的值进行处理，怎么存进mysql数据库呢？
	通过在mysqloperate.js文件中exports数据库的连接和插入函数，并在routes.js文件的post插入路由中进行调用（用yield将两个异步执行函数，进行同步限定[避免没有还连接上，就开始调用插入操作]）。

**存数请求体，数据库表paramenttable**
点击“存入数据库”按钮触发ajax请求，请求到后台操作数据库表的插入操作。
 -为什么点击第一次没有反应，第二次才响应？为什么不刷新页面再次点击按钮时，会请求多次post请求？
	因为在响应函数saveDocument内，又加了响应事件，所以第一次点击按钮不会有响应，<font color="#4590a3" size = "6px">但之后点击，为什么会被调用多次不是很明白。</font>http://stackoverflow.com/questions/33621114/backbone-switching-views-on-click-event-not-firing-on-first-click?lq=1

  // $(document).ready(function(){
  //   $("#BDocument").click(function(){
  //}）；
  //}）

  **存数请求体，数据库表invoketable**

##功能点三：将数据从数据库中读取，显示到页面



##疑问记录
一个ajax可以同时发送两个请求吗？
##错误记录
1.Connection Error: Cannot enqueue Handshake after already enqueuing a Handshake.
	解决办法：将client.connect函数去掉，原因已经调用过createConnection函数就不用再调用connect函数了。(You don't need to connect if you have already ran the createConnection call)

2.Error: ER_PARSE_ERROR: You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server sersion for the right syntax to use near '' at line 1
	字段个数不匹配
