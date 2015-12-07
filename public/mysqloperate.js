var mysql = require('mysql'),
    settings = require('../settings');

var db = mysql.createConnection(settings);
db.connect();

exports.do = function (sql, callback) {
  　　db.query(sql, callback);
}

// function handleError (err) {
//   if (err) {
//     // 如果是连接断开，自动重新连接
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       connect();
//     } else {
//       console.error(err.stack || err);
//     }
//   }
// }

// // 连接数据库
// function connect () {
//   db = mysql.createConnection(config);
//   db.connect(handleError);
//   db.on('error', handleError);
// }

// var db;
// connect();