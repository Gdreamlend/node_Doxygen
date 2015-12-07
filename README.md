# node_Doxygen
##功能点一：请求接口
点击“调用接口测试”按钮触发getResult函数，进行相应get/post的ajax请求。
##功能点二：存储数据库
**存储参数对，数据库表paramenttable**
点击“存入数据库”按钮触发ajax请求，请求到后台操作数据库表的插入操作。
 -前台发一个POST请求过来，nodejs怎么接收呢？
 	通过路由获取POST请求，通过`var post = yield parse(this);`获得POST传过来的值
 -对得到的值进行处理，怎么存进mysql数据库呢？
**存数请求体，数据库表invoketable**
点击“存入数据库”按钮触发ajax请求，请求到后台操作数据库表的插入操作。
